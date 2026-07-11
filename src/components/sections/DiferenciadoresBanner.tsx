"use client";

import { Wind, Droplets, Feather } from "lucide-react";

/**
 * FRANJA DE DIFERENCIADORES — versión oscura cohesiva con el hero.
 * >>> JACK: los valores /* REAL? *\/ son placeholders. Reemplaza con datos medidos reales. <<<
 */

const SPECS = [
    {
        icon: Wind,
        valor: "100%",   /* REAL? — transpirabilidad / % poliéster */
        unidad: "Poliéster",
        titulo: "Respira",
        desc: "Tejido Micropiqué que maximiza el flujo de aire en cada sprint.",
    },
    {
        icon: Droplets,
        valor: "Ultra",  /* REAL? — minutos reales de secado, ej "8 min" */
        unidad: "rápido",
        titulo: "Seca",
        desc: "Matriz de Micropanal que absorbe el sudor y evapora al instante.",
    },
    {
        icon: Feather,
        valor: "Ligera", /* REAL? — gramaje real, ej "140 g/m²" */
        unidad: "al tacto",
        titulo: "Pesa menos",
        desc: "Ingeniería textil de alto rendimiento. Fuerza sin peso muerto.",
    },
];

export const DiferenciadoresBanner = () => {
    return (
        <section className="bg-black text-white border-b border-white/10">

            {/* Por qué existe NØR */}
            <div className="px-6 md:px-12 py-16 md:py-24 border-b border-white/10">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-red-600 block mb-6">
                    /// Por qué NØR
                </span>
                <p className="font-display text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.02] max-w-4xl">
                    No hacemos ropa deportiva de catálogo.
                    <span className="text-transparent [-webkit-text-stroke:1.5px_#fff] block mt-2">
                        Diseñamos la tela primero,
                    </span>
                    <span className="text-red-600 block mt-2">la prenda después.</span>
                </p>
                {/* >>> JACK: reemplaza con la historia real de origen de NØR <<< */}
                <p className="mt-8 font-mono text-xs md:text-sm text-white/50 uppercase tracking-wide leading-7 max-w-2xl">
                    Cada playera NØR nace de una tela desarrollada para un solo trabajo: rendir bajo presión. Micropiqué, Micropanal, Ares y Piqué Vera no son nombres de marketing — son cuatro construcciones distintas para cuatro formas de entrenar.
                </p>
            </div>

            {/* 3 datos duros */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {SPECS.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.titulo} className="group p-8 md:p-12 hover:bg-red-600 transition-colors duration-300">
                            <Icon size={28} className="text-red-600 group-hover:text-black transition-colors mb-8" strokeWidth={1.5} />
                            <div className="flex items-baseline gap-2">
                                <span className="font-display text-5xl md:text-6xl font-black tracking-tighter italic -skew-x-[9deg] group-hover:text-black transition-colors">
                                    {s.valor}
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-black/70 transition-colors">
                                    {s.unidad}
                                </span>
                            </div>
                            <h3 className="mt-4 font-display text-xl font-black uppercase tracking-tight group-hover:text-black transition-colors">
                                {s.titulo}
                            </h3>
                            <p className="mt-2 font-mono text-[11px] text-white/40 uppercase tracking-wide leading-6 group-hover:text-black/70 transition-colors">
                                {s.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
