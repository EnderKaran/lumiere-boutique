"use client";

import { useCart } from "@/store/useCart";
import { ShoppingBag, User, Search, X, Menu } from "lucide-react"; // Menu eklendi
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { items, openCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobil menü state'i

  useEffect(() => setIsMounted(true), []);

  const totalItems = items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  return (
    <nav className="relative z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center bg-lumiere-beige border-b border-zinc-100">
        
        {/* MOBİL: Hamburger Menü Butonu (Sadece mobilde görünür) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-lumiere-dark hover:text-lumiere-accent transition"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MASAÜSTÜ: Sol Menü (Mobilde gizli) */}
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-lumiere-dark">
          <Link href="/shop" className="hover:text-lumiere-accent transition">Shop</Link>
          <Link href="/collections" className="hover:text-lumiere-accent transition">Collections</Link>
        </div>

        {/* LOGO (Her zaman merkezde veya dengeli) */}
        <Link href="/" className="font-serif text-2xl md:text-3xl tracking-tighter text-lumiere-dark">
          LUMIÈRE
        </Link>

        {/* SAĞ İKONLAR */}
        <div className="flex items-center gap-4 md:gap-6 text-lumiere-dark">
          <Link href="/login" className="hover:text-lumiere-accent transition">
            <User size={20} />
          </Link>
          
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

      {/* MOBİL AÇILIR MENÜ (Overlay) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-lumiere-beige border-b border-zinc-200 py-10 px-8 flex flex-col gap-6 md:hidden animate-in slide-in-from-top duration-300 z-50 shadow-xl">
          <Link 
            href="/shop" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif text-2xl text-lumiere-dark border-b border-zinc-100 pb-4"
          >
            Shop All
          </Link>
          <Link 
            href="/collections" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif text-2xl text-lumiere-dark border-b border-zinc-100 pb-4"
          >
            Collections
          </Link>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-lumiere-gray font-semibold">Support</p>
            <Link href="/contact" className="text-sm text-lumiere-dark">Contact Us</Link>
            <Link href="/shipping" className="text-sm text-lumiere-dark">Shipping & Returns</Link>
          </div>
        </div>
      )}
    </nav>
  );
}