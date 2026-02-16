import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage({ searchParams }: { searchParams: { orderId: string, tx: string } }) {
  return (
    <div className="min-h-screen bg-lumiere-beige flex items-center justify-center p-6">
      <div className="bg-white max-w-lg w-full p-10 text-center rounded-xl shadow-sm border border-zinc-200">
        <div className="flex justify-center mb-6">
          <CheckCircle size={60} className="text-emerald-600" />
        </div>
        <h1 className="font-serif text-3xl text-lumiere-dark mb-2">Payment Successful</h1>
        <p className="text-lumiere-gray mb-8">
          Thank you for your purchase. Your order has been securely processed via <span className="font-semibold text-lumiere-dark">Iyzico</span>.
        </p>

        <div className="bg-zinc-50 p-4 rounded-md text-left text-sm mb-8 space-y-2 border border-zinc-100">
          <div className="flex justify-between">
            <span className="text-lumiere-gray">Order ID:</span>
            <span className="font-mono text-lumiere-dark">{searchParams.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lumiere-gray">Iyzico Transaction:</span>
            <span className="font-mono text-emerald-700">{searchParams.tx}</span>
          </div>
        </div>

        <Link href="/shop" className="inline-block bg-lumiere-dark text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-lumiere-accent transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}