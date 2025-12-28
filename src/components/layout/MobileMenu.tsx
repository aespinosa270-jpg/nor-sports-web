"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { title: "HOMBRE", href: "/shop/men" },
    { title: "MUJER", href: "/shop/women" },
    { title: "COLECCIÓN_01", href: "/shop/collection" },
    { title: "LABORATORIO", href: "/about" },
];

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Curva Bezier "High-End"
                    className="fixed inset-0 z-[60] bg-nor-black text-white flex flex-col p-6 overflow-hidden"
                >
                    {/* Header del Menú */}
                    <div className="flex justify-between items-center mb-12 border-b border-white/20 pb-4">
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                            System_Nav
                        </span>
                        <button onClick={onClose} className="text-3xl text-white hover:rotate-90 transition-transform duration-300">
                            <IoCloseOutline />
                        </button>
                    </div>

                    {/* Links Gigantes */}
                    <div className="flex flex-col gap-6">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="font-display text-5xl md:text-6xl font-bold uppercase tracking-tighter text-white hover:text-gray-400 transition-colors"
                                >
                                    {item.title}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Técnico */}
                    <div className="mt-auto grid grid-cols-2 gap-4 font-mono text-xs text-gray-500">
                        <div>
                            <p className="text-white mb-2 font-bold">ASISTENCIA</p>
                            <p className="hover:text-white cursor-pointer transition-colors">ENVIOS / DEVOLUCIONES</p>
                            <p className="hover:text-white cursor-pointer transition-colors">GARANTÍA NØR</p>
                        </div>
                        <div className="text-right">
                            <p className="text-white mb-2 font-bold">SOCIAL</p>
                            <p className="hover:text-white cursor-pointer transition-colors">INSTAGRAM</p>
                            <p className="hover:text-white cursor-pointer transition-colors">TIKTOK</p>
                        </div>
                    </div>

                    {/* Textura de Fondo (Opcional pero recomendada) */}
                    <div className="absolute inset-0 z-[-1] opacity-10 pointer-events-none mix-blend-overlay"
                        style={{ backgroundImage: 'url("/assets/noise.png")' }}>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};