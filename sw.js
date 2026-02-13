const CACHE_NAME = 'insoletech-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Installazione del Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Recupero risorse (Strategia Network falling back to Cache)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});