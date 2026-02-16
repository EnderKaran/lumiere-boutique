// src/app/checkout/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CheckoutClient from "./CheckoutClient";
import Navbar from "@/components/Navbar";

export default async function CheckoutPage() {
  const session = await auth();
  
  // Kullanıcı giriş yapmamışsa login sayfasına at
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#F4EFEA]">
      <Navbar />
      {/* İstemci bileşenini çağırıyoruz */}
      <CheckoutClient userEmail={session.user?.email || ""} />
    </main>
  );
}