"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import Logo from "@/components/logo"

export default function LoginPage() {
  const router = useRouter()
  const { login, user } = useAuth()
  const [userType, setUserType] = useState<string>("student")
  const [userId, setUserId] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/home")
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // For demo purposes, allow any login
      const success = await login(userId || "demo-user", password || "demo-password", userType)
      if (success) {
        router.push("/home")
      } else {
        setError("Invalid credentials. Please try again.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred during login. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-200 flex justify-center items-center">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-lg">
        <div className="flex justify-center mb-6">
          <Logo size="medium" />
        </div>

        <h2 className="text-xl font-semibold mb-4">SignIn AS</h2>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={userType === "alumni" ? "default" : "outline"}
            className={`rounded-full ${userType === "alumni" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
            onClick={() => setUserType("alumni")}
          >
            Alumni's
          </Button>

          <Button
            variant={userType === "faculty" ? "default" : "outline"}
            className={`rounded-full ${userType === "faculty" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
            onClick={() => setUserType("faculty")}
          >
            Faculty
          </Button>

          <Button
            variant={userType === "intern" ? "default" : "outline"}
            className={`rounded-full ${userType === "intern" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
            onClick={() => setUserType("intern")}
          >
            Interns
          </Button>

          <Button
            variant={userType === "student" ? "default" : "outline"}
            className={`rounded-full ${userType === "student" ? "bg-green-500 hover:bg-green-600" : "bg-white"}`}
            onClick={() => setUserType("student")}
          >
            Student
          </Button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="shadow-md rounded-xl">
            <Input
              type="text"
              placeholder="Enter your UserId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="rounded-xl border-gray-200 h-12"
            />
          </div>

          <div className="shadow-md rounded-xl">
            <Input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-gray-200 h-12"
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 rounded-full px-8 py-2 text-white font-medium"
            >
              Let's Connect
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
