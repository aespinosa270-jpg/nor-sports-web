"use client";
import { useState } from "react";
import { IoAdd, IoCheckmark, IoHeartOutline, IoShareOutline } from "react-icons/io5";
import { useCartStore } from "@/store/cartStore"; // 1. Importamos el store

// Mock Data temporal (en el futuro esto vendrá de tu base de datos)
const PRODUCT_DATA = {
    id: 1,
    name: "Aero-Dry Shell V2",
    price: 2890,
    color: "Onyx", // Color por defecto
};

export default function ProductPage({ params }: { params: { slug: string } }) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // 2. Traemos la función 'addItem' del store
    const { addItem } = useCartStore();

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("PLEASE SELECT A SIZE");
            return;
        }

        setIsAdding(true);

        // 3. AGREGAMOS EL PRODUCTO REAL AL STORE GLOBAL
        addItem({
            id: PRODUCT_DATA.id,
            name: PRODUCT_DATA.name,
            price: PRODUCT_DATA.price,
            size: selectedSize,
            color: PRODUCT_DATA.color,
            quantity: 1,
        });

        // Pequeño delay para la animación de "Added"
        setTimeout(() => {
            setIsAdding(false);
            // Opcional: openCart(); // Si quieres que se abra el carrito automáticamente al añadir
        }, 1000);
    };

    return (
        // ... (El resto de tu diseño se mantiene igual)
        // Solo asegúrate de que el botón usa 'handleAddToCart'
        <div className="flex gap-4">
            <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-black text-white font-mono h-16 uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 font-bold text-sm disabled:opacity-80 active:scale-[0.98]"
            >
                {isAdding ? (
                    <>
                        <IoCheckmark size={20} className="animate-bounce" />
                        <span>Added to System</span>
                    </>
                ) : (
                    <>
                        <span>Add to Cart</span>
                        <IoAdd size={18} />
                    </>
                )}
            </button>
            {/* ... botón de like ... */}
        </div>
        // ...
    );
}