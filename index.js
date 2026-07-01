import { rejects } from 'node:assert/strict';
import { spawn } from 'node:child_process';

const DURATION = 30;
const VUS = [10, 50, 100, 500, 1000];
const NAME = process.env.NAME || 'finatext';
const HOST = process.env.HOST || '192.168.0.27';
const ENDPOINTS = [
  '',
  'address?postal_code=1000002',
  'address/access_logs',
];

const runNormal = (endpoint, vus) => 
  new Promise((resolve, reject) => {
    const args = [
      'run',
      '-e', `NAME=${NAME}`,
      '-e', `HOST=${HOST}`,
      '-e', `ENDPOINT=${endpoint}`,
      '--vus', `${vus}`,
      '--duration', `${DURATION}s`,
      'test.js',
    ];

    console.log('\nk6', args.join(' '), '\n');

    const cmd = spawn('k6', args);

    cmd.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    cmd.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    cmd.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`k6 exited with code ${code}`));
      }
    });

    cmd.on('error', reject);
  });

const runMixed = vus =>
  new Promise((resolve, reject) => {
    const args = [
      'run',
      '-e', `NAME=${NAME}`,
      '-e', `HOST=${HOST}`,
      '-e', `VUS=${vus}`,
      '-e', `DURATION=${DURATION}s`,      
      'address_mixed_test.js',
    ];

    console.log('\nk6', args.join(' '), '\n');

    const cmd = spawn('k6', args);

    cmd.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    cmd.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    cmd.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`k6 exited with code ${code}`));
      }
    });

    cmd.on('error', reject);
  });

(async () => {
  try {
    for (const endpoint of ENDPOINTS) {
      for (const vus of VUS) {
        await runNormal(endpoint, vus);
      }
    }

    for (const vus of VUS) {
      await runMixed(vus);
    }

    console.log('\nAll benchmarks completed');
  } catch (e) {
    console.error('\nError:', e);
  }
})();