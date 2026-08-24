import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PopularPackages } from "@/components/sections/PopularPackages";
import { WhyUs } from "@/components/sections/WhyUs";

export const metadata: Metadata = {
  title: "Wara Wiri — Trip Sekolah Nggak Pakai Ribet",
  description:
    "Paket wisata aman, nyaman, dan terjangkau untuk SD/SMP/SMA se-Kebumen. Spesialis study tour & wisata sekolah. Anti ribet, pasti seru!",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularPackages />
      <WhyUs />

      {/* ── Estimasi Harga placeholder (Task 7) ─────────────────────────── */}
      <section id="estimator" className="py-24 bg-light-100 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm font-mono">
            [ Estimasi Harga — coming soon ]
          </p>
        </div>
      </section>
    </>
  );
}
