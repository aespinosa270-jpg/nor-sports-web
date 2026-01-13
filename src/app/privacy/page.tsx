"use client";

import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Lock, Eye, Server, ShieldCheck, Cookie } from "lucide-react";

const PRIVACY_SECTIONS = [
    {
        id: "responsable",
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "1. IDENTIDAD DEL RESPONSABLE",
        content: [
            "ENTIDAD: NØR SPORTSWEAR S.A. DE C.V.",
            "DOMICILIO: República de Guatemala 114 Local C, Cuauhtémoc, Ciudad de México.",
            "COMPROMISO: Nos comprometemos a proteger tu información personal bajo estrictos estándares de encriptación y seguridad, cumpliendo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares."
        ]
    },
    {
        id: "datos",
        icon: <Server className="w-5 h-5" />,
        title: "2. DATOS RECOLECTADOS",
        content: [
            "INFORMACIÓN DIRECTA: Recabamos nombre completo, dirección de envío, correo electrónico y número telefónico (para coordinación logística y soporte vía WhatsApp).",
            "DATOS FINANCIEROS: NØR NO almacena ni procesa directamente datos bancarios completos. Todas las transacciones son procesadas mediante pasarelas de pago seguras y encriptadas (Stripe, MercadoPago o PayPal), quienes actúan como controladores independientes de dicha información."
        ]
    },
    {
        id: "finalidad",
        icon: <Eye className="w-5 h-5" />,
        title: "3. FINALIDAD DEL TRATAMIENTO",
        content: [
            "PRIMARIAS: Procesamiento de compras, envío de mercancía, facturación y servicio al cliente.",
            "SECUNDARIAS: Envío de boletines informativos (Newsletter) sobre nuevos drops, ofertas exclusivas o eventos de Nor-Lab. Puedes darte de baja de estas comunicaciones en cualquier momento."
        ]
    },
    {
        id: "cookies",
        icon: <Cookie className="w-5 h-5" />,
        title: "4. RASTREADORES Y COOKIES",
        content: [
            "USO TÉCNICO: Utilizamos cookies para mantener tu sesión activa, recordar tu carrito de compras y mejorar la experiencia de navegación.",
            "ANALÍTICA: Empleamos herramientas anónimas para analizar el tráfico del sitio y optimizar nuestros servidores. Estos datos no te identifican personalmente."
        ]
    },
    {
        id: "arco",
        icon: <Lock className="w-5 h-5" />,
        title: "5. DERECHOS ARCO",
        content: [
            "TU DERECHO: Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (ARCO) al tratamiento de tus datos personales.",
            "PROCEDIMIENTO: Para ejercer estos derechos, envía una solicitud formal a nuestro equipo de soporte con el asunto 'DERECHOS ARCO' y tu número de cliente o pedido reciente."
        ]
    }
];

export default function PrivacyPage() {
    return (
        <main className="min-h-screen w-full bg-nor-white text-nor-black pt-20 selection:bg-nor-black selection:text-white">

            {/* HEADER TIPO PROTOCOLO DE SEGURIDAD */}
            <header className="border-b border-nor-black bg-nor-white">
                <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 md:py-24">
                    <span className="font-mono text-[10px] font-bold text-nor-dark/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Lock size={14} />
                        PROTOCOLO DE SEGURIDAD // DATA PRIVACY
                    </span>
                    <h1 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
                        POLÍTICA DE<br />PRIVACIDAD.
                    </h1>
                    <p className="font-mono text-xs md:text-sm text-nor-dark/70 max-w-2xl leading-relaxed text-justify">
                        Tu privacidad es parte de nuestra arquitectura. Este documento detalla cómo recolectamos,
                        encriptamos y gestionamos tu información dentro del ecosistema NØR.
                    </p>
                </div>
            </header>

            {/* CUERPO DEL DOCUMENTO */}
            <section className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 pb-32">
                <div className="flex flex-col gap-12">

                    {PRIVACY_SECTIONS.map((section, index) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="border-l-2 border-nor-black/10 pl-8 md:pl-12 py-2 hover:border-nor-black transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-nor-black bg-nor-black/5 p-2 rounded-full">
                                    {section.icon}
                                </div>
                                <h2 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight">
                                    {section.title}
                                </h2>
                            </div>

                            <ul className="space-y-4">
                                {section.content.map((paragraph, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <span className="font-mono text-[10px] text-nor-black font-bold pt-1">
                                            {String(i + 1).padStart(2, '0')} //
                                        </span>
                                        <p className="font-mono text-xs md:text-sm text-nor-dark/70 uppercase leading-relaxed">
                                            {paragraph}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* CONTACTO */}
                    <div className="mt-12 bg-nor-black text-white p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                                ¿DUDAS SOBRE TUS DATOS?
                            </h3>
                            <p className="font-mono text-xs text-gray-400 uppercase">
                                Nuestro oficial de privacidad está disponible para atender solicitudes ARCO.
                            </p>
                        </div>
                        <a
                            // Enlace directo a WA para temas de privacidad
                            href="https://wa.me/525617500002?text=Hola%20N%C3%98R%2C%20tengo%20una%20consulta%20sobre%20Privacidad%20y%20Datos."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-nor-black px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                            INICIAR SOLICITUD
                        </a>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}