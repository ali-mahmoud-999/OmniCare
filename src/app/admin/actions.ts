"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function seedDatabase() {
  // Upsert Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      primaryPhone: "+20 123 456 7890",
      whatsappLink: "https://wa.me/201234567890",
      supportEmail: "contact@omnicare.eg",
      officeAddressEn: "Cairo, Egypt",
      officeAddressAr: "القاهرة، مصر",
      promoBannerTextEn: "15% off nursing services this week!",
      promoBannerTextAr: "خصم 15% على خدمات التمريض هذا الأسبوع!",
      promoBannerActive: true,
    },
  });

  // Seed Services
  const services = [
    {
      titleEn: "Premium Nursing",
      titleAr: "تمريض متميز",
      descriptionEn: "24/7 world-class nursing care in the comfort of your home.",
      descriptionAr: "رعاية تمريضية عالمية المستوى على مدار الساعة في راحة منزلك.",
      iconLink: "Stethoscope",
    },
    {
      titleEn: "Elite Nannies",
      titleAr: "مربيات النخبة",
      descriptionEn: "Trusted, certified, and compassionate nannies for your children.",
      descriptionAr: "مربيات موثوقات ومعتمدات ورحيمات لأطفالك.",
      iconLink: "Baby",
    },
    {
      titleEn: "Luxury Housekeeping",
      titleAr: "تدبير منزلي فاخر",
      descriptionEn: "Immaculate cleaning and property management with absolute discretion.",
      descriptionAr: "تنظيف وإدارة ممتلكات لا تشوبها شائبة مع تقدير مطلق.",
      iconLink: "Sparkles",
    },
  ];

  for (const service of services) {
    const existingService = await prisma.service.findFirst({
      where: { titleEn: service.titleEn }
    });
    if (!existingService) {
      await prisma.service.create({ data: service });
    }
  }

  // Seed Testimonials
  const testimonials = [
    {
      clientName: "Amina El-Sayed",
      feedbackEn: "The nursing service was exceptional. They took great care of my father.",
      feedbackAr: "خدمة التمريض كانت استثنائية. لقد اعتنوا بوالدي بشكل رائع.",
      areaEn: "Zamalek",
      areaAr: "الزمالك",
      rating: 5,
    },
    {
      clientName: "Tarek Hassan",
      feedbackEn: "Our OmniCare nanny is absolutely wonderful. Complete peace of mind.",
      feedbackAr: "مربية أومني كير رائعة بكل معنى الكلمة. راحة بال تامة.",
      areaEn: "New Cairo",
      areaAr: "القاهرة الجديدة",
      rating: 5,
    },
    {
      clientName: "Laila Youssef",
      feedbackEn: "Impeccable housekeeping. My home has never looked this perfect.",
      feedbackAr: "تدبير منزلي لا تشوبه شائبة. لم يبد منزلي بهذا الكمال من قبل.",
      areaEn: "Maadi",
      areaAr: "المعادي",
      rating: 5,
    },
  ];

  for (const testimonial of testimonials) {
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: { clientName: testimonial.clientName }
    });
    if (!existingTestimonial) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }

  // Seed FAQs
  const faqs = [
    {
      questionEn: "What areas in Egypt do you cover?",
      questionAr: "ما هي المناطق التي تغطونها في مصر؟",
      answerEn: "We primarily cover Greater Cairo, including Zamalek, Maadi, New Cairo, and Sheikh Zayed. However, special arrangements can be made for other regions.",
      answerAr: "نحن نغطي بشكل أساسي القاهرة الكبرى، بما في ذلك الزمالك والمعادي والقاهرة الجديدة والشيخ زايد. ومع ذلك، يمكن إجراء ترتيبات خاصة لمناطق أخرى.",
    },
    {
      questionEn: "Are your caregivers certified?",
      questionAr: "هل مقدمو الرعاية لديكم معتمدون؟",
      answerEn: "Yes, all our caregivers and nannies undergo rigorous background checks and hold recognized certifications in their respective fields.",
      answerAr: "نعم، يخضع جميع مقدمي الرعاية والمربيات لدينا لفحوصات خلفية صارمة ويحملون شهادات معترف بها في مجالاتهم.",
    },
    {
      questionEn: "How quickly can a service be arranged?",
      questionAr: "ما مدى سرعة ترتيب الخدمة؟",
      answerEn: "Depending on your requirements, we can arrange for our elite services within 24 to 48 hours of your initial booking request.",
      answerAr: "بناءً على متطلباتك، يمكننا ترتيب خدمات النخبة لدينا في غضون 24 إلى 48 ساعة من طلب الحجز الأولي.",
    },
  ];

  for (const faq of faqs) {
    const existingFaq = await prisma.fAQ.findFirst({
      where: { questionEn: faq.questionEn }
    });
    if (!existingFaq) {
      await prisma.fAQ.create({ data: faq });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
}
