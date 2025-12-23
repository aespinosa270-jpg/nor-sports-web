import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ["var(--font-mono)", "monospace"],
                display: ["var(--font-display)", "sans-serif"],
            },
            colors: {
                nor: {
                    black: "#050505",
                    gray: "#1a1a1a",
                }
            }
        },
    },
    plugins: [],
};
export default config;