// Service Worker for MXRaceHub Offline Support
const CACHE_NAME = 'mxracehub-v1.0.0';
const OFFLINE_PAGE = '/offline/';

// Essential files to cache for offline functionality
const STATIC_CACHE_URLS = [
  '/',
  '/riders/',
  '/races/schedule/',
  '/leaderboards/',
  '/css/main.css',
  '/js/offline-manager.js',
  '/img/riders/eli-tomac.svg',
  '/img/riders/jett-lawrence.svg',
  '/img/riders/chase-sexton.svg',
  '/img/riders/cooper-webb.svg',
  '/img/riders/haiden-deegan.svg',
  '/img/riders/levi-kitchen.svg',
  '/img/riders/tom-vialle.svg'
];

// API endpoints to cache for offline data
const API_CACHE_URLS = [
  '/api/races/schedule',
  '/api/riders/stats',
  '/api/standings/current',
  '/api/tracks',
  '/api/teams'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching essential files for offline access');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch(error => {
        console.log('Cache installation failed:', error);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
      })
  );
});

// Intercept fetch requests for offline support
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // If successful, cache the response
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // If offline, try to serve from cache
          return caches.match(request)
            .then(response => {
              if (response) {
                return response;
              }
              // If no cached version, show offline page for main routes
              if (isMainRoute(url.pathname)) {
                return caches.match('/') || createOfflineResponse(url.pathname);
              }
              return createOfflineResponse(url.pathname);
            });
        })
    );
    return;
  }
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful API responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Serve cached API data when offline
          return caches.match(request)
            .then(response => {
              if (response) {
                // Add offline indicator to cached responses
                return response.clone();
              }
              // Return fallback API response
              return createFallbackAPIResponse(url.pathname);
            });
        })
    );
    return;
  }
  
  // Handle static assets (images, CSS, JS)
  if (isStaticAsset(request.url)) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request)
            .then(response => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(request, responseClone));
              }
              return response;
            })
            .catch(() => {
              // Return placeholder for missing images
              if (request.url.includes('.svg') || request.url.includes('.jpg') || request.url.includes('.png')) {
                return createPlaceholderImage();
              }
              return new Response('Asset not available offline', { status: 404 });
            });
        })
    );
    return;
  }
  
  // Default fetch behavior for other requests
  event.respondWith(fetch(request));
});

// Helper functions
function isMainRoute(pathname) {
  const mainRoutes = ['/', '/riders/', '/races/', '/leaderboards/', '/schedule/'];
  return mainRoutes.some(route => pathname.startsWith(route));
}

function isStaticAsset(url) {
  return url.includes('/css/') || 
         url.includes('/js/') || 
         url.includes('/img/') || 
         url.includes('/fonts/') ||
         url.includes('.svg') ||
         url.includes('.jpg') ||
         url.includes('.png') ||
         url.includes('.css') ||
         url.includes('.js');
}

function createOfflineResponse(pathname) {
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MXRaceHub - Offline Mode</title>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0; padding: 2rem; background: #f5f5f5; text-align: center;
            }
            .offline-container { 
                max-width: 500px; margin: 0 auto; background: white; 
                padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .icon { font-size: 4rem; margin-bottom: 1rem; }
            h1 { color: #333; margin-bottom: 1rem; }
            p { color: #666; margin-bottom: 2rem; }
            .btn { 
                background: #0066cc; color: white; padding: 0.75rem 1.5rem; 
                border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem;
            }
            .btn:hover { background: #0052a3; }
            .cached-data { margin-top: 2rem; text-align: left; }
            .data-item { 
                background: #f8f9fa; padding: 1rem; margin: 0.5rem 0; 
                border-radius: 0.5rem; border-left: 4px solid #0066cc;
            }
        </style>
    </head>
    <body>
        <div class="offline-container">
            <div class="icon">📱</div>
            <h1>Offline Mode Active</h1>
            <p>You're currently offline, but you can still view cached race schedules and rider information.</p>
            
            <button class="btn" onclick="window.location.reload()">
                Try Reconnecting
            </button>
            
            <div class="cached-data">
                <h3>Available Offline:</h3>
                <div class="data-item">🏁 Race Schedules & Results</div>
                <div class="data-item">🏍️ Rider Stats & Profiles</div>
                <div class="data-item">🏆 Championship Standings</div>
                <div class="data-item">🏟️ Track Information</div>
            </div>
            
            <p style="margin-top: 2rem; font-size: 0.9rem; color: #888;">
                Data automatically syncs when connection is restored
            </p>
        </div>
    </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html' }
  });
}

function createFallbackAPIResponse(pathname) {
  let fallbackData = {};
  
  if (pathname.includes('/races/schedule')) {
    fallbackData = {
      races: [
        {
          id: 1,
          name: "Thunder Valley Motocross",
          date: "2025-06-07",
          location: "Lakewood, CO",
          status: "upcoming"
        }
      ],
      cached: true,
      offline: true
    };
  } else if (pathname.includes('/riders/stats')) {
    fallbackData = {
      riders: [
        {
          name: "Jett Lawrence",
          number: 18,
          team: "Team Honda HRC",
          division: "450"
        },
        {
          name: "Haiden Deegan", 
          number: 23,
          team: "Monster Energy Yamaha Star Racing",
          division: "250"
        }
      ],
      cached: true,
      offline: true
    };
  } else {
    fallbackData = {
      message: "Data not available offline",
      offline: true
    };
  }
  
  return new Response(JSON.stringify(fallbackData), {
    headers: { 
      'Content-Type': 'application/json',
      'X-Offline-Response': 'true'
    }
  });
}

function createPlaceholderImage() {
  // Simple SVG placeholder for missing images
  const placeholderSVG = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f5f5f5"/>
      <text x="200" y="150" font-family="Arial" font-size="16" text-anchor="middle" fill="#999">
        Image not available offline
      </text>
    </svg>
  `;
  
  return new Response(placeholderSVG, {
    headers: { 'Content-Type': 'image/svg+xml' }
  });
}

// Listen for messages from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.urls;
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => {
        // Notify main thread that caching is complete
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'CACHE_COMPLETE',
              urls: urlsToCache
            });
          });
        });
      });
  }
});