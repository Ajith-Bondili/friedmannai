import { AppSidebar } from "@/components/app-sidebar"
import { ConnectForm } from "@/components/connect-form"

export default function ConnectPage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Connect with a Professional</h1>
          <ConnectForm />
        </div>
      </main>
    </div>
  )
}

