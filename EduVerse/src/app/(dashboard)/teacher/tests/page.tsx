"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash, Clock, BookOpen, Brain, Calendar, Lightbulb } from "lucide-react"
import { format } from "date-fns"
import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define a proper type for test
interface TestOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface TestQuestion {
  id: number;
  text: string;
  options: TestOption[];
  hint?: string;
}

interface Test {
  id: number;
  title: string;
  type: "practice" | "actual";
  subject: string;
  topic: string;
  description: string;
  duration: number;
  scheduledFor: Date;
  questionCount: number;
  hasHints: boolean;
  questions?: TestQuestion[];
}

// Mock data for tests
const mockTests: Test[] = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    type: "practice",
    subject: "Mathematics",
    topic: "Algebra",
    description: "Practice test covering basic algebraic concepts including expressions, equations, and inequalities.",
    duration: 60,
    scheduledFor: new Date(2023, 6, 15, 10, 0),
    questionCount: 20,
    hasHints: true,
  },
  {
    id: 2,
    title: "Calculus Mid-Term",
    type: "actual",
    subject: "Mathematics",
    topic: "Calculus",
    description: "Comprehensive test on differential and integral calculus.",
    duration: 120,
    scheduledFor: new Date(2023, 6, 20, 14, 30),
    questionCount: 30,
    hasHints: false,
  },
  {
    id: 3,
    title: "Quantum Mechanics",
    type: "practice",
    subject: "Physics",
    topic: "Quantum Mechanics",
    description: "Practice questions on wave functions, uncertainty principle, and quantum states.",
    duration: 90,
    scheduledFor: new Date(2023, 7, 5, 9, 0),
    questionCount: 15,
    hasHints: true,
  },
  {
    id: 4,
    title: "Web Development Final",
    type: "actual",
    subject: "Web Development",
    topic: "Full Stack",
    description: "Comprehensive assessment of HTML, CSS, JavaScript, and backend concepts.",
    duration: 180,
    scheduledFor: new Date(2023, 7, 25, 13, 0),
    questionCount: 40,
    hasHints: false,
  },
]

