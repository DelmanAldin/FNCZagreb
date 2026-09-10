const CACHE = 'fnc33-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './fnc.png',
  './ancic.png',
  './andryszak.png',
  './atanasov.png',
  './barbir.png',
  './barrio.png',
  './bartosz.png',
  './batur.png',
  './bilic.png',
  './currie.png',
  './erslan.png',
  './fabjan.png',
  './franluka.png',
  './giorgadze.png',
  './hatef.png',
  './ivy.png',
  './sep.png',
  './silva.png',
  './stosic.png',
  './strus.png',
  './tiriel.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Firebase requests — uvijek na mrežu (real-time sync mora raditi)
  if (e.request.url.includes('firebasedatabase.app') ||
      e.request.url.includes('googleapis.com') ||
      e.request.url.includes('gstatic.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
