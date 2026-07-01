import http from 'k6/http';
import { makeEndpointSection } from './src/utils.js';
import { summaryTrendStats, hist50, hist100, hist150, hist200, hist250, hist300, hist350, hist400, histOver } from './src/lib.js';
import { Count } from './src/class.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { sleep } from 'k6';

const host = __ENV.HOST || 'localhost';
const targetVus = __ENV.VUS ? parseInt(__ENV.VUS, 10) : 10;
const targetDuration = __ENV.DURATION || '10s';

export const options = {
  summaryTrendStats,
  scenarios: {
    address_api: {
      executor: 'constant-vus',
      vus: Math.ceil(targetVus * 0.8),
      duration: targetDuration,
      exec: 'addressTest',
    },
    access_logs_api: {
      executor: 'constant-vus',
      vus: Math.max(1, Math.floor(targetVus * 0.2)),
      duration: targetDuration,
      exec: 'logsTest',
    },
  },

  thresholds: {
    'http_req_duration{name:address}': ['max>=0'],
    'http_req_failed{name:address}': ['rate>=0'],
    'http_reqs{name:address}': ['count>=0'],
    [`${hist50}{name:address}`]: ['count>=0'],
    [`${hist100}{name:address}`]: ['count>=0'],
    [`${hist150}{name:address}`]: ['count>=0'],
    [`${hist200}{name:address}`]: ['count>=0'],
    [`${hist250}{name:address}`]: ['count>=0'],
    [`${hist300}{name:address}`]: ['count>=0'],
    [`${hist350}{name:address}`]: ['count>=0'],
    [`${hist400}{name:address}`]: ['count>=0'],
    [`${histOver}{name:address}`]: ['count>=0'],

    'http_req_duration{name:access_logs}': ['max>=0'],
    'http_req_failed{name:access_logs}': ['rate>=0'],
    'http_reqs{name:access_logs}': ['count>=0'],
    [`${hist50}{name:access_logs}`]: ['count>=0'],
    [`${hist100}{name:access_logs}`]: ['count>=0'],
    [`${hist150}{name:access_logs}`]: ['count>=0'],
    [`${hist200}{name:access_logs}`]: ['count>=0'],
    [`${hist250}{name:access_logs}`]: ['count>=0'],
    [`${hist300}{name:access_logs}`]: ['count>=0'],
    [`${hist350}{name:access_logs}`]: ['count>=0'],
    [`${hist400}{name:access_logs}`]: ['count>=0'],
    [`${histOver}{name:access_logs}`]: ['count>=0'],
  },
};

const counter = new Count();
const postalCodes = ['1000001', '1500043', '1600022', '1010021', '3501124'];

export function addressTest() {
  const randomCode = postalCodes[Math.floor(Math.random() * postalCodes.length)];
  const res = http.get(`http://${host}:8080/address?postal_code=${randomCode}`, {
    tags: { name: 'address' },
  });
  counter.addCount(res.timings.duration, { name: 'address' });
  sleep(1);
}

export function logsTest() {
  const res = http.get(`http://${host}:8080/address/access_logs`, {
    tags: { name: 'access_logs' },
  });
  counter.addCount(res.timings.duration, { name: 'access_logs' });
}

export function handleSummary(data) {
  const metrics = data.metrics;
  const testName = __ENV.NAME || 'finatext';

  const totalDurationSeconds = (data.state.testRunDurationMs / 1000).toFixed(4);
  const globalSection = makeEndpointSection('全体結果', metrics.http_req_duration, metrics.http_req_failed, metrics.http_reqs, metrics);

  const addrMetricsMap = {};
  [hist50, hist100, hist150, hist200, hist250, hist300, hist350, hist400, histOver].forEach(h => {
    addrMetricsMap[h] = metrics[`${h}{name:address}`];
  });
  const addressSection = makeEndpointSection(
    '[/address] (郵便番号検索)',
    metrics['http_req_duration{name:address}'],
    metrics['http_req_failed{name:address}'],
    metrics['http_reqs{name:address}'],
    addrMetricsMap
  );

  const logsMetricsMap = {};
  [hist50, hist100, hist150, hist200, hist250, hist300, hist350, hist400, histOver].forEach(h => {
    logsMetricsMap[h] = metrics[`${h}{name:access_logs}`];
  });
  const logsSection = makeEndpointSection(
    '[/address/access_logs] (ログ集計)',
    metrics['http_req_duration{name:access_logs}'],
    metrics['http_req_failed{name:access_logs}'],
    metrics['http_reqs{name:access_logs}'],
    logsMetricsMap
  );

  const customMarkdown = `
# 負荷テスト結果レポート: ${testName}_address-mixed_${targetVus}_${targetDuration}
テスト実行時間: ${totalDurationSeconds} sec

## エンドポイント別詳細
${globalSection}
---
${addressSection}
---
${logsSection}
`;

  const reportName = `${testName}_address-mixed_${targetVus}_${targetDuration}`;
  
  return {
    [`tests/${reportName}.md`]: customMarkdown,
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}