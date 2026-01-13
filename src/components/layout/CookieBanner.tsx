"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Verificar si ya aceptó las cookies anteriormente
        const consent = localStorage.getItem("nor-cookie-consent");
        if (!consent) {
            // Pequeño delay para que no sea intrusivo al instante
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("nor-cookie-consent", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6"
                >
                    <div className="max-w-screen-xl mx-auto">
                        <div className="bg-nor-white border border-nor-black shadow-2xl p-6 md:flex justify-between items-center gap-8 relative">

                            {/* Decoración Técnica */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-nor-black/5" />
                            <div className="absolute top-0 left-0 w-16 h-1 bg-red-600 animate-pulse" />

                            <div className="flex-1 mb-4 md:mb-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Cookie size={16} className="text-nor-black" />
                                    <span className="font-mono text-[10px] font-bold text-red-600 uppercase tracking-[0.2em]">
                                        ALERTA DEL SISTEMA // PROTOCOLO DE DATOS
                                    </span>
                                </div>
                                <p className="font-mono text-xs text-nor-dark/80 uppercase leading-relaxed max-w-2xl">
                                    Utilizamos cookies y tecnologías de rastreo para optimizar el rendimiento de la plataforma y personalizar tu experiencia. Al continuar navegando, aceptas nuestro procesamiento de datos.
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href="/privacy"
                                    className="font-mono text-[10px] font-bold uppercase tracking-widest text-nor-dark/60 hover:text-nor-black underline decoration-1 underline-offset-4 transition-colors whitespace-nowrap"
                                >
                                    VER POLÍTICA
                                </Link>

                                <button
                                    onClick={acceptCookies}
                                    className="bg-nor-black text-white px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-colors whitespace-nowrap"
                                >
                                    [ ACEPTAR ]
                                </button>
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};