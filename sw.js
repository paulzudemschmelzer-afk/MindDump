// Scatterbrain Service Worker — App-Shell-Caching für Offline-Nutzung
const CACHE = 'scatterbrain-v2';
const SHELL = ['MindDump.html', 'manifest.json', 'icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  // Nur eigene GET-Requests behandeln; Firebase/Groq/CDN immer direkt ans Netz
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Network-first: immer aktuelle Version holen, bei Offline aus Cache liefern
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('MindDump.html')))
  );
});
