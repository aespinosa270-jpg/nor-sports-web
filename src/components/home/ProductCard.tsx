"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IoAdd } from "react-icons/io5";

// Interfaces para TypeScript
export interface ProductVariant {
    colorName: string;
    colorHex: string;
    image: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    tag: string;
    variants: ProductVariant[];
}

export const ProductCard = ({ product }: { product: Product }) => {
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Fallback seguro por si variants viene vacío
    const currentVariant = product.variants?.[selectedVariant] || {
        colorName: "N/A",
        colorHex: "#000",
        image: ""
    };

    return (
        // Envolvemos en Link para ir a la página de detalle
        <Link href={`/shop/${product.id}`} className="block">
            <div
                className="group relative flex flex-col gap-3 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* 1. CONTENEDOR DE IMAGEN */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]">

                    {/* Badge Técnico */}
                    <div className="absolute top-2 left-2 z-20">
                        <span className="bg-black text-white text-[9px] font-mono px-2 py-1 uppercase tracking-wider">
                            [{product.tag}]
                        </span>
                    </div>

                    {/* Imagen (Placeholder visual) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentVariant.colorName}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center bg-gray-100"
                        >
                            {/* Simulación de foto */}
                            <div className="text-center opacity-30 group-hover:scale-105 transition-transform duration-700">
                                <span className="block font-display text-4xl font-bold">NØR</span>
                                <span className="font-mono text-xs mt-2 block">{currentVariant.colorName}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Overlay "Quick Add" */}
                    <div className={`absolute inset-0 bg-black/5 flex items-end justify-center pb-6 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                        <button
                            onClick={(e) => {
                                e.preventDefault(); // Evita navegar al hacer clic en Quick Add
                                alert("Quick Add Logic Coming Soon");
                            }}
                            className="bg-white text-black font-mono text-xs font-bold uppercase py-3 px-8 hover:bg-black hover:text-white transition-colors flex items-center gap-2 shadow-xl"
                        >
                            <IoAdd size={14} /> Quick Add
                        </button>
                    </div>
                </div>

                {/* 2. INFO */}
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-body font-bold text-sm uppercase tracking-wide group-hover:underline underline-offset-4">
                            {product.name}
                        </h3>
                        <span className="font-mono text-xs text-black">
                            ${product.price.toLocaleString()}
                        </span>
                    </div>

                    {/* 3. SWATCHES DE COLOR */}
                    <div className="flex gap-2 mt-2 h-6">
                        {product.variants?.map((variant, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault(); // Evita navegar al cambiar color
                                    setSelectedVariant(index);
                                }}
                                className={`w-4 h-4 border transition-all duration-200 ${selectedVariant === index
                                    ? "border-black scale-110 shadow-sm"
                                    : "border-transparent hover:border-gray-300"
                                    }`}
                                style={{ backgroundColor: variant.colorHex }}
                                title={variant.colorName}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};