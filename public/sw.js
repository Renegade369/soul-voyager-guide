const CACHE_NAME = "soul-true-v3";
const PRECACHE_URLS = [
  "/welcome",
  "/guide",
  "/icon-192.png",
  "/icon-512.png",
];

// Install — precache core pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate — clean old caches, including prior Soul True caches that used
// the same app shell but may contain stale published bundles.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch — NetworkFirst for navigations, CacheFirst for static assets
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET and cross-origin
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip API / edge function calls
  if (request.url.includes("/functions/v1/") || request.url.includes("/api/")) {
    return;
  }

  // HTML navigations — NetworkFirst (try network, fall back to cache)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/welcome")))
    );
    return;
  }

  // Static assets — CacheFirst
  if (
    request.url.match(/\.(js|css|png|jpg|jpeg|svg|woff2?|ttf|ico)(\?|$)/)
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          })
      )
    );
    return;
  }
});
