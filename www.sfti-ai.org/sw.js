// SFTi Unified Service Worker
// Multi-Domain PWA Support for www, dev, and server domains
const CACHE_NAME = 'sfti-unified-v1.0.0';
const STATIC_CACHE = 'sfti-static-v1.0.0';
const DYNAMIC_CACHE = 'sfti-dynamic-v1.0.0';
const API_CACHE = 'sfti-api-v1.0.0';

// Assets to cache on install - Multi-domain support
const STATIC_ASSETS = [
  // Root assets
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  
  // Main site assets (www.sfti-ai.org)
  '/src/www/index.html',
  '/src/www/main.js',
  
  // Shared components and libraries
  '/src/shared/lib/apiClient.js',
  
  // Badges and branding
  '/badges/statik.title.svg',
  '/badges/ai_architect.svg',
  '/badges/full_stack_dev.svg',
  '/badges/prompt_blacksmith.svg',
  
  // Dynamic SVG assets
  '/docs/i.svg/assets/institute-header.svg',
  '/docs/g.svg/assets/github-profile.svg',
  '/docs/s.svg/assets/streak.svg',
  '/docs/t.svg/assets/trophies.svg',
  '/docs/r.svg/assets/repo-slide.svg',
  '/docs/c.svg/assets/crimson-flow.svg',
  '/docs/v.svg/assets/pv-traffic.svg',
  
  // Project cards
  '/docs/G.G.svg/assets/gremlingpt-card.svg',
  '/docs/IB.G.svg/assets/ib-g-scanner-card.svg',
  '/docs/P.S.svg/assets/pilot-server-card.svg',
  '/docs/D.B.svg/assets/dragon-boot-card.svg',
  '/docs/A.N.svg/assets/ascendnet-card.svg',
  '/docs/S.S.svg/assets/statik-server-card.svg'
];

// Network-first resources (always try network first for fresh data)
const NETWORK_FIRST = [
  '/docs/g.svg/assets/github-profile.svg',
  '/docs/s.svg/assets/streak.svg', 
  '/docs/t.svg/assets/trophies.svg',
  '/docs/r.svg/assets/repo-slide.svg',
  '/docs/c.svg/assets/crimson-flow.svg',
  '/docs/v.svg/assets/pv-traffic.svg'
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/health',
  '/api/research/papers'
];

// Domain-specific cache keys
const DOMAIN_CACHES = {
  'www.sfti-ai.org': 'sfti-www-cache-v1.0.0',
  'dev.sfti-ai.org': 'sfti-dev-cache-v1.0.0',
  'server.sfti-ai.org': 'sfti-server-cache-v1.0.0'
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('SFTi Unified SW: Installing...');
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

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', event => {
  console.log('SFTi SW: Activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE &&
                !Object.values(DOMAIN_CACHES).includes(cacheName)) {
              console.log('SFTi SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients
      self.clients.claim()
    ]).then(() => {
      console.log('SFTi SW: Activation complete');
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(handleRequest(event.request, pathname));
});

async function handleRequest(request, pathname) {
  try {
    // API requests - Cache with network-first strategy
    if (pathname.startsWith('/api/')) {
      return handleApiRequest(request);
    }
    
    // Network-first assets (dynamic SVGs)
    if (NETWORK_FIRST.some(asset => pathname.includes(asset))) {
      return handleNetworkFirst(request);
    }
    
    // Static assets - Cache-first strategy
    if (STATIC_ASSETS.some(asset => pathname === asset || pathname.includes(asset))) {
      return handleCacheFirst(request);
    }
    
    // HTML pages - Network-first with fallback
    if (pathname.endsWith('.html') || pathname === '/' || !pathname.includes('.')) {
      return handlePageRequest(request);
    }
    
    // Default: Network-first
    return handleNetworkFirst(request);
    
  } catch (error) {
    console.error('SFTi SW: Request handling error:', error);
    return fetch(request);
  }
}

// Cache-first strategy for static assets
async function handleCacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then(response => {
      if (response.status === 200) {
        cache.put(request, response.clone());
      }
    }).catch(err => console.log('SFTi SW: Background update failed', err));
    
    return cachedResponse;
  }
  
  // Not in cache, fetch from network
  const response = await fetch(request);
  if (response.status === 200) {
    cache.put(request, response.clone());
  }
  
  return response;
}

// Network-first strategy for dynamic content
async function handleNetworkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // No cache available, return error
    throw error;
  }
}

// API request handling with caching
async function handleApiRequest(request) {
  const url = new URL(request.url);
  
  try {
    const response = await fetch(request);
    
    // Cache successful API responses
    if (response.status === 200) {
      const cache = await caches.open(API_CACHE);
      
      // Only cache GET requests to specific endpoints
      if (API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint))) {
        cache.put(request, response.clone());
      }
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache for specific endpoints
    if (API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint))) {
      const cache = await caches.open(API_CACHE);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // Return error response for API failures
    return new Response(JSON.stringify({ 
      error: 'Service unavailable', 
      message: 'Network error and no cached response available' 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Page request handling
async function handlePageRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to main page if available
    const mainPage = await cache.match('/');
    if (mainPage) {
      return mainPage;
    }
    
    // Return offline page
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SFTi - Offline</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                   text-align: center; padding: 50px; background: #1a1a1a; color: white; }
            .offline { max-width: 400px; margin: 0 auto; }
            .primary { color: #e11d48; }
          </style>
        </head>
        <body>
          <div class="offline">
            <h1>You're <span class="primary">Offline</span></h1>
            <p>This page isn't available offline. Please check your connection and try again.</p>
            <button onclick="window.location.reload()">Try Again</button>
          </div>
        </body>
      </html>
    `, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Background sync for updating dynamic content
async function updateCache() {
  console.log('SFTi SW: Updating dynamic cache...');
  
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
  
  console.log('SFTi SW: Cache update complete');
}

// Message handling for cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    updateCache();
  }
});

// Periodic background sync (if supported)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(updateCache());
  }
});

console.log('SFTi Unified Service Worker loaded successfully');