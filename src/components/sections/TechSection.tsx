"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export const TechSection = () => {
    return (
        <section className="relative bg-black text-white border-b border-white/10 overflow-hidden">
            {/* NØR fantasma */}
            <span className="absolute -left-10 top-10 text-[22vw] opacity-[0.03] font-black select-none pointer-events-none italic -skew-x-[9deg] leading-none">
                NØR
            </span>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">

                <div className="lg:col-span-8 p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-12 bg-red-600"></div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">
                            DRY-FIT SYSTEM
                        </span>
                    </div>

                    <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] uppercase tracking-tighter">
                        ENTRENA <br />
                        <span className="text-transparent [-webkit-text-stroke:2px_#fff] italic -skew-x-[9deg] inline-block">
                            LIGERO.
                        </span>
                        <br />
                        <span className="text-red-600">MANTENTE SECO.</span>
                    </h2>
                </div>

                <div className="lg:col-span-4 flex flex-col">
                    <div className="p-8 md:p-12 flex-1 flex flex-col justify-center border-b border-white/10">
                        <span className="font-mono text-[10px] font-bold uppercase bg-red-600 text-black inline-block px-2 py-1 w-fit tracking-widest mb-6">
                            // SPEC_SHEET
                        </span>

                        <p className="font-mono text-xs md:text-sm text-white/50 leading-8 uppercase tracking-wide">
                            <span className="text-red-600 font-bold mr-2">///</span>
                            Tecnología Dry-Fit que te mantiene fresco sin importar cuánto subas la intensidad. Diseñada para rendir bajo presión.
                        </p>
                    </div>

                    <div className="p-8 md:p-12 flex flex-col justify-center items-start gap-6">
                        <Link
                            href="/shop"
                            className="w-full group relative h-16 border border-white/20 flex items-center justify-between px-6 overflow-hidden"
                        >
                            <span className="relative z-10 font-syncopate text-sm font-bold uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors duration-300">
                                VER COLECCIÓN
                            </span>
                            <div className="absolute inset-0 bg-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                            <ArrowDownRight size={20} className="relative z-10 text-white group-hover:text-black transition-colors duration-300" />
                        </Link>
                        <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest text-center w-full">
                            Stock limitado disponible
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
