import DashboardLayout from "@/components/DashboardLayout";
import { Brain, HeartPulse, Target, Zap, BookOpen, Award, TrendingUp, ArrowUpRight, ArrowDownRight, Flame, Clock, Star } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const moodData = [
  { day: "Mon", mood: 80, energy: 75, stress: 30 },
  { day: "Tue", mood: 85, energy: 82, stress: 25 },
  { day: "Wed", mood: 70, energy: 65, stress: 45 },
  { day: "Thu", mood: 75, energy: 70, stress: 40 },
  { day: "Fri", mood: 90, energy: 88, stress: 20 },
  { day: "Sat", mood: 85, energy: 80, stress: 28 },
  { day: "Sun", mood: 88, energy: 85, stress: 22 },
];

const skillData = [
  { skill: "JavaScript", A: 78 },
  { skill: "React", A: 65 },
  { skill: "TypeScript", A: 55 },
  { skill: "CSS", A: 82 },
  { skill: "System Design", A: 40 },
  { skill: "Testing", A: 50 },
];

const recommendations = [
  { icon: BookOpen, text: "Take a lighter lesson today — your stress is slightly elevated.", color: "bg-accent/10 text-accent" },
  { icon: Zap, text: "Great energy! Try the advanced React challenge module.", color: "bg-chart-green/10 text-chart-green" },
  { icon: HeartPulse, text: "Your motivation is trending up! Keep the momentum.", color: "bg-chart-pink/10 text-chart-pink" },
];

const recentActivity = [
  { title: "Completed: React Hooks Deep Dive", time: "2h ago", xp: "+120 XP" },
  { title: "Earned: JavaScript Intermediate Badge", time: "5h ago", xp: "+200 XP" },
  { title: "Started: TypeScript Fundamentals", time: "1d ago", xp: "+50 XP" },
  { title: "Mood Check-In Completed", time: "1d ago", xp: "+10 XP" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-extrabold">Good Morning, Alex 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your learning overview for today.</p>
        </div>

        {/* Top Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Target, label: "Career Readiness", value: "82", suffix: "/100", trend: "+3", up: true, color: "bg-primary/10 text-primary" },
            { icon: HeartPulse, label: "Emotional State", value: "Good", suffix: "", trend: "Stable", up: true, color: "bg-chart-green/10 text-chart-green" },
            { icon: Flame, label: "Learning Streak", value: "14", suffix: "days", trend: "+2", up: true, color: "bg-chart-orange/10 text-chart-orange" },
            { icon: Star, label: "Total XP", value: "4,250", suffix: "pts", trend: "+380", up: true, color: "bg-chart-purple/10 text-chart-purple" },
          ].map((c) => (
            <div key={c.label} className="glass-card hover-lift rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.color}`}><c.icon className="h-5 w-5" /></div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${c.up ? "text-chart-green" : "text-destructive"}`}>
                  {c.up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {c.trend}
                </span>
              </div>
              <p className="text-2xl font-bold font-display">{c.value}<span className="text-xs font-normal text-muted-foreground ml-2">{c.suffix}</span></p>
              <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mood Chart */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold">Emotional Trends</h3>
              <span className="text-xs text-muted-foreground">This Week</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={moodData}>
                <defs>
                  <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(258 65% 58%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(258 65% 58%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(195 85% 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(195 85% 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
                <Area type="monotone" dataKey="mood" stroke="hsl(258 65% 58%)" fill="url(#moodGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="energy" stroke="hsl(195 85% 50%)" fill="url(#energyGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Radar */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold">Skill Overview</h3>
              <span className="text-xs text-muted-foreground">Current Level</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={skillData}>
                <PolarGrid stroke="hsl(220 20% 90%)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                <Radar dataKey="A" stroke="hsl(258 65% 58%)" fill="hsl(258 65% 58%)" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-display font-bold">Today's AI Adaptive Recommendations</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {recommendations.map((r, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-muted/50 p-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${r.color}`}><r.icon className="h-4 w-4" /></div>
                <p className="text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Career Readiness */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4">Career Readiness Breakdown</h3>
            <div className="flex items-center justify-center mb-6">
              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(220 20% 90%)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="url(#scoreGrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${82 * 3.27} ${(100 - 82) * 3.27}`} />
                  <defs><linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="hsl(258 65% 58%)" /><stop offset="100%" stopColor="hsl(195 85% 50%)" /></linearGradient></defs>
                </svg>
                <div className="absolute text-center">
                  <p className="text-3xl font-extrabold font-display">82</p>
                  <p className="text-xs text-muted-foreground">Job Ready</p>
                </div>
              </div>
            </div>
            {[
              { label: "Technical Skills", value: 85 },
              { label: "Soft Skills", value: 78 },
              { label: "Reliability", value: 88 },
              { label: "Emotional Resilience", value: 74 },
            ].map((s) => (
              <div key={s.label} className="mb-3">
                <div className="flex justify-between text-sm mb-1"><span>{s.label}</span><span className="font-semibold">{s.value}%</span></div>
                <div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full gradient-bg" style={{ width: `${s.value}%` }} /></div>
              </div>
            ))}
          </div>

          {/* Activity */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" /> {a.time}</p>
                  </div>
                  <span className="text-xs font-semibold text-chart-green">{a.xp}</span>
                </div>
              ))}
            </div>

            {/* Gamification */}
            <div className="mt-6 p-4 rounded-xl gradient-bg text-primary-foreground">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Level 12 — Skill Builder</span>
                <span className="text-xs">4,250 / 5,000 XP</span>
              </div>
              <div className="h-2 rounded-full bg-primary-foreground/20">
                <div className="h-full w-[85%] rounded-full bg-primary-foreground/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
