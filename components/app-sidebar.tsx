"use client"

import { Search, User, History, Users, PlusCircle, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"

function SidebarToggleButton() {
  const { state, toggleSidebar } = useSidebar()

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={toggleSidebar}
      className={`fixed left-4 top-4 z-50 h-10 w-10 rounded-full shadow-md transition-opacity duration-200 ${
        state === "expanded" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <PlusCircle className="h-5 w-5 rotate-45" />
      <span className="sr-only">Open Sidebar</span>
    </Button>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  const isActive = (path: string) => pathname === path

  return (
    <>
      <SidebarToggleButton />
      <Sidebar>
        <SidebarHeader className="flex flex-col gap-4 px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/logo.png" alt="FriedmannAI" />
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold">Friedmann</h1>
            </div>
            <SidebarTrigger />
          </div>
          <Button asChild variant="outline" className="justify-start gap-2 w-full">
            <Link href="/chat/new">
              <PlusCircle className="h-4 w-4" />
              New Chat
            </Link>
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <SidebarInput type="search" placeholder="Search clients" className="pl-8" />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/profile")}>
                    <Link href="/profile">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/history")}>
                    <Link href="/history">
                      <History className="h-4 w-4" />
                      <span>History</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/connect")}>
                    <Link href="/connect">
                      <Users className="h-4 w-4" />
                      <span>Connect</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/clients")}>
                    <Link href="/clients">
                      <Users className="h-4 w-4" />
                      <span>Clients</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">Sr Champ</p>
              </div>
            </div>
            <div className="flex gap-1">
              <ModeToggle />
              <Button variant="ghost" size="icon" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}

