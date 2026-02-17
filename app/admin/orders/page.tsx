import { getAdminOrders } from "@/lib/admin-actions";
import OrdersTable from "./OrdersTable";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-serif text-lumiere-dark">Order Management</h1>
        <p className="text-zinc-500 mt-1">Manage and track your customers' orders.</p>
      </header>

      {/* Responsive Table/Card List */}
      <OrdersTable initialOrders={orders} />
    </div>
  );
}