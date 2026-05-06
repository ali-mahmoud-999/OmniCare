"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getServices() {
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
}

export async function createService(data: { titleEn: string; titleAr: string; descriptionEn: string; descriptionAr: string; iconLink: string }) {
  await prisma.service.create({ data });
  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/");
}
