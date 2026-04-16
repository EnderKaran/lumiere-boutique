import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, MapPin, User, Settings } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) redirect("/login"); // Giriş yapılmamışsa koruma

  return (
    <main className="min-h-screen bg-lumiere-beige py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="font-serif text-4xl mb-2">My Account</h1>
          <p className="text-lumiere-gray italic">Welcome back, {session.user?.name}.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sipariş Geçmişi Kartı */}
          <Link href="/profile/orders" className="group p-8 bg-white border border-lumiere-dark/5 hover:border-lumiere-dark/20 transition-all">
            <Package className="w-6 h-6 mb-4 text-lumiere-dark" />
            <h3 className="font-serif text-xl mb-1">Orders History</h3>
            <p className="text-xs text-lumiere-gray">Track your shipments and view past orders.</p>
          </Link>

          {/* Adres Bilgileri Kartı */}
          <Link href="/profile/address" className="group p-8 bg-white border border-lumiere-dark/5 hover:border-lumiere-dark/20 transition-all">
            <MapPin className="w-6 h-6 mb-4 text-lumiere-dark" />
            <h3 className="font-serif text-xl mb-1">Shipping Addresses</h3>
            <p className="text-xs text-lumiere-gray">Manage your primary and secondary addresses.</p>
          </Link>

          {/* Profil Ayarları */}
          <Link href="/profile/settings" className="group p-8 bg-white border border-lumiere-dark/5 hover:border-lumiere-dark/20 transition-all">
            <Settings className="w-6 h-6 mb-4 text-lumiere-dark" />
            <h3 className="font-serif text-xl mb-1">Account Settings</h3>
            <p className="text-xs text-lumiere-gray">Update your email, password, and preferences.</p>
          </Link>

          {/* Kişisel Bilgiler Özeti */}
          <div className="p-8 border border-lumiere-dark/10 bg-transparent">
             <User className="w-6 h-6 mb-4 text-lumiere-dark/40" />
             <h3 className="font-serif text-xl mb-4">Personal Info</h3>
             <div className="space-y-2 text-sm">
                <p className="text-lumiere-gray">Email: <span className="text-lumiere-dark">{session.user?.email}</span></p>
                <p className="text-lumiere-gray">Role: <span className="text-lumiere-dark uppercase tracking-widest text-[10px]">{(session.user as any)?.role}</span></p>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}