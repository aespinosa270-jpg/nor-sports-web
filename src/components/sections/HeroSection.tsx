"use client";

import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-nor-black">

            {/* IMAGEN DE FONDO */}
            <Image
                src="/assets/heroman.jpg"
                alt="NØR Campaign"
                fill
                className="object-cover object-center z-0"
                priority
                quality={100}
            />

            {/* OVERLAY SUTIL (Para que el texto blanco resalte sí o sí) */}
            <div className="absolute inset-0 bg-black/10 z-10" />

            {/* CONTENIDO ESTILO NIKE: Izquierda Abajo */}
            <div className="absolute bottom-20 left-6 md:left-12 z-20 max-w-2xl text-white">

                {/* Subtítulo pequeño */}
                <p className="font-bold text-sm md:text-base mb-2 uppercase tracking-wide">
                    NØR Tech Fleece
                </p>

                {/* TÍTULO MASIVO "HEAVY" */}
                <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-lg">
                    IMPULSO <br />
                    INFINITO
                </h1>

                {/* DESCRIPCIÓN CORTA */}
                <p className="font-medium text-base md:text-lg mb-8 max-w-md leading-snug drop-shadow-md">
                    Diseñado para el movimiento. Ingeniería térmica que se adapta a tu cuerpo en cada sprint.
                </p>

                {/* BOTONES "PILL" (REDONDEADOS) - CLAVE DEL ESTILO NIKE */}
                <div className="flex flex-wrap gap-4">
                    <Link href="/shop/men">
                        <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-200 transition-colors active:scale-95">
                            Comprar Hombre
                        </button>
                    </Link>
                    <Link href="/shop/women">
                        <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-sm md:text-base hover:bg-white hover:text-black transition-all active:scale-95">
                            Comprar Mujer
                        </button>
                    </Link>
                </div>

            </div>

        </section>
    );
};