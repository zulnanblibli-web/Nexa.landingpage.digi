/**
 * Entry point halaman Nexamind.ai.
 * Urutan: render katalog -> pasang animasi -> perilaku kecil lainnya.
 */

import { categories, storeUrl } from "./data/products.js";
import { renderCatalog } from "./render.js";
import { initMotion, revealAll } from "./motion-fx.js";

function smoothScroll() {
  document.querySelectorAll("a[data-scroll]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });
}

function currentYear() {
  const slot = document.querySelector("[data-year]");
  if (slot) slot.textContent = String(new Date().getFullYear());
}

function boot() {
  try {
    const mount = document.getElementById("produk");
    if (mount) renderCatalog(mount, categories, storeUrl);
  } catch (error) {
    console.error("[nexamind] gagal merender katalog:", error);
  }

  try {
    initMotion();
  } catch (error) {
    console.error("[nexamind] animasi dimatikan:", error);
    revealAll();
  }

  smoothScroll();
  currentYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
