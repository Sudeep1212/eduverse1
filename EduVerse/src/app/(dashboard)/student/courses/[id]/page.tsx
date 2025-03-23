"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Video, FileText, ImageIcon, File, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Import the same mock data from the teacher course detail page
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
        title: "Linear Algebra", 
        type: "video", 
        description: "Vectors, matrices, and systems of linear equations.",
        videoUrl: "https://example.com/linear-algebra.mp4",
        supportingMaterials: [
          { id: 8, name: "Linear Algebra Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Trigonometry", 
        type: "video", 
        description: "Understanding sine, cosine, and other trigonometric functions.",
        videoUrl: "https://example.com/trigonometry.mp4",
        supportingMaterials: [
          { id: 9, name: "Trigonometry Formulas.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Set Theory", 
        type: "video", 
        description: "Introduction to sets, operations, and their applications.",
        videoUrl: "https://example.com/set-theory.mp4",
        supportingMaterials: [
          { id: 10, name: "Set Theory Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Mathematical Logic", 
        type: "video", 
        description: "Fundamentals of logical reasoning and proof techniques.",
        videoUrl: "https://example.com/math-logic.mp4",
        supportingMaterials: [
          { id: 11, name: "Logic Practice Questions.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Combinatorics", 
        type: "video", 
        description: "Counting techniques and permutations.",
        videoUrl: "https://example.com/combinatorics.mp4",
        supportingMaterials: [
          { id: 12, name: "Combinatorics Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Differential Equations", 
        type: "video", 
        description: "Solving first-order and second-order differential equations.",
        videoUrl: "https://example.com/differential-equations.mp4",
        supportingMaterials: [
          { id: 13, name: "Differential Equations Handbook.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Mathematical Modeling", 
        type: "video", 
        description: "Using mathematics to model real-world phenomena.",
        videoUrl: "https://example.com/math-modeling.mp4",
        supportingMaterials: [
          { id: 14, name: "Modeling Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Advanced Calculus", 
        type: "video", 
        description: "Multivariable calculus and advanced techniques.",
        videoUrl: "https://example.com/advanced-calculus.mp4",
        supportingMaterials: [
          { id: 15, name: "Advanced Calculus Problems.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Complex Numbers", 
        type: "video", 
        description: "Working with imaginary and complex numbers.",
        videoUrl: "https://example.com/complex-numbers.mp4",
        supportingMaterials: [
          { id: 16, name: "Complex Numbers Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Group Theory", 
        type: "video", 
        description: "Introduction to abstract algebraic structures.",
        videoUrl: "https://example.com/group-theory.mp4",
        supportingMaterials: [
          { id: 17, name: "Group Theory Basics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Mathematics of Finance", 
        type: "video", 
        description: "Applications of mathematics in finance and economics.",
        videoUrl: "https://example.com/math-finance.mp4",
        supportingMaterials: [
          { id: 18, name: "Financial Mathematics.pdf", type: "pdf", url: "#" }
        ]
      },
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
        description: "Electric fields, magnetic fields, and electromagnetic waves.",
        videoUrl: "https://example.com/em-video.mp4",
        supportingMaterials: [
          { id: 3, name: "Electromagnetic Theory.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Optics", 
        type: "video", 
        description: "Light, lenses, and optical phenomena.",
        videoUrl: "https://example.com/optics-video.mp4",
        supportingMaterials: [
          { id: 4, name: "Optics Handbook.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Fluid Mechanics", 
        type: "video", 
        description: "Behavior of fluids and fluid dynamics.",
        videoUrl: "https://example.com/fluid-video.mp4",
        supportingMaterials: [
          { id: 5, name: "Fluid Dynamics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Quantum Mechanics I", 
        type: "video", 
        description: "Introduction to quantum theory and wave-particle duality.",
        videoUrl: "https://example.com/quantum1-video.mp4",
        supportingMaterials: [
          { id: 6, name: "Quantum Mechanics Basics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Quantum Mechanics II", 
        type: "video", 
        description: "Advanced quantum concepts and the Schrödinger equation.",
        videoUrl: "https://example.com/quantum2-video.mp4",
        supportingMaterials: [
          { id: 7, name: "Quantum Problems.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Special Relativity", 
        type: "video", 
        description: "Einstein's theory of special relativity and its implications.",
        videoUrl: "https://example.com/special-relativity-video.mp4",
        supportingMaterials: [
          { id: 8, name: "Relativity Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "General Relativity", 
        type: "video", 
        description: "Gravity as spacetime curvature and cosmological implications.",
        videoUrl: "https://example.com/general-relativity-video.mp4",
        supportingMaterials: [
          { id: 9, name: "General Relativity Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Nuclear Physics", 
        type: "video", 
        description: "Atomic nuclei, radioactivity, and nuclear reactions.",
        videoUrl: "https://example.com/nuclear-video.mp4",
        supportingMaterials: [
          { id: 10, name: "Nuclear Physics Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Particle Physics", 
        type: "video", 
        description: "Fundamental particles, forces, and the Standard Model.",
        videoUrl: "https://example.com/particle-video.mp4",
        supportingMaterials: [
          { id: 11, name: "Particle Physics Handbook.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Astrophysics", 
        type: "video", 
        description: "Physics of stars, galaxies, and the universe.",
        videoUrl: "https://example.com/astrophysics-video.mp4",
        supportingMaterials: [
          { id: 12, name: "Stellar Evolution Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Solid State Physics", 
        type: "video", 
        description: "Properties of solids and condensed matter.",
        videoUrl: "https://example.com/solid-state-video.mp4",
        supportingMaterials: [
          { id: 13, name: "Solid State Reference.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Statistical Mechanics", 
        type: "video", 
        description: "Statistical approach to large systems of particles.",
        videoUrl: "https://example.com/stat-mech-video.mp4",
        supportingMaterials: [
          { id: 14, name: "Statistical Mechanics Formulas.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Computational Physics", 
        type: "video", 
        description: "Using computers to solve complex physics problems.",
        videoUrl: "https://example.com/computational-video.mp4",
        supportingMaterials: [
          { id: 15, name: "Computational Methods.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Acoustics", 
        type: "video", 
        description: "Sound waves, vibrations, and acoustic phenomena.",
        videoUrl: "https://example.com/acoustics-video.mp4",
        supportingMaterials: [
          { id: 16, name: "Acoustics Handbook.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "Plasma Physics", 
        type: "video", 
        description: "Properties and behavior of plasmas.",
        videoUrl: "https://example.com/plasma-video.mp4",
        supportingMaterials: [
          { id: 17, name: "Plasma Physics Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Biophysics", 
        type: "video", 
        description: "Physics applied to biological systems.",
        videoUrl: "https://example.com/biophysics-video.mp4",
        supportingMaterials: [
          { id: 18, name: "Biophysics Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 19, 
        title: "Chaos Theory", 
        type: "video", 
        description: "Nonlinear dynamics and chaotic systems.",
        videoUrl: "https://example.com/chaos-video.mp4",
        supportingMaterials: [
          { id: 19, name: "Chaos Theory Introduction.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 20, 
        title: "Semiconductor Physics", 
        type: "video", 
        description: "Physics of semiconductor materials and devices.",
        videoUrl: "https://example.com/semiconductor-video.mp4",
        supportingMaterials: [
          { id: 20, name: "Semiconductor Basics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 21, 
        title: "Experimental Methods", 
        type: "video", 
        description: "Laboratory techniques and experimental design in physics.",
        videoUrl: "https://example.com/experiment-video.mp4",
        supportingMaterials: [
          { id: 21, name: "Lab Manual.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 22, 
        title: "Materials Science", 
        type: "video", 
        description: "Properties and applications of materials.",
        videoUrl: "https://example.com/materials-video.mp4",
        supportingMaterials: [
          { id: 22, name: "Materials Science Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 23, 
        title: "Cosmology", 
        type: "video", 
        description: "Origin, evolution, and structure of the universe.",
        videoUrl: "https://example.com/cosmology-video.mp4",
        supportingMaterials: [
          { id: 23, name: "Cosmology Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 24, 
        title: "Quantum Field Theory", 
        type: "video", 
        description: "Advanced framework for quantum mechanics and particle physics.",
        videoUrl: "https://example.com/qft-video.mp4",
        supportingMaterials: [
          { id: 24, name: "QFT Fundamentals.pdf", type: "pdf", url: "#" }
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
        title: "Introduction to HTML", 
        type: "video", 
        description: "Understanding HTML tags and document structure.",
        videoUrl: "https://example.com/html-intro.mp4",
        supportingMaterials: [
          { id: 1, name: "HTML Cheatsheet.pdf", type: "pdf", url: "#" },
          { id: 2, name: "HTML Exercise Files.zip", type: "zip", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "HTML Forms and Tables", 
        type: "video", 
        description: "Creating interactive forms and data tables in HTML.",
        videoUrl: "https://example.com/html-forms.mp4",
        supportingMaterials: [
          { id: 3, name: "Forms Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "CSS Basics", 
        type: "video", 
        description: "Introduction to styling with Cascading Style Sheets.",
        videoUrl: "https://example.com/css-basics.mp4",
        supportingMaterials: [
          { id: 4, name: "CSS Reference.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "CSS Layout Techniques", 
        type: "video", 
        description: "Using Flexbox and Grid for responsive layouts.",
        videoUrl: "https://example.com/css-layout.mp4",
        supportingMaterials: [
          { id: 5, name: "Layout Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "CSS Animations", 
        type: "video", 
        description: "Creating engaging animations with CSS.",
        videoUrl: "https://example.com/css-animations.mp4",
        supportingMaterials: [
          { id: 6, name: "Animation Examples.zip", type: "zip", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "JavaScript Fundamentals", 
        type: "video", 
        description: "Core JavaScript syntax and concepts.",
        videoUrl: "https://example.com/js-fundamentals.mp4",
        supportingMaterials: [
          { id: 7, name: "JavaScript Handbook.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "DOM Manipulation", 
        type: "video", 
        description: "Interacting with the Document Object Model using JavaScript.",
        videoUrl: "https://example.com/dom-manipulation.mp4",
        supportingMaterials: [
          { id: 8, name: "DOM Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Event Handling", 
        type: "video", 
        description: "Working with browser events and user interactions.",
        videoUrl: "https://example.com/events.mp4",
        supportingMaterials: [
          { id: 9, name: "Event Handling Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Asynchronous JavaScript", 
        type: "video", 
        description: "Promises, async/await, and handling asynchronous operations.",
        videoUrl: "https://example.com/async-js.mp4",
        supportingMaterials: [
          { id: 10, name: "Async JavaScript.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Fetch API", 
        type: "video", 
        description: "Making HTTP requests and handling responses.",
        videoUrl: "https://example.com/fetch-api.mp4",
        supportingMaterials: [
          { id: 11, name: "API Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Responsive Web Design", 
        type: "video", 
        description: "Creating websites that work on all device sizes.",
        videoUrl: "https://example.com/responsive.mp4",
        supportingMaterials: [
          { id: 12, name: "Responsive Design Patterns.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "CSS Frameworks", 
        type: "video", 
        description: "Using Bootstrap and other CSS frameworks.",
        videoUrl: "https://example.com/css-frameworks.mp4",
        supportingMaterials: [
          { id: 13, name: "Bootstrap Cheatsheet.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "JavaScript Libraries", 
        type: "video", 
        description: "Introduction to jQuery and other useful libraries.",
        videoUrl: "https://example.com/js-libraries.mp4",
        supportingMaterials: [
          { id: 14, name: "jQuery Reference.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Web Accessibility", 
        type: "video", 
        description: "Creating inclusive websites for all users.",
        videoUrl: "https://example.com/accessibility.mp4",
        supportingMaterials: [
          { id: 15, name: "WCAG Guidelines.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "SEO Basics", 
        type: "video", 
        description: "Search engine optimization for web developers.",
        videoUrl: "https://example.com/seo-basics.mp4",
        supportingMaterials: [
          { id: 16, name: "SEO Checklist.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Web Performance", 
        type: "video", 
        description: "Optimizing websites for speed and efficiency.",
        videoUrl: "https://example.com/web-performance.mp4",
        supportingMaterials: [
          { id: 17, name: "Performance Tips.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "Version Control with Git", 
        type: "video", 
        description: "Managing code changes and collaborating with other developers.",
        videoUrl: "https://example.com/git-basics.mp4",
        supportingMaterials: [
          { id: 18, name: "Git Commands Cheatsheet.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Frontend Project", 
        type: "video", 
        description: "Building a complete website from scratch.",
        videoUrl: "https://example.com/frontend-project.mp4",
        supportingMaterials: [
          { id: 19, name: "Project Files.zip", type: "zip", url: "#" }
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
        description: "Overview of data science concepts, tools, and applications.",
        videoUrl: "https://example.com/data-science-intro.mp4",
        supportingMaterials: [
          { id: 1, name: "Data Science Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Python for Data Science", 
        type: "video", 
        description: "Essential Python programming for data analysis.",
        videoUrl: "https://example.com/python-ds.mp4",
        supportingMaterials: [
          { id: 2, name: "Python Basics.pdf", type: "pdf", url: "#" },
          { id: 3, name: "Python Examples.zip", type: "zip", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "NumPy Fundamentals", 
        type: "video", 
        description: "Working with numerical data using NumPy.",
        videoUrl: "https://example.com/numpy.mp4",
        supportingMaterials: [
          { id: 4, name: "NumPy Cheatsheet.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Pandas for Data Analysis", 
        type: "video", 
        description: "Data manipulation and analysis with Pandas.",
        videoUrl: "https://example.com/pandas.mp4",
        supportingMaterials: [
          { id: 5, name: "Pandas Reference.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Data Cleaning", 
        type: "video", 
        description: "Techniques for cleaning and preprocessing data.",
        videoUrl: "https://example.com/data-cleaning.mp4",
        supportingMaterials: [
          { id: 6, name: "Data Cleaning Examples.ipynb", type: "ipynb", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Exploratory Data Analysis", 
        type: "video", 
        description: "Techniques for understanding and visualizing data.",
        videoUrl: "https://example.com/eda.mp4",
        supportingMaterials: [
          { id: 7, name: "EDA Workshop.ipynb", type: "ipynb", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Data Visualization with Matplotlib", 
        type: "video", 
        description: "Creating effective charts and graphs.",
        videoUrl: "https://example.com/matplotlib.mp4",
        supportingMaterials: [
          { id: 8, name: "Visualization Examples.ipynb", type: "ipynb", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Advanced Visualization with Seaborn", 
        type: "video", 
        description: "Creating statistical visualizations with Seaborn.",
        videoUrl: "https://example.com/seaborn.mp4",
        supportingMaterials: [
          { id: 9, name: "Seaborn Gallery.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Statistical Analysis", 
        type: "video", 
        description: "Fundamental statistical methods for data science.",
        videoUrl: "https://example.com/statistics.mp4",
        supportingMaterials: [
          { id: 10, name: "Statistics Formulas.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Hypothesis Testing", 
        type: "video", 
        description: "Testing assumptions about data and drawing conclusions.",
        videoUrl: "https://example.com/hypothesis-testing.mp4",
        supportingMaterials: [
          { id: 11, name: "Hypothesis Testing Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Introduction to Machine Learning", 
        type: "video", 
        description: "Core concepts of machine learning and its applications.",
        videoUrl: "https://example.com/ml-intro.mp4",
        supportingMaterials: [
          { id: 12, name: "ML Fundamentals.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Supervised Learning", 
        type: "video", 
        description: "Classification and regression algorithms.",
        videoUrl: "https://example.com/supervised-learning.mp4",
        supportingMaterials: [
          { id: 13, name: "Supervised Learning Examples.ipynb", type: "ipynb", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Unsupervised Learning", 
        type: "video", 
        description: "Clustering and dimensionality reduction techniques.",
        videoUrl: "https://example.com/unsupervised-learning.mp4",
        supportingMaterials: [
          { id: 14, name: "Unsupervised Learning Workshop.ipynb", type: "ipynb", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Model Evaluation", 
        type: "video", 
        description: "Metrics and techniques for evaluating model performance.",
        videoUrl: "https://example.com/model-evaluation.mp4",
        supportingMaterials: [
          { id: 15, name: "Evaluation Metrics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Feature Engineering", 
        type: "video", 
        description: "Creating effective features for machine learning models.",
        videoUrl: "https://example.com/feature-engineering.mp4",
        supportingMaterials: [
          { id: 16, name: "Feature Engineering Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Deep Learning Fundamentals", 
        type: "video", 
        description: "Introduction to neural networks and deep learning.",
        videoUrl: "https://example.com/deep-learning.mp4",
        supportingMaterials: [
          { id: 17, name: "Neural Networks Basics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "Natural Language Processing", 
        type: "video", 
        description: "Working with text data in machine learning.",
        videoUrl: "https://example.com/nlp.mp4",
        supportingMaterials: [
          { id: 18, name: "NLP Examples.ipynb", type: "ipynb", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Computer Vision Basics", 
        type: "video", 
        description: "Working with image data in machine learning.",
        videoUrl: "https://example.com/computer-vision.mp4",
        supportingMaterials: [
          { id: 19, name: "Image Processing Examples.ipynb", type: "ipynb", url: "#" }
        ]
      },
      { 
        id: 19, 
        title: "Time Series Analysis", 
        type: "video", 
        description: "Analyzing sequential data and making predictions.",
        videoUrl: "https://example.com/time-series.mp4",
        supportingMaterials: [
          { id: 20, name: "Time Series Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 20, 
        title: "Big Data Processing", 
        type: "video", 
        description: "Working with large datasets using Spark and other tools.",
        videoUrl: "https://example.com/big-data.mp4",
        supportingMaterials: [
          { id: 21, name: "Big Data Framework Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 21, 
        title: "Data Science Project", 
        type: "video", 
        description: "End-to-end data science project from data to insights.",
        videoUrl: "https://example.com/ds-project.mp4",
        supportingMaterials: [
          { id: 22, name: "Project Dataset.csv", type: "csv", url: "#" },
          { id: 23, name: "Project Notebook.ipynb", type: "ipynb", url: "#" }
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
        videoUrl: "https://example.com/digital-marketing-intro.mp4",
        supportingMaterials: [
          { id: 1, name: "Digital Marketing Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Content Marketing", 
        type: "video", 
        description: "Creating valuable content to attract and engage your audience.",
        videoUrl: "https://example.com/content-marketing.mp4",
        supportingMaterials: [
          { id: 2, name: "Content Strategy Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Search Engine Optimization (SEO)", 
        type: "video", 
        description: "Improving your website's visibility in search engine results.",
        videoUrl: "https://example.com/seo.mp4",
        supportingMaterials: [
          { id: 3, name: "SEO Checklist.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Search Engine Marketing (SEM)", 
        type: "video", 
        description: "Paid advertising strategies for search engines.",
        videoUrl: "https://example.com/sem.mp4",
        supportingMaterials: [
          { id: 4, name: "SEM Best Practices.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Social Media Marketing", 
        type: "video", 
        description: "Using social platforms to connect with your audience.",
        videoUrl: "https://example.com/social-media.mp4",
        supportingMaterials: [
          { id: 5, name: "Social Media Strategy.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Email Marketing", 
        type: "video", 
        description: "Building email campaigns that convert.",
        videoUrl: "https://example.com/email-marketing.mp4",
        supportingMaterials: [
          { id: 6, name: "Email Templates.zip", type: "zip", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Influencer Marketing", 
        type: "video", 
        description: "Partnering with influencers to reach new audiences.",
        videoUrl: "https://example.com/influencer-marketing.mp4",
        supportingMaterials: [
          { id: 7, name: "Influencer Outreach Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Affiliate Marketing", 
        type: "video", 
        description: "Creating partnership programs to expand your reach.",
        videoUrl: "https://example.com/affiliate-marketing.mp4",
        supportingMaterials: [
          { id: 8, name: "Affiliate Program Setup.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Mobile Marketing", 
        type: "video", 
        description: "Strategies for reaching users on mobile devices.",
        videoUrl: "https://example.com/mobile-marketing.mp4",
        supportingMaterials: [
          { id: 9, name: "Mobile Marketing Tactics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Video Marketing", 
        type: "video", 
        description: "Creating engaging video content for your brand.",
        videoUrl: "https://example.com/video-marketing.mp4",
        supportingMaterials: [
          { id: 10, name: "Video Production Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Analytics and Data", 
        type: "video", 
        description: "Using data to measure and improve your marketing efforts.",
        videoUrl: "https://example.com/marketing-analytics.mp4",
        supportingMaterials: [
          { id: 11, name: "Analytics Setup Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Conversion Rate Optimization", 
        type: "video", 
        description: "Improving your website to convert more visitors into customers.",
        videoUrl: "https://example.com/cro.mp4",
        supportingMaterials: [
          { id: 12, name: "CRO Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Content Strategy", 
        type: "video", 
        description: "Planning and developing content that achieves business goals.",
        videoUrl: "https://example.com/content-strategy.mp4",
        supportingMaterials: [
          { id: 13, name: "Content Calendar Template.xlsx", type: "xlsx", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Marketing Automation", 
        type: "video", 
        description: "Tools and tactics for automating your marketing workflows.",
        videoUrl: "https://example.com/marketing-automation.mp4",
        supportingMaterials: [
          { id: 14, name: "Automation Workflow Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Digital Marketing Campaign", 
        type: "video", 
        description: "Building an integrated digital marketing campaign from scratch.",
        videoUrl: "https://example.com/marketing-campaign.mp4",
        supportingMaterials: [
          { id: 15, name: "Campaign Blueprint.pdf", type: "pdf", url: "#" }
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
        title: "Introduction to Creative Writing", 
        type: "video", 
        description: "Understanding the creative writing process and different genres.",
        videoUrl: "https://example.com/creative-writing-intro.mp4",
        supportingMaterials: [
          { id: 1, name: "Creative Writing Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Character Development", 
        type: "video", 
        description: "Creating compelling and believable characters.",
        videoUrl: "https://example.com/character-development.mp4",
        supportingMaterials: [
          { id: 2, name: "Character Worksheet.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Plot and Structure", 
        type: "video", 
        description: "Crafting engaging plots with strong structures.",
        videoUrl: "https://example.com/plot-structure.mp4",
        supportingMaterials: [
          { id: 3, name: "Plot Outline Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Setting and World-Building", 
        type: "video", 
        description: "Creating vivid and immersive environments for your stories.",
        videoUrl: "https://example.com/world-building.mp4",
        supportingMaterials: [
          { id: 4, name: "World-Building Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Dialogue and Voice", 
        type: "video", 
        description: "Writing authentic dialogue and developing unique character voices.",
        videoUrl: "https://example.com/dialogue.mp4",
        supportingMaterials: [
          { id: 5, name: "Dialogue Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Point of View", 
        type: "video", 
        description: "Understanding and using different narrative perspectives.",
        videoUrl: "https://example.com/pov.mp4",
        supportingMaterials: [
          { id: 6, name: "POV Examples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Show, Don't Tell", 
        type: "video", 
        description: "Using descriptive techniques to engage readers.",
        videoUrl: "https://example.com/show-dont-tell.mp4",
        supportingMaterials: [
          { id: 7, name: "Descriptive Writing Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Revision and Editing", 
        type: "video", 
        description: "Techniques for refining and polishing your writing.",
        videoUrl: "https://example.com/revision.mp4",
        supportingMaterials: [
          { id: 8, name: "Editing Checklist.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Short Story Writing", 
        type: "video", 
        description: "Crafting complete and impactful short stories.",
        videoUrl: "https://example.com/short-story.mp4",
        supportingMaterials: [
          { id: 9, name: "Short Story Samples.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Novel Writing", 
        type: "video", 
        description: "Planning and structuring longer narratives.",
        videoUrl: "https://example.com/novel-writing.mp4",
        supportingMaterials: [
          { id: 10, name: "Novel Outline Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Poetry", 
        type: "video", 
        description: "Exploring poetic forms and techniques.",
        videoUrl: "https://example.com/poetry.mp4",
        supportingMaterials: [
          { id: 11, name: "Poetry Forms Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Creative Non-Fiction", 
        type: "video", 
        description: "Writing true stories with creative techniques.",
        videoUrl: "https://example.com/creative-nonfiction.mp4",
        supportingMaterials: [
          { id: 12, name: "Creative Non-Fiction Examples.pdf", type: "pdf", url: "#" }
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
        description: "Core principles and functions of management.",
        videoUrl: "https://example.com/management-intro.mp4",
        supportingMaterials: [
          { id: 1, name: "Management Basics.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Leadership Styles", 
        type: "video", 
        description: "Different approaches to leadership and their effectiveness.",
        videoUrl: "https://example.com/leadership-styles.mp4",
        supportingMaterials: [
          { id: 2, name: "Leadership Assessment.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Organizational Behavior", 
        type: "video", 
        description: "Understanding human behavior in organizational settings.",
        videoUrl: "https://example.com/org-behavior.mp4",
        supportingMaterials: [
          { id: 3, name: "Organizational Behavior Notes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Strategic Planning", 
        type: "video", 
        description: "Developing and implementing business strategies.",
        videoUrl: "https://example.com/strategic-planning.mp4",
        supportingMaterials: [
          { id: 4, name: "Strategic Plan Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Decision Making", 
        type: "video", 
        description: "Frameworks and techniques for effective decision making.",
        videoUrl: "https://example.com/decision-making.mp4",
        supportingMaterials: [
          { id: 5, name: "Decision Matrix Template.xlsx", type: "xlsx", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Human Resource Management", 
        type: "video", 
        description: "Managing people and HR processes.",
        videoUrl: "https://example.com/hrm.mp4",
        supportingMaterials: [
          { id: 6, name: "HR Best Practices.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Marketing Management", 
        type: "video", 
        description: "Core marketing concepts for business managers.",
        videoUrl: "https://example.com/marketing-management.mp4",
        supportingMaterials: [
          { id: 7, name: "Marketing Plan Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Financial Management", 
        type: "video", 
        description: "Financial principles for business decision making.",
        videoUrl: "https://example.com/financial-management.mp4",
        supportingMaterials: [
          { id: 8, name: "Financial Analysis Template.xlsx", type: "xlsx", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Operations Management", 
        type: "video", 
        description: "Managing business processes and operations.",
        videoUrl: "https://example.com/operations-management.mp4",
        supportingMaterials: [
          { id: 9, name: "Operations Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Project Management", 
        type: "video", 
        description: "Planning, executing, and controlling projects.",
        videoUrl: "https://example.com/project-management.mp4",
        supportingMaterials: [
          { id: 10, name: "Project Management Templates.zip", type: "zip", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Change Management", 
        type: "video", 
        description: "Leading organizations through change and transition.",
        videoUrl: "https://example.com/change-management.mp4",
        supportingMaterials: [
          { id: 11, name: "Change Management Framework.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Business Ethics", 
        type: "video", 
        description: "Ethical considerations in business decision making.",
        videoUrl: "https://example.com/business-ethics.mp4",
        supportingMaterials: [
          { id: 12, name: "Ethics Case Studies.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Corporate Social Responsibility", 
        type: "video", 
        description: "Balancing profit with social and environmental responsibility.",
        videoUrl: "https://example.com/csr.mp4",
        supportingMaterials: [
          { id: 13, name: "CSR Framework.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Entrepreneurship", 
        type: "video", 
        description: "Starting and growing businesses.",
        videoUrl: "https://example.com/entrepreneurship.mp4",
        supportingMaterials: [
          { id: 14, name: "Business Plan Template.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Negotiation Skills", 
        type: "video", 
        description: "Effective techniques for business negotiations.",
        videoUrl: "https://example.com/negotiation.mp4",
        supportingMaterials: [
          { id: 15, name: "Negotiation Strategies.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Team Building", 
        type: "video", 
        description: "Creating and managing effective teams.",
        videoUrl: "https://example.com/team-building.mp4",
        supportingMaterials: [
          { id: 16, name: "Team Development Exercises.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "Global Business", 
        type: "video", 
        description: "Managing business across cultures and borders.",
        videoUrl: "https://example.com/global-business.mp4",
        supportingMaterials: [
          { id: 17, name: "International Business Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Supply Chain Management", 
        type: "video", 
        description: "Managing the flow of goods and services.",
        videoUrl: "https://example.com/supply-chain.mp4",
        supportingMaterials: [
          { id: 18, name: "Supply Chain Optimization.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 19, 
        title: "Business Analysis", 
        type: "video", 
        description: "Techniques for analyzing business processes and needs.",
        videoUrl: "https://example.com/business-analysis.mp4",
        supportingMaterials: [
          { id: 19, name: "Analysis Tools Guide.pdf", type: "pdf", url: "#" }
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
        title: "What is Psychology?", 
        type: "video", 
        description: "An overview of the field of psychology and its major areas.",
        videoUrl: "https://example.com/psychology-intro.mp4",
        supportingMaterials: [
          { id: 1, name: "Psychology Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 2, 
        title: "Research Methods", 
        type: "video", 
        description: "How psychologists study behavior and mental processes.",
        videoUrl: "https://example.com/research-methods.mp4",
        supportingMaterials: [
          { id: 2, name: "Research Methods Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 3, 
        title: "Biological Basis of Behavior", 
        type: "video", 
        description: "How the brain and nervous system influence our thoughts and actions.",
        videoUrl: "https://example.com/biopsychology.mp4",
        supportingMaterials: [
          { id: 3, name: "Brain Structure Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 4, 
        title: "Sensation and Perception", 
        type: "video", 
        description: "How we sense and interpret information from the world around us.",
        videoUrl: "https://example.com/sensation-perception.mp4",
        supportingMaterials: [
          { id: 4, name: "Perception Activities.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 5, 
        title: "Consciousness", 
        type: "video", 
        description: "Understanding different states of awareness, including sleep and hypnosis.",
        videoUrl: "https://example.com/consciousness.mp4",
        supportingMaterials: [
          { id: 5, name: "Sleep Stages Diagram.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 6, 
        title: "Learning", 
        type: "video", 
        description: "Classical conditioning, operant conditioning, and observational learning.",
        videoUrl: "https://example.com/learning.mp4",
        supportingMaterials: [
          { id: 6, name: "Learning Theory Summary.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 7, 
        title: "Memory", 
        type: "video", 
        description: "How we encode, store, and retrieve information.",
        videoUrl: "https://example.com/memory.mp4",
        supportingMaterials: [
          { id: 7, name: "Memory Enhancement Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 8, 
        title: "Thinking and Intelligence", 
        type: "video", 
        description: "Problem-solving, decision-making, and theories of intelligence.",
        videoUrl: "https://example.com/thinking.mp4",
        supportingMaterials: [
          { id: 8, name: "Critical Thinking Exercises.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 9, 
        title: "Motivation and Emotion", 
        type: "video", 
        description: "What drives behavior and how we experience and express emotions.",
        videoUrl: "https://example.com/motivation-emotion.mp4",
        supportingMaterials: [
          { id: 9, name: "Maslow's Hierarchy Visual.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 10, 
        title: "Development", 
        type: "video", 
        description: "How people grow and change throughout the lifespan.",
        videoUrl: "https://example.com/development.mp4",
        supportingMaterials: [
          { id: 10, name: "Development Theories.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 11, 
        title: "Personality", 
        type: "video", 
        description: "Theories explaining the consistent patterns in how people think and behave.",
        videoUrl: "https://example.com/personality.mp4",
        supportingMaterials: [
          { id: 11, name: "Personality Assessment.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 12, 
        title: "Psychological Disorders", 
        type: "video", 
        description: "Understanding abnormal behavior and mental health conditions.",
        videoUrl: "https://example.com/disorders.mp4",
        supportingMaterials: [
          { id: 12, name: "DSM-5 Overview.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 13, 
        title: "Therapy", 
        type: "video", 
        description: "Approaches to treating psychological disorders.",
        videoUrl: "https://example.com/therapy.mp4",
        supportingMaterials: [
          { id: 13, name: "Therapy Approaches Comparison.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 14, 
        title: "Social Psychology", 
        type: "video", 
        description: "How our thoughts, feelings, and behaviors are influenced by others.",
        videoUrl: "https://example.com/social-psych.mp4",
        supportingMaterials: [
          { id: 14, name: "Classic Social Psychology Experiments.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 15, 
        title: "Health Psychology", 
        type: "video", 
        description: "Psychological factors in health, illness, and wellness.",
        videoUrl: "https://example.com/health-psych.mp4",
        supportingMaterials: [
          { id: 15, name: "Stress Management Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 16, 
        title: "Industrial-Organizational Psychology", 
        type: "video", 
        description: "Psychology applied to the workplace.",
        videoUrl: "https://example.com/io-psych.mp4",
        supportingMaterials: [
          { id: 16, name: "Workplace Psychology Guide.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 17, 
        title: "Educational Psychology", 
        type: "video", 
        description: "How psychological principles apply to education and learning.",
        videoUrl: "https://example.com/ed-psych.mp4",
        supportingMaterials: [
          { id: 17, name: "Learning Strategies.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 18, 
        title: "Cultural Psychology", 
        type: "video", 
        description: "How culture shapes our thinking and behavior.",
        videoUrl: "https://example.com/cultural-psych.mp4",
        supportingMaterials: [
          { id: 18, name: "Cross-Cultural Perspectives.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 19, 
        title: "Sports Psychology", 
        type: "video", 
        description: "Psychological factors in athletic performance and exercise.",
        videoUrl: "https://example.com/sports-psych.mp4",
        supportingMaterials: [
          { id: 19, name: "Mental Training for Athletes.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 20, 
        title: "Positive Psychology", 
        type: "video", 
        description: "The study of human flourishing and well-being.",
        videoUrl: "https://example.com/positive-psych.mp4",
        supportingMaterials: [
          { id: 20, name: "Happiness and Well-being Exercises.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 21, 
        title: "Cognitive Neuroscience", 
        type: "video", 
        description: "The study of brain mechanisms underlying cognition.",
        videoUrl: "https://example.com/cognitive-neurosci.mp4",
        supportingMaterials: [
          { id: 21, name: "Brain Imaging Techniques.pdf", type: "pdf", url: "#" }
        ]
      },
      { 
        id: 22, 
        title: "Evolutionary Psychology", 
        type: "video", 
        description: "How evolution has shaped human behavior and mental processes.",
        videoUrl: "https://example.com/evolutionary-psych.mp4",
        supportingMaterials: [
          { id: 22, name: "Evolutionary Psychology Principles.pdf", type: "pdf", url: "#" }
        ]
      }
    ]
  }
]

// Helper function to get file icon based on type (same as in teacher version)
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

export default function StudentCourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const courseId = parseInt(params.id)
  
  // Try to get course data from local storage (shares data with teacher section)
  const [localCourses, setLocalCourses] = useState<any[]>([])
  
  useEffect(() => {
    // Check for courses saved in localStorage
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
  
  // State for the selected material - but no editing state needed
  const [selectedMaterial, setSelectedMaterial] = useState(
    course?.materials && course.materials.length > 0 ? course.materials[0] : null
  )
  
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist or you're not enrolled.</p>
        <Button onClick={() => router.push('/student/courses')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push('/student/courses')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-2xl font-bold tracking-tight ml-2">{course.title}</h2>
      </div>
      
      <p className="text-muted-foreground">{course.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Course Materials List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Course Materials</h3>
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
                <p className="text-muted-foreground">No materials available for this course yet.</p>
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
                    {selectedMaterial.supportingMaterials && selectedMaterial.supportingMaterials.length > 0 ? (
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
              <p className="text-muted-foreground">Select a material from the list to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 