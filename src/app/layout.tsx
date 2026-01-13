import type { Metadata, Viewport } from "next";
import { Space_Mono, Syncopate, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { CartSidebar } from "@/components/layout/CartSidebar";
import { CookieBanner } from "@/components/layout/CookieBanner"; // <--- IMPORTANTE

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
    <html
      lang="es"
      className={`${syncopate.variable} ${spaceMono.variable} ${interTight.variable} scroll-smooth`}
    >
      <body className="bg-[#fcfcfc] text-black antialiased selection:bg-black selection:text-white relative overflow-x-hidden">

        {/* Textura de Ruido Global */}
        <div
          className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04] mix-blend-multiply"
          style={{ backgroundImage: 'url("/assets/noise.png")' }}
        />

        <CustomCursor />

        <CartSidebar />

        <div className="relative z-50">
          <Navbar />
        </div>

        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>

        {/* Banner de Cookies al final */}
        <CookieBanner />

      </body>
    </html>
  );
}