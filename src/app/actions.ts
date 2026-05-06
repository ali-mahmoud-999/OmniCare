"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function submitBooking(formData: FormData) {
  const clientName = formData.get("clientName") as string
  const phoneNumber = formData.get("phoneNumber") as string
  const selectedService = formData.get("selectedService") as string
  const targetDistrict = formData.get("targetDistrict") as string
  const specialRequests = formData.get("specialRequests") as string

  const booking = await prisma.booking.create({
    data: {
      clientName,
      phoneNumber,
      selectedService,
      targetDistrict,
      specialRequests,
      status: "New"
    }
  })

  revalidatePath("/admin/bookings")
  return { success: true, bookingId: booking.id }
}
