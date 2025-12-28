"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline, IoTrashOutline, IoArrowForward } from "react-icons/io5";
import Image from "next/image"; // Usaremos esto si tienes imágenes, si no, el placeholder div está bien

const MOCK_ITEMS = [
    { id: 1, name: "AERO-DRY SKIN", price: 950, size: "M", color: "#1a1a1a", tech: "DRY-FIT" },
    { id: 2, name: "CRYOGENIC CORE", price: 1200, size: "L", color: "#f3f4f6", tech: "COOLING" },
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
                    {/* BACKDROP: Oscuro translúcido para enfocar la atención en el cajón blanco */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* DRAWER: Blanco Clínico */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white border-l border-gray-100 z-[70] flex flex-col shadow-2xl"
                    >
                        {/* 1. HEADER */}
                        <div className="flex justify-between items-end p-8 border-b border-gray-100">
                            <div>
                                <h2 className="font-display text-4xl md:text-5xl text-black tracking-tighter uppercase">
                                    Tu Equipo
                                </h2>
                                <p className="font-mono text-[10px] text-gray-400 mt-2 tracking-widest uppercase">
                                    System_Status: Pending // {MOCK_ITEMS.length} Items
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-4xl text-black hover:rotate-90 transition-transform duration-300"
                            >
                                <IoCloseOutline />
                            </button>
                        </div>

                        {/* 2. LISTA DE PRODUCTOS */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {MOCK_ITEMS.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-40">
                                    <span className="font-display text-2xl">VACÍO</span>
                                    <span className="font-mono text-xs">NO GEAR SELECTED</span>
                                </div>
                            ) : (
                                MOCK_ITEMS.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        {/* Foto Placeholder estilo 'Raw' */}
                                        <div className="w-24 h-32 bg-gray-50 border border-gray-100 flex items-center justify-center relative overflow-hidden group-hover:border-black transition-colors">
                                            {/* Aquí iría <Image /> real */}
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300 font-mono text-xs rotate-90">
                                                IMG_0{item.id}
                                            </div>
                                        </div>

                                        {/* Info del Producto */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-body font-bold text-lg text-black uppercase leading-none tracking-tight">
                                                        {item.name}
                                                    </h3>
                                                    <p className="font-mono text-sm text-black">
                                                        ${item.price}
                                                    </p>
                                                </div>

                                                {/* Tech Specs */}
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <span className="font-mono text-[10px] border border-gray-200 px-1.5 py-0.5 text-gray-500 uppercase">
                                                        SIZE: {item.size}
                                                    </span>
                                                    <span className="font-mono text-[10px] bg-black text-white px-1.5 py-0.5 uppercase">
                                                        {item.tech}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Acciones */}
                                            <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-2 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full border border-gray-300 shadow-inner" style={{ backgroundColor: item.color }} />
                                                    <span className="font-mono text-[10px] text-gray-400">REF: 00{item.id}29X</span>
                                                </div>
                                                <button className="text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1 font-mono text-[10px] uppercase group/trash">
                                                    <span className="opacity-0 group-hover/trash:opacity-100 transition-opacity">Remove</span>
                                                    <IoTrashOutline size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 3. FOOTER / CHECKOUT */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                            <div className="flex justify-between font-mono text-sm mb-6 text-black uppercase tracking-wider">
                                <span className="text-gray-500">Subtotal (Inc. IVA)</span>
                                <span className="font-bold border-b border-black pb-1">$2,150.00 MXN</span>
                            </div>

                            <button className="group w-full bg-black text-white font-mono py-4 text-sm font-bold tracking-[0.2em] hover:bg-nor-accent transition-colors uppercase flex items-center justify-center gap-2 relative overflow-hidden">
                                <span className="relative z-10">Checkout Securely</span>
                                <IoArrowForward className="relative z-10 group-hover:translate-x-1 transition-transform" />

                                {/* Efecto de llenado */}
                                <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0" />
                            </button>

                            <p className="text-center font-mono text-[9px] text-gray-400 mt-4">
                                ENVÍOS CALCULADOS EN EL SIGUIENTE PASO
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};