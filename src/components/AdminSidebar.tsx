"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase, 
  MessageSquare, 
  HelpCircle,
  LogOut,
  CalendarCheck
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-navy text-white shadow-xl">
      <div className="flex items-center justify-center h-20 border-b border-white/10">
        <h1 className="text-2xl font-serif text-gold font-bold">OmniCare Admin</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? "bg-gold text-navy" 
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-navy" : "text-gray-400"}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          Logout
        </button>
      </div>
    </div>
  )
}
