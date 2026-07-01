use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::{Html, Json},
    routing::get,
    Router,
};
use moka::future::Cache;
use sea_orm::{
    ActiveValue::Set, ColumnTrait, Database, DatabaseConnection, EntityTrait, FromQueryResult,
    QueryOrder, QuerySelect,
};
use serde::{Deserialize, Deserializer, Serialize};
use std::collections::HashMap;
use std::env;
use std::sync::{Arc, Mutex};
use std::time::Duration;
use tokio::net::TcpListener;

#[allow(unused_imports)]
mod entities;
use entities::access_logs;

// --- 定数 ---
const API_URL: &str = "https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=";
const CACHE_KEY: &str = "access_logs_summary";
const XT: f64 = 139.7673068;
const YT: f64 = 35.6809591;
const R: f64 = 6371.0;

// --- アプリケーション状態 ---
#[derive(Clone)]
struct AppState {
    db: DatabaseConnection,
    http_client: reqwest::Client,
    // JSと異なりRustはマルチスレッド動作するため、スレッドセーフなArc+Mutexでバッファを包みます
    log_buffer: Arc<Mutex<HashMap<String, usize>>>,
    cache: Cache<String, String>,
}

// --- リクエスト・レスポンス用の構造体 ---
#[derive(Deserialize)]
struct AddrReq {
    postal_code: String,
}

#[derive(Deserialize, Debug)]
struct Location {
    prefecture: String,
    city: String,
    town: String,
    #[serde(deserialize_with = "deserialize_f64_from_string")]
    x: f64,
    #[serde(deserialize_with = "deserialize_f64_from_string")]
    y: f64,
    postal: String,
}

#[derive(Deserialize)]
struct PostalApiRes {
    response: PostalApiResponseInner,
}

#[derive(Deserialize)]
struct PostalApiResponseInner {
    #[serde(default)]
    location: Vec<Location>,
}

#[derive(Serialize)]
struct AddrRes {
    postal_code: String,
    hit_count: usize,
    address: String,
    tokyo_sta_distance: f64,
}

#[derive(FromQueryResult, Serialize, Deserialize)]
struct AccessCount {
    postal_code: String,
    request_count: i64,
}

#[derive(Serialize, Deserialize)]
struct AccessLogsRes {
    access_logs: Vec<AccessCount>,
}

fn deserialize_f64_from_string<'de, D>(deserializer: D) -> Result<f64, D::Error>
where
    D: Deserializer<'de>,
{
    let s: String = Deserialize::deserialize(deserializer)?;
    s.parse::<f64>().map_err(serde::de::Error::custom)
}

// --- メイン関数 ---
#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let host = env::var("DB_HOST").unwrap_or_else(|_| "localhost".to_string());
    let user = env::var("DB_USER").unwrap_or_else(|_| "kaji".to_string());
    let password = env::var("DB_PASSWORD").unwrap_or_else(|_| "kajikaji".to_string());
    let dbname = env::var("DB_NAME").unwrap_or_else(|_| "finatext".to_string());
    let port = env::var("DB_PORT").unwrap_or_else(|_| "5432".to_string());

    let dsn = format!("postgres://{}:{}@{}:{}/{}", user, password, host, port, dbname);
    let db = Database::connect(&dsn).await.expect("DB接続失敗");

    // moka キャッシュの初期化 (Goの LifeWindow: 10s 相当)
    let cache = Cache::builder()
        .time_to_live(Duration::from_secs(10))
        .build();

    let state = AppState {
        db,
        http_client: reqwest::Client::new(),
        log_buffer: Arc::new(Mutex::new(HashMap::new())),
        cache,
    };

    // 30秒ごとにログをフラッシュするバックグラウンドタスクを起動 (Goの startLogFlusher 相当)
    let flush_state = state.clone();
    tokio::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_secs(30));
        loop {
            interval.tick().await;
            flush_logs_to_db(&flush_state.db, &flush_state.log_buffer).await;
        }
    });

    let app = Router::new()
        .route("/", get(index))
        .route("/address", get(addr))
        .route("/address/access_logs", get(access_logs)) // パスをGoに合わせて修正
        .with_state(state);

    println!("Server running at http://127.0.0.1:8080");
    let listener = TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// --- ハンドラ ---

async fn index() -> Html<&'static str> {
    Html(include_str!("../templates/index.html"))
}

