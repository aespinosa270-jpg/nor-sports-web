"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PRODUCTOS = [
    {
        id: "01",
        nombre: "PLAYERAS AERO-DRY",
        precio: "$950 MXN",
        categoria: "Entrenamiento",
        imgBg: "bg-gray-100"
    },
    {
        id: "02",
        nombre: "SHORT COMPRESIÓN V2",
        precio: "$1,200 MXN",
        categoria: "Running",
        imgBg: "bg-gray-200"
    },
    {
        id: "03",
        nombre: "CHAMARRA TÉCNICA SHELL",
        precio: "$2,890 MXN",
        categoria: "Outdoor",
        imgBg: "bg-gray-100"
    },
    {
        id: "04",
        nombre: "CAPILARIDAD TEE",
        precio: "$890 MXN",
        categoria: "Básicos",
        imgBg: "bg-gray-200"
    },
];

export const ProductShowcase = () => {
    return (
        <section className="w-full py-24 bg-white">

            {/* HEADER DE SECCIÓN ESTILO ADIDAS */}
            <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row items-end justify-between">
                <div>
                    <h2 className="font-display text-3xl md:text-4xl text-black uppercase font-bold leading-none mb-4">
                        NOVEDADES DE TEMPORADA
                    </h2>
                </div>
                {/* Link de "Ver todo" limpio */}
                <Link href="/shop" className="group flex items-center gap-2 font-display font-bold text-sm mt-4 md:mt-0 border-b-2 border-black pb-1">
                    VER TODO <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>

            {/* GRID DE PRODUCTOS (Limpio, 4 columnas) */}
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {PRODUCTOS.map((prod) => (
                        <motion.div
                            key={prod.id}
                            whileHover={{ y: -5 }}
                            className="group cursor-pointer relative"
                        >
                            {/* 1. IMAGEN DEL PRODUCTO (Fondo claro) */}
                            <div className={`aspect-square w-full ${prod.imgBg} relative overflow-hidden mb-4`}>
                                {/* Placeholder de silueta */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-105 duration-500">
                                    <svg width="100" height="100" viewBox="0 0 24 24" fill="black"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" /></svg>
                                </div>
                                {/* Etiqueta "Nuevo" */}
                                <div className="absolute top-2 left-2 bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                                    Nuevo
                                </div>
                            </div>

                            {/* 2. INFO DEL PRODUCTO (Limpia, texto negro) */}
                            <div className="flex flex-col">
                                <span className="font-mono text-xs text-gray-500 mb-1">{prod.categoria}</span>
                                <h3 className="font-display text-sm md:text-base font-bold text-black uppercase leading-tight group-hover:underline underline-offset-2">
                                    {prod.nombre}
                                </h3>
                                <span className="font-mono text-sm text-black mt-2 font-bold">{prod.precio}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};