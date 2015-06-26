(function() {
var clickCounter = 0;

addEventListener("keypress", (e) => {
  if (e.key === "MozCameraFocusAdjust") {
    console.log('click', clickCounter);
    if (++clickCounter === 3) {
      console.log('triple-click');
      var lock = navigator.mozSettings.createLock();
      var req  = lock.get("accessibility.colors.enable");
      req.onsuccess = () => {
        lock.set({"accessibility.colors.enable": !req.result["accessibility.colors.enable"]});
        document.body.hidden = true;
        window.setTimeout(() => { document.body.hidden = false; }, 20);
      };
    }
    setTimeout(() => { clickCounter-- }, 750);
  }
});
})();
