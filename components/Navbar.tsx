import { ShoppingBag, User, Search, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return(
    <nav className="flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto w-full">
      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center flex-1">
        <Menu size={24} className="cursor-pointer text-lumiere-dark hover:text-lumiere-accent transition" />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest flex-1">
        <Link href="/shop" className="hover:text-lumiere-accent transition">Shop</Link>
        <Link href="/collections" className="hover:text-lumiere-accent transition">Collections</Link>
      </div>

      {/* Logo */}
      <Link href="/" className="font-serif text-2xl md:text-3xl tracking-tight text-center md:text-left">
        LUMIÈRE
      </Link>

      {/* Icons */}
      <div className="flex gap-4 md:gap-5 items-center flex-1 justify-end">
        <Search size={20} className="cursor-pointer hidden sm:block hover:text-lumiere-accent transition" />
        <User size={20} className="cursor-pointer hidden sm:block hover:text-lumiere-accent transition" />
        <div className="relative cursor-pointer hover:text-lumiere-accent transition">
          <ShoppingBag size={20} />
          <span className="absolute -top-2 -right-2 bg-lumiere-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            0
          </span>
        </div>
      </div>
    </nav>
  );
}