import { AppSidebar } from "@/components/app-sidebar"
import { PricingPlans } from "@/components/pricing-plans"

export default function PricingPage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Subscription Plans</h1>
          <p className="text-muted-foreground text-center mb-8">Choose the plan that's right for you</p>
          <PricingPlans />
        </div>
      </main>
    </div>
  )
}

