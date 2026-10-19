/**
 * Membangun kartu produk dari data. Semua teks dilewatkan escapeHtml()
 * supaya aman dan tampil apa adanya.
 */

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[ch]));

const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;

/** "Rp35.000" -> 35000 */
const toNumber = (price) => Number(String(price || "").replace(/[^\d]/g, "")) || 0;

/** Persentase hemat dari harga coret, dibulatkan ke bawah supaya tidak melebih-lebihkan. */
function savings(product) {
  const now = toNumber(product.price);
  const was = toNumber(product.was);
  if (!now || !was || was <= now) return "";
  return `Hemat ${Math.floor((1 - now / was) * 100)}%`;
}

function productCard(product, index) {
  const name = escapeHtml(product.name);
  const badge = product.badge ? `<span class="pcard__badge">${escapeHtml(product.badge)}</span>` : "";
  const save = savings(product);
  const saveTag = save ? `<span class="pcard__save">${save}</span>` : "";
  const story = (product.story || []).map((para) => `<p>${escapeHtml(para)}</p>`).join("");
  const prefix = product.pricePrefix ? `<small>${escapeHtml(product.pricePrefix)}</small>` : "";
  const was = product.was ? `<s aria-label="Harga normal ${escapeHtml(product.was)}">${escapeHtml(product.was)}</s>` : "";

  return `
    <article class="pcard${product.badge === "Paling Hemat" ? " pcard--featured" : ""}" data-i="${index}" aria-labelledby="p-${escapeHtml(product.id)}">
      <div class="pcard__media" style="--cover: url('${escapeHtml(new URL(product.image, document.baseURI).href)}')">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.imageAlt || product.name)}"
             width="640" height="550" loading="${index < 2 ? "eager" : "lazy"}" decoding="async">
        ${badge}${saveTag}
      </div>
      <div class="pcard__body">
        ${product.kicker ? `<p class="pcard__kicker">${escapeHtml(product.kicker)}</p>` : ""}
        <h3 class="pcard__name" id="p-${escapeHtml(product.id)}">${name}</h3>
        ${product.hook ? `<p class="pcard__hook">${escapeHtml(product.hook)}</p>` : ""}
        <div class="pcard__story">${story}</div>
        ${product.why ? `<p class="pcard__close">${escapeHtml(product.why)}</p>` : ""}
        <div class="pcard__foot">
          <p class="pcard__price">${prefix}<b>${escapeHtml(product.price)}</b>${was}</p>
          <a class="pcard__cta" href="${escapeHtml(product.url)}" target="_blank" rel="noopener noreferrer"
             aria-label="${escapeHtml(product.cta)}: ${name} (membuka Lynk.id)">
            ${escapeHtml(product.cta)} ${ARROW}
          </a>
        </div>
      </div>
    </article>`;
}

export function renderProducts(track, products) {
  const list = (products || []).filter((p) => p && p.name && p.url);
  track.insertAdjacentHTML("beforeend", list.map(productCard).join(""));
  return list.length;
}

/** Daftar produk di footer. */
export function renderProductLinks(list, products) {
  if (!list) return;
  list.innerHTML = (products || [])
    .map((p) => `<li><a href="#produk" data-scroll data-goto="${escapeHtml(p.id)}">${escapeHtml((p.kicker || p.name).split("·")[0].trim())}</a></li>`)
    .join("");
}
