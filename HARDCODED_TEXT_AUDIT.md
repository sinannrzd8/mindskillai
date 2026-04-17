# Comprehensive Code Audit: Hardcoded English Text
## MindSkill AI React Application

**Audit Date:** April 17, 2026  
**Purpose:** Identify all hardcoded English text requiring translation  
**Status:** Complete audit of all page and component files

---

## Executive Summary

This audit has identified **420+ instances** of hardcoded English text across the application that should be translated. The text is organized by file and includes line numbers, exact text snippets, and component context.

---

## PAGES (src/pages/)

### pages/LandingPage.tsx

| Line | Text | Context |
|------|------|---------|
| 8 | "AI Adaptive Learning" | Feature title |
| 8 | "Dynamically adjusts difficulty and content based on your performance and emotional state." | Feature description |
| 9 | "Emotional Intelligence" | Feature title |
| 9 | "Track mood, stress, and motivation. Get personalized wellness recommendations." | Feature description |
| 10 | "Skill Gap Analysis" | Feature title |
| 10 | "Advanced radar analytics showing exactly what you need to learn for your dream career." | Feature description |
| 11 | "Micro-Certifications" | Feature title |
| 11 | "Earn verified, shareable certificates with QR codes as you complete modules." | Feature description |
| 12 | "Mentorship Hub" | Feature title |
| 12 | "Connect with expert mentors, join study groups, and collaborate on projects." | Feature description |
| 13 | "Career Readiness Score" | Feature title |
| 13 | "AI-powered employability index combining technical, soft skills, and resilience." | Feature description |
| 17 | "Set Your Goals" | Step 1 title |
| 17 | "Choose your dream career path and complete a quick assessment." | Step 1 description |
| 18 | "AI Analyzes You" | Step 2 title |
| 18 | "Our AI maps your skills, gaps, and emotional baseline to build your roadmap." | Step 2 description |
| 19 | "Learn Adaptively" | Step 3 title |
| 19 | "Study at your own pace with content that adapts to how you think and feel." | Step 3 description |
| 24 | "Active Learners" | Stat label |
| 25 | "Completion Rate" | Stat label |
| 26 | "Faster Learning" | Stat label |
| 27 | "Certifications" | Stat label |
| 30 | "Sarah Chen" | Testimonial author |
| 30 | "Frontend Developer at Stripe" | Testimonial role |
| 30 | "MindSkill AI detected my burnout before I did. The adaptive pacing literally saved my learning journey." | Testimonial text |
| 31 | "Marcus Johnson" | Testimonial author |
| 31 | "Data Scientist at Spotify" | Testimonial role |
| 31 | "The skill gap analysis showed me exactly where to focus. I went from beginner to job-ready in 4 months." | Testimonial text |
| 32 | "Priya Patel" | Testimonial author |
| 32 | "Product Manager at Notion" | Testimonial role |
| 32 | "The emotional intelligence features are a game-changer. Learning feels human again." | Testimonial text |
| 53 | "Now in Public Beta" | Badge text |
| 55 | "Learning That" | Hero title |
| 56 | "Understands You." | Hero title (gradient) |
| 58 | "The first AI-powered learning platform that adapts to both your skills and your emotional state. Learn faster, avoid burnout, and become career-ready." | Hero subtitle |
| 64 | "Start Free Trial" | Primary CTA button |
| 66 | "See How It Works" | Secondary CTA button |
| 70 | "No credit card required" | Trust statement |
| 72 | "14-day free trial" | Trust statement |
| 83-89 | "Career Readiness", "Emotional State", "Learning Streak" | Dashboard preview labels |
| 84 | "82" (with "/100") | Career readiness score |
| 86 | "Good" | Emotional state |
| 88 | "14" (with "days") | Streak count |

---

### pages/LoginPage.tsx

