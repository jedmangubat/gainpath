#!/usr/bin/env node
// Lints the app's JavaScript: the js/*.js files index.html loads, in load
// order, plus any inline <script> block left in index.html. They share one
// global scope (plain scripts, not modules), so they are linted as one
// concatenated script — otherwise every cross-file call would look like
// no-undef — and each report is mapped back to its real file and line.
// Also lints sw.js directly, since it has its own service-worker globals.
//
// Usage: npm run lint

import { ESLint } from 'eslint';
import { appSources, concatSources } from './app_sources.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function main() {
  const sources = await appSources(ROOT);
  if (!sources.length) {
    console.error('Found no app scripts in index.html');
    process.exit(1);
  }
  const { text: source, where } = concatSources(sources);

  const eslint = new ESLint({ overrideConfigFile: path.join(ROOT, 'eslint.config.mjs') });
  const results = await eslint.lintText(source, { filePath: 'app.js' });

  let errorCount = 0, warningCount = 0;
  for (const result of results) {
    for (const msg of result.messages) {
      const at = where(msg.line);
      const sev = msg.severity === 2 ? 'error' : 'warning';
      if (msg.severity === 2) errorCount++; else warningCount++;
      console.log(`${at.file}:${at.line}:${msg.column} ${sev} ${msg.message} (${msg.ruleId})`);
    }
  }

  const swResults = await eslint.lintFiles([path.join(ROOT, 'sw.js')]);
  for (const result of swResults) {
    for (const msg of result.messages) {
      const sev = msg.severity === 2 ? 'error' : 'warning';
      if (msg.severity === 2) errorCount++; else warningCount++;
      console.log(`sw.js:${msg.line}:${msg.column} ${sev} ${msg.message} (${msg.ruleId})`);
    }
  }

  if (errorCount === 0 && warningCount === 0) console.log('No issues found.');
  else console.log(`\n${errorCount} error(s), ${warningCount} warning(s).`);
  process.exit(errorCount > 0 ? 1 : 0);
}

main();
