"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, Ruler } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
// IMPORTAMOS EL STORE DE ZUSTAND
import { useCartStore } from "@/store/cartStore";

// Mock Data
const PRODUCT = {
    name: "AERO-DRY SHELL",
    price: 2890,
    description: "Chamarra técnica ultraligera diseñada para climas inestables. Membrana hidrofóbica de 3 capas con costuras selladas térmicamente.",
    specs: [
        { label: "Material", value: "100% Nylon Ripstop" },
        { label: "Weight", value: "240g" },
        { label: "Fit", value: "Regular / Articulated" },
        { label: "Tech", value: "DWR Coating / YKK Zippers" },
    ],
    images: [
        "/assets/p1-black.jpg",
        "/assets/p1-detail.jpg",
        "/assets/p1-back.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
};

export default function ProductPage({ params }: { params: { slug: string } }) {
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);

    // CONECTAMOS CON LA LÓGICA DEL CARRITO
    const { addItem, openCart } = useCartStore();

    // FUNCIÓN PARA AGREGAR AL CARRITO
    const handleAddToCart = () => {
        if (!selectedSize) return;

        addItem({
            name: PRODUCT.name,
            price: PRODUCT.price,
            image: PRODUCT.images[0], // En el futuro usarás la imagen real
            size: selectedSize,
            quantity: quantity,
        });

        // Abrimos el drawer para dar feedback visual inmediato
        openCart();
    };

    return (
        <main className="min-h-screen bg-nor-white text-nor-black pt-24 md:pt-32 pb-20">

            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* --- COLUMNA IZQUIERDA: GALERÍA VISUAL --- */}
                    <div className="w-full lg:w-3/5 space-y-4">
                        <div className="relative aspect-[4/5] bg-nor-concrete overflow-hidden w-full border border-nor-dark/5">
                            <motion.div
                                key={currentImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full bg-nor-concrete flex items-center justify-center"
                            >
                                {/* Placeholder visual */}
                                <div className="text-nor-dark/20 font-mono text-xs tracking-widest">
                                    IMG_SOURCE_0{currentImage + 1} // RENDER_3D
                                </div>
                            </motion.div>

                            <div className="absolute top-4 left-4 bg-nor-black text-white px-3 py-1 font-mono text-xs uppercase tracking-widest z-10">
                                [ Waterproof ]
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {PRODUCT.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImage(idx)}
                                    className={`aspect-square bg-nor-concrete border transition-all ${currentImage === idx ? 'border-nor-black' : 'border-transparent hover:border-nor-dark/20'
                                        }`}
                                >
                                    <div className="flex items-center justify-center h-full text-[10px] text-nor-dark/30 font-mono">
                                        0{idx + 1}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: DATOS & COMPRA --- */}
                    <div className="w-full lg:w-2/5 lg:sticky lg:top-32 h-fit">

                        <div className="mb-8 border-b border-nor-dark/10 pb-6">
                            <h1 className="font-display text-4xl md:text-5xl uppercase font-bold tracking-tighter leading-[0.9] mb-4">
                                {PRODUCT.name}
                            </h1>
                            <div className="flex justify-between items-center font-mono text-lg md:text-xl">
                                <span>${PRODUCT.price.toLocaleString()} MXN</span>
                                <span className="text-xs text-nor-accent animate-pulse">STOCK: LOW</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between mb-4">
                                <span className="font-mono text-xs uppercase tracking-widest text-nor-dark/60">Select Size</span>
                                <button className="flex items-center gap-1 font-mono text-xs uppercase underline hover:text-nor-accent">
                                    <Ruler size={12} /> Size Guide
                                </button>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {PRODUCT.sizes.map((size) => (
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

                        {/* BOTONES DE ACCIÓN */}
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

                        <div className="border-t border-nor-dark/10">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="description">
                                    <AccordionTrigger className="font-mono text-xs uppercase tracking-widest hover:no-underline hover:text-nor-accent py-4">
                                        Description
                                    </AccordionTrigger>
                                    <AccordionContent className="font-body text-sm text-nor-dark/70 leading-relaxed">
                                        {PRODUCT.description}
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="specs">
                                    <AccordionTrigger className="font-mono text-xs uppercase tracking-widest hover:no-underline hover:text-nor-accent py-4">
                                        Technical Specs
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-2">
                                            {PRODUCT.specs.map((spec, i) => (
                                                <li key={i} className="flex justify-between font-mono text-[10px] uppercase border-b border-nor-dark/5 pb-1 last:border-0">
                                                    <span className="text-nor-dark/50">{spec.label}</span>
                                                    <span>{spec.value}</span>
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
                                        Envíos Express a todo México (1-3 días hábiles). Devoluciones gratuitas dentro de los primeros 30 días si el producto mantiene sus etiquetas originales.
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