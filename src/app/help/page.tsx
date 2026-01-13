"use client";

import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { FileText, Truck, RefreshCcw, ShieldAlert, CreditCard } from "lucide-react";

// DATOS DE LAS SECCIONES PARA MANTENER EL CÓDIGO LIMPIO
const SECTIONS = [
    {
        id: "envios",
        icon: <Truck className="w-5 h-5" />,
        title: "1. POLÍTICA DE ENVÍOS",
        content: [
            "PROCESAMIENTO: Todos los pedidos se procesan en un lapso de 24 a 48 horas hábiles tras la confirmación del pago.",
            "COBERTURA: Realizamos envíos a toda la República Mexicana.",
            "TIEMPOS DE TRÁNSITO: El tiempo estándar de entrega es de 3 a 5 días hábiles (zonas extendidas pueden variar).",
            "COSTOS: El envío es gratuito en compras superiores a $1,500 MXN. Para pedidos menores, la tarifa estándar se calculará al finalizar la compra.",
            "RASTREO: Una vez enviado, recibirás un número de guía vía correo electrónico para monitorear el estatus de tu paquete."
        ]
    },
    {
        id: "cambios",
        icon: <RefreshCcw className="w-5 h-5" />,
        title: "2. CAMBIOS Y DEVOLUCIONES",
        content: [
            "PLAZO: Dispones de 15 días naturales a partir de la recepción de tu pedido para solicitar un cambio de talla o devolución.",
            "CONDICIÓN DEL PRODUCTO: La prenda debe estar intacta, sin usar, sin lavar y con todas las etiquetas originales adheridas. NØR se reserva el derecho de rechazar devoluciones que no cumplan con estos estándares de higiene y calidad.",
            "PROCESO: Para iniciar un trámite, contacta a nuestro Soporte vía WhatsApp indicando tu número de orden.",
            "COSTOS DE RETORNO: Los gastos de envío por cambio de talla o modelo corren por cuenta del cliente. En caso de defectos de fábrica, NØR cubrirá el 100% de los gastos logísticos."
        ]
    },
    {
        id: "ofertas",
        icon: <ShieldAlert className="w-5 h-5" />,
        title: "3. ARTÍCULOS EN LIQUIDACIÓN",
        content: [
            "VENTA FINAL: Los productos adquiridos en la sección de 'OFERTAS' o 'NOR-LAB ARCHIVE' se consideran venta final.",
            "SIN CAMBIOS: No se aceptan cambios ni devoluciones en mercancía con descuento, salvo que presenten un defecto de fabricación comprobable al momento de la recepción."
        ]
    },
    {
        id: "garantia",
        icon: <CreditCard className="w-5 h-5" />,
        title: "4. PAGOS Y FACTURACIÓN",
        content: [
            "MÉTODOS: Aceptamos tarjetas de crédito/débito (Visa, MC, Amex), PayPal y transferencias vía MercadoPago.",
            "SEGURIDAD: Todas las transacciones están encriptadas. NØR no almacena información bancaria sensible.",
            "FACTURACIÓN: Si requieres factura, cuentas con 7 días naturales posteriores a tu compra para solicitarla a través de nuestro WhatsApp, enviando tu Constancia de Situación Fiscal y número de pedido."
        ]
    }
];

export default function HelpPage() {
    return (
        <main className="min-h-screen w-full bg-nor-white text-nor-black pt-20 selection:bg-nor-black selection:text-white">

            {/* HEADER TIPO EXPEDIENTE */}
            <header className="border-b border-nor-black bg-nor-white">
                <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 md:py-24">
                    <span className="font-mono text-[10px] font-bold text-nor-dark/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <FileText size={14} />
                        DOCUMENTACIÓN LEGAL // REV. 2026
                    </span>
                    <h1 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
                        TÉRMINOS Y<br />CONDICIONES.
                    </h1>
                    <p className="font-mono text-xs md:text-sm text-nor-dark/70 max-w-2xl leading-relaxed text-justify">
                        Al adquirir productos NØR, aceptas adherirte a los siguientes protocolos de servicio.
                        Nuestra prioridad es la transparencia y la eficiencia en cada transacción.
                    </p>
                </div>
            </header>

            {/* CUERPO DEL DOCUMENTO */}
            <section className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 pb-32">
                <div className="flex flex-col gap-12">

                    {SECTIONS.map((section, index) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="border border-nor-black/10 p-8 md:p-12 hover:border-nor-black/30 transition-colors bg-white/50"
                        >
                            <div className="flex items-center gap-3 mb-6 border-b border-nor-black/10 pb-4">
                                <div className="text-nor-black">
                                    {section.icon}
                                </div>
                                <h2 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight">
                                    {section.title}
                                </h2>
                            </div>

                            <ul className="space-y-4">
                                {section.content.map((paragraph, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <span className="font-mono text-[10px] text-nor-accent font-bold pt-1">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <p className="font-mono text-xs md:text-sm text-nor-dark/70 uppercase leading-relaxed">
                                            {paragraph}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* DISCLAIMER FINAL */}
                    <div className="text-center pt-12 border-t border-nor-black/10">
                        <p className="font-mono text-[10px] text-nor-dark/40 uppercase tracking-widest mb-4">
                            ¿NECESITAS ASISTENCIA ADICIONAL?
                        </p>
                        <a
                            // Recuerda poner aquí tu número real si usas la constante o importarla
                            href="https://wa.me/525617500002?text=Hola%20N%C3%98R%2C%20tengo%20una%20duda%20legal%20sobre%20mi%20compra."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-nor-black text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-nor-accent transition-colors"
                        >
                            CONTACTAR SOPORTE
                        </a>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}