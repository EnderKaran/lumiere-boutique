"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// --- 1. DASHBOARD İSTATİSTİKLERİ (Hata veren kısım burasıydı) ---
export async function getAdminStats() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Unauthorized");

  // Toplam Ciro
  const orders = await prisma.order.findMany();
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  // Toplam Kullanıcı Sayısı
  const totalUsers = await prisma.user.count();

  // Toplam Sipariş Sayısı
  const totalOrders = orders.length;

  // Grafik Verisi (Gerçek verilerle veya simülasyonla)
  const chartData = [
    { name: 'Mon', revenue: totalRevenue * 0.1 },
    { name: 'Tue', revenue: totalRevenue * 0.15 },
    { name: 'Wed', revenue: totalRevenue * 0.2 },
    { name: 'Thu', revenue: totalRevenue * 0.1 },
    { name: 'Fri', revenue: totalRevenue * 0.25 },
    { name: 'Sat', revenue: totalRevenue * 0.12 },
    { name: 'Sun', revenue: totalRevenue * 0.08 },
  ];

  return { totalRevenue, totalUsers, totalOrders, chartData };
}

// --- 2. SİPARİŞ İŞLEMLERİ ---
export async function getAdminOrders() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Unauthorized");

  return await prisma.order.findMany({
    include: { 
      user: true, 
      items: { include: { product: true } } 
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateOrderStatus(orderId: string, status: string) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as any }
  });
  revalidatePath("/admin/orders");
}

// --- 3. ÜRÜN CRUD İŞLEMLERİ ---
export async function deleteProduct(productId: string) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
}

export async function saveProduct(formData: FormData) {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const images = (formData.get("images") as string).split(",");
  
  const data = { name, price, stock, description, categoryId, images };

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/admin/products");
}