| Line | Text | Context |
|------|------|---------|
| 72 | {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"} | Toggle text |
| 185 | "Demo Credentials" | Section header |
| 186 | "Students" | Demo credentials label |
| 186 | "Teachers" | Demo credentials label |
| 186 | "Admins" | Demo credentials label |
| 189 | (Demo email examples - handled via translation keys in `t()`) | Credentials display |

---

### pages/OnboardingPage.tsx

| Line | Text | Context |
|------|------|---------|
| 9 | "Frontend Developer" | Career path option |
| 10 | "Backend Developer" | Career path option |
| 11 | "UI/UX Designer" | Career path option |
| 12 | "Data Scientist" | Career path option |
| 13 | "Product Manager" | Career path option |
| 14 | "Cybersecurity Analyst" | Career path option |
| 15 | "Marketing Specialist" | Career path option |
| 18 | "How comfortable are you with JavaScript?" | Quiz question 1 |
| 18 | "Beginner", "Intermediate", "Advanced", "Expert" | Quiz options |
| 19 | "How familiar are you with React or similar frameworks?" | Quiz question 2 |
| 19 | "Never used", "Basic knowledge", "Built projects", "Production experience" | Quiz options |
| 20 | "How would you rate your CSS/design skills?" | Quiz question 3 |
| 20 | "Minimal", "Can build layouts", "Responsive designs", "Advanced animations" | Quiz options |
| 23 | "Motivation" | Emotional question 1 |
| 24 | "Confidence" | Emotional question 2 |
| 25 | "Stress Level" | Emotional question 3 |
| 26 | "Energy" | Emotional question 4 |
| 27 | "Focus" | Emotional question 5 |
| 71 | "Welcome to MindSkill AI" | Step 0 heading |
| 72 | "We're about to create a personalized learning experience that adapts to both your skills and how you feel." | Step 0 subtitle |
| 74 | "AI-powered skill analysis" | Benefit 1 |
| 75 | "Emotional wellness tracking" | Benefit 2 |
| 76 | "Personalized career roadmap" | Benefit 3 |
| 81 | "Choose Your Career Path" | Step 1 heading |
| 82 | "What role are you working towards?" | Step 1 subtitle |
| 97 | "Technical Assessment" | Step 2 heading |
| 98 | "Let's understand your current skill level." | Step 2 subtitle |
| 114 | "Emotional Baseline" | Step 3 heading |
| 115 | "How are you feeling right now? This helps us personalize your experience." | Step 3 subtitle |

---

### pages/AboutPage.tsx

| Line | Text | Context |
|------|------|---------|
| 6 | "AI-First" | Value title |
| 6 | "Every feature is powered by intelligent algorithms that learn and adapt." | Value description |
| 7 | "Human-Centered" | Value title |
| 7 | "Technology should serve emotional wellbeing, not just productivity." | Value description |
| 8 | "Outcome-Driven" | Value title |
| 8 | "We measure success by career outcomes, not just course completions." | Value description |
| 9 | "Accessible" | Value title |
| 9 | "Quality education should be available to everyone, everywhere." | Value description |
| 13 | "Dr. Elena Volkov" | Team member name |
| 13 | "CEO & Co-Founder" | Team member role |
| 14 | "Marcus Chen" | Team member name |
| 14 | "CTO & Co-Founder" | Team member role |
| 15 | "Sarah Kim" | Team member name |
| 15 | "VP of Product" | Team member role |
| 16 | "James Okafor" | Team member name |
| 16 | "Head of AI Research" | Team member role |
| 30 | "ABOUT US" | Section label |
| 31 | "Building the Future of" | Heading part 1 |
| 31 | "Adaptive Education" | Heading part 2 (gradient) |
| 32-34 | "MindSkill AI was founded on a simple belief: learning should understand the whole person—not just what they know, but how they feel. We're on a mission to make education more human through artificial intelligence." | Company mission |
| 49 | "Our" | Team section heading part 1 |
| 49 | "Team" | Team section heading part 2 (gradient) |

---

### pages/AdminDashboard.tsx

| Line | Text | Context |
|------|------|---------|
| 66 | "Administrator" | Role label |
| 67 | "Admin Dashboard" | Page heading |
| 68 | "Manage users, track teacher and student ratings, and review platform performance in one central workspace." | Page subtitle |
| 73 | "Search teachers or students" | Search placeholder |
| 74 | "Refresh" | Button label |
| 79 | "Total Users" | Card title |
| 82 | "Count of all active teachers and students." | Card description |
| 85 | "Teacher Rating" | Card title |
| 92 | "Average rating across all teachers." | Card description |
| 95 | "All Teachers" | Card title |
| 98 | "Profiles with full mentorship access." | Card description |
| 106 | "Teacher Reputation" | Section title |
| 119 | "No teachers match your search." | Empty state |
| 137 | "reviews" | Review count label |
| 144 | "Students Overview" | Section title |
| 151 | "No students match your search." | Empty state |
| 157 | "evaluations" | Review count label |

---

### pages/DashboardPage.tsx

| Line | Text | Context |
|------|------|---------|
| 36 | "Good Morning, Alex 👋" | Greeting |
| 37 | "Here's your learning overview for today." | Subtitle |
| 42-45 | Card metrics: "Career Readiness", "Emotional State", "Learning Streak", "Total XP" | Dashboard card labels |
| 55 | "Emotional Trends" | Chart title |
| 56 | "This Week" | Time period label |
| 62 | "Skill Overview" | Chart title |
| 63 | "Current Level" | Time period label |
| 75 | "Today's AI Adaptive Recommendations" | Section title |
| 80 | "Take a lighter lesson today — your stress is slightly elevated." | Recommendation text |
| 81 | "Great energy! Try the advanced React challenge module." | Recommendation text |
| 82 | "Your motivation is trending up! Keep the momentum." | Recommendation text |
| 91 | "Career Readiness Breakdown" | Section title |
| 109 | "Job Ready" | Status label |
| 117 | "Technical Skills" | Breakdown component |
| 118 | "Soft Skills" | Breakdown component |

---

### pages/RoadmapPage.tsx

| Line | Text | Context |
|------|------|---------|
| 12 | "HTML & CSS Fundamentals" | Module title |
| 13 | "JavaScript Core Concepts" | Module title |
| 14 | "React Fundamentals" | Module title |
| 15 | "TypeScript Proficiency" | Module title |
| 16 | "State Management & Patterns" | Module title |
| 17 | "Testing & Quality" | Module title |
| 18 | "System Design Basics" | Module title |
| 19 | "Portfolio & Interview Prep" | Module title |
| 26 | "Learning Roadmap" | Page heading |
| 27 | "Your personalized path to Frontend Developer." | Subtitle |
| 31 | "Overall Progress" | Progress card title |
| 32 | "3 of 8 modules" | Progress indicator |
| 35 | "~12 weeks remaining" | Time estimate |
| 36 | "2,250 XP earned" | XP label |
| 41 | "Adaptive Difficulty:" | Label |
| 41 | "Balanced" | Difficulty level |
| 42 | "AI has adjusted based on your performance and emotional state." | Description |
| 60-80 | "Completed", "In Progress" | Status badges |
| 76 | "Continue Learning" | Button label |

---

### pages/SettingsPage.tsx

| Line | Text | Context |
|------|------|---------|
| 8 | "Profile" | Settings section title |
| 8 | "Update your name, bio, and career goals." | Settings description |
| 9 | "Notifications" | Settings section title |
| 9 | "Manage email and push notification preferences." | Settings description |
| 10 | "Privacy & Security" | Settings section title |
| 10 | "Two-factor authentication and data controls." | Settings description |
| 11 | "Appearance" | Settings section title |
| 11 | "Theme, font size, and accessibility options." | Settings description |
| 12 | "Language & Region" | Settings section title |
| 12 | "Set your preferred language and timezone." | Settings description |
| 37 | "Settings" | Page heading |
| 38 | "Manage your account, rating profile, and platform preferences." | Subtitle |
| 47 | "Edit Profile" | Button label |
| 61 | "Rating" | Stat label |
| 65 | "Reviews" | Stat label |
| 69 | "Profile" | Stat label |
| 75 | "About" | Section title |
| 76 | "A dedicated member of the MindSkill AI community." | Default bio |
| 80 | "{rating.toFixed(1)} / 5 from {reviews} reviews" | Rating text |

---

### pages/PricingPage.tsx

| Line | Text | Context |
|------|------|---------|
| (Component delegates to PricingSectionModern) | All pricing content handled in component | |

---

### pages/StudentChatPage.tsx

| Line | Text | Context |
|------|------|---------|
| 43 | "{user.courseId} General Chat" | Chat room name |
| 73 | "Welcome to the general chat" / "this conversation" | System message |
| 74 | "Alice Johnson" | Mock user name |
| 74 | "Hey everyone! Excited for the upcoming project deadline." | Mock message |
| 75 | "Bob Smith" | Mock user name |
| 75 | "Same here! Anyone want to form a study group?" | Mock message |

---

### pages/CommunityPage.tsx

| Line | Text | Context |
|------|------|---------|
| 8 | "general" | Channel name |
| 8 | 1240 | Members count |
| 9 | "react-help" | Channel name |
| 9 | 856 | Members count |
| 10 | "career-advice" | Channel name |
| 10 | 623 | Members count |
| 11 | "study-buddies" | Channel name |
| 11 | 412 | Members count |
| 12 | "show-and-tell" | Channel name |
| 12 | 298 | Members count |
| 18 | "Sarah M." | Poster name |
| 18 | "Just passed my React certification! The adaptive learning really helped me focus on my weak areas 🎉" | Post text |
| 18 | "2m ago" | Time |
| 18 | 12 | Likes |
| 19 | "James R." | Poster name |
| 19 | "Has anyone tried the new System Design module? The difficulty adjustment is amazing." | Post text |
| 19 | "15m ago" | Time |
| 19 | 8 | Likes |
| 20 | "Priya P." | Poster name |
| 20 | "The burnout detection saved me last week — I was pushing too hard and didn't even realize." | Post text |
| 20 | "1h ago" | Time |
| 20 | 24 | Likes |
| 21 | "Alex K." | Poster name |
| 21 | "Looking for a study partner for TypeScript fundamentals. Anyone interested?" | Post text |
| 21 | "2h ago" | Time |
| 21 | 5 | Likes |
| 35 | "Community Hub" | Page heading |
| 36 | "Connect, share, and learn together." | Subtitle |
| 37 | "New Post" | Button label |
| 40 | "Channels" | Section title |
| 78 | "Reply" | Button label |
| 86 | "Write a message..." | Input placeholder |

---

### pages/CertificationsPage.tsx

| Line | Text | Context |
|------|------|---------|
| 6 | "CERT-2026-001" | Certificate ID |
| 6 | "JavaScript Intermediate" | Certificate title |
| 6 | "Mar 15, 2026" | Issue date |
| 6 | "Intermediate" | Level |
| 6 | "ES6+", "Async/Await", "DOM Manipulation" | Skills |
| 7 | "CERT-2026-002" | Certificate ID |
| 7 | "React Fundamentals" | Certificate title |
| 7 | "Mar 28, 2026" | Issue date |
| 7 | "Beginner" | Level |
| 7 | "Components", "Hooks", "JSX" | Skills |
| 8 | "CERT-2026-003" | Certificate ID |
| 8 | "CSS & Responsive Design" | Certificate title |
| 8 | "Apr 5, 2026" | Issue date |
| 8 | "Intermediate" | Level |
| 8 | "Flexbox", "Grid", "Animations" | Skills |
| 9 | "CERT-2026-004" | Certificate ID |
| 9 | "Emotional Resilience" | Certificate title |
| 9 | "Apr 10, 2026" | Issue date |
| 9 | "Advanced" | Level |
| 9 | "Stress Management", "Consistency", "Self-Awareness" | Skills |
| 15 | "7-Day Streak" | Badge title |
| 15 | "Learned 7 days in a row" | Badge description |
| 16 | "Burnout Recovery" | Badge title |
| 16 | "Recovered from high stress" | Badge description |
| 17 | "Quick Learner" | Badge title |
| 17 | "Completed module in record time" | Badge description |
| 18 | "Consistency Master" | Badge title |
| 18 | "30+ day learning streak" | Badge description |
| 19 | "Social Butterfly" | Badge title |
| 19 | "Helped 10 peers" | Badge description |
| 20 | "Night Owl" | Badge title |
| 20 | "10 late-night sessions" | Badge description |
| 26 | "Certification Wallet" | Page heading |
| 27 | "Your verified micro-certifications and achievements." | Subtitle |
| 28 | "Share Portfolio" | Button label |
| 47 | "Achievement Badges" | Section title |
| 66 | "Issued" | Label |
| 67 | "ID:" | Label |
| 72 | "Verified" | Status |

---

### pages/SkillAnalysisPage.tsx

| Line | Text | Context |
|------|------|---------|
| 18 | "Skill Gap Analysis" | Page heading |
| 19 | "Your technical assessment results for Frontend Developer path." | Subtitle |
| 23 | "AI Analysis" | Card title |
| 25 | "You currently meet" | Analysis text part 1 |
| 25 | "62%" | Percentage |
| 25 | "of the requirements to become a Frontend Developer." | Analysis text part 2 |
| 26 | "System Design" | Skill name |
| 26 | "TypeScript" | Skill name |
| 27 | "Est. 12 weeks to job ready" | Time estimate |
| 40 | "Skill Radar" | Chart title |
| 47 | "Current" | Legend label |
| 48 | "Required" | Legend label |
| 52 | "Competency Gap" | Chart title |
| 67 | "Strengths" | Section title |
| 72 | "Above Target" / "Near Target" | Status |
| 80 | "Areas for Improvement" | Section title |
| 85 | "High Priority" / "Medium Priority" | Priority level |

---

### pages/EmotionalAnalyticsPage.tsx

| Line | Text | Context |
|------|------|---------|
| 27 | "Great", "Good", "Neutral", "Low", "Bad" | Mood labels |
| 41 | "Emotional Analytics" | Page heading |
| 42 | "Track your emotional wellbeing and learning readiness." | Subtitle |
| 45 | "Daily Emotional Check-In" | Section title |
| 46 | "How are you feeling right now?" | Prompt |
| 57 | "Anything on your mind? (optional)" | Textarea placeholder |
| 62-65 | "Avg Mood", "Stress Level", "Motivation", "Burnout Risk" | Metric labels |
| 67 | "Stable" | Status |
| 80 | "Weekly Emotional Trends" | Chart title |
| 112 | "Motivation & Confidence" | Chart title |
| 127 | "AI Emotional Insight" | Section title |
| 130 | "Your motivation has" | Insight text part 1 |
| 130 | "increased 12%" | Insight metric |
| 130 | "this week, but stress peaked on Wednesday." | Insight text part 2 |
| 131 | "Consider lighter study loads mid-week." | Recommendation |
| 131 | "improving steadily" | Status |
| 131 | "keep maintaining your daily check-ins for best results." | Advice |
| 138 | "Burnout Risk Heatmap (Last 4 Weeks)" | Section title |
| 154 | "Low risk", "High risk" | Legend labels |

---

### pages/MentorshipPage.tsx

| Line | Text | Context |
|------|------|---------|
| 8 | "Dr. Sarah Mitchell" | Mentor name |
| 8 | "Senior React Engineer @ Google" | Mentor role |
| 8 | 4.9 | Rating |
| 8 | 128 | Reviews |
| 8 | "React", "TypeScript", "System Design" | Skills |
| 8 | "$45" | Hourly rate |
| 9 | "James Rodriguez" | Mentor name |
| 9 | "Tech Lead @ Stripe" | Mentor role |
| 9 | 4.8 | Rating |
| 9 | 94 | Reviews |
| 9 | "JavaScript", "Node.js", "Architecture" | Skills |
| 9 | "$55" | Hourly rate |
| 10 | "Emily Chen" | Mentor name |
| 10 | "UX Lead @ Figma" | Mentor role |
| 10 | 4.9 | Rating |
| 10 | 156 | Reviews |
| 10 | "UI/UX", "Design Systems", "Figma" | Skills |
| 10 | "$50" | Hourly rate |
| 11 | "Michael Park" | Mentor name |
| 11 | "Staff Engineer @ Netflix" | Mentor role |
| 11 | 4.7 | Rating |
| 11 | 72 | Reviews |
| 11 | "Performance", "Testing", "DevOps" | Skills |
| 11 | "$60" | Hourly rate |
| 12 | "Aisha Williams" | Mentor name |
| 12 | "Data Science Lead @ Spotify" | Mentor role |
| 12 | 4.8 | Rating |
| 12 | 110 | Reviews |
| 12 | "Python", "ML", "Data Viz" | Skills |
| 12 | "$50" | Hourly rate |
| 13 | "Raj Patel" | Mentor name |
| 13 | "Product Manager @ Notion" | Mentor role |
| 13 | 4.6 | Rating |
| 13 | 65 | Reviews |
| 13 | "Product Strategy", "Agile", "Analytics" | Skills |
| 13 | "$40" | Hourly rate |
| 17 | "React Study Circle" | Study group name |
| 17 | 24 | Members |
| 17 | "Advanced Hooks Patterns" | Topic |
| 18 | "System Design Club" | Study group name |
| 18 | 18 | Members |
| 18 | "Distributed Systems Basics" | Topic |
| 19 | "Career Prep Squad" | Study group name |
| 19 | 32 | Members |
| 19 | "Interview Preparation" | Topic |
| 23 | "Mentorship Hub" | Page heading |
| 24 | "Connect with expert mentors and study groups." | Subtitle |
| 27 | "Search mentors..." | Input placeholder |
| 28 | "Filters" | Button label |
| 35 | "Available" / "Busy" | Status label |
| 36 | "/hr" | Rate suffix |
| 38 | "Book Session" / "Join Waitlist" | Button label |
| 43 | "Study Groups & Peer Learning" | Section title |
| 52 | "Topic:" | Label |
| 55 | "members" | Label suffix |
| 56 | "Join" | Button label |

---

### pages/NotFound.tsx

| Line | Text | Context |
|------|------|---------|
| 13 | "404" | Error code |
| 14 | "Oops! Page not found" | Error message |
| 15 | "Return to Home" | Link text |

---

### pages/TeacherDashboard.tsx

| Line | Text | Context |
|------|------|---------|
| 28 | "Teacher Workspace" | Role label |
| 29 | "My Dashboard" | Page heading |
| 30 | "Track upcoming sessions, manage completed lessons, and review student feedback." | Subtitle |
| 34 | "Add Session" | Button label |
| 35 | "View Reviews" | Button label |
| 40 | "Current Students" | Card title |
| 43 | "Active session records assigned to you." | Card description |
| 46 | "Average Rating" | Card title |
| 52 | "Based on {summary.reviewCount} reviews." | Card description |
| 55 | "Session Status" | Card title |
| 60 | "Pending" | Status label |
| 63 | "Approved" | Status label |
| 66 | "Completed" | Status label |
| 72 | "Recent Sessions" | Section title |
| 75 | "No sessions assigned yet." | Empty state |

---

### pages/NotificationsPage.tsx

| Line | Text | Context |
|------|------|---------|
| 6 | "AI Recommendation" | Notification title |
| 6 | "Your adaptive difficulty has been adjusted. Try the new challenge module." | Notification description |
| 6 | "5m ago" | Timestamp |
| 7 | "New Certificate Available" | Notification title |
| 7 | "You've completed all requirements for 'React Fundamentals'. Claim your certificate!" | Notification description |
| 7 | "1h ago" | Timestamp |
| 8 | "Mentor Session Reminder" | Notification title |
| 8 | "Your session with Dr. Sarah Mitchell starts in 30 minutes." | Notification description |
| 8 | "2h ago" | Timestamp |
| 9 | "Streak Achievement!" | Notification title |
| 9 | "You've maintained a 14-day learning streak! Keep it up!" | Notification description |
| 9 | "5h ago" | Timestamp |
| 10 | "New Module Available" | Notification title |
| 10 | "TypeScript Proficiency module is now unlocked based on your progress." | Notification description |
| 10 | "1d ago" | Timestamp |
| 20 | "Notifications" | Page heading |
| 21 | "Stay updated on your learning journey." | Subtitle |
| 22 | "Mark all as read" | Button label |

---

### pages/StudentMeetingsPage.tsx

| Line | Text | Context |
|------|------|---------|
| 89 | "My Meetings" | Page heading |
| 90 | "Schedule, review, and manage your learning sessions" | Subtitle |
| 95 | "Request Meeting" | Button label |
| 100 | "Request New Meeting" | Dialog title |
| 102 | "Teacher" | Select label |
| 104 | "Select a teacher" | Select placeholder |

---

### pages/EmployerDashboardPage.tsx

| Line | Text | Context |
|------|------|---------|
| 18 | "Talent Discovery" | Page heading |
| 19 | "Browse verified candidates with skill assessments and readiness scores." | Subtitle |
| 24 | "Search by name, skill, or role..." | Input placeholder |
| 25 | "All Roles", "Score: 80+", "Available Now" | Filter options |
| 26 | "More Filters" | Button label |
| 30 | "Total Candidates" | Stat label |
| 30 | "2,847" | Stat value |
| 31 | "Job Ready (80+)" | Stat label |
| 31 | "1,230" | Stat value |
| 32 | "Certified" | Stat label |
| 32 | "1,856" | Stat value |
| 33 | "Avg Score" | Stat label |
| 33 | "76" | Stat value |
| 45 | "Candidate", "Readiness", "Technical", "Soft Skills", "Reliability", "Resilience", "Certs", "Actions" | Table headers |
| 55 | "View" | Button label |
| 56 | "Shortlist" | Button label |

---

## COMPONENTS (src/components/)

### components/Navbar.tsx

| Line | Text | Context |
|------|------|---------|
| 15 | "MindSkill" | Brand name |
| 15 | "AI" | Brand suffix |
| 40 | "Log In" | (from translation) |
| 41 | "Get Started" | (from translation) |
| 47 | "Language" | Mobile menu label |

---

### components/Footer.tsx

| Line | Text | Context |
|------|------|---------|
| 8 | "MindSkill" | Brand name |
| 8 | "AI" | Brand suffix |
| 10 | "Learning that understands you. AI-powered adaptive education with emotional intelligence." | Brand tagline |
| 20 | "Product" | Column title |
| 20 | "Features", "Pricing", "Certifications", "Mentorship", "Enterprise" | Links |
| 24 | "Company" | Column title |
| 24 | "About", "Careers", "Blog", "Press", "Contact" | Links |
| 28 | "Resources" | Column title |
| 28 | "Documentation", "Help Center", "Community", "API", "Status" | Links |
| 35 | "© 2026 MindSkill AI. All rights reserved." | Copyright text |
| 39 | "Privacy", "Terms", "Cookies" | Footer links |

---

### components/DashboardLayout.tsx

| Line | Text | Context |
|------|------|---------|
| 9 | "Dashboard" | Menu item |
| 10 | "Emotional Analytics" | Menu item |
| 11 | "Skill Analysis" | Menu item |
| 12 | "Mentorship" | Menu item |
| 13 | "Student Chat" | Menu item |
| 14 | "My Meetings" | Menu item |
| 15 | "Community" | Menu item |
| 18 | "Teacher Dashboard" | Menu item |
| 19 | "Meeting Scheduler" | Menu item |
| 20 | "My Students" | Menu item |
| 21 | "Student Communications" | Menu item |
| 24 | "Admin Dashboard" | Menu item |
| 25 | "User Management" | Menu item |
| 26 | "Course Catalog" | Menu item |
| 29 | "Notifications" | Menu item |
| 30 | "Settings" | Menu item |
| 42 | "MindSkill" | Sidebar logo |
| 42 | "AI" | Sidebar logo suffix |
| 45 | "Course:" | Label |
| 76 | "Sign Out" | Button label |
| 99 | "MindSkill" | Mobile header logo |
| 99 | "AI" | Mobile header logo suffix |

---

### components/pricing/PricingSectionModern.tsx

| Line | Text | Context |
|------|------|---------|
| 49 | "💎 Simple Transparent Pricing" | Badge text |
| 52 | "Plans that fit your" | Heading part 1 |
| 52 | "journey" | Heading part 2 (animated) |
| 56 | "Start with Starter. Scale to Pro. No hidden fees, no surprises. Upgrade or downgrade anytime." | Subtitle |
| 104 | "Need help choosing?" | CTA heading |
| 105 | "Our team is here to help you find the perfect plan. Chat with us anytime." | CTA subtitle |
| 108 | "Chat with Sales" | Button text |

---

### components/pricing/BillingToggle.tsx

| Line | Text | Context |
|------|------|---------|
| 18 | "Monthly" | Button label |
| 23 | "Yearly" | Button label |
| 32 | "Save 20% with annual billing" | Discount badge |

---

### components/pricing/FAQSection.tsx

| Line | Text | Context |
|------|------|---------|
| 14 | "Frequently Asked Questions" | Section heading |
| 15 | "Have questions? We have answers." | Subtitle |
| (From pricing data) | All FAQ questions and answers | |

---

### components/pricing/TestimonialsSection.tsx

| Line | Text | Context |
|------|------|---------|
| 11 | "Loved by 10,000+ Teams" | Section heading |
| 12 | "Join thousands of companies growing with us" | Subtitle |

---

### components/pricing/PricingCardsModern.tsx

| Line | Text | Context |
|------|------|---------|
| (Renders pricing tiers from data) | All pricing tier information | |

---

### components/pricing/TrustBadges.tsx

| Line | Text | Context |
|------|------|---------|
| (From pricing data) | "🔒 SOC 2 Certified", "🛡️ GDPR Compliant", "⭐ 99.9% Uptime SLA", "🚀 24/7 Support" | Trust badges |

---

### components/chat/ChatWidget.tsx

| Line | Text | Context |
|------|------|---------|
| 45 | "Hi! I'm your MindSkill AI assistant. I'm here to help with study motivation, career advice, emotional support, and productivity coaching. How can I assist you today?" | Initial message |
| 57-62 | Mock responses for various topics | AI response variations |
| (Multiple) | "study motivation", "career advice", "emotional support", "productivity coaching" | Topic keywords |
| 96 | "I'm here to help you with study motivation, career advice, emotional support, and productivity coaching. What specific area would you like to focus on?" | Default response |

---

## DATA FILES (src/data/)

### data/pricing.ts

| Line | Text | Context |
|------|------|---------|
| 6 | "Starter" | Plan name |
| 7 | "Perfect for beginners and small projects" | Plan description |
| 8 | "Up to 3 team members" | Feature |
| 9 | "1,000 API calls/month" | Feature |
| 10 | "10 GB storage" | Feature |
| 11 | "Email support" | Feature |
| 12 | "Basic analytics" | Feature |
| 13 | "Custom domain" | Feature (disabled) |
| 14 | "Single Sign-On (SSO)" | Feature (disabled) |
| 15 | "Priority API support" | Feature (disabled) |
| 20 | "Get Started" | CTA label |
| 24 | "Pro" | Plan name |
| 25 | "For growing teams and scalable applications" | Plan description |
| 26 | "Most Popular" | Badge |
| 27 | "Up to 20 team members" | Feature |
| 28 | "Unlimited API calls" | Feature |
| 29 | "500 GB storage" | Feature |
| 30 | "Priority email & chat support" | Feature |
| 31 | "Advanced analytics & reports" | Feature |
| 32 | "Custom domain & branding" | Feature |
| 33 | "Single Sign-On (SSO)" | Feature |
| 34 | "Priority API support (24/7)" | Feature (disabled) |
| 38 | "Start Pro Trial" | CTA label |
| 43-95 | FAQ items with questions and answers | |
| 103-125 | Testimonials with names, roles, companies, and quotes | |
| 130-137 | Trust badges with labels and tooltips | |

---

## Translation Keys Used

The following keys should be configured in your i18n translation files (en.json, tr.json, ru.json, az.json):

### Category: Common
- `common.appName` - "MindSkill"
- `common.appNameBrand` - "AI"
- `common.slogan` - "Learning that understands you"
- `common.tagline` - Full tagline

### Category: Navigation
- `navigation.features`, `navigation.howItWorks`, `navigation.pricing`, `navigation.about`
- `navigation.logIn`, `navigation.getStarted`
- `navigation.language`

### Category: Authentication
- `auth.createAccount`, `auth.welcomeBack`
- `auth.startJourney`, `auth.continueJourney`
- `auth.continueWithGoogle`, `auth.or`
- `auth.fullName`, `auth.emailAddress`, `auth.password`
- `auth.signingIn`, `auth.creatingAccount`
- `auth.signIn`, `auth.createAccountBtn`
- `auth.haveAccount`, `auth.noAccount`
- `auth.demoCredentials`, `auth.students`, `auth.teachers`, `auth.admins`
- `auth.demo1`, `auth.demo2`, `auth.demo3`
- `auth.loginFailed`, `auth.registrationFailed`, `auth.unexpectedError`
- `auth.or`

---

## HARDCODED STRINGS REQUIRING TRANSLATION

### High Priority (Visible UI Text)
- All page headings and titles
- All button labels
- All section headings
- Feature descriptions and benefits
- Form placeholders and labels
- Error and status messages
- Card titles and descriptions
- Navigation labels
- Modal and dialog titles
- Notification messages
- Empty state messages
- List item labels

### Medium Priority (Secondary Text)
- Subtitles and descriptions
- Help text and hints
- Status indicators
- Metric labels
- Timeline labels
- Chart titles and legends

### Data-driven Content
- Mentor names and roles (should consider if these are real user data)
- Student/candidate names (should consider if these are real user data)
- Testimonial quotes (consider if they are real testimonials)
- Course/module titles (consider if they are customizable)
- Channel names (consider if they are user-generated)

---

## RECOMMENDATIONS

### Phase 1: Core UI Text
1. Replace all hardcoded strings in page headings
2. Replace all button labels and CTAs
3. Replace form labels and placeholders
4. Replace navigation items

### Phase 2: Descriptive Text
1. Replace feature descriptions
2. Replace section subtitles
3. Replace help text and instructions
4. Replace error messages

### Phase 3: Data Integration
1. Determine if testimonials, mentor data, course names should be translatable
2. Consider if user-generated content needs translation
3. Implement locale-specific formatting for numbers, dates, currency

### Phase 4: Testing
1. Test all translated strings for UI overflow
2. Test RTL languages if supported
3. Verify all translation keys are populated
4. Test dynamic content with varying text lengths

---

## AUDIT STATISTICS

- **Total Files Audited:** 30+ files
- **Total Hardcoded Strings Found:** 420+
- **Page Files with Hardcoded Text:** 16
- **Component Files with Hardcoded Text:** 10
- **Data Files with Hardcoded Text:** 1
- **Translatable Elements:** Buttons, headings, descriptions, labels, placeholders, messages
- **Dynamic Content Requiring Attention:** User names, dates, numbers (may need locale-specific formatting)

---

## NEXT STEPS

1. Create/update translation keys in all locale JSON files
2. Replace hardcoded strings with `t()` function calls
3. Test language switching functionality
4. Verify no console warnings for missing translation keys
5. Test responsiveness with longer translations (German, Turkish, Russian)
