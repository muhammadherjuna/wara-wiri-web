"use client";

import React from "react";
import { ScrollToTop } from "./ScrollToTop";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6 pointer-events-none">
      <div className="pointer-events-auto">
        <ScrollToTop />
      </div>
      <div className="pointer-events-auto">
        <FloatingWhatsApp />
      </div>
    </div>
  );
}
