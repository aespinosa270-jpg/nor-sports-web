"use client";

interface MarqueeProps {
    text: string;
    repeat?: number;
    duration?: string;
    className?: string;
}

export const Marquee = ({ text, repeat = 4, duration = "40s", className = "" }: MarqueeProps) => {
    return (
        <div className={`relative w-full overflow-hidden py-3 ${className}`}>

            <div
                className="flex w-max animate-marquee"
                style={{ animationDuration: duration }}
            >

                <div className="flex shrink-0 items-center">
                    {Array.from({ length: repeat }).map((_, i) => (
                        <span
                            key={`a-${i}`}
                            className="mx-6 font-display font-bold uppercase tracking-tighter select-none flex items-center"
                        >
                            {text}
                            <span className="opacity-50 mx-6 text-sm">///</span>
                        </span>
                    ))}
                </div>

                <div className="flex shrink-0 items-center">
                    {Array.from({ length: repeat }).map((_, i) => (
                        <span
                            key={`b-${i}`}
                            className="mx-6 font-display font-bold uppercase tracking-tighter select-none flex items-center"
                        >
                            {text}
                            <span className="opacity-50 mx-6 text-sm">///</span>
                        </span>
                    ))}
                </div>

            </div>
        </div>
    );
};