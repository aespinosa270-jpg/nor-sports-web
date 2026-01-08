"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoBagOutline, IoMenuOutline } from "react-icons/io5";
import { CartDrawer } from "./CartDrawer";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/store/cartStore";

export const Navbar = () => {
    // Estado local para menú móvil
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Conexión al Store Global
    const { openCart, items } = useCartStore();

    // Total de items
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            {/* NAV BLANCO, FIJO Y SÓLIDO */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center bg-white border-b border-gray-100 py-4 shadow-sm">

                {/* LOGO MÁS GRANDE */}
                <Link href="/" className="relative z-50 block">
                    <Image
                        src="/assets/Nor.png"
                        alt="NØR"
                        width={160} // <--- AUMENTADO (Antes 90)
                        height={55} // <--- AUMENTADO PROPORCIONALMENTE
                        // 'invert' para que se vea negro (si la imagen original es blanca)
                        className="object-contain invert"
                        priority
                    />
                </Link>

                {/* MENÚ DESKTOP */}
                <div className="hidden md:flex gap-8 items-center">
                    {[
                        { name: "HOMBRE", href: "/shop/men" },
                        { name: "MUJER", href: "/shop/women" },
                        { name: "LABORATORIO", href: "/about" }
                    ].map((item, i) => (
                        <Link
                            key={i}
                            href={item.href}
                            className="relative group font-mono text-xs font-bold tracking-widest text-black overflow-hidden"
                        >
                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                                {item.name}
                            </span>
                            <span className="absolute left-0 top-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-gray-500">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* ÍCONOS */}
                <div className="flex items-center gap-6 text-black">

                    {/* Botón Carrito */}
                    <button
                        onClick={openCart}
                        className="relative group hover:scale-110 transition-transform"
                    >
                        <IoBagOutline size={22} />

                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-mono flex items-center justify-center rounded-full"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Botón Menú Móvil */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden text-2xl hover:opacity-60 transition-opacity"
                    >
                        <IoMenuOutline />
                    </button>
                </div>
            </nav>

            <CartDrawer />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};