import { Link, useLocation } from "react-router-dom";
import { Brain, LayoutDashboard, HeartPulse, Target, BookOpen, Award, Users, MessageCircle, Settings, Bell, Zap, ChevronRight, LogOut } from "lucide-react";
import { ReactNode } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: HeartPulse, label: "Emotional Analytics", href: "/emotional-analytics" },
  { icon: Target, label: "Skill Analysis", href: "/skill-analysis" },
  { icon: BookOpen, label: "Learning Roadmap", href: "/roadmap" },
  { icon: Award, label: "Certifications", href: "/certifications" },
  { icon: Users, label: "Mentorship", href: "/mentorship" },
  { icon: MessageCircle, label: "Community", href: "/community" },
];

const bottomItems = [
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

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
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* User */}
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-bg text-sm font-bold text-primary-foreground">AK</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Alex Kim</p>
            <p className="text-xs text-muted-foreground truncate">Frontend Developer</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-border/50 bg-card/50 px-4 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="gradient-bg flex h-7 w-7 items-center justify-center rounded-lg">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-base font-bold">MindSkill<span className="gradient-text">AI</span></span>
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-bg text-xs font-bold text-primary-foreground">AK</div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>

        {/* Mobile Nav */}
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
