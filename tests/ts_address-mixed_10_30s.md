
# 負荷テスト結果レポート: ts_address-mixed_10_30s
テスト実行時間: 30.9821 sec

## エンドポイント別詳細

### 全体結果
成功率:      99.95%
最遅:        181.7220 ms
最速:        0.1660 ms
平均:        0.4109 ms
毎秒リクエスト数:   5144.3637/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.3, 0.3, 0.3, 0.4, 0.4, 1.8, 15.7, 135.3]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [159272, 35, 71, 5, 0, 0, 0, 0, 0]
```

---

### [/address] (郵便番号検索)
成功率:      66.67%
最遅:        181.7220 ms
最速:        6.2680 ms
平均:        31.4289 ms
毎秒リクエスト数:   7.7464/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [11.7, 14.0, 36.9, 80.2, 134.0, 179.5, 181.4, 181.7]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [191, 32, 12, 5, 0, 0, 0, 0, 0]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        142.6740 ms
最速:        0.1660 ms
平均:        0.3642 ms
毎秒リクエスト数:   5136.6173/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.3, 0.3, 0.3, 0.4, 0.4, 1.7, 2.3, 130.9]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [159081, 3, 59, 0, 0, 0, 0, 0, 0]
```

