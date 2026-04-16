import { Link, useLocation } from "react-router-dom";
import { Brain, LayoutDashboard, HeartPulse, Target, Users, MessageCircle, Settings, Bell, Zap, LogOut, Calendar, MessageSquare } from "lucide-react";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const studentSidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: HeartPulse, label: "Emotional Analytics", href: "/emotional-analytics" },
  { icon: Target, label: "Skill Analysis", href: "/skill-analysis" },
  { icon: Users, label: "Mentorship", href: "/mentorship" },
  { icon: MessageSquare, label: "Student Chat", href: "/student-chat" },
  { icon: Calendar, label: "My Meetings", href: "/student-meetings" },
  { icon: MessageCircle, label: "Community", href: "/community" },
];

const teacherSidebarItems = [
  { icon: LayoutDashboard, label: "Teacher Dashboard", href: "/teacher-dashboard" },
  { icon: Calendar, label: "Meeting Scheduler", href: "/teacher-meetings" },
  { icon: Users, label: "My Students", href: "/teacher-students" },
  { icon: MessageSquare, label: "Student Communications", href: "/teacher-communications" },
];

const adminSidebarItems = [
  { icon: LayoutDashboard, label: "Admin Dashboard", href: "/admin" },
  { icon: Users, label: "User Management", href: "/admin" },
  { icon: Calendar, label: "Course Catalog", href: "/admin" },
];

const bottomItems = [
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user, logout, isStudent, isTeacher, isAdmin } = useAuth();

  // Determine sidebar items based on user role
  const getSidebarItems = () => {
    if (isStudent) return studentSidebarItems;
    if (isTeacher) return teacherSidebarItems;
    if (isAdmin) return adminSidebarItems;
    return studentSidebarItems; // fallback
  };

  const sidebarItems = getSidebarItems();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border/50 bg-card/50 p-4 md:flex">
        <Link to="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="gradient-bg flex h-8 w-8 items-center justify-center rounded-lg">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold">MindSkill<span className="gradient-text">AI</span></span>
        </Link>

        {/* User Info */}
        <div className="mb-6 p-3 bg-muted/50 rounded-xl">
          <p className="text-sm font-medium">{user?.fullName}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          {user?.courseId && (
            <p className="text-xs text-primary mt-1">Course: {user.courseId}</p>
          )}
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active ? "gradient-bg text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-border/50 pt-4">
          {bottomItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active ? "gradient-bg text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-border/50 bg-card/50 px-4 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="gradient-bg flex h-7 w-7 items-center justify-center rounded-lg">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-base font-bold">MindSkill<span className="gradient-text">AI</span></span>
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-bg text-xs font-bold text-primary-foreground">
            {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

        {/* Mobile Navigation */}
        <nav className="flex items-center justify-around border-t border-border/50 bg-card/50 py-2 md:hidden">
          {sidebarItems.slice(0, 5).map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href} className={`flex flex-col items-center gap-1 p-1 ${active ? "text-primary" : "text-muted-foreground"}`}>
                <item.icon className="h-5 w-5" />
                <span className="text-[10px]">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
