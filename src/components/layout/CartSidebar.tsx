"use client";

import { useCartStore } from "@/store/cartStore";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const CartSidebar = () => {
    const { items, isOpen, closeCart, removeItem, addItem } = useCartStore();

    // Solución para evitar error de Hidratación con Persist
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return null;

    // Calcular total
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop (Fondo oscuro) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-nor-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Panel Lateral */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-nor-white border-l border-nor-dark/10 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header del Carrito */}
                        <div className="flex items-center justify-between p-6 border-b border-nor-dark/10 bg-white">
                            <h2 className="font-display text-2xl uppercase tracking-tighter flex items-center gap-2">
                                System Cart <span className="text-nor-accent text-sm font-mono align-top">[{items.length}]</span>
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-nor-concrete rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Lista de Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-nor-dark/40 space-y-4">
                                    <ShoppingBag size={48} strokeWidth={1} />
                                    <p className="font-mono text-sm uppercase tracking-widest">System Empty</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-4 p-4 border border-nor-dark/5 bg-nor-concrete/30 rounded-sm"
                                    >
                                        {/* Imagen */}
                                        <div className="relative w-20 h-24 bg-nor-concrete shrink-0 overflow-hidden border border-nor-dark/10">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-display text-sm uppercase leading-tight pr-4">
                                                        {item.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-nor-dark/40 hover:text-nor-accent transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                                <p className="font-mono text-[10px] text-nor-dark/60 mt-1 uppercase tracking-wider">
                                                    {item.size} / {item.color}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                {/* Control de Cantidad */}
                                                <div className="flex items-center border border-nor-dark/20 bg-white h-8">
                                                    {/* Truco: Para bajar cantidad, agregamos cantidad negativa */}
                                                    <button
                                                        className="px-2 hover:bg-nor-concrete h-full flex items-center"
                                                        onClick={() => addItem({ ...item, quantity: -1 })}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="font-mono text-xs w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        className="px-2 hover:bg-nor-concrete h-full flex items-center"
                                                        onClick={() => addItem({ ...item, quantity: 1 })}
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>

                                                <p className="font-mono text-sm font-bold">
                                                    ${(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-nor-dark/10 bg-nor-concrete/20">
                                <div className="flex justify-between items-center mb-4 font-mono uppercase text-sm">
                                    <span className="text-nor-dark/60">Subtotal</span>
                                    <span className="font-bold text-lg">${total.toLocaleString()} MXN</span>
                                </div>
                                <button className="w-full bg-nor-black text-white py-4 font-mono text-xs uppercase font-bold tracking-[0.2em] hover:bg-nor-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    Proceed to Checkout
                                </button>
                                <p className="text-center mt-3 text-[10px] text-nor-dark/40 font-mono uppercase">
                                    Shipping & Taxes calculated at checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};