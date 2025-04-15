import { type NextRequest, NextResponse } from "next/server"

// Mock database of predefined responses
const responses = {
  alumni: [
    "As an alumni, I can help you with career advice and networking opportunities.",
    "Many of our alumni have gone on to work at top companies in the industry.",
    "Would you like me to connect you with alumni in a specific field?",
    "Our alumni network hosts regular events that you might be interested in.",
    "I can share some success stories from our alumni if you're interested.",
  ],
  faculty: [
    "Our faculty members are experts in their respective fields.",
    "Would you like to schedule a meeting with a specific professor?",
    "I can help you find faculty research that aligns with your interests.",
    "Our faculty regularly publishes in top academic journals.",
    "Faculty office hours are posted on the department website.",
  ],
  intern: [
    "We have internship opportunities available in various departments.",
    "Many of our interns go on to receive full-time job offers.",
    "Would you like information about our summer internship program?",
    "Internships typically last 3-6 months depending on the department.",
    "We provide mentorship and training for all our interns.",
  ],
  student: [
    "Welcome to our student portal! How can I assist you with your studies today?",
    "Would you like information about upcoming student events or activities?",
    "I can help you connect with tutors or study groups in your field.",
    "Our student resources include online libraries, research databases, and academic support services.",
    "Do you need help with course registration or academic planning?",
    "We offer various student clubs and organizations you might be interested in joining.",
  ],
}

export async function POST(request: NextRequest) {
  try {
    const { message, userType } = await request.json()

    // Simple validation
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get a random response based on user type
    const typeResponses = responses[userType as keyof typeof responses] || []
    const randomResponse =
      typeResponses[Math.floor(Math.random() * typeResponses.length)] ||
      "I'm not sure how to respond to that. Can you try asking something else?"

    // In a real app, you would use NLP or a more sophisticated response system
    return NextResponse.json(
      {
        message: randomResponse,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
