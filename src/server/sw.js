// @ts-nocheck
// SFTi Server Service Worker - Server Portal Domain
const CACHE_NAME = 'sfti-server-v2.0.0';
const STATIC_CACHE = 'sfti-server-static-v2.0.0';
const DYNAMIC_CACHE = 'sfti-server-dynamic-v2.0.0';

// Assets to cache on install - server domain specific
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './server-script.js',
  
  // Public assets for server domain
  './public/favicon.png',
  './public/icon-16x16.png',
  './public/icon-32x32.png',
  './public/icon-72x72.png',
  './public/icon-96x96.png',
  './public/icon-128x128.png',
  './public/icon-144x144.png',
  './public/icon-152x152.png',
  './public/icon-180x180.png',
  './public/icon-192x192.png',
  './public/icon-384x384.png',
  './public/icon-512x512.png',
  './public/web.pwa.icon.png'
];

// Network-first resources (always try network first) - for server
const NETWORK_FIRST = [
  // External dependencies (CDN)
  'https://cdn.tailwindcss.com'
];

// Cache-first resources - Static content for server
const CACHE_FIRST = [
  // Static assets
  './public/',
  './server.styles/'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('SFTi Server SW: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('SFTi Server SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('SFTi Server SW: Static assets cached');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('SFTi Server SW: Failed to cache static assets', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('SFTi Server SW: Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('SFTi Server SW: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('SFTi Server SW: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Network first for dynamic content
  if (NETWORK_FIRST.some(pattern => request.url.includes(pattern))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Cache first for static content
  event.respondWith(cacheFirst(request));
});

// Cache first strategy
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('SFTi Server SW: Serving from cache', request.url);
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      console.log('SFTi Server SW: Cached new resource', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('SFTi Server SW: Fetch failed', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE);
      return cache.match('./index.html');
    }
    
    throw error;
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      console.log('SFTi Server SW: Updated cache from network', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SFTi Server SW: Network failed, serving from cache', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('SFTi Server SW: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline actions when back online
  console.log('SFTi Server SW: Performing background sync');
}

// Push notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    console.log('SFTi Server SW: Push notification received', data);
    
    const options = {
      body: data.body || 'New update from SFTi Server',
      icon: './public/icon-192x192.png',
      badge: './public/icon-96x96.png',
      vibrate: [200, 100, 200],
      data: data.url || './',
      actions: [
        {
          action: 'open',
          title: 'Open App'
        },
        {
          action: 'close',
          title: 'Close'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'SFTi Server Update', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('SFTi Server SW: Notification clicked', event);
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data || './')
    );
  }
});

// Message handler for manual cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    console.log('SFTi Server SW: Manual cache update requested');
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response.status === 200) {
        await cache.put(request, response);
      }
    } catch (error) {
      console.log('SFTi Server SW: Failed to update', request.url);
    }
  }
}