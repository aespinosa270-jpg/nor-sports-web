"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="bg-black min-h-screen pt-32 pb-20 px-6 selection:bg-white selection:text-black">

            <div className="container mx-auto max-w-4xl">

                {/* ENCABEZADO */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 border-b border-white/20 pb-8"
                >
                    <h1 className="font-display text-5xl md:text-8xl text-white tracking-tighter uppercase leading-none">
                        CÓDIGO<br />NOR_01
                    </h1>
                    <div className="flex justify-between items-end mt-4 font-mono text-xs text-gray-500">
                        <span>EST. 2025 // CDMX</span>
                        <span>[ MANIFIESTO ]</span>
                    </div>
                </motion.div>

                {/* CONTENIDO TEXTUAL (Estilo Editorial) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 font-mono text-sm md:text-base text-gray-300 leading-relaxed">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="mb-8">
                            <strong className="text-white block mb-2 font-display text-xl tracking-widest">01 // ADAPTACIÓN</strong>
                            El entorno urbano es hostil. El clima es impredecible. NOR nace de la necesidad de adaptar el cuerpo humano a la velocidad de la ciudad moderna mediante ingeniería textil.
                        </p>
                        <p>
                            No hacemos moda. Diseñamos equipamiento. Cada costura, cada cierre y cada fibra tiene un propósito funcional: sobrevivir al caos con estética impecable.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="mb-8">
                            <strong className="text-white block mb-2 font-display text-xl tracking-widest">02 // TECNOLOGÍA</strong>
                            Rechazamos los materiales obsoletos. Integramos polímeros hidrofóbicos, membranas transpirables y textiles de grado militar.
                        </p>
                        <div className="border-l-2 border-white pl-6 py-2 my-8 italic text-white/60">
                            "La forma sigue a la función. La estética es la consecuencia de la eficiencia."
                        </div>
                        <p>
                            Somos el puente entre el rendimiento deportivo y la elegancia brutalista.
                        </p>
                    </motion.div>

                </div>

                {/* FIRMA FINAL */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-32 text-center"
                >
                    <h2 className="font-display text-[10vw] md:text-[8vw] leading-none text-transparent stroke-white opacity-20 hover:opacity-100 transition-opacity duration-500 select-none" style={{ WebkitTextStroke: "1px white" }}>
                        READY OR NOT
                    </h2>
                </motion.div>

            </div>
        </main>
    );
}