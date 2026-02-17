"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, ShoppingCart, Package, 
  Users, Settings, LogOut, Menu, X 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
    { icon: <ShoppingCart size={20} />, label: "Orders", href: "/admin/orders" },
    { icon: <Package size={20} />, label: "Products", href: "/admin/products" },
    { icon: <Users size={20} />, label: "Users", href: "/admin/users" },
    { icon: <Settings size={20} />, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* 1. MASAÜSTÜ SIDEBAR (md ve üzeri) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-zinc-200 p-6 flex-col fixed h-full">
        <div className="font-serif text-2xl text-lumiere-dark mb-12 px-2 italic">Admin Console</div>
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition ${
                pathname === item.href 
                ? "bg-zinc-100 text-lumiere-dark font-medium" 
                : "text-zinc-600 hover:bg-zinc-50 hover:text-lumiere-dark"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition mt-auto">
          <LogOut size={20} /> Exit Admin
        </Link>
      </aside>

      {/* 2. MOBİL SIDEBAR (Açılır Menü) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-10">
              <div className="font-serif text-xl italic">Admin Console</div>
              <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-4 text-sm rounded-lg ${
                    pathname === item.href ? "bg-zinc-100 font-medium" : "text-zinc-600"
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* 3. ANA İÇERİK ALANI */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* MOBİL ÜST BAR */}
        <header className="md:hidden bg-white border-b border-zinc-200 p-4 flex justify-between items-center sticky top-0 z-40">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2">
            <Menu size={24} />
          </button>
          <div className="font-serif text-lg italic">Lumière Admin</div>
          <div className="w-10" /> {/* Dengeleme için boş div */}
        </header>

        <main className="p-4 md:p-10 w-full max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}