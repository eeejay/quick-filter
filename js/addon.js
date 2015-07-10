(function() {

"use strict";

var clickCounter = 0;
var hasFilterSet = true;

function getSetting(key) {
  return new Promise((resolve) => {
    var lock = navigator.mozSettings.createLock();
    var req  = lock.get(key);
    req.onsuccess = () => resolve(req.result[key]);
  });
}

var quickFilterListener = (e) => {
  if (e.key === "MozCameraFocusAdjust" || e.key === "Camera") {
    if (++clickCounter === 3) {
      getSetting("accessibility.colors.enable").then(value => {
        var lock = navigator.mozSettings.createLock();
        if (!hasFilterSet) {
          // User has no filter set, apply invert so they getthe idea..
          lock.set({"accessibility.colors.invert": true});
          hasFilterSet = true;
        }

        lock.set({"accessibility.colors.enable": !value});
        document.body.style.transform = "rotateZ(0deg)";
        window.setTimeout(() => { document.body.style.transform = "none"; }, 20);
      });
    }
    setTimeout(() => { clickCounter--; }, 1000);
  }
};

addEventListener("keypress", quickFilterListener);

navigator.mozApps.mgmt.addEventListener("enabledstatechange", (e) => {
  if (e.application.manifest.name === "Quick Filter" && !e.application.enabled) {
    removeEventListener("keypress", quickFilterListener);
  }
});

Promise.all([getSetting("accessibility.colors.invert"),
  getSetting("accessibility.colors.grayscale"),
  getSetting("accessibility.colors.contrast")]).then(([invert, grayscale, contrast]) => {
    hasFilterSet = !!(invert || grayscale || Number(contrast));
  });

})();
