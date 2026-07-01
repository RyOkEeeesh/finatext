
# 負荷テスト結果レポート: go_use_cache_address_mixed_address-mixed_100_30s
テスト実行時間: 30.3405 sec

## エンドポイント別詳細

### 全体結果

| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 99.78% |
| 最遅 | 197.3800 ms |
| 最速 | 0.1500 ms |
| 平均 | 0.5859 ms |
| 毎秒リクエスト数 | 34013.2821/sec |

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.6, 0.6, 0.7, 0.8, 11.3, 125.7]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [1031372, 296, 291, 20, 0, 0, 0, 0, 0]
```

---

### [/address] (郵便番号検索)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 6.54% |
| 最遅 | 87.2070 ms |
| 最速 | 4.9910 ms |
| 平均 | 9.3294 ms |
| 毎秒リクエスト数 | 79.1023/sec |


```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [6.4, 7.3, 9.1, 14.7, 20.9, 33.9, 85.0, 86.9]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [2388, 12, 0, 0, 0, 0, 0, 0, 0]
```

---

### [/address/access_logs] (ログ集計)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 100.00% |
| 最遅 | 197.3800 ms |
| 最速 | 0.1500 ms |
| 平均 | 0.5655 ms |
| 毎秒リクエスト数 | 33934.1799/sec |


```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.6, 0.6, 0.7, 0.8, 1.7, 125.7]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [1028984, 284, 291, 20, 0, 0, 0, 0, 0]
```

