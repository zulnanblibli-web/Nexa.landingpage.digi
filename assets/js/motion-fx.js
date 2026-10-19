/**
 * Animasi halaman memakai Motion (motion.dev), build browser yang di-vendor
 * di assets/vendor/motion.min.js (global `Motion`).
 *
 * Aturan main:
 *  - Hanya menganimasikan `opacity` dan `transform` supaya ringan di HP.
 *  - Durasi 0,3-0,8 detik, easing halus.
 *  - Setiap elemen hanya dianimasikan sekali saat masuk viewport.
 *  - `prefers-reduced-motion: reduce` -> semua animasi dimatikan.
 */

const EASE = [0.22, 0.68, 0.32, 1];
const STEP = 0.08; // jeda antar elemen dalam satu kelompok

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Tampilkan semua elemen apa adanya (dipakai sebagai jaring pengaman). */
export function revealAll(root = document) {
  document.documentElement.classList.remove("is-animated");
  root.querySelectorAll("[data-anim]").forEach((el) => {
    el.style.opacity = "";
    el.style.transform = "";
  });
}

const delayOf = (el) => Number(el.dataset.animI || 0) * STEP;

function enter(M, el) {
  if (el.dataset.animDone === "1") return;
  el.dataset.animDone = "1";

  const from = el.dataset.anim === "scale" ? "scale(0.96)" : "translateY(22px)";
  M.animate(
    el,
    { opacity: [0, 1], transform: [from, "none"] },
    { duration: 0.6, delay: delayOf(el), ease: EASE }
  );
}

/** Animasi masuk untuk hero: berurutan, dijalankan segera. */
function playHero(M) {
  const items = [...document.querySelectorAll('[data-anim="hero"]')];
  if (!items.length) return;
  items.sort((a, b) => delayOf(a) - delayOf(b));
  items.forEach((el) => { el.dataset.animDone = "1"; });
  M.animate(
    items,
    { opacity: [0, 1], transform: ["translateY(22px)", "none"] },
    { duration: 0.7, delay: M.stagger(STEP, { startDelay: 0.08 }), ease: EASE }
  );
}

/** Animasi saat elemen masuk viewport — sekali saja. */
function observeOnScroll(M) {
  const targets = document.querySelectorAll(
    '[data-anim]:not([data-anim="hero"]):not([data-anim-done])'
  );
  if (!targets.length) return;

  if (typeof M.inView === "function") {
    targets.forEach((el) => {
      const stop = M.inView(el, () => {
        enter(M, el);
        stop(); // cukup sekali
      }, { amount: 0.18 });
    });
    return;
  }

  // Cadangan kalau inView tidak tersedia di build Motion ini.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        enter(M, entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((el) => io.observe(el));
}

/** Denyut halus pada CTA utama, berjalan terus tapi sangat lembut. */
function pulseMainCta(M) {
  document.querySelectorAll(".btn--pulse:not([data-pulsing])").forEach((btn, i) => {
    btn.dataset.pulsing = "1";
    M.animate(
      btn,
      { transform: ["scale(1)", "scale(1.022)", "scale(1)"] },
      { duration: 2.6, repeat: Infinity, delay: 1.2 + i * 0.4, ease: "easeInOut" }
    );
  });
}

/**
 * Pasang seluruh animasi halaman.
 * Mengembalikan true kalau Motion berhasil dipakai.
 */
export function initMotion() {
  const M = window.Motion;
  if (!M || typeof M.animate !== "function" || prefersReducedMotion()) {
    revealAll();
    return false;
  }

  document.documentElement.dataset.animInit = "ok";
  playHero(M);
  observeOnScroll(M);
  pulseMainCta(M);

  // Kalau pengguna mengubah preferensinya di tengah jalan, hentikan animasi.
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onChange = () => { if (mq.matches) revealAll(); };
  mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);

  return true;
}

