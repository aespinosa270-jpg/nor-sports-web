"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Footer } from "@/components/layout/Footer"; // <--- Nuevo
import { Marquee } from "@/components/ui/Marquee";   // <--- Nuevo

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-black">

      {/* 1. HERO */}
      <HeroSection />

      {/* 2. TRANSICIÓN (Marquee) */}
      <Marquee text="SYSTEMS ONLINE // NEW ARRIVALS // SHIPPED FROM CDMX" />

      {/* 3. MANIFIESTO (Breve bloque editorial) */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <span className="font-mono text-xs text-gray-400 uppercase tracking-[0.2em] mb-4 block">
          The New Standard
        </span>
        <h2 className="font-body text-2xl md:text-3xl font-medium leading-snug">
          La intersección entre rendimiento técnico y estética brutalista.
          Diseñado para resistir el caos urbano.
        </h2>
      </section>

      {/* 4. CATÁLOGO */}
      <ProductShowcase />

      {/* 5. FOOTER COMPLETO */}
      <Footer />

    </main>
  );
}