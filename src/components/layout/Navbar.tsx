"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoBagOutline, IoMenuOutline, IoSearchOutline, IoHeartOutline } from "react-icons/io5";
import { CartDrawer } from "./CartDrawer";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/store/cartStore";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openCart, items } = useCartStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            {/* WRAPPER FIJO */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm font-sans">

                {/* 1. TOP BAR (Información Técnica / Estado del Sistema) */}
                <div className="hidden md:flex justify-between items-center px-12 py-2 bg-[#F5F5F5] text-[11px] font-bold text-gray-500">
                    <div className="flex gap-4">
                        <span className="cursor-default tracking-widest">NØR SYSTEMS // FW25</span>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/norlab" className="hover:text-black transition-colors">Estado del Sistema: ONLINE</Link>
                        <span>|</span>
                        <Link href="/help" className="hover:text-black transition-colors">Soporte</Link>
                    </div>
                </div>

                {/* 2. NAVBAR PRINCIPAL */}
                <nav className="px-6 md:px-12 h-16 flex justify-between items-center bg-white">

                    {/* LOGO */}
                    <Link href="/" className="relative z-50 block">
                        <Image
                            src="/assets/Nor.png"
                            alt="NØR"
                            width={120}
                            height={40}
                            className="object-contain invert"
                            priority
                        />
                    </Link>

                    {/* MENÚ CENTRADO (Simplificado: Colección + NorLab) */}
                    <div className="hidden md:flex gap-12 absolute left-1/2 -translate-x-1/2">
                        {[
                            { name: "Colección", href: "/shop" },    // <--- Única sección de compra
                            { name: "Nor-Lab", href: "/norlab" }      // <--- Sección de Tecnología
                        ].map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className="text-base font-black uppercase tracking-tight text-black hover:text-gray-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* ÍCONOS DERECHA */}
                    <div className="flex items-center gap-4 md:gap-6 text-black">

                        {/* Buscador */}
                        <div className="hidden md:flex items-center bg-[#F5F5F5] rounded-full px-4 py-2 hover:bg-[#E5E5E5] transition-colors cursor-pointer group w-44">
                            <IoSearchOutline size={20} className="text-black group-hover:scale-110 transition-transform" />
                            <span className="ml-2 text-xs font-bold text-gray-400 group-hover:text-gray-600">Buscar ID...</span>
                        </div>

                        {/* Favoritos */}
                        <button className="hidden md:block hover:scale-110 transition-transform rounded-full p-2 hover:bg-gray-100">
                            <IoHeartOutline size={24} />
                        </button>

                        {/* Bolsa */}
                        <button onClick={openCart} className="relative hover:scale-110 transition-transform rounded-full p-2 hover:bg-gray-100">
                            <IoBagOutline size={24} />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute top-1 right-0 w-4 h-4 bg-black text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        {/* Menú Móvil */}
                        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-2xl">
                            <IoMenuOutline />
                        </button>
                    </div>
                </nav>

                {/* 3. BANNER (Mensaje técnico) */}
                <div className="bg-[#F5F5F5] py-2 text-center border-t border-gray-200">
                    <p className="text-[11px] md:text-xs font-bold text-black uppercase tracking-wide">
                        Arquitectura modular disponible • <Link href="/shop" className="underline">Ver Sistema</Link>
                    </p>
                </div>

            </header>

            <CartDrawer />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};