import { AdminSidebar } from "@/components/AdminSidebar"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
