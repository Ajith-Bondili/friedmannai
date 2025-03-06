"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for clients
const clients = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    lastContact: "2025-03-01T10:30:00Z",
    portfolioValue: "$245,000",
    tags: ["Retirement", "RRSP"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    lastContact: "2025-02-28T14:15:00Z",
    portfolioValue: "$178,500",
    tags: ["New Home", "TFSA"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 456-7890",
    status: "Inactive",
    lastContact: "2025-02-15T09:45:00Z",
    portfolioValue: "$92,300",
    tags: ["Education", "Debt"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    phone: "+1 (555) 789-0123",
    status: "Active",
    lastContact: "2025-02-25T16:20:00Z",
    portfolioValue: "$315,750",
    tags: ["Business", "Investment"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    lastContact: "2025-02-20T11:10:00Z",
    portfolioValue: "$127,800",
    tags: ["Retirement", "Tax Planning"],
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function ClientsList() {
  const [searchQuery, setSearchQuery] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <Tabs defaultValue="grid">
        <TabsList className="grid w-48 grid-cols-2">
          <TabsTrigger value="grid">Grid</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <Card key={client.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={client.image} alt={client.name} />
                        <AvatarFallback>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription>
                          <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Client</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Last Contact: {formatDate(client.lastContact)}</span>
                  </div>
                  <div className="text-sm font-medium">Portfolio Value: {client.portfolioValue}</div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Portfolio Value</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={client.image} alt={client.name} />
                            <AvatarFallback>
                              {client.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {client.name}
                        </div>
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(client.lastContact)}</TableCell>
                      <TableCell>{client.portfolioValue}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {client.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Client</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

