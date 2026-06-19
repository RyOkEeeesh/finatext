import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { desc, sql } from "drizzle-orm";
import { html } from "hono/html";
import { serveStatic } from "hono/bun";

import { accessLogs } from "./DB/schema";
import { serve } from "bun";

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

// --- ヘルパー関数 ---
const getDistance = (x: number, y: number): number => {
  const term1 = (x - XT) * Math.cos((Math.PI * (y + YT)) / 360.0);
  const term2 = y - YT;
  const val =
    ((Math.PI * R) / 180.0) * Math.sqrt(term1 * term1 + term2 * term2);
  return Math.round(val * 10) / 10;
};

const fmtAddr = (l: any): string => {
  return `${l.prefecture}${l.city}${l.town}`;
};

// []runeによるスライス処理をJavaScriptのArray.from()で再現（サロゲートペア対策）
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

// go saveAccessLog() の代替となる非同期関数
const saveAccessLog = async (postalCode: string) => {
  try {
    await db.insert(accessLogs).values({ postalCode });
  } catch (e) {
    console.error("Access log save error:", e);
  }
};

// --- ルーティング ---

// 1. トップページ (r.LoadHTMLGlob の代用としてJSX/htmlタグを使用)
app.use("/*", serveStatic({ root: "./public" }));

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
    // Ginの c.ShouldBindQuery 失敗時の挙動を再現
    if (!result.success) {
      return c.json(
        { error: "Validation failed", details: result.error.message },
        404,
      );
    }
  }),
  async (c) => {
    const { postal_code } = c.req.valid("query");

    try {
      const resp = await fetch(API_URL + postal_code);
      const apiRes = await resp.json();
      const locations = apiRes.response?.location;

      if (!locations || locations.length === 0) {
        saveAccessLog(postal_code); // awaitせずに流し放しにする（ゴルーチン的な挙動）
        return c.json(
          { error: "location not found", details: "location not found" },
          404,
        );
      }

      let res = {
        postal_code: locations[0].postal,
        hit_count: locations.length,
        address: fmtAddr(locations[0]),
        tokyo_sta_distance: getDistance(
          parseFloat(locations[0].x),
          parseFloat(locations[0].y),
        ),
      };

      if (res.hit_count > 1) {
        for (let i = 1; i < res.hit_count; i++) {
          const loc = locations[i];
          res.address = getCommonPrefix(res.address, fmtAddr(loc));
          const dis = getDistance(parseFloat(loc.x), parseFloat(loc.y));

          if (dis > res.tokyo_sta_distance) {
            res.address = fmtAddr(loc);
            res.tokyo_sta_distance = dis;
          }
        }
      }

      saveAccessLog(postal_code);
      return c.json(res, 200);
    } catch (error: any) {
      saveAccessLog(postal_code);
      return c.json(
        { error: "location not found", details: error.message },
        404,
      );
    }
  },
);

// 3. アクセスログ集計API
app.get("/access_logs", async (c) => {
  try {
    const list = await db
      .select({
        postal_code: accessLogs.postalCode,
        // count(*) は文字列で返ってくることがあるためNumberにキャスト
        request_count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(accessLogs)
      .groupBy(accessLogs.postalCode)
      .orderBy(desc(sql`count(*)`));

    return c.json({ access_logs: list }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// サーバー起動
const port = 8080;
console.log(`Server is running on port ${port}`);
serve({ fetch: app.fetch, port });
