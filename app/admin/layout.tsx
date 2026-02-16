import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
    { icon: <ShoppingCart size={20} />, label: "Orders", href: "/admin/orders" },
    { icon: <Package size={20} />, label: "Products", href: "/admin/products" },
    { icon: <Users size={20} />, label: "Users", href: "/admin/users" },
    { icon: <Settings size={20} />, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 p-6 flex flex-col">
        <div className="font-serif text-2xl text-lumiere-dark mb-12 px-2 italic">Admin Console</div>
        
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-lumiere-dark rounded-lg transition"
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition mt-auto">
          <LogOut size={20} /> Exit Admin
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}