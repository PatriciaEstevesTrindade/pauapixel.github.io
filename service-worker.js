
var files = [
  "index.html",
  "storyline.html",
  "manifest.json",
  "css/main.css",
  "icons/MaterialIcons-Regular.ttf",
  "icons/material.css",
  "img/home2.jpg",
  "img/icon2.png",
  "js/install.js",
  "js/main.js",
  "js/vendor/jquery-3.4.1.min.js",
   "js/vendor/materialize.min.css",
  "js/vendor/materialize.min.js",
  
];
// dev only
if (typeof files == 'undefined') {
  var files = [];
} else {
  files.push('./');
}

var CACHE_NAME = 'pauapixel';

self.addEventListener('activate', function(event) {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME.indexOf(cacheName) == -1) {
            console.log('[SW] Delete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event){
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      		return cache.addAll(files);
  	})
  );
})

self.addEventListener('fetch', function(event) {
  console.log('[SW] fetch ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});


self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
  clients.openWindow('/');
});