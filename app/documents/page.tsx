import { AppSidebar } from "@/components/app-sidebar"
import { DocumentUpload } from "@/components/document-upload"

export default function DocumentsPage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Document Upload</h1>
          <DocumentUpload />
        </div>
      </main>
    </div>
  )
}

