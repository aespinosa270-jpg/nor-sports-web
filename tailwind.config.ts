import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // 1. TIPOGRAFÍA (Conectada a layout.tsx)
            fontFamily: {
                display: ["var(--font-display)", "sans-serif"], // Syncopate (Títulos Gigantes)
                mono: ["var(--font-mono)", "monospace"],       // Space Mono (Datos Técnicos)
                body: ["var(--font-body)", "sans-serif"],       // Inter Tight (Textos Largos - NUEVO)
            },

            // 2. PALETA DE COLORES "CLINICAL BRUTALISM"
            colors: {
                nor: {
                    black: "#050505",    // Negro profundo (no 000000 para evitar ghosting en OLED)
                    dark: "#1a1a1a",     // Gris oscuro para UI secundaria
                    concrete: "#f3f4f6", // Gris muy claro para fondos de tarjetas en tema blanco
                    white: "#fcfcfc",    // Blanco "papel" (menos agresivo que #ffffff)
                    accent: "#FF3333",   // Rojo industrial (opcional, para alertas o CTAs)
                }
            },

            // 3. ANIMACIONES PERSONALIZADAS
            animation: {
                'blink': 'blink 1s step-end infinite', // Para el cursor "_"
                'slow-spin': 'spin 10s linear infinite', // Para elementos decorativos
                'marquee': 'marquee 25s linear infinite', // Para cintas de texto en movimiento
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },

            // 4. TAMAÑOS DE FUENTE EXTREMOS
            fontSize: {
                '10xl': '10rem',
                '12xl': '12rem', // Para el "NØR" gigante del Hero
            }
        },
    },
    plugins: [],
};
export default config;