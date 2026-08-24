"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Compass } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// ─── Nav Links Data ───────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "Destinasi", href: "/destinasi" },
  { label: "Paket",     href: "/paket" },
  { label: "Galeri",    href: "/galeri" },
  { label: "Kontak",    href: "/kontak" },
];

// ─── Theme Toggle Button ──────────────────────────────────────────────────────

function ThemeToggle({ className }: { className?: string }) {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-xl",
        "text-dark-600 dark:text-light-300",
        "hover:bg-primary-50 dark:hover:bg-dark-700",
        "transition-colors duration-200",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {isDark ? (
            <Sun className="h-4.5 w-4.5 h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Desktop Nav Link ─────────────────────────────────────────────────────────

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative text-sm font-medium",
        "text-dark-600 dark:text-light-300",
        "hover:text-primary-600 dark:hover:text-primary-400",
        "transition-colors duration-200",
        "py-1"
      )}
    >
      {label}
      {/* Animated underline */}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full",
          "bg-primary-500",
          "transition-all duration-300 ease-out",
          "group-hover:w-full"
        )}
      />
    </Link>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const linkStaggerVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: "easeOut" as const },
  }),
};

function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-dark-900/50 backdrop-blur-sm"
            aria-hidden
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed right-0 top-0 z-50 h-full w-72",
              "bg-white dark:bg-dark-900",
              "border-l border-gray-100 dark:border-dark-700",
              "shadow-2xl flex flex-col",
            )}
            aria-label="Mobile navigation"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-dark-700">
              <span className="text-lg font-bold text-primary-600">
                Wara Wiri
              </span>
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  "text-dark-500 dark:text-light-400",
                  "hover:bg-gray-100 dark:hover:bg-dark-700",
                  "transition-colors duration-200"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkStaggerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center px-3 py-3 rounded-xl",
                      "text-base font-medium",
                      "text-dark-700 dark:text-light-200",
                      "hover:bg-primary-50 hover:text-primary-600",
                      "dark:hover:bg-dark-700 dark:hover:text-primary-400",
                      "transition-colors duration-200"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Drawer Footer */}
            <div className="px-6 py-5 border-t border-gray-100 dark:border-dark-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Tampilan
                </span>
                <ThemeToggle />
              </div>
              <Button intent="primary" className="w-full">
                Pesan Sekarang
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40",
          "glass border-b border-gray-100/80 dark:border-dark-700/80",
          "transition-shadow duration-300",
          isScrolled && "shadow-md shadow-dark-900/5 dark:shadow-dark-900/40"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-8">

            {/* ── Logo ───────────────────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-600 text-white"
              >
                <Compass className="h-4 w-4" />
              </motion.div>
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                Wara Wiri
              </span>
            </Link>

            {/* ── Desktop Nav ─────────────────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>

            {/* ── Desktop Right ────────────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Button intent="primary" size="sm">
                Pesan Sekarang
              </Button>
            </div>

            {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
            <motion.button
              className={cn(
                "flex md:hidden h-9 w-9 items-center justify-center rounded-xl",
                "text-dark-600 dark:text-light-300",
                "hover:bg-primary-50 dark:hover:bg-dark-700",
                "transition-colors duration-200"
              )}
              onClick={() => setDrawerOpen(true)}
              whileTap={{ scale: 0.9 }}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — rendered outside the header */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
