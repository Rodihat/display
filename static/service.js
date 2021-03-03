//Name cache
var cacheName = 'lessons';

//Save files to run app offline
var cacheFiles = [
    'index.html',
    'lsn.json',
    'tutor.png'
];

//For files installs
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

//After files cached, can use local files rather than retrieve from server
//By intercepting fetch request
self.addEventListener('fetch', function (e) {
        e.respondWith(
            caches.match(e.request).then(function (r) {
                // Download the file if it is not in the cache,
                return r || fetch(e.request).then(function (response) {
                    // add the new file to cache
                    return caches.open(cacheName).then(function (cache) {
                        cache.put(e.request, response.clone());
                        return response;
                    });
                });
            })
        );
    });
