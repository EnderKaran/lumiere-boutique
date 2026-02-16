import { getAdminOrders, updateOrderStatus } from "@/lib/admin-actions";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif text-lumiere-dark">Order Management</h1>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-medium">Order ID</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-medium">Customer</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-medium">Date</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-medium">Total</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-50 transition">
                <td className="px-6 py-4 text-sm font-mono text-zinc-400">#{order.id.slice(-6)}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-lumiere-dark">{order.user.name}</p>
                  <p className="text-xs text-zinc-400">{order.user.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-lumiere-dark">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <select 
                    defaultValue={order.status}
                    onChange={async (e) => {
                      "use server";
                      await updateOrderStatus(order.id, e.target.value);
                    }}
                    className={`text-xs px-3 py-1 rounded-full border outline-none font-medium ${
                      order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      order.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}