import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SustainabilityPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FCFBFA] min-h-screen pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <section className="text-center mb-32">
            <span className="text-xs uppercase tracking-[0.3em] text-lumiere-gray mb-6 block">Our Commitment</span>
            <h1 className="font-serif text-5xl md:text-7xl text-lumiere-dark mb-10">
              Future-Proof <br /> Elegance.
            </h1>
            <p className="max-w-2xl mx-auto text-lumiere-gray leading-relaxed text-lg italic">
              "We believe that true luxury is not just about the final product, 
              but the story behind it and the world it leaves behind."
            </p>
          </section>

          {/* Pillars of Sustainability - Bento Grid Lite */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {/* Madde 1: Malzeme */}
            <div className="group border border-lumiere-dark/5 p-12 bg-white transition-all duration-500 hover:shadow-sm">
              <h3 className="font-serif text-2xl mb-6">Organic Materials</h3>
              <p className="text-sm text-lumiere-gray leading-relaxed mb-8">
                From GOTS-certified organic cotton to recycled cashmere, we prioritize 
                fibers that respect the earth and your skin.
              </p>
              <div className="w-full h-40 bg-zinc-50 overflow-hidden">
                 <img 
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070" 
                  alt="Cotton" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Madde 2: Etik Üretim */}
            <div className="group border border-lumiere-dark/5 p-12 bg-white transition-all duration-500 hover:shadow-sm">
              <h3 className="font-serif text-2xl mb-6">Ethical Craft</h3>
              <p className="text-sm text-lumiere-gray leading-relaxed mb-8">
                We partner with small-scale artisans who receive fair wages and work in 
                safe, inspiring environments across the globe.
              </p>
              <div className="w-full h-40 bg-zinc-50 overflow-hidden">
                 <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
                  alt="Artisans" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Madde 3: Atıksız Yaşam */}
            <div className="group border border-lumiere-dark/5 p-12 bg-white transition-all duration-500 hover:shadow-sm">
              <h3 className="font-serif text-2xl mb-6">Circular Vision</h3>
              <p className="text-sm text-lumiere-gray leading-relaxed mb-8">
                Designed for longevity, our pieces are meant to be passed down through 
                generations, reducing the cycle of fast-fashion waste.
              </p>
              <div className="w-full h-40 bg-zinc-50 overflow-hidden">
                 <img 
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070" 
                  alt="Longevity" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </section>

          {/* Detailed Narrative Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-32">
            <div className="aspect-[4/5] bg-zinc-200 overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070" 
                alt="Slow Fashion" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-4xl mb-8 leading-tight">Zero Waste, <br /> Infinite Style.</h2>
              <p className="text-lumiere-gray leading-relaxed mb-8">
                Our packaging is as thoughtful as our products. Every Lumière order arrives 
                in compostable, recycled materials, ensuring that our commitment to the 
                planet doesn't stop at your doorstep.
              </p>
              <ul className="space-y-4 text-sm text-lumiere-dark">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-lumiere-dark rounded-full" />
                  100% Plastic-Free Packaging
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-lumiere-dark rounded-full" />
                  Low-Carbon Shipping Partners
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-lumiere-dark rounded-full" />
                  Transparency at Every Stage
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}