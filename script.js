import http from 'k6/http';
import { makeMarkdownSummary } from './src/utils.js';
import { summaryTrendStats } from './src/lib.js';
import { Count } from './src/class.js';

export const options = {
  vus: 1000,
  duration: '30s',
  summaryTrendStats,
};

const counter = new Count();

export default function () {
  const res = http.get('https://google.com');
  const d = res.timings.duration;
  counter.addCount(d)
}

export function handleSummary(data) {
  return makeMarkdownSummary(data);
}