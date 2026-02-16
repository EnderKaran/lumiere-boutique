import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-lumiere-beige text-lumiere-dark font-sans antialiased">
        {children}
      </body>
    </html>
  );
}