"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Bookmark, Check, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PrePopulatedQuestionsProps {
  onSelectQuestion: (question: string) => void
}

export function PrePopulatedQuestions({ onSelectQuestion }: PrePopulatedQuestionsProps) {
  const [savedQuestions, setSavedQuestions] = useState<string[]>([])

  const questions = [
    { icon: "💡", text: "Want to know how to maximize your TFSA?" },
    { icon: "🔍", text: "Would you like a summary of 2025 RRSP rules?" },
    { icon: "📊", text: "Do you want to see strategies to pay down debt?" },
    { icon: "💰", text: "How can I start investing with a small budget?" },
    { icon: "🏠", text: "What are the current mortgage rates in Canada?" },
    { icon: "📈", text: "How do I calculate my retirement needs?" },
  ]

  const handleSaveQuestion = (question: string) => {
    if (savedQuestions.includes(question)) {
      setSavedQuestions(savedQuestions.filter((q) => q !== question))
    } else {
      setSavedQuestions([...savedQuestions, question])
    }
  }

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("questions-container")
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative px-2 sm:px-4 py-2 sm:py-3 border-b">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scrollContainer("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div id="questions-container" className="questions-container">
          {questions.map((question, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="flex items-center gap-2 border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-secondary/50 transition-colors">
                <span>{question.icon}</span>
                <span className="text-xs sm:text-sm whitespace-nowrap">{question.text}</span>
                <div className="flex gap-1 ml-1 sm:ml-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 sm:h-6 sm:w-6"
                          onClick={() => onSelectQuestion(question.text)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 sm:h-6 sm:w-6"
                          onClick={() => handleSaveQuestion(question.text)}
                        >
                          <Bookmark
                            className="h-3 w-3"
                            fill={savedQuestions.includes(question.text) ? "currentColor" : "none"}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{savedQuestions.includes(question.text) ? "Unsave" : "Save"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5 sm:h-6 sm:w-6">
                          <SkipForward className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Skip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scrollContainer("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

