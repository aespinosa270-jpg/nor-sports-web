"use client";

// Importamos el NUEVO Hero y las otras secciones
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { TechSpecs } from "@/components/sections/TechSpecs";

export default function Home() {
  return (
    <main className="bg-black min-h-screen w-full overflow-x-hidden selection:bg-white selection:text-black">

      {/* SECCIÓN 1: EL NUEVO HERO ANIMADO */}
      <HeroSection />

      {/* SECCIÓN 2: CATÁLOGO DE ROPA */}
      <ProductShowcase />

      {/* SECCIÓN 3: ESPECIFICACIONES */}
      <TechSpecs />

      {/* FOOTER */}
      <footer className="py-12 bg-black border-t border-white/10 text-center relative z-10">
        <div className="font-mono text-[10px] text-gray-600 space-y-2">
          <p>DISEÑADO EN CIUDAD DE MÉXICO.</p>
          <p>NOR © 2025 // TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>

    </main>
  );
}