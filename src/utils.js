import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { p_25, p_75, p_90, p_95, p_99, p_999, p_9999, hist50, hist100, hist150, hist200, hist250, hist300, hist350, hist400, histOver } from './lib.js';

export function makeMarkdownSummary(data, testName = 'load_test') {
  const duration = data.metrics.http_req_duration.values;
  const httpReqs = data.metrics.http_reqs.values;
  const httpReqFailed = data.metrics.http_req_failed.values;

  const successRate = (100 - (httpReqFailed.rate * 100)).toFixed(2);
  const totalDurationSeconds = (data.state.testRunDurationMs / 1000).toFixed(4);
  const requestsPerSec = httpReqs.rate.toFixed(4);

  const p25 = duration[p_25] || 0;
  const p50 = duration.med || 0;
  const p75 = duration[p_75] || 0;
  const p90 = duration[p_90] || 0;
  const p95 = duration[p_95] || 0;
  const p99 = duration[p_99] || 0;
  const p999 = duration[p_999] || 0;
  const p9999 = duration[p_9999] || 0;

  const h50 = data.metrics[hist50] ? data.metrics[hist50].values.count : 0;
  const h100 = data.metrics[hist100] ? data.metrics[hist100].values.count : 0;
  const h150 = data.metrics[hist150] ? data.metrics[hist150].values.count : 0;
  const h200 = data.metrics[hist200] ? data.metrics[hist200].values.count : 0;
  const h250 = data.metrics[hist250] ? data.metrics[hist250].values.count : 0;
  const h300 = data.metrics[hist300] ? data.metrics[hist300].values.count : 0;
  const h350 = data.metrics[hist350] ? data.metrics[hist350].values.count : 0;
  const h400 = data.metrics[hist400] ? data.metrics[hist400].values.count : 0;
  const hOver = data.metrics[histOver] ? data.metrics[histOver].values.count : 0;

  const markdown = `
# 負荷テスト結果レポート: ${testName}

## 結果
成功率:      ${successRate}%
時間:        ${totalDurationSeconds} sec
最遅:        ${(duration.max).toFixed(4)} ms
最速:        ${(duration.min).toFixed(4)} ms
平均:        ${(duration.avg).toFixed(4)} ms
毎秒リクエスト数:   ${requestsPerSec}/sec

\`\`\`mermaid
xychart-beta
  title "Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [${p25.toFixed(1)}, ${p50.toFixed(1)}, ${p75.toFixed(1)}, ${p90.toFixed(1)}, ${p95.toFixed(1)}, ${p99.toFixed(1)}, ${p999.toFixed(1)}, ${p9999.toFixed(1)}]
\`\`\`

## 秒数ごとのリクエスト回数ヒストグラム
\`\`\`mermaid
xychart-beta
  title "Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [${h50}, ${h100}, ${h150}, ${h200}, ${h250}, ${h300}, ${h350}, ${h400}, ${hOver}]
\`\`\`
`;

  return {
    [`tests/${testName.replace('/', '-')}.md`]: markdown,
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}