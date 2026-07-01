
# 負荷テスト結果レポート: go_address-mixed_100_30s
テスト実行時間: 30.5391 sec

## エンドポイント別詳細

### 全体結果

| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 99.70% |
| 最遅 | 603.3110 ms |
| 最速 | 0.1540 ms |
| 平均 | 0.8237 ms |
| 毎秒リクエスト数 | 24622.6297/sec |

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.5, 0.6, 0.7, 0.8, 31.5, 464.2]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [751301, 39, 8, 64, 42, 17, 60, 125, 297]
```

---

### [/address] (郵便番号検索)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 6.50% |
| 最遅 | 133.1890 ms |
| 最速 | 4.9980 ms |
| 平均 | 13.5249 ms |
| 毎秒リクエスト数 | 78.5878/sec |


```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [7.9, 10.6, 14.3, 23.7, 32.4, 57.9, 92.7, 124.0]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [2360, 39, 1, 0, 0, 0, 0, 0, 0]
```

---

### [/address/access_logs] (ログ集計)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 100.00% |
| 最遅 | 603.3110 ms |
| 最速 | 0.1540 ms |
| 平均 | 0.7830 ms |
| 毎秒リクエスト数 | 24544.0419/sec |


```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.5, 0.6, 0.6, 0.8, 9.2, 464.2]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [748941, 0, 7, 64, 42, 17, 60, 125, 297]
```

