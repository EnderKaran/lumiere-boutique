import { ShoppingBag, User, Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
            <div className="flex gap-6 text-sm uppercase tracking-widest">
                <Link href="/shop">Shop</Link>
                <Link href="/collections">Collections</Link>
            </div>

            <Link href="/" className="font-serif text-3xl tracking-tight">
                LUMIÈRE
            </Link>

            <div className="flex gap-5 items-center">
                <Search size={20} className="cursor-pointer" />
                <User size={20} className="cursor-pointer" />
                <div className="relative cursor-pointer">
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-lumiere-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    0
                </span>
                </div>
            </div>
        </nav>
    );
}