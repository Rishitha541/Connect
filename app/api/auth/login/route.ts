import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to a database
const users = [
  { id: "admin", password: "password", type: "admin" },
  { id: "faculty1", password: "faculty123", type: "faculty" },
  { id: "alumni1", password: "alumni123", type: "alumni" },
  { id: "student1", password: "student123", type: "student" },
  { id: "intern1", password: "intern123", type: "intern" },
]

export async function POST(request: NextRequest) {
  try {
    const { userId, password, userType } = await request.json()

    // Simple validation
    if (!userId || !password) {
      return NextResponse.json({ error: "User ID and password are required" }, { status: 400 })
    }

    // For demo purposes, allow any login
    return NextResponse.json(
      {
        success: true,
        user: {
          id: userId,
          type: userType,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
