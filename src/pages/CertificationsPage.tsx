import DashboardLayout from "@/components/DashboardLayout";
import { Award, Share2, Download, ExternalLink, QrCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const certs = [
  { id: "CERT-2026-001", title: "JavaScript Intermediate", date: "Mar 15, 2026", level: "Intermediate", skills: ["ES6+", "Async/Await", "DOM Manipulation"], color: "from-primary to-chart-blue" },
  { id: "CERT-2026-002", title: "React Fundamentals", date: "Mar 28, 2026", level: "Beginner", skills: ["Components", "Hooks", "JSX"], color: "from-chart-blue to-accent" },
  { id: "CERT-2026-003", title: "CSS & Responsive Design", date: "Apr 5, 2026", level: "Intermediate", skills: ["Flexbox", "Grid", "Animations"], color: "from-accent to-chart-green" },
  { id: "CERT-2026-004", title: "Emotional Resilience", date: "Apr 10, 2026", level: "Advanced", skills: ["Stress Management", "Consistency", "Self-Awareness"], color: "from-chart-pink to-primary" },
];

const badges = [
  { title: "7-Day Streak", emoji: "🔥", desc: "Learned 7 days in a row" },
  { title: "Burnout Recovery", emoji: "💪", desc: "Recovered from high stress" },
  { title: "Quick Learner", emoji: "⚡", desc: "Completed module in record time" },
  { title: "Consistency Master", emoji: "🎯", desc: "30+ day learning streak" },
  { title: "Social Butterfly", emoji: "🦋", desc: "Helped 10 peers" },
  { title: "Night Owl", emoji: "🦉", desc: "10 late-night sessions" },
];

export default function CertificationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold">Certification Wallet</h1>
            <p className="text-muted-foreground mt-1">Your verified micro-certifications and achievements.</p>
          </div>
          <Button variant="hero-outline"><Share2 className="h-4 w-4" /> Share Portfolio</Button>
        </div>

        {/* Certificates */}
        <div className="grid gap-4 md:grid-cols-2">
          {certs.map((c) => (
            <div key={c.id} className="glass-card hover-lift rounded-2xl overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${c.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} shadow-lg`}>
                    <Award className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors"><QrCode className="h-4 w-4" /></button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors"><Download className="h-4 w-4" /></button>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">Issued {c.date} · ID: {c.id}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full gradient-bg px-3 py-0.5 text-xs font-semibold text-primary-foreground">{c.level}</span>
                  <CheckCircle2 className="h-4 w-4 text-chart-green" />
                  <span className="text-xs text-chart-green font-medium">Verified</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span key={s} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-bold mb-4">Achievement Badges</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {badges.map((b) => (
              <div key={b.title} className="text-center rounded-xl bg-muted/50 p-4 hover-lift cursor-pointer">
                <span className="text-3xl mb-2 block">{b.emoji}</span>
                <p className="text-xs font-semibold">{b.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
