"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export const ZonaRoja = () => {
    return (
        <section
            className="relative bg-red-600 text-black overflow-hidden px-6 md:px-12 py-28 md:py-36"
            style={{ clipPath: "polygon(0 0, 100% 3.5vw, 100% 100%, 0 calc(100% - 3.5vw))" }}
        >
            <span className="absolute -right-6 -bottom-10 font-display font-black text-[28vw] leading-none text-black/[0.08] select-none pointer-events-none italic -skew-x-[9deg]">
                NØR
            </span>

            <div className="relative z-10">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-black block mb-6">
                    /// Zona roja
                </span>

                <h2 className="font-display font-black uppercase tracking-tighter leading-[0.85] text-6xl md:text-8xl lg:text-9xl italic -skew-x-[9deg]">
                    <span className="text-transparent [-webkit-text-stroke:2.5px_#000]">READY</span>
                    <br />
                    OR NOT?
                </h2>

                <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <p className="max-w-md font-mono text-sm md:text-base font-bold uppercase leading-relaxed tracking-wide">
                        Precios especiales en drops anteriores. Cuando se acaba el stock, se acaba la prenda — no hay reposición.
                    </p>

                    <Link
                        href="/offers"
                        className="group relative w-full md:w-fit overflow-hidden bg-black border border-black shrink-0"
                    >
                        <div className="relative z-10 px-10 py-5 flex items-center justify-between gap-12 text-red-600 group-hover:text-black transition-colors duration-300">
                            <span className="font-syncopate font-black text-base uppercase tracking-[0.15em]">
                                ENTRAR A OFERTAS
                            </span>
                            <ArrowDownRight size={22} className="group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                        <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
};
