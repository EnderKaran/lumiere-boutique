import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import ShopClient from "./ShopClient";

export default async function ShopPage() {
  // Veritabanındaki tüm ürünleri Server Component'te çekiyoruz
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-lumiere-beige flex flex-col">
      <Navbar />
      
      {/* Sayfa Başlığı ve Açıklaması */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-8 w-full">
        <h1 className="font-serif text-5xl md:text-6xl text-lumiere-dark mb-4">The Autumn Collection</h1>
        <p className="text-lumiere-gray max-w-xl text-lg">
          Curated pieces in earth tones and natural fibers. Designed for the changing seasons.
        </p>
      </section>

      {/* İstemci Tarafı Filtreleme Bileşeni */}
      <ShopClient initialProducts={products} />

      <Footer />
    </main>
  );
}