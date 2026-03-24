/* ═══════════════════════════════════════════════════════════════════════════
   sw.js  –  Service Worker per Ricettario Danilo PWA
   Strategia: Cache-first per assets statici, Network-first per HTML
═══════════════════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'ricettario-v1';
const OFFLINE_PAGE = 'offline.html';

// Tutti gli asset da pre-cachare all'installazione
const PRECACHE_ASSETS = [
  '/',
  'index.html',
  'offline.html',

  // CSS
  'core.css',
  'components.css',
  'home-style.css',
  'ricettario-style.css',
  'search-results.css',
  'pane-style.css',
  'pizza-style.css',
  'focacce-style.css',
  'brioche-style.css',
  'lievitati-style.css',
  'laminati-style.css',
  'cucina-style.css',

  // HTML pages
  'pane.html',
  'pizza.html',
  'focacce.html',
  'brioche.html',
  'lievitati.html',
  'laminati.html',
  'impasti-base.html',
  'creme-base.html',
  'ricette-pasticceria.html',
  'cucina.html',
  'cucina-antipasti.html',
  'cucina-primi.html',
  'cucina-secondi.html',
  'cucina-bbq.html',
  'cucina-contorni.html',
  'cucina-salse.html',
  'cucina-extra.html',
  'search-results.html',

  // JavaScript
  'ricettario-engine.js',
  'cucina-engine.js',
  'script_pane.js',
  'script_pizza.js',
  'script_focacce.js',
  'script_brioche.js',
  'script_lievitati.js',
  'script_laminati.js',
  'search-index.js',
  'search-index.json',
  'search-filter.js',

  // Manifest & icons
  'manifest.json',
  'icon.ico',
  'icon192.png',
  'icon512.png',
];

/* ── INSTALL: pre-caching ── */
self.addEventListener('install', event => {
  console.log('[SW] Installing…');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching assets');
      // Caching one-by-one to avoid failing the whole install on a single 404
      return Promise.allSettled(
        PRECACHE_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn(`[SW] Failed to cache: ${url}`, err))
        )
      );
    }).then(() => {
      console.log('[SW] Install complete');
      return self.skipWaiting();
    })
  );
});

/* ── ACTIVATE: pulizia vecchie cache ── */
self.addEventListener('activate', event => {
  console.log('[SW] Activating…');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH: strategia intelligente ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora richieste non-GET e cross-origin (es. Google Fonts)
  if (request.method !== 'GET') return;

  // Google Fonts: stale-while-revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request, 'google-fonts-v1'));
    return;
  }

  // File HTML: Network-first (contenuto sempre fresco se online, fallback cache)
  if (request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(networkFirstHTML(request));
    return;
  }

  // Tutto il resto (CSS, JS, immagini, JSON): Cache-first
  event.respondWith(cacheFirst(request));
});

/* ── Strategia: Cache-first ── */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] Fetch failed (cache-first):', request.url);
    // Ritorna una risposta vuota per risorse non critiche
    return new Response('', { status: 408, statusText: 'Offline' });
  }
}

/* ── Strategia: Network-first con fallback HTML ── */
async function networkFirstHTML(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
      return response;
    }
  } catch (err) {
    // Offline: prova dalla cache
  }

  const cached = await caches.match(request);
  if (cached) return cached;

  // Ultimo fallback: pagina offline
  const offlinePage = await caches.match(OFFLINE_PAGE);
  return offlinePage || new Response('<h1>Offline</h1>', {
    headers: { 'Content-Type': 'text/html' }
  });
}

/* ── Strategia: Stale-while-revalidate ── */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  return cached || await fetchPromise || new Response('', { status: 408 });
}

/* ── Background Sync per aggiornamenti silenziosi ── */
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
