import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@prisma/client';

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, color?: string, size?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  itemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, color, size) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id && item.selectedColor === color && item.selectedSize === size
        );

        if (existingItem) {
          // Ürün zaten sepette varsa miktarını artır
          set({
            items: currentItems.map((item) =>
              item.id === product.id && item.selectedColor === color && item.selectedSize === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Ürün sepette yoksa yeni ekle
          set({ items: [...currentItems, { ...product, quantity: 1, selectedColor: color, selectedSize: size }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      cartTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      
      itemCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'lumiere-cart-storage', // LocalStorage'da tutulacak isim
    }
  )
);