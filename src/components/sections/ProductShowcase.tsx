"use client";

import Link from "next/link";
import { ProductCard } from "@/components/home/ProductCard";
import { getFeaturedProducts } from "@/lib/data";

export const ProductShowcase = () => {
    const products = getFeaturedProducts();

    return (
        <section className="px-6 md:px-12 py-24 bg-black text-white border-b border-white/10">

            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-6">
                <div>
                    <span className="font-mono text-xs text-red-600 uppercase tracking-[0.2em] mb-3 block">
                        /// SS26 — Drop 01
                    </span>
                    <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] italic -skew-x-[9deg]">
                        La colección
                    </h2>
                    <p className="mt-4 font-mono text-[11px] text-white/40 uppercase tracking-[0.12em] max-w-sm not-italic">
                        Cada pieza con su ficha técnica. Cero relleno.
                    </p>
                </div>

                <Link
                    href="/shop"
                    className="hidden md:flex items-center gap-2 font-mono text-xs border border-white/20 px-8 py-4 hover:bg-red-600 hover:border-red-600 hover:text-black transition-all duration-300 uppercase tracking-widest group"
                >
                    Ver colección
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>

            <div className="mt-16 md:hidden">
                <Link
                    href="/shop"
                    className="block w-full text-center font-mono text-xs border border-white/20 px-6 py-4 bg-red-600 text-black hover:bg-white transition-colors uppercase font-bold tracking-widest"
                >
                    VER TODA LA COLECCIÓN
                </Link>
            </div>
        </section>
    );
};
