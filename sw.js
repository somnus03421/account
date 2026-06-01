// 用當下時間當版本號
const CACHE = 'zhangben-' + Date.now();

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(['./', './index.html', './manifest.json']))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  )
);

self.addEventListener('fetch', e =>
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
);
