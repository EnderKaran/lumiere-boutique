import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-lumiere-beige min-h-screen pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <section className="mb-20">
            <h1 className="font-serif text-5xl md:text-7xl text-lumiere-dark mb-6">Contact Us.</h1>
            <p className="text-lumiere-gray max-w-md italic">
              Whether you have a question about our collections or a bespoke request, our team is here to assist you.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            
            {/* İletişim Bilgileri */}
            <div className="space-y-12">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-lumiere-gray mb-4">General Inquiries</h3>
                <p className="font-serif text-2xl text-lumiere-dark">hello@lumiere-boutique.com</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-lumiere-gray mb-4">Visit Our Studio</h3>
                <p className="font-serif text-2xl text-lumiere-dark leading-relaxed">
                  124 Minimalist Ave, <br />
                  Bursa, Turkey
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-lumiere-gray mb-4">Follow Along</h3>
                <div className="flex gap-6 font-serif text-xl text-lumiere-dark">
                  <a href="#" className="hover:opacity-50 transition-opacity underline underline-offset-4">Instagram</a>
                  <a href="#" className="hover:opacity-50 transition-opacity underline underline-offset-4">Pinterest</a>
                </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div className="bg-white p-10 md:p-16 border border-lumiere-dark/5 shadow-sm">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">Subject</label>
                  <select className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Wholesale</option>
                    <option>Press</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-lumiere-gray">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-transparent border-b border-lumiere-dark/20 py-2 focus:outline-none focus:border-lumiere-dark transition-colors text-sm resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-lumiere-dark text-[#F4EFEA] py-4 text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}