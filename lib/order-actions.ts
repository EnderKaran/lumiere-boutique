"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function processIyzicoPayment(cartItems: any[], totalAmount: number, shippingData: any) {
  // 1. Kullanıcı Kontrolü
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Lütfen sipariş vermek için giriş yapın." };
  }

  try {
    // 2. Iyzico Ödeme İşlemi (Simülasyon)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Iyzico'dan dönen sahte bir işlem numarası üretiyoruz
    const mockIyzicoTxId = "iyzi_tx_" + Math.random().toString(36).substring(2, 12).toUpperCase();

    // 3. Siparişi Veritabanına Yaz (Transaction)
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total: totalAmount,
        status: "PENDING",
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // 4. Satın Alınan Ürünlerin Stoklarını Düş
    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return { 
      success: true, 
      orderId: order.id, 
      transactionId: mockIyzicoTxId 
    };

  } catch (error) {
    console.error("Ödeme hatası:", error);
    return { error: "Ödeme işlemi sırasında Iyzico sunucularında bir hata oluştu." };
  }
}