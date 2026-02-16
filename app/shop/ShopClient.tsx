"use client";

import { useState } from "react";
import { Product, Category } from "@prisma/client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type ProductWithCategory = Product & { category: Category | null };

export default function ShopClient({ initialProducts }: { initialProducts: ProductWithCategory[] }) {
  // Filtre State'leri
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // null = View All
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Ürünleri Filtreleme Mantığı
  const filteredProducts = initialProducts.filter((product) => {
    let matchCategory = true;
    let matchSize = true;
    let matchPrice = true;

    // Kategori Filtresi
    if (selectedCategory) {
      matchCategory = product.category?.name === selectedCategory;
    }

    // Beden Filtresi
    if (selectedSize) {
      matchSize = product.sizes.includes(selectedSize);
    }

    // Fiyat Filtresi
    if (selectedPrice) {
      if (selectedPrice === "$0 - $100") matchPrice = product.price >= 0 && product.price <= 100;
      if (selectedPrice === "$100 - $300") matchPrice = product.price > 100 && product.price <= 300;
      if (selectedPrice === "$300 +") matchPrice = product.price > 300;
    }

    return matchCategory && matchSize && matchPrice;
  });

  return (
    <>
      {/* Üst Bar (Sıralama ve Ürün Sayısı) */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-4 w-full flex justify-between items-center border-b border-zinc-200 mb-8">
        <span className="text-sm text-lumiere-gray">Showing {filteredProducts.length} Products</span>
        <div className="flex items-center gap-2 text-sm font-medium text-lumiere-dark cursor-pointer">
          Sort by: Newest <ChevronDown size={16} />
        </div>
      </section>

      {/* Ana Düzen: Sol Sidebar + Sağ Ürün Grid'i */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 w-full pb-24 flex flex-col md:flex-row gap-12 flex-1">
        
        {/* SOL SİDEBAR (Filtreler) */}
        <aside className="w-full md:w-64 shrink-0 space-y-10">
          
          {/* Kategori Filtresi */}
          <div>
            <h3 className="font-serif text-lg text-lumiere-dark mb-4">Category</h3>
            <div className="space-y-3">
              <label 
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${selectedCategory === null ? 'border-4 border-lumiere-dark bg-lumiere-beige' : 'border-zinc-300 bg-white group-hover:border-lumiere-dark'}`}></div>
                <span className={`text-sm transition ${selectedCategory === null ? 'text-lumiere-dark font-medium' : 'text-lumiere-gray group-hover:text-lumiere-dark'}`}>View All</span>
              </label>
              
              {['Dresses', 'Knitwear', 'Outerwear', 'Accessories'].map(cat => (
                <label 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${selectedCategory === cat ? 'border-4 border-lumiere-dark bg-lumiere-beige' : 'border-zinc-300 bg-white group-hover:border-lumiere-dark'}`}></div>
                  <span className={`text-sm transition ${selectedCategory === cat ? 'text-lumiere-dark font-medium' : 'text-lumiere-gray group-hover:text-lumiere-dark'}`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Beden Filtresi */}
          <div>
            <h3 className="font-serif text-lg text-lumiere-dark mb-4">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size} 
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)} // Aynı bedene basarsa seçimi kaldırır
                  className={`py-2 text-xs transition border ${selectedSize === size ? 'border-lumiere-dark bg-lumiere-dark text-white' : 'border-zinc-300 bg-white text-lumiere-gray hover:border-lumiere-dark hover:text-lumiere-dark'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Fiyat Filtresi */}
          <div>
            <h3 className="font-serif text-lg text-lumiere-dark mb-4">Price</h3>
            <div className="space-y-3">
              {['$0 - $100', '$100 - $300', '$300 +'].map(price => (
                <label 
                  key={price} 
                  onClick={() => setSelectedPrice(selectedPrice === price ? null : price)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-4 h-4 border transition flex items-center justify-center ${selectedPrice === price ? 'border-lumiere-dark bg-lumiere-dark' : 'border-zinc-300 bg-white group-hover:border-lumiere-dark'}`}>
                    {selectedPrice === price && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                  </div>
                  <span className={`text-sm transition ${selectedPrice === price ? 'text-lumiere-dark font-medium' : 'text-lumiere-gray group-hover:text-lumiere-dark'}`}>{price}</span>
                </label>
              ))}
            </div>
            
            {/* Filtreleri Temizle Butonu (Sadece filtre seçiliyse görünür) */}
            {(selectedCategory || selectedSize || selectedPrice) && (
              <button 
                onClick={() => { setSelectedCategory(null); setSelectedSize(null); setSelectedPrice(null); }}
                className="mt-6 text-xs text-lumiere-gray underline underline-offset-4 hover:text-lumiere-dark transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* SAĞ TARAF (Ürün Grid Yapısı) */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-300 rounded-lg">
              <h3 className="font-serif text-2xl text-lumiere-dark mb-2">No items found</h3>
              <p className="text-lumiere-gray mb-6">We couldn't find any products matching your current filters.</p>
              <button 
                onClick={() => { setSelectedCategory(null); setSelectedSize(null); setSelectedPrice(null); }}
                className="bg-lumiere-dark text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-lumiere-accent transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <Link href={`/shop/${product.id}`} key={product.id} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-zinc-100 mb-4 rounded-lg relative">
                    
                    {product.price > 300 && (
                      <span className="absolute top-4 left-4 bg-white/90 text-lumiere-dark px-3 py-1 text-[10px] uppercase tracking-widest font-medium z-10">
                        Best Seller
                      </span>
                    )}
                    {product.price < 200 && (
                      <span className="absolute top-4 left-4 bg-white/90 text-lumiere-dark px-3 py-1 text-[10px] uppercase tracking-widest font-medium z-10">
                        New Arrival
                      </span>
                    )}

                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-lg text-lumiere-dark mb-1">{product.name}</h3>
                      <p className="text-sm text-lumiere-gray">${product.price.toFixed(2)}</p>
                    </div>
                    
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex gap-1.5 mt-1">
                        {product.colors.map((color, idx) => {
                          const colorClass = color.toLowerCase().includes('black') ? 'bg-zinc-800' :
                                            color.toLowerCase().includes('burgundy') ? 'bg-[#4A2C2A]' :
                                            color.toLowerCase().includes('tan') ? 'bg-[#A67C52]' :
                                            color.toLowerCase().includes('emerald') ? 'bg-[#2E4A3D]' :
                                            color.toLowerCase().includes('midnight') ? 'bg-[#1A2332]' :
                                            color.toLowerCase().includes('champagne') ? 'bg-[#F3E5D8]' :
                                            'bg-zinc-200';
                          return (
                            <div key={idx} className={`w-3 h-3 rounded-full ${colorClass} border border-zinc-300`}></div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {filteredProducts.length > 0 && (
            <div className="mt-16 flex justify-center">
              <button className="bg-white border border-zinc-300 text-lumiere-dark px-8 py-4 text-xs tracking-widest uppercase hover:border-lumiere-dark transition">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}