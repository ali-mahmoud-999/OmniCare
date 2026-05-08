export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client"
import { BookingsTable } from "./BookingsTable"

const prisma = new PrismaClient()

export default async function BookingsPage() {
  let bookings: any[] = [];
  try {
    bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Database connection failed on bookings page:", error);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-navy font-bold">Lead Management Desk</h1>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <BookingsTable initialBookings={bookings} />
      </div>
    </div>
  )
}
