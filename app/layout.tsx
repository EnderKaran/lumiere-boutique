import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar"; // Navbar'ı import et
import { auth } from "@/auth"; // Session kontrolü için

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth(); // Oturum bilgisini çekiyoruz

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-lumiere-beige text-lumiere-dark font-sans antialiased">
        {/* Navbar'a kullanıcıyı prop olarak geçiyoruz */}
        <Navbar user={session?.user} /> 
        
        {/* Sayfa içerikleri Navbar'ın altında kalmasın diye pt-24 (padding-top) ekliyoruz */}
        <div className="pt-24">
          {children}
        </div>

        <CartDrawer /> 
      </body>
    </html>
  );
}