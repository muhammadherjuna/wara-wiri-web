"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { DESTINATION_ITINERARIES } from "@/data/itineraries";
import { ItineraryTimeline } from "@/components/features/ItineraryTimeline";

export function ItineraryPreview() {
  const [activeSlug, setActiveSlug] = useState(DESTINATION_ITINERARIES[0].slug);

  const activeDestination =
    DESTINATION_ITINERARIES.find((d) => d.slug === activeSlug) ||
    DESTINATION_ITINERARIES[0];

  return (
    <Section
      id="itinerary"
      heading="Contoh Itinerary Trip"
      description="Biar kebayang serunya perjalanan bareng Wara Wiri. Pilih destinasi favorit kelasmu!"
      align="center"
      className="bg-white dark:bg-dark-900"
    >
      <div className="mx-auto max-w-4xl">
        {/* Tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {DESTINATION_ITINERARIES.map((dest) => {
            const isActive = dest.slug === activeSlug;
            return (
              <button
                key={dest.slug}
                onClick={() => setActiveSlug(dest.slug)}
                className={cn(
                  "relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900",
                  isActive
                    ? "text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-800 dark:text-gray-300 dark:hover:bg-dark-700"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-primary-600"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {dest.label}
                  {dest.badge && (
                    <span className="hidden rounded-full bg-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wider sm:inline-block">
                      {dest.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline Content */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mb-8 rounded-2xl bg-primary-50 px-6 py-4 text-center dark:bg-primary-900/20">
                <p className="text-sm font-medium text-primary-800 dark:text-primary-300">
                  Durasi Perjalanan: <span className="font-bold">{activeDestination.duration}</span>
                </p>
              </div>

              <ItineraryTimeline days={activeDestination.days} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Mau itinerary custom sesuai keinginan sekolahmu?
          </p>
          <Button intent="primary" size="lg" asChild>
            <a href="#estimator">Hitung Estimasi Biaya</a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
