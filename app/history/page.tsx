import { AppSidebar } from "@/components/app-sidebar"
import { ChatHistory } from "@/components/chat-history"

export default function HistoryPage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Chat History</h1>
          <ChatHistory />
        </div>
      </main>
    </div>
  )
}

