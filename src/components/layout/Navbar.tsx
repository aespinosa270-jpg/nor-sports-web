"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { IoBagOutline, IoMenuOutline } from "react-icons/io5";
import { CartDrawer } from "./CartDrawer";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
    // Estados para controlar la apertura de los menús
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Estados para la lógica visual del scroll
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Lógica "Smart Navbar": Detecta dirección del scroll
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;

        // 1. Ocultar barra si bajamos (scroll down) más de 150px
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        // 2. Cambiar estilo (fondo blanco/sombra) si no estamos en el tope (0px)
        if (latest > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <>
            {/* BARRA DE NAVEGACIÓN */}
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3" // Compacta al bajar
                    : "bg-transparent border-transparent py-5" // Espaciosa al inicio
                    }`}
            >
                {/* 1. LOGO (Negro sólido para contraste en tema blanco) */}
                <Link
                    href="/"
                    className="relative z-50 font-display text-3xl md:text-4xl font-bold tracking-tighter text-black uppercase"
                >
                    NØR
                </Link>

                {/* 2. LINKS CENTRO (Solo Desktop) */}
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
                            {/* Efecto Hover: El texto sube y aparece otro abajo */}
                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                                {item.name}
                            </span>
                            <span className="absolute left-0 top-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-gray-400">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* 3. ICONOS DERECHA (Carrito + Menú Móvil) */}
                <div className="flex items-center gap-6 text-black">

                    {/* Botón Carrito */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative group hover:scale-110 transition-transform"
                    >
                        <IoBagOutline size={22} />
                        {/* Badge contador */}
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-mono flex items-center justify-center rounded-full">
                            2
                        </span>
                    </button>

                    {/* Botón Menú Móvil (Solo visible en móviles 'md:hidden') */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden text-2xl hover:opacity-60 transition-opacity"
                    >
                        <IoMenuOutline />
                    </button>
                </div>
            </motion.nav>

            {/* INTEGRACIÓN DE CAJONES (Drawers) */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};