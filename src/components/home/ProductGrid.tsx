"use client";

// Asegúrate de que la ruta de importación coincida con donde guardaste ProductCard.tsx
// Si ProductShowcase está en 'sections' y ProductCard en 'home':
import { ProductCard, type Product } from "../home/ProductCard";
import Link from "next/link";

// MOCK DATA: Simulación de tu base de datos con variantes de color
const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "AERO-DRY SHELL",
        price: 2890,
        tag: "WATERPROOF",
        variants: [
            { colorName: "Onyx", colorHex: "#111111", image: "/placeholder-1.jpg" },
            { colorName: "Concrete", colorHex: "#888888", image: "/placeholder-2.jpg" }
        ]
    },
    {
        id: 2,
        name: "KINETIC TIGHTS V2",
        price: 1200,
        tag: "COMPRESSION",
        variants: [
            { colorName: "Black", colorHex: "#050505", image: "/placeholder-3.jpg" },
            { colorName: "Navy", colorHex: "#1a2b4b", image: "/placeholder-4.jpg" }
        ]
    },
    {
        id: 3,
        name: "CORE VEST",
        price: 1850,
        tag: "THERMAL",
        variants: [
            { colorName: "Olive", colorHex: "#4b5320", image: "/placeholder-5.jpg" },
            { colorName: "Sand", colorHex: "#d2b48c", image: "/placeholder-6.jpg" },
            { colorName: "Onyx", colorHex: "#111111", image: "/placeholder-7.jpg" }
        ]
    },
    {
        id: 4,
        name: "TECH RUNNER 4D",
        price: 3200,
        tag: "FOOTWEAR",
        variants: [
            { colorName: "Ghost", colorHex: "#f0f0f0", image: "/placeholder-8.jpg" },
            { colorName: "Volt", colorHex: "#ccff00", image: "/placeholder-9.jpg" }
        ]
    },
];

export const ProductShowcase = () => {
    return (
        <section className="px-6 md:px-12 py-24 bg-white text-black border-t border-gray-100">

            {/* HEADER DE LA SECCIÓN */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2 block">
                        [ New_Arrivals ]
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter">
                        System Essentials
                    </h2>
                </div>

                {/* BOTÓN 'VER TODO' (Desktop) */}
                <Link
                    href="/shop"
                    className="hidden md:block font-mono text-xs border border-gray-200 px-6 py-3 hover:bg-black hover:text-white transition-colors uppercase"
                >
                    View Full Catalog -&gt;
                </Link>
            </div>

            {/* GRID RESPONSIVO */}
            {/* Se ajusta: 1 columna en móvil, 2 en tablet, 4 en desktop grande */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* BOTÓN 'VER TODO' (Móvil) */}
            <div className="mt-12 md:hidden">
                <Link
                    href="/shop"
                    className="block w-full text-center font-mono text-xs border border-black px-6 py-4 hover:bg-black hover:text-white transition-colors uppercase font-bold"
                >
                    View Full Catalog
                </Link>
            </div>
        </section>
    );
};