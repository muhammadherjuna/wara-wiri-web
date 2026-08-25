"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { ADMIN_WA_NUMBER } from "@/lib/pricing";

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const message = encodeURIComponent(
    "Halo Admin Wara Wiri! Saya ingin bertanya tentang trip sekolah."
  );
  const waLink = `https://wa.me/${ADMIN_WA_NUMBER}?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
      className="relative flex items-center justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg pointer-events-none"
          >
            Chat Admin Sekarang
            {/* Tooltip Triangle */}
            <div className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rotate-45 bg-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Admin via WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#128C7E] active:scale-95"
      >
        {/* Pulse Ring */}
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none duration-1000" />
        <MessageCircle className="h-7 w-7" />
      </a>
    </motion.div>
  );
}
