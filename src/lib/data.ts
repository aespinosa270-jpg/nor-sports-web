
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
    inStock?: boolean;
    unavailableSizes?: string[];
}

export const PRODUCTS: Product[] = [
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
        inStock: true,
        unavailableSizes: ["XS"],
        gallery: [
            "/assets/products/NORONE.png",
            "/assets/products/NORONE2.png",
            "/assets/products/NOR4.png"
        ],
        variants: [
            {
                colorName: "Ghost",
                colorHex: "#f0f0f0",
                image: "/assets/products/NORONE2.png"
            }
        ]
    },

    {
        id: "2",
        slug: "nor-pulse",
        name: "NOR PULSE",
        price: 70,
        tag: "MICROPANAL",
        category: "Playera",
        description: "Ingeniería de tejido en Micropanal. Su estructura de celdas optimiza la gestión térmica corporal absorbiendo el sudor rápidamente.",
        features: ["Matriz de Micropanal", "Secado ultra-rápido", "Tacto suave premium"],
        mainImage: "/assets/products/NORONE.png",
        inStock: false,
        variants: [
            { colorName: "White", colorHex: "#ffffff", image: "/assets/products/NORONE.png" }
        ]
    },

    {
        id: "3",
        slug: "nor-active-pro",
        name: "NOR ACTIVE PRO",
        price: 70,
        tag: "ARES TECH",
        category: "Playera",
        description: "Diseñada en Tela Ares de alto rendimiento. Una fibra suave al tacto pero extremadamente resistente, ideal para entrenamientos de fuerza y uso rudo.",
        features: ["Tecnología textil Ares", "Resistencia superior", "Elasticidad mecánica"],
        mainImage: "/assets/products/NORONE.png",
        inStock: false,
        variants: [
            { colorName: "White", colorHex: "#ffffff", image: "/assets/products/NORONE.png" }
        ]
    },

    {
        id: "4",
        slug: "nor-active-vent",
        name: "NOR ACTIVE VENT",
        price: 70,
        tag: "PIQUE VERA",
        category: "Playera",
        description: "Construcción robusta en Piqué Vera texturizado. Un tejido con mayor cuerpo y caída estética que define la silueta atlética.",
        features: ["Tejido Piqué Vera texturizado", "Ventilación estructurada", "Costuras reforzadas"],
        mainImage: "/assets/products/NORONE.png",
        inStock: false,
        variants: [
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