import type { Metadata, Viewport } from "next";
import { Space_Mono, Syncopate, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
// Se elimina la importación de CustomCursor
import { CartSidebar } from "@/components/layout/CartSidebar";
import { CookieBanner } from "@/components/layout/CookieBanner";

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NØR Systems",
    default: "NØR | Ropa Deportiva de Alta Vanguardia",
  },
  description: "Equipo atlético avanzado diseñado en CDMX.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 👇 AQUÍ AGREGAMOS LA SOLUCIÓN: data-scroll-behavior="smooth"
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${syncopate.variable} ${spaceMono.variable} ${interTight.variable} scroll-smooth`}
    >
      <body className="bg-[#fcfcfc] text-black antialiased selection:bg-black selection:text-white relative overflow-x-hidden">

        {/* Textura de Ruido Global */}
        <div
          className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04] mix-blend-multiply"
          style={{ backgroundImage: 'url("/assets/noise.png")' }}
        />

        {/* Se eliminó <CustomCursor /> */}
        <CartSidebar />

        <div className="relative z-50">
          <Navbar />
        </div>

        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>

        <CookieBanner />

      </body>
    </html>
  );
}