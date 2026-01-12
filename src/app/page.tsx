import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Footer } from "@/components/layout/Footer";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-nor-white text-nor-black selection:bg-nor-black selection:text-white">

      <HeroSection />

      <Marquee text="SYSTEMS ONLINE // NEW ARRIVALS // SHIPPED FROM CDMX" />

      <section className="py-32 px-6 border-b border-nor-dark/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs text-nor-accent uppercase tracking-[0.2em] mb-6 block animate-pulse">
            [ The New Standard ]
          </span>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-medium leading-tight text-nor-black uppercase">
            La intersección entre <br className="hidden md:block" />
            <span className="bg-nor-black text-white px-2">rendimiento técnico</span> y
            estética brutalista.
          </h2>
          <p className="mt-8 font-mono text-xs text-nor-dark/50 max-w-lg mx-auto leading-relaxed">
            DISEÑADO PARA RESISTIR EL CAOS URBANO DE LA CIUDAD DE MÉXICO.
            MATERIALES DE GRADO MILITAR ADAPTADOS PARA EL MOVIMIENTO DIARIO.
          </p>
        </div>
      </section>

      <ProductShowcase />

      <Footer />

    </main>
  );
}