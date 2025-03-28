"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Video, 
  FileText, 
  Image as ImageIcon, 
  File, 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  Edit 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

// Mock data for demonstration
const mockCourses = [
  {
    id: 1,
    title: "Introduction to Mathematics",
    description: "A comprehensive course covering fundamental mathematical concepts.",
    materials: [
      { 
        id: 1, 
        title: "Algebra Basics", 
        type: "video", 
        description: "Introduction to algebraic expressions and equations.",
        videoUrl: "https://example.com/algebra-video.mp4",
        supportingMaterials: [
          { id: 1, name: "Algebra Notes.pdf", type: "pdf", url: "#" },
          { id: 2, name: "Practice Problems.docx", type: "doc", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Geometry Fundamentals", 
        type: "video", 
        description: "Learn about shapes, angles, and spatial relationships.",
        videoUrl: "https://example.com/geometry-video.mp4",
        supportingMaterials: [
          { id: 3, name: "Geometry Slides.ppt", type: "ppt", url: "#" },
          { id: 4, name: "Exercises.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Number Theory", 
        type: "video", 
        description: "Exploring properties of integers and number systems.",
        videoUrl: "https://example.com/number-theory.mp4",
        supportingMaterials: [
          { id: 5, name: "Number Theory Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Introduction to Calculus", 
        type: "video", 
        description: "Basic concepts of differential and integral calculus.",
        videoUrl: "https://example.com/calculus-intro.mp4",
        supportingMaterials: [
          { id: 6, name: "Calculus Handbook.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Probability and Statistics", 
        type: "video", 
        description: "Understanding data analysis and probability concepts.",
        videoUrl: "https://example.com/stats-intro.mp4",
        supportingMaterials: [
          { id: 7, name: "Statistics Practice.xlsx", type: "xls", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Trigonometry Essentials", 
        type: "video", 
        description: "Working with angles, triangles and trigonometric functions.",
        videoUrl: "https://example.com/trig-basics.mp4",
        supportingMaterials: [
          { id: 8, name: "Trigonometry Formulas.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Matrices and Linear Algebra", 
        type: "video", 
        description: "Operations with matrices and solving linear equations.",
        videoUrl: "https://example.com/matrices.mp4",
        supportingMaterials: [
          { id: 9, name: "Matrix Operations.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Mathematical Reasoning", 
        type: "video", 
        description: "Logic, proofs, and critical thinking in mathematics.",
        videoUrl: "https://example.com/reasoning.mp4",
        supportingMaterials: [
          { id: 10, name: "Logic Problems.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Set Theory Fundamentals", 
        type: "video", 
        description: "Understanding sets, operations, and their applications.",
        videoUrl: "https://example.com/set-theory.mp4",
        supportingMaterials: [
          { id: 11, name: "Set Theory Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Polynomial Functions", 
        type: "video", 
        description: "Working with polynomial equations and functions.",
        videoUrl: "https://example.com/polynomials.mp4",
        supportingMaterials: [
          { id: 12, name: "Polynomial Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Coordinate Geometry", 
        type: "video", 
        description: "Points, lines, and shapes in the coordinate plane.",
        videoUrl: "https://example.com/coordinate-geo.mp4",
        supportingMaterials: [
          { id: 13, name: "Coordinate Systems.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Mathematical Modeling", 
        type: "video", 
        description: "Using mathematics to model real-world problems.",
        videoUrl: "https://example.com/modeling.mp4",
        supportingMaterials: [
          { id: 14, name: "Modeling Worksheet.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Series and Sequences", 
        type: "video", 
        description: "Arithmetic and geometric progressions and infinite series.",
        videoUrl: "https://example.com/series.mp4",
        supportingMaterials: [
          { id: 15, name: "Series Practice.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Limits and Continuity", 
        type: "video", 
        description: "Understanding limits and continuous functions.",
        videoUrl: "https://example.com/limits.mp4",
        supportingMaterials: [
          { id: 16, name: "Limits Exercises.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Exponential Functions", 
        type: "video", 
        description: "Properties and applications of exponential growth and decay.",
        videoUrl: "https://example.com/exponential.mp4",
        supportingMaterials: [
          { id: 17, name: "Exponential Problems.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Mathematical Proof Techniques", 
        type: "video", 
        description: "Methods of constructing valid mathematical proofs.",
        videoUrl: "https://example.com/proofs.mp4",
        supportingMaterials: [
          { id: 18, name: "Proof Examples.pdf", type: "pdf", url: "#" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Advanced Physics",
    description: "Explore complex physics concepts with practical experiments and simulations.",
    materials: [
      { 
        id: 1, 
        title: "Classical Mechanics", 
        type: "video", 
        description: "Newton's laws, motion, and forces.",
        videoUrl: "https://example.com/mechanics-video.mp4",
        supportingMaterials: [
          { id: 1, name: "Mechanics Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Thermodynamics", 
        type: "video", 
        description: "Heat, energy transfer, and the laws of thermodynamics.",
        videoUrl: "https://example.com/thermo-video.mp4",
        supportingMaterials: [
          { id: 2, name: "Thermodynamics Formulas.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Electromagnetism", 
        type: "video", 
        description: "Electric and magnetic fields and their interactions.",
        videoUrl: "https://example.com/em-video.mp4",
        supportingMaterials: [
          { id: 3, name: "EM Field Equations.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Optics", 
        type: "video", 
        description: "Behavior of light, lenses, and optical instruments.",
        videoUrl: "https://example.com/optics-video.mp4",
        supportingMaterials: [
          { id: 4, name: "Optics Lab Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Quantum Mechanics", 
        type: "video", 
        description: "Wave-particle duality and quantum behavior.",
        videoUrl: "https://example.com/quantum-video.mp4",
        supportingMaterials: [
          { id: 5, name: "Quantum Theory Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Relativity", 
        type: "video", 
        description: "Special and general relativity concepts.",
        videoUrl: "https://example.com/relativity-video.mp4",
        supportingMaterials: [
          { id: 6, name: "Relativity Problems.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Nuclear Physics", 
        type: "video", 
        description: "Atomic nuclei, radioactivity, and nuclear reactions.",
        videoUrl: "https://example.com/nuclear-video.mp4",
        supportingMaterials: [
          { id: 7, name: "Nuclear Decay Tables.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Fluid Mechanics", 
        type: "video", 
        description: "Behavior of fluids at rest and in motion.",
        videoUrl: "https://example.com/fluids-video.mp4",
        supportingMaterials: [
          { id: 8, name: "Fluid Dynamics Exercises.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Acoustics", 
        type: "video", 
        description: "Sound waves, vibrations, and acoustic phenomena.",
        videoUrl: "https://example.com/acoustics-video.mp4",
        supportingMaterials: [
          { id: 9, name: "Sound Wave Analysis.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Astrophysics", 
        type: "video", 
        description: "Physics of astronomical objects and phenomena.",
        videoUrl: "https://example.com/astro-video.mp4",
        supportingMaterials: [
          { id: 10, name: "Stellar Evolution.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Condensed Matter Physics", 
        type: "video", 
        description: "Properties of solids and complex materials.",
        videoUrl: "https://example.com/condensed-video.mp4",
        supportingMaterials: [
          { id: 11, name: "Crystal Structures.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Particle Physics", 
        type: "video", 
        description: "Fundamental particles and their interactions.",
        videoUrl: "https://example.com/particle-video.mp4",
        supportingMaterials: [
          { id: 12, name: "Standard Model Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Statistical Mechanics", 
        type: "video", 
        description: "Statistical methods for large physical systems.",
        videoUrl: "https://example.com/stat-mech-video.mp4",
        supportingMaterials: [
          { id: 13, name: "Ensemble Theory.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Computational Physics", 
        type: "video", 
        description: "Numerical methods in physics problems.",
        videoUrl: "https://example.com/computational-video.mp4",
        supportingMaterials: [
          { id: 14, name: "Simulation Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Biophysics", 
        type: "video", 
        description: "Physics principles applied to biological systems.",
        videoUrl: "https://example.com/biophysics-video.mp4",
        supportingMaterials: [
          { id: 15, name: "Biomechanics Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Environmental Physics", 
        type: "video", 
        description: "Physics of environmental systems and climate.",
        videoUrl: "https://example.com/environment-video.mp4",
        supportingMaterials: [
          { id: 16, name: "Climate Models.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "Geophysics", 
        type: "video", 
        description: "Physics of the Earth and its environment.",
        videoUrl: "https://example.com/geo-video.mp4",
        supportingMaterials: [
          { id: 17, name: "Seismic Analysis.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Classical Field Theory", 
        type: "video", 
        description: "Continuous field descriptions in physics.",
        videoUrl: "https://example.com/field-video.mp4",
        supportingMaterials: [
          { id: 18, name: "Field Equations.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 19, 
        title: "Medical Physics", 
        type: "video", 
        description: "Physics applications in medicine and healthcare.",
        videoUrl: "https://example.com/medical-video.mp4",
        supportingMaterials: [
          { id: 19, name: "Radiation Therapy.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 20, 
        title: "Experimental Techniques", 
        type: "video", 
        description: "Methods and instruments for physics experiments.",
        videoUrl: "https://example.com/experimental-video.mp4",
        supportingMaterials: [
          { id: 20, name: "Lab Equipment Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 21, 
        title: "Physics of Materials", 
        type: "video", 
        description: "Physical properties of engineering materials.",
        videoUrl: "https://example.com/materials-video.mp4",
        supportingMaterials: [
          { id: 21, name: "Material Properties.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 22, 
        title: "Electronics", 
        type: "video", 
        description: "Principles of electronic circuits and components.",
        videoUrl: "https://example.com/electronics-video.mp4",
        supportingMaterials: [
          { id: 22, name: "Circuit Analysis.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 23, 
        title: "Plasma Physics", 
        type: "video", 
        description: "Properties and behavior of ionized gases.",
        videoUrl: "https://example.com/plasma-video.mp4",
        supportingMaterials: [
          { id: 23, name: "Plasma Dynamics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 24, 
        title: "History of Physics", 
        type: "video", 
        description: "Evolution of physical theories and discoveries.",
        videoUrl: "https://example.com/history-video.mp4",
        supportingMaterials: [
          { id: 24, name: "Physics Timeline.pdf", type: "pdf", url: "#" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to create responsive and interactive websites.",
    materials: [
      { 
        id: 1, 
        title: "HTML Basics", 
        type: "video", 
        description: "Structure and elements of HTML documents.",
        videoUrl: "https://example.com/html-video.mp4",
        supportingMaterials: [
          { id: 1, name: "HTML Cheatsheet.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "CSS Styling", 
        type: "video", 
        description: "Styling web pages with Cascading Style Sheets.",
        videoUrl: "https://example.com/css-video.mp4",
        supportingMaterials: [
          { id: 2, name: "CSS Properties Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "JavaScript Fundamentals", 
        type: "video", 
        description: "Core concepts of JavaScript programming.",
        videoUrl: "https://example.com/js-video.mp4",
        supportingMaterials: [
          { id: 3, name: "JavaScript Basics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Responsive Design", 
        type: "video", 
        description: "Creating websites that work on all devices.",
        videoUrl: "https://example.com/responsive-video.mp4",
        supportingMaterials: [
          { id: 4, name: "Media Queries Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "DOM Manipulation", 
        type: "video", 
        description: "Working with the Document Object Model.",
        videoUrl: "https://example.com/dom-video.mp4",
        supportingMaterials: [
          { id: 5, name: "DOM Methods.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "CSS Frameworks", 
        type: "video", 
        description: "Using Bootstrap and other CSS frameworks.",
        videoUrl: "https://example.com/frameworks-video.mp4",
        supportingMaterials: [
          { id: 6, name: "Bootstrap Components.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Web Forms", 
        type: "video", 
        description: "Creating and handling forms in HTML.",
        videoUrl: "https://example.com/forms-video.mp4",
        supportingMaterials: [
          { id: 7, name: "Form Validation.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "JavaScript Events", 
        type: "video", 
        description: "Handling user interactions with event listeners.",
        videoUrl: "https://example.com/events-video.mp4",
        supportingMaterials: [
          { id: 8, name: "Event Handling.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "APIs and Fetch", 
        type: "video", 
        description: "Working with APIs and the Fetch API.",
        videoUrl: "https://example.com/apis-video.mp4",
        supportingMaterials: [
          { id: 9, name: "REST API Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Web Storage", 
        type: "video", 
        description: "Using localStorage and sessionStorage.",
        videoUrl: "https://example.com/storage-video.mp4",
        supportingMaterials: [
          { id: 10, name: "Storage Options.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "JSON and Data Formats", 
        type: "video", 
        description: "Working with JSON and other data formats.",
        videoUrl: "https://example.com/json-video.mp4",
        supportingMaterials: [
          { id: 11, name: "JSON Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "CSS Animations", 
        type: "video", 
        description: "Creating animations with CSS.",
        videoUrl: "https://example.com/animations-video.mp4",
        supportingMaterials: [
          { id: 12, name: "Animation Properties.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Version Control", 
        type: "video", 
        description: "Using Git and GitHub for web projects.",
        videoUrl: "https://example.com/git-video.mp4",
        supportingMaterials: [
          { id: 13, name: "Git Commands.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Web Accessibility", 
        type: "video", 
        description: "Making websites accessible to all users.",
        videoUrl: "https://example.com/accessibility-video.mp4",
        supportingMaterials: [
          { id: 14, name: "ARIA Guidelines.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "SEO Basics", 
        type: "video", 
        description: "Search engine optimization for web developers.",
        videoUrl: "https://example.com/seo-video.mp4",
        supportingMaterials: [
          { id: 15, name: "SEO Checklist.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Web Performance", 
        type: "video", 
        description: "Optimizing websites for faster loading.",
        videoUrl: "https://example.com/performance-video.mp4",
        supportingMaterials: [
          { id: 16, name: "Performance Tips.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "CSS Grid and Flexbox", 
        type: "video", 
        description: "Modern layout techniques in CSS.",
        videoUrl: "https://example.com/layout-video.mp4",
        supportingMaterials: [
          { id: 17, name: "Grid vs Flexbox.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Web Hosting", 
        type: "video", 
        description: "Deploying websites to production.",
        videoUrl: "https://example.com/hosting-video.mp4",
        supportingMaterials: [
          { id: 18, name: "Deployment Guide.pdf", type: "pdf", url: "#" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Data Science Essentials",
    description: "Master the fundamentals of data analysis, visualization, and machine learning.",
    materials: [
      { 
        id: 1, 
        title: "Introduction to Data Science", 
        type: "video", 
        description: "Overview of data science field and applications.",
        videoUrl: "https://example.com/intro-ds-video.mp4",
        supportingMaterials: [
          { id: 1, name: "Data Science Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Python for Data Science", 
        type: "video", 
        description: "Essential Python programming for data analysis.",
        videoUrl: "https://example.com/python-ds-video.mp4",
        supportingMaterials: [
          { id: 2, name: "Python Basics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Data Collection and Cleaning", 
        type: "video", 
        description: "Techniques for gathering and preprocessing data.",
        videoUrl: "https://example.com/data-cleaning-video.mp4",
        supportingMaterials: [
          { id: 3, name: "Data Preparation Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Exploratory Data Analysis", 
        type: "video", 
        description: "Methods for initial data investigation and insights.",
        videoUrl: "https://example.com/eda-video.mp4",
        supportingMaterials: [
          { id: 4, name: "EDA Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Data Visualization", 
        type: "video", 
        description: "Creating effective visual representations of data.",
        videoUrl: "https://example.com/dataviz-video.mp4",
        supportingMaterials: [
          { id: 5, name: "Visualization Best Practices.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Statistical Analysis", 
        type: "video", 
        description: "Using statistics to draw conclusions from data.",
        videoUrl: "https://example.com/stats-ds-video.mp4",
        supportingMaterials: [
          { id: 6, name: "Statistical Methods.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Introduction to Machine Learning", 
        type: "video", 
        description: "Overview of machine learning concepts and applications.",
        videoUrl: "https://example.com/intro-ml-video.mp4",
        supportingMaterials: [
          { id: 7, name: "ML Fundamentals.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Supervised Learning", 
        type: "video", 
        description: "Building models that learn from labeled data.",
        videoUrl: "https://example.com/supervised-video.mp4",
        supportingMaterials: [
          { id: 8, name: "Supervised Learning Algorithms.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Unsupervised Learning", 
        type: "video", 
        description: "Finding patterns in unlabeled data.",
        videoUrl: "https://example.com/unsupervised-video.mp4",
        supportingMaterials: [
          { id: 9, name: "Clustering Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Feature Engineering", 
        type: "video", 
        description: "Creating and selecting optimal features for models.",
        videoUrl: "https://example.com/feature-eng-video.mp4",
        supportingMaterials: [
          { id: 10, name: "Feature Selection Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Model Evaluation", 
        type: "video", 
        description: "Methods for assessing model performance.",
        videoUrl: "https://example.com/model-eval-video.mp4",
        supportingMaterials: [
          { id: 11, name: "Evaluation Metrics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Linear Regression", 
        type: "video", 
        description: "Modeling relationships between variables.",
        videoUrl: "https://example.com/linear-reg-video.mp4",
        supportingMaterials: [
          { id: 12, name: "Regression Analysis.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Classification Algorithms", 
        type: "video", 
        description: "Techniques for categorizing data into classes.",
        videoUrl: "https://example.com/classification-video.mp4",
        supportingMaterials: [
          { id: 13, name: "Classification Methods.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Decision Trees and Random Forests", 
        type: "video", 
        description: "Tree-based methods for prediction and classification.",
        videoUrl: "https://example.com/trees-video.mp4",
        supportingMaterials: [
          { id: 14, name: "Tree Algorithms.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Neural Networks Fundamentals", 
        type: "video", 
        description: "Introduction to artificial neural networks.",
        videoUrl: "https://example.com/neural-net-video.mp4",
        supportingMaterials: [
          { id: 15, name: "Neural Network Basics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Deep Learning Concepts", 
        type: "video", 
        description: "Advanced neural network architectures and applications.",
        videoUrl: "https://example.com/deep-learning-video.mp4",
        supportingMaterials: [
          { id: 16, name: "Deep Learning Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "Natural Language Processing", 
        type: "video", 
        description: "Working with text data and language models.",
        videoUrl: "https://example.com/nlp-video.mp4",
        supportingMaterials: [
          { id: 17, name: "NLP Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Time Series Analysis", 
        type: "video", 
        description: "Analyzing sequential data and making forecasts.",
        videoUrl: "https://example.com/time-series-video.mp4",
        supportingMaterials: [
          { id: 18, name: "Forecasting Methods.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 19, 
        title: "Data Ethics and Privacy", 
        type: "video", 
        description: "Ethical considerations in data science practice.",
        videoUrl: "https://example.com/ethics-video.mp4",
        supportingMaterials: [
          { id: 19, name: "Data Ethics Guidelines.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 20, 
        title: "Big Data Technologies", 
        type: "video", 
        description: "Tools for processing and analyzing large datasets.",
        videoUrl: "https://example.com/big-data-video.mp4",
        supportingMaterials: [
          { id: 20, name: "Big Data Frameworks.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 21, 
        title: "Deploying Data Science Projects", 
        type: "video", 
        description: "Taking models from development to production.",
        videoUrl: "https://example.com/deployment-video.mp4",
        supportingMaterials: [
          { id: 21, name: "Model Deployment Guide.pdf", type: "pdf", url: "#" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    description: "Learn modern digital marketing techniques to grow your business and engage audiences.",
    materials: [
      { 
        id: 1, 
        title: "Introduction to Digital Marketing", 
        type: "video", 
        description: "Overview of digital marketing channels and strategies.",
        videoUrl: "https://example.com/intro-marketing-video.mp4",
        supportingMaterials: [
          { id: 1, name: "Digital Marketing Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Content Marketing", 
        type: "video", 
        description: "Creating valuable content to attract and engage audiences.",
        videoUrl: "https://example.com/content-mkt-video.mp4",
        supportingMaterials: [
          { id: 2, name: "Content Strategy Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Search Engine Optimization", 
        type: "video", 
        description: "Improving website visibility in search engines.",
        videoUrl: "https://example.com/seo-video.mp4",
        supportingMaterials: [
          { id: 3, name: "SEO Best Practices.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Social Media Marketing", 
        type: "video", 
        description: "Leveraging social platforms for brand growth.",
        videoUrl: "https://example.com/social-media-video.mp4",
        supportingMaterials: [
          { id: 4, name: "Social Media Playbook.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Email Marketing", 
        type: "video", 
        description: "Building effective email campaigns and automations.",
        videoUrl: "https://example.com/email-mkt-video.mp4",
        supportingMaterials: [
          { id: 5, name: "Email Campaign Templates.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Pay-Per-Click Advertising", 
        type: "video", 
        description: "Creating and optimizing paid advertising campaigns.",
        videoUrl: "https://example.com/ppc-video.mp4",
        supportingMaterials: [
          { id: 6, name: "PPC Campaign Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Analytics and Measurement", 
        type: "video", 
        description: "Tracking and analyzing marketing performance.",
        videoUrl: "https://example.com/analytics-video.mp4",
        supportingMaterials: [
          { id: 7, name: "Analytics Dashboard Setup.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Conversion Rate Optimization", 
        type: "video", 
        description: "Improving website performance and conversions.",
        videoUrl: "https://example.com/cro-video.mp4",
        supportingMaterials: [
          { id: 8, name: "CRO Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Mobile Marketing", 
        type: "video", 
        description: "Strategies for reaching mobile users effectively.",
        videoUrl: "https://example.com/mobile-mkt-video.mp4",
        supportingMaterials: [
          { id: 9, name: "Mobile Optimization Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Influencer Marketing", 
        type: "video", 
        description: "Working with influencers to expand brand reach.",
        videoUrl: "https://example.com/influencer-video.mp4",
        supportingMaterials: [
          { id: 10, name: "Influencer Partnership Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Video Marketing", 
        type: "video", 
        description: "Creating engaging video content for multiple platforms.",
        videoUrl: "https://example.com/video-mkt-video.mp4",
        supportingMaterials: [
          { id: 11, name: "Video Production Tips.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Marketing Automation", 
        type: "video", 
        description: "Setting up automated marketing workflows.",
        videoUrl: "https://example.com/automation-video.mp4",
        supportingMaterials: [
          { id: 12, name: "Automation Workflow Templates.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Brand Building Strategies", 
        type: "video", 
        description: "Developing a strong brand identity online.",
        videoUrl: "https://example.com/branding-video.mp4",
        supportingMaterials: [
          { id: 13, name: "Brand Style Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Customer Journey Mapping", 
        type: "video", 
        description: "Understanding and optimizing the customer experience.",
        videoUrl: "https://example.com/journey-video.mp4",
        supportingMaterials: [
          { id: 14, name: "Journey Map Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Digital Marketing Strategy Integration", 
        type: "video", 
        description: "Combining channels for comprehensive marketing success.",
        videoUrl: "https://example.com/integration-video.mp4",
        supportingMaterials: [
          { id: 15, name: "Integrated Strategy Framework.pdf", type: "pdf", url: "#" }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Creative Writing Workshop",
    description: "Develop your storytelling skills and learn techniques from published authors.",
    materials: [
      { 
        id: 1, 
        title: "Elements of Storytelling", 
        type: "video", 
        description: "Understanding the fundamental components of compelling stories.",
        videoUrl: "https://example.com/storytelling-video.mp4",
        supportingMaterials: [
          { id: 1, name: "Story Structure Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Character Development", 
        type: "video", 
        description: "Creating memorable and multi-dimensional characters.",
        videoUrl: "https://example.com/character-video.mp4",
        supportingMaterials: [
          { id: 2, name: "Character Profile Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Setting and World Building", 
        type: "video", 
        description: "Crafting immersive environments for your stories.",
        videoUrl: "https://example.com/setting-video.mp4",
        supportingMaterials: [
          { id: 3, name: "World Building Worksheet.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Dialogue and Voice", 
        type: "video", 
        description: "Writing authentic dialogue and developing a unique voice.",
        videoUrl: "https://example.com/dialogue-video.mp4",
        supportingMaterials: [
          { id: 4, name: "Dialogue Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Plot and Structure", 
        type: "video", 
        description: "Designing engaging plots with effective structure.",
        videoUrl: "https://example.com/plot-video.mp4",
        supportingMaterials: [
          { id: 5, name: "Plot Outline Templates.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Point of View", 
        type: "video", 
        description: "Exploring different narrative perspectives.",
        videoUrl: "https://example.com/pov-video.mp4",
        supportingMaterials: [
          { id: 6, name: "POV Analysis Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Show Don't Tell", 
        type: "video", 
        description: "Techniques for writing vivid, evocative scenes.",
        videoUrl: "https://example.com/show-tell-video.mp4",
        supportingMaterials: [
          { id: 7, name: "Descriptive Writing Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Writing in Different Genres", 
        type: "video", 
        description: "Understanding conventions across literary genres.",
        videoUrl: "https://example.com/genres-video.mp4",
        supportingMaterials: [
          { id: 8, name: "Genre Guidelines.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Conflict and Tension", 
        type: "video", 
        description: "Creating and sustaining tension in your narrative.",
        videoUrl: "https://example.com/conflict-video.mp4",
        supportingMaterials: [
          { id: 9, name: "Conflict Development Worksheet.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Editing and Revision", 
        type: "video", 
        description: "Refining your work through effective editing.",
        videoUrl: "https://example.com/editing-video.mp4",
        supportingMaterials: [
          { id: 10, name: "Self-Editing Checklist.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Finding Your Creative Voice", 
        type: "video", 
        description: "Developing your unique writing style and perspective.",
        videoUrl: "https://example.com/creative-voice-video.mp4",
        supportingMaterials: [
          { id: 11, name: "Writing Exercises.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Publishing and Sharing Your Work", 
        type: "video", 
        description: "Options for publishing and building an audience.",
        videoUrl: "https://example.com/publishing-video.mp4",
        supportingMaterials: [
          { id: 12, name: "Publishing Paths Guide.pdf", type: "pdf", url: "#" }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Business Management Fundamentals",
    description: "Essential principles of business management, leadership, and organizational behavior.",
    materials: [
      { 
        id: 1, 
        title: "Introduction to Management", 
        type: "video", 
        description: "Overview of management roles and responsibilities.",
        videoUrl: "https://example.com/intro-mgmt-video.mp4",
        supportingMaterials: [
          { id: 1, name: "Management Theory.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Strategic Planning", 
        type: "video", 
        description: "Developing and implementing effective business strategies.",
        videoUrl: "https://example.com/strategy-video.mp4",
        supportingMaterials: [
          { id: 2, name: "Strategic Planning Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Organizational Structure", 
        type: "video", 
        description: "Designing efficient organizational frameworks.",
        videoUrl: "https://example.com/org-structure-video.mp4",
        supportingMaterials: [
          { id: 3, name: "Org Chart Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Leadership Styles", 
        type: "video", 
        description: "Understanding different approaches to leadership.",
        videoUrl: "https://example.com/leadership-video.mp4",
        supportingMaterials: [
          { id: 4, name: "Leadership Assessment.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Team Building and Motivation", 
        type: "video", 
        description: "Creating high-performing teams in organizations.",
        videoUrl: "https://example.com/team-video.mp4",
        supportingMaterials: [
          { id: 5, name: "Team Building Activities.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Decision Making", 
        type: "video", 
        description: "Frameworks for effective business decisions.",
        videoUrl: "https://example.com/decision-video.mp4",
        supportingMaterials: [
          { id: 6, name: "Decision Matrix Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Financial Management", 
        type: "video", 
        description: "Understanding financial statements and budgeting.",
        videoUrl: "https://example.com/finance-video.mp4",
        supportingMaterials: [
          { id: 7, name: "Financial Analysis Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Marketing Management", 
        type: "video", 
        description: "Principles of effective marketing strategy.",
        videoUrl: "https://example.com/marketing-mgmt-video.mp4",
        supportingMaterials: [
          { id: 8, name: "Marketing Plan Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Operations Management", 
        type: "video", 
        description: "Optimizing business processes and operations.",
        videoUrl: "https://example.com/operations-video.mp4",
        supportingMaterials: [
          { id: 9, name: "Process Improvement Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Human Resources Management", 
        type: "video", 
        description: "Strategic approach to managing people in organizations.",
        videoUrl: "https://example.com/hr-video.mp4",
        supportingMaterials: [
          { id: 10, name: "HR Best Practices.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Change Management", 
        type: "video", 
        description: "Leading organizations through transitions and change.",
        videoUrl: "https://example.com/change-video.mp4",
        supportingMaterials: [
          { id: 11, name: "Change Management Framework.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Business Ethics and Corporate Social Responsibility", 
        type: "video", 
        description: "Ethical considerations in business management.",
        videoUrl: "https://example.com/ethics-mgmt-video.mp4",
        supportingMaterials: [
          { id: 12, name: "Ethics Policy Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Project Management", 
        type: "video", 
        description: "Planning, executing, and closing successful projects.",
        videoUrl: "https://example.com/project-video.mp4",
        supportingMaterials: [
          { id: 13, name: "Project Management Templates.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Quality Management", 
        type: "video", 
        description: "Implementing standards for consistent quality.",
        videoUrl: "https://example.com/quality-video.mp4",
        supportingMaterials: [
          { id: 14, name: "Quality Control Processes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Business Communication", 
        type: "video", 
        description: "Effective communication in professional environments.",
        videoUrl: "https://example.com/communication-video.mp4",
        supportingMaterials: [
          { id: 15, name: "Communication Templates.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Conflict Resolution", 
        type: "video", 
        description: "Strategies for managing workplace conflicts.",
        videoUrl: "https://example.com/conflict-mgmt-video.mp4",
        supportingMaterials: [
          { id: 16, name: "Conflict Resolution Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "Entrepreneurship", 
        type: "video", 
        description: "Building and growing successful business ventures.",
        videoUrl: "https://example.com/entrepreneur-video.mp4",
        supportingMaterials: [
          { id: 17, name: "Business Plan Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Global Business Management", 
        type: "video", 
        description: "Managing business across international boundaries.",
        videoUrl: "https://example.com/global-mgmt-video.mp4",
        supportingMaterials: [
          { id: 18, name: "Global Expansion Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 19, 
        title: "Strategic Leadership", 
        type: "video", 
        description: "Advanced leadership for organizational success.",
        videoUrl: "https://example.com/strategic-leadership-video.mp4",
        supportingMaterials: [
          { id: 19, name: "Leadership Development Plan.pdf", type: "pdf", url: "#" }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Introduction to Psychology",
    description: "Explore the human mind, behavior, and the fascinating science of psychology.",
    materials: [
      { 
        id: 1, 
        title: "History of Psychology", 
        type: "video", 
        description: "Evolution of psychological theories and approaches.",
        videoUrl: "https://example.com/psych-history-video.mp4",
        supportingMaterials: [
          { id: 1, name: "Psychology Timeline.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Research Methods in Psychology", 
        type: "video", 
        description: "Scientific approaches to studying behavior and mental processes.",
        videoUrl: "https://example.com/research-methods-video.mp4",
        supportingMaterials: [
          { id: 2, name: "Research Design Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Biological Foundations of Behavior", 
        type: "video", 
        description: "Brain structure, function, and influence on behavior.",
        videoUrl: "https://example.com/neuroscience-video.mp4",
        supportingMaterials: [
          { id: 3, name: "Brain Structure Diagrams.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Sensation and Perception", 
        type: "video", 
        description: "How we detect and interpret sensory information.",
        videoUrl: "https://example.com/perception-video.mp4",
        supportingMaterials: [
          { id: 4, name: "Sensory Systems Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Consciousness", 
        type: "video", 
        description: "Understanding states of awareness and consciousness.",
        videoUrl: "https://example.com/consciousness-video.mp4",
        supportingMaterials: [
          { id: 5, name: "Sleep Cycle Analysis.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Learning Theories", 
        type: "video", 
        description: "Classical and operant conditioning and observational learning.",
        videoUrl: "https://example.com/learning-video.mp4",
        supportingMaterials: [
          { id: 6, name: "Behavioral Theory Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Memory", 
        type: "video", 
        description: "How information is encoded, stored, and retrieved.",
        videoUrl: "https://example.com/memory-video.mp4",
        supportingMaterials: [
          { id: 7, name: "Memory Model Diagrams.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Thinking and Intelligence", 
        type: "video", 
        description: "Problem-solving, reasoning, and measures of intelligence.",
        videoUrl: "https://example.com/intelligence-video.mp4",
        supportingMaterials: [
          { id: 8, name: "Cognitive Processes Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Human Development", 
        type: "video", 
        description: "Physical, cognitive, and social changes across the lifespan.",
        videoUrl: "https://example.com/development-video.mp4",
        supportingMaterials: [
          { id: 9, name: "Developmental Stages Chart.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Motivation and Emotion", 
        type: "video", 
        description: "Theories of motivation and the nature of emotions.",
        videoUrl: "https://example.com/motivation-video.mp4",
        supportingMaterials: [
          { id: 10, name: "Emotion Recognition Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Personality Theories", 
        type: "video", 
        description: "Approaches to understanding personality and individual differences.",
        videoUrl: "https://example.com/personality-video.mp4",
        supportingMaterials: [
          { id: 11, name: "Personality Assessment Methods.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Social Psychology", 
        type: "video", 
        description: "How people think about, influence, and relate to others.",
        videoUrl: "https://example.com/social-psych-video.mp4",
        supportingMaterials: [
          { id: 12, name: "Social Influence Studies.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Stress and Health", 
        type: "video", 
        description: "Psychological aspects of stress and coping mechanisms.",
        videoUrl: "https://example.com/stress-video.mp4",
        supportingMaterials: [
          { id: 13, name: "Stress Management Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Psychological Disorders", 
        type: "video", 
        description: "Classification and understanding of mental disorders.",
        videoUrl: "https://example.com/disorders-video.mp4",
        supportingMaterials: [
          { id: 14, name: "DSM-5 Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Therapy and Treatment", 
        type: "video", 
        description: "Approaches to psychological treatment and intervention.",
        videoUrl: "https://example.com/therapy-video.mp4",
        supportingMaterials: [
          { id: 15, name: "Therapeutic Approaches Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Positive Psychology", 
        type: "video", 
        description: "Study of human flourishing and well-being.",
        videoUrl: "https://example.com/positive-psych-video.mp4",
        supportingMaterials: [
          { id: 16, name: "Well-being Assessment Tools.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "Cross-Cultural Psychology", 
        type: "video", 
        description: "Cultural influences on psychological processes.",
        videoUrl: "https://example.com/cultural-video.mp4",
        supportingMaterials: [
          { id: 17, name: "Cultural Comparison Studies.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Industrial-Organizational Psychology", 
        type: "video", 
        description: "Psychology applied to workplace settings.",
        videoUrl: "https://example.com/io-psych-video.mp4",
        supportingMaterials: [
          { id: 18, name: "Workplace Assessment Tools.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 19, 
        title: "Health Psychology", 
        type: "video", 
        description: "Psychological factors in health, illness, and healthcare.",
        videoUrl: "https://example.com/health-psych-video.mp4",
        supportingMaterials: [
          { id: 19, name: "Health Behavior Models.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 20, 
        title: "Cognitive Neuroscience", 
        type: "video", 
        description: "Brain activity associated with mental processes.",
        videoUrl: "https://example.com/cognitive-neuro-video.mp4",
        supportingMaterials: [
          { id: 20, name: "Brain Imaging Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 21, 
        title: "Psychology of Gender", 
        type: "video", 
        description: "Biological and social influences on gender development.",
        videoUrl: "https://example.com/gender-video.mp4",
        supportingMaterials: [
          { id: 21, name: "Gender Studies Research.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 22, 
        title: "Ethical Issues in Psychology", 
        type: "video", 
        description: "Ethical considerations in psychological research and practice.",
        videoUrl: "https://example.com/ethics-psych-video.mp4",
        supportingMaterials: [
          { id: 22, name: "Ethics Guidelines in Psychology.pdf", type: "pdf", url: "#" }
        ]
      }
    ]
  },
  // ... materials for the remaining courses (9-10) with appropriate number of lessons
]

// Helper function to get file icon based on type
const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-4 w-4 text-red-500" />
    case 'doc':
    case 'docx':
      return <FileText className="h-4 w-4 text-blue-500" />
    case 'ppt':
    case 'pptx':
      return <FileText className="h-4 w-4 text-orange-500" />
    case 'jpg':
    case 'png':
    case 'jpeg':
      return <ImageIcon className="h-4 w-4 text-purple-500" />
    default:
      return <File className="h-4 w-4 text-gray-500" />
  }
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const courseId = parseInt(params.id)
  
  // Try to get course data from local storage to handle newly created courses
  const [localCourses, setLocalCourses] = useState<any[]>([])
  
  useEffect(() => {
    // Check for courses saved in localStorage from the parent page
    try {
      const storedCourses = localStorage.getItem('eduverse_courses')
      if (storedCourses) {
        setLocalCourses(JSON.parse(storedCourses))
      }
    } catch (error) {
      console.error("Error loading courses from localStorage:", error)
    }
  }, [])
  
  // Find the course by ID from either mock data or localStorage
  const mockedCourse = mockCourses.find(c => c.id === courseId)
  const localCourse = localCourses.find(c => c.id === courseId)
  const course = mockedCourse || localCourse
  
  // State for the selected material and add material dialog
  const [selectedMaterial, setSelectedMaterial] = useState(
    course?.materials && course.materials.length > 0 ? course.materials[0] : null
  )
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)
  const [editedCourse, setEditedCourse] = useState({
    title: course?.title || "",
    description: course?.description || ""
  })
  const [newMaterial, setNewMaterial] = useState({ 
    title: "", 
    description: "", 
    videoFile: null,
    supportingMaterials: []
  })
  
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/teacher/courses')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push('/teacher/courses')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">{course.title}</h2>
        </div>
        
        <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>
                Make changes to your course information here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Course Title</Label>
                <Input 
                  id="edit-title" 
                  value={editedCourse.title} 
                  onChange={(e) => setEditedCourse({...editedCourse, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={editedCourse.description}
                  onChange={(e) => setEditedCourse({...editedCourse, description: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsEditCourseOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <p className="text-muted-foreground">{course.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Course Materials List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Course Materials</h3>
            <Dialog open={isAddMaterialOpen} onOpenChange={setIsAddMaterialOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Material
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Add New Course Material</DialogTitle>
                  <DialogDescription>
                    Upload a video and supporting materials for your course.
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Video Details</TabsTrigger>
                    <TabsTrigger value="files">Supporting Files</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4 py-4">
                    <div className="grid gap-3">
                      <Label htmlFor="video-title">Video Title</Label>
                      <Input 
                        id="video-title" 
                        value={newMaterial.title}
                        onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                        placeholder="Lesson title..." 
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="video-upload">Upload Video</Label>
                      <Input id="video-upload" type="file" accept="video/*" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="video-description">Description</Label>
                      <Textarea 
                        id="video-description" 
                        value={newMaterial.description}
                        onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                        placeholder="This video covers..." 
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="files" className="space-y-4 py-4">
                    <div className="grid gap-3">
                      <Label>Supporting Materials</Label>
                      <div className="border rounded-md p-3 bg-muted/50">
                        <div className="flex flex-col gap-2">
                          <Input type="file" multiple />
                          <p className="text-xs text-muted-foreground">
                            Upload PDFs, presentations, documents, or images to supplement your video.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <h4 className="text-sm font-medium mb-2">Uploaded Files</h4>
                      <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddMaterialOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add Material</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            {course.materials && course.materials.length > 0 ? (
              course.materials.map((material: any) => (
                <div 
                  key={material.id}
                  onClick={() => setSelectedMaterial(material)}
                  className={`
                    flex items-center p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0
                    ${selectedMaterial?.id === material.id ? 'bg-muted' : ''}
                  `}
                >
                  <Video className="h-5 w-5 mr-3 text-primary" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">{material.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {material.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="text-muted-foreground mb-2">No materials uploaded yet</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsAddMaterialOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Your First Material
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Video Preview and Details */}
        <div className="md:col-span-2 space-y-4">
          {selectedMaterial ? (
            <>
              <div className="border rounded-md overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center">
                  <video 
                    controls
                    className="w-full h-full"
                    poster="/placeholder-video.jpg"
                    src={selectedMaterial.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold">{selectedMaterial.title}</h3>
                  <p className="text-muted-foreground mt-1 mb-4 text-sm">{selectedMaterial.description}</p>
                  
                  <h4 className="font-medium text-sm mb-2">Supporting Materials</h4>
                  <div className="space-y-2">
                    {selectedMaterial.supportingMaterials.length > 0 ? (
                      selectedMaterial.supportingMaterials.map((file: any) => (
                        <div 
                          key={file.id}
                          className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50"
                        >
                          <div className="flex items-center">
                            {getFileIcon(file.type)}
                            <span className="ml-2 text-sm">{file.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No supporting materials available.</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] border rounded-md">
              <h3 className="text-base font-semibold">No Material Selected</h3>
              <p className="text-muted-foreground">
                {course.materials && course.materials.length > 0 
                  ? "Select a material from the list to view details." 
                  : "This course has no materials yet. Add your first material to get started."}
              </p>
              {(!course.materials || course.materials.length === 0) && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-4"
                  onClick={() => setIsAddMaterialOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Your First Material
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 