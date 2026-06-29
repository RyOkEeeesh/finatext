import http from 'k6/http';
import { makeMarkdownSummary } from './src/utils.js';
import { summaryTrendStats } from './src/lib.js';
import { Count } from './src/class.js';

export const options = {
  vus: 10,
  duration: '10s', 
  summaryTrendStats,
};

const counter = new Count();

const endpoint = __ENV.ENDPOINT;

export default function () {
  const res = http.get(`http://${__ENV.HOST || 'localhost'}:8080/${endpoint || ''}`);
  counter.addCount(res.timings.duration);
}

export function handleSummary(data) {
  const vus = __ENV.VUS || options.vus;
  const duration = __ENV.DURATION || options.duration;
  
  const reportName = `${__ENV.NAME || 'finatext'}_${endpoint || 'index'}_${vus}_${duration}`;
  return makeMarkdownSummary(data, reportName);
}