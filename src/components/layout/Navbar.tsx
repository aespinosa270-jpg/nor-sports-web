"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { IoBagOutline, IoMenuOutline } from "react-icons/io5";
import { CartDrawer } from "./CartDrawer";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/store/cartStore";

export const Navbar = () => {
    // Estado local solo para menú móvil
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Conexión al Store Global (Zustand)
    const { openCart, items } = useCartStore();

    // Calcular total de items
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    // Lógica de Scroll
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        if (latest > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3"
                    : "bg-transparent border-transparent py-5"
                    }`}
            >
                {/* LOGO */}
                <Link
                    href="/"
                    className="relative z-50 font-display text-3xl md:text-4xl font-bold tracking-tighter text-black uppercase"
                >
                    NØR
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
            </motion.nav>

            {/* Componentes Globales */}
            <CartDrawer />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};