// アドレス検索
async fn addr(
    State(state): State<AppState>,
    Query(req): Query<AddrReq>,
) -> Result<Json<AddrRes>, (StatusCode, Json<serde_json::Value>)> {
    // バリデーション失敗時は Go に合わせて BAD_REQUEST(400) を返すよう修正
    let pc_len = req.postal_code.chars().count();
    if pc_len < 7 || pc_len > 8 || !req.postal_code.chars().all(|c| c.is_ascii_alphanumeric()) {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(serde_json::json!({
                "error": "Validation failed",
                "details": "postal_code must be alphanumeric and length between 7 and 8"
            })),
        ));
    }

    let url = format!("{}{}", API_URL, req.postal_code);
    let resp = state.http_client.get(&url).send().await;

    let api_res = match resp {
        Ok(res) if res.status().is_success() => res.json::<PostalApiRes>().await.ok(),
        _ => None,
    };

    let locations = match api_res {
        Some(res) if !res.response.location.is_empty() => res.response.location,
        _ => {
            enqueue_access_log(&state.log_buffer, &state.cache, req.postal_code).await;
            return Err((
                StatusCode::NOT_FOUND,
                Json(serde_json::json!({
                    "error": "location not found",
                    "details": "No data returned from API"
                })),
            ));
        }
    };

    // 複数ヒット時の共通接頭辞・最大距離ロジックのバグを修正
    let mut common_address = fmt_addr(&locations[0]);
    let mut max_distance = get_distance(locations[0].x, locations[0].y);

    if locations.len() > 1 {
        for loc in locations.iter().skip(1) {
            let loc_addr = fmt_addr(loc);
            common_address = get_common_prefix(&common_address, &loc_addr);

            let dis = get_distance(loc.x, loc.y);
            if dis > max_distance {
                max_distance = dis;
            }
        }
    }

    let res = AddrRes {
        postal_code: locations[0].postal.clone(),
        hit_count: locations.len(),
        address: common_address,
        tokyo_sta_distance: max_distance,
    };

    enqueue_access_log(&state.log_buffer, &state.cache, req.postal_code).await;

    Ok(Json(res))
}

// アクセスログの取得
async fn access_logs(
    State(state): State<AppState>,
) -> Result<Json<AccessLogsRes>, (StatusCode, Json<serde_json::Value>)> {
    // 検索前に現在のバッファの内容を強制的にDBへ書き込む (Goの挙動を再現)
    flush_logs_to_db(&state.db, &state.log_buffer).await;

    // キャッシュをチェック
    if let Some(cached_json) = state.cache.get(CACHE_KEY).await {
        if let Ok(res) = serde_json::from_str::<AccessLogsRes>(&cached_json) {
            return Ok(Json(res));
        }
    }

    // キャッシュがない場合はDBから集計
    let list_result = access_logs::Entity::find()
        .select_only()
        .column(access_logs::Column::PostalCode)
        .column_as(access_logs::Column::Id.count(), "request_count")
        .group_by(access_logs::Column::PostalCode)
        .order_by_desc(sea_orm::sea_query::Expr::col(
            sea_orm::sea_query::Alias::new("request_count"),
        ))
        .into_model::<AccessCount>()
        .all(&state.db)
        .await;

    match list_result {
        Ok(list) => {
            let res = AccessLogsRes { access_logs: list };
            // 結果をシリアライズしてキャッシュに格納
            if let Ok(json_str) = serde_json::to_string(&res) {
                state.cache.insert(CACHE_KEY.to_string(), json_str).await;
            }
            Ok(Json(res))
        }
        Err(err) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(serde_json::json!({ "error": err.to_string() })),
        )),
    }
}

// --- ユーティリティ関数 ---

fn fmt_addr(l: &Location) -> String {
    format!("{}{}{}", l.prefecture, l.city, l.town)
}

fn get_common_prefix(s1: &str, s2: &str) -> String {
    let r1: Vec<char> = s1.chars().collect();
    let r2: Vec<char> = s2.chars().collect();
    let min_len = r1.len().min(r2.len());

    let mut i = 0;
    while i < min_len && r1[i] == r2[i] {
        i += 1;
    }
    r1[..i].iter().collect()
}

fn get_distance(x: f64, y: f64) -> f64 {
    let term1 = (x - XT) * ((std::f64::consts::PI * (y + YT) / 360.0).cos());
    let term2 = y - YT;
    let val = (std::f64::consts::PI * R / 180.0) * ((term1 * term1) + (term2 * term2)).sqrt();
    (val * 10.0).round() / 10.0
}

// バッファへの追加とキャッシュパージ
async fn enqueue_access_log(
    buffer: &Arc<Mutex<HashMap<String, usize>>>,
    cache: &Cache<String, String>,
    postal: String,
) {
    if let Ok(mut lock) = buffer.lock() {
        *lock.entry(postal).or_insert(0) += 1;
    }
    // ログに変動があったため、キャッシュを即座に削除 (Goの cache.Delete 相当)
    cache.invalidate(CACHE_KEY).await;
}

// バッファからDBへの一括書き込み (バルクインサート)
async fn flush_logs_to_db(db: &DatabaseConnection, buffer: &Arc<Mutex<HashMap<String, usize>>>) {
    let current_logs = {
        let mut lock = match buffer.lock() {
            Ok(l) => l,
            Err(_) => return,
        };
        if lock.is_empty() {
            return;
        }
        // 中身をごっそり取り出してバッファをクリア
        std::mem::take(&mut *lock)
    };

    let mut models = Vec::new();
    for (postal, count) in current_logs {
        for _ in 0..count {
            models.push(access_logs::ActiveModel {
                postal_code: Set(postal.clone()),
                ..Default::default()
            });
        }
    }

    // SeaORMの insert_many を使い、2000件ずつのチャンクに分けてバルクインサート (Goの CreateInBatches 相当)
    if !models.is_empty() {
        for chunk in models.chunks(2000) {
            if let Err(e) = access_logs::Entity::insert_many(chunk.to_vec())
                .exec(db)
                .await
            {
                eprintln!("ログのバルクインサートに失敗しました: {}", e);
            }
        }
    }
}