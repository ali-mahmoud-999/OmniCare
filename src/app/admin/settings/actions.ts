"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getSettings() {
  try {
    let settings = await prisma.siteSettings.findFirst({
      select: {
        id: true,
        primaryPhone: true,
        whatsappLink: true,
        facebookLink: true,
        supportEmail: true,
        officeAddressEn: true,
        officeAddressAr: true,
        promoBannerTextEn: true,
        promoBannerTextAr: true,
        promoBannerActive: true,
      }
    });
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          primaryPhone: "+20 123 456 7890",
          whatsappLink: "https://wa.me/201234567890",
          facebookLink: "https://facebook.com",
          supportEmail: "info@omnicare-eg.com",
          officeAddressEn: "Cairo, Egypt",
          officeAddressAr: "القاهرة، مصر",
          promoBannerTextEn: "15% off your first booking!",
          promoBannerTextAr: "خصم 15% على حجزك الأول!",
          promoBannerActive: true,
        },
      });
    }
    return settings;
  } catch (error) {
    console.error("Database connection failed on getSettings:", error);
    return null;
  }
}

export async function saveSettings(data: any) {
  try {
    const settings = await prisma.siteSettings.findFirst({
      select: { id: true }
    });
    if (settings) {
      await prisma.siteSettings.update({
        where: { id: settings.id },
        data: {
          primaryPhone: data.primaryPhone,
          whatsappLink: data.whatsappLink,
          facebookLink: data.facebookLink,
          supportEmail: data.supportEmail,
          officeAddressEn: data.officeAddressEn,
          officeAddressAr: data.officeAddressAr,
          promoBannerTextEn: data.promoBannerTextEn,
          promoBannerTextAr: data.promoBannerTextAr,
          promoBannerActive: data.promoBannerActive,
        },
      });
    }
    revalidatePath("/");
    revalidatePath("/admin/settings");
  } catch (error) {
    console.error("Failed to save settings:", error);
    throw new Error("Failed to save settings");
  }
}
