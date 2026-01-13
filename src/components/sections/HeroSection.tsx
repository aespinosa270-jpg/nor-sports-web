"use client";

import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-nor-black">

            <div className="hidden md:block absolute inset-0 z-0">
                <Image
                    src="/assets/K12.jpg"
                    alt="NØR Campaign Desktop"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={90}
                    sizes="100vw"
                />
            </div>

            <div className="block md:hidden absolute inset-0 z-0">
                <Image
                    src="/assets/B55.jpg"
                    alt="NØR Campaign Mobile"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={90}
                    sizes="100vw"
                />
            </div>

            <div className="absolute inset-0 bg-black/20 z-10" />

            <div className="absolute bottom-20 left-6 md:left-12 z-20 max-w-2xl text-white">
                <p className="font-bold text-sm md:text-base mb-2 uppercase tracking-wide text-gray-300">
                    NØR Tech
                </p>

                <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
                    IMPULSO <br />
                    INFINITO
                </h1>

                <p className="font-medium text-base md:text-lg mb-8 max-w-md leading-snug drop-shadow-md text-gray-100">
                    Diseñado para el movimiento. Ingeniería térmica que se adapta a tu cuerpo en cada sprint.
                </p>

                <div>
                    <Link href="/shop">
                        <button className="bg-white text-black px-10 py-4 rounded-full font-black text-sm md:text-base uppercase tracking-wider hover:bg-gray-200 transition-colors active:scale-95 shadow-lg">
                            Colección Dry-Fit
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};