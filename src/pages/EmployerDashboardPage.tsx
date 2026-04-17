import { Search, Filter, Star, Download, Eye, ChevronRight, Target, Award, Users, Briefcase, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const candidates = [
  { name: "Alex Kim", role: "Frontend Developer", score: 82, tech: ["React", "TypeScript", "CSS"], softSkills: 78, reliability: 88, resilience: 74, avatar: "AK", certs: 4, projects: 6 },
  { name: "Jordan Lee", role: "Backend Developer", score: 91, tech: ["Node.js", "Python", "PostgreSQL"], softSkills: 85, reliability: 92, resilience: 88, avatar: "JL", certs: 6, projects: 8 },
  { name: "Mia Zhang", role: "UI/UX Designer", score: 87, tech: ["Figma", "CSS", "React"], softSkills: 92, reliability: 85, resilience: 80, avatar: "MZ", certs: 5, projects: 12 },
  { name: "Sam Rivera", role: "Data Scientist", score: 79, tech: ["Python", "ML", "SQL"], softSkills: 72, reliability: 80, resilience: 76, avatar: "SR", certs: 3, projects: 5 },
  { name: "Taylor Brooks", role: "Product Manager", score: 88, tech: ["Analytics", "Agile", "SQL"], softSkills: 90, reliability: 86, resilience: 84, avatar: "TB", certs: 4, projects: 7 },
];

export default function EmployerDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold">Talent Discovery</h1>
          <p className="text-muted-foreground mt-1">Browse verified candidates with skill assessments and readiness scores.</p>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search by name, skill, or role..." className="bg-transparent text-sm outline-none w-full" />
          </div>
          {["All Roles", "Score: 80+", "Available Now"].map((f) => (
            <Button key={f} variant="secondary" size="sm" className="rounded-xl text-xs">{f}</Button>
          ))}
          <Button variant="hero-outline" size="sm"><Filter className="h-4 w-4" /> More Filters</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Candidates", value: "2,847", icon: Users },
            { label: "Job Ready (80+)", value: "1,230", icon: Target },
            { label: "Certified", value: "1,856", icon: Award },
            { label: "Avg Score", value: "76", icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><s.icon className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-xl font-extrabold font-display">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Candidate Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Candidate", "Readiness", "Technical", "Soft Skills", "Reliability", "Resilience", "Certs", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr key={c.name} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg text-sm font-bold text-primary-foreground">{c.avatar}</div>
                        <div>
                          <p className="text-sm font-semibold">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-extrabold font-display ${c.score >= 85 ? "text-chart-green" : c.score >= 75 ? "text-accent" : "text-chart-orange"}`}>{c.score}</span>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                    </td>
                    {[c.softSkills, c.softSkills, c.reliability, c.resilience].map((v, i) => (
                      <td key={i} className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-muted"><div className="h-full rounded-full gradient-bg" style={{ width: `${v}%` }} /></div>
                          <span className="text-xs font-medium">{v}%</span>
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 text-sm"><Award className="h-3.5 w-3.5 text-primary" /> {c.certs}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-xs h-8"><Eye className="h-3 w-3" /> View</Button>
                        <Button variant="hero" size="sm" className="text-xs h-8">Shortlist</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
