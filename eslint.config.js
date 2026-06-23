// Bug-catching rules only (no-undef, no-unused-vars, etc). Deliberately no
// stylistic/formatting rules — index.html's inline script uses a dense,
// semicolon-chained style on purpose, and reformatting it would blow up
// every future diff for no benefit.
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        window: 'readonly', document: 'readonly', navigator: 'readonly',
        localStorage: 'readonly', console: 'readonly', fetch: 'readonly',
        Blob: 'readonly', URL: 'readonly', FileReader: 'readonly',
        setTimeout: 'readonly', clearTimeout: 'readonly',
        setInterval: 'readonly', clearInterval: 'readonly',
        alert: 'readonly', confirm: 'readonly', prompt: 'readonly',
        location: 'readonly', history: 'readonly',
        Chart: 'readonly', jspdf: 'readonly', emailjs: 'readonly'
      }
    },
    rules: {
      // Top-level functions here are only ever called from inline onclick=""
      // HTML attributes, never referenced by other JS — they always look
      // "unused" to a script-only analyzer. Only flag genuinely unused
      // local variables and unused function bodies, not that.
      'no-unused-vars': ['warn', { vars: 'local', args: 'none', caughtErrors: 'none' }],
      // try{...}catch(e){} swallowing storage/network errors is intentional
      // throughout this codebase (e.g. saveCFG/saveData).
      'no-empty': ['error', { allowEmptyCatch: true }],
      // False positive on this codebase's `let x=a; if(...)x=b; else if(...)x=c;`
      // pattern — each branch's assignment is read at the function's return.
      'no-useless-assignment': 'off'
    }
  },
  {
    files: ['sw.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        self: 'readonly', caches: 'readonly', clients: 'readonly',
        fetch: 'readonly', Promise: 'readonly', Response: 'readonly',
        Request: 'readonly', URL: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }],
      'no-empty': ['error', { allowEmptyCatch: true }]
    }
  }
];
