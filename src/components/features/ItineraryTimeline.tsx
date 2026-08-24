"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus,
  MapPin,
  Camera,
  Utensils,
  BedDouble,
  Ticket,
  Sunrise,
  ShoppingBag,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ItineraryDay, ItineraryActivity, ItineraryIconType } from "@/types/itinerary";

const iconMap: Record<ItineraryIconType, React.ElementType> = {
  bus: Bus,
  map: MapPin,
  camera: Camera,
  food: Utensils,
  hotel: BedDouble,
  ticket: Ticket,
  sunrise: Sunrise,
  shopping: ShoppingBag,
};

interface ItineraryTimelineProps {
  days: ItineraryDay[];
}

export function ItineraryTimeline({ days }: ItineraryTimelineProps) {
  const [selectedActivity, setSelectedActivity] = useState<ItineraryActivity | null>(null);

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <>
      <div className="w-full">
        {days.map((day, dayIndex) => (
          <div
            key={day.id}
            className={cn(
              "relative grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]",
              dayIndex > 0 && "mt-12 md:mt-16"
            )}
          >
            {/* Desktop Line Indicator (Hidden on mobile) */}
            <div className="absolute left-[100px] top-10 bottom-[-3rem] hidden w-0.5 bg-gray-200 dark:bg-gray-800 md:block" />

            {/* Left: Day Header */}
            <div className="relative z-10 flex flex-col items-start gap-2">
              <Badge variant="default" className="shadow-sm">
                {day.label}
              </Badge>
              <h3 className="text-xl font-bold text-dark-800 dark:text-light-100">
                {day.title}
              </h3>
            </div>

            {/* Right: Activity Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative z-10 flex flex-col gap-4"
            >
              {day.activities.map((activity) => {
                const Icon = iconMap[activity.icon] || MapPin;
                return (
                  <motion.div key={activity.id} variants={itemVariants}>
                    <button
                      onClick={() => setSelectedActivity(activity)}
                      className="group flex w-full flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-800 dark:bg-dark-800/80 dark:hover:border-primary-700 sm:flex-row sm:items-start"
                    >
                      {/* Time & Icon */}
                      <div className="flex shrink-0 items-center gap-3 sm:w-28 sm:flex-col sm:items-start sm:gap-2">
                        <Badge variant="default" className="bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                          {activity.time}
                        </Badge>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:group-hover:bg-primary-900/50">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-dark-800 transition-colors group-hover:text-primary-600 dark:text-light-100 dark:group-hover:text-primary-400">
                          {activity.title}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>

                      {/* Optional Image Thumbnail */}
                      {activity.imageUrl && (
                        <div className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg sm:block">
                          <img
                            src={activity.imageUrl}
                            alt={activity.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        title={selectedActivity?.title || ""}
        image={selectedActivity?.imageUrl}
      >
        {selectedActivity && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="default">{selectedActivity.time}</Badge>
            </div>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {selectedActivity.description}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
