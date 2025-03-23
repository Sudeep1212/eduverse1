"use client"

import { useState, useEffect } from "react"
import { Plus, Star, StarHalf, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

// Mock data for demonstration
const mockCourses = [
  {
    id: 1,
    title: "Introduction to Mathematics",
    description: "A comprehensive course covering fundamental mathematical concepts for beginners.",
    bgColor: "from-orange-100 to-pink-200",
    instructor: {
      name: "Dr. Robert Chen",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    rating: 4.7,
    reviewCount: 2843,
    lessons: 16
  },
  {
    id: 2,
    title: "Advanced Physics",
    description: "Explore complex physics concepts with practical experiments and theoretical foundations.",
    bgColor: "from-blue-100 to-purple-200",
    instructor: {
      name: "Dr. Emma Williams",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    rating: 4.8,
    reviewCount: 3566,
    lessons: 24
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to create responsive and interactive websites.",
    bgColor: "from-green-100 to-teal-200",
    instructor: {
      name: "Jason Miller",
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    rating: 4.6,
    reviewCount: 1287,
    lessons: 18
  },
  {
    id: 4,
    title: "Data Science Essentials",
    description: "Master the fundamentals of data analysis, visualization, and machine learning.",
    bgColor: "from-indigo-100 to-blue-200",
    instructor: {
      name: "Sarah Johnson",
      image: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    rating: 4.9,
    reviewCount: 958,
    lessons: 21
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    description: "Learn modern digital marketing techniques to grow your business and engage audiences.",
    bgColor: "from-red-100 to-rose-200",
    instructor: {
      name: "Mark Thompson",
      image: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    rating: 4.5,
    reviewCount: 1742,
    lessons: 15
  },
  {
    id: 6,
    title: "Creative Writing Workshop",
    description: "Develop your storytelling skills and learn techniques from published authors.",
    bgColor: "from-yellow-100 to-amber-200",
    instructor: {
      name: "Olivia Parker",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    rating: 4.7,
    reviewCount: 892,
    lessons: 12
  },
  {
    id: 7,
    title: "Business Management Fundamentals",
    description: "Essential principles of business management, leadership, and organizational behavior.",
    bgColor: "from-cyan-100 to-sky-200",
    instructor: {
      name: "David Wilson",
      image: "https://randomuser.me/api/portraits/men/64.jpg"
    },
    rating: 4.4,
    reviewCount: 1105,
    lessons: 19
  },
  {
    id: 8,
    title: "Introduction to Psychology",
    description: "Explore the human mind, behavior, and the fascinating science of psychology.",
    bgColor: "from-purple-100 to-violet-200",
    instructor: {
      name: "Dr. Maria Rodriguez",
      image: "https://randomuser.me/api/portraits/women/57.jpg"
    },
    rating: 4.9,
    reviewCount: 2105,
    lessons: 22
  }
]

// Helper function to render star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-3.5 w-3.5 text-gray-300" />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
    </div>
  )
}

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState(mockCourses)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({ title: "", description: "" })

  // Load courses from localStorage on component mount
  useEffect(() => {
    try {
      const storedCourses = localStorage.getItem('eduverse_courses')
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses))
      } else {
        // Initialize localStorage with mock courses if not already set
        localStorage.setItem('eduverse_courses', JSON.stringify(mockCourses))
      }
    } catch (error) {
      console.error("Error loading courses from localStorage:", error)
    }
  }, [])

  // Save courses to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('eduverse_courses', JSON.stringify(courses))
    } catch (error) {
      console.error("Error saving courses to localStorage:", error)
    }
  }, [courses])

  const handleCreateCourse = () => {
    const newCourseData = {
      id: courses.length + 1,
      title: newCourse.title,
      description: newCourse.description,
      bgColor: "from-gray-100 to-gray-200",
      instructor: {
        name: "Your Name",
        image: "https://randomuser.me/api/portraits/lego/1.jpg"
      },
      rating: 0,
      reviewCount: 0,
      lessons: 0,
      materials: []
    }
    
    const updatedCourses = [...courses, newCourseData]
    setCourses(updatedCourses)
    
    // Save to localStorage immediately
    try {
      localStorage.setItem('eduverse_courses', JSON.stringify(updatedCourses))
    } catch (error) {
      console.error("Error saving courses to localStorage:", error)
    }
    
    setNewCourse({ title: "", description: "" })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteCourse = (e: React.MouseEvent, courseId: number) => {
    e.preventDefault()
    e.stopPropagation()
    setCourses(courses.filter(course => course.id !== courseId))
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">
            Manage your courses and add educational content for students.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Add the details for your new course here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input 
                  id="course-title" 
                  value={newCourse.title} 
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  placeholder="Introduction to..." 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-description">Description</Label>
                <Textarea 
                  id="course-description" 
                  value={newCourse.description} 
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  placeholder="This course covers..." 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateCourse}>Save Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Course Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <Link key={course.id} href={`/teacher/courses/${course.id}`} className="group">
            <Card className="overflow-hidden h-full border border-gray-300 dark:border-gray-700 shadow-sm transition-shadow hover:shadow-md bg-gradient-to-br p-0.5 transition-all ease-in-out duration-200 relative">
              <div className={`absolute inset-0.5 rounded-[inherit] bg-gradient-to-br ${course.bgColor} -z-10`}></div>
              <div className="rounded-[inherit] bg-white dark:bg-slate-950 overflow-hidden h-full">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-9 w-9 overflow-hidden rounded-full border">
                      <Image 
                        src={course.instructor.image} 
                        alt={course.instructor.name}
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold line-clamp-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {course.instructor.name}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 h-8">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center mb-1">
                    <StarRating rating={course.rating} />
                    <span className="text-xs text-muted-foreground ml-1">({formatNumber(course.reviewCount)})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-medium">{course.lessons} dives</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDeleteCourse(e, course.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 