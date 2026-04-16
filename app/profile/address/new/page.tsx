import { createAddress } from "../actions";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewAddressPage() {
  return (
    <main className="min-h-screen bg-lumiere-beige py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/profile/address" 
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-lumiere-gray hover:text-lumiere-dark transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Addresses
        </Link>

        <h1 className="font-serif text-4xl mb-12">New Address</h1>

        <form action={createAddress} className="space-y-10 bg-white p-10 border border-lumiere-dark/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Adres Başlığı */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">Address Title (e.g. Home, Office)</label>
              <input 
                name="title"
                required
                placeholder="Home"
                className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm"
              />
            </div>

            {/* Ad Soyad */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">Full Name</label>
              <input 
                name="fullName"
                required
                className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Şehir */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">City</label>
              <input 
                name="city"
                required
                className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm"
              />
            </div>

            {/* İlçe */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">District</label>
              <input 
                name="district"
                required
                className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm"
              />
            </div>
          </div>

          {/* Telefon */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">Phone Number</label>
            <input 
              name="phoneNumber"
              required
              type="tel"
              className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm"
            />
          </div>

          {/* Adres Detayı */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">Full Address</label>
            <textarea 
              name="addressDetail"
              required
              rows={3}
              className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm resize-none"
            />
          </div>

          {/* Varsayılan Yap */}
          <div className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="isDefault" 
              id="isDefault"
              className="w-4 h-4 accent-lumiere-dark cursor-pointer"
            />
            <label htmlFor="isDefault" className="text-xs text-lumiere-gray cursor-pointer">Set as default shipping address</label>
          </div>

          <button 
            type="submit"
            className="w-full bg-lumiere-dark text-[#F4EFEA] py-5 text-xs uppercase tracking-[0.2em] hover:bg-black transition-all duration-300"
          >
            Save Address
          </button>
        </form>
      </div>
    </main>
  );
}