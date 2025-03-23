"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Calendar,
  LayoutDashboard,
  MessageSquare,
  PenTool,
  School,
  Settings,
  Users,
  Brain,
  ClipboardList
} from "lucide-react"

const teacherNavItems = [
  {
    title: "Dashboard",
    href: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/teacher/courses",
    icon: BookOpen,
  },
  {
    title: "Tests",
    href: "/teacher/tests",
    icon: ClipboardList,
  },
  {
    title: "Calendar",
    href: "/teacher/calendar",
    icon: Calendar,
  },
  {
    title: "Collaborative Drawing",
    href: "/teacher/drawing",
    icon: PenTool,
  },
  {
    title: "Progress Checking",
    href: "/teacher/progress",
    icon: Users,
  },
  {
    title: "Chat/Comment Area",
    href: "/teacher/chat",
    icon: MessageSquare,
  },
  {
    title: "Announcements",
    href: "/teacher/announcements",
    icon: School,
  },
]

export function TeacherSidebar() {
  const pathname = usePathname()
  
  // Default to dashboard if on the root teacher page
  const isRootTeacherPath = pathname === "/teacher" || pathname === "/teacher/"
  
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center space-x-2">
          <School className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">EduVerse</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {teacherNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
            (isRootTeacherPath && item.title === "Dashboard")
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-4">
        <Link
          href="/teacher/settings"
          className={cn(
            "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/teacher/settings"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  )
} 