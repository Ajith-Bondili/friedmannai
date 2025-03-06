import { AppSidebar } from "@/components/app-sidebar"
import { ProfileForm } from "@/components/profile-form"

export default function ProfilePage() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>
          <ProfileForm />
        </div>
      </main>
    </div>
  )
}

