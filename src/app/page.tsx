import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Footer } from "@/components/layout/Footer";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-black selection:bg-red-600 selection:text-white overflow-x-hidden">

      <HeroSection />

      <div className="bg-black py-5 border-y-4 border-red-600 relative z-20">
        <Marquee
          text="TECNOLOGÍA DRY-FIT // CALIDAD GOLD // READY OR NOT? // "
          duration="35s"
          className="text-white font-syncopate font-bold text-2xl md:text-4xl tracking-widest"
        />
      </div>

      <section className="border-b border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">

          <div className="lg:col-span-8 p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-center relative overflow-hidden">
            <span className="absolute -left-10 top-20 text-[20vw] opacity-[0.02] font-black select-none pointer-events-none">
              NØR
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-red-600"></div>
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
                  GOLD SERIES V.01
                </span>
              </div>

              <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] uppercase tracking-tighter text-black">
                ENTRENA <br />
                <span className="text-transparent text-stroke-black hover:text-black transition-colors duration-700">
                  LIGERO.
                </span>
                <br />
                <span className="text-red-600">MANTENTE SECO.</span>
              </h2>
            </div>
          </div>

          <div className="lg:col-span-4 bg-gray-50 flex flex-col">

            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center border-b border-gray-200">
              <span className="font-mono text-[10px] font-bold uppercase bg-black text-white inline-block px-2 py-1 w-fit tracking-widest mb-6">
                // SPEC_SHEET
              </span>

              <p className="font-mono text-xs md:text-sm text-gray-600 leading-8 uppercase tracking-wide text-justify">
                <span className="text-red-600 font-bold mr-2">///</span>
                Diseñamos esta prenda pensando en tu comodidad.
                Gracias a su <span className="text-black font-bold border-b border-red-600">tecnología Dry-Fit</span>,
                te mantienes fresco sin importar cuánto subas la intensidad.
                Perfecta para quienes buscan calidad sin complicaciones.
              </p>
            </div>

            <div className="p-8 md:p-12 bg-white flex flex-col justify-center items-start gap-6">
              <div className="w-full h-px bg-black/10 mb-2"></div>
              <Link
                href="/shop"
                className="w-full group relative h-16 bg-black flex items-center justify-between px-6 overflow-hidden"
              >
                <span className="relative z-10 font-syncopate text-sm font-bold uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors duration-300">
                  VER COLECCIÓN
                </span>

                <div className="absolute inset-0 bg-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>

                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
                  →
                </span>
              </Link>
              <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest text-center w-full">
                Limited Stock Available
              </p>
            </div>
          </div>

        </div>
      </section>

      <div className="relative w-full h-[70vh] border-b border-black overflow-hidden group bg-black">
        <Image
          src="/assets/NOR2.png"
          alt="NØR Campaign Visual"
          fill
          className="object-cover object-center grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
          priority
        />


        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-white bg-red-600 px-2 py-1 font-bold uppercase tracking-widest">
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
            <span className="hidden md:block font-display text-8xl text-white/10 font-black tracking-tighter">
              NØR
            </span>
          </div>
        </div>
      </div>

      <ProductShowcase />

      <Footer />

    </main>
  );
}