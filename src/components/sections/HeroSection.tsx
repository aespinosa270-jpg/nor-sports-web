"use client";

import Image from "next/image";

export const HeroSection = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-nor-black">

            {/* CAMBIO: Extensión .jpg */}
            <Image
                src="/assets/heroman.jpg"
                alt="NØR Future Performance"
                fill
                className="object-cover object-center z-0"
                priority
                quality={100}
            />

            <div className="absolute bottom-8 right-6 hidden md:block z-10 mix-blend-difference">
                <p className="font-mono text-[10px] text-white/80 text-right leading-tight tracking-widest">
                    SYSTEM_COORDS:<br />
                    LAT: 19.4326° N <br />
                    LONG: 99.1332° W
                </p>
            </div>

        </section>
    );
};