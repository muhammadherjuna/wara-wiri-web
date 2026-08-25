export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Berapa minimal peserta untuk booking paket study tour?",
    answer: "Minimal peserta untuk bisa memesan paket rombongan adalah 30-40 siswa (tergantung destinasi dan kapasitas bus). Jika jumlah peserta kurang dari itu, silakan diskusikan dengan admin kami agar kami bisa memberikan opsi penyesuaian.",
  },
  {
    id: "faq-2",
    question: "Bagaimana sistem pembayaran dan DP-nya?",
    answer: "Pembayaran sangat fleksibel. Biasanya kami meminta Down Payment (DP) ringan sebesar 30% untuk mengamankan armada dan penginapan. Sisa pembayaran bisa dilunasi maksimal H-7 sebelum jadwal keberangkatan.",
  },
  {
    id: "faq-3",
    question: "Apakah harga masih bisa disesuaikan dengan budget sekolah?",
    answer: "Bisa banget! Kami paham bahwa setiap sekolah memiliki budget yang berbeda-beda. Kami akan bantu sesuaikan fasilitas (seperti tipe bus atau penginapan) agar tetap masuk dengan budget sekolahmu namun tetap nyaman dan aman.",
  },
  {
    id: "faq-4",
    question: "Apakah ada asuransi perjalanan untuk para siswa?",
    answer: "Tentu. Setiap peserta kami sarankan untuk terlindungi asuransi perjalanan pariwisata. Ini adalah bagian dari komitmen kami untuk memastikan keamanan dan kenyamanan pihak sekolah dari berangkat hingga pulang.",
  },
  {
    id: "faq-5",
    question: "Bagaimana jika ada siswa yang sakit di tengah perjalanan?",
    answer: "Tim Wara Wiri dan Tour Guide selalu dilengkapi dengan kotak P3K standar. Apabila terjadi kondisi yang membutuhkan penanganan medis serius, Tour Leader kami akan langsung mengarahkan dan membantu evakuasi ke fasilitas kesehatan atau rumah sakit terdekat.",
  },
  {
    id: "faq-6",
    question: "Bisa request destinasi atau itinerary custom?",
    answer: "Pasti bisa. Jika pihak sekolah memiliki tujuan wisata khusus, tempat kunjungan industri (KI), atau studi kampus yang tidak ada di paket reguler kami, beri tahu kami! Tim Wara Wiri akan membuatkan rute dan itinerary custom khusus untuk angkatanmu.",
  },
  {
    id: "faq-7",
    question: "Apa saja fasilitas yang biasanya sudah termasuk (include)?",
    answer: "Mayoritas paket kami sudah termasuk: Bus pariwisata AC yang nyaman, penginapan (hotel/homestay), makan prasmanan/box sesuai jadwal, tiket masuk wisata, tour guide berlisensi, dokumentasi kegiatan, spanduk rombongan, serta bebas biaya tol & parkir.",
  },
  {
    id: "faq-8",
    question: "Bagaimana kebijakan pembatalan atau reschedule?",
    answer: "Kami menyadari terkadang ada kendala tak terduga dari pihak sekolah. Reschedule (perubahan tanggal) bisa dilakukan tanpa biaya tambahan jika diinfokan maksimal H-30. Untuk pembatalan sepihak, DP tidak dapat dikembalikan namun bisa dialihkan untuk kegiatan di waktu mendatang.",
  },
];
