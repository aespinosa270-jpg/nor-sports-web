import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/data"; // Importamos la interfaz que definiste

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    // Formateador de moneda (MXN)
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Link href={`/shop/${product.slug}`} className="group block h-full">
            {/* --- Contenedor de Imagen --- */}
            <div className="relative w-full aspect-[3/4] bg-neutral-900 overflow-hidden mb-4 border border-white/5">

                {/* Badge / Tag Técnico (Ej: BREATHABLE) */}
                {product.tag && (
                    <div className="absolute top-2 left-2 z-10 bg-black/80 backdrop-blur-sm px-2 py-1 border border-white/10">
                        <span className="text-[10px] font-mono text-white tracking-widest uppercase">
                            {product.tag}
                        </span>
                    </div>
                )}

                {/* Imagen Principal */}
                {/* Nota: Usamos 'group-hover' para un efecto de zoom suave */}
                <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay sutil al hover */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* --- Info del Producto --- */}
            <div className="flex flex-col gap-1">
                {/* Nombre y Precio */}
                <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display text-lg text-white leading-tight group-hover:text-gray-300 transition-colors">
                        {product.name}
                    </h3>
                    <span className="font-mono text-sm text-gray-400 whitespace-nowrap">
                        {formatPrice(product.price)}
                    </span>
                </div>

                {/* Categoría (Opcional, o descripción corta) */}
                <p className="text-xs text-gray-600 font-mono uppercase tracking-wide">
                    {product.category} // {product.features[0] || "High Performance"}
                </p>

                {/* --- Indicadores de Color (Variantes) --- */}
                {product.variants && product.variants.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {product.variants.map((variant, index) => (
                            <div
                                key={index}
                                className="w-3 h-3 rounded-full border border-white/20"
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