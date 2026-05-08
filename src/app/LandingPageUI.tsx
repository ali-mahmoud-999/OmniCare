"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, ChevronDown, Star, CheckCircle2, Menu, X, Shield, Heart } from "lucide-react";
import { BookingForm } from "./BookingForm";
import { useLanguage } from "@/components/LanguageProvider";
import { translations } from "@/lib/translations";

const fadeIn: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export function LandingPageUI({ settings, services, testimonials, faqs }: any) {
  const { language, setLanguage, dir } = useLanguage();
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-inter">
      {/* Promotional Banner */}
      {settings?.promoBannerActive && (
        <div className="bg-gold text-navy text-center py-2 font-medium text-sm px-4 relative z-50">
          {language === "ar" ? settings.promoBannerTextAr || settings.promoBannerTextEn : settings.promoBannerTextEn}
        </div>
      )}

      {/* Glassmorphism Sticky Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-2' : 'bg-transparent py-4'} ${settings?.promoBannerActive ? 'top-9' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className={`text-3xl font-playfair font-bold ${scrolled ? 'text-navy' : 'text-white drop-shadow-md'}`}>OmniCare</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center space-x-8 rtl:space-x-reverse text-sm font-medium ${scrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`}>
              <a href="#services" className="hover:text-gold transition-colors">{t.nav.services}</a>
              <a href="#testimonials" className="hover:text-gold transition-colors">{t.nav.testimonials}</a>
              <a href="#faq" className="hover:text-gold transition-colors">{t.nav.faq}</a>
              <a href="#book" className="btn-gold !py-2 !px-5 shadow-lg hover:shadow-xl transition-all">{t.nav.bookNow}</a>
              
              {/* Language Switcher */}
              <button 
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className={`font-bold hover:text-gold transition-colors px-3 py-1 border rounded ${scrolled ? 'text-navy border-gray-200' : 'text-white border-white/50'}`}
              >
                {language === "ar" ? "English" : "العربية"}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className={`font-bold text-sm border px-2 py-1 rounded ${scrolled ? 'text-navy border-gray-200' : 'text-white border-white/50'}`}
              >
                {language === "ar" ? "EN" : "عربي"}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={scrolled ? 'text-navy' : 'text-white'}>
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-b border-gray-100 px-6 py-6 space-y-5 shadow-xl absolute w-full top-full"
            >
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-lg text-gray-800 hover:text-gold">{t.nav.services}</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-lg text-gray-800 hover:text-gold">{t.nav.testimonials}</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-lg text-gray-800 hover:text-gold">{t.nav.faq}</a>
              <a href="#book" onClick={() => setMobileMenuOpen(false)} className="block text-gold font-bold text-lg">{t.nav.bookNow}</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Home Care" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent mix-blend-multiply" />
        </div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="md:w-3/5 rtl:md:w-3/5">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
              {t.hero.title1} <span className="text-gold italic">{t.hero.title2}</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl font-light">
              {t.hero.subtitle}
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5">
              <a href="#book" className="btn-gold text-center text-lg px-8 py-4 shadow-xl hover:scale-105 transition-transform">{t.hero.bookBtn}</a>
              {settings?.whatsappLink && (
                <a href={settings.whatsappLink} target="_blank" rel="noreferrer" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded font-medium hover:bg-white hover:text-navy text-center transition-all">
                  {t.hero.whatsappBtn}
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white border-b border-gray-100 py-8 relative z-20 -mt-10 mx-4 md:mx-auto max-w-5xl rounded-xl shadow-xl">
        <div className="flex flex-col md:flex-row justify-around items-center gap-6 px-6">
          <div className="flex items-center gap-3 text-navy font-medium">
            <Shield className="w-8 h-8 text-gold" />
            <span>Certified & Vetted Professionals</span>
          </div>
          <div className="hidden md:block w-px h-10 bg-gray-200"></div>
          <div className="flex items-center gap-3 text-navy font-medium">
            <CheckCircle2 className="w-8 h-8 text-gold" />
            <span>24/7 Availability in Greater Cairo</span>
          </div>
          <div className="hidden md:block w-px h-10 bg-gray-200"></div>
          <div className="flex items-center gap-3 text-navy font-medium">
            <Heart className="w-8 h-8 text-gold" />
            <span>Absolute Discretion & Privacy</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-navy mb-4">{t.services.title}</h2>
            <div className="w-24 h-1.5 bg-gold mx-auto rounded-full" />
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {services.map((service: any, index: number) => {
              const title = language === "ar" ? service.titleAr || service.titleEn : service.titleEn;
              const description = language === "ar" ? service.descriptionAr || service.descriptionEn : service.descriptionEn;
              const features = language === "ar" ? service.featuresAr || service.featuresEn || [] : service.featuresEn || [];
              const defaultImages = [
                "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              ];
              const imageUrl = service.imageUrl || defaultImages[index % 3];

              return (
                <motion.div key={service.id} variants={fadeIn} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                    <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-playfair font-bold text-white">{title}</h3>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{description}</p>
                    
                    {features && features.length > 0 && (
                      <ul className="space-y-3 mb-8 border-t border-gray-100 pt-6">
                        {features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-gold mr-3 rtl:ml-3 rtl:mr-0 shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <a href="#book" className="mt-auto block w-full text-center py-3 border-2 border-navy text-navy font-bold rounded hover:bg-navy hover:text-white transition-colors">
                      Book Service
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Bookings & Testimonials Section */}
      <section id="book" className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-navy/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="lg:w-1/2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy mb-4">{t.booking.title}</h2>
              <p className="text-gray-500 mb-8">{t.booking.subtitle}</p>
              <BookingForm services={services} whatsappLink={settings?.whatsappLink || ""} />
            </motion.div>
            
            <motion.div 
              id="testimonials" 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-navy mb-4">{t.testimonials.title}</h2>
              <div className="w-16 h-1 bg-gold mb-10" />
              
              <div className="space-y-6">
                {testimonials.map((testimonial: any) => {
                  const feedback = language === "ar" ? testimonial.feedbackAr || testimonial.feedbackEn : testimonial.feedbackEn;
                  const area = language === "ar" ? testimonial.areaAr || testimonial.areaEn : testimonial.areaEn;
                  return (
                    <motion.div key={testimonial.id} variants={fadeIn} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative">
                      <div className="absolute top-0 right-8 -mt-4 bg-gold text-white px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center">
                        <Star className="w-4 h-4 fill-current mr-1" /> {testimonial.rating}.0
                      </div>
                      <p className="text-gray-700 italic mb-6 text-lg">"{feedback}"</p>
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-navy font-playfair text-xl">{testimonial.clientName}</span>
                        <span className="text-gray-400 text-sm bg-gray-200/50 px-3 py-1 rounded-full">{area}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-navy mb-4">{t.faq.title}</h2>
            <div className="w-24 h-1.5 bg-gold mx-auto rounded-full" />
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            {faqs.map((faq: any) => {
              const question = language === "ar" ? faq.questionAr || faq.questionEn : faq.questionEn;
              const answer = language === "ar" ? faq.answerAr || faq.answerEn : faq.answerEn;
              return (
                <motion.details key={faq.id} variants={fadeIn} className="group bg-white rounded-xl border border-gray-100 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-navy text-lg">
                    <span>{question}</span>
                    <span className="transition group-open:rotate-180 text-gold bg-gold/10 p-2 rounded-full">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                    {answer}
                  </div>
                </motion.details>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-16 border-t-[6px] border-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-playfair font-bold text-gold mb-6">OmniCare</h3>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">{t.footer.desc}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">{t.footer.contact}</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              {settings?.primaryPhone && (
                <li className="flex items-center"><Phone className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-gold" /> {settings.primaryPhone}</li>
              )}
              {settings?.supportEmail && (
                <li className="flex items-center"><Mail className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-gold" /> {settings.supportEmail}</li>
              )}
              {settings && (settings.officeAddressEn || settings.officeAddressAr) && (
                <li className="flex items-start"><MapPin className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 text-gold shrink-0 mt-1" /> <span>{language === "ar" ? settings.officeAddressAr || settings.officeAddressEn : settings.officeAddressEn}</span></li>
              )}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {t.footer.rights}
        </div>
      </footer>

      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {settings?.facebookLink && (
          <a 
            href={settings.facebookLink} 
            target="_blank" 
            rel="noreferrer"
            className="bg-[#1877F2] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
        )}
        
        {settings?.whatsappLink && (
          <a 
            href={settings.whatsappLink} 
            target="_blank" 
            rel="noreferrer"
            className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
            <Phone className="w-8 h-8 relative z-10" />
          </a>
        )}
      </div>
    </div>
  );
}
