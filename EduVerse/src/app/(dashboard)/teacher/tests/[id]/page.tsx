"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, Plus, Edit, Trash, Upload, Save, Lightbulb, Check, X, FilePlus, 
  Clock, Calendar, BookOpen, Brain, BookText, Target, FileText, User, Tag, Info, Eye, Sparkles, Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React from "react"

// Define proper types for test
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

// Mock data - would come from a database in a real app
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
    questions: [
      {
        id: 1,
        text: "Solve for x: 2x + 5 = 15",
        options: [
          { id: 1, text: "x = 5", isCorrect: true },
          { id: 2, text: "x = 7", isCorrect: false },
          { id: 3, text: "x = 10", isCorrect: false },
          { id: 4, text: "x = 8", isCorrect: false }
        ],
        hint: "Subtract 5 from both sides, then divide by 2."
      },
      {
        id: 2,
        text: "Which of the following is a polynomial?",
        options: [
          { id: 1, text: "y = 1/x", isCorrect: false },
          { id: 2, text: "y = x² + 2x - 3", isCorrect: true },
          { id: 3, text: "y = sin(x)", isCorrect: false },
          { id: 4, text: "y = √x", isCorrect: false }
        ],
        hint: "A polynomial has variables, coefficients, and non-negative integer exponents."
      }
    ]
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
    questions: []
  },
  {
    id: 3,
    title: "Quantum Mechanics Concepts",
    type: "practice",
    subject: "Physics",
    topic: "Quantum Mechanics",
    description: "Practice questions on wave functions, uncertainty principle, and quantum states.",
    duration: 90,
    scheduledFor: new Date(2023, 7, 5, 9, 0),
    questionCount: 15,
    hasHints: true,
    questions: []
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
    questions: []
  },
]

