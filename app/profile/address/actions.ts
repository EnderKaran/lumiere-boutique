"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAddress(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const fullName = formData.get("fullName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const city = formData.get("city") as string;
  const district = formData.get("district") as string;
  const addressDetail = formData.get("addressDetail") as string;
  const isDefault = formData.get("isDefault") === "on";

  // Eğer bu adres varsayılan olacaksa, diğerlerini varsayılan olmaktan çıkar
  if (isDefault) {
    await (prisma as any).address.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    });
  }

  await (prisma as any).address.create({
    data: {
      userId: session.user.id,
      title,
      fullName,
      phoneNumber,
      city,
      district,
      addressDetail,
      isDefault,
    },
  });

  revalidatePath("/profile/address");
  redirect("/profile/address");
}