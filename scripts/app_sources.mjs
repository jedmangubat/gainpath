// The app's JavaScript in the order the browser runs it: every
// <script src="js/…"> tag in index.html, then the inline <script> block if one
// is left. They share one global scope, so tools that need "the app's code"
// (lint, the GAINPATH MATH purity check) read them together through this.
import { readFile } from 'fs/promises';
import path from 'path';

export async function appSources(root) {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  const out = [];
  const tag = /<script src="(js\/[^"?]+\.js)(?:\?v=[^"]*)?"><\/script>|<script>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = tag.exec(html))) {
    if (m[1]) {
      out.push({ file: m[1], startLine: 1, text: await readFile(path.join(root, m[1]), 'utf8') });
    } else {
      // Line of the <script> tag itself; the block's first line is the one after it.
      out.push({ file: 'index.html', startLine: html.slice(0, m.index).split('\n').length, text: m[2], inline: true });
    }
  }
  return out;
}

// One text to lint as a single script, plus a map from its lines back to
// {file, line} so reports point at the real location.
export function concatSources(sources) {
  let text = '';
  const map = [];
  for (const s of sources) {
    const lines = s.text.split('\n');
    lines.forEach((_, i) => map.push({ file: s.file, line: s.inline ? s.startLine + i : i + 1 }));
    text += s.text + (s.text.endsWith('\n') ? '' : '\n');
    if (!s.text.endsWith('\n')) continue;
    map.pop(); // the trailing empty "line" after a final newline doesn't exist
  }
  return { text, where: (n) => map[n - 1] || { file: '?', line: n } };
}
