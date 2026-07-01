
# 負荷テスト結果レポート: rust_address-mixed_10_30s
テスト実行時間: 29.9820 sec

## エンドポイント別詳細

### 全体結果

| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 99.96% |
| 最遅 | 726.9960 ms |
| 最速 | 0.1430 ms |
| 平均 | 0.3506 ms |
| 毎秒リクエスト数 | 6291.0849/sec |

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.2, 0.2, 0.3, 0.3, 0.3, 0.5, 13.6, 231.9]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [188545, 9, 0, 17, 40, 0, 0, 0, 8]
```

---

### [/address] (郵便番号検索)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 65.95% |
| 最遅 | 726.9960 ms |
| 最速 | 7.7150 ms |
| 平均 | 38.9197 ms |
| 毎秒リクエスト数 | 7.7380/sec |


```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [8.6, 13.3, 16.1, 19.2, 63.6, 722.6, 726.6, 727.0]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [216, 8, 0, 0, 0, 0, 0, 0, 8]
```

---

### [/address/access_logs] (ログ集計)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 100.00% |
| 最遅 | 247.9480 ms |
| 最速 | 0.1430 ms |
| 平均 | 0.3031 ms |
| 毎秒リクエスト数 | 6283.3469/sec |


```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.2, 0.2, 0.3, 0.3, 0.3, 0.5, 0.6, 226.9]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [188329, 1, 0, 17, 40, 0, 0, 0, 0]
```

