"use client";

import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Plus, Maximize2, Droplets, Wind, ShieldCheck, Zap } from "lucide-react";

const SPECS = [
    {
        id: "001",
        label: "TERMODINÁMICA",
        icon: <Wind strokeWidth={1} />,
        title: "VENTILACIÓN ACTIVA",
        desc: "Arquitectura textil diseñada para la circulación de aire constante. Mantiene la temperatura corporal estable bajo estrés físico intenso."
    },
    {
        id: "002",
        label: "HIDRO-GESTIÓN",
        icon: <Droplets strokeWidth={1} />,
        title: "EVAPORACIÓN INSTANTÁNEA",
        desc: "Matriz de fibras que extrae el sudor de la epidermis hacia la capa exterior para una dispersión y secado inmediato."
    },
    {
        id: "003",
        label: "ESTRUCTURA",
        icon: <Maximize2 strokeWidth={1} />,
        title: "CHASIS ULTRALIGERO",
        desc: "Eliminamos peso innecesario. Libertad de movimiento absoluta sin sacrificar la integridad estructural de la prenda."
    },
    {
        id: "004",
        label: "RESISTENCIA",
        icon: <ShieldCheck strokeWidth={1} />,
        title: "DURABILIDAD GRADO URBANO",
        desc: "Polímeros de alta tenacidad resistentes a la abrasión y al lavado frecuente. Diseñado para no deformarse."
    },
    {
        id: "005",
        label: "CINEMÁTICA",
        icon: <Zap strokeWidth={1} />,
        title: "FLEXIBILIDAD DINÁMICA",
        desc: "Elasticidad mecánica que se adapta a la expansión muscular en cada repetición. Cero restricciones."
    },
    {
        id: "006",
        label: "HIGIENE",
        icon: <Plus strokeWidth={1} />,
        title: "ESCUDO BIO-LÓGICO",
        desc: "Tratamiento que inhibe la proliferación bacteriana causada por la humedad, neutralizando olores en sesiones largas."
    },
];

export default function NorLabPage() {
    return (
        <main className="min-h-screen w-full bg-nor-white text-nor-black pt-16 selection:bg-nor-black selection:text-white">

            <header className="border-b border-nor-black bg-nor-white relative z-10">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div>
                            <h1 className="font-display font-black text-6xl md:text-[8rem] lg:text-[10rem] uppercase tracking-tighter leading-[0.8]">
                                NOR-LAB<span className="text-nor-dark/20">™</span>
                            </h1>
                        </div>
                        <div className="max-w-sm text-right md:text-left">
                            <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest leading-relaxed border-l-2 border-nor-black pl-4 text-nor-dark/80">
                                División de Ingeniería Textil.<br />
                                Optimización de Rendimiento Humano.<br />
                                CDMX / 2026.
                            </p>
                        </div>
                    </div>
                </div>
            </header>


            <section className="border-b border-nor-black">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

                    <div className="lg:col-span-5 relative border-b lg:border-b-0 lg:border-r border-nor-black overflow-hidden bg-nor-black group h-[50vh] lg:h-auto">
                        <div className="sticky top-0 h-full w-full">
                            <Image
                                src="/assets/NOR3.png"
                                alt="Technical Fabric Analysis"
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                            />

                            <div className="absolute inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <Plus className="text-white/50" size={24} />
                                    <Plus className="text-white/50" size={24} />
                                </div>
                                <div className="border-2 border-white/20 p-4 backdrop-blur-sm max-w-[200px]">
                                    <p className="font-mono text-[9px] text-white uppercase leading-tight">
                                        SAMPLE: POLY-FIBER MATRIX<br />
                                        TEST: ABRASION RESISTANCE<br />
                                        RESULT: PASSED
                                    </p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <p className="font-display text-6xl text-white/10 font-black">01</p>
                                    <Plus className="text-white/50" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col bg-nor-white">

                        <div className="p-8 md:p-16 border-b border-nor-black">
                            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter leading-none mb-6">
                                LA EFICIENCIA NO ES NEGOCIABLE.
                            </h2>
                            <p className="font-mono text-sm text-nor-dark/80 leading-relaxed max-w-2xl text-justify mb-6">
                                Independientemente de tu disciplina, el equipo adecuado es la diferencia entre entrenar y evolucionar.
                                No saldrías a correr con calzado de vestir. De igual manera, no entrenas con materiales que te limitan.
                            </p>
                            <p className="font-mono text-sm font-bold text-nor-black uppercase tracking-wide">
                                ESTO NO TIENE QUE VER CON EL ESTILO. TIENE QUE VER CON EL RENDIMIENTO.
                            </p>
                        </div>

                        <div className="flex-1 bg-[#F9F9F9]">
                            {SPECS.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ margin: "-50px" }}
                                    className="group border-b border-nor-black/10 last:border-b-0 hover:bg-white transition-colors duration-300 grid grid-cols-1 md:grid-cols-12 min-h-[140px]"
                                >
                                    <div className="md:col-span-2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-nor-black/10 flex flex-row md:flex-col justify-between items-start md:items-center text-nor-dark/40 group-hover:text-nor-black transition-colors">
                                        <span className="font-mono text-[10px] font-bold">{item.id}</span>
                                        <div className="scale-125 md:scale-150 transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className="md:col-span-10 p-6 md:p-8 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-[9px] bg-nor-black text-white px-2 py-0.5 uppercase tracking-widest rounded-sm">
                                                {item.label}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 group-hover:translate-x-2 transition-transform duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="font-mono text-xs text-nor-dark/60 uppercase leading-relaxed max-w-xl group-hover:text-nor-dark/90 transition-colors">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <section className="bg-nor-black text-white py-24 px-6 text-center border-t border-nor-white/10">
                <div className="max-w-3xl mx-auto">
                    <p className="font-mono text-xs text-nor-accent mb-6 uppercase tracking-[0.2em] animate-pulse">
                        [ SYSTEM READY ]
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-8 leading-none">
                        PROBADO POR MARCAS GLOBALES.<br />PERFECCIONADO POR NØR.
                    </h2>
                    <p className="font-mono text-xs text-gray-400 mb-0 uppercase">
                        Tecnología disponible ahora en nuestro catálogo.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}