// src/app/layout.tsx
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer"; // CartDrawer'ı import et

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-lumiere-beige text-lumiere-dark font-sans antialiased">
        
        {children}
        <CartDrawer /> {/* SEPETİ BURAYA EKLEDİK: Artık her sayfada çalışacak */}
      </body>
    </html>
  );
}