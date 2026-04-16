import DashboardLayout from "@/components/DashboardLayout";
import { CheckCircle2, Circle, Lock, Clock, Zap, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  { title: "HTML & CSS Fundamentals", status: "completed", lessons: 12, xp: 600, duration: "2 weeks" },
  { title: "JavaScript Core Concepts", status: "completed", lessons: 18, xp: 900, duration: "3 weeks" },
  { title: "React Fundamentals", status: "current", lessons: 15, xp: 750, progress: 60, duration: "3 weeks" },
  { title: "TypeScript Proficiency", status: "upcoming", lessons: 14, xp: 700, duration: "2.5 weeks" },
  { title: "State Management & Patterns", status: "locked", lessons: 10, xp: 500, duration: "2 weeks" },
  { title: "Testing & Quality", status: "locked", lessons: 12, xp: 600, duration: "2 weeks" },
  { title: "System Design Basics", status: "locked", lessons: 16, xp: 800, duration: "3 weeks" },
  { title: "Portfolio & Interview Prep", status: "locked", lessons: 8, xp: 400, duration: "1.5 weeks" },
];

export default function RoadmapPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Learning Roadmap</h1>
          <p className="text-muted-foreground mt-1">Your personalized path to Frontend Developer.</p>
        </div>

        {/* Progress Overview */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">Overall Progress</span>
            <span className="text-sm text-muted-foreground">3 of 8 modules</span>
          </div>
          <div className="h-3 rounded-full bg-muted"><div className="h-full w-[35%] rounded-full gradient-bg transition-all" /></div>
          <div className="mt-3 flex items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> ~12 weeks remaining</span>
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> 2,250 XP earned</span>
          </div>
        </div>

        {/* Adaptive Difficulty */}
        <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10"><Zap className="h-5 w-5 text-accent" /></div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Adaptive Difficulty: <span className="text-accent">Balanced</span></p>
            <p className="text-xs text-muted-foreground">AI has adjusted based on your performance and emotional state.</p>
          </div>
          <div className="flex gap-1">{[1,2,3,4,5].map(v => <div key={v} className={`h-6 w-2 rounded-full ${v <= 3 ? "gradient-bg" : "bg-muted"}`} />)}</div>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {modules.map((m, i) => {
            const isCompleted = m.status === "completed";
            const isCurrent = m.status === "current";
            const isLocked = m.status === "locked";

            return (
              <div key={m.title} className="relative flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shrink-0 ${isCompleted ? "gradient-bg border-transparent" : isCurrent ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                    {isCompleted ? <CheckCircle2 className="h-5 w-5 text-primary-foreground" /> :
                     isCurrent ? <BookOpen className="h-5 w-5 text-primary" /> :
                     isLocked ? <Lock className="h-4 w-4 text-muted-foreground" /> :
                     <Circle className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  {i < modules.length - 1 && <div className={`w-0.5 flex-1 min-h-[24px] ${isCompleted ? "gradient-bg" : "bg-border"}`} />}
                </div>

                {/* Content */}
                <div className={`flex-1 mb-4 glass-card rounded-2xl p-5 ${isLocked ? "opacity-60" : ""} ${isCurrent ? "ring-2 ring-primary/30 shadow-lg" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display font-bold">{m.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{m.lessons} lessons</span>
                        <span>{m.duration}</span>
                        <span>{m.xp} XP</span>
                      </div>
                    </div>
                    {isCompleted && <span className="rounded-full bg-chart-green/10 px-3 py-1 text-xs font-semibold text-chart-green">Completed</span>}
                    {isCurrent && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">In Progress</span>}
                  </div>
                  {isCurrent && m.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1"><span>{m.progress}% complete</span></div>
                      <div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full gradient-bg" style={{ width: `${m.progress}%` }} /></div>
                      <Button variant="hero" size="sm" className="mt-3"><BookOpen className="h-4 w-4" /> Continue Learning</Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
