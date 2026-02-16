import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-lumiere-dark text-[#F4EFEA] pt-20 pb-10 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Marka */}
        <div className="col-span-1">
          <h2 className="font-serif text-2xl mb-6">LUMIÈRE</h2>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Curating organic luxury for the modern home and wardrobe. Timeless, ethical, and handcrafted.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
            <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
          </div>
        </div>

        {/* Linkler 1 */}
        <div className="col-span-1">
          <h3 className="font-serif text-lg mb-6">Shop</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Best Sellers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Home Decor</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        {/* Linkler 2 */}
        <div className="col-span-1">
          <h3 className="font-serif text-lg mb-6">Company</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Artisans</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Bülten */}
        <div className="col-span-1">
          <h3 className="font-serif text-lg mb-4">Join the Inner Circle</h3>
          <p className="text-sm text-white/70 mb-6">Receive early access to new collections and exclusive events.</p>
          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border border-white/30 text-[#F4EFEA] px-4 py-3 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/50"
            />
            <button type="submit" className="bg-[#F4EFEA] text-lumiere-dark px-4 py-3 text-sm font-medium hover:bg-white transition-colors">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-xs text-white/50 gap-4">
        <p>© 2026 Lumière Boutique. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}