/**
 * Entry point halaman Nexamind.ai.
 * Urutan: render produk -> pasang animasi -> interaksi (carousel, testimoni, navigasi).
 */

import { products } from "./data/products.js";
import { renderProducts, renderProductLinks } from "./render.js";
import { initMotion, productCards, revealAll, prefersReducedMotion } from "./motion-fx.js";

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function smoothScroll() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-scroll]");
    if (!link) return;
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", link.getAttribute("href"));
    if (link.dataset.goto) goToProduct(link.dataset.goto);
  });
}

/* ── Menu HP ─────────────────────────────────────────────────────────────── */
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("menu");
function closeMenu() {
  if (!toggle || toggle.getAttribute("aria-expanded") !== "true") return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Buka menu");
  menu.hidden = true;
}
function mobileMenu() {
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    menu.hidden = !open;
    document.getElementById("nav").classList.toggle("is-scrolled", open || scrollY > 20);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
}

/* ── Navigasi: latar saat scroll, link & titik aktif ─────────────────────── */
function navState() {
  const nav = document.getElementById("nav");
  const links = [...document.querySelectorAll(".nav__links a, .rail a")];
  const ids = ["atas", "tentang", "keunggulan", "produk", "cara-order", "testimoni"];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const sticky = document.querySelector(".sticky-cta");
  const productsEl = document.getElementById("produk");
  let ticking = false;

  const update = () => {
    ticking = false;
    nav.classList.toggle("is-scrolled", scrollY > 20 || toggle?.getAttribute("aria-expanded") === "true");
    const mid = innerHeight * 0.4;
    let current = sections[0]?.id;
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= mid) current = s.id; });
    links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`));

    if (sticky && productsEl) {
      const r = productsEl.getBoundingClientRect();
      const inProducts = r.top < innerHeight * 0.8 && r.bottom > innerHeight * 0.2;
      sticky.classList.toggle("is-shown", scrollY > innerHeight * 0.6 && !inProducts);
    }
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();
}

/* ── Carousel produk ─────────────────────────────────────────────────────── */
let track;
function cardStep() {
  const card = track.querySelector(".pcard");
  if (!card) return 300;
  return card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 22);
}
function goToProduct(id) {
  const card = track?.querySelector(`.pcard [id="p-${id}"]`)?.closest(".pcard");
  if (!card) return;
  track.scrollTo({ left: card.offsetLeft - track.offsetLeft - 8, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
function carousel() {
  track = document.getElementById("product-track");
  if (!track) return;
  const wrap = track.closest(".carousel");
  const prev = wrap.querySelector('[data-dir="-1"]');
  const next = wrap.querySelector('[data-dir="1"]');
  const cur = wrap.querySelector("[data-current]");
  const total = wrap.querySelector("[data-total]");
  const count = track.querySelectorAll(".pcard").length;
  total.textContent = String(count);

  const sync = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= max - 4;
    const i = Math.min(count, Math.round(track.scrollLeft / cardStep()) + 1);
    cur.textContent = String(next.disabled ? count : i);
  };
  [prev, next].forEach((btn) => btn.addEventListener("click", () => {
    track.scrollBy({ left: Number(btn.dataset.dir) * cardStep(), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
  });
  track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
  addEventListener("resize", sync);
  sync();

  // Geser dengan drag mouse di desktop (sentuh sudah otomatis).
  if (finePointer) {
    let down = false, startX = 0, startLeft = 0, moved = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.target.closest("a, button")) return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
      track.style.scrollSnapType = "none";
    });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startLeft - dx;
    });
    addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      track.style.scrollSnapType = "";
      if (moved) { const i = Math.round(track.scrollLeft / cardStep()); track.scrollTo({ left: i * cardStep(), behavior: "smooth" }); }
    });
  }
}

/* ── Kartu: miring 3D + sorotan mengikuti kursor ─────────────────────────── */
function cardTilt() {
  if (!finePointer || prefersReducedMotion()) return;
  document.querySelectorAll(".pcard").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
      card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      ["--ry", "--rx", "--mx", "--my"].forEach((p) => card.style.removeProperty(p));
    });
  });
}

/* ── Tombol magnetik ─────────────────────────────────────────────────────── */
function magnetic() {
  if (!finePointer || prefersReducedMotion()) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${(e.clientX - r.left - r.width / 2) * 0.22}px`);
      el.style.setProperty("--my", `${(e.clientY - r.top - r.height / 2) * 0.3}px`);
    });
    el.addEventListener("pointerleave", () => { el.style.setProperty("--mx", "0px"); el.style.setProperty("--my", "0px"); });
  });
}

/* ── Testimoni ───────────────────────────────────────────────────────────── */
function testimonials() {
  const stage = document.querySelector(".testi__stage");
  if (!stage) return;
  const quotes = [...stage.querySelectorAll(".quote")];
  const dots = [...stage.querySelectorAll(".testi__dots button")];
  const n = quotes.length;
  let index = 0, timer = 0;

  const show = (i) => {
    index = (i + n) % n;
    quotes.forEach((q, k) => {
      q.classList.toggle("is-active", k === index);
      q.classList.toggle("is-prev", k === (index - 1 + n) % n);
      q.classList.toggle("is-next", k === (index + 1) % n);
      q.setAttribute("aria-hidden", String(k !== index));
    });
    dots.forEach((d, k) => d.setAttribute("aria-selected", String(k === index)));
  };
  const play = () => {
    clearInterval(timer);
    if (!prefersReducedMotion()) timer = setInterval(() => show(index + 1), 6000);
  };
  dots.forEach((d, k) => d.addEventListener("click", () => { show(k); play(); }));
  quotes.forEach((q, k) => q.addEventListener("click", () => { if (k !== index) { show(k); play(); } }));
  stage.addEventListener("pointerenter", () => clearInterval(timer));
  stage.addEventListener("pointerleave", play);
  stage.addEventListener("focusin", () => clearInterval(timer));
  stage.addEventListener("focusout", play);
  show(0);
  play();
}

function currentYear() {
  const slot = document.querySelector("[data-year]");
  if (slot) slot.textContent = String(new Date().getFullYear());
}

function boot() {
  try {
    const t = document.getElementById("product-track");
    if (t) renderProducts(t, products);
    renderProductLinks(document.querySelector("[data-product-links]"), products);
  } catch (error) {
    console.error("[nexamind] gagal merender produk:", error);
  }

  try {
    if (initMotion()) productCards();
  } catch (error) {
    console.error("[nexamind] animasi dimatikan:", error);
    revealAll();
  }

  smoothScroll();
  mobileMenu();
  navState();
  carousel();
  cardTilt();
  magnetic();
  testimonials();
  currentYear();
}

// Motion dimuat dengan `defer`; module juga deferred, jadi keduanya siap di sini.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
