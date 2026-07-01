
# 負荷テスト結果レポート: rust_address-mixed_500_30s
テスト実行時間: 32.0198 sec

## エンドポイント別詳細

### 全体結果
成功率:      98.25%
最遅:        4822.5580 ms
最速:        0.1370 ms
平均:        4.8603 ms
毎秒リクエスト数:   21167.3430/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.4, 0.6, 0.7, 0.8, 9.1, 1997.7, 2521.4]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [675971, 8, 190, 6, 6, 6, 210, 16, 1362]
```

---

### [/address] (郵便番号検索)
成功率:      1.33%
最遅:        355.9380 ms
最速:        6.2750 ms
平均:        17.7557 ms
毎秒リクエスト数:   374.7676/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [7.8, 8.8, 10.1, 13.0, 33.6, 326.1, 348.8, 351.9]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [11566, 8, 190, 5, 4, 5, 210, 12, 0]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        4822.5580 ms
最速:        0.1370 ms
平均:        4.6279 ms
毎秒リクエスト数:   20792.5754/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.4, 0.5, 0.7, 0.7, 1.0, 2010.6, 2528.0]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [664405, 0, 0, 1, 2, 1, 0, 4, 1362]
```

