"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FAQS } from "@/data/faqs";
import { ADMIN_WA_NUMBER } from "@/lib/pricing";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const waMessage = encodeURIComponent(
    "Halo Admin Wara Wiri! Saya ingin bertanya tentang paket wisata sekolah."
  );
  const waLink = `https://wa.me/${ADMIN_WA_NUMBER}?text=${waMessage}`;

  return (
    <Section
      id="faq"
      heading="Pertanyaan yang Sering Diajukan"
      description="Masih ragu? Cek jawaban dari pertanyaan yang paling sering ditanyakan sekolah."
      align="center"
      className="bg-white dark:bg-dark-900"
    >
      <div className="max-w-3xl mx-auto mt-8">
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id} 
                className={`border rounded-2xl transition-colors duration-200 overflow-hidden ${
                  isOpen 
                    ? "border-primary-200 bg-primary-50 dark:border-primary-900/50 dark:bg-primary-900/10 shadow-sm" 
                    : "border-gray-200 bg-white dark:border-gray-800 dark:bg-dark-800 hover:border-primary-200 dark:hover:border-primary-800"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className={`text-base sm:text-lg font-bold pr-4 transition-colors ${
                    isOpen ? "text-primary-700 dark:text-primary-400" : "text-dark-800 dark:text-light-100"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    isOpen ? "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400" : "bg-gray-100 text-gray-500 dark:bg-dark-700 dark:text-gray-400"
                  }`}>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                    />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        {/* CTA */}
        <div className="mt-12 text-center p-8 bg-gray-50 dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-gray-700">
          <h4 className="text-xl font-bold text-dark-800 dark:text-light-100 mb-2">Masih ada pertanyaan?</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Jangan ragu, tim kami siap membantu menjawab semua keraguanmu.</p>
          <Button intent="outline" size="lg" asChild>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Tanya Admin via WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
