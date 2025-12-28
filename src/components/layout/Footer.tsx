import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

export const Footer = () => {
    return (
        <footer className="bg-white text-black border-t border-gray-200">

            {/* 1. SECCIÓN NEWSLETTER (Alta Prioridad) */}
            <div className="px-6 md:px-12 py-16 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="max-w-xl">
                    <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">
                        Join the Lab
                    </h3>
                    <p className="font-body text-sm text-gray-500">
                        Acceso anticipado a drops limitados, ingeniería experimental y eventos en CDMX.
                        Sin spam, solo vanguardia.
                    </p>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-2">
                    <div className="flex border-b border-black pb-2 w-full md:w-[400px]">
                        <input
                            type="email"
                            placeholder="CORREO ELECTRÓNICO"
                            className="bg-transparent w-full outline-none font-mono text-sm placeholder:text-gray-400 uppercase"
                        />
                        <button className="text-black hover:text-gray-500 transition-colors">
                            <IoArrowForward size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. GRID DE ENLACES (Mapa del Sitio) */}
            <div className="px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">

                {/* Columna Branding */}
                <div className="col-span-2 md:col-span-1">
                    <Link href="/" className="font-display text-2xl font-bold uppercase tracking-tighter block mb-6">
                        NØR
                    </Link>
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-widest leading-relaxed">
                        High-Vanguard Sportswear.<br />
                        Engineered in CDMX.<br />
                        Global Shipping.
                    </p>
                </div>

                {/* Columna Shop */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-gray-900">Colecciones</h4>
                    <Link href="/shop" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Man FW25</Link>
                    <Link href="/shop" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Woman FW25</Link>
                    <Link href="/shop" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Accessories</Link>
                    <Link href="/shop" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Archived</Link>
                </div>

                {/* Columna Legal */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-gray-900">Soporte</h4>
                    <Link href="/help" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Envíos y Devoluciones</Link>
                    <Link href="/help" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Guía de Tallas</Link>
                    <Link href="/help" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Términos y Condiciones</Link>
                    <Link href="/help" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Política de Privacidad</Link>
                </div>

                {/* Columna Social */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-gray-900">Social</h4>
                    <a href="#" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Instagram</a>
                    <a href="#" className="font-body text-sm text-gray-500 hover:text-black transition-colors">TikTok</a>
                    <a href="#" className="font-body text-sm text-gray-500 hover:text-black transition-colors">Twitter / X</a>
                </div>
            </div>

            {/* 3. SUB-FOOTER (Copyright) */}
            <div className="px-6 md:px-12 py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                    © 2025 NØR SYSTEMS S.A. DE C.V.
                </p>
                <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        System Status: Online
                    </span>
                </div>
            </div>
        </footer>
    );
};