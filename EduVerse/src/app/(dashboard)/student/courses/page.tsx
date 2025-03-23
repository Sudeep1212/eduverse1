"use client"

import { useState, useEffect } from "react"
import { Star, StarHalf } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Import the same mock courses to reuse them
const mockCourses = [
  {
    id: 1,
    title: "Introduction to Mathematics",
    description: "A comprehensive course covering fundamental mathematical concepts.",
    bgColor: "from-blue-50 to-blue-100",
    instructor: {
      name: "Dr. Alan Smith",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    rating: 4.8,
    reviewCount: 320,
    lessons: 16,
    materials: [] // Materials array will be populated from the teacher courses
  },
  {
    id: 2,
    title: "Advanced Physics",
    description: "Explore complex physics concepts with practical experiments and simulations.",
    bgColor: "from-purple-50 to-purple-100",
    instructor: {
      name: "Prof. Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    rating: 4.9,
    reviewCount: 245,
    lessons: 24,
    materials: []
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to create responsive and interactive websites.",
    bgColor: "from-green-50 to-green-100",
    instructor: {
      name: "Mark Wilson",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    rating: 4.7,
    reviewCount: 189,
    lessons: 18,
    materials: []
  },
  {
    id: 4,
    title: "Data Science Essentials",
    description: "Master the fundamentals of data analysis, visualization, and machine learning.",
    bgColor: "from-yellow-50 to-yellow-100",
    instructor: {
      name: "Dr. Emily Chen",
      image: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    rating: 4.9,
    reviewCount: 210,
    lessons: 21,
    materials: []
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    description: "Learn modern digital marketing techniques to grow your business and engage audiences.",
    bgColor: "from-pink-50 to-pink-100",
    instructor: {
      name: "James Rodriguez",
      image: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    rating: 4.6,
    reviewCount: 175,
    lessons: 15,
    materials: []
  },
  {
    id: 6,
    title: "Creative Writing Workshop",
    description: "Develop your storytelling skills and learn techniques from published authors.",
    bgColor: "from-indigo-50 to-indigo-100",
    instructor: {
      name: "Olivia Parker",
      image: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    rating: 4.8,
    reviewCount: 156,
    lessons: 12,
    materials: []
  },
  {
    id: 7,
    title: "Business Management Fundamentals",
    description: "Essential principles of business management, leadership, and organizational behavior.",
    bgColor: "from-red-50 to-red-100",
    instructor: {
      name: "Robert Chang",
      image: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    rating: 4.7,
    reviewCount: 198,
    lessons: 19,
    materials: []
  },
  {
    id: 8,
    title: "Introduction to Psychology",
    description: "Explore the human mind, behavior, and the fascinating science of psychology.",
    bgColor: "from-teal-50 to-teal-100",
    instructor: {
      name: "Dr. Lisa Morgan",
      image: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    rating: 4.9,
    reviewCount: 230,
    lessons: 22,
    materials: []
  }
]

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState(mockCourses)

  // Load courses from localStorage on component mount to get any courses added by teachers
  useEffect(() => {
    try {
      const storedCourses = localStorage.getItem('eduverse_courses')
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses))
      }
    } catch (error) {
      console.error("Error loading courses from localStorage:", error)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Courses</h2>
        <p className="text-muted-foreground">
          Browse and access your enrolled courses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Link key={course.id} href={`/student/courses/${course.id}`}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className={`h-32 bg-gradient-to-r ${course.bgColor} relative`}>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-[2px] shadow-sm">
                  <Image 
                    src={course.instructor.image} 
                    alt={course.instructor.name} 
                    width={40} 
                    height={40} 
                    className="rounded-full" 
                  />
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <Badge variant="outline" className="bg-primary/5 text-xs">
                    {course.lessons} dives
                  </Badge>
                  <div className="flex items-center text-amber-500 text-xs">
                    <div className="flex mr-1">
                      {Array(Math.floor(course.rating)).fill(0).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                      {course.rating % 1 !== 0 && (
                        <StarHalf className="h-3 w-3 fill-current" />
                      )}
                    </div>
                    <span className="text-muted-foreground">({course.reviewCount})</span>
                  </div>
                </div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  Instructor: {course.instructor.name}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 