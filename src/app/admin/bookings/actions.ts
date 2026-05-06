"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function updateBookingStatus(id: string, status: string) {
  await prisma.booking.update({
    where: { id },
    data: { status },
  })
  revalidatePath("/admin/bookings")
}

export async function deleteBooking(id: string) {
  await prisma.booking.delete({
    where: { id },
  })
  revalidatePath("/admin/bookings")
}
