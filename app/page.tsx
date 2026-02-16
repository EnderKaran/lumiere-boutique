import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Values from "@/components/Values";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";

export default async function Home() {
  // Veritabanından ürünleri çekiyoruz (Server Component)
  const products = await prisma.product.findMany({
    take: 3,
    include: { category: true }
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Tasarımdaki Kategori Grid Bölümü */}
      <BentoGrid />
      
      {/* Veritabanından Gelen Dinamik Ürünler */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl mb-2">New Arrivals</h2>
            <p className="text-lumiere-gray">Discover the latest additions to our collection.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100 mb-4 rounded-lg relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="font-serif text-xl mb-1">{product.name}</h3>
              <p className="text-lumiere-gray text-sm mb-2">{product.category?.name}</p>
              <div className="flex justify-between items-center mb-4">
                 <p className="font-medium text-lumiere-accent">${product.price.toFixed(2)}</p>
              </div>
              
              {/* ZUSTAND SEPETE EKLE BUTONU */}
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Tasarımdaki Marka Değerleri ve Alt Bilgi */}
      <Values />
      <Footer />
    </main>
  );
}