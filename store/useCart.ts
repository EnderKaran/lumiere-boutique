import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCart = create<any>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (product: any, color: string, size: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (i: any) => i.id === product.id && i.selectedColor === color && i.selectedSize === size
        );

        if (existingItem) {
          // Ürün zaten varsa miktarını artır VE sepeti aç
          get().updateQuantity(product.id, color, size, existingItem.quantity + 1);
          set({ isOpen: true }); // EKLEME: Mevcut ürün güncellenince de sepeti aç
        } else {
          // Yeni ürün eklenince sepeti aç
          set({
            items: [...currentItems, { ...product, quantity: 1, selectedColor: color, selectedSize: size }],
            isOpen: true,
          });
        }
      },
      updateQuantity: (id: string, color: string, size: string, quantity: number) => {
        if (quantity < 1) return;
        const updatedItems = get().items.map((i: any) =>
          i.id === id && i.selectedColor === color && i.selectedSize === size ? { ...i, quantity } : i
        );
        set({ items: updatedItems });
      },
      removeItem: (id: string, color: string, size: string) => {
        set({
          items: get().items.filter(
            (i: any) => !(i.id === id && i.selectedColor === color && i.selectedSize === size)
          ),
        });
      },
      itemCount: () => get().items.reduce((acc: number, item: any) => acc + item.quantity, 0),
      cartTotal: () => get().items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0),
      clearCart: () => set({ items: [], isOpen: false }),
    }),
    { name: 'lumiere-cart-storage' }
  )
);