
# 負荷テスト結果レポート: ts_address-mixed_1000_30s
テスト実行時間: 31.2787 sec

## エンドポイント別詳細

### 全体結果
成功率:      24.51%
最遅:        7600.2650 ms
最速:        0.2360 ms
平均:        248.4311 ms
毎秒リクエスト数:   966.4720/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [6.2, 8.2, 12.1, 1039.1, 2431.1, 2905.4, 3986.7, 7596.3]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [25516, 179, 60, 110, 272, 275, 80, 48, 3690]
```

---

### [/address] (郵便番号検索)
成功率:      0.70%
最遅:        7600.2650 ms
最速:        4.8370 ms
平均:        60.8693 ms
毎秒リクエスト数:   734.6849/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [6.8, 8.4, 11.2, 14.9, 251.0, 1123.9, 4000.3, 7596.6]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [21213, 179, 59, 106, 270, 267, 77, 43, 766]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        5358.7730 ms
最速:        0.2360 ms
平均:        842.9373 ms
毎秒リクエスト数:   231.7870/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.8, 1.1, 2005.7, 2608.5, 2755.6, 3114.8, 3821.1, 4864.3]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [4303, 0, 1, 4, 2, 8, 3, 5, 2924]
```

