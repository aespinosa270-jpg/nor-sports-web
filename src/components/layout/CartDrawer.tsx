"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline, IoTrashOutline } from "react-icons/io5";

// DATOS ACTUALIZADOS: Coinciden con tu catálogo deportivo
const MOCK_ITEMS = [
    { id: 1, name: "AERO-DRY SKIN", price: 950, size: "M", img: "#111", tech: "DRY-FIT" },
    { id: 2, name: "CRYOGENIC CORE", price: 1200, size: "L", img: "#222", tech: "COOLING" },
];

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Fondo oscuro (Overlay) más denso */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60]"
                    />

                    {/* Panel Lateral Más Ancho */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-black border-l border-white/20 z-[70] flex flex-col"
                    >
                        {/* Header GIGANTE */}
                        <div className="flex justify-between items-end p-8 border-b border-white/20">
                            <div>
                                <h2 className="font-display text-4xl md:text-5xl text-white tracking-tighter">TU EQUIPO</h2>
                                <p className="font-mono text-xs text-gray-500 mt-2">STATUS: PENDING // 2 ITEMS</p>
                            </div>
                            <button onClick={onClose} className="text-4xl text-white hover:text-gray-400 transition-colors">
                                <IoCloseOutline />
                            </button>
                        </div>

                        {/* Lista de Productos */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {MOCK_ITEMS.map((item) => (
                                <div key={item.id} className="flex gap-6 group">
                                    {/* Foto Mini (Con silueta tech) */}
                                    <div className="w-24 h-32 bg-[#0a0a0a] border border-white/10 flex items-center justify-center relative overflow-hidden">
                                        <div className="opacity-30">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
                                                <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Info Grande */}
                                    <div className="flex-1 flex flex-col justify-between font-mono">
                                        <div>
                                            <h3 className="text-white text-xl font-bold tracking-wide">{item.name}</h3>
                                            <div className="flex gap-4 mt-1 text-xs text-gray-500 uppercase">
                                                <span>SIZE: {item.size}</span>
                                                <span className="border border-white/20 px-1">[{item.tech}]</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-white text-lg">${item.price} MXN</p>
                                            <button className="text-gray-600 hover:text-red-500 transition-colors">
                                                <IoTrashOutline size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer / Checkout */}
                        <div className="p-8 border-t border-white/20 bg-black">
                            <div className="flex justify-between font-mono text-lg mb-8 text-white">
                                <span className="opacity-50">SUBTOTAL</span>
                                <span className="font-bold">$2,150 MXN</span>
                            </div>
                            <button className="w-full bg-white text-black font-mono py-5 text-sm md:text-base font-bold tracking-[0.3em] hover:bg-gray-200 transition-colors uppercase">
                                INICIAR PAGO
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};