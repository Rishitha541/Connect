"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, LogOut } from "lucide-react"
import { useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import Logo from "@/components/logo"

export default function HomePage() {
  const router = useRouter()
  const { logout, user } = useAuth()

  useEffect(() => {
    // Log navigation success
    console.log("Home page loaded successfully")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-200 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center p-4">
        <div className="bg-white rounded-full p-2 shadow-md">
          <Logo size="small" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="bg-white rounded-full p-2 shadow-md" onClick={logout}>
            <LogOut className="h-5 w-5 text-gray-700" />
          </Button>
          <div className="bg-white rounded-full p-2 shadow-md">
            <Bell className="h-5 w-5 text-red-500" />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-2 mb-6">
        <p className="text-sm font-medium text-blue-800">
          Logged in as: <span className="font-bold">{user?.type.toUpperCase()}</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <div className="bg-white rounded-2xl p-6 shadow-lg w-full mb-8">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">Let's Connect</h1>
            <p className="text-gray-500 text-sm">With</p>
          </div>

          <div className="flex justify-end mb-4">
            <div className="bg-white rounded-full p-2 shadow-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => router.push("/chat/alumni")}
              className="w-full bg-blue-500 hover:bg-blue-600 rounded-full py-2"
            >
              Alumni's
            </Button>

            <Button
              onClick={() => router.push("/chat/faculty")}
              className="w-full bg-blue-500 hover:bg-blue-600 rounded-full py-2"
            >
              Faculty
            </Button>

            <Button
              onClick={() => router.push("/chat/intern")}
              className="w-full bg-blue-500 hover:bg-blue-600 rounded-full py-2"
            >
              Intern's
            </Button>

            <Button
              onClick={() => router.push("/chat/student")}
              className="w-full bg-green-500 hover:bg-green-600 rounded-full py-2"
            >
              Student
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
