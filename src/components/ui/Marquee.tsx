"use client";

interface MarqueeProps {
    text: string;
    repeat?: number;
}

export const Marquee = ({ text, repeat = 4 }: MarqueeProps) => {
    return (
        <div className="relative w-full overflow-hidden border-y border-black py-3 bg-white">
            {/* Contenedor que se mueve */}
            <div className="flex w-max animate-marquee">
                {Array.from({ length: repeat }).map((_, i) => (
                    <span
                        key={i}
                        className="mx-4 font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-black select-none"
                    >
                        {text} <span className="text-gray-300 mx-4">—</span>
                    </span>
                ))}
                {/* Duplicamos para el efecto infinito sin cortes */}
                {Array.from({ length: repeat }).map((_, i) => (
                    <span
                        key={`dup-${i}`}
                        className="mx-4 font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter text-black select-none"
                    >
                        {text} <span className="text-gray-300 mx-4">—</span>
                    </span>
                ))}
            </div>
        </div>
    );
};