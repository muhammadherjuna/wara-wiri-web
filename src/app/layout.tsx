import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";

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
  title: {
    default: "Wara Wiri — Trip Sekolah Nggak Pakai Ribet",
    template: "%s | Wara Wiri",
  },
  description:
    "Wara Wiri menghadirkan pengalaman wisata edukatif yang berkesan dan terpercaya untuk pelajar Indonesia. Pesan paket trip sekolah dengan mudah.",
  keywords: ["trip sekolah", "wisata edukatif", "study tour", "wara wiri", "paket wisata pelajar"],
  authors: [{ name: "Wara Wiri" }],
  creator: "Wara Wiri",
  metadataBase: new URL("https://warawiri.id"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://warawiri.id",
    siteName: "Wara Wiri",
    title: "Wara Wiri — Trip Sekolah Nggak Pakai Ribet",
    description:
      "Wara Wiri menghadirkan pengalaman wisata edukatif yang berkesan dan terpercaya untuk pelajar Indonesia.",
  },
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
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
