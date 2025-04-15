"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, ChevronLeft, LogOut, Send, Trash2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Logo from "@/components/logo"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function AssistantPage() {
  const router = useRouter()
  const { logout } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages from localStorage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("assistant-messages")

    if (storedMessages) {
      try {
        // Parse stored messages and convert string timestamps back to Date objects
        const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(parsedMessages)
      } catch (error) {
        console.error("Error parsing stored messages:", error)
        // If there's an error parsing, initialize with default message
        initializeWithDefaultMessage()
      }
    } else {
      // If no stored messages, initialize with default message
      initializeWithDefaultMessage()
    }
  }, [])

  // Initialize with a default welcome message
  const initializeWithDefaultMessage = () => {
    const initialMessages: Message[] = [
      {
        id: "1",
        text: "I Can Also Assist You As Your Faculty or Alumni's",
        sender: "assistant",
        timestamp: new Date(),
      },
    ]
    setMessages(initialMessages)
  }

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("assistant-messages", JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate API call to get assistant response
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
        }),
      })

      if (response.ok) {
        const data = await response.json()

        // Add response message with a slight delay to simulate thinking
        setTimeout(() => {
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.message,
            sender: "assistant",
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, responseMessage])
        }, 1000)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  // Function to delete a message
  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-200 flex flex-col">
      {/* Header */}
      <div className="w-full flex justify-between items-center p-4">
        <div className="bg-purple-500 rounded-full p-2 shadow-md cursor-pointer" onClick={() => router.push("/home")}>
          <ChevronLeft className="h-5 w-5 text-white" />
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

      {/* Assistant Avatar */}
      <div className="flex justify-center my-8">
        <Logo size="large" />
      </div>

      {/* Assistant Text */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-xl font-bold">I Can Also Assist You As</h2>
        <p className="text-lg">Your Faculty, Alumni's, or Student</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.slice(1).map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-full px-4 py-2 max-w-[80%] break-words ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <p>{message.text}</p>
                    <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* Delete button - only shown for user messages */}
                  {message.sender === "user" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-2 text-blue-200 hover:text-white hover:bg-blue-700"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">Delete message</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Text Here"
            className="flex-1 rounded-full border-gray-300 bg-white shadow-md"
          />
          <Button type="submit" size="icon" className="rounded-full bg-white shadow-md h-10 w-10">
            <Send className="h-5 w-5 text-gray-700" />
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div className="p-4 flex justify-end">
        <div className="bg-white rounded-full p-3 shadow-md">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 22V12H15V22" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
