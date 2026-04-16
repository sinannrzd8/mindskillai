import DashboardLayout from "@/components/DashboardLayout";
import { Star, Search, Calendar, MessageCircle, Filter, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const mentors = [
  { name: "Dr. Sarah Mitchell", role: "Senior React Engineer @ Google", rating: 4.9, reviews: 128, skills: ["React", "TypeScript", "System Design"], available: true, avatar: "SM", hourly: "$45" },
  { name: "James Rodriguez", role: "Tech Lead @ Stripe", rating: 4.8, reviews: 94, skills: ["JavaScript", "Node.js", "Architecture"], available: true, avatar: "JR", hourly: "$55" },
  { name: "Emily Chen", role: "UX Lead @ Figma", rating: 4.9, reviews: 156, skills: ["UI/UX", "Design Systems", "Figma"], available: false, avatar: "EC", hourly: "$50" },
  { name: "Michael Park", role: "Staff Engineer @ Netflix", rating: 4.7, reviews: 72, skills: ["Performance", "Testing", "DevOps"], available: true, avatar: "MP", hourly: "$60" },
  { name: "Aisha Williams", role: "Data Science Lead @ Spotify", rating: 4.8, reviews: 110, skills: ["Python", "ML", "Data Viz"], available: true, avatar: "AW", hourly: "$50" },
  { name: "Raj Patel", role: "Product Manager @ Notion", rating: 4.6, reviews: 65, skills: ["Product Strategy", "Agile", "Analytics"], available: true, avatar: "RP", hourly: "$40" },
];

const studyGroups = [
  { name: "React Study Circle", members: 24, active: true, topic: "Advanced Hooks Patterns" },
  { name: "System Design Club", members: 18, active: false, topic: "Distributed Systems Basics" },
  { name: "Career Prep Squad", members: 32, active: true, topic: "Interview Preparation" },
];

export default function MentorshipPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold">Mentorship Hub</h1>
            <p className="text-muted-foreground mt-1">Connect with expert mentors and study groups.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 glass-card rounded-xl px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search mentors..." className="bg-transparent text-sm outline-none w-40" />
            </div>
            <Button variant="hero-outline" size="sm"><Filter className="h-4 w-4" /> Filters</Button>
          </div>
        </div>

        {/* Mentors */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((m) => (
            <div key={m.name} className="glass-card hover-lift rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg text-lg font-bold text-primary-foreground shrink-0">{m.avatar}</div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold truncate">{m.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{m.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 fill-chart-orange text-chart-orange" />
                    <span className="text-xs font-semibold">{m.rating}</span>
                    <span className="text-xs text-muted-foreground">({m.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {m.skills.map((s) => (
                  <span key={s} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`flex h-2 w-2 rounded-full ${m.available ? "bg-chart-green" : "bg-muted-foreground"}`} />
                  <span className="text-xs text-muted-foreground">{m.available ? "Available" : "Busy"}</span>
                </div>
                <span className="text-sm font-semibold">{m.hourly}<span className="text-xs text-muted-foreground">/hr</span></span>
              </div>
              <Button variant={m.available ? "hero" : "secondary"} size="sm" className="w-full mt-4" disabled={!m.available}>
                <Calendar className="h-4 w-4" /> {m.available ? "Book Session" : "Join Waitlist"}
              </Button>
            </div>
          ))}
        </div>

        {/* Study Groups */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-display font-bold mb-4">Study Groups & Peer Learning</h3>
          <div className="grid gap-3 md:grid-cols-3">
            {studyGroups.map((g) => (
              <div key={g.name} className="rounded-xl bg-muted/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold">{g.name}</h4>
                  {g.active && <span className="flex items-center gap-1 text-[10px] text-chart-green font-medium"><span className="h-1.5 w-1.5 rounded-full bg-chart-green animate-pulse" /> Active</span>}
                </div>
                <p className="text-xs text-muted-foreground mb-3">Topic: {g.topic}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{g.members} members</span>
                  <Button variant="ghost" size="sm" className="text-xs h-7">Join</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
