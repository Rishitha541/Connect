"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  type: string
}

interface AuthContextType {
  user: User | null
  login: (userId: string, password: string, userType: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("connect-auth-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("connect-auth-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (userId: string, password: string, userType: string): Promise<boolean> => {
    try {
      // Always allow login in preview mode - no environment variable check needed
      const demoUser = {
        id: userId || "demo-user",
        type: userType,
      }
      setUser(demoUser)
      localStorage.setItem("connect-auth-user", JSON.stringify(demoUser))
      return true
    } catch (error) {
      console.error("Login error:", error)
      // Fallback for any errors
      const demoUser = {
        id: userId || "demo-user",
        type: userType,
      }
      setUser(demoUser)
      localStorage.setItem("connect-auth-user", JSON.stringify(demoUser))
      return true
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("connect-auth-user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
