"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, Ruler, Share2 } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useCartStore } from "@/store/cartStore";
import { getProductBySlug } from "@/lib/data";

// Tallas estándar (puedes moverlas a data.ts si varían por producto)
const STANDARD_SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {

    // 1. Desempaquetamos los params (Next.js 15)
    const { slug } = use(params);

    // 2. Buscamos el producto
    const product = getProductBySlug(slug);

    // 3. Manejo de 404 / Loading
    if (!product) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-nor-white text-nor-black font-mono">
                <h1 className="text-2xl font-bold mb-2">404 // SYSTEM ERROR</h1>
                <p className="text-sm text-nor-dark/60">PRODUCT_NOT_FOUND_IN_DATABASE</p>
            </div>
        );
    }

    // Unimos la imagen principal con las de las variantes para la galería
    const galleryImages = [product.mainImage, ...product.variants.map(v => v.image)];

    // --- ESTADOS ---
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Hooks del Store
    const { addItem, openCart } = useCartStore();

    // Efecto: Cuando cambia la variante de color, cambiamos la imagen principal
    useEffect(() => {
        if (selectedVariant) {
            const index = galleryImages.findIndex(img => img === selectedVariant.image);
            if (index !== -1) setCurrentImageIndex(index);
        }
    }, [selectedVariant, galleryImages]);

    // --- HANDLER: AGREGAR AL CARRITO ---
    const handleAddToCart = () => {
        if (!selectedSize) return;

        addItem({
            // NOTA: No enviamos 'id'. El store lo genera automáticamente (Nombre + Talla + Color)
            name: product.name,
            price: product.price,
            image: selectedVariant ? selectedVariant.image : product.mainImage,
            size: selectedSize,
            quantity: quantity,
            color: selectedVariant ? selectedVariant.colorName : "Standard",
        });

        openCart(); // Abrimos el sidebar automáticamente
    };

    return (
        <main className="min-h-screen bg-nor-white text-nor-black pt-24 md:pt-32 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* --- COLUMNA IZQUIERDA: GALERÍA --- */}
                    <div className="w-full lg:w-3/5 space-y-4">
                        {/* Imagen Principal */}
                        <div className="relative aspect-[4/5] bg-nor-concrete overflow-hidden w-full border border-nor-dark/5 group">
                            <motion.img
                                key={currentImageIndex} // Key fuerza re-render para la animación
                                src={galleryImages[currentImageIndex]}
                                alt={product.name}
                                initial={{ opacity: 0.8 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full object-cover"
                            />

                            {/* Tags Flotantes */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="bg-nor-black text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                                    {product.tag || "NØR-TECH"}
                                </span>
                            </div>
                        </div>

                        {/* Miniaturas */}
                        <div className="grid grid-cols-5 gap-2 md:gap-4">
                            {galleryImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`aspect-square bg-nor-concrete border transition-all overflow-hidden ${currentImageIndex === idx
                                        ? 'border-nor-black ring-1 ring-nor-black opacity-100'
                                        : 'border-transparent hover:border-nor-dark/20 opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: INFO Y COMPRA --- */}
                    <div className="w-full lg:w-2/5 lg:sticky lg:top-32 h-fit">

                        {/* Cabecera del Producto */}
                        <div className="mb-8 border-b border-nor-dark/10 pb-6">
                            <h1 className="font-display text-4xl md:text-5xl uppercase font-bold tracking-tighter leading-[0.9] mb-4">
                                {product.name}
                            </h1>
                            <div className="flex justify-between items-end font-mono">
                                <span className="text-xl md:text-2xl font-medium">
                                    ${product.price.toLocaleString()} MXN
                                </span>
                                <div className="flex items-center gap-2 text-xs text-green-600">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    SYSTEM_READY
                                </div>
                            </div>
                        </div>

                        {/* Selector de Variantes (Color) */}
                        <div className="mb-8">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-nor-dark/60 block mb-3">
                                Color: <span className="text-nor-black font-bold">{selectedVariant?.colorName}</span>
                            </span>
                            <div className="flex gap-3">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.colorName}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${selectedVariant.colorName === variant.colorName
                                            ? "ring-2 ring-offset-2 ring-nor-black border-nor-black"
                                            : "border-nor-dark/20 hover:scale-110"
                                            }`}
                                        style={{ backgroundColor: variant.colorHex }}
                                        title={variant.colorName}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Selector de Talla */}
                        <div className="mb-8">
                            <div className="flex justify-between mb-4">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-nor-dark/60">
                                    Select Size
                                </span>
                                <button className="flex items-center gap-1 font-mono text-[10px] uppercase underline hover:text-nor-accent transition-colors">
                                    <Ruler size={12} /> Size Guide
                                </button>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {STANDARD_SIZES.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`h-12 border font-mono text-sm transition-all ${selectedSize === size
                                            ? "bg-nor-black text-white border-nor-black"
                                            : "bg-transparent text-nor-dark border-nor-dark/20 hover:border-nor-black hover:bg-nor-concrete"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            {/* Mensaje de error si intenta comprar sin talla */}
                            {!selectedSize && (
                                <p className="mt-2 font-mono text-[10px] text-nor-dark/40">
                                    * REQUIRED_FIELD
                                </p>
                            )}
                        </div>

                        {/* Controles de Cantidad y Botón de Acción */}
                        <div className="flex gap-4 mb-10">
                            {/* Cantidad */}
                            <div className="flex items-center border border-nor-dark/20 w-32 justify-between px-2 bg-white">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 hover:text-nor-accent transition-colors"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="font-mono text-sm">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 hover:text-nor-accent transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            {/* Botón Principal */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 font-mono text-xs uppercase font-bold tracking-[0.15em] transition-all
                                    ${!selectedSize
                                        ? "bg-nor-dark/10 text-nor-dark/40 cursor-not-allowed"
                                        : "bg-nor-black text-white hover:bg-nor-dark hover:scale-[1.02] active:scale-[0.98]"
                                    }
                                `}
                            >
                                {selectedSize ? "Initialize System" : "Select Size"}
                                {selectedSize && <ArrowRight size={16} />}
                            </button>
                        </div>

                        {/* Acordeones de Detalles */}
                        <div className="border-t border-nor-dark/10">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="description">
                                    <AccordionTrigger className="font-mono text-xs uppercase tracking-widest hover:no-underline hover:text-nor-accent py-5">
                                        Description
                                    </AccordionTrigger>
                                    <AccordionContent className="font-body text-sm text-nor-dark/70 leading-relaxed pb-4">
                                        {product.description}
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="specs">
                                    <AccordionTrigger className="font-mono text-xs uppercase tracking-widest hover:no-underline hover:text-nor-accent py-5">
                                        Technical Specs
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-4">
                                        <ul className="space-y-3">
                                            {product.features && product.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 font-mono text-[10px] uppercase text-nor-dark/80">
                                                    <span className="w-1 h-1 bg-nor-accent rounded-full"></span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="shipping">
                                    <AccordionTrigger className="font-mono text-xs uppercase tracking-widest hover:no-underline hover:text-nor-accent py-5">
                                        Shipping & Returns
                                    </AccordionTrigger>
                                    <AccordionContent className="font-body text-xs text-nor-dark/70 pb-4">
                                        <p className="mb-2">Envío estándar gratuito en pedidos superiores a $2,000 MXN.</p>
                                        <p>Se aceptan devoluciones dentro de los 30 días posteriores a la entrega si el producto conserva sus etiquetas y estado original.</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}