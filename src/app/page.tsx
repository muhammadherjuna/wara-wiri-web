import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Wara Wiri — Trip Sekolah Nggak Pakai Ribet",
  description:
    "Paket wisata aman, nyaman, dan terjangkau untuk SD/SMP/SMA se-Kebumen. Spesialis study tour & wisata sekolah. Anti ribet, pasti seru!",
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Placeholder sections (to be built next) ────────────────────── */}
      <section id="packages" className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm font-mono">
            [ Paket Wisata — coming soon ]
          </p>
        </div>
      </section>

      <section id="estimator" className="py-24 bg-light-100 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm font-mono">
            [ Estimasi Harga — coming soon ]
          </p>
        </div>
      </section>
    </>
  );
}
