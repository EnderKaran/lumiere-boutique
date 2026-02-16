import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailClient from "@/components/ProductDetailClient";

// Next.js 15 kurallarına göre dinamik route parametreleri "Promise" olarak gelir
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Veritabanından ID'ye göre ürünü bul
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: { category: true }
  });

  // Eğer ürün yoksa 404 sayfasına yönlendir
  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-lumiere-beige flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-6 md:px-8 py-12 w-full">
        {/* Tasarımdaki Breadcrumbs (Ekmek Kırıntıları) */}
        <div className="text-xs text-lumiere-gray mb-10 uppercase tracking-widest flex items-center gap-3">
          <span className="hover:text-lumiere-dark cursor-pointer transition">Shop</span>
          <span>/</span>
          <span className="hover:text-lumiere-dark cursor-pointer transition">{product.category?.name || 'Category'}</span>
          <span>/</span>
          <span className="text-lumiere-dark font-medium">{product.name}</span>
        </div>
        
        {/* Etkileşimli İstemci Bileşenini Çağırıyoruz */}
        <ProductDetailClient product={product} />
      </div>

      <Footer />
    </main>
  );
}