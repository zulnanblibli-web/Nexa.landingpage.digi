/**
 * DATA KATALOG PRODUK — Nexamind.ai
 * =================================
 * Satu-satunya file yang perlu kamu sentuh untuk menambah, mengubah, atau
 * menghapus produk. Kartu di bagian "Produk" dibangun otomatis dari data ini.
 *
 * Kolom tiap produk:
 *   id          (wajib) penanda unik, huruf kecil & tanda hubung
 *   kicker      (opsional) label kecil di atas nama, mis. "Paket 1 · Edukasi Anak"
 *   name        (wajib) nama produk seperti di Lynk.id
 *   hook        (wajib) kalimat pembuka cerita — satu pertanyaan/situasi yang dekat dengan pembaca
 *   story       (wajib) 1-3 paragraf cerita: manfaat, apa saja yang didapat
 *   why         (wajib) satu kalimat penutup: kenapa harus pilih produk ini
 *   price       (wajib) harga jual, persis seperti di Lynk.id. Contoh: "Rp35.000"
 *   pricePrefix (opsional) kata sebelum harga, mis. "mulai"
 *   was         (opsional) harga coret di Lynk.id. Contoh: "Rp249.000"
 *   badge       (opsional) label kecil di gambar
 *   image       (wajib) path gambar cover di assets/img/produk/
 *   imageAlt    (wajib) deskripsi gambar untuk pembaca layar
 *   url         (wajib) link produk di Lynk.id, PERSIS apa adanya
 *   cta         (wajib) teks tombol, kata kerja & berbeda antar produk
 */

export const storeUrl = "https://lynk.id/zulnandigipreneur";

