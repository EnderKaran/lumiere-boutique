"use client";

import { useCart } from "@/store/useCart";
import { Product } from "@prisma/client";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button 
      onClick={() => addItem(product, product.colors?.[0] || 'Default', product.sizes?.[0] || 'OS')}
      className="w-full mt-3 bg-lumiere-dark text-white py-2 text-xs tracking-widest uppercase hover:bg-lumiere-accent transition"
    >
      Add to Bag
    </button>
  );
}