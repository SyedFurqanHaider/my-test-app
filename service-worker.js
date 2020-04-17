const PRECACHE = 'precache-v1';
// const RUNTIME = 'runtime';

const PRECACHE_URLS = ['index.html', './', 'styles.css', 'background.jpg'];

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
});

self.addEventListener('fetch', (event) => {
  console.log('🚩 Fetch Event');
  console.log(event.request);
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // return caches.open(RUNTIME).then((cache) => {
        //   return fetch(event.request).then((response) => {
        //     return cache.put(event.request, response.clone()).then(() => {
        //       return response;
        //     });
        //   });
        // });
      })
    );
  }
});
