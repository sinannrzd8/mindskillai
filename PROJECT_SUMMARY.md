# MindSkillAI Project Summary

## Project Overview
MindSkillAI is a comprehensive learning management platform built with React, TypeScript, and Tailwind CSS. It combines skill assessment, mentorship, and community features with an integrated chatbot.

## Key Features
- **Dashboard**: Personalized user dashboards with skill tracking
- **Chat Integration**: Built-in chatbot for learning assistance
- **Skill Analysis**: Track and analyze skill development
- **Mentorship Program**: Connect learners with mentors
- **Employer Portal**: For hiring and skill recommendations
- **Admin Dashboard**: Management and analytics
- **Certifications**: Issue and track certifications
- **Emotional Analytics**: Track emotional well-being alongside learning
- **Community**: Social learning features
- **Meetings/Sessions**: Schedule learning sessions
- **Notifications**: Real-time user notifications

## Technology Stack
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Testing**: Vitest
- **Router**: React Router
- **Package Manager**: Bun
- **i18n**: react-i18next (for multi-language support)

## Project Structure
```
src/
├── pages/           # Page components (Dashboard, Landing, etc.)
├── components/      # Reusable components
│   ├── ui/         # shadcn/ui component library
│   ├── chat/       # Chat widget and related
│   └── [others]    # Layout, navigation components
├── hooks/          # Custom React hooks (useChat, use-mobile, etc.)
├── contexts/       # React Context (Auth)
├── lib/            # Utilities and helpers
│   ├── chatApi.ts  # Chat API integration
│   ├── database.ts # Database utilities
│   ├── utils.ts    # General utilities
└── test/           # Test files
```

## Recent Fixes
- Fixed duplicate closing tags in Navbar.tsx component

## Next Steps
1. Install dependencies using Bun
2. Set up backend API integration (see CHATBOT_BACKEND_INTEGRATION.md)
3. Configure authentication flow
4. Test all pages and components
5. Deploy to production

## Development Commands
- `bun install` - Install dependencies
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run test` - Run tests
- `bun run lint` - Run linter

## Notes
- LanguageSwitcher component exists for multi-language support
- AuthContext provides authentication state management
- Chat integration uses custom hook (useChat)
- Protected routes implemented for secure pages
