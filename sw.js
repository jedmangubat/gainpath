// GainPath service worker — app-shell caching only. Bump CACHE_NAME whenever
// SHELL_URLS/CDN_URLS or the caching logic below changes; activate() deletes
// any cache not matching the current name.
const CACHE_NAME = 'gainpath-v2';
const CDN_URLS = [
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
];
const SHELL_URLS = [
  './', './index.html', './manifest.json',
  './images/branding/favicon-16.png', './images/branding/favicon-32.png',
  './images/branding/apple-touch-icon.png', './images/branding/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(SHELL_URLS).then(() =>
        Promise.all(CDN_URLS.map((url) =>
          fetch(url, { mode: 'cors' }).then((res) => cache.put(url, res)).catch(() => {})
        ))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => { caches.open(CACHE_NAME).then((c) => c.put(req, res.clone())); return res; })
        .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin && req.destination === 'image') {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        if (res.ok) caches.open(CACHE_NAME).then((c) => c.put(req, res.clone()));
        return res;
      }))
    );
    return;
  }

  if (CDN_URLS.includes(req.url)) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req, { mode: 'cors' }).then((res) => {
        caches.open(CACHE_NAME).then((c) => c.put(req, res.clone()));
        return res;
      }))
    );
    return;
  }

  if (sameOrigin) {
    event.respondWith(
      fetch(req)
        .then((res) => { caches.open(CACHE_NAME).then((c) => c.put(req, res.clone())); return res; })
        .catch(() => caches.match(req))
    );
  }
});
