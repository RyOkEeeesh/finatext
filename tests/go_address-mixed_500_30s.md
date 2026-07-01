
# 負荷テスト結果レポート: go_address-mixed_500_30s
テスト実行時間: 31.1009 sec

## エンドポイント別詳細

### 全体結果
成功率:      95.37%
最遅:        3452.7720 ms
最速:        0.1530 ms
平均:        13.6551 ms
毎秒リクエスト数:   8082.9706/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.6, 1.2, 7.2, 38.3, 2395.4, 2903.3]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [249174, 220, 29, 4, 33, 98, 2, 0, 1828]
```

---

### [/address] (郵便番号検索)
成功率:      1.33%
最遅:        635.4700 ms
最速:        4.7600 ms
平均:        31.7303 ms
毎秒リクエスト数:   379.0239/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [7.9, 11.2, 18.4, 30.8, 59.3, 620.6, 630.8, 634.6]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [11133, 206, 27, 4, 33, 98, 1, 0, 286]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        3452.7720 ms
最速:        0.1530 ms
平均:        12.7659 ms
毎秒リクエスト数:   7703.9467/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.3, 0.5, 0.6, 0.9, 1.2, 5.1, 2406.0, 2925.8]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [238041, 14, 2, 0, 0, 0, 1, 0, 1542]
```

