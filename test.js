import http from 'k6/http';
import { makeEndpointSection } from './src/utils.js';
import { summaryTrendStats } from './src/lib.js';
import { Count } from './src/class.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

const endpoint = __ENV.ENDPOINT;

export const options = {
  vus: __ENV.VUS ? parseInt(__ENV.VUS, 10) : 10,
  duration: __ENV.DURATION || '10s', 
  summaryTrendStats,
};

const counter = new Count();

export default function () {
  const res = http.get(`http://${__ENV.HOST || 'localhost'}:8080/${endpoint || ''}`);
  counter.addCount(res.timings.duration);
}

export function handleSummary(data) {
  const metrics = data.metrics;
  const endpointTitle = endpoint ? `/[${endpoint}]` : '/ (index)';

  const md = makeEndpointSection(
    endpointTitle,
    metrics.http_req_duration,
    metrics.http_req_failed,
    metrics.http_reqs,
    metrics
  );

  const reportName = `${__ENV.NAME || 'finatext'}_${endpoint || 'index'}_${options.vus}_${options.duration}`.replace(/\//g, '-');
  
  return {
    [`tests/${reportName}.md`]: md,
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}