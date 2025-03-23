"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, PenTool, MessageSquare } from "lucide-react"

const stats = [
  {
    title: "Total Students",
    value: "150",
    icon: Users,
    description: "Active students this month",
  },
  {
    title: "Courses",
    value: "12",
    icon: BookOpen,
    description: "Active courses",
  },
  {
    title: "Tests Scheduled",
    value: "5",
    icon: PenTool,
    description: "Upcoming tests",
  },
  {
    title: "New Messages",
    value: "8",
    icon: MessageSquare,
    description: "Unread messages",
  },
]

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here's what's happening with your courses today.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 