"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { GALLERY_ITEMS } from "@/data/gallery";
import { GalleryLightbox } from "@/components/features/GalleryLightbox";
import type { GalleryCategory } from "@/types/gallery";

const CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "sekolah", label: "Sekolah" },
  { value: "alam", label: "Alam" },
  { value: "transportasi", label: "Transportasi" },
  { value: "budaya", label: "Budaya" },
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "semua") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };
  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <Section
      id="galeri"
      heading="Momen Seru Bareng Wara Wiri"
      description="Lihat keseruan trip sekolah sebelumnya. Siapa tahu angkatanmu berikutnya ada di sini!"
      align="center"
      className="bg-gray-50 dark:bg-dark-900/60"
    >
      <div className="mx-auto max-w-7xl">
        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = cat.value === activeCategory;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setLightboxIndex(null); // Reset lightbox state on filter change
                }}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                  isActive
                    ? "text-white"
                    : "bg-white text-gray-600 shadow-sm hover:bg-gray-100 dark:bg-dark-800 dark:text-gray-300 dark:hover:bg-dark-700"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="galleryTab"
                    className="absolute inset-0 rounded-full bg-primary-600"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry Layout */}
        <motion.div
          layout
          className="columns-2 gap-4 sm:columns-3 lg:columns-4 space-y-4"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="relative break-inside-avoid overflow-hidden rounded-xl bg-gray-200 dark:bg-dark-800"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group relative block w-full focus:outline-none focus:ring-4 focus:ring-primary-500"
                  aria-label={`Lihat foto: ${item.caption}`}
                >
                  <div
                    className={cn(
                      "w-full",
                      item.aspect === "square" && "aspect-square",
                      item.aspect === "portrait" && "aspect-[3/4]",
                      item.aspect === "landscape" && "aspect-[4/3]"
                    )}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="mb-2 self-start rounded-md bg-primary-600/90 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {CATEGORIES.find((c) => c.value === item.category)?.label}
                    </span>
                    <p className="text-left text-sm font-medium text-white line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Area */}
        <div className="mt-20 text-center">
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Mau angkatanmu masuk galeri ini?
          </p>
          <Button intent="primary" size="lg" asChild>
            <a href="#estimator">Rencanakan Trip Sekarang</a>
          </Button>
        </div>
      </div>

      {/* Lightbox Component */}
      <GalleryLightbox
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </Section>
  );
}
