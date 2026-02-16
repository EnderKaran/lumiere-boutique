"use client";

import { useState } from "react";
import { Product, Category } from "@prisma/client";
import { useCart } from "@/store/useCart";
import { Star, ShoppingBag, Heart, Share, ChevronDown } from "lucide-react";

type ProductWithCategory = Product & { category: Category | null };

export default function ProductDetailClient({ product }: { product: ProductWithCategory }) {
  const { addItem } = useCart();
  
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  const getColorClass = (colorName: string) => {
    const c = colorName.toLowerCase();
    if (c.includes('black')) return 'bg-zinc-800';
    if (c.includes('burgundy')) return 'bg-[#4A2C2A]';
    if (c.includes('tan')) return 'bg-[#A67C52]';
    if (c.includes('emerald')) return 'bg-[#2E4A3D]';
    if (c.includes('midnight')) return 'bg-[#1A2332]';
    if (c.includes('champagne')) return 'bg-[#F3E5D8]';
    return 'bg-zinc-200';
  };

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      
      {/* SOL TARAF: Görsel Galerisi */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Ana Büyük Görsel */}
        <div className="aspect-[4/5] bg-zinc-100 rounded-lg overflow-hidden relative">
          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Küçük Görseller (Thumbnails) */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`aspect-[3/4] bg-zinc-100 rounded-md overflow-hidden border-2 transition-all ${
                  mainImage === img ? "border-lumiere-dark" : "border-transparent"
                }`}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SAĞ TARAF: Ürün Bilgileri ve Form */}
      <div className="w-full lg:w-1/2">
        <h1 className="font-serif text-4xl lg:text-5xl text-lumiere-dark mb-4">{product.name}</h1>
        
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl text-lumiere-gray">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <div className="flex text-lumiere-dark">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-lumiere-gray underline">124 Reviews</span>
          </div>
        </div>

        <p className="text-lumiere-gray leading-relaxed mb-4">
          {product.description}
        </p>
        <button className="text-sm text-lumiere-dark underline underline-offset-4 mb-10 font-medium">
          Read full details
        </button>

        {/* Renk Seçimi */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-lumiere-dark mb-4">
              <span className="font-semibold">Color:</span> {selectedColor.toUpperCase()}
            </p>
            <div className="flex gap-4">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${
                    selectedColor === color ? "border-lumiere-dark" : "border-transparent"
                  }`}
                >
                  <div className={`w-full h-full rounded-full border border-black/10 ${getColorClass(color)}`}></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Beden Seçimi */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs tracking-widest uppercase text-lumiere-dark font-semibold">Size</p>
              <button className="text-xs text-lumiere-gray underline underline-offset-4">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border text-sm transition-colors ${
                    selectedSize === size 
                      ? "border-lumiere-dark bg-lumiere-dark text-white" 
                      : "border-zinc-300 bg-transparent text-lumiere-gray hover:border-lumiere-dark"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ZUSTAND: Sepete Ekle Butonu */}
        <button 
          onClick={() => {
            // Ürünü, seçili rengi ve bedeni gönderiyoruz
            addItem(product, selectedColor, selectedSize);
          }}
          className="w-full bg-lumiere-dark text-white py-5 flex items-center justify-center gap-3 text-sm tracking-widest uppercase hover:bg-lumiere-accent transition duration-300 mb-6"
        >
          <ShoppingBag size={18} /> Add to Bag
        </button>

        {/* Ekstra Aksiyonlar */}
        <div className="flex justify-center gap-8 mb-12 border-b border-zinc-200 pb-12">
          <button className="flex items-center gap-2 text-sm text-lumiere-gray hover:text-lumiere-dark transition">
            <Heart size={16} /> Add to Wishlist
          </button>
          <button className="flex items-center gap-2 text-sm text-lumiere-gray hover:text-lumiere-dark transition">
            <Share size={16} /> Share
          </button>
        </div>

        {/* Accordion Menüler (Görsel Simülasyonu) */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-zinc-200 pb-4 cursor-pointer group">
            <h4 className="font-serif text-lg text-lumiere-dark">Description & Fit</h4>
            <ChevronDown size={20} className="text-lumiere-gray group-hover:text-lumiere-dark transition" />
          </div>
          <div className="flex justify-between items-center border-b border-zinc-200 pb-4 cursor-pointer group">
            <h4 className="font-serif text-lg text-lumiere-dark">Shipping & Returns</h4>
            <ChevronDown size={20} className="text-lumiere-gray group-hover:text-lumiere-dark transition" />
          </div>
        </div>

      </div>
    </div>
  );
}