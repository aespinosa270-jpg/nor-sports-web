"use client";

import { motion } from "framer-motion";
import { getAllProducts } from "@/lib/data";
import { ProductCard } from "@/components/home/ProductCard";
import { useState, useMemo } from "react";

// Helper para quitar acentos y pasar a minúsculas (Ej: "Piqué" -> "pique")
const normalizeText = (text) => {
    return text
        ? text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : "";
};

const FILTERS = ["Todo", "Micropiqué", "Piqué Vera", "Micropanal"];

export default function ShopPage() {
    // 1. Obtener datos (asumiendo que es data estática o síncrona)
    const allProducts = getAllProducts();

    // 2. Estado del filtro activo
    const [activeFilter, setActiveFilter] = useState("Todo");

    // 3. Lógica de Filtrado (Optimizada con useMemo para rendimiento)
    const displayedProducts = useMemo(() => {
        // A. Primero filtramos que sean SOLO playeras (Filtro Duro)
        const tshirts = allProducts.filter(product => {
            const name = normalizeText(product.name);
            const category = normalizeText(product.category);
            const desc = normalizeText(product.description);

            return category === 'playera' ||
                name.includes('playera') ||
                desc.includes('pique') ||
                desc.includes('micropanal');
        });

        // B. Luego aplicamos el filtro de botón (Filtro de Usuario)
        if (activeFilter === "Todo") return tshirts;

        const normalizedFilter = normalizeText(activeFilter);

        return tshirts.filter(product => {
            const name = normalizeText(product.name);
            const desc = normalizeText(product.description);

            // Busca la tela seleccionada en nombre o descripción
            return name.includes(normalizedFilter) || desc.includes(normalizedFilter);
        });
    }, [allProducts, activeFilter]);

    return (
        <main className="bg-black min-h-screen pt-32 pb-20 px-6">

            {/* Encabezado */}
            <div className="container mx-auto mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <h1 className="font-display text-4xl md:text-6xl text-white mb-2 tracking-tight">
                        TOPS_SYSTEM
                    </h1>
                    <p className="font-mono text-xs text-gray-500 tracking-widest">
                        COLECCIÓN DE PLAYERAS TÉCNICAS // MICROPIQUÉ - VERA - MICROPANAL
                    </p>
                </div>

                {/* Filtros Generados Dinámicamente */}
                <div className="flex gap-4 font-mono text-xs text-gray-400 mt-4 md:mt-0 uppercase overflow-x-auto no-scrollbar">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`${activeFilter === filter
                                ? "text-white underline decoration-nor-accent underline-offset-4"
                                : "hover:text-white"
                                } transition-all duration-300 whitespace-nowrap`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Productos */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">

                {displayedProducts.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }} // Delay más rápido para sensación snappier
                        className="h-full"
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}

                {/* Fallback si el filtro no encuentra nada */}
                {displayedProducts.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-lg bg-white/5">
                        <p className="font-mono text-gray-400 text-sm mb-2">
                            SYSTEM_ERROR: STOCK 0
                        </p>
                        <p className="text-gray-600 text-xs">
                            No se encontraron items con la especificación: {activeFilter}
                        </p>
                        <button
                            onClick={() => setActiveFilter("Todo")}
                            className="mt-6 text-xs font-mono text-white underline decoration-white/30 hover:decoration-white"
                        >
                            RESET_FILTERS
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}