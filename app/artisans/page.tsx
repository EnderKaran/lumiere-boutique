import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ArtisansPage() {
  const artisans = [
    {
      name: "Elena Rossi",
      craft: "Master Weaver",
      location: "Tuscany, Italy",
      story: "With over 30 years of experience, Elena breathes life into our organic linen collections using traditional wooden looms.",
      image: "https://images.unsplash.com/photo-1590739293963-42cc60799676?q=80&w=2070",
    },
    {
      name: "Kenji Tanaka",
      craft: "Ceramic Artist",
      location: "Kyoto, Japan",
      story: "Kenji focuses on 'wabi-sabi' aesthetics, creating our home decor pieces that celebrate the beauty in imperfection.",
      image: "https://images.unsplash.com/photo-1565193998772-263d8ff4af42?q=80&w=2070",
    },
    {
      name: "Amina Mansour",
      craft: "Natural Dyer",
      location: "Marrakech, Morocco",
      story: "Amina uses ancient plant-based dyeing techniques to achieve the soft, earthy tones characteristic of Lumière fabrics.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
    }
  ];

  return (
    <>
      <Navbar />
      <main className="bg-lumiere-beige min-h-screen pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <section className="mb-32 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-lumiere-gray mb-6 block">The Makers</span>
            <h1 className="font-serif text-6xl md:text-7xl text-lumiere-dark mb-10 leading-tight">
              The Hands <br /> Behind Lumière.
            </h1>
            <p className="text-lg text-lumiere-gray leading-relaxed">
              Every Lumière piece carries the soul of the person who created it. 
              We partner with independent artisans who preserve heritage techniques 
              while embracing modern minimalism.
            </p>
          </section>

          {/* Artisan Showcase - Bento Grid Layout */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-32">
            {artisans.map((artisan, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${
                  index % 3 === 0 ? "md:col-span-7" : index % 3 === 1 ? "md:col-span-5" : "md:col-span-12"
                }`}
              >
                <div className="aspect-[4/5] bg-zinc-200 mb-6 overflow-hidden rounded-sm group">
                  <img 
                    src={artisan.image} 
                    alt={artisan.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif text-3xl text-lumiere-dark">{artisan.name}</h3>
                    <p className="text-sm text-lumiere-gray uppercase tracking-widest">{artisan.craft} — {artisan.location}</p>
                  </div>
                </div>
                <p className="text-lumiere-gray text-sm max-w-md leading-relaxed italic">
                  "{artisan.story}"
                </p>
              </div>
            ))}
          </section>

          {/* Philosophy CTA */}
          <section className="bg-lumiere-dark text-[#F4EFEA] p-16 md:p-24 text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Honoring Tradition.</h2>
            <p className="max-w-xl mx-auto opacity-70 mb-12 text-sm leading-relaxed">
              By supporting our artisans, you are not just buying a product; 
              you are helping to keep ancient crafts alive for future generations.
            </p>
            <div className="inline-block border-b border-white/30 pb-2 text-sm uppercase tracking-widest hover:border-white transition-all cursor-pointer">
              Explore the Collection
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}