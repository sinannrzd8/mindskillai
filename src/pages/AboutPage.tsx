import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Heart, Target, Globe, Users, Zap } from "lucide-react";

const values = [
  { icon: Brain, title: "AI-First", desc: "Every feature is powered by intelligent algorithms that learn and adapt." },
  { icon: Heart, title: "Human-Centered", desc: "Technology should serve emotional wellbeing, not just productivity." },
  { icon: Target, title: "Outcome-Driven", desc: "We measure success by career outcomes, not just course completions." },
  { icon: Globe, title: "Accessible", desc: "Quality education should be available to everyone, everywhere." },
];

const team = [
  { name: "Dr. Elena Volkov", role: "CEO & Co-Founder", avatar: "EV" },
  { name: "Marcus Chen", role: "CTO & Co-Founder", avatar: "MC" },
  { name: "Sarah Kim", role: "VP of Product", avatar: "SK" },
  { name: "James Okafor", role: "Head of AI Research", avatar: "JO" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary mb-2">ABOUT US</p>
            <h1 className="font-display text-4xl font-extrabold md:text-5xl mb-4">Building the Future of <span className="gradient-text">Adaptive Education</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MindSkill AI was founded on a simple belief: learning should understand the whole person—not just what they know, but how they feel. We're on a mission to make education more human through artificial intelligence.
            </p>
          </div>

          {/* Values */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
            {values.map((v) => (
              <div key={v.title} className="glass-card hover-lift rounded-2xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg shadow-lg">
                  <v.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Team */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-extrabold">Our <span className="gradient-text">Team</span></h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4 max-w-3xl mx-auto">
            {team.map((t) => (
              <div key={t.name} className="text-center">
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl gradient-bg text-2xl font-bold text-primary-foreground">{t.avatar}</div>
                <p className="font-display font-bold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
