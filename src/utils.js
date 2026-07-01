import { p_25, p_75, p_90, p_95, p_99, p_999, p_9999, hist50, hist100, hist150, hist200, hist250, hist300, hist350, hist400, histOver } from './lib.js';

export function makeEndpointSection(title, durationMetric, failedMetric, reqsMetric, metricsAll) {
  if (!durationMetric || !failedMetric) return `### ${title}\nデータがありません。\n`;

  const duration = durationMetric.values;
  const httpReqFailed = failedMetric.values;

  const httpReqs = reqsMetric ? reqsMetric.values : { rate: 0 };

  const successRate = (100 - (httpReqFailed.rate * 100)).toFixed(2);
  const requestsPerSec = httpReqs.rate.toFixed(4);

  const p25 = duration[p_25] || 0;
  const p50 = duration.med || 0;
  const p75 = duration[p_75] || 0;
  const p90 = duration[p_90] || 0;
  const p95 = duration[p_95] || 0;
  const p99 = duration[p_99] || 0;
  const p999 = duration[p_999] || 0;
  const p9999 = duration[p_9999] || 0;

  const getSubHist = (histKey) => metricsAll[histKey] ? metricsAll[histKey].values.count : 0;

  return `
### ${title}
成功率:      ${successRate}%
最遅:        ${(duration.max).toFixed(4)} ms
最速:        ${(duration.min).toFixed(4)} ms
平均:        ${(duration.avg).toFixed(4)} ms
${reqsMetric ? `毎秒リクエスト数:   ${requestsPerSec}/sec` : ''}

\`\`\`mermaid
xychart-beta
  title "${title} - Response Time Percentiles (ms)"
  x-axis ["25%", "50%", "75%", "90%", "95%", "99%", "99.9%", "99.99%"]
  y-axis "Latency (ms)"
  bar [${p25.toFixed(1)}, ${p50.toFixed(1)}, ${p75.toFixed(1)}, ${p90.toFixed(1)}, ${p95.toFixed(1)}, ${p99.toFixed(1)}, ${p999.toFixed(1)}, ${p9999.toFixed(1)}]
\`\`\`

\`\`\`mermaid
xychart-beta
  title "${title} - Responses per Latency Range (Count)"
  x-axis ["~50ms", "51~100ms", "101~150ms", "151~200ms", "201~250ms", "251~300ms", "301~350ms", "351~400ms", "401ms~"]
  y-axis "Request Count"
  bar [${getSubHist(hist50)}, ${getSubHist(hist100)}, ${getSubHist(hist150)}, ${getSubHist(hist200)}, ${getSubHist(hist250)}, ${getSubHist(hist300)}, ${getSubHist(hist350)}, ${getSubHist(hist400)}, ${getSubHist(histOver)}]
\`\`\`
`;
}