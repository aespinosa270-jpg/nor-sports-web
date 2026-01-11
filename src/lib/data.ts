import { StaticImageData } from "next/image";
// Si usas imágenes locales importadas, descomenta arriba. 
// Si usas strings de rutas (ej: "/images/foto.jpg"), déjalo como string.

// 1. DEFINIMOS LA FORMA EXACTA DE TU PRODUCTO (Tipado fuerte)
export interface ProductVariant {
    colorName: string;
    colorHex: string;
    image: string; // La foto específica de ese color
    inStock: boolean;
}

export interface Product {
    id: string; // Mejor string para IDs únicos
    slug: string; // Vital para la URL (ej: /shop/aero-dry-shell)
    name: string;
    price: number;
    tag?: string; // Opcional (ej: NEW, SOLD OUT)
    category: "Hoodies" | "T-Shirts" | "Pants" | "Accessories"; // Categorías fijas
    description: string;
    features: string[]; // Lista de características (bullets)
    mainImage: string; // Imagen principal para la tarjeta
    variants: ProductVariant[];
}

// 2. TU CATÁLOGO REAL (Aquí metes la data de verdad)
export const PRODUCTS: Product[] = [
    {
        id: "1",
        slug: "aero-dry-shell",
        name: "AERO-DRY SHELL",
        price: 2890,
        tag: "WATERPROOF",
        category: "Hoodies",
        description: "Diseñada en los laboratorios de NØR. Membrana impermeable de 3 capas con costuras termoselladas para protección total contra elementos hostiles.",
        features: [
            "Membrana Gore-Tex® Pro",
            "Cierres YKK AquaGuard®",
            "Corte articulado para movilidad total"
        ],
        mainImage: "/assets/products/p1-main.jpg", // Asegúrate de que esta ruta exista
        variants: [
            { colorName: "Onyx", colorHex: "#111111", image: "/assets/products/p1-black.jpg", inStock: true },
            { colorName: "Concrete", colorHex: "#888888", image: "/assets/products/p1-gray.jpg", inStock: true }
        ]
    },
    {
        id: "2",
        slug: "kinetic-tights-v2",
        name: "KINETIC TIGHTS V2",
        price: 1200,
        tag: "COMPRESSION",
        category: "Pants",
        description: "Compresión graduada para recuperación muscular en movimiento. Tejido técnico que regula la temperatura corporal.",
        features: [
            "Compresión 20-30 mmHg",
            "Bolsillo oculto para smartphone",
            "Secado rápido FlashDry™"
        ],
        mainImage: "/assets/products/p2-main.jpg",
        variants: [
            { colorName: "Black", colorHex: "#050505", image: "/assets/products/p2-black.jpg", inStock: true },
            { colorName: "Navy", colorHex: "#1a2b4b", image: "/assets/products/p2-navy.jpg", inStock: false } // Ejemplo sin stock
        ]
    },
    // ... AGREGA AQUÍ TUS OTROS PRODUCTOS ...
];

// 3. FUNCIONES "BACKEND" (Simulamos las consultas a la BD)

// Obtener todos los productos
export const getAllProducts = () => {
    return PRODUCTS;
};

// Obtener producto por SLUG (Para la página de detalle: /shop/[slug])
export const getProductBySlug = (slug: string) => {
    return PRODUCTS.find((p) => p.slug === slug);
};

// Obtener productos por CATEGORÍA (Para filtros)
export const getProductsByCategory = (category: string) => {
    return PRODUCTS.filter((p) => p.category === category);
};

// Obtener destacados (ej: los primeros 4 para el Home)
export const getFeaturedProducts = () => {
    return PRODUCTS.slice(0, 4);
};