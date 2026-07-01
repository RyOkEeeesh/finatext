
# 負荷テスト結果レポート: go_address-mixed_10_30s
テスト実行時間: 30.9767 sec

## エンドポイント別詳細

### 全体結果
成功率:      99.95%
最遅:        513.1250 ms
最速:        0.1460 ms
平均:        0.3766 ms
毎秒リクエスト数:   5664.8338/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.2, 0.3, 0.3, 0.3, 0.4, 0.5, 14.6, 181.6]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [175398, 7, 10, 55, 0, 0, 0, 0, 8]
```

---

### [/address] (郵便番号検索)
成功率:      66.38%
最遅:        513.1250 ms
最速:        6.0970 ms
平均:        34.8455 ms
毎秒リクエスト数:   7.5863/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [10.9, 13.9, 18.0, 30.8, 113.1, 508.4, 512.5, 513.1]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [215, 7, 5, 0, 0, 0, 0, 0, 8]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        195.8370 ms
最速:        0.1460 ms
平均:        0.3303 ms
毎秒リクエスト数:   5657.2475/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.2, 0.3, 0.3, 0.3, 0.4, 0.5, 1.3, 174.2]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [175183, 0, 5, 55, 0, 0, 0, 0, 0]
```

