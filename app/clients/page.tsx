import { AppSidebar } from "@/components/app-sidebar"
import { ClientsList } from "@/components/clients-list"

export default function ClientsPage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Clients</h1>
          <ClientsList />
        </div>
      </main>
    </div>
  )
}

