/**
 * Animasi halaman memakai Motion (motion.dev), build browser yang di-vendor
 * di assets/vendor/motion.min.js (global `Motion`).
 *
 * Aturan main:
 *  - Animasi masuk hanya memakai opacity + transform/translate supaya ringan di HP.
 *  - Tiap elemen dianimasikan sekali saat masuk viewport.
 *  - Gerak terus-menerus (ponsel melayang, pita cahaya) dikerjakan CSS.
 *  - `prefers-reduced-motion: reduce` -> semua animasi dimatikan.
 */

const EASE = [0.16, 1, 0.3, 1];
const STEP = 0.08;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Tampilkan semua elemen apa adanya (jaring pengaman). */
export function revealAll(root = document) {
  document.documentElement.classList.remove("is-animated");
  root.querySelectorAll("[data-anim], .pcard, .tile, .tile__bar i").forEach((el) => {
    el.style.opacity = "";
    el.style.transform = "";
    el.style.translate = "";
  });
  root.querySelectorAll("[data-count]").forEach((el) => { el.textContent = format(el, Number(el.dataset.count)); });
}

const delayOf = (el) => Number(el.dataset.animI || 0) * STEP;
const format = (el, n) => (el.dataset.format === "id" ? Math.round(n).toLocaleString("id-ID") : String(Math.round(n)));

function enter(M, el) {
  if (el.dataset.animDone === "1") return;
  el.dataset.animDone = "1";
  const scale = el.dataset.anim === "scale";
  const transform = scale ? ["scale(0.92)", "scale(1)"] : ["translateY(26px)", "translateY(0px)"];
  M.animate(el, { opacity: [0, 1], transform }, { duration: 0.8, delay: delayOf(el), ease: EASE });
}

function once(M, el, fn, amount = 0.2) {
  if (typeof M.inView === "function") {
    const stop = M.inView(el, () => { fn(); stop(); }, { amount });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { fn(); io.disconnect(); } });
  }, { threshold: amount });
  io.observe(el);
}

/** Hero: muncul berurutan segera setelah halaman siap. */
function playHero(M) {
  const items = [...document.querySelectorAll('[data-anim="hero"]')];
  items.sort((a, b) => delayOf(a) - delayOf(b));
  items.forEach((el) => { el.dataset.animDone = "1"; });
  M.animate(items, { opacity: [0, 1], transform: ["translateY(30px)", "translateY(0px)"] },
    { duration: 0.9, delay: M.stagger(0.1, { startDelay: 0.1 }), ease: EASE });
}

function observeOnScroll(M) {
  document.querySelectorAll('[data-anim]:not([data-anim="hero"])').forEach((el) => once(M, el, () => enter(M, el), 0.18));
}

/** Angka statistik menghitung naik. */
function counters(M) {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    el.textContent = format(el, 0);
    once(M, el, () => {
      M.animate(0, target, { duration: 1.6, ease: EASE, onUpdate: (v) => { el.textContent = format(el, v); } });
    }, 0.6);
  });
}

/** Ubin keunggulan: muncul bertahap, lalu batang progres terisi. */
function tiles(M) {
  const wrap = document.querySelector(".tiles");
  if (!wrap) return;
  const items = [...wrap.querySelectorAll(".tile")];
  once(M, wrap, () => {
    M.animate(items, { opacity: [0, 1], translate: ["0 30px", "0 0"] },
      { duration: 0.8, delay: M.stagger(0.09), ease: EASE });
    M.animate([...wrap.querySelectorAll(".tile__bar i")], { transform: ["scaleX(0)", "scaleX(1)"] },
      { duration: 1.2, delay: M.stagger(0.09, { startDelay: 0.4 }), ease: EASE });
  }, 0.25);
}

/** Kartu produk: masuk dari kanan berurutan. */
export function productCards(M = window.Motion) {
  const track = document.getElementById("product-track");
  if (!M || !track || prefersReducedMotion()) return;
  const cards = [...track.querySelectorAll(".pcard")];
  if (!cards.length) return;
  once(M, track, () => {
    M.animate(cards, { opacity: [0, 1], translate: ["80px 0", "0 0"] },
      { duration: 0.9, delay: M.stagger(0.08), ease: EASE });
  }, 0.15);
}

/** Garis titik-titik di "Cara Order" tergambar dari kiri ke kanan. */
function stepsPath(M) {
  const path = document.querySelector(".steps__path");
  if (!path) return;
  path.style.clipPath = "inset(0 100% 0 0)";
  once(M, path, () => {
    M.animate(path, { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, { duration: 1.6, ease: EASE });
  }, 0.4);
}

/** Pasang seluruh animasi. Mengembalikan true kalau Motion berhasil dipakai. */
export function initMotion() {
  const M = window.Motion;
  if (!M || typeof M.animate !== "function" || prefersReducedMotion()) {
    revealAll();
    return false;
  }
  document.documentElement.dataset.animInit = "ok";
  playHero(M);
  observeOnScroll(M);
  counters(M);
  tiles(M);
  stepsPath(M);

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onChange = () => { if (mq.matches) revealAll(); };
  mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
  return true;
}
