// GainPath service worker — app-shell caching only. Bump CACHE_NAME whenever
// SHELL_URLS/CDN_URLS or the caching logic below changes; activate() deletes
// any cache not matching the current name.
const CACHE_NAME = 'gainpath-v20';
const CDN_URLS = [
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js'
];
const SHELL_URLS = [
  './', './index.html', './manifest.json',
  './images/branding/favicon-16.png', './images/branding/favicon-32.png',
  './images/branding/apple-touch-icon.png', './images/branding/logo.png',
  // Self-hosted Kinetic Athletic fonts (latin subset) — precached so the
  // reskin renders offline without any fonts.googleapis.com dependency.
  './fonts/archivo-latin-var.woff2', './fonts/space-grotesk-latin-var.woff2',
  './fonts/space-mono-latin-400.woff2', './fonts/space-mono-latin-700.woff2'
];
// All bundled exercise images — precached best-effort on install (see below) so
// every built-in exercise shows its illustration offline, not just the ones the
// user happened to view online first. Precached separately from SHELL_URLS
// (which uses an atomic addAll) so one missing/failed image can't abort install.
// Keep this list in sync when exercises are added/removed to images/exercises/.
const EX_IMAGE_URLS = [
  './images/exercises/ab-wheel-rollout.png',
  './images/exercises/arnold-press.png',
  './images/exercises/back-extension.png',
  './images/exercises/barbell-back-squat.png',
  './images/exercises/barbell-curl.png',
  './images/exercises/barbell-deadlift.png',
  './images/exercises/barbell-front-squat.png',
  './images/exercises/barbell-hip-thrust.png',
  './images/exercises/barbell-overhead-press.png',
  './images/exercises/barbell-push-press.png',
  './images/exercises/barbell-row.png',
  './images/exercises/barbell-shrug.png',
  './images/exercises/barbell-skull-crusher.png',
  './images/exercises/barbell-upright-row.png',
  './images/exercises/bench-dumbbell-chest-press.png',
  './images/exercises/bench-dumbbell-press.png',
  './images/exercises/bent-over-dumbbell-reverse-fly.png',
  './images/exercises/bicycle-crunch.png',
  './images/exercises/bulgarian-split-squat.png',
  './images/exercises/cable-bicep-curl.png',
  './images/exercises/cable-chest-fly.png',
  './images/exercises/cable-crunch.png',
  './images/exercises/cable-face-pull.png',
  './images/exercises/cable-glute-kickback.png',
  './images/exercises/cable-lateral-raise.png',
  './images/exercises/cable-rope-hammer-curl.png',
  './images/exercises/cable-rope-tricep-extension.png',
  './images/exercises/cable-tricep-kickback.png',
  './images/exercises/chest-dips.png',
  './images/exercises/chest-supported-machine-row.png',
  './images/exercises/chin-ups.png',
  './images/exercises/close-grip-bench-press.png',
  './images/exercises/concentration-curl.png',
  './images/exercises/dead-hang.png',
  './images/exercises/decline-dumbbell-press.png',
  './images/exercises/decline-sit-ups.png',
  './images/exercises/diamond-push-ups.png',
  './images/exercises/dumbbell-bicep-curl.png',
  './images/exercises/dumbbell-fly.png',
  './images/exercises/dumbbell-front-raise.png',
  './images/exercises/dumbbell-hip-thrust.png',
  './images/exercises/dumbbell-lateral-raise.png',
  './images/exercises/dumbbell-lunge.png',
  './images/exercises/dumbbell-pullover.png',
  './images/exercises/dumbbell-reverse-wrist-curl.png',
  './images/exercises/dumbbell-romanian-deadlift.png',
  './images/exercises/dumbbell-shrug.png',
  './images/exercises/dumbbell-skull-crusher.png',
  './images/exercises/dumbbell-standing-calf-raise.png',
  './images/exercises/dumbbell-step-up.png',
  './images/exercises/dumbbell-sumo-squat.png',
  './images/exercises/dumbbell-wrist-curl.png',
  './images/exercises/ez-bar-curl.png',
  './images/exercises/ez-bar-front-raise.png',
  './images/exercises/farmers-carry.png',
  './images/exercises/flat-barbell-bench-press.png',
  './images/exercises/glute-bridge.png',
  './images/exercises/goblet-squat.png',
  './images/exercises/hack-squat-calf-raise.png',
  './images/exercises/hack-squat.png',
  './images/exercises/hammer-curls.png',
  './images/exercises/hanging-leg-raise.png',
  './images/exercises/incline-barbell-chest-press.png',
  './images/exercises/incline-bench-dumbbell-press.png',
  './images/exercises/incline-bench-dumbbell-rear-delt-fly.png',
  './images/exercises/incline-dumbbell-curl.png',
  './images/exercises/lat-pulldown.png',
  './images/exercises/leg-extension.png',
  './images/exercises/leg-press-calf-raise.png',
  './images/exercises/leg-press.png',
  './images/exercises/leg-raise.png',
  './images/exercises/lying-hamstring-curl.png',
  './images/exercises/machine-abduction.png',
  './images/exercises/machine-adduction.png',
  './images/exercises/machine-assisted-pull-up.png',
  './images/exercises/machine-chest-fly.png',
  './images/exercises/machine-chest-press.png',
  './images/exercises/machine-hip-thrust.png',
  './images/exercises/machine-lateral-raise.png',
  './images/exercises/machine-preacher-curl.png',
  './images/exercises/machine-rear-delt-fly.png',
  './images/exercises/machine-seated-crunch.png',
  './images/exercises/machine-shoulder-press.png',
  './images/exercises/mountain-climbers.png',
  './images/exercises/overhead-cable-tricep-extension.png',
  './images/exercises/overhead-ez-bar-tricep-extension.png',
  './images/exercises/pike-push-ups.png',
  './images/exercises/plank.png',
  './images/exercises/plate-loaded-standing-calf-raise.png',
  './images/exercises/preacher-curl.png',
  './images/exercises/pull-ups.png',
  './images/exercises/push-ups.png',
  './images/exercises/reverse-ez-bar-curl.png',
  './images/exercises/reverse-grip-pulldown.png',
  './images/exercises/romanian-deadlift.png',
  './images/exercises/russian-twist.png',
  './images/exercises/seated-cable-row.png',
  './images/exercises/seated-calf-raise.png',
  './images/exercises/seated-dumbbell-shoulder-press.png',
  './images/exercises/seated-hamstring-curl.png',
  './images/exercises/side-plank.png',
  './images/exercises/single-arm-cable-fly.png',
  './images/exercises/single-arm-dumbbell-overhead-tricep-extension.png',
  './images/exercises/single-arm-dumbbell-row.png',
  './images/exercises/single-arm-lat-pulldown.png',
  './images/exercises/single-arm-tricep-kickback.png',
  './images/exercises/smith-machine-bench-press.png',
  './images/exercises/smith-machine-hip-thrust.png',
  './images/exercises/smith-machine-inverted-row.png',
  './images/exercises/smith-machine-romanian-deadlift.png',
  './images/exercises/smith-machine-shoulder-press.png',
  './images/exercises/smith-machine-shrug.png',
  './images/exercises/smith-machine-squat.png',
  './images/exercises/smith-machine-standing-calf-raise.png',
  './images/exercises/straight-arm-cable-pulldown.png',
  './images/exercises/t-bar-row.png',
  './images/exercises/tricep-dips.png',
  './images/exercises/triceps-pushdown.png',
  './images/exercises/walking-lunge.png',
  './images/exercises/wide-grip-cable-row.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(SHELL_URLS).then(() =>
        Promise.all([
          // Cross-origin CDN libs need cors mode.
          ...CDN_URLS.map((url) =>
            fetch(url, { mode: 'cors' }).then((res) => { if (res.ok) return cache.put(url, res); }).catch(() => {})
          ),
          // Same-origin exercise images — best-effort so a single failure can't
          // abort install; any that miss here still cache on-demand via fetch().
          ...EX_IMAGE_URLS.map((url) =>
            fetch(url).then((res) => { if (res.ok) return cache.put(url, res); }).catch(() => {})
          )
        ])
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
        if (res.ok) caches.open(CACHE_NAME).then((c) => c.put(req, res.clone()));
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

// Focus (or open) the app when a rest-timer notification is tapped.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
