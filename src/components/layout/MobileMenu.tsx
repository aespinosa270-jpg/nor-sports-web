"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, MessageSquare } from "lucide-react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const WHATSAPP_NUMBER = "525617500002";
const WHATSAPP_MESSAGE = "Hola NØR, requiero asistencia técnica / información sobre un pedido.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navLinks = [
        { name: "COLECCIÓN", href: "/shop", label: "CATÁLOGO COMPLETO" },
        { name: "OFERTAS", href: "/offers", label: "ARCHIVE SALE // DESCUENTOS", highlight: true },
        { name: "NOR-LAB", href: "/norlab", label: "CONCEPTO & EXPERIMENTACIÓN" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] bg-black text-white flex flex-col"
                >
                    {/* Textura de Ruido */}
                    <div
                        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                        style={{ backgroundImage: 'url("/assets/noise.png")' }}
                    />

                    {/* Header del Menú */}
                    <div className="relative z-10 flex justify-between items-center p-6 border-b border-white/10">
                        <span className="font-mono text-[10px] tracking-[0.3em] text-white/50">
                            MENU
                        </span>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* Enlaces Principales */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center px-8 gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={onClose}
                                className="group flex flex-col"
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`font-display text-4xl font-bold tracking-tighter ${link.highlight ? 'text-[#FF3333]' : 'text-white'}`}>
                                        {link.name}
                                    </span>
                                    <ArrowUpRight className="text-white/20 group-hover:text-white transition-colors" size={24} />
                                </div>
                                <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 mt-1 uppercase">
                                    {link.label}
                                </span>
                            </a>
                        ))}

                        {/* Enlace Especial de Soporte (WhatsApp) */}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col mt-4 p-4 border border-white/10 bg-white/5"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-display text-2xl font-bold tracking-tighter text-white">
                                    SOPORTE TÉCNICO
                                </span>
                                <MessageSquare className="text-green-500" size={20} />
                            </div>
                            <span className="font-mono text-[9px] tracking-[0.2em] text-green-500/70 mt-1 uppercase">
                                CHAT DIRECTO // WHATSAPP
                            </span>
                        </a>
                    </div>

                    {/* Footer del Menú */}
                    <div className="relative z-10 p-8 border-t border-white/10 bg-black">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="font-mono text-[9px] text-white/30 block mb-3 tracking-widest">LEGAL</span>
                                <div className="flex flex-col gap-2">
                                    <a href="/help" className="font-mono text-[10px] text-white/60 hover:text-white uppercase">Términos</a>
                                    <a href="/privacy" className="font-mono text-[10px] text-white/60 hover:text-white uppercase">Privacidad</a>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end items-end text-right">
                                <span className="font-mono text-[9px] text-white/20">EST. 2026</span>
                                <span className="font-mono text-[9px] text-white/20 uppercase tracking-tighter">CDMX // MÉXICO</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};