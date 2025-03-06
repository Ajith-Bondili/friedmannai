"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PricingPlans() {
  const plans = [
    {
      name: "Light",
      color: "🟢",
      price: "Free",
      description: "Basic financial insights for personal use",
      features: [
        "Basic financial questions",
        "Limited chat history (7 days)",
        "Standard response time",
        "Public knowledge only",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Medium",
      color: "🔵",
      price: "$20",
      period: "/month",
      description: "Advanced insights for active financial planning",
      features: [
        "All Light features",
        "Unlimited chat history",
        "Priority response time",
        "Document analysis (up to 10/month)",
        "Personalized recommendations",
        "Connect with 1 professional",
      ],
      cta: "Upgrade Now",
      popular: true,
      trial: "7-day free trial",
    },
    {
      name: "High",
      color: "🔴",
      price: "$50",
      period: "/month",
      description: "Premium service for comprehensive financial management",
      features: [
        "All Medium features",
        "Advanced document analysis (unlimited)",
        "Custom financial models",
        "Connect with unlimited professionals",
        "Dedicated support",
        "API access",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
          {plan.popular && <Badge className="absolute -top-2 right-6">Most Popular</Badge>}
          <CardHeader>
            <div className="text-2xl mb-2">{plan.color}</div>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <div className="flex items-baseline mt-2">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
            </div>
            <CardDescription className="mt-2">{plan.description}</CardDescription>
            {plan.trial && (
              <Badge variant="outline" className="mt-2 w-fit">
                {plan.trial}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
              {plan.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

