"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getServices() {
  try {
    return await prisma.service.findMany({
      select: {
        id: true,
        titleEn: true,
        titleAr: true,
        descriptionEn: true,
        descriptionAr: true,
        iconLink: true
      }
    });
  } catch (error) {
    console.error("Database connection failed on getServices:", error);
    return [];
  }
}

export async function createService(data: { titleEn: string; titleAr: string; descriptionEn: string; descriptionAr: string; iconLink: string }) {
  try {
    await prisma.service.create({ data });
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create service:", error);
    return { success: false, error: "Database error" };
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { success: false, error: "Database error" };
  }
}
