"use client";

import { useState } from "react";
import { Search, User, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Kullanıcıyı shop sayfasına arama parametresiyle gönderiyoruz
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="relative">
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
          {/* ARAMA İKONU - Tıklanınca state değiştirir */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-lumiere-accent transition hidden sm:block"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <Link href="/login" className="hover:text-lumiere-accent transition">
            <User size={20} />
          </Link>
          <button className="hover:text-lumiere-accent transition relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-lumiere-dark text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>

      {/* ARAMA ALANI - (Slide-down Efekti) */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 py-8 px-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-2xl font-serif bg-transparent border-b border-zinc-300 pb-2 outline-none focus:border-lumiere-dark transition-colors placeholder:text-zinc-300"
            />
            <button type="submit" className="absolute right-0 bottom-4 text-lumiere-gray hover:text-lumiere-dark">
              <Search size={24} />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}