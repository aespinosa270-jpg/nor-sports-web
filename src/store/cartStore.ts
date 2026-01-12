import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
    color: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            addItem: (newItem) => set((state) => {
                const uniqueId = `${newItem.name}-${newItem.size}-${newItem.color}`;

                const existingItem = state.items.find((i) => i.id === uniqueId);

                if (existingItem) {
                    return {
                        items: state.items.map((i) =>
                            i.id === uniqueId ? { ...i, quantity: i.quantity + newItem.quantity } : i
                        ),
                        isOpen: true,
                    };
                }

                return {
                    items: [...state.items, { ...newItem, id: uniqueId }],
                    isOpen: true,
                };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id),
            })),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'nor-cart-storage',
        }
    )
);