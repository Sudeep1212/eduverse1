# EduVerse - Next Generation Learning Management System

EduVerse is a modern Learning Management System (LMS) with AI features, designed to enhance the educational experience for both teachers and students. Built with Next.js, React, and Tailwind CSS, it offers a responsive and intuitive interface.

## Features

### For Teachers
- Course Management
- Test Scheduling
- Progress Tracking
- Collaborative Drawing Tools
- Chat/Comment System
- Announcements
- Calendar Integration

### For Students
- Course Access
- Test Taking
- Gamified Progress Tracking
- Hand Movement Recognition
- Review/Feedback System
- AI-Powered Roadmap Chatbot

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes (Dark/Light mode)
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eduverse.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── teacher/
│   │   └── student/
│   └── page.tsx
├── components/
│   ├── ui/
│   └── sidebar.tsx
└── lib/
    └── utils.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 