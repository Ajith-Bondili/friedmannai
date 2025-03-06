"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const connectFormSchema = z.object({
  location: z.string({
    required_error: "Please select a location.",
  }),
  serviceType: z.string({
    required_error: "Please select a service type.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
  specialization: z.string().optional(),
})

type ConnectFormValues = z.infer<typeof connectFormSchema>

// Mock data for professionals
const professionals = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Financial Advisor",
    specialty: "Retirement Planning",
    languages: ["English", "French"],
    location: "Toronto",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Tax Accountant",
    specialty: "Small Business Taxation",
    languages: ["English", "Mandarin"],
    location: "Vancouver",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviews: 93,
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "Estate Lawyer",
    specialty: "Estate Planning",
    languages: ["English", "Hindi"],
    location: "Calgary",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviews: 85,
  },
]

export function ConnectForm() {
  const [filteredProfessionals, setFilteredProfessionals] = useState(professionals)

  const form = useForm<ConnectFormValues>({
    resolver: zodResolver(connectFormSchema),
    defaultValues: {
      location: "",
      serviceType: "",
      language: "",
      specialization: "",
    },
  })

  function onSubmit(data: ConnectFormValues) {
    console.log(data)
    // In a real app, this would filter professionals based on criteria
    // For now, we'll just use the mock data
    setFilteredProfessionals(professionals)
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>📍 Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="toronto">Toronto</SelectItem>
                      <SelectItem value="vancouver">Vancouver</SelectItem>
                      <SelectItem value="montreal">Montreal</SelectItem>
                      <SelectItem value="calgary">Calgary</SelectItem>
                      <SelectItem value="ottawa">Ottawa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>💼 Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="financial_advisor">Financial Advisor</SelectItem>
                      <SelectItem value="accountant">Accountant</SelectItem>
                      <SelectItem value="lawyer">Lawyer</SelectItem>
                      <SelectItem value="insurance_agent">Insurance Agent</SelectItem>
                      <SelectItem value="mortgage_broker">Mortgage Broker</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>🌍 Preferred Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="mandarin">Mandarin</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Retirement Planning" {...field} />
                  </FormControl>
                  <FormDescription>Enter a specific area of expertise you're looking for</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Find Professionals
          </Button>
        </form>
      </Form>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Recommended Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={professional.image} alt={professional.name} />
                    <AvatarFallback>
                      {professional.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge variant="outline" className="bg-primary/10">
                    ⭐ {professional.rating} ({professional.reviews})
                  </Badge>
                </div>
                <CardTitle className="mt-2">{professional.name}</CardTitle>
                <CardDescription>{professional.title}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{professional.specialty}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Languages:</span> {professional.languages.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Location:</span> {professional.location}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Contact</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

