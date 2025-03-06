import { AppSidebar } from "@/components/app-sidebar"
import { ChatInterface } from "@/components/chat-interface"

export default function NewChatPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <main className="flex-1 overflow-hidden w-full">
        <ChatInterface />
      </main>
    </div>
  )
}

