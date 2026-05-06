"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    select: {
      id: true,
      clientName: true,
      feedbackEn: true,
      feedbackAr: true,
      areaEn: true,
      areaAr: true,
      rating: true
    }
  });
}

export async function createTestimonial(data: { clientName: string; feedbackEn: string; feedbackAr: string; areaEn: string; areaAr: string; rating: number }) {
  await prisma.testimonial.create({ data });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
