import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definimos cómo se ve un Item en el carrito
export interface CartItem {
    id: number;
    name: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
    image?: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (item: CartItem) => void;
    removeItem: (id: number, size: string, color: string) => void; // Necesitamos ID+Size+Color para borrar el correcto
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            addItem: (newItem) => set((state) => {
                // Verificar si ya existe el mismo producto (mismo ID, Talla y Color)
                const existingItemIndex = state.items.findIndex(
                    item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                );

                if (existingItemIndex > -1) {
                    // Si existe, incrementamos cantidad
                    const updatedItems = [...state.items];
                    updatedItems[existingItemIndex].quantity += 1;
                    return { items: updatedItems, isOpen: true }; // Abrimos el carrito al añadir
                }

                // Si no, lo agregamos nuevo
                return { items: [...state.items, { ...newItem, quantity: 1 }], isOpen: true };
            }),

            removeItem: (id, size, color) => set((state) => ({
                items: state.items.filter(item => !(item.id === id && item.size === size && item.color === color))
            })),

            clearCart: () => set({ items: [] }),

            total: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        }),
        {
            name: 'nor-cart-storage', // Guarda el carrito en LocalStorage (no se borra al recargar)
        }
    )
);