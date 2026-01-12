"use client";

interface MarqueeProps {
    text: string;
    repeat?: number;
}

export const Marquee = ({ text, repeat = 4 }: MarqueeProps) => {
    return (
        <div className="relative w-full overflow-hidden border-y border-nor-black/10 bg-nor-concrete py-3">
            <div className="flex w-max animate-marquee">

                <div className="flex shrink-0 items-center">
                    {Array.from({ length: repeat }).map((_, i) => (
                        <span
                            key={`a-${i}`}
                            className="mx-6 font-display text-2xl md:text-4xl font-bold uppercase tracking-tighter text-nor-black select-none flex items-center"
                        >
                            {text}
                            <span className="text-nor-accent mx-6 text-sm">///</span>
                        </span>
                    ))}
                </div>

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