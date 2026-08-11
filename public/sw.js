const CACHE_NAME = 'ferrum-' + new Date().toISOString().slice(0, 10);
const PRECACHE_URLS = ["/", "/effects", "/playground", "/docs"];
const MAX_CACHE_BYTES = 50 * 1024 * 1024; // 50MB

// URL patterns that should use stale-while-revalidate
// (always serve cache, but fetch update in background)
const STALE_WHILE_REVALIDATE_PATTERNS = [
  /\/ferrum-effects\.css(\?.*)?$/,   // CDN CSS file — large, changes rarely
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
  )));
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const url = new URL(e.request.url);

  // Skip caching for API requests
  if (url.pathname.startsWith("/api/")) return;

  // Only cache navigation requests and static assets
  const isNavigation = e.request.mode === "navigate";
  const isStaticAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webp|avif)$/i.test(url.pathname);
  if (!isNavigation && !isStaticAsset) return;

  // Check if this URL matches stale-while-revalidate patterns
  const isSWR = STALE_WHILE_REVALIDATE_PATTERNS.some((pat) => pat.test(url.pathname + url.search));

  if (isSWR) {
    // Stale-while-revalidate: serve cache immediately, update in background
    e.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(e.request).then((cached) => {
          // Always fetch in background to update cache (even if we serve cached)
          const fetchPromise = fetch(e.request).then((response) => {
            if (response.ok) {
              navigator.storage.estimate().then((estimate) => {
                if (estimate.usage < MAX_CACHE_BYTES) {
                  cache.put(e.request, response);
                }
              });
            }
            // Don't return the fetched response — we already returned cached
            return response;
          }).catch(() => {});

          // Return cached if available, otherwise wait for network
          return cached || fetch(e.request);
        })
      )
    );
  } else {
    // Default: stale-if-error (cache-first with network fallback)
    e.respondWith(
      caches.match(e.request).then((cached) => {
        const fetchPromise = fetch(e.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              navigator.storage.estimate().then((estimate) => {
                if (estimate.usage < MAX_CACHE_BYTES) {
                  cache.put(e.request, clone);
                }
              });
            });
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
});
