
# 負荷テスト結果レポート: rust_address-mixed_50_30s
テスト実行時間: 30.9145 sec

## エンドポイント別詳細

### 全体結果
成功率:      99.77%
最遅:        652.3850 ms
最速:        0.1330 ms
平均:        0.6858 ms
毎秒リクエスト数:   14588.9750/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.3, 0.3, 0.4, 0.5, 0.5, 0.6, 147.7, 468.0]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [450526, 15, 23, 120, 65, 16, 26, 103, 117]
```

---

### [/address] (郵便番号検索)
成功率:      13.00%
最遅:        348.4230 ms
最速:        6.6580 ms
平均:        12.6190 ms
毎秒リクエスト数:   38.8167/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [7.9, 8.2, 9.5, 15.0, 21.8, 112.2, 345.0, 348.1]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [1171, 15, 8, 1, 0, 1, 4, 0, 0]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        652.3850 ms
最速:        0.1330 ms
平均:        0.6540 ms
毎秒リクエスト数:   14550.1583/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.3, 0.3, 0.4, 0.5, 0.5, 0.6, 145.2, 468.0]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [449355, 0, 15, 119, 65, 15, 22, 103, 117]
```

