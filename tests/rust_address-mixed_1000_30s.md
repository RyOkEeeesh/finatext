
# 負荷テスト結果レポート: rust_address-mixed_1000_30s
テスト実行時間: 33.7555 sec

## エンドポイント別詳細

### 全体結果
成功率:      96.11%
最遅:        9726.1150 ms
最速:        0.1380 ms
平均:        10.9208 ms
毎秒リクエスト数:   18156.0694/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.6, 0.7, 1.0, 10.3, 4009.0, 7992.5]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [610135, 434, 541, 176, 105, 1, 1, 2, 1472]
```

---

### [/address] (郵便番号検索)
成功率:      0.66%
最遅:        231.8840 ms
最速:        4.7390 ms
平均:        14.7834 ms
毎秒リクエスト数:   710.9955/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [7.1, 8.0, 9.4, 17.6, 51.6, 152.0, 224.7, 231.2]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [22773, 434, 516, 175, 102, 0, 0, 0, 0]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        9726.1150 ms
最速:        0.1380 ms
平均:        10.7634 ms
毎秒リクエスト数:   17445.0739/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.6, 0.7, 0.8, 1.1, 4032.2, 8000.5]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [587362, 0, 25, 1, 3, 1, 1, 2, 1472]
```

