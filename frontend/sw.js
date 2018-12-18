var cacheName = 'iitbhu-hackathon-app';
var filesToCache = [
  // '/',
  // '/index.js',
  // '/index.html',
  // '/script/main.js',
  // '/style/main.css',
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
    .catch((err)=>{
      console.log("[ServiceWorker] Failed Cache Match %o", err);  
    })
  );
});
