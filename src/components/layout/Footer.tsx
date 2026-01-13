"use client";

import { useActionState } from "react"; // <--- ACTUALIZADO: De 'react-dom' a 'react'
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

// --- CONFIGURACIÓN WHATSAPP ---
const WA_NUMBER = "525617500002";
const URL_ENVIOS = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola NØR, tengo dudas sobre Envíos y Devoluciones.")}`;
const URL_TALLAS = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola NØR, necesito ayuda con la Guía de Tallas.")}`;

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="text-nor-black hover:text-nor-accent transition-colors disabled:opacity-50"
        >
            {pending ? (
                <div className="h-5 w-5 border-2 border-nor-black border-t-transparent rounded-full animate-spin" />
            ) : (
                <ArrowRight size={20} strokeWidth={1.5} />
            )}
        </button>
    );
}

export const Footer = () => {
    // ACTUALIZADO: useActionState es el nuevo estándar
    const [state, formAction, isPending] = useActionState(
        subscribeToNewsletter,
        null
    );

    return (
        <footer className="bg-nor-white text-nor-black border-t border-nor-dark/10">

            {/* SECCIÓN NEWSLETTER */}
            <div className="px-6 md:px-12 py-20 border-b border-nor-dark/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="max-w-xl">
                    <h3 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
                        JOIN NOR-LAB
                    </h3>
                    <p className="font-mono text-xs md:text-sm text-nor-dark/60 max-w-md">
                        Acceso anticipado a drops limitados, ingeniería experimental y eventos en CDMX.
                        <span className="text-nor-black font-bold block mt-1"> SIN SPAM, SOLO VANGUARDIA.</span>
                    </p>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-2 relative">
                    {state?.success ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-nor-accent py-2 border-b border-nor-accent w-full md:w-[400px]"
                        >
                            <Check size={18} />
                            <span className="font-mono text-xs font-bold uppercase tracking-widest">{state.message}</span>
                        </motion.div>
                    ) : (
                        <form action={formAction} className="flex border-b border-nor-black pb-2 w-full md:w-[400px] group focus-within:border-nor-accent transition-colors duration-300 relative">
                            <input
                                name="email"
                                type="email"
                                required
                                disabled={isPending}
                                placeholder="CORREO ELECTRÓNICO"
                                className="bg-transparent w-full outline-none font-mono text-xs placeholder:text-nor-dark/40 uppercase tracking-widest text-nor-black disabled:opacity-50"
                            />
                            <SubmitButton />
                        </form>
                    )}

                    {!state?.success && state?.message && (
                        <span className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-mono font-bold">
                            {state.message}
                        </span>
                    )}
                </div>
            </div>

            {/* ENLACES Y NAVEGACIÓN */}
            <div className="px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">

                {/* COLUMNA 1 */}
                <div className="col-span-2 md:col-span-1 pr-8">
                    <Link href="/" className="font-display text-4xl font-black uppercase tracking-tighter block mb-6 hover:opacity-50 transition-opacity">
                        NØR
                    </Link>
                    <p className="font-mono text-[10px] text-nor-dark/50 uppercase tracking-widest leading-relaxed mb-6">
                        High-Performance Sportswear.<br />
                        Envios a todo México.
                    </p>

                    <address className="font-mono text-xs font-bold text-nor-black uppercase tracking-widest leading-relaxed not-italic border-l-2 border-nor-accent pl-4 py-1">
                        República de Guatemala 114 Local C<br />
                        Cuauhtémoc, México
                    </address>
                </div>

                {/* COLUMNA 2 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-nor-black tracking-widest mb-2">[ Colecciones ]</h4>
                    <Link href="/shop" className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium">
                        Colección Dry-Fit
                    </Link>
                    <Link href="/norlab" className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium">
                        Nor-Lab
                    </Link>
                    <Link href="/offers" className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium">
                        Ofertas
                    </Link>
                </div>

                {/* COLUMNA 3 - SOPORTE */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-nor-black tracking-widest mb-2">[ Soporte ]</h4>

                    <a
                        href={URL_ENVIOS}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium"
                    >
                        Envíos y Devoluciones
                    </a>

                    <a
                        href={URL_TALLAS}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium"
                    >
                        Guía de Tallas
                    </a>

                    <Link href="/help" className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium">
                        Términos y Condiciones
                    </Link>

                    <Link href="/privacy" className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium">
                        Política de Privacidad
                    </Link>
                </div>

                {/* COLUMNA 4 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-nor-black tracking-widest mb-2">[ Social ]</h4>
                    <a href="#" className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium">Instagram</a>
                    <a href="#" className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium">TikTok</a>
                    <a href="#" className="font-sans text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all font-medium">Twitter / X</a>
                </div>
            </div>

            {/* STATUS BAR */}
            <div className="px-6 md:px-12 py-6 border-t border-nor-dark/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-nor-concrete/30">
                <p className="font-mono text-[10px] text-nor-dark/40 uppercase tracking-widest">
                    © 2026 NØR SPORTS S.A. DE C.V.
                </p>
                <div className="flex gap-3 items-center">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                    <span className="font-mono text-[10px] text-nor-dark/40 uppercase tracking-widest">
                        ONLINE
                    </span>
                </div>
            </div>
        </footer>
    );
};