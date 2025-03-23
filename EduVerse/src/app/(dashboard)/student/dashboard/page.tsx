"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, PenTool, Trophy, Target } from "lucide-react"

const stats = [
  {
    title: "Enrolled Courses",
    value: "5",
    icon: BookOpen,
    description: "Active courses this semester",
  },
  {
    title: "Upcoming Tests",
    value: "3",
    icon: PenTool,
    description: "Next 7 days",
  },
  {
    title: "Achievement Points",
    value: "850",
    icon: Trophy,
    description: "Total points earned",
  },
  {
    title: "Learning Goals",
    value: "4/5",
    icon: Target,
    description: "Goals completed this month",
  },
]

const recentActivity = [
  {
    title: "Completed Math Quiz",
    description: "Scored 95% on Algebra Basics",
    time: "2 hours ago",
  },
  {
    title: "Started New Course",
    description: "Enrolled in Physics 101",
    time: "1 day ago",
  },
  {
    title: "Earned Badge",
    description: "Perfect Attendance Week",
    time: "2 days ago",
  },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here's your learning progress and upcoming activities.
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.title}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[200px]">
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 