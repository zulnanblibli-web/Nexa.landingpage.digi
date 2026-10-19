/**
 * DATA KATALOG PRODUK — Nexamind.ai
 * =================================
 * Satu-satunya file yang perlu kamu sentuh untuk menambah, mengubah, atau
 * menghapus produk. Kartu di bagian "Produk" dibangun otomatis dari data ini.
 *
 * Kolom tiap produk:
 *   id         (wajib) penanda unik, huruf kecil & tanda hubung
 *   kicker     (opsional) label kecil di atas nama, mis. "Paket 1 · Edukasi Anak"
 *   name       (wajib) nama produk seperti di Lynk.id
 *   price      (wajib) harga jual, persis seperti di Lynk.id. Contoh: "Rp35.000"
 *   pricePrefix(opsional) kata sebelum harga, mis. "mulai"
 *   was        (opsional) harga coret di Lynk.id. Contoh: "Rp249.000"
 *   badge      (opsional) label kecil di pojok gambar
 *   image      (wajib) path gambar cover di assets/img/produk/
 *   imageAlt   (wajib) deskripsi gambar untuk pembaca layar
 *   imagePos   (opsional) bagian gambar yang diutamakan saat dipotong, mis. "0% 50%"
 *   benefits   (wajib) 3 alasan singkat "kenapa harus pakai"
 *   tags       (opsional) 2-3 kata kunci pendek
 *   url        (wajib) link produk di Lynk.id, PERSIS apa adanya
 *   cta        (wajib) teks tombol, kata kerja & berbeda antar produk
 *
 * Catatan link: selama link per produk belum diisi, tombol diarahkan ke
 * halaman toko (storeUrl). Ganti `url` dengan link produk masing-masing dari
 * Lynk.id (buka produknya, salin alamat dari address bar).
 */

export const storeUrl = "https://lynk.id/zulnandigipreneur";

export const products = [
  {
    id: "paket-1",
    kicker: "Paket 1 · Edukasi Anak",
    name: "Edukasi Lengkap dengan Bonus 39.000 Printable Siap Pakai",
    price: "Rp35.000",
    was: "Rp249.000",
    badge: "Terlaris",
    image: "assets/img/produk/paket-1-edukasi-anak.webp",
    imageAlt: "Cover Paket 1: 700+ Produk Digital Paket Edukasi Anak dengan bonus 39.000 printable",
    benefits: [
      "700+ produk digital dan 4000+ worksheet anak siap cetak.",
      "Flashcard, Ebook VO Hewan, Doa Harian, Waktu Sholat & Kisah 25 Nabi.",
      "Bonus 39.000 printable, tinggal unduh lalu pakai.",
    ],
    tags: ["Orang Tua", "Guru PAUD/TK"],
    url: storeUrl,
    cta: "Ambil Paket 1",
  },
  {
    id: "paket-2",
    kicker: "Paket 2 · Belajar Sambil Bermain",
    name: "Belajar Sambil Bermain: Quiz SD Kelas 1–6 Bonus Games Asah Otak Anak",
    price: "Rp49.000",
    was: "Rp299.000",
    image: "assets/img/produk/paket-2-belajar-bermain.webp",
    imageAlt: "Cover Paket 2: quiz anak SD 1-6, story book, video animasi, game Islami, game asah otak, bonus 16 games anak",
    benefits: [
      "Quiz anak SD kelas 1–6, story book, dan video animasi.",
      "Game Islami dan game asah otak yang bikin anak betah belajar.",
      "Bonus 16 games anak.",
    ],
    tags: ["SD Kelas 1–6", "Games"],
    url: storeUrl,
    cta: "Ambil Paket 2",
  },
  {
    id: "paket-3",
    kicker: "Paket 3 · Generator AI",
    name: "Generator AI Siap Pakai: Tulis Soal, Buat Modul sampai Gambar Affiliate",
    price: "Rp79.000",
    was: "Rp399.000",
    image: "assets/img/produk/paket-3-generator-ai.webp",
    imageAlt: "Cover Paket 3: generator AI affiliate fashion, buat modul ajar praktis, pembuat soal ujian, AI VO generator",
    benefits: [
      "Pembuat soal ujian dan modul ajar praktis dalam hitungan menit.",
      "Generator AI affiliate fashion dan AI VO generator.",
      "Gratis bahan konten siap pakai.",
    ],
    tags: ["Guru", "Kreator", "Affiliate"],
    url: storeUrl,
    cta: "Ambil Paket 3",
  },
  {
    id: "mega-bundling",
    kicker: "Mega Bundling · Paket 1–3 Lengkap",
    name: "Mega Bundle All in One: Semua Paket dalam Satu Akses",
    price: "Rp99.000",
    was: "Rp449.000",
    badge: "Paling Hemat",
    image: "assets/img/produk/mega-bundling.webp",
    imageAlt: "Cover Mega Bundling: paket 1-3 lengkap, tutorial web, tutorial Lynk.id, tutorial promosi, storybook VIP, group komunitas, gratis 150 produk digital",
    benefits: [
      "Paket 1–3 lengkap, untuk dipakai sendiri atau dijual kembali.",
      "Tutorial web, Lynk.id & promosi, plus Storybook VIP.",
      "Group komunitas update AI dan gratis 150 produk digital.",
    ],
    tags: ["All in One", "Bisa Dijual Lagi"],
    url: storeUrl,
    cta: "Ambil Mega Bundling",
  },
  {
    id: "jasa-website",
    kicker: "Jasa Website · Landing Page",
    name: "Jasa Kilat Pembuatan Landing Page / Website Siap Jualan",
    pricePrefix: "mulai",
    price: "Rp149.000",
    badge: "Promo",
    image: "assets/img/produk/jasa-landing-page.webp",
    imagePos: "0% 50%",
    imageAlt: "Promo jasa Website & Landing Page Siap Jualan mulai Rp149 ribu",
    benefits: [
      "Desain custom sesuai brand kamu.",
      "Rapi di HP & laptop, langsung siap jualan.",
      "Dibantu sampai website online.",
    ],
    tags: ["UMKM", "Kreator"],
    url: storeUrl,
    cta: "Pesan Website",
  },
];
