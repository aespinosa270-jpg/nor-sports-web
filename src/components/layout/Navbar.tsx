"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoBagOutline } from "react-icons/io5";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                // Aumenté el padding vertical (py-8) para que quepan las letras gigantes
                className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference text-white"
            >
                {/* 1. LOGO GIGANTE (Triple de grande: text-5xl a text-7xl) */}
                <Link
                    href="/"
                    className="font-display text-5xl md:text-7xl font-bold tracking-tighter hover:scale-105 transition-transform origin-left"
                >
                    NØR
                </Link>

                {/* 2. LINKS GIGANTES (text-2xl) */}
                <div className="hidden md:flex gap-12 font-mono text-2xl tracking-widest">
                    <Link href="/shop" className="hover:text-gray-400 transition-colors">TIENDA</Link>
                    <Link href="/about" className="hover:text-gray-400 transition-colors">FILOSOFÍA</Link>
                    <Link href="/journal" className="hover:text-gray-400 transition-colors">JOURNAL</Link>
                </div>

                {/* 3. CARRITO GIGANTE (Icono size=50 y texto grande) */}
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="flex items-center gap-4 font-mono text-2xl hover:opacity-70 group"
                >
                    <span className="hidden md:block tracking-widest">CARRITO</span>
                    <div className="relative">
                        {/* Icono al triple de tamaño (antes 20, ahora 50) */}
                        <IoBagOutline size={50} />

                        {/* Contador ajustado al nuevo tamaño */}
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-pulse border border-black" />
                    </div>
                </button>
            </motion.nav>

            {/* Renderizamos el Carrito aquí mismo */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};