import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Sadece bu kullanıcıya ait siparişleri çekiyoruz
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id as string },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-lumiere-beige py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl mb-8">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-lumiere-dark/10">
            <p className="text-lumiere-gray italic">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-6 bg-white border border-lumiere-dark/5 flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-lumiere-gray mb-1">Order #{order.id.slice(-6)}</p>
                  <p className="font-serif text-lg">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-lumiere-dark">${order.total.toFixed(2)}</p>
                  <p className="text-[10px] uppercase text-green-600 font-bold">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}