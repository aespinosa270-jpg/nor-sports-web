import type { Metadata, Viewport } from "next"; // Importamos Viewport
import { Space_Mono, Syncopate, Inter_Tight } from "next/font/google"; // Agregamos Inter Tight para lectura
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";

// 1. Títulos Impactantes (Display)
const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

// 2. Datos Técnicos / Precios (Mono)
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

// 3. NUEVO: Cuerpo de Texto (Legibilidad)
// Syncopate cansa la vista en párrafos largos. Usamos Inter Tight para descripciones.
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
  description: "Advanced athletic gear designed in CDMX. Engineering meets brutalism.",
};

// Configuración vital para móviles en webs inmersivas
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Evita zoom accidental en iOS al tocar inputs
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${syncopate.variable} ${spaceMono.variable} ${interTight.variable} scroll-smooth`} // scroll-smooth nativo
    >
      <body className="bg-[#fcfcfc] text-black antialiased selection:bg-black selection:text-white relative overflow-x-hidden">

        {/* --- CAPA DE TEXTURA (CRÍTICO PARA EL LOOK) --- */}
        {/* En fondo blanco, usamos mix-blend-multiply para que el grano se vea grisáceo y táctil */}
        <div
          className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04] mix-blend-multiply"
          style={{ backgroundImage: 'url("/assets/noise.png")' }}
        />

        <CustomCursor />

        {/* Navbar fijo con z-index alto */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Wrapper principal */}
        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>

      </body>
    </html>
  );
}