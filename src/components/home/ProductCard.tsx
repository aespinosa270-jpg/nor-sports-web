import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // Helper para formatear dinero
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2, // Muestra centavos para mayor precisión técnica
        }).format(amount);
    };

    // Detectar si está en oferta
    const isOnSale = product.originalPrice && product.originalPrice > product.price;

    return (
        <Link href={`/shop/${product.slug}`} className="group block h-full">
            <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden mb-4 border border-black/5 group-hover:border-black/20 transition-colors">

                {/* ETIQUETA SUPERIOR: Prioridad a OFERTA, si no, muestra el TAG normal */}
                {isOnSale ? (
                    <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-3 py-1 animate-pulse">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                            {product.discountTag || "OFERTA"}
                        </span>
                    </div>
                ) : product.tag && (
                    <div className="absolute top-2 left-2 z-10 bg-nor-black/90 backdrop-blur-sm px-2 py-1">
                        <span className="text-[10px] font-mono text-white tracking-widest uppercase">
                            {product.tag}
                        </span>
                    </div>
                )}

                <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay sutil al hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Botón "Inspeccionar" (Solo Desktop) */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex justify-center pointer-events-none">
                    <span className="bg-white/90 backdrop-blur text-black font-mono text-[10px] font-bold px-4 py-2 uppercase tracking-widest w-full text-center shadow-sm">
                        INSPECCIONAR
                    </span>
                </div>
            </div>

            {/* INFO DEL PRODUCTO */}
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-display text-lg text-nor-black leading-tight group-hover:text-red-600 transition-colors uppercase">
                        {product.name}
                    </h3>

                    {/* PRECIOS */}
                    <div className="flex flex-col items-end">
                        <span className={`font-mono text-sm font-bold whitespace-nowrap ${isOnSale ? 'text-red-600' : 'text-nor-black'}`}>
                            {formatPrice(product.price)}
                        </span>
                        {isOnSale && (
                            <span className="font-mono text-[10px] text-gray-400 line-through decoration-red-500">
                                {formatPrice(product.originalPrice!)}
                            </span>
                        )}
                    </div>
                </div>

                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">
                    {product.category} // {product.features[0] || "High Performance"}
                </p>

                {/* VARIANTES DE COLOR */}
                {product.variants && product.variants.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {product.variants.map((variant, index) => (
                            <div
                                key={index}
                                className="w-4 h-4 rounded-sm border border-black/10 hover:scale-110 transition-transform cursor-pointer relative group/color"
                                style={{ backgroundColor: variant.colorHex }}
                                title={variant.colorName}
                            >
                                {/* Tooltip básico */}
                                <div className="hidden group-hover/color:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black text-white text-[9px] px-1 py-0.5 whitespace-nowrap">
                                    {variant.colorName}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
};