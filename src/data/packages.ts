// ─── Types ────────────────────────────────────────────────────────────────────

export interface Package {
  id: number;
  slug: string;
  title: string;
  destination: string;
  province: string;
  duration: string;       // e.g. "4D3N"
  price: number;          // discounted price per siswa (IDR)
  originalPrice: number;  // original price per siswa (IDR)
  highlights: string[];
  imageUrl: string;
  badge?: "Terlaris" | "Promo" | "Baru" | "Terfavorit";
  rating: number;         // 0–5
  reviewCount: number;
  minPeserta: number;     // minimum participants
  category: "pantai" | "budaya" | "alam" | "edukasi" | "taman-hiburan";
}

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Format angka ke format Rupiah ringkas, e.g. 850000 → "850rb" */
export function formatPrice(amount: number): string {
  if (amount >= 1_000_000) {
    const juta = amount / 1_000_000;
    return `${juta % 1 === 0 ? juta : juta.toFixed(1)}jt`;
  }
  return `${(amount / 1_000).toFixed(0)}rb`;
}

/** Format angka ke Rupiah penuh, e.g. 850000 → "Rp850.000" */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const packages: Package[] = [
  {
    id: 1,
    slug: "bali-beach-culture",
    title: "Bali: Pantai & Budaya",
    destination: "Bali",
    province: "Bali",
    duration: "4D3N",
    price: 1_250_000,
    originalPrice: 1_750_000,
    highlights: ["Tanah Lot", "Kuta Beach", "Ubud Art Market", "Barong Dance"],
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop",
    badge: "Terlaris",
    rating: 4.9,
    reviewCount: 312,
    minPeserta: 40,
    category: "pantai",
  },
  {
    id: 2,
    slug: "jogja-heritage-edu",
    title: "Jogja: Heritage & Edukasi",
    destination: "Yogyakarta",
    province: "DI Yogyakarta",
    duration: "3D2N",
    price: 850_000,
    originalPrice: 1_150_000,
    highlights: ["Candi Borobudur", "Prambanan", "Museum Sains", "Malioboro"],
    imageUrl:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80&auto=format&fit=crop",
    badge: "Terfavorit",
    rating: 4.8,
    reviewCount: 289,
    minPeserta: 35,
    category: "budaya",
  },
  {
    id: 3,
    slug: "bromo-sunrise-adventure",
    title: "Bromo: Sunrise Adventure",
    destination: "Bromo, Jawa Timur",
    province: "Jawa Timur",
    duration: "2D1N",
    price: 650_000,
    originalPrice: 900_000,
    highlights: ["Sunrise Penanjakan", "Lautan Pasir", "Kawah Bromo", "Jeep Tour"],
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
    badge: "Promo",
    rating: 4.7,
    reviewCount: 178,
    minPeserta: 30,
    category: "alam",
  },
  {
    id: 4,
    slug: "bandung-creative-nature",
    title: "Bandung: Kreatif & Alam",
    destination: "Bandung",
    province: "Jawa Barat",
    duration: "3D2N",
    price: 780_000,
    originalPrice: 1_050_000,
    highlights: ["Kawah Putih", "Tangkuban Perahu", "Dusun Bambu", "Factory Outlet"],
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
    badge: undefined,
    rating: 4.6,
    reviewCount: 145,
    minPeserta: 35,
    category: "alam",
  },
  {
    id: 5,
    slug: "dieng-culture-nature",
    title: "Dieng: Budaya & Pegunungan",
    destination: "Dieng, Wonosobo",
    province: "Jawa Tengah",
    duration: "2D1N",
    price: 520_000,
    originalPrice: 720_000,
    highlights: ["Telaga Warna", "Candi Arjuna", "Sunrise Sikunir", "Bukit Prau"],
    imageUrl:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80&auto=format&fit=crop",
    badge: "Baru",
    rating: 4.8,
    reviewCount: 93,
    minPeserta: 25,
    category: "budaya",
  },
  {
    id: 6,
    slug: "jakarta-edu-themepark",
    title: "Jakarta: Edukasi & Seru",
    destination: "Jakarta",
    province: "DKI Jakarta",
    duration: "3D2N",
    price: 950_000,
    originalPrice: 1_300_000,
    highlights: ["Dufan / Ancol", "Museum IPTEK", "Kota Tua", "Monas"],
    imageUrl:
      "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80&auto=format&fit=crop",
    badge: undefined,
    rating: 4.5,
    reviewCount: 201,
    minPeserta: 40,
    category: "edukasi",
  },
];
