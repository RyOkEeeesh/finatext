
# 負荷テスト結果レポート: go_use_cache_address/access_logs_100_30s

## 結果
成功率:      100.00%
時間:        30.0010 sec
最遅:        106.2270 ms
最速:        0.2420 ms
平均:        1.6524 ms
毎秒リクエスト数:   59856.8854/sec

```mermaid
xychart-beta
  title "Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [1.3, 1.4, 1.4, 1.9, 4.4, 6.6, 12.5, 25.2]
```

## 秒数ごとのリクエスト回数ヒストグラム
```mermaid
xychart-beta
  title "Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [1795763, 0, 3, 0, 0, 0, 0, 0, 0]
```
