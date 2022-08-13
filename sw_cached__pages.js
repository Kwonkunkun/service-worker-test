const cacheName = "v1";

const cacheAssets = ["index.html", "about.html", "main.js"];

// install event
self.addEventListener("install", (e) => {
  console.log("Service worker: installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service worker: Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// activate event
self.addEventListener("activate", (e) => {
  console.log("Service worker: activated");
  //remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("service worker: clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//fetch event
self.addEventListener("fetch", (e) => {
  console.log("Service worker: Fetching");
  e.respondWith(
    fetch(e.request).catch(() => {
      caches.match(e.request);
    })
  );
});