export default function TestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const testId = parseInt(params.id)
  
  // Initialize with mockTests for consistent server/client initial render
  const [allTests, setAllTests] = React.useState<Test[]>(mockTests);
  const [test, setTest] = React.useState<Test | null>(mockTests.find(t => t.id === testId) || null);
  const [activeTab, setActiveTab] = useState("manual")
  const [questions, setQuestions] = useState<TestQuestion[]>(test?.questions || [])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAIGeneratingQuestions, setIsAIGeneratingQuestions] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Load from localStorage only on client side after initial render
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTests = localStorage.getItem('mockTests');
      if (savedTests) {
        try {
          // Parse tests and convert date strings back to Date objects
          const parsedTests = JSON.parse(savedTests);
          const testsWithDates = parsedTests.map((t: any): Test => ({
            ...t,
            scheduledFor: new Date(t.scheduledFor)
          }));
          setAllTests(testsWithDates);
          // Find the current test
          const currentTest = testsWithDates.find((t: Test) => t.id === testId);
          if (currentTest) {
            setTest(currentTest);
            setQuestions(currentTest.questions || []);
          }
        } catch (error) {
          console.error("Error loading tests from localStorage:", error);
          localStorage.setItem('mockTests', JSON.stringify(mockTests));
        }
      } else {
        localStorage.setItem('mockTests', JSON.stringify(mockTests));
      }
    }
  }, [testId]);

  // Update localStorage whenever questions change
  React.useEffect(() => {
    if (test && typeof window !== 'undefined') {
      // Update the test questions in the allTests array
      const updatedTests = allTests.map((t: Test) => 
        t.id === testId ? { ...t, questions, questionCount: questions.length } : t
      );
      
      // Save to localStorage
      setAllTests(updatedTests);
      localStorage.setItem('mockTests', JSON.stringify(updatedTests));
    }
  }, [questions, testId, allTests, test]);

  // Handle back button navigation
  const handleBackClick = () => {
    router.push('/teacher/tests');
  };

  if (!test) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Test Not Found</h2>
        <p className="text-muted-foreground mb-4">The test you're looking for doesn't exist.</p>
        <Button onClick={handleBackClick}>
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Tests
        </Button>
      </div>
    )
  }

  // Handle option text change
  const handleOptionTextChange = (optionId: number, value: string) => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.map((option: TestOption) =>
        option.id === optionId ? { ...option, text: value } : option
      )
    });
  };

  // Handle option correctness change
  const handleOptionCorrectChange = (optionId: number) => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.map((option: TestOption) =>
        ({ ...option, isCorrect: option.id === optionId })
      )
    });
  };

  // Handle question text change
  const handleQuestionTextChange = (value: string) => {
    setNewQuestion({ ...newQuestion, text: value });
  };

  // Handle hint text change
  const handleHintTextChange = (value: string) => {
    setNewQuestion({ ...newQuestion, hint: value });
  };

  // Add new question
  const handleAddQuestion = () => {
    // Validate question
    if (!newQuestion.text.trim()) {
      alert("Question text is required");
      return;
    }

    if (newQuestion.options.some((option: TestOption) => !option.text.trim())) {
      alert("All options must have text");
      return;
    }

    const newQuestionWithId: TestQuestion = {
      id: questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1,
      text: newQuestion.text,
      options: newQuestion.options,
      hint: newQuestion.hint.trim() ? newQuestion.hint : undefined
    };

    setQuestions([...questions, newQuestionWithId]);

    // Reset form
    setNewQuestion({
      text: "",
      options: [
        { id: 1, text: "", isCorrect: true },
        { id: 2, text: "", isCorrect: false },
        { id: 3, text: "", isCorrect: false },
        { id: 4, text: "", isCorrect: false }
      ],
      hint: ""
    });

    setIsAddDialogOpen(false);
    
    alert("Question added successfully!");
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    // Simulate AI generating questions (in a real app, this would send files to an API)
    setIsAIGeneratingQuestions(true)
    
    // Simulating API delay
    setTimeout(() => {
      // Generate some dummy questions based on the file
      const generatedQuestions = [
        {
          id: questions.length + 1,
          text: "What is the primary difference between procedural and object-oriented programming?",
          options: [
            { id: 1, text: "Code organization around data vs. around functions", isCorrect: true },
            { id: 2, text: "Execution speed", isCorrect: false },
            { id: 3, text: "Memory usage", isCorrect: false },
            { id: 4, text: "File size", isCorrect: false }
          ],
          hint: test.type === "practice" && test.hasHints ? "Think about how data and functions are organized in each paradigm." : ""
        },
        {
          id: questions.length + 2,
          text: "Which concept refers to hiding the internal implementation details of an object?",
          options: [
            { id: 1, text: "Inheritance", isCorrect: false },
            { id: 2, text: "Encapsulation", isCorrect: true },
            { id: 3, text: "Polymorphism", isCorrect: false },
            { id: 4, text: "Abstraction", isCorrect: false }
          ],
          hint: test.type === "practice" && test.hasHints ? "This concept involves bundling data and methods together and restricting access." : ""
        },
        {
          id: questions.length + 3,
          text: "What is a key benefit of using interfaces in programming?",
          options: [
            { id: 1, text: "They make code run faster", isCorrect: false },
            { id: 2, text: "They reduce memory usage", isCorrect: false },
            { id: 3, text: "They enable contract-based programming", isCorrect: true },
            { id: 4, text: "They automatically debug code", isCorrect: false }
          ],
          hint: test.type === "practice" && test.hasHints ? "Think about how interfaces define what a class must implement without specifying how." : ""
        }
      ]
      
      setQuestions([...questions, ...generatedQuestions])
      setIsAIGeneratingQuestions(false)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      
    }, 2000)
  }

  // New question state
  const [newQuestion, setNewQuestion] = useState<{
    text: string;
    options: TestOption[];
    hint: string;
  }>({
    text: "",
    options: [
      { id: 1, text: "", isCorrect: true },
      { id: 2, text: "", isCorrect: false },
      { id: 3, text: "", isCorrect: false },
      { id: 4, text: "", isCorrect: false }
    ],
    hint: ""
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleBackClick}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold tracking-tight ml-2">{test.title}</h1>
        <div className={`ml-4 rounded-full px-3 py-1 text-sm font-medium ${
          test.type === "practice" 
            ? "bg-blue-100 text-blue-700" 
            : "bg-purple-100 text-purple-700"
        }`}>
          {test.type === "practice" ? (
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>Practice</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Brain className="h-4 w-4 mr-1" />
              <span>Actual</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2 text-primary" />
              Test Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="font-medium">Subject:</span> 
                <span className="ml-2">{test.subject}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="font-medium">Topic:</span> 
                <span className="ml-2">{test.topic}</span>
              </div>
              <div className="flex items-start">
                <FileText className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <span className="font-medium">Description:</span> 
                  <p className="mt-1">{test.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="font-medium">Duration:</span> 
                <span className="ml-2">{test.duration} minutes</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="font-medium">Scheduled For:</span> 
                <span className="ml-2">
                  {typeof test.scheduledFor === 'string' 
                    ? new Date(test.scheduledFor).toLocaleDateString() + ' at ' + new Date(test.scheduledFor).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    : test.scheduledFor.toLocaleDateString() + ' at ' + test.scheduledFor.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                  }
                </span>
              </div>
              {test.type === "practice" && (
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span className="font-medium">Hints:</span> 
                  <span className="ml-2">{test.hasHints ? 
                    <span className="text-green-600">Enabled</span> : 
                    <span className="text-red-600">Disabled</span>}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <BookText className="h-5 w-5 mr-2 text-blue-500" />
              Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                  <span className="font-bold">{questions.length}</span>
                </div>
                <span className="text-lg">questions added</span>
              </div>
              {questions.length > 0 && (
                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/preview/test/${test.id}`)} className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Test
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Tabs defaultValue="manual" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="w-[400px]">
              <TabsTrigger value="manual" className="flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Manual Entry
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Generated
              </TabsTrigger>
            </TabsList>
            
            {activeTab === "manual" ? (
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Question</DialogTitle>
                    <DialogDescription>
                      Create a new question for this test.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="question-text">Question Text</Label>
                      <Textarea
                        id="question-text"
                        placeholder="Enter the question text"
                        value={newQuestion.text}
                        onChange={(e) => handleQuestionTextChange(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right mt-2 font-medium">
                        Options
                      </Label>
                      <div className="col-span-3 space-y-3">
                        <RadioGroup 
                          value={newQuestion.options.find(o => o.isCorrect)?.id.toString() || ""}
                          onValueChange={(value) => handleOptionCorrectChange(parseInt(value))}
                          className="space-y-3"
                        >
                          {newQuestion.options.map((option, index) => (
                            <div key={option.id} className="flex items-center space-x-2 border p-2 rounded-md bg-background hover:bg-accent/50 transition-colors">
                              <div className="flex items-center space-x-2 w-full">
                                <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 text-sm font-medium">
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <Input
                                  placeholder={`Option ${index + 1}`}
                                  value={option.text}
                                  onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                        <p className="text-sm text-muted-foreground flex items-center mt-2">
                          <Info className="h-4 w-4 mr-1" />
                          Select the radio button for the correct answer.
                        </p>
                      </div>
                    </div>
                    
                    {test.type === "practice" && test.hasHints && (
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="hint" className="text-right mt-2 font-medium flex items-center justify-end">
                          <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                          Hint
                        </Label>
                        <Textarea
                          id="hint"
                          placeholder="Optional hint for this question"
                          className="col-span-3 border-amber-200 focus-visible:ring-amber-400"
                          value={newQuestion.hint}
                          onChange={(e) => handleHintTextChange(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddQuestion} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="flex items-center space-x-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                  multiple
                />
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAIGeneratingQuestions}
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Materials
                </Button>
                
                {isAIGeneratingQuestions && (
                  <span className="text-sm text-muted-foreground animate-pulse flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating questions...
                  </span>
                )}
              </div>
            )}
          </div>
          
          <TabsContent value="manual" className="space-y-4">
            {questions.length > 0 ? (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={question.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">Q{index + 1}: {question.text}</h3>
                          <div className="space-y-1 ml-4">
                            {question.options.map((option) => (
                              <div key={option.id} className="flex items-center">
                                <div className={`mr-2 h-4 w-4 rounded-full flex items-center justify-center ${
                                  option.isCorrect 
                                    ? "bg-green-500 text-white" 
                                    : "border border-gray-300"
                                }`}>
                                  {option.isCorrect && <Check className="h-3 w-3" />}
                                </div>
                                <span className={option.isCorrect ? "font-medium" : ""}>
                                  {option.text}
                                </span>
                              </div>
                            ))}
                          </div>
                          {test.type === "practice" && test.hasHints && question.hint && (
                            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
                              <div className="flex items-center text-amber-700">
                                <Lightbulb className="h-4 w-4 mr-1" />
                                <span className="text-xs font-medium">Hint:</span>
                              </div>
                              <p className="text-sm text-amber-700 ml-5">{question.hint}</p>
                            </div>
                          )}
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteQuestion(question.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
                <FilePlus className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium">No Questions Added Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Add your first question using the button above.</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ai">
            <div className="space-y-4">
              {questions.length > 0 ? (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <Card key={question.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium mb-2">Q{index + 1}: {question.text}</h3>
                            <div className="space-y-1 ml-4">
                              {question.options.map((option) => (
                                <div key={option.id} className="flex items-center">
                                  <div className={`mr-2 h-4 w-4 rounded-full flex items-center justify-center ${
                                    option.isCorrect 
                                      ? "bg-green-500 text-white" 
                                      : "border border-gray-300"
                                  }`}>
                                    {option.isCorrect && <Check className="h-3 w-3" />}
                                  </div>
                                  <span className={option.isCorrect ? "font-medium" : ""}>
                                    {option.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {test.type === "practice" && test.hasHints && question.hint && (
                              <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
                                <div className="flex items-center text-amber-700">
                                  <Lightbulb className="h-4 w-4 mr-1" />
                                  <span className="text-xs font-medium">Hint:</span>
                                </div>
                                <p className="text-sm text-amber-700 ml-5">{question.hint}</p>
                              </div>
                            )}
                          </div>
                          <Button variant="destructive" size="icon" onClick={() => handleDeleteQuestion(question.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No AI-Generated Questions Yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Upload materials to generate questions with AI.</p>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Materials
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleBackClick} className="bg-green-600 hover:bg-green-700">
          <Save className="mr-2 h-5 w-5" />
          Save Test
        </Button>
      </div>
    </div>
  )
} 