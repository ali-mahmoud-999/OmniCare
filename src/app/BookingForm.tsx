"use client"

import { useState } from "react"
import { submitBooking } from "./actions"
import { useLanguage } from "@/components/LanguageProvider"
import { translations } from "@/lib/translations"

export function BookingForm({ services, whatsappLink }: { services: any[], whatsappLink: string }) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { language } = useLanguage()
  const t = translations[language].booking

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await submitBooking(formData)
      
      // Fire Meta Pixel Lead event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: formData.get('selectedService'),
          content_category: 'Service Booking',
          status: 'Submitted'
        });
      }

      setSubmitted(true)
      
      // Redirect to WhatsApp as fallback after 2 seconds
      if (whatsappLink) {
        setTimeout(() => {
          window.open(whatsappLink, "_blank")
        }, 2000)
      }
    } catch (error) {
      console.error(error)
      alert("Failed to submit booking. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center">
        <h3 className="text-2xl font-serif font-bold mb-2">{t.success}</h3>
        <p>{t.successDesc}</p>
        {whatsappLink && (
          <p className="mt-4 text-sm">
            {t.redirecting} <br/>
            <a href={whatsappLink} target="_blank" className="underline font-semibold mt-2 inline-block">{t.clickHere}</a>
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.fullName}</label>
          <input required name="clientName" type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
          <input required name="phoneNumber" type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all" dir="ltr" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.service}</label>
          <select required name="selectedService" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
            <option value="">{t.selectService}</option>
            {services.map(s => {
              const title = language === "ar" ? s.titleAr || s.titleEn : s.titleEn;
              return <option key={s.id} value={title}>{title}</option>
            })}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.district}</label>
          <input required name="targetDistrict" type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t.specialRequests}</label>
        <textarea name="specialRequests" rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all" />
      </div>

      <button disabled={loading} type="submit" className="w-full btn-gold !py-4 text-lg">
        {loading ? t.processing : t.submit}
      </button>
    </form>
  )
}
