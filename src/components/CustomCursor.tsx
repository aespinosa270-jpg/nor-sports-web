"use client";

import { motion } from "framer-motion";
import useMousePosition from "@/hooks/useMousePosition";
import { useState, useEffect } from "react";

export const CustomCursor = () => {
    const { x, y } = useMousePosition();
    const [isHovered, setIsHovered] = useState(false);

    // Detectar si estamos sobre un botón o link para hacer el efecto de "imán"
    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("cursor-hover"); // Clase manual por si acaso

            setIsHovered(!!isClickable);
        };

        window.addEventListener("mouseover", handleMouseOver);
        return () => window.removeEventListener("mouseover", handleMouseOver);
    }, []);

    // Evitar render en servidor (fix hidratación)
    if (typeof window === "undefined") return null;

    return (
        <>
            {/* 1. EL PUNTO CENTRAL (Fijo y rápido) */}
            <motion.div
                className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: x - 2,
                    y: y - 2,
                    opacity: isHovered ? 0 : 1, // Desaparece al hacer hover
                }}
                transition={{ duration: 0 }}
            />

            {/* 2. EL ANILLO (Suave y con delay) */}
            <motion.div
                className="fixed top-0 left-0 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
                animate={{
                    x: x - (isHovered ? 24 : 10), // Centrado dinámico
                    y: y - (isHovered ? 24 : 10),
                    width: isHovered ? 48 : 20,   // Se agranda al hacer hover
                    height: isHovered ? 48 : 20,
                    backgroundColor: isHovered ? "white" : "transparent", // Se llena de blanco
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