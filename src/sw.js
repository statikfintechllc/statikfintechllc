// @ts-nocheck
// SFTi Web Templates Service Worker - Comprehensive Multi-Domain Support
const CACHE_NAME = 'sfti-templates-v2.0.0';
const STATIC_CACHE = 'sfti-static-v2.0.0';
const DYNAMIC_CACHE = 'sfti-dynamic-v2.0.0';

// Comprehensive assets to cache on install - all domains and assets
const STATIC_ASSETS = [
  // Root domain assets
  '/',
  '/index.html',
  '/src/manifest.json',
  
  // Main website (www.sfti-ai.org)
  '/www.sfti-ai.org/',
  '/www.sfti-ai.org/index.html',
  '/www.sfti-ai.org/script.js',
  '/www.sfti-ai.org/styles/styles.css',
  '/www.sfti-ai.org/styles/main.tailwind.css',
  '/www.sfti-ai.org/styles/custom.css',
  
  // Development hub (dev.sfti-ai.org)
  '/dev.sfti-ai.org/',
  '/dev.sfti-ai.org/index.html',
  '/dev.sfti-ai.org/dev-script.js',
  '/dev.sfti-ai.org/styles/dev-styles.css',
  
  // Server portal (server.sfti-ai.org)
  '/server.sfti-ai.org/',
  '/server.sfti-ai.org/index.html',
  '/server.sfti-ai.org/server-script.js',
  
  // Static badges and assets
  '/badges/statik.title.svg',
  '/badges/ai_architect.svg',
  '/badges/full_stack_dev.svg',
  '/badges/prompt_blacksmith.svg',
  '/badges/G.H.badge.svg',
  '/badges/G.I.badge.svg',
  '/badges/L.W.badge.svg',
  '/badges/M.P.badge.svg',
  '/badges/R.S.badge.svg',
  '/badges/Z.P.badge.svg',
  
  // Public assets
  '/src/public/web.pwa.icon.png',
  '/src/public/dragon.png',
  '/src/public/web.contact.bkg.png',
  '/src/public/web.projects.bkg.png',
  
  // Component system
  '/src/components/sfti-component-system.js',
  '/src/components/global.c/desktop/card.js',
  '/src/components/global.c/desktop/svg-card.js',
  '/src/components/global.c/mobile/card.js',
  '/src/components/global.c/mobile/svg-card.js',
  
  // Dynamic SVG content from docs/
  '/docs/i.svg/assets/institute-header.svg',
  '/docs/g.svg/assets/github-profile.svg',
  '/docs/s.svg/assets/streak.svg',
  '/docs/t.svg/assets/trophies.svg',
  '/docs/r.svg/assets/repo-slide.svg',
  '/docs/c.svg/assets/crimson-flow.svg',
  
  // Project SVGs
  '/docs/IB.G.svg/assets/ib-g-scanner-card.svg',
  '/docs/P.S.svg/assets/pilot-server-card.svg',
  '/docs/G.G.svg/assets/gremlingpt-card.svg',
  '/docs/G.S.svg/assets/gremlin-shadtail-trader-card.svg',
  '/docs/A.N.svg/assets/ascendnet-card.svg',
  '/docs/S.S.svg/assets/statik-server-card.svg',
  '/docs/A.I.svg/assets/ascend-institute-card.svg',
  '/docs/A.D.svg/assets/ascenddocs-of-govseverance-card.svg',
  '/docs/D.B.svg/assets/dragon-boot-card.svg',
  '/docs/G.C.svg/assets/godcore-card.svg',
  '/docs/G.M.svg/assets/gremlin-mcp-scrap-card.svg',
  '/docs/M.M.svg/assets/mobile-mirror-card.svg'
];

// Network-first resources (always try network first) - Live SVGs and dynamic content
const NETWORK_FIRST = [
  // Live GitHub stats
  '/docs/g.svg/assets/github-profile.svg',
  '/docs/s.svg/assets/streak.svg', 
  '/docs/t.svg/assets/trophies.svg',
  '/docs/r.svg/assets/repo-slide.svg',
  '/docs/c.svg/assets/crimson-flow.svg',
  
  // Research papers (may get updated)
  '/docs/Zenodo.papers.svg/',
  '/docs/Medium.papers.svg/',
  
  // API endpoints
  '/api/',
  
  // External dependencies (CDN)
  'https://cdn.tailwindcss.com',
  'https://skillicons.dev/'
];

// Cache-first resources - Static content that rarely changes
const CACHE_FIRST = [
  // Static badges and icons
  '/badges/',
  '/src/public/',
  
  // Project assets
  '/docs/A.I.svg/assets/',
  '/docs/A.D.svg/assets/',
  '/docs/A.N.svg/assets/',
  '/docs/D.B.svg/assets/',
  '/docs/G.C.svg/assets/',
  '/docs/G.G.svg/assets/',
  '/docs/G.M.svg/assets/',
  '/docs/G.S.svg/assets/',
  '/docs/IB.G.svg/assets/',
  '/docs/M.M.svg/assets/',
  '/docs/P.S.svg/assets/',
  '/docs/S.S.svg/assets/',
  
  // Component files
  '/src/components/',
  '/src/styles/'
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