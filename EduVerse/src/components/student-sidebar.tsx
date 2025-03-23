"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  LayoutDashboard,
  MessageSquare,
  PenTool,
  School,
  Settings,
  Users,
  FileText,
  Clock,
  Bell,
} from "lucide-react";

const studentNavItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Courses",
    href: "/student/courses",
    icon: BookOpen,
  },
  {
    title: "Tests",
    href: "/student/tests",
    icon: PenTool,
  },
  {
    title: "Leaderboard",
    href: "/student/leaderboard",
    icon: Users,
  },
  {
    title: "Magic Learn",
    href: "http://localhost:8501/", // External Python site
    icon: School,
    external: true, // Mark as an external link
  },
  {
    title: "Announcements",
    href: "/student/announcements",
    icon: Bell,
  },
  {
    title: "Chat/Comment Area",
    href: "/student/chat",
    icon: MessageSquare,
  },
];

export function StudentSidebar() {
  const pathname = usePathname();

  const isRootStudentPath = pathname === "/student" || pathname === "/student/";

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center space-x-2">
          <School className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">EduVerse</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {studentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (isRootStudentPath && item.title === "Dashboard");

          return item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <Link
          href="/student/settings"
          className={cn(
            "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/student/settings"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}
