
"use client"; 
import { ShoppingBag, X, Plus, Minus } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, cartTotal, itemCount } = useCart();
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer hover:text-lumiere-accent transition">
          <ShoppingBag size={20} />
          {itemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-lumiere-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount()}
            </span>
          )}
        </div>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md bg-lumiere-beige flex flex-col p-0 border-l border-zinc-200">
        <SheetHeader className="p-6 border-b border-zinc-200">
          <SheetTitle className="font-serif text-2xl text-lumiere-dark flex justify-between items-center">
            Shopping Bag ({itemCount()})
          </SheetTitle>
        </SheetHeader>

        {/* Sepet İçeriği */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {items.length === 0 ? (
            <p className="text-lumiere-gray text-center mt-10">Your bag is currently empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-24 bg-zinc-100 rounded-md overflow-hidden shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-lumiere-dark text-lg">{item.name}</h3>
                      <p className="font-medium text-lumiere-dark">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    {item.selectedSize && <p className="text-sm text-lumiere-gray mt-1">Size: {item.selectedSize}</p>}
                    {item.selectedColor && <p className="text-sm text-lumiere-gray">Color: {item.selectedColor}</p>}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-zinc-300 rounded-full px-3 py-1 gap-4">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-lumiere-gray hover:text-lumiere-dark transition"><Minus size={14} /></button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-lumiere-gray hover:text-lumiere-dark transition"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-lumiere-gray underline underline-offset-4 hover:text-lumiere-dark transition">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sepet Alt Kısmı (Checkout) */}
        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-serif text-lg text-lumiere-dark">Subtotal</span>
              <span className="font-serif text-lg text-lumiere-dark">${cartTotal().toFixed(2)}</span>
            </div>
            <p className="text-xs text-lumiere-gray mb-6">Shipping and taxes calculated at checkout.</p>
            <button className="w-full bg-lumiere-dark text-white py-4 text-sm tracking-widest uppercase hover:bg-lumiere-accent transition">
              Proceed to Checkout →
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}