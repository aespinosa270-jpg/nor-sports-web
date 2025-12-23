"use client";

import { motion } from "framer-motion";
import { NorLogo } from "@/components/NorLogo";

export const HeroSection = () => {
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">

            {/* --- 1. FONDO ANIMADO (MARQUEE DE VELOCIDAD) --- */}
            {/* Esto simula movimiento constante, correr, avanzar. Muy usado en streetwear/sports */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
                <motion.div
                    className="whitespace-nowrap font-display text-[20vh] md:text-[30vh] font-bold leading-none text-transparent stroke-white"
                    style={{ WebkitTextStroke: "2px white" }}
                    animate={{ x: ["0%", "-50%"] }} // Se mueve infinitamente a la izquierda
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 10 // Ajusta la velocidad aquí (menos es más rápido)
                    }}
                >
                    PERFORMANCE // DRY-FIT // AUTO-COOLING // NOR SPORTS // PERFORMANCE // DRY-FIT // AUTO-COOLING // NOR SPORTS //
                </motion.div>
            </div>

            {/* --- 2. ETIQUETAS DE ROPA (Esquinas) --- */}
            <div className="absolute top-24 left-6 md:top-32 md:left-10 font-mono text-[10px] md:text-xs text-gray-400 z-30 flex flex-col gap-1 border-l border-white/30 pl-3">
                <p>COLECCIÓN: FW25</p>
                <p>CATEGORÍA: ALTO RENDIMIENTO</p>
            </div>

            <div className="absolute bottom-10 right-6 md:right-10 font-mono text-[10px] md:text-xs text-right text-gray-400 z-30 hidden md:block">
                <p>DISEÑADO PARA EL MOVIMIENTO.</p>
                <p>CDMX // MEXICO</p>
            </div>


            {/* --- 3. CONTENIDO PRINCIPAL --- */}
            <div className="relative z-20 flex flex-col items-center text-center px-4">

                {/* LOGO */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-6 scale-75 md:scale-100"
                >
                    <NorLogo />
                </motion.div>

                {/* TITULAR DEPORTIVO */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.9]"
                    >
                        RENDIMIENTO<br />
                        <span className="text-stroke-white text-transparent" style={{ WebkitTextStroke: "1px white", color: "transparent" }}>
                            ABSOLUTO
                        </span>
                    </motion.h1>
                </div>

                {/* COPY (Descripción real de la ropa) */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-6 font-mono text-xs md:text-sm text-gray-400 max-w-lg tracking-wide"
                >
                    Ingeniería textil aplicada al deporte. Telas ultra-ligeras con tecnología de enfriamiento activo para superar tus límites.
                </motion.p>

                {/* BOTÓN DE TIENDA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10"
                >
                    <button className="bg-white text-black px-10 py-4 font-mono text-sm md:text-base font-bold tracking-[0.2em] hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95">
                        COMPRAR EQUIPO
                    </button>
                </motion.div>

            </div>
        </section>
    );
};