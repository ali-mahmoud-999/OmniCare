"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getFAQs() {
  return await prisma.fAQ.findMany({
    select: {
      id: true,
      questionEn: true,
      questionAr: true,
      answerEn: true,
      answerAr: true
    }
  });
}

export async function createFAQ(data: { questionEn: string; questionAr: string; answerEn: string; answerAr: string }) {
  await prisma.fAQ.create({ data });
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}

export async function deleteFAQ(id: string) {
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}
