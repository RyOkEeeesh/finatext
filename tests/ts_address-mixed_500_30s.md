
# 負荷テスト結果レポート: ts_address-mixed_500_30s
テスト実行時間: 32.5220 sec

## エンドポイント別詳細

### 全体結果
成功率:      90.51%
最遅:        5317.2180 ms
最速:        0.1730 ms
平均:        28.3777 ms
毎秒リクエスト数:   3775.6591/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.6, 0.8, 7.1, 10.5, 1011.1, 2482.0, 3624.7]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [119019, 151, 48, 59, 156, 170, 148, 238, 2803]
```

---

### [/address] (郵便番号検索)
成功率:      1.33%
最遅:        3493.7890 ms
最速:        4.8030 ms
平均:        35.7775 ms
毎秒リクエスト数:   363.0773/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [7.1, 8.3, 10.2, 13.3, 37.1, 1127.6, 2486.6, 3490.9]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [11301, 138, 25, 7, 71, 49, 2, 39, 176]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        5317.2180 ms
最速:        0.1730 ms
平均:        27.5904 ms
毎秒リクエスト数:   3412.5818/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.7, 1.1, 2.0, 1007.1, 2470.3, 3631.9]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [107718, 13, 23, 52, 85, 121, 146, 199, 2627]
```

