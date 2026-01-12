"use client";

import { motion } from "framer-motion";

const SPECS = [
    { titulo: "DURABILIDAD", desc: "Textiles resistentes a la abrasión para el uso diario en la ciudad." },
    { titulo: "REPELENCIA", desc: "Acabados hidrofóbicos que mantienen el cuerpo seco bajo la lluvia." },
    { titulo: "CONFORT", desc: "Corte articulado que permite movimiento total sin restricciones." },
];

export const TechSpecs = () => {
    return (
        <section className="w-full bg-white text-black py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-none mb-6">
                            DISEÑADO<br />PARA LA<br />REALIDAD.
                        </h2>
                        <p className="font-mono text-sm max-w-md text-gray-800 border-l-2 border-black pl-4">
                            No es un disfraz. Es ropa funcional diseñada en CDMX para resistir el clima, la calle y el caos urbano con estética minimalista.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {SPECS.map((item, i) => (
                            <div key={i} className="border-b border-black/10 pb-4">
                                <h3 className="font-display text-xl mb-2">{item.titulo}</h3>
                                <p className="font-mono text-xs text-gray-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};