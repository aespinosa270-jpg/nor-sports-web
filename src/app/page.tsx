import Image from "next/image";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Footer } from "@/components/layout/Footer";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-nor-white text-nor-black selection:bg-nor-black selection:text-white">

      <HeroSection />

      <Marquee
        text="TECNOLOGIA DRY-FIT CALIDAD GOLD // READY OR NOT?"
        duration="50s"
      />

      <section className="py-32 px-6 border-b border-nor-dark/10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-mono text-xs text-nor-accent uppercase tracking-[0.2em] mb-6 block animate-pulse">
            [ GOLD QUALITY SERIES ]
          </span>

          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-black leading-tight text-nor-black uppercase tracking-tight">
            ARQUITECTURA DE <br className="hidden md:block" />
            <span className="bg-nor-black text-white px-3 mx-1">ALTO RENDIMIENTO</span>
            Y TECNOLOGÍA DRY-FIT.
          </h2>

          <p className="mt-8 font-mono text-xs md:text-sm text-nor-dark/60 max-w-xl mx-auto leading-relaxed uppercase tracking-wide">
            Ingeniería textil diseñada para la élite. Gestión de humedad superior
            y ligereza absoluta para atletas que exigen perfección en cada movimiento.
          </p>
        </div>
      </section>

      <div className="relative w-full h-[50vh] md:h-[70vh] border-b border-nor-dark/10 overflow-hidden group">
        <Image
          src="/assets/NOR2.png"
          alt="NØR Campaign Visual"
          fill
          className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      <ProductShowcase />

      <Footer />

    </main>
  );
}