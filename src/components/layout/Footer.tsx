"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-nor-white text-nor-black border-t border-nor-dark/10">

            <div className="px-6 md:px-12 py-20 border-b border-nor-dark/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="max-w-xl">
                    <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6 leading-none">
                        Join the Lab
                    </h3>
                    <p className="font-body text-sm text-nor-dark/60 max-w-md">
                        Acceso anticipado a drops limitados, ingeniería experimental y eventos en CDMX.
                        <span className="text-nor-black font-medium"> Sin spam, solo vanguardia.</span>
                    </p>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-2">
                    <form className="flex border-b border-nor-black pb-2 w-full md:w-[400px] group focus-within:border-nor-accent transition-colors duration-300">
                        <input
                            type="email"
                            placeholder="CORREO ELECTRÓNICO"
                            className="bg-transparent w-full outline-none font-mono text-xs placeholder:text-nor-dark/40 uppercase tracking-widest text-nor-black"
                        />
                        <button type="button" className="text-nor-black hover:text-nor-accent transition-colors">
                            <ArrowRight size={20} strokeWidth={1.5} />
                        </button>
                    </form>
                </div>
            </div>

            <div className="px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">

                <div className="col-span-2 md:col-span-1 pr-8">
                    <Link href="/" className="font-display text-3xl font-bold uppercase tracking-tighter block mb-6 hover:opacity-50 transition-opacity">
                        NØR
                    </Link>
                    <p className="font-mono text-[10px] text-nor-dark/50 uppercase tracking-widest leading-relaxed">
                        High-Vanguard Sportswear.<br />
                        Engineered in CDMX.<br />
                        Global Shipping.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-nor-black tracking-widest mb-2">[ Colecciones ]</h4>
                    <Link href="/shop" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Man FW25</Link>
                    <Link href="/shop" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Woman FW25</Link>
                    <Link href="/shop" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Accessories</Link>
                    <Link href="/shop" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Archived</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-nor-black tracking-widest mb-2">[ Soporte ]</h4>
                    <Link href="/help" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Envíos y Devoluciones</Link>
                    <Link href="/help" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Guía de Tallas</Link>
                    <Link href="/help" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Términos y Condiciones</Link>
                    <Link href="/help" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Política de Privacidad</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-nor-black tracking-widest mb-2">[ Social ]</h4>
                    <a href="#" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Instagram</a>
                    <a href="#" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">TikTok</a>
                    <a href="#" className="font-body text-sm text-nor-dark/60 hover:text-nor-black hover:translate-x-1 transition-all">Twitter / X</a>
                </div>
            </div>

            <div className="px-6 md:px-12 py-6 border-t border-nor-dark/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-nor-concrete/30">
                <p className="font-mono text-[10px] text-nor-dark/40 uppercase tracking-widest">
                    © 2025 NØR SYSTEMS S.A. DE C.V.
                </p>
                <div className="flex gap-3 items-center">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nor-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-nor-accent"></span>
                    </div>
                    <span className="font-mono text-[10px] text-nor-dark/40 uppercase tracking-widest">
                        System Status: Online
                    </span>
                </div>
            </div>
        </footer>
    );
};