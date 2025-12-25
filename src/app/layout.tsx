import type { Metadata } from "next";
import { Space_Mono, Syncopate } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";

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
  title: "NOR | High-Vanguard Sportswear",
  description: "Advanced athletic gear designed in CDMX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceMono.variable} ${syncopate.variable}`}>
      {/* CAMBIO: Fondo blanco, texto negro, sin overflow-x-hidden en el body */}
      <body className="bg-white text-black antialiased selection:bg-black selection:text-white">
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
