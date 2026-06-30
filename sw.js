// ════════════════════════════════════════════════════════════
//  SoleTrack Service Worker  — Offline-First Cache Strategy
//  Cache name includes version so updates auto-bust the cache
// ════════════════════════════════════════════════════════════

const CACHE_NAME = 'soletrack-v1.4';

// ── Install: pre-cache all critical assets ────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache app shell (local files must succeed; CDN assets are best-effort)
      const must = [
        './',
        './index.html',
        './manifest.json',
        './icons/icon-192.png',
        './icons/icon-512.png',
        './icons/icon-maskable-192.png',
        './icons/icon-maskable-512.png'
      ];
      const optional = [
        'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap',
        'https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js'
      ];
      return cache.addAll(must).then(() =>
        Promise.allSettled(optional.map(url => cache.add(url)))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: delete old caches ───────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: Network-first for navigation, Cache-first for assets ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests that aren't our known CDNs
  const isSameOrigin = url.origin === self.location.origin;
  const isFontCDN = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  const isLibCDN = url.hostname === 'cdn.jsdelivr.net';

  if (!isSameOrigin && !isFontCDN && !isLibCDN) return;

  // Strategy: Cache-first with network fallback
  // Good for app shell + fonts — loads instantly offline, updates in background
  event.respondWith(
    caches.match(request).then(cached => {
      const networkFetch = fetch(request).then(response => {
        // Only cache valid responses
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => null);

      // Return cached immediately if available; update cache in background
      return cached || networkFetch;
    })
  );
});

// ── Message handler: force update ────────────────────────
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
