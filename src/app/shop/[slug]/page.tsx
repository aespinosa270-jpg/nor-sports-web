"use client";

import { useState, useEffect, use } from "react"; // <--- 1. IMPORTANTE: Agregamos 'use'
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, Ruler, Check } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useCartStore } from "@/store/cartStore";
import { getProductBySlug } from "@/lib/data";

const STANDARD_SIZES = ["XS", "S", "M", "L", "XL"];

// 2. IMPORTANTE: Definimos params como una Promesa
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {

    // 3. IMPORTANTE: Desempaquetamos el slug usando el hook 'use'
    const { slug } = use(params);

    // Ahora sí buscamos el producto usando el slug limpio
    const product = getProductBySlug(slug);

    // Si no existe, mandamos a 404
    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center bg-nor-white text-nor-black font-mono">
                PRODUCT_NOT_FOUND // SYSTEM_ERROR
            </div>
        );
    }

    // Unimos la imagen principal con las de las variantes
    const galleryImages = [product.mainImage, ...product.variants.map(v => v.image)];

    // ESTADOS
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { addItem, openCart } = useCartStore();

    useEffect(() => {
        if (selectedVariant) {
            const index = galleryImages.findIndex(img => img === selectedVariant.image);
            if (index !== -1) setCurrentImageIndex(index);
        }
    }, [selectedVariant]);

    const handleAddToCart = () => {
        if (!selectedSize) return;

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: selectedVariant ? selectedVariant.image : product.mainImage,
            size: selectedSize,
            quantity: quantity,
            color: selectedVariant ? selectedVariant.colorName : "Standard",
        });

        openCart();
    };
    return (
        <main className="min-h-screen bg-nor-white text-nor-black pt-24 md:pt-32 pb-20">

            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* --- COLUMNA IZQUIERDA: GALERÍA --- */}
                    <div className="w-full lg:w-3/5 space-y-4">
                        <div className="relative aspect-[4/5] bg-nor-concrete overflow-hidden w-full border border-nor-dark/5 group">
                            <motion.img
                                key={currentImageIndex}
                                src={galleryImages[currentImageIndex]}
                                alt={product.name}
                                initial={{ opacity: 0.8, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-nor-black text-white px-3 py-1 font-mono text-xs uppercase tracking-widest z-10">
                                [ {product.tag || "NØR-TECH"} ]
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-4">
                            {galleryImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`aspect-square bg-nor-concrete border transition-all overflow-hidden ${currentImageIndex === idx ? 'border-nor-black ring-1 ring-nor-black' : 'border-transparent hover:border-nor-dark/20'
                                        }`}
                                >
                                    <img src={img} alt="thumbnail" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: INFO --- */}
                    <div className="w-full lg:w-2/5 lg:sticky lg:top-32 h-fit">

                        <div className="mb-8 border-b border-nor-dark/10 pb-6">
                            <h1 className="font-display text-4xl md:text-5xl uppercase font-bold tracking-tighter leading-[0.9] mb-4">
                                {product.name}
                            </h1>
                            <div className="flex justify-between items-center font-mono text-lg md:text-xl">
                                <span>${product.price.toLocaleString()} MXN</span>
                                <span className="text-xs text-nor-accent animate-pulse">STOCK: AVAILABLE</span>
                            </div>
                        </div>

                        {/* Variantes */}
                        <div className="mb-8">
                            <span className="font-mono text-xs uppercase tracking-widest text-nor-dark/60 block mb-3">
                                Select Color: <span className="text-black font-bold">{selectedVariant?.colorName}</span>
                            </span>
                            <div className="flex gap-3">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.colorName}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`w-8 h-8 rounded-full border border-nor-dark/20 flex items-center justify-center transition-transform hover:scale-110 ${selectedVariant.colorName === variant.colorName ? "ring-2 ring-offset-2 ring-nor-black" : ""
                                            }`}
                                        style={{ backgroundColor: variant.colorHex }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Tallas */}
                        <div className="mb-8">
                            <div className="flex justify-between mb-4">
                                <span className="font-mono text-xs uppercase tracking-widest text-nor-dark/60">Select Size</span>
                                <button className="flex items-center gap-1 font-mono text-xs uppercase underline hover:text-nor-accent">
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
                                            : "bg-transparent text-nor-dark border-nor-dark/20 hover:border-nor-black"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {!selectedSize && (
                                <p className="mt-2 font-mono text-[10px] text-nor-accent animate-pulse">
                                    * SELECCIONA UNA TALLA PARA CONTINUAR
                                </p>
                            )}
                        </div>

                        {/* Botones Compra */}
                        <div className="flex gap-4 mb-10">
                            <div className="flex items-center border border-nor-black w-32 justify-between px-4">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-nor-accent py-2"><Minus size={16} /></button>
                                <span className="font-mono text-sm">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="hover:text-nor-accent py-2"><Plus size={16} /></button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                                className="flex-1 bg-nor-black text-white font-mono text-xs uppercase font-bold tracking-widest hover:bg-nor-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 py-4 active:scale-95"
                            >
                                Add to System
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        {/* Acordeones */}
                        <div className="border-t border-nor-dark/10">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="description">
                                    <AccordionTrigger className="font-mono text-xs uppercase tracking-widest hover:no-underline hover:text-nor-accent py-4">
                                        Description
                                    </AccordionTrigger>
                                    <AccordionContent className="font-body text-sm text-nor-dark/70 leading-relaxed">
                                        {product.description}
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="specs">
                                    <AccordionTrigger className="font-mono text-xs uppercase tracking-widest hover:no-underline hover:text-nor-accent py-4">
                                        Technical Specs
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-2">
                                            {product.features && product.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 font-mono text-[10px] uppercase border-b border-nor-dark/5 pb-1 last:border-0">
                                                    <span className="w-1.5 h-1.5 bg-nor-accent rounded-full"></span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="shipping">
                                    <AccordionTrigger className="font-mono text-xs uppercase tracking-widest hover:no-underline hover:text-nor-accent py-4">
                                        Shipping & Returns
                                    </AccordionTrigger>
                                    <AccordionContent className="font-body text-xs text-nor-dark/70">
                                        Envíos Express a todo México (1-3 días hábiles). Devoluciones gratuitas dentro de los primeros 30 días si el equipamiento mantiene sus etiquetas originales.
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