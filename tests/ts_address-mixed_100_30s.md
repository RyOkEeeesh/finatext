
# 負荷テスト結果レポート: ts_address-mixed_100_30s
テスト実行時間: 30.9381 sec

## エンドポイント別詳細

### 全体結果

| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 99.46% |
| 最遅 | 678.4980 ms |
| 最速 | 0.1590 ms |
| 平均 | 1.5532 ms |
| 毎秒リクエスト数 | 13438.1005/sec |

```mermaid
xychart-beta
  title "全体結果 - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.6, 0.7, 0.9, 7.5, 264.1, 390.5]
```

```mermaid
xychart-beta
  title "全体結果 - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [413763, 294, 238, 563, 406, 208, 174, 73, 30]
```

---

### [/address] (郵便番号検索)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 6.68% |
| 最遅 | 678.4980 ms |
| 最速 | 5.5280 ms |
| 平均 | 20.9768 ms |
| 毎秒リクエスト数 | 77.4450/sec |


```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [9.3, 11.3, 13.2, 15.1, 24.4, 295.2, 445.6, 645.4]
```

```mermaid
xychart-beta
  title "[/address] (郵便番号検索) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [2292, 20, 3, 1, 34, 38, 4, 0, 4]
```

---

### [/address/access_logs] (ログ集計)
| 項目 | 結果 |
| :--- | :--- |
| 成功率 | 100.00% |
| 最遅 | 537.7440 ms |
| 最速 | 0.1590 ms |
| 平均 | 1.4406 ms |
| 毎秒リクエスト数 | 13360.6554/sec |


```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [0.4, 0.5, 0.6, 0.7, 0.9, 1.9, 253.7, 389.4]
```

```mermaid
xychart-beta
  title "[/address/access_logs] (ログ集計) - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [411471, 274, 235, 562, 372, 170, 170, 73, 26]
```

