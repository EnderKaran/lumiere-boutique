import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 3,
    include: { category: true }
  });

  return (
    <main>
      <Navbar />
      <Hero />
      
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl mb-2">Curated Collections</h2>
            <p className="text-lumiere-gray">Explore our latest handcrafted pieces.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100 mb-4 rounded-lg">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="font-serif text-xl mb-1">{product.name}</h3>
              <p className="text-lumiere-gray text-sm mb-2">{product.category.name}</p>
              <p className="font-medium text-lumiere-accent">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}