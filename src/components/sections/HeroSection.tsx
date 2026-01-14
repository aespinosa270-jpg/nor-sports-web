"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black border-b-4 border-red-600">

            {/* --- 1. FONDO DE IMÁGENES --- */}
            <div className="hidden md:block absolute inset-0 z-0">
                <Image
                    src="/assets/K12.jpg"
                    alt="NØR Campaign Desktop"
                    fill
                    className="object-cover object-center opacity-90" // Reducimos ligeramente la opacidad para mejorar el contraste
                    priority
                    quality={95}
                />
            </div>

            <div className="block md:hidden absolute inset-0 z-0">
                <Image
                    src="/assets/B55.jpg"
                    alt="NØR Campaign Mobile"
                    fill
                    className="object-cover object-center opacity-90"
                    priority
                    quality={95}
                />
            </div>

            {/* --- 2. OVERLAYS TÉCNICOS --- */}
            {/* Oscurecimiento base más fuerte para legibilidad óptima */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Grid Decorativo sutil */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none"></div>

            {/* Degradado inferior para anclar el contenido */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

            {/* --- 3. CONTENIDO UI (GRID SYSTEM) --- */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 lg:p-16">

                {/* HEADER DEL HERO (Top) */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <span className="bg-red-600 text-white font-mono text-[10px] font-bold px-3 py-1 w-fit uppercase tracking-widest">
                            New Season / 2026
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="h-px w-6 bg-white/50"></div>
                            <span className="text-white/70 font-mono text-[10px] uppercase tracking-widest">
                                System: K-12
                            </span>
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="hidden md:flex items-center gap-3 border border-white/10 px-4 py-2 bg-black/30 backdrop-blur-md">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </div>
                        <span className="text-white font-mono text-[10px] uppercase tracking-widest font-bold">
                            SYSTEM ONLINE
                        </span>
                    </div>
                </div>

                {/* CONTENIDO PRINCIPAL (Bottom) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-end">

                    {/* TITULAR GIGANTE (Izquierda) - TEXTO SÓLIDO Y LEGIBLE */}
                    <div className="lg:col-span-7">
                        <h1 className="font-display font-black text-7xl md:text-8xl lg:text-[9.5rem] uppercase tracking-tighter leading-[0.8] text-white mb-4 drop-shadow-2xl">
                            IMPULSO
                            <br />
                            {/* Texto infinito ahora es sólido y rojo para máximo impacto */}
                            <span className="text-red-600">
                                INFINITO.
                            </span>
                        </h1>
                    </div>

                    {/* CTA & DETALLES (Derecha) */}
                    <div className="lg:col-span-5 flex flex-col gap-8 pb-2 lg:pl-12 lg:border-l border-white/20">
                        <p className="font-mono text-sm text-gray-200 leading-relaxed uppercase tracking-wide max-w-md">
                            <span className="text-red-600 font-bold mr-2">///</span>
                            Diseñado para el movimiento. Ingeniería térmica que se adapta a tu cuerpo en cada sprint.
                            <span className="block mt-2 text-white font-bold">READY OR NOT?</span>
                        </p>

                        <Link href="/shop" className="group relative w-full md:w-fit overflow-hidden bg-white/10 backdrop-blur-sm border border-white/30">
                            <div className="relative z-10 px-10 py-5 flex items-center justify-between gap-12 text-white transition-colors duration-300">
                                <span className="font-syncopate font-black text-base uppercase tracking-[0.15em]">
                                    EXPLORAR COLECCIÓN
                                </span>
                                <ArrowDownRight size={22} className="group-hover:rotate-45 transition-transform duration-300" />
                            </div>

                            {/* Hover Fill Animation (Rojo intenso) */}
                            <div className="absolute inset-0 bg-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        </Link>
                    </div>

                </div>
            </div>

        </section>
    );
};