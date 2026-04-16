import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MapPin, Plus, Trash2, Edit2 } from "lucide-react";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function AddressPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login"); // Güvenlik kontrolü

  // Kullanıcının adreslerini çekiyoruz
  const addresses = await (prisma as any).address.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-lumiere-beige py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-serif text-4xl mb-2">Shipping Addresses</h1>
            <p className="text-lumiere-gray italic text-sm">Manage your delivery locations for a faster checkout.</p>
          </div>
          <Link 
            href="/profile/address/new" 
            className="flex items-center gap-2 bg-lumiere-dark text-[#F4EFEA] px-6 py-3 text-xs uppercase tracking-widest hover:bg-black transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New
          </Link>
        </header>

        {addresses.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-lumiere-dark/10">
            <MapPin className="w-8 h-8 mx-auto mb-4 text-lumiere-dark/20" />
            <p className="text-lumiere-gray italic">No addresses saved yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address: any) => (
              <div 
                key={address.id} 
                className="p-8 bg-white border border-lumiere-dark/5 relative group hover:border-lumiere-dark/20 transition-all"
              >
                {address.isDefault && (
                  <span className="absolute top-4 right-4 text-[9px] uppercase tracking-tighter bg-lumiere-dark text-white px-2 py-1">
                    Default
                  </span>
                )}
                
                <h3 className="font-serif text-xl mb-1">{address.title}</h3>
                <p className="text-sm font-medium mb-4">{address.fullName}</p>
                
                <div className="text-xs text-lumiere-gray space-y-1 mb-6 leading-relaxed">
                  <p>{address.addressDetail}</p>
                  <p>{address.district} / {address.city}</p>
                  <p>{address.phoneNumber}</p>
                </div>

                <div className="flex gap-4 border-t border-zinc-50 pt-6">
                  <button className="text-[10px] uppercase tracking-widest flex items-center gap-1 hover:text-lumiere-accent transition-colors">
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button className="text-[10px] uppercase tracking-widest flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}