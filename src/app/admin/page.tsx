import { PrismaClient } from "@prisma/client"
import { CalendarCheck, MessageSquare, HelpCircle, Briefcase, Database } from "lucide-react"
import { seedDatabase } from "./actions"

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  const [bookingsCount, testimonialsCount, faqsCount, servicesCount] = await Promise.all([
    prisma.booking.count(),
    prisma.testimonial.count(),
    prisma.fAQ.count(),
    prisma.service.count()
  ])

  const stats = [
    { name: "Total Bookings", value: bookingsCount, icon: CalendarCheck, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Active Services", value: servicesCount, icon: Briefcase, color: "text-gold", bg: "bg-gold-light" },
    { name: "Testimonials", value: testimonialsCount, icon: MessageSquare, color: "text-green-600", bg: "bg-green-100" },
    { name: "FAQs", value: faqsCount, icon: HelpCircle, color: "text-purple-600", bg: "bg-purple-100" },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-navy font-bold">Dashboard Overview</h1>
        
        {/* Development Seed Button */}
        <form action={seedDatabase}>
          <button type="submit" className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded hover:bg-navy-light transition-colors">
            <Database className="w-4 h-4" />
            Restore Demo Data
          </button>
        </form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className={`p-4 rounded-xl mr-4 ${stat.bg}`}>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <div>
               <p className="text-sm font-medium text-gray-500">{stat.name}</p>
               <p className="text-3xl font-bold text-navy">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
