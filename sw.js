const CACHE_NAME = 'angel-os-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon.svg',
    './cercanos/index.html',
    './cercanos/logic.js',
    './erika/index.html',
    './erika/logic.js',
    './npcs/index.html',
    './npcs/logic.js',
    './interno/index.html',
    './interno/simulation.js'
];

// Install event: Pre-cache critical assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Pre-caching critical assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
        .then(() => self.clients.claim())
    );
});

// Fetch event: Network First for HTML, Cache First for others, or Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Strategy: Stale-While-Revalidate
            // Return cached response immediately if available, but also fetch from network to update cache
            
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Check if we received a valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                // Clone the response because it's a stream and can only be consumed once
                const responseToCache = networkResponse.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // If network fails and no cache, maybe return a fallback?
                // For now, just let it fail if not in cache.
            });

            return cachedResponse || fetchPromise;
        })
    );
});
