"use client";

import { updateOrderStatus } from "@/lib/admin-actions";
import { useState } from "react";

export default function OrdersTable({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
    // UI'ı anlık güncellemek için state'i değiştiriyoruz
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="space-y-4">
      {/* 1. MASAÜSTÜ GÖRÜNÜMÜ:  */}
      <div className="hidden md:block bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-medium">Order ID</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-medium">Customer</th>
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
                <td className="px-6 py-4 text-sm font-semibold text-lumiere-dark">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <StatusSelect order={order} onStatusChange={handleStatusChange} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. MOBİL GÖRÜNÜMÜ: Sadece küçük ekranlarda kart yapısı olarak görünür */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono text-zinc-400">#{order.id.slice(-6)}</p>
                <h3 className="font-medium text-lumiere-dark mt-1">{order.user.name}</h3>
                <p className="text-xs text-zinc-500">{order.user.email}</p>
              </div>
              <p className="text-lg font-serif text-lumiere-dark">${order.total.toFixed(2)}</p>
            </div>
            
            <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
              <span className="text-xs text-zinc-400 uppercase tracking-widest">Status</span>
              <StatusSelect order={order} onStatusChange={handleStatusChange} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Yardımcı Seçim Bileşeni
function StatusSelect({ order, onStatusChange }: { order: any, onStatusChange: any }) {
  const statusColors: any = {
    DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    SHIPPED: "bg-blue-50 text-blue-700 border-blue-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200"
  };

  return (
    <select 
      defaultValue={order.status}
      onChange={(e) => onStatusChange(order.id, e.target.value)}
      className={`text-xs px-4 py-2 rounded-full border outline-none font-medium appearance-none cursor-pointer ${statusColors[order.status] || "bg-zinc-50"}`}
    >
      <option value="PENDING">Pending</option>
      <option value="SHIPPED">Shipped</option>
      <option value="DELIVERED">Delivered</option>
      <option value="CANCELLED">Cancelled</option>
    </select>
  );
}