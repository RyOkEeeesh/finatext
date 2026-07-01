import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { desc, sql } from "drizzle-orm";
import { serveStatic } from "hono/bun";
import { LRUCache } from "lru-cache";
import { serve } from "bun";

import { accessLogs } from "./DB/schema";

// --- 型定義 ---
interface Location {
  prefecture: string;
  city: string;
  town: string;
  x: string;
  y: string;
  postal: string;
}

const queryClient = postgres({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});
const db = drizzle(queryClient);

const app = new Hono();

const API_URL =
  "https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=";
const XT = 139.7673068;
const YT = 35.6809591;
const R = 6371.0;

// --- キャッシュの設定 ---
const CACHE_KEY = "access_logs_summary";
const cache = new LRUCache<string, string>({
  max: 100,
  ttl: 10 * 1000, // 10秒 (Goの LifeWindow)
});

// --- ログバッファリングの実実装 ---
// JSはシングルスレッド（イベントループ）で動作するため、Mutexによる排他制御は不要です
let logBuffer = new Map<string, number>();

const enqueueAccessLog = (postalCode: string) => {
  logBuffer.set(postalCode, (logBuffer.get(postalCode) || 0) + 1);

  // 新しいログがキューに入ったらキャッシュを即時削除 (Goの cache.Delete を再現)
  cache.delete(CACHE_KEY);
};

const flushLogsToDB = async () => {
  if (logBuffer.size === 0) return;

  // 現在のバッファを退避させてクリア
  const currentLogs = Array.from(logBuffer.entries());
  logBuffer.clear();

  const logsToInsert: { postalCode: string; createdAt: Date }[] = [];
  const now = new Date();

  for (const [postalCode, count] of currentLogs) {
    for (let i = 0; i < count; i++) {
      logsToInsert.push({ postalCode, createdAt: now });
    }
  }

  if (logsToInsert.length > 0) {
    try {
      // 2000件ずつのチャンクに分けてバルクインサート (Goの CreateInBatches を再現)
      const chunkSize = 2000;
      for (let i = 0; i < logsToInsert.length; i += chunkSize) {
        const chunk = logsToInsert.slice(i, i + chunkSize);
        await db.insert(accessLogs).values(chunk);
      }
    } catch (e) {
      console.error("ログのバルクインサートに失敗しました:", e);
    }
  }
};

// 30秒ごとに定期フラッシュ (Goの startLogFlusher を再現)
setInterval(flushLogsToDB, 30 * 1000);

// --- ヘルパー関数 ---
const getDistance = (x: number, y: number): number => {
  const term1 = (x - XT) * Math.cos((Math.PI * (y + YT)) / 360.0);
  const term2 = y - YT;
  const val =
    ((Math.PI * R) / 180.0) * Math.sqrt(term1 * term1 + term2 * term2);
  return Math.round(val * 10) / 10;
};

const fmtAddr = (l: Location): string => {
  return `${l.prefecture}${l.city}${l.town}`;
};

const getCommonPrefix = (s1: string, s2: string): string => {
  const r1 = Array.from(s1);
  const r2 = Array.from(s2);
  const minLen = Math.min(r1.length, r2.length);

  let i = 0;
  while (i < minLen && r1[i] === r2[i]) {
    i++;
  }
  return r1.slice(0, i).join("");
};

// --- ルーティング ---

// 1. トップページ
app.use("/*", serveStatic({ root: "./templates" }));

// 2. 住所検索API
const addrReqSchema = z.object({
  postal_code: z
    .string()
    .min(7)
    .max(8)
    .regex(/^[a-zA-Z0-9]+$/),
});

app.get(
  "/address",
  zValidator("query", addrReqSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        { error: "Validation failed", details: result.error.message },
        400, // Goに合わせて BadRequest(400) に修正
      );
    }
  }),
  async (c) => {
    const { postal_code } = c.req.valid("query");

    try {
      const resp = await fetch(API_URL + postal_code);
      const apiRes = await resp.json();
      const locations: Location[] = apiRes.response?.location;

      if (!locations || locations.length === 0) {
        enqueueAccessLog(postal_code);
        return c.json(
          { error: "location not found", details: "location not found" },
          404,
        );
      }

      // 複数ヒット時のロジック修正（共通接頭辞の維持と最大距離の算出）
      let commonAddress = fmtAddr(locations[0]);
      let maxDistance = getDistance(
        parseFloat(locations[0].x),
        parseFloat(locations[0].y),
      );

      if (locations.length > 1) {
        for (let i = 1; i < locations.length; i++) {
          const loc = locations[i];
          commonAddress = getCommonPrefix(commonAddress, fmtAddr(loc));
          const dis = getDistance(parseFloat(loc.x), parseFloat(loc.y));

          if (dis > maxDistance) {
            maxDistance = dis;
          }
        }
      }

      const res = {
        postal_code: locations[0].postal,
        hit_count: locations.length,
        address: commonAddress,
        tokyo_sta_distance: maxDistance,
      };

      enqueueAccessLog(postal_code);
      return c.json(res, 200);
    } catch (error: any) {
      enqueueAccessLog(postal_code);
      return c.json(
        { error: "location not found", details: error.message },
        404,
      );
    }
  },
);

// 3. アクセスログ集計API (パスをGoの `/address/access_logs` に修正)
app.get("/address/access_logs", async (c) => {
  // 検索前に現在のバッファを強制フラッシュ (Goの flushLogsToDB() を再現)
  await flushLogsToDB();

  // キャッシュの確認
  const cachedData = cache.get(CACHE_KEY);
  if (cachedData) {
    return c.json(JSON.parse(cachedData), 200);
  }

  try {
    const list = await db
      .select({
        postal_code: accessLogs.postalCode,
        request_count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(accessLogs)
      .groupBy(accessLogs.postalCode)
      .orderBy(desc(sql`count(*)`));

    const res = { access_logs: list };

    // キャッシュに保存
    cache.set(CACHE_KEY, JSON.stringify(res));

    return c.json(res, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// サーバー起動
const port = 8080;
console.log(`Server is running on port ${port}`);
serve({ fetch: app.fetch, port });