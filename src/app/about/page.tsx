"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Heart, Target, Users, Zap, CheckCircle2 } from "lucide-react";

export default function AboutPage() {

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <main className="min-h-screen bg-white pt-20 font-sans text-black selection:bg-[#FF3333] selection:text-white">

            <section className="relative w-full py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto"
                >
                    <span className="text-[#FF3333] font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-6 block">
                        Nuestra Verdad
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                        El mundo no necesita <br className="hidden md:block" />
                        otra marca de moda.
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
                        Necesita herramientas reales para personas reales.
                        En NØR, el deporte no es un desfile, es un diálogo honesto entre tú y tus límites.
                    </p>
                </motion.div>
            </section>

            <section className="w-full bg-[#FAFAFA]">
                <div className="grid md:grid-cols-2">

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative h-[500px] md:h-auto min-h-[600px] w-full bg-gray-200"
                    >
                        <Image
                            src="/assets/about-origin.jpg"
                            alt="El origen de NØR"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </motion.div>

                    <div className="flex flex-col justify-center px-8 py-20 md:px-20 lg:px-24">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <h3 className="text-3xl font-black uppercase mb-8 tracking-tight">
                                Nacido del hartazgo, <br /> Creado para el movimiento.
                            </h3>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    Miramos a nuestro alrededor y vimos lo mismo de siempre: promesas vacías y prendas que se veían bien en fotos pero fallaban en la realidad.
                                </p>
                                <p><strong>NØR nació como respuesta.</strong></p>
                                <p>
                                    Quitamos el ruido. Eliminamos lo superfluo. Nos preguntamos:
                                    <em>&quot;¿Qué necesita realmente alguien que entrena a las 6:00 AM?&quot;</em>.
                                    La respuesta fue simple: Comodidad absoluta y durabilidad real.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-black text-white rounded-full"><Target size={24} /></div>
                            <h3 className="text-xl font-bold uppercase tracking-widest">Nuestra Misión</h3>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Democratizar el alto rendimiento. Poner en tus manos calidad &quot;Gold Standard&quot; sin las barreras del elitismo. Queremos ser el equipo en tu maleta que nunca te falla.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-[#FF3333] text-white rounded-full"><Heart size={24} /></div>
                            <h3 className="text-xl font-bold uppercase tracking-widest">Nuestra Visión</h3>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Un mundo donde la voluntad manda. Visualizamos un futuro donde la marca no define al atleta, sino lo que hace con ella.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full h-[400px] md:h-[600px] relative bg-gray-900 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src="/assets/about-texture.jpg"
                        alt="Detalle y Calidad"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-80"
                    />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter text-center px-4">
                        Ingeniería <br /> Invisible.
                    </h2>
                </div>
            </section>

            <section className="bg-black text-white py-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 md:gap-12">
                    {[
                        {
                            icon: <Users size={32} />,
                            title: "Empatía Radical",
                            desc: "Diseñamos escuchando. Tu confort es nuestra brújula."
                        },
                        {
                            icon: <CheckCircle2 size={32} />,
                            title: "Honestidad Brutal",
                            desc: "Lo que ves es lo que obtienes: materiales que aguantan el uso rudo."
                        },
                        {
                            icon: <Zap size={32} />,
                            title: "Evolución Constante",
                            desc: "No somos perfectos, pero somos implacables en mejorar."
                        }
                    ].map((value, idx) => (
                        <div key={idx} className="bg-[#111] p-8 md:p-10 border border-gray-800 hover:border-[#FF3333] transition-colors">
                            <div className="text-[#FF3333] mb-6">{value.icon}</div>
                            <h3 className="text-xl font-black uppercase mb-4 tracking-wide">{value.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="w-full bg-white">
                <div className="grid md:grid-cols-2">

                    <div className="flex flex-col justify-center px-8 py-20 md:px-20 lg:px-24 order-2 md:order-1">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                                Esto es para ti.
                            </h2>
                            <p className="text-xl text-gray-700 font-medium mb-10 leading-relaxed">
                                Para los que entrenan cuando nadie mira. <br />
                                Para los que buscan calidad, no estatus. <br />
                                Para los que entienden que el éxito es la suma de pequeños esfuerzos.
                            </p>

                            <Link
                                href="/shop"
                                className="inline-block bg-black text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#FF3333] transition-colors duration-300 text-center"
                            >
                                Ver Colección
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative h-[500px] md:h-auto min-h-[600px] w-full bg-gray-200 order-1 md:order-2"
                    >
                        <Image
                            src="/assets/about-manifesto.jpg"
                            alt="Comunidad NØR"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </motion.div>

                </div>
            </section>

        </main>
    );
}