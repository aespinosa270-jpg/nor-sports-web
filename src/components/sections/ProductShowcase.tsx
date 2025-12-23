"use client";

import { motion } from "framer-motion";

// PRODUCTOS ACTUALIZADOS: Playeras High-Tech
const PRODUCTOS = [
    {
        id: "01",
        nombre: "AERO-DRY SKIN",
        precio: "$950 MXN",
        etiqueta: "DRY-FIT V.3",
        desc: "Evaporación instantánea"
    },
    {
        id: "02",
        nombre: "CRYOGENIC CORE",
        precio: "$1,200 MXN",
        etiqueta: "AUTO-COOLING",
        desc: "Regulación térmica activa"
    },
    {
        id: "03",
        nombre: "KINETIC MESH",
        precio: "$890 MXN",
        etiqueta: "ULTRA BREATHABLE",
        desc: "Flujo de aire máximo"
    },
];

export const ProductShowcase = () => {
    return (
        <section className="w-full py-24 bg-black relative border-t border-white/10">
            <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
                <div>
                    <h3 className="font-mono text-xs text-gray-500 mb-2">PERFORMANCE LAYERS</h3>
                    <h2 className="font-display text-3xl md:text-5xl text-white">SISTEMAS DE ENTRENAMIENTO</h2>
                </div>

                <a href="/shop" className="hidden md:block font-mono text-xs text-right text-white hover:underline underline-offset-4">
                    VER TODAS LAS PLAYERAS →
                </a>
            </div>

            {/* Carrusel Horizontal */}
            <div className="w-full overflow-x-auto pb-12 px-6">
                <div className="flex gap-8 w-max">
                    {PRODUCTOS.map((prod) => (
                        <motion.div
                            key={prod.id}
                            whileHover={{ y: -5 }}
                            className="relative w-[300px] md:w-[350px] group cursor-pointer"
                        >
                            {/* Cuadro de la Foto (Placeholder Técnico) */}
                            <div className="h-[450px] w-full bg-[#0a0a0a] border border-white/10 relative overflow-hidden flex items-center justify-center group-hover:border-white/30 transition-colors">

                                {/* Silueta de Playera (Gráfico CSS simple) */}
                                <div className="opacity-20">
                                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
                                        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
                                    </svg>
                                </div>

                                {/* Texto de fondo */}
                                <span className="absolute text-white/5 font-display text-6xl font-bold rotate-90 tracking-widest pointer-events-none">
                                    NOR
                                </span>

                                {/* Etiqueta de Tecnología (Esquina superior) */}
                                <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-[10px] font-bold font-mono tracking-wider">
                                    {prod.etiqueta}
                                </div>
                            </div>

                            {/* Info del Producto */}
                            <div className="mt-4 flex justify-between items-start font-mono text-xs">
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-sm mb-1 tracking-wide">{prod.nombre}</span>
                                    <span className="text-gray-500">{prod.desc}</span>
                                </div>
                                <span className="text-white bg-white/10 px-2 py-1">{prod.precio}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};