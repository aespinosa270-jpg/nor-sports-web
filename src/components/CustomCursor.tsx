"use client";

import { motion } from "framer-motion";
import useMousePosition from "@/hooks/useMousePosition";
import { useState, useEffect } from "react";

export const CustomCursor = () => {
    const { x, y } = useMousePosition();
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
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

    if (!isMounted) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[9999]"
                animate={{
                    x: x - 4,
                    y: y - 4,
                    opacity: isHovered ? 0 : 1,
                }}
                transition={{ duration: 0 }}
            />

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