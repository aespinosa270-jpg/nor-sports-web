"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export const CartDrawer = () => {
    // 1. Quitamos 'total' de aquí porque no existe en el store
    const { isOpen, closeCart, items, removeItem, addItem } = useCartStore();

    // 2. Calculamos el total aquí mismo en tiempo real
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP (Fondo oscuro) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* DRAWER (Panel lateral) */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* HEADER */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="font-display text-xl font-bold uppercase tracking-tighter">
                                Tu Sistema ({items.length})
                            </h2>
                            <button onClick={closeCart} className="hover:rotate-90 transition-transform">
                                <X size={24} />
                            </button>
                        </div>

                        {/* LISTA DE ITEMS */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                    <p className="font-mono text-xs uppercase tracking-widest">El sistema está vacío</p>
                                    <button onClick={closeCart} className="text-black underline font-bold text-sm">
                                        Explorar Equipo
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-4"
                                    >
                                        {/* IMAGEN DEL PRODUCTO */}
                                        <div className="relative w-20 h-24 bg-gray-100 flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* INFO */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-sm uppercase leading-tight pr-4">
                                                        {item.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-500 font-mono mt-1">
                                                    {item.size} / {item.color}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                {/* CONTROLES DE CANTIDAD */}
                                                <div className="flex items-center border border-gray-200">
                                                    <button
                                                        // Lógica simple para restar: Si hay 1, no hace nada (o podrías borrarlo)
                                                        // Para restar de verdad necesitaríamos una función updateQuantity en el store,
                                                        // pero por ahora dejémoslo simple.
                                                        className="p-1 hover:bg-gray-100"
                                                        disabled
                                                    >
                                                        <Minus size={12} className="text-gray-400" />
                                                    </button>
                                                    <span className="px-2 text-xs font-mono">{item.quantity}</span>
                                                    <button
                                                        className="p-1 hover:bg-gray-100"
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

                        {/* FOOTER (TOTAL) */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <span className="font-display uppercase tracking-tight">Total Estimado</span>
                                    <span className="font-mono">${total.toLocaleString()} MXN</span>
                                </div>
                                <p className="text-[10px] text-gray-400 text-center font-mono uppercase">
                                    Impuestos y envío calculados en el checkout
                                </p>
                                <Link href="/checkout" onClick={closeCart}>
                                    <button className="w-full bg-black text-white py-4 font-mono text-xs uppercase font-bold tracking-widest hover:bg-gray-900 transition-colors">
                                        Proceder al Pago
                                    </button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};