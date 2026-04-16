import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ChatWidget from "@/components/chat/ChatWidget";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import EmotionalAnalyticsPage from "./pages/EmotionalAnalyticsPage";
import SkillAnalysisPage from "./pages/SkillAnalysisPage";
import RoadmapPage from "./pages/RoadmapPage";
import CertificationsPage from "./pages/CertificationsPage";
import MentorshipPage from "./pages/MentorshipPage";
import CommunityPage from "./pages/CommunityPage";
import EmployerDashboardPage from "./pages/EmployerDashboardPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/emotional-analytics" element={<EmotionalAnalyticsPage />} />
          <Route path="/skill-analysis" element={<SkillAnalysisPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/employer" element={<EmployerDashboardPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ChatWidget />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
