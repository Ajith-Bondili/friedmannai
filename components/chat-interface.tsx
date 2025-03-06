"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, Paperclip, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PrePopulatedQuestions } from "@/components/pre-populated-questions"
import { type ChatMessage, MessageType } from "@/types/chat"

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock data for initial messages
  const initialMessages: ChatMessage[] = [
    {
      id: "1",
      content: "What's a TFSA?",
      type: MessageType.USER,
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      content:
        "A TFSA, or Tax-Free Savings Account, is a type of savings account available to Canadian residents that allows them to grow their money tax-free.\nSource 1,2,3.",
      type: MessageType.AI,
      timestamp: new Date().toISOString(),
    },
    {
      id: "3",
      content: "How much do you have in your TFSA?",
      type: MessageType.AI_FOLLOWUP,
      timestamp: new Date().toISOString(),
    },
  ]

  useEffect(() => {
    // Initialize with mock data
    if (messages.length === 0) {
      setMessages(initialMessages)
    }
  }, [messages.length])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      type: MessageType.USER,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Focus on input after sending
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm analyzing your question about " +
          input +
          ". This is a simulated response that would normally contain financial information relevant to your query.",
        type: MessageType.AI,
        timestamp: new Date().toISOString(),
      }

      const aiFollowup: ChatMessage = {
        id: (Date.now() + 2).toString(),
        content: "Would you like to know more about this topic or explore related financial strategies?",
        type: MessageType.AI_FOLLOWUP,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiResponse, aiFollowup])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuestionSelect = (question: string) => {
    // Add selected question as user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: question,
      type: MessageType.USER,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "Here's information about " +
          question +
          ". This is a simulated response that would contain relevant financial details.",
        type: MessageType.AI,
        timestamp: new Date().toISOString(),
      }

      const aiFollowup: ChatMessage = {
        id: (Date.now() + 2).toString(),
        content: "Would you like me to explain any specific aspect of this in more detail?",
        type: MessageType.AI_FOLLOWUP,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiResponse, aiFollowup])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 sm:p-4 border-b">
        <h1 className="text-xl sm:text-2xl font-bold text-center">FriedmannAI</h1>
      </div>

      <PrePopulatedQuestions onSelectQuestion={handleQuestionSelect} />

      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === MessageType.USER ? "justify-end" : "justify-start"}`}
          >
            <div
              className={
                message.type === MessageType.USER
                  ? "chat-bubble-user"
                  : message.type === MessageType.AI
                    ? "chat-bubble-ai"
                    : "chat-bubble-ai-followup"
              }
            >
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 sm:p-4 border-t">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
          <div className="relative flex-1 min-w-0">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Friedmann anything"
              className="pr-24 py-4 sm:py-6 rounded-full"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

