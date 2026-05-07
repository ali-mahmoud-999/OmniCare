"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronDown, Star, CheckCircle2, Menu, X } from "lucide-react";
import { BookingForm } from "./BookingForm";
import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "@/lib/translations";

export function LandingPageUI({ settings, services, testimonials, faqs }: any) {
  const { language, setLanguage, dir } = useLanguage();
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Promotional Banner */}
      {settings?.promoBannerActive && (
        <div className="bg-gold text-navy text-center py-2 font-medium text-sm px-4">
          {language === "ar" ? settings.promoBannerTextAr || settings.promoBannerTextEn : settings.promoBannerTextEn}
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-3xl font-serif font-bold text-navy">{t.siteTitle}</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse text-sm font-medium text-gray-700">
              <a href="#services" className="hover:text-gold transition-colors">{t.nav.services}</a>
              <a href="#testimonials" className="hover:text-gold transition-colors">{t.nav.testimonials}</a>
              <a href="#faq" className="hover:text-gold transition-colors">{t.nav.faq}</a>
              <a href="#book" className="btn-gold !py-2 !px-4">{t.nav.bookNow}</a>
              
              {/* Language Switcher */}
              <button 
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className="font-bold text-navy hover:text-gold transition-colors px-2 py-1 border border-gray-200 rounded"
              >
                {language === "ar" ? "English" : "العربية"}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className="font-bold text-navy text-sm border border-gray-200 px-2 py-1 rounded"
              >
                {language === "ar" ? "EN" : "عربي"}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-navy p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4 shadow-lg absolute w-full">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-gray-700 hover:text-gold">{t.nav.services}</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-gray-700 hover:text-gold">{t.nav.testimonials}</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-gray-700 hover:text-gold">{t.nav.faq}</a>
            <a href="#book" onClick={() => setMobileMenuOpen(false)} className="block text-gold font-bold">{t.nav.bookNow}</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-navy py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy/80 mix-blend-multiply" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-start flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 rtl:md:pr-0 rtl:md:pl-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              {t.hero.title1} <span className="text-gold">{t.hero.title2}</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#book" className="btn-gold text-center">{t.hero.bookBtn}</a>
              {settings?.whatsappLink && (
                <a href={settings.whatsappLink} target="_blank" rel="noreferrer" className="btn-outline !text-white !border-white hover:!bg-white hover:!text-navy text-center">
                  {t.hero.whatsappBtn}
                </a>
              )}
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
             {/* Abstract luxury shape/image placeholder */}
             <div className="relative w-full max-w-md mx-auto aspect-square rounded-full border-4 border-gold/30 flex items-center justify-center p-8">
               <div className="w-full h-full rounded-full bg-gradient-to-br from-gold/40 to-navy-light/40 backdrop-blur-3xl flex items-center justify-center shadow-2xl">
                 <div className="text-center text-white/80">
                   <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-gold" />
                   <p className="font-serif text-xl">{t.hero.badge}</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">{t.services.title}</h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service: any) => {
              const title = language === "ar" ? service.titleAr || service.titleEn : service.titleEn;
              const description = language === "ar" ? service.descriptionAr || service.descriptionEn : service.descriptionEn;
              return (
                <div key={service.id} className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-6 shadow-lg text-gold text-2xl font-bold">
                    {title.charAt(0)}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bookings & Testimonials Section */}
      <section id="book" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif font-bold text-navy mb-4">{t.booking.title}</h2>
              <p className="text-gray-600 mb-8">{t.booking.subtitle}</p>
              <BookingForm 
                services={services} 
                whatsappLink={settings?.whatsappLink || ""} 
              />
            </div>
            <div id="testimonials" className="lg:w-1/2">
              <h2 className="text-3xl font-serif font-bold text-navy mb-4">{t.testimonials.title}</h2>
              <div className="space-y-6 mt-8">
                {testimonials.map((testimonial: any) => {
                  const feedback = language === "ar" ? testimonial.feedbackAr || testimonial.feedbackEn : testimonial.feedbackEn;
                  const area = language === "ar" ? testimonial.areaAr || testimonial.areaEn : testimonial.areaEn;
                  return (
                    <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex text-gold mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-gray-700 italic mb-4">"{feedback}"</p>
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-navy">{testimonial.clientName}</span>
                        <span className="text-gray-400">{area}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">{t.faq.title}</h2>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>
          <div className="space-y-4">
            {faqs.map((faq: any) => {
              const question = language === "ar" ? faq.questionAr || faq.questionEn : faq.questionEn;
              const answer = language === "ar" ? faq.answerAr || faq.answerEn : faq.answerEn;
              return (
                <details key={faq.id} className="group bg-white rounded-2xl border border-gray-200 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-navy">
                    <span>{question}</span>
                    <span className="transition group-open:rotate-180 text-gold">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {answer}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12 border-t-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">{t.siteTitle}</h3>
            <p className="text-gray-400 text-sm max-w-xs">{t.footer.desc}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {settings?.primaryPhone && (
                <li className="flex items-center"><Phone className="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0 text-gold" /> {settings.primaryPhone}</li>
              )}
              {settings?.supportEmail && (
                <li className="flex items-center"><Mail className="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0 text-gold" /> {settings.supportEmail}</li>
              )}
              {settings && (settings.officeAddressEn || settings.officeAddressAr) && (
                <li className="flex items-center"><MapPin className="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0 text-gold" /> {language === "ar" ? settings.officeAddressAr || settings.officeAddressEn : settings.officeAddressEn}</li>
              )}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {t.footer.rights}
        </div>
      </footer>
    </div>
  );
}
