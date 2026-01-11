"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react"; // Agregué ArrowRight y ShoppingBag
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

export const CartDrawer = () => {
    // Jalamos las funciones del store
    const { isOpen, closeCart, items, removeItem, addItem } = useCartStore();

    // Calculamos el total en tiempo real
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // --- LÓGICA DE WHATSAPP CHECKOUT ---
    const handleCheckout = () => {
        // 1. PON TU NÚMERO AQUÍ (Código de país + número, sin espacios)
        const phoneNumber = "5215512345678";

        // 2. Construimos el mensaje
        let message = `*NØR SYSTEMS // NEW ORDER*\n\n`;

        items.forEach((item) => {
            message += `▪️ ${item.name}\n   Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}\n   $${(item.price * item.quantity).toLocaleString()}\n\n`;
        });

        message += `*TOTAL SYSTEM: $${total.toLocaleString()} MXN*`;

        // 3. Abrimos WhatsApp
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    // --- MANEJO DE CANTIDAD ---
    // Función auxiliar para restar cantidad sin borrar el item si llega a 0
    const handleDecrease = (item: any) => {
        if (item.quantity > 1) {
            // Si hay más de 1, agregamos -1 (restamos)
            addItem({ ...item, quantity: -1 });
        }
        // Si es 1, no hacemos nada (el usuario debe usar el botón de basura para eliminar)
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                    />

                    {/* DRAWER */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[9999] shadow-2xl flex flex-col border-l border-gray-100"
                    >
                        {/* HEADER */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={20} />
                                <h2 className="font-display text-xl font-bold uppercase tracking-tighter">
                                    System Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
                                </h2>
                            </div>
                            <button onClick={closeCart} className="hover:rotate-90 transition-transform p-2 text-gray-500 hover:text-black">
                                <X size={24} />
                            </button>
                        </div>

                        {/* LISTA DE ITEMS */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4 font-mono">
                                    <ShoppingBag size={48} className="opacity-20" />
                                    <p className="text-xs uppercase tracking-widest">System Offline (Empty)</p>
                                    <button onClick={closeCart} className="text-black underline font-bold text-xs uppercase hover:text-gray-600">
                                        Initialize Scanning
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        // Usamos una key única combinando ID, Talla y Color para evitar bugs visuales
                                        key={`${item.id}-${item.size}-${item.color}`}
                                        className="flex gap-4 group"
                                    >
                                        {/* IMAGEN */}
                                        <div className="relative w-20 h-24 bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* INFO */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-sm uppercase leading-tight pr-4">
                                                        {item.name}
                                                    </h3>
                                                    <button
                                                        // IMPORTANTE: Pasamos los 3 argumentos para borrar el correcto
                                                        onClick={() => removeItem(item.id, item.size, item.color)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase">
                                                    {item.size} / {item.color}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                {/* CONTROLES CANTIDAD */}
                                                <div className="flex items-center border border-gray-200 bg-white">
                                                    <button
                                                        onClick={() => handleDecrease(item)}
                                                        className={`p-1.5 transition-colors ${item.quantity === 1 ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-gray-100 text-black'}`}
                                                        disabled={item.quantity === 1}
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="px-3 text-xs font-mono w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        className="p-1.5 hover:bg-gray-100 transition-colors"
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

                        {/* FOOTER (TOTAL & CHECKOUT) */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                                <div className="flex justify-between items-end font-bold text-lg">
                                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">Total System</span>
                                    <span className="font-mono text-2xl">${total.toLocaleString()} MXN</span>
                                </div>

                                {/* BOTÓN DE WHATSAPP REAL */}
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-black text-white py-4 font-mono text-xs uppercase font-bold tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-[9px] text-gray-400 text-center font-mono uppercase">
                                    Secure connection via WhatsApp Protocol
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};