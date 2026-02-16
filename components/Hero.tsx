export default function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 md:py-0 md:h-[80vh] max-w-7xl mx-auto gap-10">
      
      {/* Text Content */}
      <div className="w-full md:w-1/2 z-10 text-center md:text-left pt-6 md:pt-0">
        <span className="uppercase text-xs tracking-[0.3em] text-lumiere-gray mb-4 block">
          Organic Luxury
        </span>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-lumiere-dark">
          Timeless Elegance, <br />
          <span className="italic">Crafted by Hand.</span>
        </h1>
        <p className="text-lumiere-gray mb-8 text-base md:text-lg max-w-md mx-auto md:mx-0">
          Discover our autumn collection of artisanal ceramics and ethically sourced leather goods.
        </p>
        <button className="bg-lumiere-dark text-white px-8 py-4 uppercase text-xs tracking-widest hover:bg-lumiere-accent transition-colors duration-300">
          Shop the Collection
        </button>
      </div>
      
      {/* Image Container */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[70%] relative bg-zinc-200 rounded-3xl shadow-2xl overflow-hidden mt-4 md:mt-0">
         <img 
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000" 
            alt="Hero Product"
            className="w-full h-full object-cover"
         />
      </div>
      
    </section>
  );
}