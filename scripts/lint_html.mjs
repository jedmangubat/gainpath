#!/usr/bin/env node
// Lints the inline <script> block in index.html (ESLint doesn't look inside
// HTML by default). Extracts the script text in-memory, lints it, and maps
// reported line numbers back to their real line in index.html.
//
// Usage: npm run lint

import { ESLint } from 'eslint';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INDEX_HTML = path.join(ROOT, 'index.html');

async function main() {
  const html = await readFile(INDEX_HTML, 'utf8');
  const match = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/);
  if (!match) {
    console.error('Could not find the inline <script> block in index.html');
    process.exit(1);
  }
  const scriptStartLine = html.slice(0, match.index).split('\n').length;
  const source = match[1];

  const eslint = new ESLint({ overrideConfigFile: path.join(ROOT, 'eslint.config.js') });
  const results = await eslint.lintText(source, { filePath: 'index.html.inline.js' });

  let errorCount = 0, warningCount = 0;
  for (const result of results) {
    for (const msg of result.messages) {
      const realLine = scriptStartLine + msg.line;
      const sev = msg.severity === 2 ? 'error' : 'warning';
      if (msg.severity === 2) errorCount++; else warningCount++;
      console.log(`index.html:${realLine}:${msg.column} ${sev} ${msg.message} (${msg.ruleId})`);
    }
  }

  if (errorCount === 0 && warningCount === 0) console.log('No issues found.');
  else console.log(`\n${errorCount} error(s), ${warningCount} warning(s).`);
  process.exit(errorCount > 0 ? 1 : 0);
}

main();
