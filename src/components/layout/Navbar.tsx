"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoBagOutline, IoMenuOutline } from "react-icons/io5";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                // CAMBIO: Fondo blanco sólido, texto negro, border inferior sutil
                className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center bg-white border-b border-gray-100"
            >
                {/* 1. LOGO (Limpio y negro) */}
                <Link
                    href="/"
                    className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-black uppercase"
                >
                    NØR
                </Link>

                {/* 2. LINKS CENTRO (Estilo Adidas: negro, negrita, limpios) */}
                <div className="hidden md:flex gap-8 font-display text-sm font-bold tracking-widest text-black">
                    <Link href="/shop" className="hover:opacity-60 transition-opacity">HOMBRE</Link>
                    <Link href="/shop" className="hover:opacity-60 transition-opacity">MUJER</Link>
                    <Link href="/about" className="hover:opacity-60 transition-opacity">NOSOTROS</Link>
                </div>

                {/* 3. ICONOS DERECHA */}
                <div className="flex items-center gap-6 text-black">
                    {/* Botón de menú móvil (hamburguesa) */}
                    <button className="md:hidden text-2xl">
                        <IoMenuOutline />
                    </button>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative group"
                    >
                        <IoBagOutline size={24} />
                        {/* Contador estilo badge */}
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] font-mono flex items-center justify-center rounded-full">
                            2
                        </span>
                    </button>
                </div>
            </motion.nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};