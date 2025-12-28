"use client";
import { ProductCard } from "../home/ProductCard"; // Importa el componente nuevo

// Mock Data Mejorada (Simulando variantes reales)
const PRODUCTS = [
    {
        id: 1,
        name: "AERO-DRY SHELL",
        price: 2890,
        tag: "WATERPROOF",
        variants: [
            { colorName: "Onyx", colorHex: "#111111", image: "/p1-black.jpg" },
            { colorName: "Concrete", colorHex: "#888888", image: "/p1-gray.jpg" }
        ]
    },
    {
        id: 2,
        name: "KINETIC TIGHTS",
        price: 1200,
        tag: "COMPRESSION",
        variants: [
            { colorName: "Black", colorHex: "#000000", image: "/p2-black.jpg" },
            { colorName: "Navy", colorHex: "#1a2b4b", image: "/p2-navy.jpg" }
        ]
    },
    {
        id: 3,
        name: "CORE VEST V2",
        price: 1850,
        tag: "THERMAL",
        variants: [
            { colorName: "Olive", colorHex: "#4b5320", image: "/p3-olive.jpg" },
            { colorName: "Sand", colorHex: "#d2b48c", image: "/p3-sand.jpg" },
            { colorName: "Onyx", colorHex: "#111111", image: "/p3-black.jpg" }
        ]
    },
    {
        id: 4,
        name: "TECH RUNNER",
        price: 3200,
        tag: "FOOTWEAR",
        variants: [
            { colorName: "Ghost", colorHex: "#f0f0f0", image: "/p4-white.jpg" },
            { colorName: "Volt", colorHex: "#ccff00", image: "/p4-volt.jpg" }
        ]
    },
];

export const ProductShowcase = () => {
    return (
        <section className="px-6 md:px-12 py-24 bg-white text-black border-t border-gray-100">

            {/* Header Limpio */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2 block">
                        [ New_Arrivals ]
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter">
                        System Essentials
                    </h2>
                </div>

                {/* Enlace 'Ver Todo' estilo botón técnico */}
                <a href="/shop" className="hidden md:block font-mono text-xs border border-gray-200 px-6 py-3 hover:bg-black hover:text-white transition-colors uppercase">
                    View Full Catalog -&gt;
                </a>
            </div>

            {/* Grid Responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Botón Móvil para 'Ver Todo' */}
            <div className="mt-12 md:hidden">
                <a href="/shop" className="block w-full text-center font-mono text-xs border border-black px-6 py-4 hover:bg-black hover:text-white transition-colors uppercase font-bold">
                    View Full Catalog
                </a>
            </div>
        </section>
    );
};