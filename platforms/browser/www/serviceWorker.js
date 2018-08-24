self.addEventListener('fetch', function(e) {
  //self.postMessage(e.data);
  console.log("Service Worker is running");
}, false);