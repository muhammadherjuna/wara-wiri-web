# Wara Wiri

**Trip Sekolah Nggak Pakai Ribet**

Wara Wiri adalah travel agency spesialis *study tour*, *class meeting*, dan wisata sekolah untuk SD/SMP/SMA se-Kebumen dan sekitarnya. Proyek ini merupakan aplikasi web modern berbasis Next.js App Router yang dirancang untuk mengonversi kunjungan menjadi pemesanan dengan performa tinggi, desain elegan, dan antarmuka yang ramah pengguna.

## Mengapa Wara Wiri Dibuat? (Problem Statement)
Banyak sekolah dan panitia siswa kesulitan mencari travel agency yang terpercaya, transparan soal harga, dan memiliki itinerary edukatif yang sesuai dengan gaya anak muda. Website Wara Wiri hadir sebagai solusi digital untuk memberikan kemudahan eksplorasi paket, estimasi biaya instan, dan melihat *social proof* (ulasan/galeri) dalam satu tempat.

## Fitur Unggulan
- **Kalkulator Estimasi Biaya (Trip Estimator)**: Form interaktif untuk menghitung estimasi biaya berdasarkan destinasi, durasi, jumlah siswa, dan armada bus.
- **Rencana Perjalanan (Itinerary) Interaktif**: Timeline visual yang responsif.
- **Galeri Masonry & Lightbox**: Album kenangan dengan fitur usap (*swipe*) dan dukungan *keyboard*.
- **Halaman Destinasi Dinamis**: Halaman detail paket travel yang digenerate statis (SSG) dengan SEO maksimal.
- **Floating WhatsApp**: Tombol obrolan instan yang melayang di pojok kanan bawah.
- **Testimoni & FAQ**: Ulasan slider dan akordion tanya jawab.
- **Dark Mode**: Dukungan mode gelap elegan dengan *Tailwind CSS*.

## Tech Stack
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Font**: Plus Jakarta Sans

## Mulai Menjalankan Proyek (Getting Started)

Pastikan kamu memiliki Node.js terinstal.

```bash
# Instal dependensi
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya di browser.

### Script Lainnya
- `npm run build` : Membangun aplikasi untuk produksi.
- `npm run start` : Menjalankan aplikasi produksi.
- `npm run lint`  : Memeriksa kualitas kode (ESLint).

## Struktur Folder Utama
```
src/
├── app/                  # Routing Next.js (App Router)
│   ├── destinasi/[slug]/ # Halaman detail paket
│   ├── ui/               # Halaman pratinjau komponen UI
│   ├── globals.css       # Styling dasar dan utilitas global
│   ├── layout.tsx        # Root layout (Metadata, Header, Footer)
│   └── page.tsx          # Halaman beranda utama (Landing Page)
├── components/           # Komponen React
│   ├── features/         # Komponen kompleks spesifik (Estimator, Lightbox, Timeline)
│   ├── layout/           # Navbar, Footer, FloatingActions
│   ├── providers/        # Konteks React (ThemeProvider)
│   ├── sections/         # Potongan bagian besar (Hero, FAQ, Gallery, Testimonials)
│   └── ui/               # Komponen dasar/primitif (Button, Card, Section, dll)
├── data/                 # Data dummy/statis (Paket, Itinerary, Testimoni)
├── lib/                  # Utilitas (cn, helpers, configurasi site)
└── types/                # Definisi tipe TypeScript
```

## Sistem Desain
Proyek ini menggunakan palet warna khusus di `tailwind.config.ts`:
- **Primary**: Warna utama (Indigo/Blue) untuk branding kuat dan _call to action_.
- **Secondary**: Warna pendamping aksen.
- **Dark / Light**: Skema warna netral untuk teks dan _background_ (mendukung *dark mode* penuh).

## Overview Komponen UI (`/ui`)
Komponen primitif dirancang tanpa membawa *business logic*. Cek halaman `/ui` saat `dev` server menyala untuk melihat demonstrasi:
- **Button**: Lengkap dengan berbagai `intent` (primary, outline, ghost) dan *spinner* loading.
- **Card**: Komponen penampung berbasis kartu untuk memisahkan informasi.
- **Badge**: Label kecil dengan warna peringatan/sukses.
- **Container / Section**: Pembungkus _layouting_ responsif.
- **Skeleton**: Komponen _loading state_.

## Catatan Deployment
- **Platform Rekomendasi**: Vercel (sangat optimal untuk Next.js).
- **Pengaturan Akhir**:
  - Ganti *placeholder* nomor WhatsApp di `src/lib/site.ts` dan `src/lib/pricing.ts` menjadi nomor admin Wara Wiri sesungguhnya.
  - Perbarui *url* di `site.ts` setelah memiliki domain resmi.

## Roadmap & Rencana Pengembangan Masa Depan
1. **CMS & Real Backend**: Menghubungkan *packages* dengan Sanity, Strapi, atau Supabase.
2. **Admin Dashboard**: Portal pengelolaan data wisata.
3. **Database Pemesanan**: Menyimpan data _lead_ masuk sebelum menuju WhatsApp.
4. **Sistem Down Payment (DP)**: Integrasi *payment gateway* (Midtrans/Xendit) untuk DP langsung.
5. **Ulasan & Galeri Nyata**: Menarik foto dari Instagram Wara Wiri secara otomatis.

---

## Screenshots

*TODO: Tambahkan screenshot halaman utama, estimator, galeri, dan detail destinasi.*
