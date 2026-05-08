"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getFAQs() {
  try {
    return await prisma.fAQ.findMany({
      select: {
        id: true,
        questionEn: true,
        questionAr: true,
        answerEn: true,
        answerAr: true
      }
    });
  } catch (error) {
    console.error("Database connection failed on getFAQs:", error);
    return [];
  }
}

export async function createFAQ(data: { questionEn: string; questionAr: string; answerEn: string; answerAr: string }) {
  try {
    await prisma.fAQ.create({ data });
    revalidatePath("/admin/faqs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create FAQ:", error);
    return { success: false, error: "Database error" };
  }
}

export async function deleteFAQ(id: string) {
  try {
    await prisma.fAQ.delete({ where: { id } });
    revalidatePath("/admin/faqs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete FAQ:", error);
    return { success: false, error: "Database error" };
  }
}
