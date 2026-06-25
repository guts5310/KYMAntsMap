const CACHE_NAME = 'naturelog-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 최초 설치 시 캐싱
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// 앱 구동 시 파일 네트워크 통신 가로채기 (보안 필터 우회용 핵심)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});