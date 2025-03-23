import { ThemeToggle } from "@/components/theme-toggle"
import { StudentSidebar } from "@/components/student-sidebar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <header className="flex h-16 items-center justify-between border-b px-4">
          <h1 className="text-lg font-semibold">Student Dashboard</h1>
          <ThemeToggle />
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
} 