export default function TeacherTestsPage() {
  const router = useRouter()
  // Initialize with mockTests for server-side rendering and initial client render
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [activeTab, setActiveTab] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTest, setNewTest] = useState({
    title: "",
    type: "practice",
    subject: "",
    topic: "",
    description: "",
    duration: 60,
    scheduledDate: "",
    scheduledTime: "",
    hasHints: false,
  })

  // Load from localStorage only after first render to avoid hydration mismatch
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTests = localStorage.getItem('mockTests');
      if (savedTests) {
        try {
          // Parse tests and convert date strings back to Date objects
          const parsedTests = JSON.parse(savedTests);
          const testsWithDates = parsedTests.map((test: any) => ({
            ...test,
            scheduledFor: new Date(test.scheduledFor)
          }));
          setTests(testsWithDates);
        } catch (error) {
          console.error("Error loading tests from localStorage:", error);
          // Fallback to mockTests if there's an error parsing
          localStorage.setItem('mockTests', JSON.stringify(mockTests));
        }
      } else {
        // Initialize localStorage with mockTests if it doesn't exist
        localStorage.setItem('mockTests', JSON.stringify(mockTests));
      }
    }
  }, []);

  // Update localStorage whenever tests change - after initial render
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockTests', JSON.stringify(tests));
    }
  }, [tests]);

  // Filter tests based on the active tab
  const filteredTests = activeTab === "all" 
    ? tests 
    : tests.filter((test: Test) => test.type === activeTab)

  const handleCreateTest = () => {
    // Validate form fields
    if (!newTest.title || !newTest.subject || !newTest.topic || !newTest.scheduledDate || !newTest.scheduledTime) {
      // In a real app, show validation error
      alert("Please fill in all required fields")
      return
    }

    // Create scheduled date object
    const [year, month, day] = newTest.scheduledDate.split('-').map(Number)
    const [hours, minutes] = newTest.scheduledTime.split(':').map(Number)
    const scheduledFor = new Date(year, month - 1, day, hours, minutes)

    // Create new test object
    const createdTest = {
      id: tests.length + 1,
      title: newTest.title,
      type: newTest.type,
      subject: newTest.subject,
      topic: newTest.topic,
      description: newTest.description,
      duration: parseInt(newTest.duration.toString()),
      scheduledFor,
      questionCount: 0, // No questions yet
      hasHints: newTest.type === "practice" ? newTest.hasHints : false,
      questions: [] // Initialize with empty questions array
    }

    // Add new test to the list
    const updatedTests = [...tests, createdTest];
    setTests(updatedTests);

    // Save to localStorage immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockTests', JSON.stringify(updatedTests));
    }

    // Reset form and close dialog
    setNewTest({
      title: "",
      type: "practice",
      subject: "",
      topic: "",
      description: "",
      duration: 60,
      scheduledDate: "",
      scheduledTime: "",
      hasHints: false,
    })
    setIsCreateDialogOpen(false)

    // Navigate to the test detail page to add questions
    router.push(`/teacher/tests/${createdTest.id}`)
  }

  const handleDeleteTest = (id: number) => {
    setTests(tests.filter((test: Test) => test.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tests</h2>
          <p className="text-muted-foreground">Create and manage practice and actual tests for your courses.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Test
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Test</DialogTitle>
              <DialogDescription>
                Create a new test for your students. You can add questions after creating the test.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="test-type" className="text-right">
                  Test Type
                </Label>
                <Select 
                  value={newTest.type} 
                  onValueChange={(value) => setNewTest({ ...newTest, type: value, hasHints: value === "practice" ? newTest.hasHints : false })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="practice">
                      <div className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Practice Test</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="actual">
                      <div className="flex items-center">
                        <Brain className="mr-2 h-4 w-4" />
                        <span>Actual Test</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Test title"
                  className="col-span-3"
                  value={newTest.title}
                  onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  className="col-span-3"
                  value={newTest.subject}
                  onChange={(e) => setNewTest({ ...newTest, subject: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">
                  Topic
                </Label>
                <Input
                  id="topic"
                  placeholder="Specific topic"
                  className="col-span-3"
                  value={newTest.topic}
                  onChange={(e) => setNewTest({ ...newTest, topic: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the test"
                  className="col-span-3"
                  value={newTest.description}
                  onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (min)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="5"
                  className="col-span-3"
                  value={newTest.duration}
                  onChange={(e) => setNewTest({ ...newTest, duration: e.target.value ? parseInt(e.target.value) : 60 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="scheduled-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="scheduled-date"
                  type="date"
                  className="col-span-3"
                  value={newTest.scheduledDate}
                  onChange={(e) => setNewTest({ ...newTest, scheduledDate: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="scheduled-time" className="text-right">
                  Time
                </Label>
                <Input
                  id="scheduled-time"
                  type="time"
                  className="col-span-3"
                  value={newTest.scheduledTime}
                  onChange={(e) => setNewTest({ ...newTest, scheduledTime: e.target.value })}
                />
              </div>
              {newTest.type === "practice" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="has-hints" className="text-right">
                    Include Hints
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <input
                      id="has-hints"
                      type="checkbox"
                      checked={newTest.hasHints}
                      onChange={(e) => setNewTest({ ...newTest, hasHints: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="has-hints" className="text-sm font-normal">
                      Enable hints for practice questions
                    </Label>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTest}>
                Create Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Tests</TabsTrigger>
          <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          <TabsTrigger value="actual">Actual Tests</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map((test: Test) => (
              <TestCard 
                key={test.id} 
                test={test} 
                onEdit={() => router.push(`/teacher/tests/${test.id}`)} 
                onDelete={() => handleDeleteTest(test.id)} 
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="practice" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map((test: Test) => (
              <TestCard 
                key={test.id} 
                test={test} 
                onEdit={() => router.push(`/teacher/tests/${test.id}`)} 
                onDelete={() => handleDeleteTest(test.id)} 
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="actual" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map((test: Test) => (
              <TestCard 
                key={test.id} 
                test={test} 
                onEdit={() => router.push(`/teacher/tests/${test.id}`)} 
                onDelete={() => handleDeleteTest(test.id)} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TestCard({ test, onEdit, onDelete }: { 
  test: Test, 
  onEdit: () => void, 
  onDelete: () => void 
}) {
  // Ensure scheduledFor is a Date object
  const scheduledDate = test.scheduledFor instanceof Date 
    ? test.scheduledFor 
    : new Date(test.scheduledFor);
    
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center text-xl">
              {test.type === "practice" ? (
                <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
              ) : (
                <Brain className="mr-2 h-5 w-5 text-purple-600" />
              )}
              {test.title}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              {test.subject} • {test.topic}
            </CardDescription>
          </div>
          <div className={`rounded-full px-3 py-1 text-sm font-medium flex items-center ${
            test.type === "practice" 
              ? "bg-blue-100 text-blue-700" 
              : "bg-purple-100 text-purple-700"
          }`}>
            {test.type === "practice" ? (
              <>
                Practice
                {test.hasHints && <Lightbulb className="ml-1 h-3.5 w-3.5" />}
              </>
            ) : "Actual"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {test.description}
          </p>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>{test.duration} minutes</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>{format(scheduledDate, "PPP 'at' p")}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">
              <span className="text-primary">{test.questionCount}</span> questions
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto border-t pt-4">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" className="flex-1" onClick={onEdit}>
            <Edit className="mr-2 h-5 w-5" />
            Edit
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete}>
            <Trash className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 