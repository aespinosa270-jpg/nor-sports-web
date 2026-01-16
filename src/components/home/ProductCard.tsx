"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // Formateo de moneda consistente con el diseño técnico
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const isOnSale = product.originalPrice && product.originalPrice > product.price;

    return (
        <Link href={`/shop/${product.slug}`} className="group block h-full">
            <div className="relative w-full aspect-[3/4] bg-nor-concrete overflow-hidden mb-4 border border-black/5 group-hover:border-black/20 transition-colors">

                {/* ETIQUETAS DINÁMICAS */}
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

                {/* IMAGEN OPTIMIZADA */}
                <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    // Cargamos con prioridad solo los primeros productos para mejorar el LCP
                    priority={product.id === "1"}
                />

                {/* Overlay sutil al hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Botón Inspeccionar (Solo Desktop) */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden md:flex justify-center pointer-events-none">
                    <span className="bg-white/95 backdrop-blur text-black font-mono text-[10px] font-bold px-4 py-3 uppercase tracking-[0.2em] w-full text-center shadow-lg border border-black/5">
                        INSPECCIONAR_SISTEMA
                    </span>
                </div>
            </div>

            {/* INFORMACIÓN TÉCNICA */}
            <div className="flex flex-col gap-1 px-1">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display text-base md:text-lg text-nor-black leading-[1.1] group-hover:text-red-600 transition-colors uppercase font-bold tracking-tighter">
                        {product.name}
                    </h3>

                    <div className="flex flex-col items-end shrink-0">
                        <span className={`font-mono text-sm font-bold ${isOnSale ? 'text-red-600' : 'text-nor-black'}`}>
                            {formatPrice(product.price)}
                        </span>
                        {isOnSale && (
                            <span className="font-mono text-[9px] text-gray-400 line-through decoration-red-500/50">
                                {formatPrice(product.originalPrice!)}
                            </span>
                        )}
                    </div>
                </div>

                <p className="text-[9px] text-gray-500 font-mono uppercase tracking-[0.1em] mt-1">
                    {product.category} // {product.features[0] || "HIGH_PERFORMANCE"}
                </p>

                {/* SELECTOR DE COLOR (VISUAL) */}
                {product.variants && product.variants.length > 0 && (
                    <div className="flex gap-1.5 mt-3">
                        {product.variants.map((variant, index) => (
                            <div
                                key={index}
                                className="w-3.5 h-3.5 rounded-full border border-black/10 transition-transform hover:scale-125"
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