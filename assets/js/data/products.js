/**
 * DATA KATALOG PRODUK — Nexamind.ai
 * =================================
 * Ini satu-satunya file yang perlu kamu sentuh untuk menambah, mengubah,
 * atau menghapus produk. Tampilan halaman dibangun otomatis dari data ini.
 *
 * Cara menambah produk:
 *   1. Cari kategori yang cocok di array `categories` di bawah.
 *   2. Salin satu blok di dalam `products`, lalu ganti isinya.
 *   3. Simpan file, refresh browser. Selesai.
 *
 * Kolom yang tersedia untuk tiap produk:
 *   id        (wajib) penanda unik, huruf kecil & tanda hubung. Contoh: "ebook-prompt-ai"
 *   name      (wajib) nama produk persis seperti di Lynk.id
 *   price     (wajib) harga persis seperti tertulis di Lynk.id. Contoh: "Rp49.000"
 *   priceNote (opsional) keterangan kecil di samping harga. Contoh: "sekali bayar"
 *   blurb     (wajib) penjelasan isi & tampilan produk, maksimal 2 kalimat
 *   image     (opsional) path gambar, mis. "assets/img/produk/ebook-prompt.webp"
 *             Kosongkan ("") kalau belum ada — kartu otomatis memakai placeholder rapi.
 *   imageAlt  (opsional) teks alt gambar. Kalau kosong, dibuat dari nama produk.
 *   url       (wajib) link transaksi produk di Lynk.id, PERSIS apa adanya
 *   cta       (wajib) teks tombol, harus kata kerja dan berbeda antar produk
 *   badge     (opsional) label kecil di pojok gambar. Contoh: "Terlaris"
 *
 * Kolom untuk tiap kategori:
 *   id      (wajib) dipakai sebagai anchor link di URL
 *   title   (wajib) nama kategori, singkat
 *   kicker  (opsional) label kecil di atas judul
 *   intro   (opsional) satu kalimat pengantar kategori
 *   reasons (wajib) 2-3 alasan "kenapa pilih kategori ini", fokus manfaat pembeli
 *   tone    (opsional) "dark" atau "light" — mengatur warna latar bagian ini.
 *           Kosongkan saja; halaman otomatis menyelang-nyeling gelap/terang.
 */

export const storeUrl = "https://lynk.id/zulnandigipreneur";

export const categories = [
  // ───────────────────────────────────────────────────────────────────────────
  // Belum ada produk yang dimasukkan.
  //
  // Hapus baris komentar pada blok contoh di bawah, lalu ganti isinya dengan
  // produk asli dari https://lynk.id/zulnandigipreneur
  // ───────────────────────────────────────────────────────────────────────────
  //
  // {
  //   id: "panduan-ai",
  //   kicker: "Kategori 01",
  //   title: "Panduan & Ebook AI",
  //   intro: "Bacaan ringkas untuk kamu yang mau mulai dari nol.",
  //   reasons: [
  //     "Langsung ke inti, tanpa teori berputar-putar.",
  //     "Bisa dibaca dari HP kapan pun sempat.",
  //     "Formatnya ringkas, sekali duduk selesai."
  //   ],
  //   products: [
  //     {
  //       id: "contoh-produk",
  //       name: "Nama Produk Persis dari Lynk.id",
  //       price: "Rp0.000",
  //       priceNote: "",
  //       blurb: "Satu sampai dua kalimat tentang isi dan tampilan produknya.",
  //       image: "",
  //       imageAlt: "",
  //       url: "https://lynk.id/zulnandigipreneur/xxxxx",
  //       cta: "Ambil Sekarang",
  //       badge: ""
  //     }
  //   ]
  // },
];
