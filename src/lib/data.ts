// Esta será tu base de datos simulada
export const PRODUCTS = [
    {
        id: 1,
        slug: "aero-dry-shell",
        name: "AERO-DRY SHELL",
        price: 2890,
        tag: "WATERPROOF",
        description: "Diseñada en los laboratorios de NØR. Membrana impermeable de 3 capas.",
        variants: [
            { colorName: "Onyx", colorHex: "#111111", image: "/p1-black.jpg" },
            { colorName: "Concrete", colorHex: "#888888", image: "/p1-gray.jpg" }
        ]
    },
    {
        id: 2,
        slug: "kinetic-tights",
        name: "KINETIC TIGHTS V2",
        price: 1200,
        tag: "COMPRESSION",
        description: "Compresión graduada para recuperación muscular en movimiento.",
        variants: [
            { colorName: "Black", colorHex: "#050505", image: "/p2-black.jpg" },
            { colorName: "Navy", colorHex: "#1a2b4b", image: "/p2-navy.jpg" }
        ]
    },
    // ... Agrega el resto de tus productos aquí
];

export const getProductById = (id: number) => PRODUCTS.find(p => p.id === id);