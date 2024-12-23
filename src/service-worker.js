// Add PWA capabilities for offline access and mobile installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('movie-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js',
        // Add other essential assets
      ]);
    })
  );
}); 