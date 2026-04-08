// ── PUESTO FRÍO · Service Worker ─────────────────────────────────
// Versión del caché — incrementa este número cada vez que
// actualices la app para que los clientes reciban la nueva versión
const CACHE_VERSION = 'puesto-frio-v1';

// Archivos que se cachean al instalar (funcionan sin internet)
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap',
];

// ── INSTALL: pre-cachear archivos esenciales ──────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      // Intentar cachear cada archivo; si alguno falla no bloquea
      return Promise.allSettled(
        PRECACHE.map(url => cache.add(url).catch(() => null))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpiar cachés antiguas ────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: estrategia Network-first con caché de respaldo ─────────
// Las peticiones a Firebase siempre van a la red.
// El resto: intenta red → si falla, usa caché.
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Firebase y Google APIs → siempre red, nunca cachear
  if (
    url.includes('firebaseio.com') ||
    url.includes('firebase.google.com') ||
    url.includes('googleapis.com') ||
    url.includes('gstatic.com')
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Resto → Network first, caché como respaldo
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Guardar copia en caché si la respuesta es válida
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// ── MENSAJE: forzar actualización desde la app ────────────────────
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
