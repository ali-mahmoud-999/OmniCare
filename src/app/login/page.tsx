"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ShieldAlert } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })

    if (res?.error) {
      setError("Invalid credentials. Please try again.")
      setLoading(false)
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-navy transform -skew-y-6 -translate-y-1/2 z-0" />
      
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl z-10 relative">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-navy">
            OmniCare Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the control panel
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center text-sm">
              <ShieldAlert className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px space-y-4">
            <div>
              <label className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold focus:border-gold focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold focus:border-gold focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-navy bg-gold hover:bg-[#C5A028] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
