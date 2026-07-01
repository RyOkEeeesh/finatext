
# 負荷テスト結果レポート: go_unuse_cache_address/access_logs_100_30s

## 結果
成功率:      99.48%
時間:        30.1984 sec
最遅:        884.8720 ms
最速:        6.4140 ms
平均:        250.8656 ms
毎秒リクエスト数:   397.0735/sec

```mermaid
xychart-beta
  title "Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [118.0, 218.8, 356.5, 471.2, 550.9, 674.6, 790.0, 868.6]
```

## 秒数ごとのリクエスト回数ヒストグラム
```mermaid
xychart-beta
  title "Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [180, 2010, 1912, 1425, 1275, 1117, 964, 915, 2193]
```
