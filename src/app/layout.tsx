import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { siteConfig } from "@/lib/site";
import Script from "next/script";


// ─── Font ─────────────────────────────────────────────────────────────────────

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  // Include all weights used across the design system
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.name,
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  areaServed: "Kebumen, Jawa Tengah",
  telephone: `+${siteConfig.whatsappNumber}`,
  priceRange: "Rp",
  sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={plusJakartaSans.variable}
    >
      <body
        className={`
          min-h-screen flex flex-col
          font-sans antialiased
          bg-light-100 text-dark-800
          dark:bg-dark-900 dark:text-light-100
        `}
        suppressHydrationWarning
      >
        {/* FOUC prevention — runs synchronously before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('wara-wiri-theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t!=='light'&&d)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-primary-600 focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            Lewati ke konten utama
          </a>
          <Navbar />
          <main id="main-content" className="flex-grow">{children}</main>
          <Footer />
          <FloatingActions />
        </ThemeProvider>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
