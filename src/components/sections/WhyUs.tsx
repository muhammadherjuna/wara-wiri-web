"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bus, ShieldCheck, Wallet, Users, Award, Camera } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ValueProp {
  icon: React.ElementType;
  title: string;
  description: string;
  accent: string; // Tailwind color token for the icon circle
}

const valueProps: ValueProp[] = [
  {
    icon: Bus,
    title: "Armada Bus Terpercaya",
    description:
      "Bus SHD & Executive AC, selalu diservis sebelum trip. Anti mogok di jalan!",
    accent: "primary",
  },
  {
    icon: ShieldCheck,
    title: "Asuransi Perjalanan",
    description:
      "Setiap peserta terlindungi asuransi jiwa & kesehatan selama trip.",
    accent: "success",
  },
  {
    icon: Wallet,
    title: "Harga Transparan",
    description:
      "Tanpa biaya tersembunyi. DP ringan 30%, bisa dicicil per kelas.",
    accent: "accent",
  },
  {
    icon: Users,
    title: "Tour Guide Berpengalaman",
    description:
      "Guide ramah & profesional, siap dampingi 24/7 selama perjalanan.",
    accent: "secondary",
  },
  {
    icon: Award,
    title: "10+ Tahun Pengalaman",
    description:
      "Telah dipercaya 500+ sekolah se-Kabupaten Kebumen dan sekitarnya.",
    accent: "primary",
  },
  {
    icon: Camera,
    title: "Dokumentasi Gratis",
    description:
      "Foto & video keseruan trip untuk kenang-kenangan angkatan.",
    accent: "secondary",
  },
];

// ─── Accent color maps ────────────────────────────────────────────────────────

const accentBg: Record<string, string> = {
  primary:   "bg-primary-50   dark:bg-primary-900/20",
  secondary: "bg-secondary-50 dark:bg-secondary-900/20",
  accent:    "bg-accent-50    dark:bg-accent-900/20",
  success:   "bg-emerald-50   dark:bg-emerald-900/20",
};

const accentText: Record<string, string> = {
  primary:   "text-primary-600   dark:text-primary-400",
  secondary: "text-secondary-500 dark:text-secondary-400",
  accent:    "text-accent-500    dark:text-amber-400",
  success:   "text-emerald-600   dark:text-emerald-400",
};

const accentRing: Record<string, string> = {
  primary:   "group-hover:ring-primary-200   dark:group-hover:ring-primary-800",
  secondary: "group-hover:ring-secondary-200 dark:group-hover:ring-secondary-800",
  accent:    "group-hover:ring-accent-200    dark:group-hover:ring-amber-800",
  success:   "group-hover:ring-emerald-200   dark:group-hover:ring-emerald-800",
};

// ─── Card ─────────────────────────────────────────────────────────────────────

interface FeatureCardProps {
  item: ValueProp;
  index: number;
  isInView: boolean;
}

function FeatureCard({ item, index, isInView }: FeatureCardProps) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className={cn(
          "group relative flex flex-col gap-4 rounded-2xl p-6",
          "bg-white dark:bg-dark-800",
          "border border-gray-100 dark:border-dark-700",
          "shadow-sm hover:shadow-xl dark:hover:shadow-dark-900/50",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1",
        )}
      >
        {/* Subtle top accent line on hover */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-0.5 rounded-t-2xl",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            item.accent === "primary"   && "bg-gradient-to-r from-primary-400 to-primary-600",
            item.accent === "secondary" && "bg-gradient-to-r from-secondary-400 to-secondary-600",
            item.accent === "accent"    && "bg-gradient-to-r from-accent-300 to-accent-500",
            item.accent === "success"   && "bg-gradient-to-r from-emerald-400 to-emerald-600",
          )}
        />

        {/* Icon circle */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            "ring-2 ring-transparent transition-all duration-300",
            accentBg[item.accent],
            accentRing[item.accent],
          )}
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Icon
              className={cn(
                "h-6 w-6 transition-transform duration-300",
                accentText[item.accent],
              )}
              strokeWidth={1.75}
            />
          </motion.div>
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <h3 className="font-semibold text-dark-800 dark:text-light-100 leading-snug">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section
      id="why-us"
      heading="Kenapa Pilih Wara Wiri?"
      description="Bukan sekadar travel biasa. Kami paham kebutuhan sekolah dan siswa."
      align="center"
      className="bg-white dark:bg-dark-800"
    >
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {valueProps.map((item, index) => (
          <FeatureCard
            key={item.title}
            item={item}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Trust badge strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
      >
        {[
          { label: "500+ Sekolah", sub: "telah bergabung" },
          { label: "10.000+ Siswa", sub: "sudah ikut trip" },
          { label: "Sejak 2015", sub: "melayani dengan hati" },
          { label: "100% Aman", sub: "berizin resmi & insured" },
        ].map(({ label, sub }) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">
              {label}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {sub}
            </span>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
