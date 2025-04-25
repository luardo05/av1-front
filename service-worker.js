const CACHE_NAME = 'meu-site-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/cadProd.html',
  '/cadMer.html',
  '/pesquisa.html',
  '/prod.html',
  '/style.css',
  '/styleCad.css',
  '/styleCadMer.css',
  '/styleProd.css',
  '/imgProd.css',
  '/js/product.js',
  '/icons/android-chrome-192x192.png',
  '/icons/apple-icon-180x180.png',
  '/favicon.ico',
];

// Instala o service worker e faz o cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa e limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Intercepta requisições e responde com cache ou rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
