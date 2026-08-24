"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { GalleryItem } from "@/types/gallery";

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const isSingle = items.length <= 1;

  // Lock body scroll
  useEffect(() => {
    if (activeIndex !== null) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [activeIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {activeIndex !== null && activeItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
          {/* Backdrop Click Area */}
          <div
            className="absolute inset-0 z-0 cursor-zoom-out"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 text-white pointer-events-none">
            <span className="text-sm font-medium tracking-wide drop-shadow-md">
              {activeIndex + 1} dari {items.length}
            </span>
            <button
              onClick={onClose}
              className="pointer-events-auto rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Tutup lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Prev */}
          {!isSingle && (
            <div className="absolute left-4 top-1/2 z-20 -translate-y-1/2 hidden sm:block">
              <button
                onClick={onPrev}
                className="rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            </div>
          )}

          {/* Main Image Container */}
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.caption}
          >
            <motion.div
              drag={!isSingle ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                const swipePower = Math.abs(swipe) * velocity.x;
                if (swipe < -50 || swipePower < -500) {
                  onNext();
                } else if (swipe > 50 || swipePower > 500) {
                  onPrev();
                }
              }}
              className="pointer-events-auto cursor-grab active:cursor-grabbing w-full flex justify-center"
            >
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="max-h-[75vh] w-auto max-w-full rounded-md object-contain shadow-2xl select-none"
                draggable="false"
              />
            </motion.div>

            {/* Caption */}
            <div className="mt-6 text-center text-white pointer-events-none max-w-3xl drop-shadow-lg">
              <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                {activeItem.caption}
              </p>
            </div>
          </motion.div>

          {/* Nav Next */}
          {!isSingle && (
            <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2 hidden sm:block">
              <button
                onClick={onNext}
                className="rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
