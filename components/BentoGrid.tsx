import Link from "next/link";

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-24">
      <div className="text-center mb-16">
        <span className="uppercase text-xs tracking-[0.2em] text-lumiere-gray mb-2 block">
          Explore Categories
        </span>
        <h2 className="font-serif text-4xl text-lumiere-dark">Curated Collections</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
        {/* Sol Büyük Kart */}
        <Link href="/shop/bags" className="relative group overflow-hidden rounded-xl bg-zinc-100 h-[400px] md:h-full">
          <img 
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000" 
            alt="The Signature Bag" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0"></div>
          <div className="absolute bottom-8 left-8">
            <h3 className="text-white font-serif text-2xl drop-shadow-md">The Signature Bag</h3>
          </div>
        </Link>

        {/* Sağ Taraf - İkiye Bölünmüş */}
        <div className="grid grid-rows-2 gap-6 h-[600px] md:h-full">
          {/* Sağ Üst */}
          <Link href="/shop/ceramics" className="relative group overflow-hidden rounded-xl bg-[#F4EFEA] flex items-center p-8">
            <div className="w-1/2 z-10">
              <h3 className="font-serif text-3xl text-lumiere-dark mb-2">Ceramics</h3>
              <span className="text-sm underline underline-offset-4 text-lumiere-dark hover:text-lumiere-accent transition-colors">View Pieces</span>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full">
              <img 
                src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=1000" 
                alt="Ceramics" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Sağ Alt - İki Sütun */}
          <div className="grid grid-cols-2 gap-6">
            <Link href="/shop/jewelry" className="relative group overflow-hidden rounded-xl bg-zinc-100">
              <img 
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000" 
                alt="Jewelry" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <h3 className="text-white font-serif text-xl">Jewelry</h3>
              </div>
            </Link>
            
            <div className="bg-lumiere-dark p-8 rounded-xl flex flex-col justify-center text-white">
              <div className="w-8 h-8 mb-4 border border-white/30 rounded-full flex items-center justify-center">
                <span className="text-xs">⚒</span>
              </div>
              <h3 className="font-serif text-xl mb-3">Meet the Artisan</h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Every piece tells a story of tradition and dedication.
              </p>
              <Link href="/story" className="text-xs tracking-widest uppercase border-b border-white/30 w-fit pb-1 hover:border-white transition-colors">
                Read Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}