export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  school: string;
  role: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Busnya sangat nyaman, AC dingin, dan tepat waktu. Seluruh siswa angkatan kami merasa puas dengan pelayanan Wara Wiri. Itinerary-nya juga pas banget buat anak sekolah!",
    name: "Rizky Firmansyah",
    school: "SMA Negeri 1 Kebumen",
    role: "Ketua OSIS",
    rating: 5,
  },
  {
    id: "t2",
    quote: "Awalnya bingung cari travel yang aman buat bawa ratusan anak. Wara Wiri sangat komunikatif dan ngasih harga yang masuk akal banget untuk budget sekolah. Recommended!",
    name: "Ibu Anisa S.Pd",
    school: "SMK Negeri 2 Kebumen",
    role: "Guru Pendamping",
    rating: 5,
  },
  {
    id: "t3",
    quote: "Tour guide-nya asik-asik parah! Ramah banget sama anak-anak, pinter cairin suasana pas di bus, dan informatif pas jelasin sejarah di Candi Prambanan.",
    name: "Dinda Aulia",
    school: "SMA Negeri 1 Sruweng",
    role: "Wakil Ketua OSIS",
    rating: 5,
  },
  {
    id: "t4",
    quote: "Udah dua tahun berturut-turut pakai Wara Wiri buat acara sekolah. Mulai dari dokumentasi, makan, sampai penginapan semuanya dapet bintang lima. Keren banget pokoknya!",
    name: "Bagas Pratama",
    school: "SMK Muhammadiyah Kebumen",
    role: "Panitia Class Meeting",
    rating: 4.8,
  },
  {
    id: "t5",
    quote: "Sebagai ketua kelas, awalnya deg-degan ngurus study tour. Untungnya dibantu dari A sampai Z sama tim Wara Wiri. Perjalanan aman, seru, dan teratur banget.",
    name: "Fajar Nugroho",
    school: "SMP Negeri 1 Kebumen",
    role: "Ketua Kelas",
    rating: 5,
  },
  {
    id: "t6",
    quote: "Kenangan study tour ke Bali pakai Wara Wiri beneran membekas. Fasilitas lengkap, dokumentasinya bagus, dan adminnya super responsif kalau ditanya-tanya.",
    name: "Siti Rahma",
    school: "MA Negeri Kebumen",
    role: "Alumni Study Tour",
    rating: 4.9,
  },
];
