"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/lib/admin-actions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getAdminStats().then(setStats);
  }, []);

  if (!stats) return <div className="animate-pulse">Loading analytics...</div>;

  const cards = [
    { label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: <DollarSign className="text-emerald-600" />, trend: "+12.5%" },
    { label: "Total Orders", value: stats.totalOrders, icon: <ShoppingBag className="text-blue-600" />, trend: "+3.2%" },
    { label: "Total Customers", value: stats.totalUsers, icon: <Users className="text-orange-600" />, trend: "+18%" },
    { label: "Conversion Rate", value: "3.24%", icon: <TrendingUp className="text-purple-600" />, trend: "+0.5%" },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-serif text-lumiere-dark">Dashboard Overview</h1>
        <p className="text-zinc-500 mt-1">Welcome back. Here's what's happening with Lumière today.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-zinc-50 rounded-lg">{card.icon}</div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{card.trend}</span>
            </div>
            <h3 className="text-zinc-500 text-sm mb-1">{card.label}</h3>
            <p className="text-2xl font-semibold text-lumiere-dark">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
        <h3 className="font-serif text-xl text-lumiere-dark mb-8">Weekly Revenue Analysis</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f8f8f8'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="revenue" fill="#18181b" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}