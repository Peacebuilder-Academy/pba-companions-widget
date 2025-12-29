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
    fetch(WIDGET_URL, { cache: "no-store" })
      .then((r) => r.text())
      .then((html) => {
        const host = document.createElement("div");
        host.id = "pba-widget-host";
        host.innerHTML = html;
        document.body.appendChild(host);

        // Re-run any inline <script> tags inside the injected HTML
        host.querySelectorAll("script").forEach((old) => {
          const s = document.createElement("script");
          if (old.src) s.src = old.src;
          s.text = old.textContent || "";
          document.head.appendChild(s);
          old.remove();
        });
      })
      .catch((e) => console.error("PBA loader error:", e));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
