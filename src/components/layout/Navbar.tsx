"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoBagOutline, IoMenuOutline } from "react-icons/io5";
import { Truck } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/store/cartStore";

const WHATSAPP_NUMBER = "525617500002";
const WHATSAPP_MESSAGE = "Hola NØR, requiero asistencia técnica / información sobre un pedido.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { openCart, items } = useCartStore();

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const cartCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 font-sans transition-colors duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}>

                <nav className="px-6 md:px-12 h-16 flex justify-between items-center">

                    <Link href="/home" className="relative z-50 block hover:opacity-80 transition-opacity">
                        <Image
                            src="/assets/Nor.png"
                            alt="NØR"
                            width={110}
                            height={36}
                            className="object-contain"
                            priority
                        />
                    </Link>

                    <div className="hidden md:flex gap-12 absolute left-1/2 -translate-x-1/2">
                        <Link href="/shop" className="text-sm font-black uppercase tracking-[0.15em] text-white hover:text-red-600 transition-colors">
                            Colecciones
                        </Link>
                        <Link href="/about" className="text-sm font-black uppercase tracking-[0.15em] text-white hover:text-red-600 transition-colors">
                            Acerca de NØR
                        </Link>
                        <Link href="/norlab" className="text-sm font-black uppercase tracking-[0.15em] text-white hover:text-red-600 transition-colors">
                            Nor-Lab
                        </Link>
                        <Link href="/offers" className="text-sm font-black uppercase tracking-[0.15em] text-red-600 hover:text-red-500 transition-colors">
                            Ofertas
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6 text-white">
                        <button
                            onClick={openCart}
                            className="relative hover:scale-110 transition-transform rounded-full p-2 hover:bg-white/10"
                        >
                            <IoBagOutline size={22} />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute top-1 right-0 w-4 h-4 bg-red-600 text-black text-[9px] font-bold flex items-center justify-center rounded-full"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-2xl">
                            <IoMenuOutline />
                        </button>
                    </div>
                </nav>

                <div className="hidden md:flex justify-center items-center gap-2 py-2 border-t border-white/10 bg-black/40">
                    <Truck size={13} className="text-red-600" />
                    <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                        Envíos a toda la República Mexicana
                    </p>
                </div>
            </header>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};
