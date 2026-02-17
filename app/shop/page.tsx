import { Suspense } from "react"; 
import { prisma } from "@/lib/prisma";
import ShopClient from "./ShopClient";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 

export const dynamic = "force-dynamic"; 

export default async function ShopPage() {
  // Ürünleri veritabanından çekiyoruz
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  return (
    <>
      <Navbar /> 
      
      <main className="min-h-screen bg-lumiere-beige pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          {/* Başlık Alanı */}
          <header className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl text-lumiere-dark mb-4">Shop All</h1>
            <p className="text-lumiere-gray max-w-2xl mx-auto italic">
              Timeless silhouettes designed for the modern wardrobe.
            </p>
          </header>

          {/* Ürün Listeleme Alanı */}
          <Suspense fallback={<div className="text-center py-20 italic">Loading our collection...</div>}>
            <ShopClient initialProducts={products} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}