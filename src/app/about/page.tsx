"use client";
import { Marquee } from "@/components/ui/Marquee";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20">

            {/* 1. MANIFIESTO GIGANTE */}
            <section className="px-6 md:px-12 max-w-[1800px] mx-auto mb-24">
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-8 block">
                    [ Mission_Statement_V1 ]
                </span>
                <h1 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.85]">
                    We Engineer<br />
                    <span className="text-gray-600">Chaos Resistance.</span>
                </h1>
            </section>

            {/* Tira de texto en movimiento */}
            <Marquee text="DISEÑADO EN CIUDAD DE MÉXICO // PROBADO EN EL INFIERNO URBANO" />

            {/* 2. TEXTO EDITORIAL */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-12 max-w-[1800px] mx-auto mt-24">
                <div>
                    <p className="font-mono text-sm text-gray-400 uppercase tracking-widest sticky top-32">
                        01 — Origen
                    </p>
                </div>
                <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-gray-300">
                    <p>
                        Nacido en el tráfico, el smog y la lluvia impredecible de la CDMX.
                        NØR no es ropa deportiva; es armadura técnica para el atleta urbano.
                    </p>
                    <p>
                        Creemos que el "gym" ya no existe. La ciudad entera es el campo de entrenamiento.
                        Desde correr en Reforma a las 6AM hasta esquivar autos en Insurgentes.
                        Necesitas equipo que aguante el ritmo.
                    </p>
                    <p className="text-white font-bold">
                        Rechazamos la moda rápida. Abrazamos la ingeniería brutalista.
                    </p>
                </div>
            </section>

            {/* 3. IMAGEN DE CIERRE (Placeholder) */}
            <div className="mt-24 w-full h-[50vh] bg-white flex items-center justify-center">
                <span className="text-black font-display text-9xl font-bold uppercase tracking-tighter opacity-20">
                    NØR
                </span>
            </div>

        </main>
    );
}