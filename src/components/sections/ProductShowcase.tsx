"use client";

import Link from "next/link";
// Asegúrate de que la ruta al ProductCard sea correcta según tu estructura
import { ProductCard } from "../home/ProductCard";

// Mock Data Mejorada (Simulando variantes reales)
const PRODUCTS = [
    {
        id: 1,
        name: "AERO-DRY SHELL",
        price: 2890,
        tag: "WATERPROOF",
        variants: [
            { colorName: "Onyx", colorHex: "#111111", image: "/assets/p1-black.jpg" },
            { colorName: "Concrete", colorHex: "#888888", image: "/assets/p1-gray.jpg" }
        ]
    },
    {
        id: 2,
        name: "KINETIC TIGHTS",
        price: 1200,
        tag: "COMPRESSION",
        variants: [
            { colorName: "Black", colorHex: "#000000", image: "/assets/p2-black.jpg" },
            { colorName: "Navy", colorHex: "#1a2b4b", image: "/assets/p2-navy.jpg" }
        ]
    },
    {
        id: 3,
        name: "CORE VEST V2",
        price: 1850,
        tag: "THERMAL",
        variants: [
            { colorName: "Olive", colorHex: "#4b5320", image: "/assets/p3-olive.jpg" },
            { colorName: "Sand", colorHex: "#d2b48c", image: "/assets/p3-sand.jpg" },
            { colorName: "Onyx", colorHex: "#111111", image: "/assets/p3-black.jpg" }
        ]
    },
    {
        id: 4,
        name: "TECH RUNNER",
        price: 3200,
        tag: "FOOTWEAR",
        variants: [
            { colorName: "Ghost", colorHex: "#f0f0f0", image: "/assets/p4-white.jpg" },
            { colorName: "Volt", colorHex: "#ccff00", image: "/assets/p4-volt.jpg" }
        ]
    },
];

export const ProductShowcase = () => {
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

                {/* Enlace 'Ver Todo' estilo botón técnico */}
                <Link
                    href="/shop"
                    className="hidden md:flex items-center gap-2 font-mono text-xs border border-nor-dark/20 px-8 py-4 hover:bg-nor-black hover:text-white transition-all duration-300 uppercase tracking-widest group"
                >
                    View Full Catalog
                    <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
                </Link>
            </div>

            {/* Grid Responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                {PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Botón Móvil para 'Ver Todo' */}
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