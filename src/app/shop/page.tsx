"use client";

import { motion } from "framer-motion";

// PRODUCTOS ACTUALIZADOS: Playeras Deportivas High-Tech
const PRODUCTS = [
    {
        id: 1,
        name: "AERO-DRY SKIN",
        price: "$950 MXN",
        category: "PERFORMANCE",
        image: "bg-[#0a0a0a]",
        tech: "DRY-FIT V.3"
    },
    {
        id: 2,
        name: "CRYOGENIC CORE",
        price: "$1,200 MXN",
        category: "COOLING",
        image: "bg-[#111]",
        tech: "AUTO-COOLING"
    },
    {
        id: 3,
        name: "KINETIC MESH",
        price: "$890 MXN",
        category: "VENTILATION",
        image: "bg-[#0f0f0f]",
        tech: "ULTRA BREATHABLE"
    },
    {
        id: 4,
        name: "HYDRO-SHIELD TEE",
        price: "$1,100 MXN",
        category: "RESISTANCE",
        image: "bg-[#141414]",
        tech: "SWEAT REPELLENT"
    },
    {
        id: 5,
        name: "ZERO-G COMPRESSION",
        price: "$1,050 MXN",
        category: "COMPRESSION",
        image: "bg-[#1a1a1a]",
        tech: "MUSCLE SUPPORT"
    },
    {
        id: 6,
        name: "CARBON FIBER KNIT",
        price: "$1,400 MXN",
        category: "ELITE",
        image: "bg-[#1c1c1c]",
        tech: "ANTI-BACTERIAL"
    },
];

export default function ShopPage() {
    return (
        <main className="bg-black min-h-screen pt-32 pb-20 px-6">

            {/* Encabezado de la Tienda */}
            <div className="container mx-auto mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <h1 className="font-display text-4xl md:text-6xl text-white mb-2">CATÁLOGO_PERFORMANCE</h1>
                    <p className="font-mono text-xs text-gray-500">EQUIPAMIENTO TÉCNICO PARA ENTRENAMIENTO.</p>
                </div>

                {/* Filtros Simples */}
                <div className="flex gap-4 font-mono text-xs text-gray-400 mt-4 md:mt-0">
                    <button className="text-white underline underline-offset-4">TODO</button>
                    <button className="hover:text-white">COOLING</button>
                    <button className="hover:text-white">COMPRESIÓN</button>
                    <button className="hover:text-white">VENTILACIÓN</button>
                </div>
            </div>

            {/* Grid de Productos */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {PRODUCTS.map((prod, i) => (
                    <motion.div
                        key={prod.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group cursor-pointer"
                    >
                        {/* Imagen del Producto (Placeholder Tech) */}
                        <div className={`w-full aspect-[3/4] ${prod.image} border border-white/5 relative overflow-hidden flex items-center justify-center`}>

                            {/* Silueta SVG sutil */}
                            <div className="opacity-20 absolute inset-0 flex items-center justify-center">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
                                    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
                                </svg>
                            </div>

                            {/* Overlay Hover */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Categoría arriba izquierda */}
                            <div className="absolute top-4 left-4 text-[10px] font-mono bg-white text-black px-2 py-1 font-bold">
                                {prod.category}
                            </div>

                            {/* Tecnología abajo derecha */}
                            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/70 border border-white/20 px-2 py-1">
                                {prod.tech}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="mt-4 flex justify-between font-mono text-xs uppercase">
                            <div>
                                <h3 className="text-white group-hover:underline underline-offset-4 tracking-wide font-bold">{prod.name}</h3>
                                <p className="text-gray-500 mt-1">{prod.tech}</p>
                            </div>
                            <span className="text-white bg-white/10 px-2 py-1 h-fit">{prod.price}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}