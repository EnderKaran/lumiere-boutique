import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-lumiere-beige min-h-screen pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section - Marka Manifestosu */}
          <section className="max-w-3xl mb-32">
            <h1 className="font-serif text-6xl md:text-8xl text-lumiere-dark mb-10 leading-tight">
              The Art of <br /> Essential Living.
            </h1>
            <p className="text-xl md:text-2xl text-lumiere-gray leading-relaxed italic">
              "Lumière was born from a desire to return to the essence of things. 
              We believe in the beauty of the organic, the value of the handcrafted, 
              and the timelessness of pure form."
            </p>
          </section>

          {/* Bento Grid Tarzı Hikaye Anlatımı */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
            {/* Ana Görsel Alanı */}
            <div className="md:col-span-8 aspect-[16/9] bg-zinc-200 relative overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-black/5 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Felsefe Kartı */}
            <div className="md:col-span-4 bg-lumiere-dark p-10 flex flex-col justify-center text-[#F4EFEA]">
              <h3 className="font-serif text-3xl mb-4">Our Philosophy</h3>
              <p className="text-sm leading-relaxed opacity-80">
                In a world of fast-paced consumption, we choose slow-living. 
                Every piece in our collection is selected for its ability to age 
                gracefully alongside you.
              </p>
            </div>

            {/* Değerler Kartı */}
            <div className="md:col-span-4 border border-lumiere-dark/10 p-10 flex flex-col justify-between">
              <span className="text-xs uppercase tracking-widest text-lumiere-gray">01. Ethical</span>
              <div>
                <h4 className="font-serif text-2xl mb-2">Responsibly Sourced</h4>
                <p className="text-sm text-lumiere-gray">Working directly with global artisans to ensure fair trade and sustainable practices.</p>
              </div>
            </div>

            {/* Alt Görsel Alanı */}
            <div className="md:col-span-8 aspect-[21/9] bg-zinc-200 overflow-hidden rounded-sm">
               <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070" 
                alt="Minimalist Design" 
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Vizyon Bölümü */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center border-t border-lumiere-dark/10 pt-20">
            <div>
              <h2 className="font-serif text-4xl mb-6">Designed for the Modern Home</h2>
              <p className="text-lumiere-gray leading-relaxed mb-6">
                Our design process begins with a single question: "Is this essential?" 
                We strip away the noise to find the quiet luxury beneath. Lumière is 
                more than a boutique; it is a curation of intentional living.
              </p>
              <div className="w-20 h-px bg-lumiere-dark" />
            </div>
            <div className="aspect-square bg-zinc-50 p-12 flex items-center justify-center">
              <p className="font-serif text-5xl md:text-6xl text-center text-lumiere-dark/10 tracking-tighter">
                LUMIÈRE <br /> <span className="text-sm tracking-[1em] uppercase block mt-4">Est. 2026</span>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}