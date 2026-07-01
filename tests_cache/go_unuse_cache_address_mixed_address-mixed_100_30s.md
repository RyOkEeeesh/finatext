
# 負荷テスト結果レポート: go_unuse_cache_address_mixed_address-mixed_100_30s
テスト実行時間: 31.0229 sec

## エンドポイント別詳細

### 全体結果
成功率:      77.37%
最遅:        689.1050 ms
最速:        5.1430 ms
平均:        70.4699 ms
毎秒リクエスト数:   311.9627/sec

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [35.9, 58.6, 96.8, 126.0, 150.8, 209.4, 683.7, 688.2]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [3633, 3889, 1659, 389, 25, 3, 0, 0, 80]
```

---

### [/address] (郵便番号検索)
成功率:      6.69%
最遅:        689.1050 ms
最速:        5.1430 ms
平均:        34.8172 ms
毎秒リクエスト数:   75.6537/sec

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [7.0, 9.2, 14.7, 20.7, 40.5, 680.7, 687.3, 688.9]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [2243, 10, 4, 10, 0, 0, 0, 0, 80]
```

---

### [/address/access_logs] (ログ集計)
成功率:      100.00%
最遅:        254.9660 ms
最速:        24.8090 ms
平均:        81.8840 ms
毎秒リクエスト数:   236.3090/sec

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [53.9, 71.3, 103.7, 131.3, 154.2, 185.4, 219.8, 253.3]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [1390, 3879, 1655, 379, 25, 3, 0, 0, 0]
```

