"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-play logic
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  // Helper to get initials
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <Section
      id="testimoni"
      heading="Kata Mereka tentang Wara Wiri"
      description="Pengalaman sekolah-sekolah yang sudah ikut trip bareng kami."
      align="center"
      className="bg-primary-50 dark:bg-primary-900/10 overflow-hidden relative"
    >
      <div 
        className="max-w-4xl mx-auto relative px-4 sm:px-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* Navigation Buttons (Desktop) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 hidden sm:block">
           <button 
             onClick={prevSlide}
             aria-label="Testimoni sebelumnya"
             className="w-10 h-10 rounded-full bg-white dark:bg-dark-800 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10 hidden sm:block">
           <button 
             onClick={nextSlide}
             aria-label="Testimoni selanjutnya"
             className="w-10 h-10 rounded-full bg-white dark:bg-dark-800 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
           >
             <ChevronRight className="w-6 h-6" />
           </button>
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[400px] sm:min-h-[350px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                const swipePower = Math.abs(swipe) * velocity.x;
                if (swipe < -50 || swipePower < -500) {
                  nextSlide();
                } else if (swipe > 50 || swipePower > 500) {
                  prevSlide();
                }
              }}
              className="w-full absolute cursor-grab active:cursor-grabbing"
            >
              <Card className="max-w-2xl mx-auto bg-white dark:bg-dark-800 shadow-xl border-none p-8 sm:p-12 relative rounded-3xl overflow-hidden">
                {/* Accent Background Line */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 to-primary-600" />
                
                <Quote className="w-12 h-12 text-primary-200 dark:text-primary-900/30 absolute top-8 right-8 rotate-180" />
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(activeTestimonial.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-700"}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-xl sm:text-2xl font-medium text-dark-800 dark:text-light-200 leading-relaxed mb-8">
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-lg shrink-0">
                      {getInitials(activeTestimonial.name)}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark-800 dark:text-light-100">{activeTestimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activeTestimonial.school}</p>
                    </div>
                    <div className="ml-auto hidden sm:block">
                      <Badge variant="default" className="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                        {activeTestimonial.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Lihat testimoni ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
              className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900 ${
                index === currentIndex 
                  ? "bg-primary-600 w-8" 
                  : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
