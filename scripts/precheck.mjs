#!/usr/bin/env node
// Pre-release gate: runs lint, test:units and visual-check in sequence and
// stops at the first failure with a banner naming the step. Exits non-zero on
// any failure so it can't be skimmed past. See RELEASING.md.
//
// Usage: npm run precheck

import { spawnSync } from 'child_process';

const STEPS = ['lint', 'test:units', 'visual-check'];
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

for (const [i, step] of STEPS.entries()) {
  console.log(`\n=== precheck ${i + 1}/${STEPS.length}: npm run ${step} ===\n`);
  const t0 = Date.now();
  const r = spawnSync(npm, ['run', '--silent', step], { stdio: 'inherit' });
  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  if (r.status !== 0) {
    const bar = '!'.repeat(60);
    console.error(`\n${bar}\n  PRECHECK FAILED at step ${i + 1}/${STEPS.length}: ${step} (exit ${r.status ?? r.signal}, ${secs}s)\n  Do not release. Fix this step and re-run npm run precheck.\n${bar}\n`);
    process.exit(r.status || 1);
  }
  console.log(`\n--- ${step} passed (${secs}s) ---`);
}

console.log(`\n=== PRECHECK PASSED: ${STEPS.join(' → ')} ===\n`);
