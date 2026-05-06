"use client"

import { useState } from "react"
import { Booking } from "@prisma/client"
import { updateBookingStatus, deleteBooking } from "./actions"
import { Trash2 } from "lucide-react"

export function BookingsTable({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings)

  const handleStatusChange = async (id: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b))
    await updateBookingStatus(id, newStatus)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter(b => b.id !== id))
      await deleteBooking(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "New": return "bg-blue-100 text-blue-800"
      case "In-Progress": return "bg-yellow-100 text-yellow-800"
      case "Contacted": return "bg-green-100 text-green-800"
      case "Cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (bookings.length === 0) {
    return <div className="p-8 text-center text-gray-500">No bookings found.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(booking.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{booking.clientName}</div>
                <div className="text-sm text-gray-500">{booking.phoneNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.selectedService}
                {booking.specialRequests && (
                  <div className="text-xs text-gray-500 mt-1 max-w-[200px] truncate" title={booking.specialRequests}>
                    {booking.specialRequests}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {booking.targetDistrict}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  className={`text-xs font-semibold rounded-full px-3 py-1 outline-none cursor-pointer border-r-8 border-transparent ${getStatusColor(booking.status)}`}
                >
                  <option value="New">New</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="text-red-600 hover:text-red-900 transition-colors"
                  title="Delete Booking"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
