"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";

export default function Home() {
  return (
    // El fondo blanco ya viene del globals.css
    <main className="min-h-screen w-full">

      {/* SECCIÓN 1: HERO VANGUARDISTA */}
      <HeroSection />

      {/* SECCIÓN 2: CATÁLOGO LIMPIO */}
      <ProductShowcase />

      {/* FOOTER SIMPLE BLANCO */}
      <footer className="py-16 bg-white border-t border-gray-100 text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-2xl font-bold mb-4">NØR</h2>
          <div className="font-mono text-xs text-gray-500 space-y-2 uppercase tracking-wider">
            <p>High-Vanguard Sportswear</p>
            <p>Diseñado en CDMX © 2025</p>
          </div>
        </div>
      </footer>

    </main>
  );
}