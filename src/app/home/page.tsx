import Image from "next/image";
import { HeroSection } from "@/components/sections/HeroSection";
import { DiferenciadoresBanner } from "@/components/sections/DiferenciadoresBanner";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { TechSection } from "@/components/sections/TechSection";
import { ZonaRoja } from "@/components/sections/ZonaRoja";
import { Footer } from "@/components/layout/Footer";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">

      <HeroSection />

      {/* Qué venden y por qué es distinto */}
      <DiferenciadoresBanner />

      {/* Producto arriba del scroll */}
      <ProductShowcase />

      {/* Marquee de velocidad */}
      <div className="bg-red-600 py-6 relative z-20 overflow-hidden">
        <Marquee
          text="IMPULSO /// INFINITO /// "
          duration="30s"
          className="text-black font-syncopate font-black text-2xl md:text-4xl tracking-widest italic -skew-x-[9deg]"
        />
        <div className="mt-2">
          <Marquee
            text="READY OR NOT? /// DRY-FIT /// "
            duration="38s"
            reverse
            className="text-transparent [-webkit-text-stroke:1px_#000] font-syncopate font-black text-2xl md:text-4xl tracking-widest italic -skew-x-[9deg]"
          />
        </div>
      </div>

      {/* Tecnología (reemplaza el bloque gris viejo) */}
      <TechSection />

      {/* Zona roja: ofertas */}
      <ZonaRoja />

      {/* Campaña */}
      <div className="relative w-full h-[70vh] border-b border-white/10 overflow-hidden group bg-black">
        <Image
          src="/assets/nor-2.0.png"
          alt="NØR Campaign Visual"
          fill
          className="object-cover object-center grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-black bg-red-600 px-2 py-1 font-bold uppercase tracking-widest">
              CAMPAIGN 2026
            </span>
            <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest">
              LAT: 19.4326° N
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              <p className="text-white font-mono text-[10px] uppercase tracking-widest font-bold drop-shadow-md">
                SYSTEM ACTIVE
              </p>
            </div>
            <span className="hidden md:block font-display text-8xl text-white/10 font-black tracking-tighter italic -skew-x-[9deg]">
              NØR
            </span>
          </div>
        </div>
      </div>

      <Footer />

    </main>
  );
}
