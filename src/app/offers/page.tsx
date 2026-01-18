"use client";

import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/home/ProductCard";
import { getSaleProducts } from "@/lib/data";

export default function OffersPage() {
    const saleProducts = getSaleProducts();

    return (
        <main className="min-h-screen w-full bg-nor-white text-nor-black pt-20 selection:bg-nor-black selection:text-white">

            {/* HEADER */}
            <header className="border-b border-nor-black bg-nor-white">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 md:py-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <span className="font-mono text-[10px] font-bold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-2 animate-pulse">
                                <span className="w-2 h-2 bg-red-600 rounded-full" />
                                LIQUIDACIÓN DE TEMPORADA // FASE 1
                            </span>
                            <h1 className="font-display font-black text-5xl md:text-8xl uppercase tracking-tighter leading-[0.8]">
                                ZONA DE<br />OFERTAS<span className="text-red-600">.</span>
                            </h1>
                        </div>
                        <div className="max-w-xs text-right md:text-left border-l-2 border-red-600 pl-4">
                            <p className="font-mono text-[10px] text-nor-dark/60 uppercase tracking-widest leading-relaxed">
                                Inventario remanente de alta calidad.<br />
                                Precios finales no negociables.<br />
                                Envíos inmediatos.
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <section className="min-h-[60vh] border-b border-nor-black">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">

                        {saleProducts.length > 0 ? (
                            saleProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center border border-dashed border-nor-black/20">
                                <p className="font-mono text-xs text-nor-dark/50 uppercase">
                                    NO HAY OFERTAS ACTIVAS EN ESTE MOMENTO.
                                </p>
                            </div>
                        )}

                        <div className="hidden lg:flex items-center justify-center aspect-[3/4] border border-dashed border-nor-black/10">
                            <span className="font-mono text-[10px] text-nor-dark/30 uppercase tracking-widest">ESPACIO DISPONIBLE</span>
                        </div>
                        <div className="hidden lg:flex items-center justify-center aspect-[3/4] border border-dashed border-nor-black/10">
                            <span className="font-mono text-[10px] text-nor-dark/30 uppercase tracking-widest">ESPACIO DISPONIBLE</span>
                        </div>
                        <div className="hidden lg:flex items-center justify-center aspect-[3/4] border border-dashed border-nor-black/10">
                            <span className="font-mono text-[10px] text-nor-dark/30 uppercase tracking-widest">ESPACIO DISPONIBLE</span>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-12 px-6 border-b border-nor-black/10 bg-[#FAFAFA] text-center">
                <p className="font-mono text-[10px] text-nor-dark/50 uppercase tracking-widest">
                    FIN DEL INVENTARIO PROMOCIONAL
                </p>
            </section>

            <Footer />
        </main>
    );
}