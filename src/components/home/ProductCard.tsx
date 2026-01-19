"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // Detectar si está explícitamente agotado
    // Si inStock es undefined (no existe en la data), asumimos que hay stock (isOutOfStock = false)
    const isOutOfStock = product.inStock === false;

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const isOnSale = product.originalPrice && product.originalPrice > product.price;

    return (
        <Link
            href={`/shop/${product.slug}`}
            className={`group block h-full ${isOutOfStock ? 'cursor-default' : 'cursor-pointer'}`}
        >
            {/* Contenedor de Imagen */}
            <div className="relative w-full aspect-[3/4] bg-nor-concrete overflow-hidden mb-4 border border-black/5 group-hover:border-black/20 transition-colors">

                {/* --- LÓGICA DE ETIQUETAS Y OVERLAYS --- */}

                {/* Caso 1: AGOTADO */}
                {isOutOfStock ? (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                        <span className="bg-black text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] border border-white/20">
                            AGOTADO
                        </span>
                    </div>
                ) : (
                    // Caso 2: DISPONIBLE (Mostrar etiquetas de oferta o tag)
                    <>
                        {isOnSale ? (
                            <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-3 py-1 animate-pulse">
                                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                                    {product.discountTag || "OFERTA"}
                                </span>
                            </div>
                        ) : product.tag && (
                            <div className="absolute top-2 left-2 z-10 bg-black/90 backdrop-blur-sm px-2 py-1">
                                <span className="text-[10px] font-mono text-white tracking-widest uppercase">
                                    {product.tag}
                                </span>
                            </div>
                        )}
                    </>
                )}

                {/* IMAGEN DEL PRODUCTO */}
                <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className={`object-cover object-center transition-transform duration-700 ${isOutOfStock ? 'grayscale opacity-60' : 'group-hover:scale-105'
                        }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={product.id === "1"}
                />

                {/* OVERLAY OSCURO AL HOVER (Solo si hay stock) */}
                {!isOutOfStock && (
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}

                {/* BOTÓN INSPECCIONAR (Solo si hay stock) */}
                {!isOutOfStock && (
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden md:flex justify-center pointer-events-none">
                        <span className="bg-white/95 backdrop-blur text-black font-mono text-[10px] font-bold px-4 py-3 uppercase tracking-[0.2em] w-full text-center shadow-lg border border-black/5">
                            INSPECCIONAR_SISTEMA
                        </span>
                    </div>
                )}
            </div>

            {/* INFORMACIÓN DEL PRODUCTO */}
            <div className="flex flex-col gap-1 px-1">
                <div className="flex justify-between items-start gap-4">
                    {/* TÍTULO */}
                    <h3 className={`font-display text-base md:text-lg leading-[1.1] uppercase font-bold tracking-tighter transition-colors ${isOutOfStock ? 'text-gray-400' : 'text-nor-black group-hover:text-red-600'
                        }`}>
                        {product.name}
                    </h3>

                    {/* PRECIO */}
                    <div className="flex flex-col items-end shrink-0">
                        <span className={`font-mono text-sm font-bold ${isOutOfStock ? 'text-gray-400 line-through' : (isOnSale ? 'text-red-600' : 'text-nor-black')
                            }`}>
                            {formatPrice(product.price)}
                        </span>

                        {/* Precio original tachado (Solo si hay stock y está en oferta) */}
                        {!isOutOfStock && isOnSale && (
                            <span className="font-mono text-[9px] text-gray-400 line-through decoration-red-500/50">
                                {formatPrice(product.originalPrice!)}
                            </span>
                        )}
                    </div>
                </div>

                {/* CATEGORÍA / TAG TÉCNICO */}
                <p className="text-[9px] text-gray-500 font-mono uppercase tracking-[0.1em] mt-1">
                    {product.category} // {product.features[0] || "HIGH_PERFORMANCE"}
                </p>

                {/* VARIANTES DE COLOR */}
                {product.variants && product.variants.length > 0 && (
                    <div className="flex gap-1.5 mt-3">
                        {product.variants.map((variant, index) => (
                            <div
                                key={index}
                                className={`w-3.5 h-3.5 rounded-full border border-black/10 transition-transform ${isOutOfStock ? 'opacity-50' : 'hover:scale-125'
                                    }`}
                                style={{ backgroundColor: variant.colorHex }}
                                title={variant.colorName}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
};