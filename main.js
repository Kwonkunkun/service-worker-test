// 서비스 워커가 이 브라우저에서 지원되면
if ("serviceWorker" in navigator) {
  // 서비스 워커 script 등록하기
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw_cached_site.js")
      .then((reg) => {
        console.log("service worker: registered");
      })
      .catch((err) => console.log(`service worker: error: ${err}`));
  });
}
