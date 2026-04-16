import { Sparkles, ArrowRight, Brain, HeartPulse, Target, Award, Users, BarChart3, Zap, Shield, TrendingUp, CheckCircle2, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Brain, title: "AI Adaptive Learning", desc: "Dynamically adjusts difficulty and content based on your performance and emotional state.", color: "from-primary to-chart-blue" },
  { icon: HeartPulse, title: "Emotional Intelligence", desc: "Track mood, stress, and motivation. Get personalized wellness recommendations.", color: "from-chart-pink to-primary" },
  { icon: Target, title: "Skill Gap Analysis", desc: "Advanced radar analytics showing exactly what you need to learn for your dream career.", color: "from-chart-blue to-accent" },
  { icon: Award, title: "Micro-Certifications", desc: "Earn verified, shareable certificates with QR codes as you complete modules.", color: "from-accent to-chart-green" },
  { icon: Users, title: "Mentorship Hub", desc: "Connect with expert mentors, join study groups, and collaborate on projects.", color: "from-chart-green to-chart-blue" },
  { icon: BarChart3, title: "Career Readiness Score", desc: "AI-powered employability index combining technical, soft skills, and resilience.", color: "from-chart-orange to-chart-pink" },
];

const steps = [
  { num: "01", title: "Set Your Goals", desc: "Choose your dream career path and complete a quick assessment." },
  { num: "02", title: "AI Analyzes You", desc: "Our AI maps your skills, gaps, and emotional baseline to build your roadmap." },
  { num: "03", title: "Learn Adaptively", desc: "Study at your own pace with content that adapts to how you think and feel." },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "94%", label: "Completion Rate" },
  { value: "2.5x", label: "Faster Learning" },
  { value: "500+", label: "Certifications" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Frontend Developer at Stripe", text: "MindSkill AI detected my burnout before I did. The adaptive pacing literally saved my learning journey.", avatar: "SC" },
  { name: "Marcus Johnson", role: "Data Scientist at Spotify", text: "The skill gap analysis showed me exactly where to focus. I went from beginner to job-ready in 4 months.", avatar: "MJ" },
  { name: "Priya Patel", role: "Product Manager at Notion", text: "The emotional intelligence features are a game-changer. Learning feels human again.", avatar: "PP" },
];

const logos = ["Google", "Microsoft", "Stripe", "Notion", "Spotify", "Linear"];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-chart-pink/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4" /> Now in Public Beta
          </div>
          <h1 className="animate-fade-in-up stagger-1 font-display text-5xl font-extrabold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            Learning That<br /><span className="gradient-text">Understands You.</span>
          </h1>
          <p className="animate-fade-in-up stagger-2 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            The first AI-powered learning platform that adapts to both your skills <em>and</em> your emotional state. Learn faster, avoid burnout, and become career-ready.
          </p>
          <div className="animate-fade-in-up stagger-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/onboarding"><Sparkles className="h-5 w-5" /> Start Free Trial</Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/about">See How It Works <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="animate-fade-in-up stagger-4 mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-chart-green" /> No credit card required
            <span className="mx-2">·</span>
            <CheckCircle2 className="h-4 w-4 text-chart-green" /> 14-day free trial
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="container mx-auto mt-16 px-4">
          <div className="animate-fade-in-up stagger-5 mx-auto max-w-5xl rounded-2xl border border-border/50 bg-card/80 p-2 shadow-2xl backdrop-blur-sm">
            <div className="rounded-xl bg-muted/50 p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Target className="h-5 w-5 text-primary" /></div>
                    <div><p className="text-xs text-muted-foreground">Career Readiness</p><p className="text-2xl font-bold font-display">82<span className="text-sm text-muted-foreground">/100</span></p></div>
                  </div>
                  <div className="h-2 rounded-full bg-muted"><div className="h-full w-[82%] rounded-full gradient-bg" /></div>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-green/10"><HeartPulse className="h-5 w-5 text-chart-green" /></div>
                    <div><p className="text-xs text-muted-foreground">Emotional State</p><p className="text-2xl font-bold font-display">Good</p></div>
                  </div>
                  <div className="flex gap-1">{[85, 70, 90, 60, 80].map((v, i) => <div key={i} className="h-8 flex-1 rounded" style={{ background: `hsl(var(--chart-green) / ${v/100})`, height: `${v * 0.4}px`, marginTop: `${(100-v)*0.4}px` }} />)}</div>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10"><Zap className="h-5 w-5 text-accent" /></div>
                    <div><p className="text-xs text-muted-foreground">Learning Streak</p><p className="text-2xl font-bold font-display">14 <span className="text-sm text-muted-foreground">days</span></p></div>
                  </div>
                  <div className="flex gap-1">{Array.from({ length: 14 }).map((_, i) => <div key={i} className="h-6 w-full rounded-sm gradient-bg opacity-70" />)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Logos */}
      <section className="border-y border-border/50 py-10 bg-card/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-6">Trusted by learners at leading companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {logos.map((name) => (
              <span key={name} className="text-lg font-display font-bold text-muted-foreground/40">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl font-extrabold gradient-text md:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-2">FEATURES</p>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">Everything You Need to<br /><span className="gradient-text">Thrive & Grow</span></h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">A complete ecosystem for adaptive learning, emotional wellness, and career advancement.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="glass-card hover-lift rounded-2xl p-7 group cursor-pointer">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} shadow-lg`}>
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-2">HOW IT WORKS</p>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">Three Steps to a<br /><span className="gradient-text">Smarter You</span></h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-8">
            {steps.map((s, i) => (
              <div key={s.num} className="glass-card hover-lift flex items-start gap-6 rounded-2xl p-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-bg font-display text-xl font-extrabold text-primary-foreground">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-2">TESTIMONIALS</p>
            <h2 className="font-display text-4xl font-extrabold">Loved by <span className="gradient-text">Learners</span></h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card hover-lift rounded-2xl p-7">
                <div className="flex mb-3">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-chart-orange text-chart-orange" />)}</div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg text-sm font-bold text-primary-foreground">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero-bg opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl mb-4">Ready to Transform Your<br /><span className="gradient-text">Learning Journey?</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">Join 50,000+ learners who are already experiencing the future of AI-powered education.</p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/onboarding"><Sparkles className="h-5 w-5" /> Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
