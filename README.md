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
index.html                      Kerangka halaman: hero, tentang, penutup, footer
assets/
  css/styles.css                Seluruh gaya visual + keadaan awal animasi
  js/
    main.js                     Entry point
    render.js                   Membangun markup kategori & kartu produk
    motion-fx.js                Seluruh animasi Motion
    data/products.js    ←←←     DATA PRODUK — satu-satunya file yang rutin diedit
  img/                          Logo, foto profil, foto hero (sudah dioptimalkan)
  vendor/motion.min.js          Motion 13.5.1 (build browser, global `Motion`)
```

## Menambah / mengubah produk

Buka `assets/js/data/products.js`. Penjelasan tiap kolom ada di komentar paling
atas file tersebut. Ringkasnya:

```js
export const categories = [
  {
    id: "panduan-ai",                 // dipakai sebagai anchor di URL
    kicker: "Kategori 01",
    title: "Panduan & Ebook AI",
    intro: "Satu kalimat pengantar kategori.",
    reasons: ["Alasan 1", "Alasan 2", "Alasan 3"],
    products: [
      {
        id: "ebook-prompt",
        name: "Nama Produk",
        price: "Rp49.000",
        priceNote: "sekali bayar",       // opsional
        blurb: "Maksimal 2 kalimat soal isi produk.",
        image: "assets/img/produk/ebook-prompt.webp", // "" kalau belum ada
        imageAlt: "",                    // opsional
        url: "https://lynk.id/zulnandigipreneur/xxxxx",
        cta: "Ambil Sekarang",
        badge: "Terlaris"                // opsional
      }
    ]
  }
];
```

Catatan:

- **`url` harus persis** link transaksi produk di Lynk.id. Salin satu per satu,
  jangan sampai tertukar.
- **`cta` sebaiknya berbeda** antar produk dan berupa kata kerja.
- Warna latar bagian kategori **otomatis menyelang-nyeling** gelap–terang.
  Kalau mau memaksa, tambahkan `tone: "dark"` atau `tone: "light"`.
- Kalau `products` sebuah kategori kosong, kategori itu tidak ditampilkan.
- Selama `categories` masih kosong, halaman menampilkan kartu pengingat berisi
  cara mengisinya.

### Gambar produk

Taruh di `assets/img/produk/`. Rasio kartu 16:10, ukuran ideal 640×400 piksel,
format `.webp` supaya ringan. Kalau `image` dikosongkan, kartu otomatis memakai
placeholder bergradien yang rapi.

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
