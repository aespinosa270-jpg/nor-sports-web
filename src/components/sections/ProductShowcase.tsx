"use client";

import Link from "next/link";
// Usamos el alias @ para evitar líos con los puntos ../
import { ProductCard } from "@/components/home/ProductCard";
import { getFeaturedProducts } from "@/lib/data"; // <--- AQUÍ ESTÁ LA MAGIA

export const ProductShowcase = () => {
    // Jalamos los productos reales desde tu archivo central
    // Esto traerá los primeros 4 productos que definiste en data.ts
    const products = getFeaturedProducts();

    return (
        <section className="px-6 md:px-12 py-24 bg-nor-white text-nor-black border-t border-nor-dark/10">

            {/* Header Limpio */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-nor-dark/10 pb-6">
                <div>
                    <span className="font-mono text-xs text-nor-accent uppercase tracking-widest mb-3 block animate-pulse">
                        [ New_Arrivals ]
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none">
                        System Essentials
                    </h2>
                </div>

                {/* Enlace 'Ver Todo' */}
                <Link
                    href="/shop" // Esto ya lleva a tu catálogo real
                    className="hidden md:flex items-center gap-2 font-mono text-xs border border-nor-dark/20 px-8 py-4 hover:bg-nor-black hover:text-white transition-all duration-300 uppercase tracking-widest group"
                >
                    View Full Catalog
                    <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
                </Link>
            </div>

            {/* Grid Responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                {/* Ahora mapeamos 'products' que viene de la data real */}
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Botón Móvil */}
            <div className="mt-16 md:hidden">
                <Link
                    href="/shop"
                    className="block w-full text-center font-mono text-xs border border-nor-black px-6 py-4 bg-nor-black text-white hover:bg-nor-white hover:text-nor-black transition-colors uppercase font-bold tracking-widest"
                >
                    View Full Catalog
                </Link>
            </div>
        </section>
    );
};