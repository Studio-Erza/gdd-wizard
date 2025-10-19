const CACHE = "gddw-v6.2";

// put EVERY asset your app needs offline here:
const OFFLINE_ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/engine.global.js",
  "./js/content.global.js",
  "./i18n/i18n.global.js",
  "./i18n/i18n.en.js",        // include other packs if you have them
  "./assets/Icon.png",
  "./assets/Erza_Logo_Pink.png",   // remove if you don’t use
  "./assets/Erza_Logo_Black.png",  // remove if you don’t use
  "./fonts/InterVariable.woff2",
  "./fonts/InterVariable-Italic.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(OFFLINE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for same-origin requests (so it works offline)
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((resp) => {
        // put fetched files in cache for next time
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return resp;
      }).catch(() => caches.match("./index.html")))
    );
  }
});
