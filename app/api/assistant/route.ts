import { type NextRequest, NextResponse } from "next/server"

// Mock assistant responses
const assistantResponses = [
  "I can help you connect with faculty members or alumni based on your interests.",
  "Would you like me to provide information about academic programs or career opportunities?",
  "I can assist with scheduling meetings with professors or alumni mentors.",
  "Let me know if you need help with research opportunities or internship placements.",
  "I'm here to help bridge the gap between students, faculty, and alumni. What can I help you with today?",
  "I can provide resources related to your field of study or career path.",
  "Would you like me to share success stories from alumni in your field?",
]

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    // Simple validation
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get a random response
    const randomResponse = assistantResponses[Math.floor(Math.random() * assistantResponses.length)]

    // In a real app, you would use NLP or a more sophisticated response system
    return NextResponse.json(
      {
        message: randomResponse,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Assistant error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
