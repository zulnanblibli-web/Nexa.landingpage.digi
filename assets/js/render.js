/**
 * Membangun markup kategori + kartu produk dari data.
 * Semua teks dilewatkan escapeHtml() supaya aman dan apa adanya.
 */

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[ch]));

const TICK = `<span class="reason__tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;

const PLACEHOLDER = `<div class="card__ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 15.5 8 11l4.5 4L16 12l5 4.5"/><circle cx="9" cy="8.5" r="1.4"/></svg><span>Produk Digital</span></div>`;

/** Gelombang penutup bagian; `nextTone` = warna latar bagian BERIKUTNYA. */
function waveTo(nextTone, variant = 0) {
  const path =
    variant % 2 === 0
      ? "M0 64c180-44 340-52 520-24s330 60 520 28 300-56 400-44v96H0z"
      : "M0 56c200 56 380 58 560 26s340-66 520-38 260 58 360 50v26H0z";
  return `<div class="wave wave--to-${nextTone}" aria-hidden="true"><svg viewBox="0 0 1440 120" preserveAspectRatio="none" focusable="false"><path d="${path}"/></svg></div>`;
}

function productCard(product, index) {
  const name = escapeHtml(product.name);
  const alt = escapeHtml(product.imageAlt || `Tampilan produk ${product.name}`);
  const media = product.image
    ? `<img class="card__img" src="${escapeHtml(product.image)}" alt="${alt}" loading="lazy" decoding="async" width="640" height="400">`
    : PLACEHOLDER;
  const badge = product.badge
    ? `<span class="card__badge">${escapeHtml(product.badge)}</span>`
    : "";
  const note = product.priceNote
    ? `<small>${escapeHtml(product.priceNote)}</small>`
    : "";

  return `
    <article class="card" data-anim="up" data-anim-i="${index}">
      <div class="card__media">${media}${badge}</div>
      <div class="card__body">
        <h3 class="h3 card__name">${name}</h3>
        <p class="card__price"><b>${escapeHtml(product.price)}</b>${note}</p>
        <p class="card__blurb">${escapeHtml(product.blurb)}</p>
        <p class="card__cta">
          <a class="btn btn--primary" href="${escapeHtml(product.url)}"
             target="_blank" rel="noopener noreferrer"
             aria-label="${escapeHtml(product.cta)} — ${name}">
            ${escapeHtml(product.cta)}
            <svg class="btn__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </p>
      </div>
    </article>`;
}

function categorySection(category, position, tone, nextTone) {
  const kicker = category.kicker
    ? `<p class="eyebrow${tone === "light" ? " eyebrow--ink" : ""}" data-anim="up">${escapeHtml(category.kicker)}</p>`
    : "";
  const intro = category.intro
    ? `<p class="lead cat__intro" data-anim="up" data-anim-i="2">${escapeHtml(category.intro)}</p>`
    : "";
  const reasons = (category.reasons || [])
    .map((r, i) => `<li class="reason" data-anim="up" data-anim-i="${i}">${TICK}<span>${escapeHtml(r)}</span></li>`)
    .join("");

  return `
    <section class="section section--${tone} cat" id="${escapeHtml(category.id)}">
      <div class="container">
        <header class="cat__head">
          ${kicker}
          <h2 class="h2" data-anim="up" data-anim-i="1">${escapeHtml(category.title)}</h2>
          ${intro}
        </header>
        <ul class="reasons">${reasons}</ul>
        <div class="grid-products">
          ${(category.products || []).map(productCard).join("")}
        </div>
      </div>
      ${waveTo(nextTone, position)}
    </section>`;
}

function emptyState(storeUrl) {
  return `
    <section class="section section--dark" id="katalog">
      <div class="container">
        <header class="cat__head">
          <p class="eyebrow" data-anim="up">Katalog</p>
          <h2 class="h2" data-anim="up" data-anim-i="1">Daftar produk belum diisi.</h2>
        </header>
        <div class="empty" data-anim="up" data-anim-i="2">
          <h3>Tinggal satu langkah lagi</h3>
          <p>
            Buka <code>assets/js/data/products.js</code>, lalu isi kategori dan produk
            sesuai toko Lynk.id. Templat beserta penjelasan tiap kolom sudah tersedia
            di dalam file tersebut.
          </p>
          <a class="btn btn--primary" href="${escapeHtml(storeUrl)}" target="_blank" rel="noopener noreferrer">
            Buka Toko di Lynk.id
          </a>
        </div>
      </div>
      ${waveTo("dark")}
    </section>`;
}

export function renderCatalog(mount, categories, storeUrl) {
  const filled = (categories || []).filter(
    (c) => c && Array.isArray(c.products) && c.products.length > 0
  );
  if (!filled.length) {
    mount.insertAdjacentHTML("beforeend", emptyState(storeUrl));
    return 0;
  }

  // Warna latar menyelang-nyeling, kecuali kalau kategori menentukan `tone`.
  const tones = filled.map((c, i) => c.tone || (i % 2 === 0 ? "dark" : "light"));
  const html = filled
    .map((c, i) => categorySection(c, i, tones[i], tones[i + 1] || "dark"))
    .join("");

  mount.insertAdjacentHTML("beforeend", html);
  return filled.length;
}
