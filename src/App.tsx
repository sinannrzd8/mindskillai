import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, StudentRoute, TeacherRoute, AdminRoute, PublicRoute } from "@/components/ProtectedRoute";
import ChatWidget from "@/components/chat/ChatWidget";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import EmotionalAnalyticsPage from "./pages/EmotionalAnalyticsPage";
import SkillAnalysisPage from "./pages/SkillAnalysisPage";
import MentorshipPage from "./pages/MentorshipPage";
import CommunityPage from "./pages/CommunityPage";
import StudentChatPage from "./pages/StudentChatPage";
import StudentMeetingsPage from "./pages/StudentMeetingsPage";
import TeacherMeetingsPage from "./pages/TeacherMeetingsPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EmployerDashboardPage from "./pages/EmployerDashboardPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/pricing" element={<PublicRoute><PricingPage /></PublicRoute>} />
            <Route path="/about" element={<PublicRoute><AboutPage /></PublicRoute>} />

            {/* Protected Routes - All Roles */}
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

            {/* Student Routes */}
            <Route path="/dashboard" element={<StudentRoute><DashboardPage /></StudentRoute>} />
            <Route path="/emotional-analytics" element={<StudentRoute><EmotionalAnalyticsPage /></StudentRoute>} />
            <Route path="/skill-analysis" element={<StudentRoute><SkillAnalysisPage /></StudentRoute>} />
            <Route path="/mentorship" element={<StudentRoute><MentorshipPage /></StudentRoute>} />
            <Route path="/student-chat" element={<StudentRoute><StudentChatPage /></StudentRoute>} />
            <Route path="/student-meetings" element={<StudentRoute><StudentMeetingsPage /></StudentRoute>} />
            <Route path="/community" element={<StudentRoute><CommunityPage /></StudentRoute>} />

            {/* Teacher Routes */}
            <Route path="/teacher-dashboard" element={<TeacherRoute><TeacherDashboard /></TeacherRoute>} />
            <Route path="/teacher-meetings" element={<TeacherRoute><TeacherMeetingsPage /></TeacherRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/employer" element={<AdminRoute><EmployerDashboardPage /></AdminRoute>} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;