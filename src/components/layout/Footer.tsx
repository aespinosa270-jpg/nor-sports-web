"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const WA_NUMBER = "525617500002";
const URL_ENVIOS = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola NØR, tengo dudas sobre Envíos y Devoluciones.")}`;
const URL_TALLAS = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola NØR, necesito ayuda con la Guía de Tallas.")}`;

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="h-12 w-12 flex items-center justify-center bg-black text-white hover:bg-red-600 transition-colors duration-300 disabled:opacity-50"
        >
            {pending ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                <ArrowRight size={20} />
            )}
        </button>
    );
}

export const Footer = () => {
    const [state, formAction, isPending] = useActionState(
        subscribeToNewsletter,
        null
    );

    return (
        <footer className="bg-white text-black border-t-8 border-red-600 selection:bg-red-600 selection:text-white relative overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black">

                <div className="lg:col-span-7 p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between min-h-[400px]">
                    <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-red-600 block mb-6">
                            /// JOIN THE CLUB
                        </span>
                        <h3 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                            NO TE PIERDAS <br />
                            <span className="text-transparent text-stroke-black hover:text-black transition-colors duration-500">EL FUTURO.</span>
                        </h3>
                    </div>

                    <div className="w-full max-w-md relative">
                        {state?.success ? (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 text-red-600 py-4 border-2 border-red-600 px-6 bg-red-50"
                            >
                                <Check size={20} />
                                <span className="font-mono text-xs font-bold uppercase tracking-widest">{state.message}</span>
                            </motion.div>
                        ) : (
                            <form action={formAction} className="flex flex-col gap-4">
                                <div className="flex items-end gap-0 border-b-2 border-black focus-within:border-red-600 transition-colors duration-300">
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        disabled={isPending}
                                        placeholder="TU EMAIL AQUÍ"
                                        className="bg-transparent w-full py-4 outline-none font-mono text-sm placeholder:text-gray-400 uppercase tracking-widest text-black disabled:opacity-50"
                                    />
                                    <SubmitButton />
                                </div>
                                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wide mt-2">
                                    Sin spam. Solo lanzamientos exclusivos.
                                </p>
                            </form>
                        )}
                        {!state?.success && state?.message && (
                            <span className="absolute -bottom-8 left-0 text-[10px] text-red-600 font-mono font-bold">
                                {state.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2">

                    <div className="p-8 md:p-12 border-r border-black flex flex-col gap-8">
                        <h4 className="font-mono text-[10px] font-bold uppercase bg-black text-white inline-block px-2 py-1 w-fit tracking-widest">
                            CATÁLOGO
                        </h4>
                        <nav className="flex flex-col gap-4">
                            {['Colección Dry-Fit', 'Nor-Lab', 'Ofertas', 'Nuevos Drops'].map((item) => (
                                <Link
                                    key={item}
                                    href="/shop"
                                    className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight hover:text-red-600 hover:translate-x-2 transition-all"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="p-8 md:p-12 flex flex-col gap-8 bg-gray-50/50">
                        <h4 className="font-mono text-[10px] font-bold uppercase bg-black text-white inline-block px-2 py-1 w-fit tracking-widest">
                            AYUDA
                        </h4>
                        <nav className="flex flex-col gap-4">
                            <a href={URL_ENVIOS} className="font-mono text-xs font-bold uppercase hover:text-red-600 transition-colors border-b border-gray-200 pb-2">
                                Envíos y Devoluciones
                            </a>
                            <a href={URL_TALLAS} className="font-mono text-xs font-bold uppercase hover:text-red-600 transition-colors border-b border-gray-200 pb-2">
                                Guía de Tallas
                            </a>

                            <Link href="/help" className="font-mono text-xs font-bold uppercase hover:text-red-600 transition-colors border-b border-gray-200 pb-2">
                                Términos y Condiciones
                            </Link>

                            <Link href="/privacy" className="font-mono text-xs font-bold uppercase hover:text-red-600 transition-colors border-b border-gray-200 pb-2">
                                Política de Privacidad
                            </Link>
                        </nav>

                        <div className="mt-auto pt-8">
                            <h4 className="font-mono text-[10px] font-bold uppercase text-gray-400 mb-4 tracking-widest">SOCIAL</h4>
                            <div className="flex gap-4">
                                {['IG', 'TW', 'TK'].map((social) => (
                                    <a key={social} href="#" className="h-8 w-8 border border-black flex items-center justify-center font-mono text-[10px] font-bold hover:bg-black hover:text-white hover:border-black transition-all rounded-full">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b border-black bg-white relative overflow-hidden group cursor-default">
                <h1 className="text-[12vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-center select-none group-hover:text-red-600 transition-colors duration-700">
                    NØR SPORTS
                </h1>
            </div>

            <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-black text-white">
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                    © 2026 NØR SPORTS S.A. DE C.V. // MX-CDMX
                </p>
                <div className="flex gap-6 items-center">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 hidden md:block">
                        DESIGNED BY HUUP
                    </span>
                    <div className="flex gap-2 items-center px-3 py-1 border border-white/20 rounded-full">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-white">
                            SYSTEM ONLINE
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};