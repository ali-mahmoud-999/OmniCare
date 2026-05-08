"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getSpecialties() {
  try {
    return await prisma.specialty.findMany({
      select: {
        id: true,
        titleEn: true,
        titleAr: true,
        descriptionEn: true,
        descriptionAr: true,
        imageUrl: true,
      }
    });
  } catch (error) {
    console.error("Failed to fetch specialties:", error);
    return [];
  }
}

export async function createSpecialty(data: { titleEn: string; titleAr: string; descriptionEn: string; descriptionAr: string; imageUrl?: string; }) {
  try {
    await prisma.specialty.create({ data });
    revalidatePath("/admin/specialties");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create specialty:", error);
    return { success: false, error: "Database error" };
  }
}

export async function updateSpecialty(id: string, data: { titleEn: string; titleAr: string; descriptionEn: string; descriptionAr: string; imageUrl?: string; }) {
  try {
    await prisma.specialty.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/specialties");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update specialty:", error);
    return { success: false, error: "Database error" };
  }
}

export async function deleteSpecialty(id: string) {
  try {
    await prisma.specialty.delete({ where: { id } });
    revalidatePath("/admin/specialties");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete specialty:", error);
    return { success: false, error: "Database error" };
  }
}
