import DashboardLayout from "@/components/DashboardLayout";
import { Target, TrendingUp, AlertTriangle, CheckCircle2, Clock, Brain } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const radarData = [
  { skill: "JavaScript", current: 78, required: 90 },
  { skill: "React", current: 65, required: 85 },
  { skill: "TypeScript", current: 55, required: 80 },
  { skill: "CSS/Design", current: 82, required: 75 },
  { skill: "System Design", current: 40, required: 70 },
  { skill: "Testing", current: 50, required: 75 },
  { skill: "Git/DevOps", current: 70, required: 65 },
  { skill: "Performance", current: 45, required: 60 },
];

const gapData = radarData.map(d => ({ ...d, gap: Math.max(0, d.required - d.current) })).sort((a, b) => b.gap - a.gap);

const strengths = [
  { skill: "CSS/Design", pct: 82, status: "Above Target" },
  { skill: "JavaScript", pct: 78, status: "Near Target" },
  { skill: "Git/DevOps", pct: 70, status: "Above Target" },
];

const weaknesses = [
  { skill: "System Design", pct: 40, gap: 30, priority: "High" },
  { skill: "TypeScript", pct: 55, gap: 25, priority: "High" },
  { skill: "Testing", pct: 50, gap: 25, priority: "Medium" },
];

export default function SkillAnalysisPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Skill Gap Analysis</h1>
          <p className="text-muted-foreground mt-1">Your technical assessment results for Frontend Developer path.</p>
        </div>

        {/* Summary */}
        <div className="glass-card rounded-2xl p-6 border-l-4 border-primary">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-display font-bold">AI Analysis</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You currently meet <strong className="text-foreground">62%</strong> of the requirements to become a Frontend Developer. Focus on improving <strong className="text-destructive">System Design</strong> and <strong className="text-destructive">TypeScript</strong> for the fastest path to job readiness.
          </p>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-muted-foreground" /> Est. 12 weeks to job ready</span>
          </div>
        </div>

        {/* Radar + Gap Chart */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4">Skill Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220 20% 90%)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                <Radar dataKey="required" stroke="hsl(220 20% 80%)" fill="hsl(220 20% 90%)" fillOpacity={0.3} strokeWidth={1} strokeDasharray="4 4" name="Required" />
                <Radar dataKey="current" stroke="hsl(258 65% 58%)" fill="hsl(258 65% 58%)" fillOpacity={0.15} strokeWidth={2} name="Current" />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2 text-xs">
              <span className="flex items-center gap-1"><div className="h-2 w-6 rounded gradient-bg" /> Current</span>
              <span className="flex items-center gap-1"><div className="h-2 w-6 rounded bg-muted" style={{ border: "1px dashed hsl(220 20% 80%)" }} /> Required</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4">Competency Gap</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gapData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="skill" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={90} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
                <Bar dataKey="current" fill="hsl(258 65% 58%)" radius={[0, 6, 6, 0]} name="Current" />
                <Bar dataKey="gap" fill="hsl(0 72% 55% / 0.2)" radius={[0, 6, 6, 0]} name="Gap" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-chart-green" /> Strengths</h3>
            <div className="space-y-4">
              {strengths.map((s) => (
                <div key={s.skill}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{s.skill}</span>
                    <span className="text-chart-green text-xs font-medium">{s.status}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-chart-green" style={{ width: `${s.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-chart-orange" /> Areas for Improvement</h3>
            <div className="space-y-4">
              {weaknesses.map((w) => (
                <div key={w.skill}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{w.skill}</span>
                    <span className={`text-xs font-medium ${w.priority === "High" ? "text-destructive" : "text-chart-orange"}`}>{w.priority} Priority</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-chart-orange" style={{ width: `${w.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
