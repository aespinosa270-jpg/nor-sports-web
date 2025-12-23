import type { Metadata } from "next";
import { Space_Mono, Syncopate } from "next/font/google";
import "./globals.css";

// 1. IMPORTAMOS EL CURSOR (Tu código original)
import { CustomCursor } from "@/components/CustomCursor";
// 2. IMPORTAMOS EL NAVBAR (Lo único nuevo que agregamos)
import { Navbar } from "@/components/layout/Navbar";

// Cargamos fuentes de Google optimizadas
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "NOR | READY OR NOT",
  description: "High-End Technical Wear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceMono.variable} ${syncopate.variable}`}>
      <body className="bg-black text-white antialiased overflow-x-hidden selection:bg-white selection:text-black">

        {/* 2. AQUI VA EL CURSOR (Arriba de todo para que renderice primero) */}
        <CustomCursor />

        {/* 3. AQUI VA EL NAVBAR (Nuevo - Para que se vea el menú y el carrito) */}
        <Navbar />

        {/* Textura de Ruido de fondo */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100"></div>

        {children}
      </body>
    </html>
  );
}
