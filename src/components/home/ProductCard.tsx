"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <--- Necesario para mostrar fotos reales
import { motion, AnimatePresence } from "framer-motion";
import { IoAdd } from "react-icons/io5";
import { Product } from "@/lib/data"; // <--- Importamos la definición REAL

export const ProductCard = ({ product }: { product: Product }) => {
    // Estado para saber qué variante (color) está seleccionada visualmente
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Determinamos qué imagen mostrar: 
    // Si hay variantes, mostramos la del color seleccionado. Si no, la mainImage.
    const currentImage = product.variants && product.variants.length > 0
        ? product.variants[selectedVariantIndex].image
        : product.mainImage;

    return (
        // CAMBIO CRÍTICO: Usamos product.slug para que coincida con tu data.ts
        <Link href={`/shop/${product.slug}`} className="block h-full">
            <div
                className="group relative flex flex-col gap-3 cursor-pointer h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* --- CONTENEDOR DE IMAGEN --- */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5] border border-transparent group-hover:border-black/5 transition-colors">

                    {/* Tag Superior */}
                    {product.tag && (
                        <div className="absolute top-2 left-2 z-20">
                            <span className="bg-black text-white text-[9px] font-mono px-2 py-1 uppercase tracking-wider">
                                [{product.tag}]
                            </span>
                        </div>
                    )}

                    {/* Animación de Cambio de Imagen (Framer Motion) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImage} // La clave cambia cuando cambia la imagen
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            {/* IMAGEN REAL DEL PRODUCTO */}
                            <Image
                                src={currentImage}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Botón Quick Add (Solo aparece en Hover) */}
                    <div className={`absolute inset-0 bg-black/5 flex items-end justify-center pb-6 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                        <button
                            onClick={(e) => {
                                e.preventDefault(); // Evita que abra la página del producto al dar click
                                alert("Sistema de Añadido Rápido: En Desarrollo");
                            }}
                            className="bg-white text-black font-mono text-xs font-bold uppercase py-3 px-8 hover:bg-black hover:text-white transition-colors flex items-center gap-2 shadow-xl z-30"
                        >
                            <IoAdd size={14} /> Quick Add
                        </button>
                    </div>
                </div>

                {/* --- INFORMACIÓN DEL PRODUCTO --- */}
                <div className="flex flex-col gap-1 px-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-body font-bold text-sm uppercase tracking-wide group-hover:underline underline-offset-4 decoration-black">
                            {product.name}
                        </h3>
                        <span className="font-mono text-xs text-black font-medium">
                            ${product.price.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex justify-between items-center mt-1">
                        <p className="text-[10px] text-gray-500 font-mono uppercase">
                            {product.category}
                        </p>

                        {/* Selector de Colores (Miniaturas) */}
                        <div className="flex gap-2 h-4 z-20 relative">
                            {product.variants?.map((variant, index) => (
                                <button
                                    key={index}
                                    // Al hacer click (o hover), cambiamos la foto pero NO navegamos
                                    onMouseEnter={() => setSelectedVariantIndex(index)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedVariantIndex(index);
                                    }}
                                    className={`w-3 h-3 rounded-full border border-gray-300 transition-all duration-200 ${selectedVariantIndex === index ? "ring-1 ring-black scale-110" : "hover:scale-110"}`}
                                    style={{ backgroundColor: variant.colorHex }}
                                    title={variant.colorName}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;