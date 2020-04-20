const PRECACHE = 'precache-v1';
const PRECACHE_URLS = ['index.html', './'];

self.addEventListener('install', (event) => {
  console.log('🚩 Install Event');
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('🚩 Activate Event');
  self.clients.claim();
  self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      console.log(client);
      client.postMessage({
        command: 'SET_OFFLINE_READY',
      });
    });
  });
});

self.addEventListener('fetch', (event) => {
  console.log('🚩 Fetch Event');
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          return response;
        });
      })
    );
  }
});
