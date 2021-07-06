//3 event: install , fetch , active
// 'this' object refers to ServiceWorker class, creates first time when sw registered into app
const cacheName = "v1";
const cacheAssests = ["/index.html", "/offline.html"];

this.addEventListener("install", (e) => {
  //calls once when sw object created (registered)
  console.log("SW installing...");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("cache opened");

        return cache.addAll(cacheAssests);
      })
      .catch((err) => console.log(err))
  );
});

//By doing this we can provide "offline page"
this.addEventListener("fetch", (e) => {
  //respondWith: prevents browser default beh of fetching
  console.log(`fetch triggered: request: ${e}`);
  e.respondWith(
    caches
      .match(e.request)
      .then(() => {
        return fetch(e.request); //uses network;
      })
      .catch(() => caches.match("offline.html"))
  );
});

console.log(this.caches.keys().then((data) => console.log(data)));
this.addEventListener("active", (e) => {
  //active will try to active serviceworker

  console.log("active event triggered");
  const cacheList = [];
  cacheList.push(cacheName);

  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
