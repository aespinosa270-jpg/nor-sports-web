"use client";

import { motion } from "framer-motion";
import { getAllProducts } from "@/lib/data"; // <--- Conexión a la "Base de Datos"
import { ProductCard } from "@/components/home/ProductCard";
export default function ShopPage() {
    // 1. Jalamos los productos reales
    const products = getAllProducts();

    return (
        <main className="bg-black min-h-screen pt-32 pb-20 px-6">

            {/* Encabezado de la Tienda (Tu diseño original) */}
            <div className="container mx-auto mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <h1 className="font-display text-4xl md:text-6xl text-white mb-2 tracking-tight">
                        CATÁLOGO_PERFORMANCE
                    </h1>
                    <p className="font-mono text-xs text-gray-500 tracking-widest">
                        EQUIPAMIENTO TÉCNICO PARA ENTRENAMIENTO // FW25
                    </p>
                </div>

                {/* Filtros Visuales (Por ahora visuales, luego les metemos lógica) */}
                <div className="flex gap-4 font-mono text-xs text-gray-400 mt-4 md:mt-0 uppercase">
                    <button className="text-white underline underline-offset-4 decoration-nor-accent">Todo</button>
                    <button className="hover:text-white transition-colors">Cooling</button>
                    <button className="hover:text-white transition-colors">Compression</button>
                    <button className="hover:text-white transition-colors">Ventilación</button>
                </div>
            </div>

            {/* Grid de Productos */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">

                {/* 2. Mapeamos la data REAL */}
                {products.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="h-full"
                    >
                        {/* Aquí usamos tu ProductCard estandarizado. 
                           Así, si cambias el diseño de la tarjeta, cambia en el Home y aquí.
                        */}
                        <ProductCard product={product} />

                    </motion.div>
                ))}

                {/* Mensaje si no hay productos (Fallback) */}
                {products.length === 0 && (
                    <div className="col-span-full text-center py-20">
                        <p className="font-mono text-gray-500">SYSTEM OFFLINE: NO INVENTORY FOUND.</p>
                    </div>
                )}
            </div>
        </main>
    );
}