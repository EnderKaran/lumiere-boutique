// src/app/checkout/CheckoutClient.tsx
"use client";

import { useCart } from "@/store/useCart";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { processIyzicoPayment } from "@/lib/order-actions";
import { Lock, CreditCard } from "lucide-react";

export default function CheckoutClient({ userEmail }: { userEmail: string }) {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // 1. İstemci tarafında yüklendiğini belirt
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. HATA ÇÖZÜMÜ: Sepet boşsa yönlendirme işlemini "useEffect" içinde yapıyoruz
  useEffect(() => {
    if (isMounted && items.length === 0) {
      router.push("/");
    }
  }, [isMounted, items.length, router]);

  // Sayfa yüklenmediyse veya sepet boşsa (yönlendiriliyorsa) boş ekran göster
  if (!isMounted || items.length === 0) return null;

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const shippingData = Object.fromEntries(formData.entries());

    // Server Action'ı çağırıp Iyzico simülasyonunu başlatıyoruz
    const res = await processIyzicoPayment(items, cartTotal(), shippingData);

    if (res.success) {
      clearCart(); // Ödeme başarılıysa Zustand sepetini boşalt
      router.push(`/success?orderId=${res.orderId}&tx=${res.transactionId}`);
    } else {
      setError(res.error || "Bilinmeyen bir hata oluştu.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 flex flex-col lg:flex-row gap-16">
      
      {/* SOL TARAF: Form Alanı */}
      <div className="w-full lg:w-3/5">
        <h2 className="font-serif text-2xl text-lumiere-dark mb-6">Contact Information</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-8">
          {/* İletişim */}
          <div>
            <input 
              type="email" 
              name="email" 
              defaultValue={userEmail} 
              readOnly
              className="w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-lumiere-gray outline-none"
            />
          </div>

          <h2 className="font-serif text-2xl text-lumiere-dark mb-6 pt-4 border-t border-zinc-200">Shipping Address</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="firstName" placeholder="First Name" required className="border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-lumiere-dark transition" />
            <input type="text" name="lastName" placeholder="Last Name" required className="border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-lumiere-dark transition" />
          </div>
          <input type="text" name="address" placeholder="Address" required className="w-full border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-lumiere-dark transition" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="city" placeholder="City" required className="border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-lumiere-dark transition" />
            <input type="text" name="zip" placeholder="ZIP Code" required className="border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-lumiere-dark transition" />
          </div>

          {/* IYZICO ÖDEME ALANI SİMÜLASYONU */}
          <h2 className="font-serif text-2xl text-lumiere-dark mb-6 pt-4 border-t border-zinc-200">Payment</h2>
          
          <div className="bg-white border border-zinc-300 p-6 rounded-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2 text-sm text-lumiere-dark font-medium">
                <Lock size={16} className="text-emerald-600" />
                Iyzico Secure Payment
              </div>
              <div className="flex gap-1">
                <div className="w-8 h-5 bg-blue-900 rounded text-[8px] text-white flex items-center justify-center font-bold">VISA</div>
                <div className="w-8 h-5 bg-orange-500 rounded text-[8px] text-white flex items-center justify-center font-bold">MC</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input type="text" placeholder="Card Number" required maxLength={16} className="w-full border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-lumiere-dark transition" />
                <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM / YY" required maxLength={5} className="border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-lumiere-dark transition" />
                <input type="text" placeholder="CVC" required maxLength={3} className="border border-zinc-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-lumiere-dark transition" />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-lumiere-dark text-white py-5 text-sm tracking-widest uppercase hover:bg-lumiere-accent transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing with Iyzico...
              </span>
            ) : (
              `Pay $${cartTotal().toFixed(2)} Securely`
            )}
          </button>
        </form>
      </div>

      {/* SAĞ TARAF: Sipariş Özeti */}
      <div className="w-full lg:w-2/5">
        <div className="bg-white p-6 border border-zinc-200 sticky top-10">
          <h2 className="font-serif text-xl text-lumiere-dark mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
            {items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4">
                <div className="w-16 h-20 bg-zinc-100 rounded overflow-hidden shrink-0 relative">
                  <span className="absolute -top-2 -right-2 bg-lumiere-gray text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center z-10">
                    {item.quantity}
                  </span>
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex justify-between text-sm">
                  <div>
                    <p className="font-serif text-lumiere-dark">{item.name}</p>
                    <p className="text-lumiere-gray text-xs mt-1">{item.selectedSize} / {item.selectedColor}</p>
                  </div>
                  <p className="font-medium text-lumiere-dark">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-200 pt-4 space-y-3 text-sm">
            <div className="flex justify-between text-lumiere-gray">
              <span>Subtotal</span>
              <span>${cartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lumiere-gray">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-serif text-lumiere-dark pt-3 border-t border-zinc-200 mt-3">
              <span>Total</span>
              <span>USD ${cartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}