import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-lumiere-beige flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-20 w-full flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
          <h1 className="font-serif text-5xl md:text-7xl text-lumiere-dark mb-6 leading-tight">
            Curated <br /> Elegance for <br /> the <span className="italic">Modern Soul.</span>
          </h1>
          <p className="text-lumiere-gray text-lg max-w-md mb-8">
            Sustainable luxury crafted with intention. Discover pieces that transcend seasons.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-lumiere-dark text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-lumiere-accent transition">
            View All Pieces <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="aspect-[4/3] bg-zinc-200 rounded-2xl overflow-hidden shadow-xl relative group">
            {/* GÜNCELLENEN GÖRSEL: The Classic Trench */}
            <img 
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000" 
              alt="The Classic Trench" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute bottom-6 left-6 bg-white/90 px-6 py-4 rounded-sm">
              <span className="text-[10px] uppercase tracking-widest text-lumiere-gray font-semibold block mb-1">Featured</span>
              <span className="font-serif text-lumiere-dark text-lg">The Classic Trench — Italian Wool</span>
            </div>
          </div>
        </div>
      </section>

      {/* İkili Lookbook Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* GÜNCELLENEN GÖRSEL: The Autumn Edit */}
        <div className="relative aspect-[3/4] md:aspect-auto md:h-[800px] rounded-2xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" 
            alt="The Autumn Edit" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-12 left-10">
            <span className="text-xs uppercase tracking-[0.2em] text-white/80 font-medium block mb-2">Just In</span>
            <h2 className="font-serif text-4xl text-white mb-4">The Autumn Edit</h2>
            <Link href="/shop" className="text-white text-sm flex items-center gap-2 hover:gap-4 transition-all border-b border-white/30 pb-1 w-fit hover:border-white">
              Explore Collection <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-lumiere-dark rounded-2xl p-10 md:p-16 flex flex-col justify-center text-[#F4EFEA] h-[350px]">
            <span className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-white/50"></span> Our Philosophy
            </span>
            <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
              "We believe in slow fashion. Every stitch tells a story of craftsmanship and care."
            </h3>
            <Link href="/shop" className="bg-[#F4EFEA] text-lumiere-dark px-6 py-3 text-xs tracking-widest uppercase hover:bg-white transition w-fit">
              Read Our Story
            </Link>
          </div>

          <div className="relative flex-1 rounded-2xl overflow-hidden group min-h-[350px]">
            {/* GÜNCELLENEN GÖRSEL: Pure Silk */}
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000" 
              alt="Pure Silk" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-1000"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <h2 className="font-serif text-4xl text-white mb-3 italic">Pure Silk</h2>
              <button className="border border-white text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-lumiere-dark transition backdrop-blur-sm">
                Shop Silks
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GÜNCELLENEN GÖRSEL: Artisan Ceramics (Alt Geniş Bant) */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 w-full mb-12">
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=1200" 
            alt="Artisan Ceramics" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-1000"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-start justify-center p-10 md:p-20 text-white">
            <span className="text-xs uppercase tracking-[0.2em] text-white/70 mb-4 block">The Studio</span>
            <h2 className="font-serif text-5xl md:text-6xl mb-6">Artisan Ceramics</h2>
            <Link href="/shop" className="bg-white text-lumiere-dark px-8 py-4 text-xs tracking-widest uppercase hover:bg-lumiere-beige transition mt-4">
              Explore The Studio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}