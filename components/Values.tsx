import { HeartHandshake, Leaf, Clock } from "lucide-react";
import Link from "next/link";

export default function Values() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-24">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        
        {/* Metin ve Özellikler */}
        <div className="w-full md:w-1/2">
          <h2 className="font-serif text-4xl text-lumiere-dark mb-6 leading-tight">
            Ethical Luxury, <br /> Rooted in Values.
          </h2>
          <p className="text-lumiere-gray mb-12 text-lg">
            We believe true luxury lies in the story behind the product. We are committed to sustainable practices and supporting local artisans.
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#F4EFEA] rounded-full flex items-center justify-center shrink-0">
                <HeartHandshake className="text-lumiere-dark" size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl text-lumiere-dark mb-1">Fair Trade</h4>
                <p className="text-lumiere-gray text-sm">Empowering communities through fair wages.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#F4EFEA] rounded-full flex items-center justify-center shrink-0">
                <Leaf className="text-lumiere-dark" size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl text-lumiere-dark mb-1">Sustainable Materials</h4>
                <p className="text-lumiere-gray text-sm">Sourced responsibly to minimize impact.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#F4EFEA] rounded-full flex items-center justify-center shrink-0">
                <Clock className="text-lumiere-dark" size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl text-lumiere-dark mb-1">Slow Fashion</h4>
                <p className="text-lumiere-gray text-sm">Quality over quantity, designed to last.</p>
              </div>
            </div>
          </div>

          <Link href="/story" className="font-serif text-lumiere-dark border-b border-lumiere-dark pb-1 hover:text-lumiere-accent hover:border-lumiere-accent transition-colors">
            Read Our Full Story →
          </Link>
        </div>

        {/* Görsel */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-200 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=1000" 
              alt="Artisan making pottery" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}