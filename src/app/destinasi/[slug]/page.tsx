import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MinusCircle, MapPin, Star, Clock, ShieldCheck, MessageCircle } from "lucide-react";
import { packages, formatRupiah } from "@/data/packages";
import { packageDetails } from "@/data/package-details";
import { DESTINATION_ITINERARIES } from "@/data/itineraries";
import { ItineraryTimeline } from "@/components/features/ItineraryTimeline";
import { BUS_TYPES, ADMIN_WA_NUMBER } from "@/lib/pricing";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pkg = packages.find((p) => p.slug === params.slug);
  const detail = packageDetails[params.slug];

  if (!pkg) {
    return { title: "Paket Tidak Ditemukan — Wara Wiri" };
  }

  return {
    title: `${pkg.title} — Wara Wiri Kebumen`,
    description: detail?.summary || `Paket wisata ${pkg.title} durasi ${pkg.duration} bersama Wara Wiri.`,
  };
}

export default function DestinationDetailPage({ params }: PageProps) {
  const pkg = packages.find((p) => p.slug === params.slug);
  const detail = packageDetails[params.slug];

  if (!pkg || !detail) {
    notFound();
  }

  // Matching Itinerary logic
  let itinerary = DESTINATION_ITINERARIES.find((i) => i.slug === pkg.slug);
  if (!itinerary) {
    itinerary = DESTINATION_ITINERARIES.find(
      (i) => i.slug.toLowerCase() === pkg.destination.toLowerCase()
    );
  }

  // Related Packages (exclude current)
  const relatedPackages = packages
    .filter((p) => p.slug !== pkg.slug)
    .slice(0, 3);

  // WhatsApp Message
  const waMessage = encodeURIComponent(
    `Halo Admin Wara Wiri! Saya ingin bertanya tentang paket *${pkg.title}* durasi *${pkg.duration}* ke *${pkg.destination}*.`
  );
  const waLink = `https://wa.me/${ADMIN_WA_NUMBER}?text=${waMessage}`;

  return (
    <main className="pb-20">
      {/* ─── Breadcrumb ─── */}
      <div className="bg-gray-50 border-b border-gray-200 dark:bg-dark-900 dark:border-gray-800">
        <Container>
          <div className="flex items-center gap-2 py-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/#packages" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Destinasi
            </Link>
            <span>/</span>
            <span className="font-medium text-dark-800 dark:text-light-200 truncate">
              {pkg.title}
            </span>
          </div>
        </Container>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <Container className="relative z-10 w-full">
          <div className="max-w-2xl space-y-6 text-white">
            <div className="flex flex-wrap items-center gap-3">
              {pkg.badge && (
                <Badge variant="default" className="bg-primary-500 text-white border-none shadow-md">
                  {pkg.badge}
                </Badge>
              )}
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{pkg.rating}</span>
                <span className="text-gray-300">({pkg.reviewCount} ulasan)</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              {pkg.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 font-medium drop-shadow-md">
              {detail.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-gray-200">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>{pkg.destination}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <Clock className="w-5 h-5 text-primary-400" />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <ShieldCheck className="w-5 h-5 text-primary-400" />
                <span>Min {pkg.minPeserta} pax</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-end gap-4">
              <div>
                {pkg.originalPrice > pkg.price && (
                  <p className="text-gray-300 line-through text-sm">
                    {formatRupiah(pkg.originalPrice)}
                  </p>
                )}
                <p className="text-3xl sm:text-4xl font-bold text-white drop-shadow-md">
                  {formatRupiah(pkg.price)}
                  <span className="text-base font-normal text-gray-300">/siswa</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button intent="primary" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/#estimator">Hitung Estimasi Biaya</Link>
              </Button>
              <Button intent="outline" size="lg" className="w-full sm:w-auto bg-black/30 border-white/40 text-white hover:bg-white hover:text-black" asChild>
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Tanya Paket Ini
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Sekilas Paket ─── */}
      <Section className="bg-white dark:bg-dark-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-dark-800 dark:text-light-100 mb-4">Sekilas Paket</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {detail.summary}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(pkg.highlights.length > 0 ? pkg.highlights : detail.inclusions).map((hl, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
             <Card className="bg-primary-50 dark:bg-primary-900/20 border-none sticky top-24">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-800 dark:text-primary-300 mb-4">Kenapa Memilih Kami?</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                       <ShieldCheck className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                       <span className="text-sm text-gray-700 dark:text-gray-300">Resmi & Berizin Lengkap</span>
                    </li>
                    <li className="flex gap-3">
                       <Star className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                       <span className="text-sm text-gray-700 dark:text-gray-300">Review 4.8/5 dari Sekolah se-Kebumen</span>
                    </li>
                    <li className="flex gap-3">
                       <Clock className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                       <span className="text-sm text-gray-700 dark:text-gray-300">Anti Ribet, Semua Diurus Tuntas</span>
                    </li>
                  </ul>
                </div>
             </Card>
          </div>
        </div>
      </Section>

      {/* ─── Rencana Perjalanan ─── */}
      <Section className="bg-gray-50 dark:bg-dark-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-dark-800 dark:text-light-100">Rencana Perjalanan</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Contoh jadwal perjalanan yang akan dinikmati para siswa.</p>
          </div>

          {itinerary ? (
            <div className="bg-white dark:bg-dark-800 rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-700">
              <ItineraryTimeline days={itinerary.days} />
            </div>
          ) : (
            <Card className="text-center p-12 bg-white dark:bg-dark-800 shadow-sm">
              <div className="mx-auto w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-dark-800 dark:text-light-100 mb-2">Itinerary lengkap akan disiapkan</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                Setiap sekolah bisa punya kebutuhan berbeda. Hubungi admin untuk menyusun itinerary yang paling cocok untuk angkatanmu.
              </p>
            </Card>
          )}
        </div>
      </Section>

      {/* ─── Fasilitas Paket ─── */}
      <Section className="bg-white dark:bg-dark-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-800 dark:text-light-100 text-center mb-12">Fasilitas Paket</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-sm">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  Sudah Termasuk
                </h3>
                <ul className="space-y-4">
                  {detail.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {detail.exclusions && detail.exclusions.length > 0 && (
              <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 shadow-sm">
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-6 flex items-center gap-2">
                    <MinusCircle className="w-6 h-6" />
                    Belum Termasuk
                  </h3>
                  <ul className="space-y-4">
                    {detail.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}
          </div>
          {detail.note && (
             <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto">
               * Catatan: {detail.note}
             </p>
          )}
        </div>
      </Section>

      {/* ─── Estimasi Harga Berdasarkan Armada ─── */}
      <Section className="bg-gray-50 dark:bg-dark-900/50 border-t border-gray-100 dark:border-gray-800">
         <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-dark-800 dark:text-light-100 mb-4">Estimasi Harga Berdasarkan Armada</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10">
              Pilihan armada bus sangat memengaruhi kenyamanan dan estimasi harga per siswa.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {BUS_TYPES.map((bus) => {
                 const estimatedPrice = pkg.price * bus.multiplier;
                 return (
                   <Card key={bus.value} className="bg-white dark:bg-dark-800 shadow-sm hover:border-primary-300 transition-colors">
                     <div className="p-6">
                       <h4 className="font-bold text-lg text-dark-800 dark:text-light-100">{bus.label}</h4>
                       <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">{bus.sublabel}</p>
                       <p className="text-2xl font-bold text-dark-800 dark:text-light-100">
                         {formatRupiah(estimatedPrice)}
                       </p>
                       <p className="text-xs text-gray-500 mt-1">/siswa (estimasi)</p>
                     </div>
                   </Card>
                 );
              })}
            </div>
            <p className="mt-8 text-xs text-gray-500 max-w-2xl mx-auto">
              * Harga estimasi dapat berubah tergantung jumlah peserta (minimal {pkg.minPeserta} pax), tanggal keberangkatan, dan ketersediaan armada.
            </p>
         </div>
      </Section>

      {/* ─── Paket Lainnya ─── */}
      {relatedPackages.length > 0 && (
        <Section className="bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-dark-800 dark:text-light-100">Paket Lainnya</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Jelajahi opsi destinasi seru lainnya.</p>
              </div>
              <Button intent="outline" className="hidden sm:inline-flex" asChild>
                <Link href="/#packages">Lihat Semua</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPackages.map((rp) => (
                <Link href={`/destinasi/${rp.slug}`} key={rp.id} className="group flex flex-col rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 dark:bg-dark-800 dark:border-gray-800">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={rp.imageUrl} alt={rp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                       <h3 className="text-lg font-bold drop-shadow-md">{rp.title}</h3>
                       <p className="text-sm text-gray-200">{rp.duration}</p>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                     <div>
                       <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide">{rp.category}</p>
                       <p className="mt-2 font-bold text-dark-800 dark:text-light-100 text-xl">{formatRupiah(rp.price)}</p>
                     </div>
                     <span className="mt-4 text-sm font-medium text-primary-600 group-hover:text-primary-700">Lihat Detail →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ─── Final CTA ─── */}
      <section className="bg-primary-600 py-20 text-center px-4">
        <div className="max-w-2xl mx-auto text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Siap Wujudkan Trip Sekolahmu?</h2>
          <p className="text-primary-100 text-lg">
            Diskusikan destinasi, tanggal, dan budget bersama tim Wara Wiri. Kami bantu sampai berangkat!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100" asChild>
              <Link href="/#estimator">Hitung Estimasi Biaya</Link>
            </Button>
            <Button size="lg" className="bg-primary-700 text-white hover:bg-primary-800 border-none" asChild>
               <a href={waLink} target="_blank" rel="noopener noreferrer">
                 Hubungi Admin
               </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
