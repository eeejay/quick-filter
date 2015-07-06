(function() {
var clickCounter = 0;

var quickFilterListener = (e) => {
  if (e.key === "MozCameraFocusAdjust" || e.key === "Camera") {
    if (++clickCounter === 3) {
      console.log('Toggle color filter');
      var lock = navigator.mozSettings.createLock();
      var req  = lock.get("accessibility.colors.enable");
      req.onsuccess = () => {
        lock.set({"accessibility.colors.enable": !req.result["accessibility.colors.enable"]});
        document.body.style.transform = 'rotateZ(0deg)';
        window.setTimeout(() => { document.body.style.transform = 'none'; }, 20);
      };
    }
    setTimeout(() => { clickCounter-- }, 1000);
  }
};

addEventListener("keypress", quickFilterListener);

navigator.mozApps.mgmt.addEventListener("enabledstatechange", (e) => {
  if (e.application.manifest.name === "Quick Filter" && !e.application.enabled) {
    removeEventListener("keypress", quickFilterListener);
  }
});


})();
