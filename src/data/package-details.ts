export interface PackageDetail {
  slug: string;
  tagline: string;
  summary: string;
  inclusions: string[];
  exclusions?: string[];
  note?: string;
}

export const packageDetails: Record<string, PackageDetail> = {
  "bali-beach-culture": {
    slug: "bali-beach-culture",
    tagline: "Eksplorasi keindahan pesona Pulau Dewata yang tak terlupakan.",
    summary:
      "Jelajahi surga tropis Bali dengan kombinasi wisata pantai, budaya, dan kesenian otentik. Cocok untuk perpisahan kelas atau study tour dengan pengalaman eksotis.",
    inclusions: [
      "Transportasi bus pariwisata SHD/HDD nyaman",
      "Tiket kapal penyeberangan PP",
      "Penginapan hotel setara Bintang 3 (1 kamar 2-4 orang)",
      "Makan prasmanan/box sesuai program tour",
      "Tiket masuk semua objek wisata",
      "Tour guide lokal berlisensi (HPI)",
      "Dokumentasi foto & video perjalanan",
      "P3K standar pariwisata",
      "Spanduk eksklusif nama angkatan/sekolah",
      "Gratis tol & parkir",
    ],
    exclusions: [
      "Pengeluaran pribadi di luar program",
      "Tiket wahana tambahan di lokasi wisata",
      "Tipping crew (bersifat sukarela)",
    ],
    note: "Harga dapat menyesuaikan jika terjadi perubahan rute penyeberangan atau hari libur nasional.",
  },
  "jogja-heritage-edu": {
    slug: "jogja-heritage-edu",
    tagline: "Serunya belajar sejarah dan budaya di jantung Kota Pelajar.",
    summary:
      "Paket terfavorit untuk sekolah! Kami memadukan wisata rekreasi dan nilai edukasi yang tinggi. Mengunjungi keraton, candi megah, hingga pusat kreativitas lokal.",
    inclusions: [
      "Transportasi bus pariwisata nyaman",
      "Penginapan hotel AC setara Bintang 2/3",
      "Makan sesuai program tour",
      "Tiket masuk semua objek wisata (termasuk Candi)",
      "Tour leader pendamping dari keberangkatan",
      "Dokumentasi",
      "P3K standar pariwisata",
      "Spanduk nama angkatan",
      "Gratis biaya tol & parkir",
    ],
    exclusions: [
      "Pengeluaran pribadi (oleh-oleh, laundry, dll)",
      "Opsional: Tiket naik ke atas Candi Borobudur",
    ],
    note: "Khusus untuk rombongan di atas 100 orang, kami sediakan gratis 1 sesi foto drone.",
  },
  "bromo-sunrise-adventure": {
    slug: "bromo-sunrise-adventure",
    tagline: "Kejar sunrise terindah dan taklukkan lautan pasir berbisik.",
    summary:
      "Perjalanan menantang menyambut matahari terbit dari Penanjakan Bromo. Dilengkapi dengan petualangan naik Jeep klasik yang pasti seru buat satu angkatan.",
    inclusions: [
      "Transportasi bus pariwisata (AC, Reclining Seat)",
      "Sewa mobil Jeep 4WD di kawasan Bromo (1 Jeep isi 5-6 orang)",
      "Makan 3x sehari sesuai program",
      "Tiket masuk Taman Nasional Bromo Tengger Semeru",
      "Tour leader pendamping",
      "Dokumentasi",
      "P3K standar pariwisata",
      "Spanduk nama angkatan/sekolah",
    ],
    exclusions: [
      "Sewa jaket tebal / sarung tangan di Bromo",
      "Sewa kuda di lautan pasir",
      "Pengeluaran pribadi",
    ],
    note: "Peserta diwajibkan membawa pakaian hangat yang memadai (jaket tebal, kupluk, sarung tangan) karena suhu malam di Bromo bisa mencapai 10 derajat celcius.",
  },
  "bandung-creative-nature": {
    slug: "bandung-creative-nature",
    tagline: "Menyatu dengan alam sejuk dan hiruk-pikuk kota kreatif.",
    summary:
      "Kombinasi pas antara udara pegunungan yang sejuk dengan gemerlap kreativitas Kota Kembang. Jelajah kawah vulkanik, hutan pinus, hingga pusat perbelanjaan trendi.",
    inclusions: [
      "Transportasi bus pariwisata eksekutif",
      "Penginapan hotel/villa di area Lembang/Ciwidey",
      "Makan sesuai program",
      "Tiket masuk lokasi wisata",
      "Tour guide lokal",
      "Dokumentasi",
      "P3K standar pariwisata",
      "Spanduk angkatan",
      "Biaya tol & parkir",
    ],
    exclusions: ["Pengeluaran pribadi", "Tiket masuk wahana permainan khusus"],
  },
  "dieng-culture-nature": {
    slug: "dieng-culture-nature",
    tagline: "Sambut pagi di negeri di atas awan yang magis.",
    summary:
      "Pilihan destinasi baru yang sedang hits. Nikmati telaga tiga warna, jejak candi Hindu tertua, dan sunrise dari Puncak Sikunir yang membuat takjub semua siswa.",
    inclusions: [
      "Transportasi bus / shuttle medium khusus area Dieng",
      "Penginapan Homestay nyaman khas Dieng",
      "Makan dengan menu lokal & hangat",
      "Tiket masuk semua wisata (Sikunir, Telaga Warna, Kawah Sikidang)",
      "Lokal guide HPI Dieng",
      "Dokumentasi",
      "P3K",
      "Spanduk angkatan",
    ],
    exclusions: ["Pengeluaran pribadi", "Biaya oleh-oleh carica khas Dieng"],
    note: "Mengingat medan pegunungan yang terjal, armada bus besar akan transit dan digantikan armada shuttle kecil demi keamanan bersama.",
  },
  "jakarta-edu-themepark": {
    slug: "jakarta-edu-themepark",
    tagline: "Belajar sambil bermain di ibu kota penuh kejutan.",
    summary:
      "Paket lengkap edukasi kebudayaan, IPTEK, sejarah, hingga rekreasi memacu adrenalin di taman hiburan terbesar di Indonesia. Cocok untuk siswa segala usia.",
    inclusions: [
      "Transportasi bus pariwisata",
      "Penginapan asrama haji / hotel setara bintang 2",
      "Makan sesuai program",
      "Tiket masuk Taman Mini / Monas / Museum",
      "Tiket terusan Dufan (Dunia Fantasi)",
      "Tour leader",
      "Dokumentasi",
      "P3K standar pariwisata",
      "Spanduk nama angkatan",
      "Gratis tol & parkir",
    ],
    exclusions: [
      "Tiket fast-track Dufan (jika berminat)",
      "Pengeluaran pribadi di luar program",
    ],
  },
};
