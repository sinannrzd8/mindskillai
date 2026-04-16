import DashboardLayout from "@/components/DashboardLayout";
import { Bell, CheckCircle2, Award, Brain, Users, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  { icon: Brain, title: "AI Recommendation", desc: "Your adaptive difficulty has been adjusted. Try the new challenge module.", time: "5m ago", read: false, color: "bg-primary/10 text-primary" },
  { icon: Award, title: "New Certificate Available", desc: "You've completed all requirements for 'React Fundamentals'. Claim your certificate!", time: "1h ago", read: false, color: "bg-chart-green/10 text-chart-green" },
  { icon: Users, title: "Mentor Session Reminder", desc: "Your session with Dr. Sarah Mitchell starts in 30 minutes.", time: "2h ago", read: false, color: "bg-accent/10 text-accent" },
  { icon: Zap, title: "Streak Achievement!", desc: "You've maintained a 14-day learning streak! Keep it up!", time: "5h ago", read: true, color: "bg-chart-orange/10 text-chart-orange" },
  { icon: BookOpen, title: "New Module Available", desc: "TypeScript Proficiency module is now unlocked based on your progress.", time: "1d ago", read: true, color: "bg-chart-blue/10 text-chart-blue" },
];

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold">Notifications</h1>
            <p className="text-muted-foreground mt-1">Stay updated on your learning journey.</p>
          </div>
          <Button variant="ghost" size="sm">Mark all as read</Button>
        </div>

        <div className="space-y-3">
          {notifications.map((n, i) => (
            <div key={i} className={`glass-card rounded-2xl p-5 flex items-start gap-4 ${!n.read ? "border-l-4 border-primary" : "opacity-70"}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${n.color}`}>
                <n.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{n.title}</h3>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
              </div>
              {!n.read && <div className="h-2 w-2 rounded-full gradient-bg shrink-0 mt-2" />}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
