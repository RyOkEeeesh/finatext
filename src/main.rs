use axum::{
    Router,
    extract::{Query, State},
    http::StatusCode,
    response::{Html, Json},
    routing::get,
};
use sea_orm::{
    ColumnTrait, Database, DatabaseConnection, EntityTrait, FromQueryResult, QueryOrder,
    QuerySelect,
};
use serde::{Deserialize, Deserializer, Serialize};
use std::env;
use tokio::net::TcpListener;

#[allow(unused_imports)]
mod entities;
use entities::access_logs;

// --- 定数 ---
const API_URL: &str = "https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=";
const XT: f64 = 139.7673068;
const YT: f64 = 35.6809591;
const R: f64 = 6371.0;

// --- アプリケーション状態 ---
#[derive(Clone)]
struct AppState {
    db: DatabaseConnection,
    http_client: reqwest::Client,
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
    // HeartRails APIは数値を文字列で返すため、変換用の関数を指定（Goの json:"x,string" 相当）
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

#[derive(FromQueryResult, Serialize)]
struct AccessCount {
    postal_code: String,
    request_count: i64,
}

#[derive(Serialize)]
struct AccessLogsRes {
    access_logs: Vec<AccessCount>,
}

// --- 文字列からf64への変換ヘルパー ---
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

    let dsn = format!(
        "postgres://{}:{}@{}:{}/{}",
        user, password, host, port, dbname
    );

    let db = Database::connect(&dsn).await.expect("DB接続失敗");

    let state = AppState {
        db,
        http_client: reqwest::Client::new(),
    };

    let app = Router::new()
        .route("/", get(index))
        .route("/address", get(addr))
        .route("/access_logs", get(access_logs))
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
    // バリデーション: required, alphanum, min=7, max=8
    let pc_len = req.postal_code.chars().count();
    if pc_len < 7 || pc_len > 8 || !req.postal_code.chars().all(|c| c.is_ascii_alphanumeric()) {
        return Err((
            StatusCode::NOT_FOUND,
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
            // DB保存を非同期実行 (Goの goroutine 相当)
            save_access_log(state.db.clone(), req.postal_code);
            return Err((
                StatusCode::NOT_FOUND,
                Json(serde_json::json!({
                    "error": "location not found",
                    "details": "No data returned from API"
                })),
            ));
        }
    };

    let mut res = AddrRes {
        postal_code: locations[0].postal.clone(),
        hit_count: locations.len(),
        address: fmt_addr(&locations[0]),
        tokyo_sta_distance: get_distance(locations[0].x, locations[0].y),
    };

    if res.hit_count > 1 {
        for loc in locations.iter().skip(1) {
            let loc_addr = fmt_addr(loc);
            res.address = get_common_prefix(&res.address, &loc_addr);

            let dis = get_distance(loc.x, loc.y);
            // Go言語版の仕様を忠実に再現 (上書きロジック)
            if dis > res.tokyo_sta_distance {
                res.address = loc_addr;
                res.tokyo_sta_distance = dis;
            }
        }
    }

    // DB保存を非同期実行
    save_access_log(state.db.clone(), req.postal_code);

    Ok(Json(res))
}

// アクセスログの取得
async fn access_logs(
    State(state): State<AppState>,
) -> Result<Json<AccessLogsRes>, (StatusCode, Json<serde_json::Value>)> {
    // SeaORM を使った GROUP BY と ORDER BY の組み立て
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
        Ok(list) => Ok(Json(AccessLogsRes { access_logs: list })),
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

// 非同期でDBに保存する処理（Tokioのスレッドプールで実行）
fn save_access_log(db: DatabaseConnection, postal: String) {
    tokio::spawn(async move {
        use sea_orm::ActiveValue::Set;
        let log = access_logs::ActiveModel {
            postal_code: Set(postal),
            ..Default::default()
        };
        // エラーハンドリングはログ出力等に留めるのが一般的
        if let Err(e) = access_logs::Entity::insert(log).exec(&db).await {
            eprintln!("Failed to save access log: {}", e);
        }
    });
}
