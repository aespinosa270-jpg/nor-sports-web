"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";

/**
 * PORTAL DE MARCAS — raíz del sitio.
 * Cada panel respira el ADN de su marca:
 *  · NØR  → negro / rojo, velocidad, mono técnico
 *  · SOMA → azul marino / plata, lujo quirúrgico, serif silencioso
 *  · MTHD → blanco y negro editorial, video cinemático
 * El grid las une como ecosistema; el hover revela el mundo de cada una.
 */

export default function Portal() {
    return (
        <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col overflow-hidden">

            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

            {/* Cabecera */}
            <div className="relative z-10 flex justify-between items-center px-6 md:px-10 py-5 border-b border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                    Sistema de marcas
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60" />
                    </span>
                    Online · MX
                </span>
            </div>

            {/* Paneles */}
            <div className="relative z-10 flex-1 flex flex-col md:flex-row">
                <NorPanel />
                <SomaPanel />
                <MthdPanel />
            </div>

            {/* Pie */}
            <div className="relative z-10 flex justify-between items-center px-6 md:px-10 py-4 border-t border-white/10">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                    © 2026 · Ecosistema NØR / SOMA / MTHD
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                    CDMX · 19.43° N
                </span>
            </div>
        </div>
    );
}

/* ---------- Shell común de cada panel ---------- */
function PanelShell({
    href, externo, enter, children, hoverBg,
}: {
    href: string; externo: boolean; enter: number;
    children: React.ReactNode; hoverBg: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const clases =
        "group relative flex-1 border-b md:border-b-0 md:border-r border-white/10 last:border-0 " +
        "overflow-hidden transition-[flex-grow] duration-700 ease-out hover:flex-[1.4] " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2";

    const inner = (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + enter * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
        >
            {/* Fondo del mundo de la marca, aparece al hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${hoverBg}`} />
            <div className="relative h-full w-full flex flex-col justify-between p-6 md:p-10">
                {children}
            </div>
        </motion.div>
    );

    return externo
        ? <a href={href} className={clases}>{inner}</a>
        : <Link href={href} className={clases}>{inner}</Link>;
}

/* ---------- NØR: velocidad, negro/rojo ---------- */
function NorPanel() {
    return (
        <PanelShell href="/home" externo={false} enter={0} hoverBg="bg-black">
            <div className="flex justify-between items-start relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">01 / 03</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] px-2 py-1 border border-white/15 text-white/50 group-hover:border-[#FF2D23] group-hover:text-[#FF2D23] transition-colors">
                    entrar
                </span>
            </div>

            {/* barra roja diagonal al hover */}
            <div className="absolute left-[-15%] top-1/2 w-[130%] h-[3px] bg-[#FF2D23] -rotate-[9deg] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />

            <div className="relative z-10">
                <h2 className="font-display font-black uppercase tracking-tighter leading-[0.85] text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic -skew-x-[9deg] transition-transform duration-500 group-hover:-translate-y-2">
                    N
                    <span className="relative inline-block not-italic skew-x-[9deg]">
                        O
                        <span className="absolute left-[-10%] top-1/2 w-[120%] h-[0.06em] bg-[#FF2D23] -rotate-[52deg] origin-center" />
                    </span>
                    R
                </h2>
                <p className="mt-4 font-mono text-[11px] md:text-xs uppercase tracking-[0.35em] font-bold text-[#FF2D23]">
                    Línea deportiva
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 max-w-[240px]">
                    Ingeniería textil para el movimiento
                </p>
            </div>

            <div className="flex justify-between items-end relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 group-hover:text-white/70 transition-colors">
                    nor.com.mx
                </span>
                <span className="font-display text-3xl md:text-4xl text-white/30 group-hover:text-[#FF2D23] group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300">↗</span>
            </div>
        </PanelShell>
    );
}

/* ---------- SOMA: lujo quirúrgico, azul marino/plata ---------- */
function SomaPanel() {
    return (
        <PanelShell href="https://soma.com.mx" externo enter={1} hoverBg="bg-[#0F1B2D]">
            {/* Campaña de fondo, muy sutil */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-1000">
                <Image src="/assets/brands/soma-campaign.png" alt="" fill className="object-cover object-top" sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1B2D]/70 via-[#0F1B2D]/40 to-[#0F1B2D]" />
            </div>

            <div className="flex justify-between items-start relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">02 / 03</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] px-2 py-1 border border-white/15 text-white/50 group-hover:border-[#C7D0DA] group-hover:text-[#C7D0DA] transition-colors">
                    sitio externo ↗
                </span>
            </div>

            {/* línea plata fina que cruza (guiño a las suturas / el hilo del logo) */}
            <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#C7D0DA]/60 to-transparent scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-1000 ease-out z-0" />

            <div className="relative z-10">
                <h2
                    className="uppercase leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl transition-transform duration-500 group-hover:-translate-y-1 bg-gradient-to-b from-white via-[#DDE3EA] to-[#8B97A5] bg-clip-text text-transparent"
                    style={{ fontFamily: "'Times New Roman', Georgia, serif", letterSpacing: "0.08em", fontWeight: 400 }}
                >
                    SOMA
                </h2>
                <p className="mt-5 font-mono text-[11px] md:text-xs uppercase tracking-[0.4em] text-[#C7D0DA]">
                    Surgical wear
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 max-w-[240px]">
                    Vestimenta quirúrgica de lujo
                </p>
            </div>

            <div className="flex justify-between items-end relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 group-hover:text-[#C7D0DA] transition-colors">
                    soma.com.mx
                </span>
                <span className="text-3xl md:text-4xl text-white/30 group-hover:text-[#C7D0DA] group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" style={{ fontFamily: "Georgia, serif" }}>↗</span>
            </div>
        </PanelShell>
    );
}

/* ---------- MTHD: editorial B&N, video cinemático ---------- */
function MthdPanel() {
    return (
        <PanelShell href="https://mthd.com.mx" externo enter={2} hoverBg="bg-black">
            {/* Video loop al hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <video
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                    poster="/assets/brands/mthd-poster.jpg"
                    autoPlay muted loop playsInline preload="none"
                >
                    <source src="/assets/brands/mthd-loop.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
            </div>

            <div className="flex justify-between items-start relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">03 / 03</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] px-2 py-1 border border-white/20 text-white/60 group-hover:border-white group-hover:text-white transition-colors">
                    sitio externo ↗
                </span>
            </div>

            <div className="relative z-10">
                <h2
                    className="font-black uppercase leading-[0.85] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ letterSpacing: "0.02em" }}
                >
                    MTHD
                </h2>
                <div className="mt-5 h-px w-16 bg-white/70 group-hover:w-28 transition-all duration-500" />
                <p className="mt-4 font-mono text-[11px] md:text-xs uppercase tracking-[0.4em] text-white/80">
                    Método
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 max-w-[240px]">
                    Sistema y disciplina
                </p>
            </div>

            <div className="flex justify-between items-end relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 group-hover:text-white transition-colors">
                    mthd.com.mx
                </span>
                <span className="text-3xl md:text-4xl text-white/40 group-hover:text-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300">↗</span>
            </div>
        </PanelShell>
    );
}
