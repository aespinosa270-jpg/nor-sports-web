"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const HeroSection = () => {
    const reduce = useRef(false);
    const [kmh, setKmh] = useState("0.0");

    // Velocímetro: reacciona a la velocidad real de scroll
    useEffect(() => {
        reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce.current) { setKmh("42.2"); return; }

        let last = window.scrollY;
        let speed = 0;
        let shown = 0;
        let raf = 0;
        const tick = () => {
            const y = window.scrollY;
            speed = speed * 0.9 + Math.abs(y - last) * 0.35;
            last = y;
            shown += (speed - shown) * 0.12;
            setKmh(Math.min(199.9, shown).toFixed(1));
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <section className="relative w-full h-screen min-h-[680px] overflow-hidden bg-black">

            {/* Imagen de fondo cinematográfica */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/nor-herov2.png"
                    alt="NØR — Diseñado para el movimiento"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={95}
                    sizes="100vw"
                />
                {/* Viñeta para asentar el texto sin apagar el neón central */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </div>

            {/* Barra roja diagonal que cruza (la barra del Ø a escala de pantalla) */}
            <span className="pointer-events-none absolute z-[15] left-[32%] top-[10%] w-[42%] h-[2px] bg-red-600/80 rotate-[38deg] origin-left animate-[slashIn_1s_0.4s_cubic-bezier(.85,0,.15,1)_both]" />

            {/* HUD lateral derecho */}
            <div className="hidden lg:flex absolute z-20 right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-3 font-mono">
                <span className="text-red-600 text-[11px] tracking-[0.2em] font-bold">001</span>
                <div className="w-px h-24 bg-gradient-to-b from-red-600 via-red-600/40 to-transparent" />
                <div className="flex flex-col items-end gap-1 opacity-60">
                    <div className="flex gap-1">
                        <span className="w-1 h-1 bg-white/40" />
                        <span className="w-1 h-1 bg-white/40" />
                        <span className="w-1 h-1 bg-red-600" />
                    </div>
                    <div className="w-16 h-px bg-white/20" />
                    <div className="w-10 h-px bg-white/20" />
                    <div className="w-14 h-px bg-white/20" />
                </div>
                <div className="w-1 h-16 bg-red-600 mt-2" />
                <span className="text-white/50 text-[11px] tracking-[0.2em]">04</span>
            </div>

            {/* Contenido principal */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 lg:p-16">

                {/* Top: coordenadas */}
                <div className="pt-14 md:pt-10">
                    <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-white/50">
                        19.4326° N, 99.1332° W
                    </span>
                </div>

                {/* Centro-izquierda: título + copy + CTA */}
                <div className="max-w-2xl">
                    <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.86] text-white drop-shadow-2xl">
                        DISEÑADO
                        <br />
                        PARA EL
                        <br />
                        <span className="text-transparent [-webkit-text-stroke:2px_#fff]">MOVIMIENTO</span>
                        <span className="text-red-600 [-webkit-text-stroke:0]">.</span>
                    </h1>

                    <p className="mt-8 font-mono text-xs md:text-sm text-gray-300 leading-relaxed uppercase tracking-wide max-w-md">
                        Ingeniería térmica que se adapta a tu cuerpo en cada sprint.
                    </p>

                    <div className="mt-6 w-10 h-px bg-white/40" />

                    <Link
                        href="/shop"
                        className="group mt-8 inline-flex items-center gap-5"
                    >
                        <span className="font-syncopate font-black text-sm md:text-base uppercase tracking-[0.15em] text-white group-hover:text-red-600 transition-colors duration-300">
                            EXPLORAR COLECCIÓN
                        </span>
                        <span className="relative flex items-center h-3">
                            {/* línea que se extiende al hover */}
                            <span className="h-px bg-red-600 w-12 group-hover:w-20 transition-all duration-300 ease-out" />
                            {/* punta de flecha en SVG (monocromo, nunca emoji a color) */}
                            <svg
                                width="14" height="14" viewBox="0 0 14 14" fill="none"
                                className="text-red-600 -ml-1 group-hover:translate-x-1 transition-transform duration-300"
                                aria-hidden="true"
                            >
                                <path d="M1 1L13 13M13 13V4M13 13H4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                            </svg>
                        </span>
                    </Link>
                </div>

                {/* Bottom: velocímetro + ready or not */}
                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-red-600 shrink-0">
                            <span className="font-display font-black text-lg md:text-xl text-white">N</span>
                        </div>
                        <div>
                            <span className="font-display font-black text-3xl md:text-5xl text-red-600 leading-none tabular-nums">
                                {kmh}
                            </span>
                            <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
                                KM/H · VELOCIDAD DE ESCAPE
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-display font-black text-sm md:text-lg uppercase tracking-tight text-white">
                            READY OR NOT?
                        </span>
                        <span className="text-red-600 font-bold tracking-tighter">///</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slashIn { from { transform: rotate(38deg) scaleX(0); } to { transform: rotate(38deg) scaleX(1); } }
                @media (prefers-reduced-motion: reduce) {
                    section span[class*="slashIn"] { animation: none !important; transform: rotate(38deg) scaleX(1) !important; }
                }
            `}</style>
        </section>
    );
};
