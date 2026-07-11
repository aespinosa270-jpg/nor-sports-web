"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data";

interface ProductCardProps {
    product: Product;
    index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
    const isOutOfStock = product.inStock === false;

    const formatPrice = (amount: number) =>
        new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 0,
        }).format(amount);

    const isOnSale = product.originalPrice && product.originalPrice > product.price;
    const ref = `NØR-${String(index + 1).padStart(3, "0")}`;

    return (
        <Link
            href={`/shop/${product.slug}`}
            className={`group block h-full ${isOutOfStock ? "cursor-default" : "cursor-pointer"}`}
        >
            {/* Imagen con esquina cortada en diagonal (la barra del Ø) */}
            <div
                className="relative w-full aspect-[3/4] bg-[#0d0d0d] overflow-hidden mb-4 border border-white/10 group-hover:border-red-600/60 transition-colors"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)" }}
            >
                <span className="absolute top-3 right-3 z-20 font-mono text-[9px] tracking-[0.14em] text-white/30 group-hover:text-red-600 transition-colors">
                    REF. {ref}
                </span>

                {isOutOfStock ? (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                        <span className="bg-white text-black px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em]">
                            AGOTADO
                        </span>
                    </div>
                ) : isOnSale ? (
                    <div
                        className="absolute top-3 left-0 z-20 bg-red-600 text-black px-3 py-1"
                        style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}
                    >
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                            {product.discountTag || "OFERTA"}
                        </span>
                    </div>
                ) : product.tag ? (
                    <div className="absolute top-3 left-0 z-20 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1">
                        <span className="text-[10px] font-mono text-white tracking-widest uppercase">
                            {product.tag}
                        </span>
                    </div>
                ) : null}

                <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className={`object-cover object-center transition-transform duration-700 ${isOutOfStock ? "grayscale opacity-50" : "group-hover:scale-105"}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index === 0}
                />

                {/* Glitch RGB al hover */}
                {!isOutOfStock && (
                    <div className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 mix-blend-screen transition-opacity duration-200">
                        <span className="absolute inset-0 bg-red-600/[0.08] animate-[glx_.4s_steps(2)_infinite]" />
                    </div>
                )}

                {!isOutOfStock && (
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden md:flex justify-center pointer-events-none z-20">
                        <span className="bg-red-600 text-black font-mono text-[10px] font-bold px-4 py-3 uppercase tracking-[0.2em] w-full text-center">
                            AGREGAR A LA BOLSA +
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 px-1">
                <div className="flex justify-between items-start gap-4">
                    <h3 className={`font-display text-base md:text-lg leading-[1.1] uppercase font-bold tracking-tighter transition-colors ${isOutOfStock ? "text-white/30" : "text-white group-hover:text-red-600"}`}>
                        {product.name}
                    </h3>

                    <div className="flex flex-col items-end shrink-0">
                        <span className={`font-mono text-sm font-bold ${isOutOfStock ? "text-white/30 line-through" : isOnSale ? "text-red-600" : "text-white"}`}>
                            {formatPrice(product.price)}
                        </span>
                        {!isOutOfStock && isOnSale && (
                            <span className="font-mono text-[9px] text-white/30 line-through decoration-red-500/50">
                                {formatPrice(product.originalPrice!)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Ficha técnica: tela / feature */}
                <div className="mt-2 border-t border-white/10 pt-2 flex justify-between items-center font-mono">
                    <span className="text-[9px] text-white/40 uppercase tracking-[0.1em]">
                        {product.category}
                    </span>
                    <span className="text-[9px] text-white/70 uppercase tracking-[0.08em] text-right">
                        {product.features[0] || "HIGH_PERFORMANCE"}
                    </span>
                </div>

                {product.variants && product.variants.length > 0 && (
                    <div className="flex gap-1.5 mt-3">
                        {product.variants.map((variant, i) => (
                            <div
                                key={i}
                                className={`w-3.5 h-3.5 border border-white/20 transition-transform ${isOutOfStock ? "opacity-50" : "hover:scale-125"}`}
                                style={{ backgroundColor: variant.colorHex }}
                                title={variant.colorName}
                            />
                        ))}
                    </div>
                )}
            </div>

            <style>{`@keyframes glx{0%{transform:translateX(2px)}50%{transform:translateX(-2px)}100%{transform:none}}`}</style>
        </Link>
    );
};
