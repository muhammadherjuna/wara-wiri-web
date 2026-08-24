"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  animate,
  useMotionValue,
} from "framer-motion";
import {
  ChevronDown,
  Compass,
  GraduationCap,
  Plane,
  Wallet,
  MapPin,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// ─── Animation Variants ───────────────────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ─── Floating Decoration ──────────────────────────────────────────────────────

interface FloatingIconProps {
  icon: React.ElementType;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
}

function FloatingIcon({
  icon: Icon,
  className = "",
  delay = 0,
  amplitude = 12,
  duration = 4,
}: FloatingIconProps) {
  const y = useMotionValue(0);

  useEffect(() => {
    let controls: ReturnType<typeof animate>;
    const timeout = setTimeout(() => {
      const loop = () => {
        controls = animate(y, [0, -amplitude, 0], {
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          onComplete: loop,
        });
      };
      loop();
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      controls?.stop();
    };
  }, [y, amplitude, duration, delay]);

  return (
    <motion.div style={{ y }} className={className}>
      <Icon />
    </motion.div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

const stats = [
  { icon: GraduationCap, value: "500+", label: "Sekolah Dilayani" },
  { icon: MapPin,         value: "25+",  label: "Destinasi Wisata" },
  { icon: Star,           value: "4.9",  label: "Rating Kepuasan" },
  { icon: Plane,          value: "1K+",  label: "Trip Sukses" },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[100dvh] min-h-[680px] flex flex-col overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background Image w/ Parallax ─────────────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
        aria-hidden
      >
        <Image
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1920&q=85&auto=format&fit=crop"
          alt="Pelajar menikmati wisata"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
        />
      </motion.div>

      {/* ── Gradient Overlay ──────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900/90"
      />
      {/* Extra side vignette for depth */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-dark-900/30 via-transparent to-dark-900/30"
      />

      {/* ── Floating Decorative Icons ─────────────────────────────────────── */}
      <FloatingIcon
        icon={Compass}
        className="absolute left-[8%] top-[22%] text-primary-400/30 h-14 w-14 hidden lg:block"
        delay={0}
        amplitude={14}
        duration={4.5}
      />
      <FloatingIcon
        icon={Plane}
        className="absolute right-[10%] top-[28%] text-secondary-400/30 h-10 w-10 hidden lg:block rotate-45"
        delay={0.7}
        amplitude={10}
        duration={3.8}
      />
      <FloatingIcon
        icon={GraduationCap}
        className="absolute left-[15%] bottom-[28%] text-accent-400/25 h-12 w-12 hidden lg:block"
        delay={1.2}
        amplitude={8}
        duration={5.2}
      />
      <FloatingIcon
        icon={Star}
        className="absolute right-[14%] bottom-[35%] text-accent-300/20 h-8 w-8 hidden lg:block"
        delay={0.4}
        amplitude={12}
        duration={3.5}
      />
      <FloatingIcon
        icon={MapPin}
        className="absolute right-[22%] top-[18%] text-primary-300/20 h-7 w-7 hidden xl:block"
        delay={1.8}
        amplitude={9}
        duration={4.2}
      />

      {/* ── Hero Content ─────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Badge */}
          <motion.div variants={fadeIn} className="flex justify-center">
            <Badge
              className="
                bg-white/10 text-white border border-white/20
                backdrop-blur-sm px-4 py-1.5 text-xs normal-case tracking-normal
                font-medium rounded-full shadow-lg
              "
            >
              ✨ Spesialis Study Tour & Wisata Sekolah
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white text-balance"
          >
            Wujudkan Trip Impian Sekolahmu{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-r from-primary-400 via-accent-400 to-secondary-400 bg-clip-text text-transparent">
                Bersama Wara Wiri
              </span>
              {/* Glow effect behind gradient text */}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-2 h-4 bg-gradient-to-r from-primary-500/30 via-accent-500/30 to-secondary-500/30 blur-xl"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed"
          >
            Paket wisata aman, nyaman, dan terjangkau untuk SD/SMP/SMA
            se-Kebumen.{" "}
            <span className="text-accent-300 font-medium">
              Anti ribet, pasti seru!
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Button
              intent="primary"
              size="lg"
              className="
                shadow-xl shadow-primary-900/40
                bg-primary-500 hover:bg-primary-400
                text-base px-8
              "
              asChild
            >
              <Link href="#packages">Lihat Paket Wisata</Link>
            </Button>

            <Button
              intent="outline"
              size="lg"
              className="
                border-white/40 text-white
                hover:bg-white/10 hover:border-white/70
                backdrop-blur-sm
                text-base px-8
              "
              asChild
            >
              <Link href="#estimator">
                <Wallet className="h-5 w-5" />
                Cek Estimasi Harga
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* ── Stats Bar ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="
            absolute bottom-20 left-0 right-0
            flex justify-center px-4
          "
        >
          <div
            className="
              flex flex-wrap items-center justify-center gap-x-8 gap-y-4
              bg-white/10 backdrop-blur-md
              border border-white/15
              rounded-2xl px-8 py-4
              shadow-2xl shadow-dark-900/40
            "
          >
            {stats.map(({ icon: Icon, value, label }, i) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/20 border border-primary-400/30">
                    <Icon className="h-4 w-4 text-primary-300" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white leading-none">
                      {value}
                    </p>
                    <p className="text-xs text-white/60 leading-tight mt-0.5">
                      {label}
                    </p>
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden sm:block h-8 w-px bg-white/15" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        aria-hidden
      >
        <span className="text-xs text-white/40 uppercase tracking-widest font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-5 w-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
