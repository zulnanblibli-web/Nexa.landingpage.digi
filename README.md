# Nexamind.ai — Landing Page Katalog Produk

Landing page statis untuk menampilkan produk digital Nexamind.ai dan mengarahkan
pembeli ke halaman transaksi di [Lynk.id](https://lynk.id/zulnandigipreneur).

## Stack

HTML + CSS + JavaScript murni (ES modules). Tidak ada build step, tidak ada
framework. Animasi memakai [Motion](https://motion.dev) versi browser yang
di-vendor ke dalam repo (`assets/vendor/motion.min.js`), supaya halaman tidak
bergantung pada CDN pihak ketiga dan tetap cepat dibuka dari HP.

## Struktur folder

```
index.html                      Kerangka halaman: hero, tentang, keunggulan, produk,
                                cara order, testimoni, penutup, footer
assets/
  css/styles.css                Seluruh gaya visual + keadaan awal animasi
  js/
    main.js                     Entry point: carousel, testimoni, navigasi, CTA lengket
    render.js                   Membangun kartu produk dari data
    motion-fx.js                Animasi masuk & scroll (Motion)
    data/products.js    ←←←     DATA PRODUK — satu-satunya file yang rutin diedit
  img/                          Logo, potret, cover produk (assets/img/produk/)
  vendor/motion.min.js          Motion 13.5.1 (build browser, global `Motion`)
```

## Menambah / mengubah produk

Buka `assets/js/data/products.js`. Penjelasan tiap kolom ada di komentar paling
atas file tersebut. Ringkasnya:

```js
{
  id: "paket-1",
  kicker: "Paket 1 · Edukasi Anak",
  name: "Nama produk seperti di Lynk.id",
  price: "Rp35.000",
  was: "Rp249.000",                // harga coret, opsional
  badge: "Terlaris",               // opsional
  image: "assets/img/produk/paket-1-edukasi-anak.webp",
  imageAlt: "Deskripsi gambar",
  benefits: ["Alasan 1", "Alasan 2", "Alasan 3"],   // "kenapa harus pakai"
  tags: ["Orang Tua", "Guru PAUD/TK"],
  url: "https://lynk.id/zulnandigipreneur/xxxxx",   // link produk di Lynk.id
  cta: "Ambil Paket 1"
}
```

Catatan:

- **`url` harus persis** link produk di Lynk.id. Selama belum diisi, tombol
  diarahkan ke halaman toko.
- **`cta` sebaiknya berbeda** antar produk dan berupa kata kerja.
- Label "Hemat xx%" dihitung otomatis dari `price` dan `was`.
- Cover produk: taruh di `assets/img/produk/`, format `.webp`, rasio mendekati persegi.

## Menjalankan secara lokal

```bash
npm start            # buka http://localhost:4173
```

Atau tanpa Node sama sekali:

```bash
python3 -m http.server 4173
```

Harus lewat server (bukan `file://`), karena halaman memakai ES modules.

## Deploy

### GitHub Pages (paling praktis)

1. Push ke branch yang dipakai.
2. Buka **Settings → Pages** di repositori.
3. **Source**: `Deploy from a branch`, pilih branch tersebut dan folder `/ (root)`.
4. Simpan. Beberapa menit kemudian halaman tersedia di
   `https://zulnanblibli-web.github.io/Nexa.landingpage.digi/`.

Tidak perlu build — seluruh isi repo langsung bisa disajikan apa adanya.

### Netlify / Vercel / Cloudflare Pages

Hubungkan repo, kosongkan build command, set publish directory ke `.` (root).

## Memperbarui Motion

```bash
npm run vendor:motion
```

## Aksesibilitas & performa

- Kontras teks memenuhi WCAG AA pada latar gelap maupun terang.
- Seluruh target sentuh tombol minimal 52px.
- Animasi otomatis mati saat `prefers-reduced-motion: reduce` aktif.
- Kalau JavaScript atau Motion gagal dimuat, seluruh konten tetap tampil
  (ada jaring pengaman di `index.html` dan `motion-fx.js`).
- Gambar memakai `srcset` dan dimuat malas di luar layar pertama.
