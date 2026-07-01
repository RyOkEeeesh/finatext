
# 負荷テスト結果レポート: rust_address-mixed_100_30s
テスト実行時間: 30.3475 sec

## エンドポイント別詳細

### 全体結果

| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 99.70% |
| 最遅 | 854.4600 ms |
| 最速 | 0.1320 ms |
| 平均 | 0.8307 ms |
| 毎秒リクエスト数 | 24284.9006/sec |

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.4, 0.5, 0.6, 0.6, 0.8, 18.2, 644.5]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [736343, 13, 2, 77, 55, 24, 49, 112, 310]
```

---

### [/address] (郵便番号検索)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 6.38% |
| 最遅 | 76.9020 ms |
| 最速 | 7.1940 ms |
| 平均 | 10.2073 ms |
| 毎秒リクエスト数 | 79.0841/sec |


```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [8.3, 8.9, 10.0, 13.0, 17.8, 24.0, 72.0, 76.3]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [2387, 13, 0, 0, 0, 0, 0, 0, 0]
```

---

### [/address/access_logs] (ログ集計)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 100.00% |
| 最遅 | 854.4600 ms |
| 最速 | 0.1320 ms |
| 平均 | 0.8001 ms |
| 毎秒リクエスト数 | 24205.8165/sec |


```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.4, 0.5, 0.6, 0.6, 0.7, 2.9, 645.1]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [733956, 0, 2, 77, 55, 24, 49, 112, 310]
```

