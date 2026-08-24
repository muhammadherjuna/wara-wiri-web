import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PopularPackages } from "@/components/sections/PopularPackages";
import { WhyUs } from "@/components/sections/WhyUs";
import { TripEstimator } from "@/components/features/TripEstimator";

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
      <TripEstimator />
    </>
  );
}
