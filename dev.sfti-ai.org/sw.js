// SFTi Web Templates Service Worker
const CACHE_NAME = 'sfti-templates-v1.0.0';
const STATIC_CACHE = 'sfti-static-v1.0.0';
const DYNAMIC_CACHE = 'sfti-dynamic-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/badges/statik.title.svg',
  '/badges/ai_architect.svg',
  '/badges/full_stack_dev.svg',
  '/badges/prompt_blacksmith.svg',
  '/docs/i.svg/assets/institute-header.svg',
  '/docs/g.svg/assets/github-profile.svg',
  '/docs/s.svg/assets/streak.svg',
  '/docs/t.svg/assets/trophies.svg',
  '/docs/r.svg/assets/repo-slide.svg',
  '/docs/c.svg/assets/crimson-flow.svg'
];

// Network-first resources (always try network first)
const NETWORK_FIRST = [
  '/docs/g.svg/assets/github-profile.svg',
  '/docs/s.svg/assets/streak.svg', 
  '/docs/t.svg/assets/trophies.svg',
  '/docs/r.svg/assets/repo-slide.svg',
  '/docs/c.svg/assets/crimson-flow.svg'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('SFTi SW: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('SFTi SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('SFTi SW: Static assets cached');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('SFTi SW: Failed to cache static assets', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('SFTi SW: Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('SFTi SW: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('SFTi SW: Activated');
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
      console.log('SFTi SW: Serving from cache', request.url);
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      console.log('SFTi SW: Cached new resource', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('SFTi SW: Fetch failed', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE);
      return cache.match('/index.html');
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
      console.log('SFTi SW: Updated cache from network', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SFTi SW: Network failed, serving from cache', request.url);
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
    console.log('SFTi SW: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline actions when back online
  console.log('SFTi SW: Performing background sync');
}

// Push notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    console.log('SFTi SW: Push notification received', data);
    
    const options = {
      body: data.body || 'New update from SFTi',
      icon: '/badges/statik.title.svg',
      badge: '/badges/ai_architect.svg',
      vibrate: [200, 100, 200],
      data: data.url || '/',
      actions: [
        {
          action: 'open',
          title: 'Open App',
          icon: '/badges/full_stack_dev.svg'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/badges/prompt_blacksmith.svg'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'SFTi Update', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('SFTi SW: Notification clicked', event);
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data || '/')
    );
  }
});

// Message handler for manual cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    console.log('SFTi SW: Manual cache update requested');
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
      console.log('SFTi SW: Failed to update', request.url);
    }
  }
}