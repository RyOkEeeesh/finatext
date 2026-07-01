
# 負荷テスト結果レポート: ts_address-mixed_50_30s
テスト実行時間: 30.9238 sec

## エンドポイント別詳細

### 全体結果

| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 99.76% |
| 最遅 | 583.8160 ms |
| 最速 | 0.1500 ms |
| 平均 | 0.7442 ms |
| 毎秒リクエスト数 | 13996.5671/sec |

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.3, 0.4, 0.4, 0.5, 0.6, 1.5, 157.9, 255.8]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [431975, 270, 109, 304, 120, 18, 15, 2, 14]
```

---

### [/address] (郵便番号検索)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 13.08% |
| 最遅 | 583.8160 ms |
| 最速 | 5.7530 ms |
| 平均 | 23.8046 ms |
| 毎秒リクエスト数 | 38.8051/sec |


```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [8.0, 9.7, 12.3, 17.0, 47.4, 529.0, 581.4, 583.6]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [1143, 12, 8, 5, 0, 1, 15, 2, 14]
```

---

### [/address/access_logs] (ログ集計)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 100.00% |
| 最遅 | 265.9110 ms |
| 最速 | 0.1500 ms |
| 平均 | 0.6801 ms |
| 毎秒リクエスト数 | 13957.7620/sec |


```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.3, 0.4, 0.4, 0.5, 0.6, 1.4, 156.3, 240.5]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [430832, 258, 101, 299, 120, 17, 0, 0, 0]
```

