"use client";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline, IoTrashOutline, IoArrowForward } from "react-icons/io5";
import { useCartStore } from "@/store/cartStore";

// NOTA: Ya no ponemos "interface CartDrawerProps" ni recibimos props aquí.
// El componente es 100% autónomo ahora.
export const CartDrawer = () => {

    // Conexión directa al cerebro (Store)
    const { isOpen, closeCart, items, removeItem, total } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop (Fondo oscuro) */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Panel Lateral */}
                    <motion.div
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white border-l border-gray-100 z-[70] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-end p-8 border-b border-gray-100">
                            <h2 className="font-display text-4xl text-black uppercase">Tu Equipo</h2>
                            <button onClick={closeCart} className="hover:rotate-90 transition-transform">
                                <IoCloseOutline size={30} />
                            </button>
                        </div>

                        {/* Lista de Productos */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                                    <span className="font-display text-2xl">SYSTEM_EMPTY</span>
                                    <span className="font-mono text-xs mt-2">NO GEAR DETECTED</span>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 group">
                                        {/* Foto Mini */}
                                        <div className="w-20 h-24 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-mono border border-transparent group-hover:border-black transition-colors">
                                            IMG
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="font-bold uppercase text-sm">{item.name}</h3>
                                                    <p className="font-mono text-sm">${item.price.toLocaleString()}</p>
                                                </div>
                                                <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase tracking-wide">
                                                    {item.size} / {item.color}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center mt-2">
                                                <span className="font-mono text-xs border border-gray-200 px-2 py-1">
                                                    QTY: {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => removeItem(item.id, item.size, item.color)}
                                                    className="text-gray-300 hover:text-red-600 transition-colors"
                                                >
                                                    <IoTrashOutline size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer con Total */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50">
                            <div className="flex justify-between font-mono text-sm mb-6 font-bold text-black">
                                <span>TOTAL</span>
                                <span>${total().toLocaleString()} MXN</span>
                            </div>
                            <button className="w-full bg-black text-white py-5 font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors flex justify-center items-center gap-2">
                                Checkout <IoArrowForward />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};