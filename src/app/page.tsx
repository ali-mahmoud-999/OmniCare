import { PrismaClient } from "@prisma/client"
import { LandingPageUI } from "./LandingPageUI"

const prisma = new PrismaClient()

export default async function LandingPage() {
  const [settings, services, testimonials, faqs] = await Promise.all([
    prisma.siteSettings.findUnique({ 
      where: { id: 1 },
      select: {
        id: true,
        primaryPhone: true,
        whatsappLink: true,
        supportEmail: true,
        officeAddressEn: true,
        officeAddressAr: true,
        promoBannerTextEn: true,
        promoBannerTextAr: true,
        promoBannerActive: true
      }
    }),
    prisma.service.findMany({
      select: {
        id: true,
        titleEn: true,
        titleAr: true,
        descriptionEn: true,
        descriptionAr: true,
        iconLink: true
      }
    }),
    prisma.testimonial.findMany({ 
      orderBy: { rating: "desc" }, 
      take: 3,
      select: {
        id: true,
        clientName: true,
        feedbackEn: true,
        feedbackAr: true,
        areaEn: true,
        areaAr: true,
        rating: true
      }
    }),
    prisma.fAQ.findMany({
      select: {
        id: true,
        questionEn: true,
        questionAr: true,
        answerEn: true,
        answerAr: true
      }
    }),
  ])

  return (
    <LandingPageUI 
      settings={settings} 
      services={services} 
      testimonials={testimonials} 
      faqs={faqs} 
    />
  )
}
