
# 負荷テスト結果レポート: go_address-mixed_50_30s
テスト実行時間: 30.4747 sec

## エンドポイント別詳細

### 全体結果
成功率:      99.82%
最遅:        438.0120 ms
最速:        0.1510 ms
平均:        0.5346 ms
毎秒リクエスト数:   19000.3089/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.3, 0.4, 0.4, 0.5, 0.5, 0.6, 20.5, 342.6]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [578719, 9, 64, 51, 6, 64, 66, 44, 6]
```

---

### [/address] (郵便番号検索)
成功率:      13.00%
最遅:        102.2350 ms
最速:        5.2300 ms
平均:        15.1786 ms
毎秒リクエスト数:   39.3769/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [8.4, 13.7, 19.6, 25.8, 28.3, 35.1, 97.7, 101.7]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [1190, 9, 1, 0, 0, 0, 0, 0, 0]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        438.0120 ms
最速:        0.1510 ms
平均:        0.5042 ms
毎秒リクエスト数:   18960.9320/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.3, 0.4, 0.4, 0.5, 0.5, 0.6, 1.2, 342.9]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [577529, 0, 63, 51, 6, 64, 66, 44, 6]
```

