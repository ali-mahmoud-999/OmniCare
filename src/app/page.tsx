export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client"
import { LandingPageUI } from "./LandingPageUI"

const prisma = new PrismaClient()

export default async function LandingPage() {
  let settings: any = null;
  let services: any[] = [];
  let testimonials: any[] = [];
  let faqs: any[] = [];

  try {
    settings = await prisma.siteSettings.findUnique({ 
      where: { id: 1 },
      select: { id: true, primaryPhone: true, whatsappLink: true, facebookLink: true, supportEmail: true, officeAddressEn: true, officeAddressAr: true, promoBannerTextEn: true, promoBannerTextAr: true, promoBannerActive: true }
    });
  } catch (e) { console.error("Settings fetch error:", e); }

  try {
    services = await prisma.service.findMany({
      select: { id: true, titleEn: true, titleAr: true, descriptionEn: true, descriptionAr: true, iconLink: true }
    });
  } catch (e) { console.error("Services fetch error:", e); }

  try {
    testimonials = await prisma.testimonial.findMany({ 
      orderBy: { rating: "desc" }, take: 3,
      select: { id: true, clientName: true, feedbackEn: true, feedbackAr: true, areaEn: true, areaAr: true, rating: true }
    });
  } catch (e) { console.error("Testimonials fetch error:", e); }

  try {
    faqs = await prisma.fAQ.findMany({
      select: { id: true, questionEn: true, questionAr: true, answerEn: true, answerAr: true }
    });
  } catch (e) { console.error("FAQs fetch error:", e); }

  return (
    <LandingPageUI 
      settings={settings} 
      services={services} 
      testimonials={testimonials} 
      faqs={faqs} 
    />
  )
}
