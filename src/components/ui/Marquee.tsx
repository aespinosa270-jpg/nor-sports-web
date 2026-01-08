"use client";

interface MarqueeProps {
    text: string;
    repeat?: number; // Cuántas veces se repite el texto por bloque
}

export const Marquee = ({ text, repeat = 4 }: MarqueeProps) => {
    return (
        <div className="relative w-full overflow-hidden border-y border-nor-black/10 bg-nor-concrete py-3">
            {/* Contenedor Flex que se anima */}
            <div className="flex w-max animate-marquee">

                {/* BLOQUE 1 */}
                <div className="flex shrink-0 items-center">
                    {Array.from({ length: repeat }).map((_, i) => (
                        <span
                            key={`a-${i}`}
                            className="mx-6 font-display text-2xl md:text-4xl font-bold uppercase tracking-tighter text-nor-black select-none flex items-center"
                        >
                            {text}
                            {/* Separador Técnico */}
                            <span className="text-nor-accent mx-6 text-sm">///</span>
                        </span>
                    ))}
                </div>

                {/* BLOQUE 2 (Duplicado para el loop infinito sin cortes) */}
                <div className="flex shrink-0 items-center">
                    {Array.from({ length: repeat }).map((_, i) => (
                        <span
                            key={`b-${i}`}
                            className="mx-6 font-display text-2xl md:text-4xl font-bold uppercase tracking-tighter text-nor-black select-none flex items-center"
                        >
                            {text}
                            <span className="text-nor-accent mx-6 text-sm">///</span>
                        </span>
                    ))}
                </div>

            </div>
        </div>
    );
};