export const products = [
  {
    id: "paket-1",
    kicker: "Paket 1 · Edukasi Anak",
    name: "Edukasi Lengkap dengan Bonus 39.000 Printable Siap Pakai",
    hook: "Pernah kehabisan ide mau mengajak si kecil belajar apa hari ini?",
    story: [
      "Banyak orang tua dan guru mengalaminya: niatnya ingin belajar sambil bermain, tapi waktu habis untuk mencari dan menyusun materi. Paket ini hadir supaya kamu tidak perlu mulai dari nol lagi.",
      "Begitu dibuka, sudah menunggu 700+ produk digital dan 4000+ worksheet siap cetak, mulai dari mewarnai, berhitung, huruf dan membaca, sampai mengenal hewan. Ada flashcard, Ebook VO Hewan yang bisa didengarkan, doa harian, waktu sholat, hingga kisah 25 nabi untuk menemani sebelum tidur. Sebagai pelengkap, 39.000 printable bonus ikut kamu bawa pulang.",
    ],
    why: "Tinggal pilih, cetak, lalu lihat sendiri bagaimana belajar terasa seperti bermain bagi si kecil.",
    price: "Rp35.000",
    was: "Rp249.000",
    badge: "Terlaris",
    image: "assets/img/produk/paket-1-edukasi-anak.webp",
    imageAlt: "Cover Paket 1: 700+ Produk Digital Paket Edukasi Anak dengan bonus 39.000 printable",
    url: "https://lynk.id/zulnandigipreneur/32ooe5p9n366",
    cta: "Ambil Paket Edukasi",
  },
  {
    id: "paket-2",
    kicker: "Paket 2 · Belajar Sambil Bermain",
    name: "Belajar Sambil Bermain: Quiz SD Kelas 1–6 Bonus Games Asah Otak Anak",
    hook: "Anak susah diajak belajar, tapi betah berjam-jam bermain?",
    story: [
      "Daripada melawan kebiasaannya, kenapa tidak memanfaatkannya? Paket 2 mengubah waktu bermain menjadi waktu belajar, tanpa anak merasa sedang disuruh belajar.",
      "Di dalamnya ada quiz untuk anak SD kelas 1–6 yang mengulang pelajaran sekolahnya, story book dan video animasi yang membuatnya penasaran, game Islami untuk mengenalkan nilai agama, serta game asah otak untuk melatih logika. Sebagai bonus, 16 games anak siap menemani akhir pekan kalian.",
    ],
    why: "Layar yang biasanya hanya jadi hiburan kini ikut membantunya tumbuh, dan kamu bisa menemaninya dengan tenang.",
    price: "Rp49.000",
    was: "Rp299.000",
    image: "assets/img/produk/paket-2-belajar-bermain.webp",
    imageAlt: "Cover Paket 2: quiz anak SD 1-6, story book, video animasi, game Islami, game asah otak, bonus 16 games anak",
    url: "https://lynk.id/zulnandigipreneur/q1llemn5w7wo",
    cta: "Ambil Paket Bermain",
  },
  {
    id: "paket-3",
    kicker: "Paket 3 · Generator AI",
    name: "Generator AI Siap Pakai: Tulis Soal, Buat Modul sampai Gambar Affiliate",
    hook: "Sudah larut malam, soal ujian belum jadi, modul untuk besok belum tersentuh.",
    story: [
      "Kalau situasi itu terdengar akrab, Paket 3 dibuat untukmu. Isinya generator AI yang siap dipakai: pembuat soal ujian dan penyusun modul ajar praktis untuk guru, plus generator AI affiliate fashion dan AI VO generator untuk kreator yang ingin kontennya terus berjalan.",
      "Kamu tidak perlu menyusun prompt dari nol. Cukup isi kebutuhanmu, generate, lalu rapikan sedikit. Bonus bahan konten gratis membuatmu langsung punya stok untuk diunggah.",
    ],
    why: "Waktu yang tadinya habis untuk mengetik kini bisa kamu pakai untuk hal yang lebih penting: mengajar, berkarya, atau sekadar beristirahat.",
    price: "Rp79.000",
    was: "Rp399.000",
    image: "assets/img/produk/paket-3-generator-ai.webp",
    imageAlt: "Cover Paket 3: generator AI affiliate fashion, buat modul ajar praktis, pembuat soal ujian, AI VO generator",
    url: "https://lynk.id/zulnandigipreneur/80665njjzz60",
    cta: "Ambil Generator AI",
  },
  {
    id: "mega-bundling",
    kicker: "Mega Bundling · Paket 1–3 Lengkap",
    name: "Mega Bundle All in One: Semua Paket dalam Satu Akses",
    hook: "Kalau harus memilih satu, kenapa tidak ambil semuanya?",
    story: [
      "Mega Bundling merangkum Paket 1, 2, dan 3 dalam satu akses: edukasi anak, games belajar, sampai generator AI. Yang membuatnya istimewa adalah langkah setelahnya, yaitu tutorial membuat web basic dan web, tutorial Lynk.id, serta tutorial promosi, supaya produk ini juga bisa kamu jual kembali.",
      "Kamu juga mendapat Storybook VIP, akses group komunitas yang rutin berbagi update seputar AI, dan gratis 150 produk digital tambahan.",
    ],
    why: "Dari yang awalnya hanya ingin membantu anak belajar, kamu pulang membawa bekal untuk memulai usaha digitalmu sendiri, dengan harga yang jauh lebih hemat daripada membeli paketnya satu per satu.",
    price: "Rp99.000",
    was: "Rp449.000",
    badge: "Paling Hemat",
    image: "assets/img/produk/mega-bundling.webp",
    imageAlt: "Cover Mega Bundling: paket 1-3 lengkap, tutorial web, tutorial Lynk.id, tutorial promosi, storybook VIP, group komunitas, gratis 150 produk digital",
    url: "https://lynk.id/zulnandigipreneur/yd33m83qxq6p",
    cta: "Ambil Mega Bundling",
  },
  {
    id: "jasa-website",
    kicker: "Jasa Website · Landing Page",
    name: "Jasa Kilat Pembuatan Landing Page / Website Siap Jualan",
    hook: "Produkmu bagus, tapi calon pembeli tidak tahu harus melihat ke mana?",
    story: [
      "Sering kali yang kurang bukan produknya, melainkan tempat untuk memajangnya. Lewat jasa ini kamu mendapat landing page atau website dengan desain custom sesuai brand-mu, tampil rapi di HP maupun laptop, dan siap dipakai jualan.",
      "Kamu tidak perlu pusing soal teknis, karena kamu dibantu sampai websitenya benar-benar online.",
    ],
    why: "Saatnya produkmu punya rumah yang layak, supaya setiap orang yang mampir tahu persis harus klik ke mana.",
    price: "Rp499.000",
    was: "Rp1.000.000",
    badge: "Promo",
    image: "assets/img/produk/jasa-landing-page.webp",
    imageAlt: "Promo Jasa Pembuatan Website: Website & Landing Page Siap Jualan, harga normal Rp1.000.000 jadi Rp499.000",
    url: "https://lynk.id/zulnandigipreneur/yxpz40g5wg81",
    cta: "Pesan Website",
  },
];
