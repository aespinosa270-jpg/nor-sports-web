"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
    return (
        // CAMBIO: Altura ajustada, fondo gris claro deportivo
        <section className="relative w-full h-[85vh] flex flex-col items-start justify-center bg-gray-100 overflow-hidden pt-20">

            {/* --- 1. FONDO/IMAGEN (Placeholder Dinámico) --- */}
            {/* En el futuro, aquí iría una foto gigante de un atleta corriendo */}
            <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-br from-gray-200 to-gray-300 z-0">
                {/* Elemento gráfico abstracto de velocidad */}
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "-20%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="w-full h-full bg-black/5 skew-x-12 absolute inset-0"
                />
            </div>


            {/* --- 2. CONTENIDO (Texto Negro sobre Blanco/Gris) --- */}
            <div className="container mx-auto px-6 md:px-12 relative z-20">

                {/* Etiqueta estilo "Drop" */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block bg-black text-white font-mono text-xs px-3 py-1 mb-6 uppercase tracking-wider"
                >
                    Nueva Colección // FW25
                </motion.div>

                {/* TITULAR GIGANTE ESTILO ADIDAS */}
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="font-display text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none text-black mb-6"
                    >
                        IMPULSO<br />
                        VANGUARDISTA.
                    </motion.h1>
                </div>

                {/* COPY */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-mono text-sm md:text-base text-gray-800 max-w-lg mb-10"
                >
                    Ingeniería deportiva diseñada en CDMX. Ropa de alto rendimiento que fusiona tecnología y estética brutalista.
                </motion.p>

                {/* BOTONES DE ACCIÓN (Estilo Adidas: Sólido + Outline) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col md:flex-row gap-4"
                >
                    <button className="bg-black text-white px-8 py-4 font-display font-bold tracking-wider uppercase hover:bg-gray-900 transition-colors flex items-center justify-between group">
                        <span>Comprar Hombre</span>
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                    <button className="border-2 border-black text-black px-8 py-4 font-display font-bold tracking-wider uppercase hover:bg-black hover:text-white transition-colors flex items-center justify-between group">
                        <span>Comprar Mujer</span>
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                </motion.div>

            </div>
        </section>
    );
};