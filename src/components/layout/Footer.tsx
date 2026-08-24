import React from "react";
import Link from "next/link";
import { Compass, MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const destinasiLinks = [
  { label: "Bali",    href: "/destinasi/bali" },
  { label: "Jogja",   href: "/destinasi/jogja" },
  { label: "Bromo",   href: "/destinasi/bromo" },
  { label: "Bandung", href: "/destinasi/bandung" },
];

const perusahaanLinks = [
  { label: "Tentang Kami",         href: "/tentang" },
  { label: "Syarat & Ketentuan",   href: "/syarat-ketentuan" },
  { label: "Kebijakan Privasi",    href: "/kebijakan-privasi" },
  { label: "FAQ",                  href: "/faq" },
];

const kontakInfo = [
  {
    icon: MapPin,
    text: "Jl. Pahlawan No. 12, Kebumen,\nJawa Tengah 54311",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    text: "+62 812-3456-7890",
    href: "tel:+628123456789",
  },
  {
    icon: Mail,
    text: "halo@warawiri.id",
    href: "mailto:halo@warawiri.id",
  },
];

// ─── Social brand icons (not in lucide-react v1.33+) ─────────────────────────

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.18 8.18 0 0 0 4.78 1.52V6.77a4.84 4.84 0 0 1-1.01-.08z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// ─── Footer Column ────────────────────────────────────────────────────────────

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-light-300">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "block text-sm text-gray-400",
        "hover:text-primary-400",
        "transition-colors duration-200",
        "py-0.5"
      )}
    >
      {children}
    </Link>
  );
}

// ─── Social Icon Button ───────────────────────────────────────────────────────

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl",
        "bg-dark-700 text-gray-400",
        "hover:bg-primary-600 hover:text-white",
        "transition-all duration-200"
      )}
    >
      {children}
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-light-100" aria-label="Site footer">
      <Container>
        <div className="pt-16 pb-4">

          {/* ── 4-Column Grid ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* Col 1 — Brand ──────────────────────────────────────────────── */}
            <div className="space-y-5">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
                  <Compass className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-white">Wara Wiri</span>
              </Link>
              <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                Trip Sekolah Nggak Pakai Ribet. Kami menghadirkan pengalaman
                wisata edukatif yang berkesan untuk pelajar Indonesia.
              </p>
              <div className="flex items-center gap-2">
                <SocialButton href="https://instagram.com" label="Instagram Wara Wiri">
                  <InstagramIcon className="h-4 w-4" />
                </SocialButton>
                <SocialButton href="https://tiktok.com" label="TikTok Wara Wiri">
                  <TikTokIcon className="h-4 w-4" />
                </SocialButton>
                <SocialButton href="https://facebook.com" label="Facebook Wara Wiri">
                  <FacebookIcon className="h-4 w-4" />
                </SocialButton>
              </div>
            </div>

            {/* Col 2 — Destinasi ───────────────────────────────────────────── */}
            <div>
              <FooterHeading>Destinasi Populer</FooterHeading>
              <nav className="space-y-2" aria-label="Destinasi populer">
                {destinasiLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </nav>
            </div>

            {/* Col 3 — Perusahaan ──────────────────────────────────────────── */}
            <div>
              <FooterHeading>Perusahaan</FooterHeading>
              <nav className="space-y-2" aria-label="Tautan perusahaan">
                {perusahaanLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </nav>
            </div>

            {/* Col 4 — Kontak ──────────────────────────────────────────────── */}
            <div>
              <FooterHeading>Kontak</FooterHeading>
              <ul className="space-y-4">
                {kontakInfo.map(({ icon: Icon, text, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "flex items-start gap-3",
                        "text-sm text-gray-400",
                        "hover:text-primary-400",
                        "transition-colors duration-200 group"
                      )}
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary-500 group-hover:text-primary-400" />
                      <span className="whitespace-pre-line">{text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Bottom Bar ────────────────────────────────────────────────── */}
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear}{" "}
              <span className="text-gray-400 font-medium">Wara Wiri</span>. All
              rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Platform wisata edukasi terpercaya untuk pelajar Indonesia
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
