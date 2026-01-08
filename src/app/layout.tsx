import type { Metadata, Viewport } from "next";
import { Space_Mono, Syncopate, Inter_Tight } from "next/font/google";
import "./globals.css";
// Asegúrate que estos componentes existan o coméntalos si aún no los creas
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";

// 1. Títulos Impactantes
const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

// 2. Datos Técnicos
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

// 3. Texto Legible
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NØR Systems",
    default: "NØR | High-Vanguard Sportswear",
  },
  description: "Advanced athletic gear designed in CDMX.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ESTE ES EL COMPONENTE QUE NEXT.JS NO ENCONTRABA
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${syncopate.variable} ${spaceMono.variable} ${interTight.variable} scroll-smooth`}
    >
      <body className="bg-[#fcfcfc] text-black antialiased selection:bg-black selection:text-white relative overflow-x-hidden">

        {/* Textura de ruido */}
        <div
          className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04] mix-blend-multiply"
          style={{ backgroundImage: 'url("/assets/noise.png")' }}
        />

        {/* Si aún no tienes el componente CustomCursor, comenta esta línea: */}
        {/* <CustomCursor /> */}

        <div className="relative z-50">
          <Navbar />
        </div>

        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}