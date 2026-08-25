import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20">
      <Container className="text-center max-w-lg">
        <h1 className="text-5xl sm:text-7xl font-bold text-primary-600 mb-6">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-dark-800 dark:text-light-100 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Sepertinya kamu tersesat. Tenang, kita bisa balik ke halaman utama atau lihat paket wisata dulu.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button intent="primary" size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
          <Button intent="outline" size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/#packages">Lihat Paket Wisata</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
