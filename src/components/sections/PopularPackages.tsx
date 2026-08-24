"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  CalendarDays,
  Star,
  Users,
  ArrowRight,
  Check,
  MapPin,
  Flame,
  TrendingUp,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { packages, formatRupiah, type Package } from "@/data/packages";

// ─── Badge config ─────────────────────────────────────────────────────────────

const badgeConfig: Record<
  NonNullable<Package["badge"]>,
  { variant: "default" | "success" | "warning" | "danger"; icon: React.ElementType }
> = {
  Terlaris:  { variant: "danger",  icon: Flame },
  Promo:     { variant: "warning", icon: TrendingUp },
  Baru:      { variant: "success", icon: Sparkles },
  Terfavorit:{ variant: "default", icon: BadgeCheck },
};

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              i < Math.floor(rating)
                ? "text-accent-400 fill-accent-400"
                : i < rating
                ? "text-accent-400 fill-accent-200"
                : "text-gray-200 fill-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-dark-700 dark:text-light-200">
        {rating}
      </span>
      <span className="text-xs text-gray-400">({count} ulasan)</span>
    </div>
  );
}

// ─── Package Card ─────────────────────────────────────────────────────────────

interface PackageCardProps {
  pkg: Package;
  index: number;
  isInView: boolean;
}

function PackageCard({ pkg, index, isInView }: PackageCardProps) {
  const discount = Math.round(
    ((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100
  );

  const badgeInfo = pkg.badge ? badgeConfig[pkg.badge] : null;
  const BadgeIcon = badgeInfo?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card hoverable className="h-full flex flex-col overflow-hidden group">
        {/* ── Image ──────────────────────────────────────────────────────── */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={pkg.imageUrl}
            alt={`Foto paket wisata ${pkg.destination}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            unoptimized
          />

          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 via-transparent to-transparent" />

          {/* Duration pill — bottom left */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-dark-900/70 backdrop-blur-sm px-3 py-1">
            <CalendarDays className="h-3.5 w-3.5 text-accent-300" />
            <span className="text-xs font-semibold text-white">{pkg.duration}</span>
          </div>

          {/* Discount pill — bottom right */}
          {discount > 0 && (
            <div className="absolute bottom-3 right-3 rounded-full bg-secondary-500 px-2.5 py-1">
              <span className="text-xs font-bold text-white">-{discount}%</span>
            </div>
          )}

          {/* Badge — top right */}
          {pkg.badge && badgeInfo && BadgeIcon && (
            <div className="absolute top-3 right-3">
              <Badge
                variant={badgeInfo.variant}
                className="flex items-center gap-1 shadow-md text-[10px] py-1 px-2.5"
              >
                <BadgeIcon className="h-3 w-3" />
                {pkg.badge}
              </Badge>
            </div>
          )}
        </div>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-tight">{pkg.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-1">
            <MapPin className="h-3.5 w-3.5 text-primary-500 shrink-0" />
            <span>{pkg.destination}</span>
          </div>
          <div className="mt-2">
            <StarRating rating={pkg.rating} count={pkg.reviewCount} />
          </div>
        </CardHeader>

        {/* ── Content ────────────────────────────────────────────────────── */}
        <CardContent className="flex-1 space-y-4">
          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5">
            {pkg.highlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1 rounded-lg bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1 text-xs font-medium text-primary-700 dark:text-primary-300"
              >
                <Check className="h-3 w-3 shrink-0" />
                {h}
              </span>
            ))}
          </div>

          {/* Min. peserta */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <Users className="h-3.5 w-3.5" />
            <span>Min. {pkg.minPeserta} peserta</span>
          </div>

          {/* Price */}
          <div className="pt-1 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-400 line-through">
              {formatRupiah(pkg.originalPrice)}
            </p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <p className="text-xl font-extrabold text-primary-600 dark:text-primary-400">
                {formatRupiah(pkg.price)}
              </p>
              <span className="text-xs text-gray-400 font-medium">/ siswa</span>
            </div>
          </div>
        </CardContent>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <CardFooter className="pt-3">
          <Button
            intent="primary"
            className="w-full group/btn"
            asChild
          >
            <Link href={`/destinasi/${pkg.slug}`}>
              Lihat Detail & Itinerary
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function PopularPackages() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section
      id="packages"
      heading="Paket Wisata Terpopuler"
      description="Destinasi favorit yang sering dipilih oleh OSIS dan sekolah se-Kabupaten Kebumen."
      align="center"
      className="bg-light-100 dark:bg-dark-900"
    >
      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
        className="flex justify-center mt-12"
      >
        <Button intent="outline" size="lg" asChild>
          <Link href="/destinasi">
            Lihat Semua Destinasi
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
