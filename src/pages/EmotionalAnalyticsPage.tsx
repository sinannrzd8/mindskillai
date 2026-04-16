import DashboardLayout from "@/components/DashboardLayout";
import { HeartPulse, TrendingDown, TrendingUp, AlertTriangle, Smile, Meh, Frown, Zap, Brain } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const weeklyData = [
  { day: "Mon", mood: 80, energy: 75, stress: 30, motivation: 85, confidence: 70 },
  { day: "Tue", mood: 85, energy: 82, stress: 25, motivation: 88, confidence: 75 },
  { day: "Wed", mood: 65, energy: 55, stress: 55, motivation: 60, confidence: 58 },
  { day: "Thu", mood: 70, energy: 65, stress: 45, motivation: 68, confidence: 65 },
  { day: "Fri", mood: 88, energy: 85, stress: 20, motivation: 90, confidence: 80 },
  { day: "Sat", mood: 82, energy: 78, stress: 28, motivation: 85, confidence: 78 },
  { day: "Sun", mood: 86, energy: 82, stress: 22, motivation: 87, confidence: 82 },
];

const burnoutHeatmap = [
  { week: "W1", Mon: 2, Tue: 1, Wed: 3, Thu: 2, Fri: 1, Sat: 1, Sun: 0 },
  { week: "W2", Mon: 1, Tue: 2, Wed: 4, Thu: 3, Fri: 2, Sat: 1, Sun: 1 },
  { week: "W3", Mon: 2, Tue: 1, Wed: 2, Thu: 2, Fri: 1, Sat: 0, Sun: 0 },
  { week: "W4", Mon: 1, Tue: 1, Wed: 3, Thu: 2, Fri: 1, Sat: 1, Sun: 0 },
];

const moods = [
  { emoji: "😊", label: "Great", color: "bg-mood-great/10 text-mood-great border-mood-great/20" },
  { emoji: "🙂", label: "Good", color: "bg-mood-good/10 text-mood-good border-mood-good/20" },
  { emoji: "😐", label: "Neutral", color: "bg-mood-neutral/10 text-mood-neutral border-mood-neutral/20" },
  { emoji: "😔", label: "Low", color: "bg-mood-low/10 text-mood-low border-mood-low/20" },
  { emoji: "😢", label: "Bad", color: "bg-mood-bad/10 text-mood-bad border-mood-bad/20" },
];

export default function EmotionalAnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Emotional Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your emotional wellbeing and learning readiness.</p>
        </div>

        {/* Daily Check-in */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-bold mb-2">Daily Emotional Check-In</h3>
          <p className="text-sm text-muted-foreground mb-4">How are you feeling right now?</p>
          <div className="flex flex-wrap gap-3 mb-4">
            {moods.map((m) => (
              <button key={m.label} className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-all hover:shadow-md ${m.color}`}>
                <span className="text-xl">{m.emoji}</span> {m.label}
              </button>
            ))}
          </div>
          <textarea placeholder="Anything on your mind? (optional)" className="w-full rounded-xl border border-input bg-card/50 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none h-20" />
        </div>

        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Avg Mood", value: "79%", icon: Smile, trend: "+5%", up: true, color: "text-mood-good" },
            { label: "Stress Level", value: "32%", icon: AlertTriangle, trend: "-8%", up: false, color: "text-chart-green" },
            { label: "Motivation", value: "84%", icon: Zap, trend: "+12%", up: true, color: "text-chart-orange" },
            { label: "Burnout Risk", value: "Low", icon: HeartPulse, trend: "Stable", up: true, color: "text-chart-green" },
          ].map((m) => (
            <div key={m.label} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <m.icon className={`h-5 w-5 ${m.color}`} />
                <span className={`text-xs font-medium flex items-center gap-0.5 ${m.up ? "text-chart-green" : "text-destructive"}`}>
                  {m.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {m.trend}
                </span>
              </div>
              <p className="text-2xl font-extrabold font-display">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4">Weekly Emotional Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="moodG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(258 65% 58%)" stopOpacity={0.3}/><stop offset="95%" stopColor="hsl(258 65% 58%)" stopOpacity={0}/></linearGradient>
                  <linearGradient id="energyG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(195 85% 50%)" stopOpacity={0.3}/><stop offset="95%" stopColor="hsl(195 85% 50%)" stopOpacity={0}/></linearGradient>
                  <linearGradient id="stressG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(0 72% 55%)" stopOpacity={0.3}/><stop offset="95%" stopColor="hsl(0 72% 55%)" stopOpacity={0}/></linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
                <Area type="monotone" dataKey="mood" stroke="hsl(258 65% 58%)" fill="url(#moodG)" strokeWidth={2} name="Mood" />
                <Area type="monotone" dataKey="energy" stroke="hsl(195 85% 50%)" fill="url(#energyG)" strokeWidth={2} name="Energy" />
                <Area type="monotone" dataKey="stress" stroke="hsl(0 72% 55%)" fill="url(#stressG)" strokeWidth={2} name="Stress" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4">Motivation & Confidence</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
                <Bar dataKey="motivation" fill="hsl(258 65% 58%)" radius={[6, 6, 0, 0]} name="Motivation" />
                <Bar dataKey="confidence" fill="hsl(195 85% 50%)" radius={[6, 6, 0, 0]} name="Confidence" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight */}
        <div className="glass-card rounded-2xl p-6 border-l-4 border-primary">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-display font-bold">AI Emotional Insight</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your motivation has <strong className="text-chart-green">increased 12%</strong> this week, but stress peaked on Wednesday. Consider lighter study loads mid-week. Your overall emotional resilience score is <strong>improving steadily</strong> — keep maintaining your daily check-ins for best results.
          </p>
        </div>

        {/* Burnout Heatmap */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-bold mb-4">Burnout Risk Heatmap (Last 4 Weeks)</h3>
          <div className="grid gap-2">
            <div className="grid grid-cols-8 gap-2 text-xs text-muted-foreground">
              <span></span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
            {burnoutHeatmap.map((w) => (
              <div key={w.week} className="grid grid-cols-8 gap-2 items-center">
                <span className="text-xs text-muted-foreground">{w.week}</span>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => {
                  const v = w[d as keyof typeof w] as number;
                  const opacity = v === 0 ? 0.05 : v * 0.25;
                  return <div key={d} className="h-8 rounded-md" style={{ background: `hsl(0 72% 55% / ${opacity})` }} />;
                })}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span>Low risk</span>
            <div className="flex gap-1">{[0.05, 0.25, 0.5, 0.75, 1].map((o, i) => <div key={i} className="h-4 w-6 rounded" style={{ background: `hsl(0 72% 55% / ${o})` }} />)}</div>
            <span>High risk</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
