"use client"

import Link from "next/link"
import { School } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center space-x-2">
          <School className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">EduVerse</span>
        </Link>
      </header>
      <main className="flex-1">
        <div className="container flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome to EduVerse
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              A next-generation Learning Management System with AI features for
              teachers and students.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/teacher/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Teacher Login
            </Link>
            <Link
              href="/student/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Student Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 