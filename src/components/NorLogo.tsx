"use client";

import { motion } from "framer-motion";

export const NorLogo = () => {
    return (
        <div className="relative z-20 flex items-center justify-center gap-2 md:gap-4 select-none">

            <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
                className="font-display text-[5rem] md:text-[10rem] font-bold tracking-tighter text-white leading-none"
            >
                N
            </motion.span>

            <div className="relative flex items-center justify-center w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem]">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">

                    <motion.circle
                        cx="50" cy="50" r="45"
                        stroke="white" strokeWidth="6" fill="transparent"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                    />

                    <motion.line
                        x1="-10" y1="-10" x2="110" y2="110"
                        stroke="white" strokeWidth="4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "circOut" }}
                    />
                </svg>
            </div>

            <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "circOut", delay: 0.6 }}
                className="font-display text-[5rem] md:text-[10rem] font-bold tracking-tighter text-white leading-none"
            >
                R
            </motion.span>

        </div>
    );
};