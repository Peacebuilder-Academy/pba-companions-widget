(function () {
    // ===== DOMAIN GUARD (anti-casual copy/paste) =====
  const ALLOWED_HOSTS = new Set([
  "peacebuilderacademy.com",
  "www.peacebuilderacademy.com",
  "peacebuilderacademy.mykajabi.com",
  "www.peacebuilderacademy.mykajabi.com",
  "localhost" // optional, dev only
]);
  
  if (!ALLOWED_HOSTS.has(window.location.hostname)) {
    console.warn("[PBA] Blocked: unauthorized host", window.location.hostname);
    return;
  }
  // ===== END DOMAIN GUARD =====

  if (window.__PBA_WIDGET_LOADED__) return;
  window.__PBA_WIDGET_LOADED__ = true;

  const WIDGET_URL = "https://peacebuilder-academy.github.io/pba-companions-widget/pba_widget.html";

function mount() {
  // prevent duplicate mount
  if (document.getElementById("pba-widget-iframe")) return;

  // Create iframe (isolated widget world)
  const iframe = document.createElement("iframe");
  iframe.id = "pba-widget-iframe";
  iframe.src = WIDGET_URL;
  iframe.title = "PBA Companions";
  iframe.loading = "lazy";

  // Style: fixed, non-invasive
  Object.assign(iframe.style, {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    width: "420px",
    height: "640px",
    border: "0",
    borderRadius: "18px",
    overflow: "hidden",
    zIndex: "2147483000",
    background: "transparent"
  });

  // Mobile sizing
  if (window.matchMedia("(max-width: 520px)").matches) {
    iframe.style.width = "92vw";
    iframe.style.height = "70vh";
    iframe.style.right = "4vw";
    iframe.style.bottom = "12px";
  }

  document.body.appendChild(iframe);
}

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
