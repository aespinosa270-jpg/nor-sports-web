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
    tag?: string;
    category: string;
    description: string;
    features: string[];
    mainImage: string;
    variants: ProductVariant[];
}

export const PRODUCTS: Product[] = [
    {
        id: "1",
        slug: "tech-flow-micropique",
        name: "TECH FLOW / MICROPIQUÉ",
        price: 850,
        tag: "BREATHABLE",
        category: "Playera",
        description: "Arquitectura textil en Micropiqué diseñada para maximizar el flujo de aire. Ligereza absoluta para sesiones de alta intensidad.",
        features: ["Tejido Micropiqué 100% Poliéster", "Evaporación instantánea", "Corte Regular Fit"],
        mainImage: "/assets/products/tshirt-micropique-main.jpg",
        variants: [
            { colorName: "Carbon", colorHex: "#1a1a1a", image: "/assets/products/tshirt-micropique-black.jpg" },
            { colorName: "Ghost", colorHex: "#f0f0f0", image: "/assets/products/tshirt-micropique-white.jpg" }
        ]
    },

    {
        id: "2",
        slug: "titan-structure-vera",
        name: "TITAN STRUCTURE / VERA",
        price: 920,
        tag: "RESISTANCE",
        category: "Playera",
        description: "Construcción robusta en Piqué Vera. Un tejido con mayor cuerpo y resistencia a la abrasión sin sacrificar la movilidad.",
        features: ["Tejido Piqué Vera texturizado", "Resistencia al desgarro", "Costuras reforzadas"],
        mainImage: "/assets/products/tshirt-vera-main.jpg",
        variants: [
            { colorName: "Obsidian", colorHex: "#000000", image: "/assets/products/tshirt-vera-black.jpg" },
            { colorName: "Navy Tech", colorHex: "#1e293b", image: "/assets/products/tshirt-vera-navy.jpg" }
        ]
    },

    {
        id: "3",
        slug: "aero-grid-micropanal",
        name: "AERO GRID / MICROPANAL",
        price: 890,
        tag: "THERMAL REGULATION",
        category: "Playera",
        description: "Ingeniería de tejido en Micropanal. Su estructura de celdas optimiza la gestión térmica corporal absorbiendo el sudor rápidamente.",
        features: ["Matriz de Micropanal", "Secado ultra-rápido", "Tacto suave premium"],
        mainImage: "/assets/products/tshirt-panal-main.jpg",
        variants: [
            { colorName: "Slate", colorHex: "#334155", image: "/assets/products/tshirt-panal-gray.jpg" },
            { colorName: "Olive", colorHex: "#3f4d3a", image: "/assets/products/tshirt-panal-olive.jpg" }
        ]
    },
];


export const getAllProducts = () => PRODUCTS;

export const getFeaturedProducts = () => PRODUCTS.slice(0, 3);

export const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);