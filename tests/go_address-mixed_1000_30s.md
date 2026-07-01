
# 負荷テスト結果レポート: go_address-mixed_1000_30s
テスト実行時間: 31.1836 sec

## エンドポイント別詳細

### 全体結果
成功率:      72.25%
最遅:        5582.5530 ms
最速:        0.1590 ms
平均:        55.1056 ms
毎秒リクエスト数:   4138.8703/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.7, 1.5, 12.2, 85.1, 245.3, 1018.2, 3362.8, 3980.8]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [113115, 4626, 2069, 1666, 1249, 914, 932, 555, 3939]
```

---

### [/address] (郵便番号検索)
成功率:      0.67%
最遅:        1037.9190 ms
最速:        6.3600 ms
平均:        44.5687 ms
毎秒リクエスト数:   749.2713/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [12.0, 15.3, 19.5, 30.9, 84.6, 712.3, 1018.7, 1037.8]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [21773, 472, 33, 115, 1, 8, 41, 104, 818]
```

---

### [/address/access_logs] (ログ集計)
成功率:      88.07%
最遅:        5582.5530 ms
最速:        0.1590 ms
平均:        57.4347 ms
毎秒リクエスト数:   3389.5990/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.6, 1.1, 2.5, 95.5, 253.4, 1843.5, 3411.5, 4050.0]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [91342, 4154, 2036, 1551, 1248, 906, 891, 451, 3121]
```

