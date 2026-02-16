"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getAdminStats() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Unauthorized");

  // 1. Toplam Ciro
  const orders = await prisma.order.findMany();
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  // 2. Toplam Kullanıcı Sayısı
  const totalUsers = await prisma.user.count();

  // 3. Toplam Sipariş Sayısı
  const totalOrders = orders.length;

  // 4. Grafik Verisi (Son 7 Günlük Simülasyon/Gerçek)
  const chartData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 5000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  return { totalRevenue, totalUsers, totalOrders, chartData };
}