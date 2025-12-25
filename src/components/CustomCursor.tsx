"use client";

import { motion } from "framer-motion";
import useMousePosition from "@/hooks/useMousePosition";
import { useState, useEffect } from "react";

export const CustomCursor = () => {
    const { x, y } = useMousePosition();
    const [isHovered, setIsHovered] = useState(false);
    // Esta es la clave: una variable para saber si ya estamos en el navegador
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Activamos esto solo cuando el componente ya cargó en el cliente
        setIsMounted(true);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Detectamos botones, links o elementos interactivos
            const isClickable =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("cursor-hover");

            setIsHovered(!!isClickable);
        };

        window.addEventListener("mouseover", handleMouseOver);
        return () => window.removeEventListener("mouseover", handleMouseOver);
    }, []);

    // SI NO ESTÁ MONTADO, NO RENDERIZAS NADA (Ni en server ni en primer render del cliente)
    // Esto arregla el error de hidratación.
    if (!isMounted) return null;

    return (
        <>
            {/* 1. EL PUNTO CENTRAL */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[9999]"
                animate={{
                    x: x - 4, // Ajuste para centrar (mitad del width)
                    y: y - 4,
                    opacity: isHovered ? 0 : 1,
                }}
                transition={{ duration: 0 }}
            />

            {/* 2. EL ANILLO */}
            <motion.div
                className="fixed top-0 left-0 border border-black rounded-full pointer-events-none z-[9998]"
                animate={{
                    x: x - (isHovered ? 24 : 10),
                    y: y - (isHovered ? 24 : 10),
                    width: isHovered ? 48 : 20,
                    height: isHovered ? 48 : 20,
                    opacity: 1,
                    backgroundColor: isHovered ? "rgba(0,0,0,0.1)" : "transparent",
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1
                }}
            />
        </>
    );
};