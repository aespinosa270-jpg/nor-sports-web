// src/lib/data.ts

export interface ProductVariant {
    colorName: string;
    colorHex: string;
    image: string;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    originalPrice?: number;
    discountTag?: string;
    tag?: string;
    category: string;
    description: string;
    features: string[];
    mainImage: string;
    variants: ProductVariant[];
    gallery?: string[];
}

export const PRODUCTS: Product[] = [
    // 1. NOR ONE (INTACTO - NO SE TOCÓ)
    {
        id: "1",
        slug: "nor-one",
        name: "NOR ONE",
        price: 50,
        originalPrice: 70,
        discountTag: "-29%",
        tag: "BREATHABLE",
        category: "Playera",
        description: "Arquitectura textil en Micropiqué 100% Poliéster diseñada para maximizar el flujo de aire. Ligereza absoluta para sesiones de alta intensidad.",
        features: ["Tejido Micropiqué 100% Poliéster", "Evaporación instantánea", "Corte Regular Fit"],
        mainImage: "/assets/products/NORONE.png",
        gallery: [
            "/assets/products/NORONE.png",
            "/assets/products/NORONE2.png",
            "/assets/products/NORONE3.png"
        ],
        variants: [
            {
                colorName: "Ghost",
                colorHex: "#f0f0f0",
                image: "/assets/products/NORONE2.png"
            }
        ]
    },

    // 2. NOR PULSE (Tela Micropanal) - PRECIO ACTUALIZADO
    {
        id: "2",
        slug: "nor-pulse",
        name: "NOR PULSE",
        price: 70, // 👈 Cuestan 70 pesos
        tag: "MICROPANAL",
        category: "Playera",
        description: "Ingeniería de tejido en Micropanal. Su estructura de celdas optimiza la gestión térmica corporal absorbiendo el sudor rápidamente.",
        features: ["Matriz de Micropanal", "Secado ultra-rápido", "Tacto suave premium"],
        mainImage: "/assets/products/NORONE.png",
        variants: [
            { colorName: "Slate", colorHex: "#334155", image: "/assets/products/NORONE.png" },
            { colorName: "Olive", colorHex: "#3f4d3a", image: "/assets/products/NORONE.png" }
        ]
    },

    // 3. NOR ACTIVE PRO (Tela Ares) - PRECIO ACTUALIZADO
    {
        id: "3",
        slug: "nor-active-pro",
        name: "NOR ACTIVE PRO",
        price: 70, // 👈 Cuestan 70 pesos
        tag: "ARES TECH",
        category: "Playera",
        description: "Diseñada en Tela Ares de alto rendimiento. Una fibra suave al tacto pero extremadamente resistente, ideal para entrenamientos de fuerza y uso rudo.",
        features: ["Tecnología textil Ares", "Resistencia superior", "Elasticidad mecánica"],
        mainImage: "/assets/products/NORONE.png",
        variants: [
            { colorName: "Obsidian", colorHex: "#000000", image: "/assets/products/NORONE.png" },
            { colorName: "Navy", colorHex: "#1e293b", image: "/assets/products/NORONE.png" }
        ]
    },

    // 4. NOR ACTIVE VENT (Tela Piqué Vera) - PRECIO ACTUALIZADO
    {
        id: "4",
        slug: "nor-active-vent",
        name: "NOR ACTIVE VENT",
        price: 70, // 👈 Cuestan 70 pesos
        tag: "PIQUE VERA",
        category: "Playera",
        description: "Construcción robusta en Piqué Vera texturizado. Un tejido con mayor cuerpo y caída estética que define la silueta atlética.",
        features: ["Tejido Piqué Vera texturizado", "Ventilación estructurada", "Costuras reforzadas"],
        mainImage: "/assets/products/NORONE.png",
        variants: [
            { colorName: "Iron", colorHex: "#4b5563", image: "/assets/products/NORONE.png" },
            { colorName: "White", colorHex: "#ffffff", image: "/assets/products/NORONE.png" }
        ]
    }
];

export const getAllProducts = () => PRODUCTS;

export const getSaleProducts = () => {
    return PRODUCTS.filter((p) => p.originalPrice && p.originalPrice > p.price);
};

export const getFeaturedProducts = () => PRODUCTS.slice(0, 4);

export const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);