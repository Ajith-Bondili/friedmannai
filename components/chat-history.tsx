"use client"

import { useState } from "react"
import { Search, Calendar, Star, StarOff, MoreHorizontal, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock data for chat history
const chatHistory = [
  {
    id: "1",
    title: "TFSA Contribution Limits",
    preview: "What's the TFSA contribution limit for 2025?",
    date: "2025-03-01T10:30:00Z",
    starred: true,
    tags: ["TFSA", "Investments"],
  },
  {
    id: "2",
    title: "Mortgage Rates Comparison",
    preview: "Can you compare current mortgage rates from major banks?",
    date: "2025-02-28T14:15:00Z",
    starred: false,
    tags: ["Mortgage", "Housing"],
  },
  {
    id: "3",
    title: "Retirement Planning",
    preview: "How much should I save monthly for retirement?",
    date: "2025-02-25T09:45:00Z",
    starred: true,
    tags: ["Retirement", "Planning"],
  },
  {
    id: "4",
    title: "Tax Deductions for Freelancers",
    preview: "What tax deductions can I claim as a freelancer?",
    date: "2025-02-20T16:20:00Z",
    starred: false,
    tags: ["Taxes", "Freelance"],
  },
  {
    id: "5",
    title: "Investment Portfolio Review",
    preview: "Can you analyze my current investment portfolio?",
    date: "2025-02-15T11:10:00Z",
    starred: false,
    tags: ["Investments", "Portfolio"],
  },
]

// Mock data for saved questions
const savedQuestions = [
  {
    id: "s1",
    question: "Want to know how to maximize your TFSA?",
    date: "2025-03-02T08:30:00Z",
    tags: ["TFSA", "Optimization"],
  },
  {
    id: "s2",
    question: "Would you like a summary of 2025 RRSP rules?",
    date: "2025-02-27T13:45:00Z",
    tags: ["RRSP", "Rules"],
  },
  {
    id: "s3",
    question: "Do you want to see strategies to pay down debt?",
    date: "2025-02-22T10:15:00Z",
    tags: ["Debt", "Strategy"],
  },
]

export function ChatHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [starredChats, setStarredChats] = useState<string[]>(
    chatHistory.filter((chat) => chat.starred).map((chat) => chat.id),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const toggleStar = (chatId: string) => {
    if (starredChats.includes(chatId)) {
      setStarredChats(starredChats.filter((id) => id !== chatId))
    } else {
      setStarredChats([...starredChats, chatId])
    }
  }

  const filteredChats = chatHistory.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredQuestions = savedQuestions.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search chats and saved questions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="chats">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chats">Chat History</TabsTrigger>
          <TabsTrigger value="saved">Saved Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="chats" className="mt-4">
          <div className="space-y-4">
            {filteredChats.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No chats found</p>
            ) : (
              filteredChats.map((chat) => (
                <Card key={chat.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{chat.title}</CardTitle>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleStar(chat.id)}>
                          {starredChats.includes(chat.id) ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(chat.date)}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{chat.preview}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {chat.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-4">
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No saved questions found</p>
            ) : (
              filteredQuestions.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(item.date)}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

