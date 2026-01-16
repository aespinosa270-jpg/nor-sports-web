"use client";

import { motion } from "framer-motion";
import { getAllProducts } from "@/lib/data";
import { ProductCard } from "@/components/home/ProductCard";
import { useState, useMemo } from "react";
import { Footer } from "@/components/layout/Footer";
import { Filter } from "lucide-react";

// Lógica de normalización de texto para búsquedas insensibles a mayúsculas/acentos
const normalizeText = (text: string | undefined) => {
    return text
        ? text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : "";
};

// ⚠️ ACTUALIZADO: Agregué "Ares" para que aparezca el nuevo producto NOR ACTIVE PRO
const FILTERS = ["Todo", "Micropiqué", "Piqué Vera", "Micropanal", "Ares"];

export default function ShopPage() {
    // 1. Obtener datos (Traerá los 4 productos nuevos)
    const allProducts = getAllProducts();

    // 2. Estado del filtro activo
    const [activeFilter, setActiveFilter] = useState("Todo");

    // 3. Lógica de Filtrado
    const displayedProducts = useMemo(() => {
        // A. Filtro Duro: Aseguramos que sean playeras o tengan las telas clave
        const tshirts = allProducts.filter(product => {
            const category = normalizeText(product.category);
            const name = normalizeText(product.name);
            // Permitimos que pasen todos los productos que definimos en data.ts
            return category === 'playera' || name.includes('nor');
        });

        // B. Filtro de Usuario (Botones)
        if (activeFilter === "Todo") return tshirts;

        const normalizedFilter = normalizeText(activeFilter);

        return tshirts.filter(product => {
            const name = normalizeText(product.name);
            const desc = normalizeText(product.description);
            const features = product.features.map(f => normalizeText(f)).join(" ");
            const tag = normalizeText(product.tag);

            // Buscamos coincidencia en Nombre, Descripción, Tag o Features
            return name.includes(normalizedFilter) ||
                desc.includes(normalizedFilter) ||
                tag.includes(normalizedFilter) ||
                features.includes(normalizedFilter);
        });
    }, [allProducts, activeFilter]);

    return (
        <main className="min-h-screen w-full bg-nor-white text-nor-black pt-20 selection:bg-nor-black selection:text-white">

            {/* HEADER DEL CATÁLOGO */}
            <header className="border-b border-nor-black bg-nor-white">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 md:py-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <span className="font-mono text-[10px] font-bold text-nor-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-nor-accent rounded-full animate-pulse" />
                                CATÁLOGO 2026 // TEXTILES TÉCNICOS
                            </span>
                            <h1 className="font-display font-black text-5xl md:text-8xl uppercase tracking-tighter leading-[0.8]">
                                COLECCIÓN<br />DRY-FIT<span className="text-nor-dark/20">.</span>
                            </h1>
                        </div>
                        <div className="max-w-xs text-right md:text-left border-l-2 border-nor-black pl-4">
                            <p className="font-mono text-[10px] text-nor-dark/60 uppercase tracking-widest leading-relaxed">
                                Ingeniería textil aplicada.<br />
                                Rendimiento superior.<br />
                                Diseñado en CDMX.
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* BARRA DE HERRAMIENTAS / FILTROS (STICKY) */}
            <div className="border-b border-nor-black bg-nor-white sticky top-20 z-30">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-14 flex justify-between items-center overflow-x-auto no-scrollbar">

                    {/* Lista de Filtros */}
                    <div className="flex items-center gap-6 md:gap-8">
                        <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-nor-dark/40">
                            <Filter size={14} />
                            FILTRAR:
                        </span>

                        <div className="flex gap-4 md:gap-6">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`relative font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 py-4 ${activeFilter === filter
                                        ? "text-nor-black"
                                        : "text-nor-dark/40 hover:text-nor-black"
                                        }`}
                                >
                                    {filter}
                                    {/* Indicador activo animado */}
                                    {activeFilter === filter && (
                                        <motion.span
                                            layoutId="activeFilter"
                                            className="absolute bottom-0 left-0 w-full h-[2px] bg-nor-black"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contador (Solo Desktop) */}
                    <div className="hidden md:flex items-center gap-2">
                        <span className="font-mono text-[10px] text-nor-dark/40 uppercase tracking-widest">
                            {displayedProducts.length} RESULTADOS
                        </span>
                    </div>
                </div>
            </div>

            {/* GRID DE PRODUCTOS */}
            <section className="min-h-[60vh] border-b border-nor-black">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
                        {displayedProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}

                        {/* ESTADO VACÍO (FALLBACK) */}
                        {displayedProducts.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-32 border border-dashed border-nor-black/20 bg-[#FAFAFA]">
                                <div className="w-12 h-12 border-2 border-nor-dark/20 rounded-full flex items-center justify-center mb-4">
                                    <span className="font-mono text-xl font-bold text-nor-dark/40">!</span>
                                </div>
                                <p className="font-mono text-xs font-bold uppercase tracking-widest text-nor-black mb-2">
                                    ERROR DE BÚSQUEDA // SIN RESULTADOS
                                </p>
                                <p className="font-mono text-[10px] text-nor-dark/50 uppercase tracking-widest mb-8">
                                    No hay items con la especificación: {activeFilter}
                                </p>
                                <button
                                    onClick={() => setActiveFilter("Todo")}
                                    className="border border-nor-black px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-nor-black hover:text-white transition-all"
                                >
                                    REINICIAR FILTROS
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}