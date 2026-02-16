"use client";

import { useCart } from "@/store/useCart"; // Store'u import et
import { ShoppingBag, User, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { items, openCart } = useCart(); // Sepet elemanlarını ve açma fonksiyonunu al
  const [isMounted, setIsMounted] = useState(false);

  // Hydration hatasını önlemek için mounted kontrolü
  useEffect(() => setIsMounted(true), []);

  // Toplam ürün adedini hesapla (Örn: 2 tane A ürünü, 1 tane B ürünü = 3)
  const totalItems = items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  return (
    <nav className="relative z-40">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center bg-lumiere-beige border-b border-zinc-100">
        
        {/* Sol Menü */}
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-lumiere-dark">
          <Link href="/shop" className="hover:text-lumiere-accent transition">Shop</Link>
          <Link href="/collections" className="hover:text-lumiere-accent transition">Collections</Link>
        </div>

        {/* Logo */}
        <Link href="/" className="font-serif text-3xl tracking-tighter text-lumiere-dark">
          LUMIÈRE
        </Link>

        {/* Sağ İkonlar */}
        <div className="flex items-center gap-6 text-lumiere-dark">
          <Link href="/login" className="hover:text-lumiere-accent transition">
            <User size={20} />
          </Link>
          
          {/* SEPET İKONU VE DİNAMİK SAYI */}
          <button 
            onClick={openCart} 
            className="hover:text-lumiere-accent transition relative"
          >
            <ShoppingBag size={20} />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-lumiere-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}