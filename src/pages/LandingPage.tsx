import { Sparkles, ArrowRight, Brain, HeartPulse, Target, Award, Users, BarChart3, Zap, Shield, TrendingUp, CheckCircle2, Star, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Brain, titleKey: "features.adaptiveLearning", descKey: "features.adaptiveLearningDesc", color: "from-primary to-chart-blue" },
  { icon: HeartPulse, titleKey: "features.emotionalIntelligence", descKey: "features.emotionalIntelligenceDesc", color: "from-chart-pink to-primary" },
  { icon: Target, titleKey: "features.skillGapAnalysis", descKey: "features.skillGapAnalysisDesc", color: "from-chart-blue to-accent" },
  { icon: Award, titleKey: "features.microcertifications", descKey: "features.microcertificationsDesc", color: "from-accent to-chart-green" },
  { icon: Users, titleKey: "features.mentorshipHub", descKey: "features.mentorshipHubDesc", color: "from-chart-green to-chart-blue" },
  { icon: BarChart3, titleKey: "features.careerReadiness", descKey: "features.careerReadinessDesc", color: "from-chart-orange to-chart-pink" },
];

const steps = [
  { num: "01", titleKey: "steps.setYourGoals", descKey: "steps.setYourGoalsDesc" },
  { num: "02", titleKey: "steps.aiAnalyzesYou", descKey: "steps.aiAnalyzesYouDesc" },
  { num: "03", titleKey: "steps.learnAdaptively", descKey: "steps.learnAdaptivelyDesc" },
];

const statsKeys = [
  { valueKey: "stats.activeLearnerValue", labelKey: "stats.activeLearners" },
  { valueKey: "stats.completionRateValue", labelKey: "stats.completionRate" },
  { valueKey: "stats.fasterLearningValue", labelKey: "stats.fasterLearning" },
  { valueKey: "stats.certificationsValue", labelKey: "stats.certifications" },
];

const testimonialKeys = [
  { nameKey: "testimonials.person1Name", roleKey: "testimonials.person1Role", textKey: "testimonials.testimonial1", avatar: "SC" },
  { nameKey: "testimonials.person2Name", roleKey: "testimonials.person2Role", textKey: "testimonials.testimonial2", avatar: "MJ" },
  { nameKey: "testimonials.person3Name", roleKey: "testimonials.person3Role", textKey: "testimonials.testimonial3", avatar: "PP" },
];

const logos = ["AaCu", "MindAİ", "YourCompany", "MİT"];

export default function LandingPage() {
  const { t } = useTranslation();

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
            <Sparkles className="h-4 w-4" /> {t('header.nowInBeta')}
          </div>
          <h1 className="animate-fade-in-up stagger-1 font-display text-5xl font-extrabold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            {t('header.title')}<br /><span className="gradient-text">{t('header.titleGradient')}</span>
          </h1>
          <p className="animate-fade-in-up stagger-2 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            {t('header.subtitle')}
          </p>
          <div className="animate-fade-in-up stagger-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/onboarding"><Sparkles className="h-5 w-5" /> {t('header.startFreeTrial')}</Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/about">{t('header.seeHowItWorks')} <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="animate-fade-in-up stagger-4 mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-chart-green" /> {t('navigation.noAdRequired')}
            <span className="mx-2">·</span>
            <CheckCircle2 className="h-4 w-4 text-chart-green" /> {t('navigation.freeTrialLength')}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="container mx-auto mt-16 px-4">
          <div className="animate-fade-in-up stagger-5 mx-auto max-w-5xl rounded-lg border border-border bg-card/80 p-2 shadow-lg backdrop-blur-sm">
            <div className="rounded-xl bg-muted/50 p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Target className="h-5 w-5 text-primary" /></div>
                    <div><p className="text-xs text-muted-foreground">{t('dashboard.careerReadiness')}</p><p className="text-2xl font-bold font-display">82<span className="text-sm text-muted-foreground">/100</span></p></div>
                  </div>
                  <div className="h-2 rounded-full bg-muted"><div className="h-full w-[82%] rounded-full gradient-bg" /></div>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-green/10"><HeartPulse className="h-5 w-5 text-chart-green" /></div>
                    <div><p className="text-xs text-muted-foreground">{t('dashboard.emotionalState')}</p><p className="text-2xl font-bold font-display">Good</p></div>
                  </div>
                  <div className="flex gap-1">{[85, 70, 90, 60, 80].map((v, i) => <div key={i} className="h-8 flex-1 rounded" style={{ background: `hsl(var(--chart-green) / ${v/100})`, height: `${v * 0.4}px`, marginTop: `${(100-v)*0.4}px` }} />)}</div>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10"><Zap className="h-5 w-5 text-accent" /></div>
                    <div><p className="text-xs text-muted-foreground">{t('dashboard.learningStreak')}</p><p className="text-2xl font-bold font-display">14 <span className="text-sm text-muted-foreground">{t('onboarding.focus')}</span></p></div>
                  </div>
                  <div className="flex gap-1">{Array.from({ length: 14 }).map((_, i) => <div key={i} className="h-6 w-full rounded-sm gradient-bg opacity-70" />)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Logos */}
      <section className="border-y border-border py-10 bg-card/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-6">{t('social.trustedBy')}</p>
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
            {statsKeys.map((s) => (
              <div key={s.labelKey} className="text-center">
                <p className="font-display text-4xl font-extrabold gradient-text md:text-5xl">{t(s.valueKey)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t(s.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-2">{t('features.sectionLabel')}</p>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">{t('features.sectionTitle')}<br /><span className="gradient-text">{t('features.sectionDesc')}</span></h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.titleKey} className="glass-card hover-lift rounded-2xl p-7 group cursor-pointer">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} shadow-lg`}>
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{t(f.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  {t('buttons.next')} <ChevronRight className="h-4 w-4 ml-1" />
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
            <p className="text-sm font-semibold text-primary mb-2">{t('steps.sectionLabel')}</p>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">{t('steps.sectionTitle')}</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-8">
            {steps.map((s, i) => (
              <div key={s.num} className="glass-card hover-lift flex items-start gap-6 rounded-2xl p-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gradient-bg font-display text-xl font-extrabold text-primary-foreground">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">{t(s.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(s.descKey)}</p>
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
            <p className="text-sm font-semibold text-primary mb-2">{t('testimonials.sectionLabel')}</p>
            <h2 className="font-display text-4xl font-extrabold">{t('testimonials.sectionTitle')}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonialKeys.map((t_key) => (
              <div key={t_key.nameKey} className="glass-card hover-lift rounded-2xl p-7">
                <div className="flex mb-3">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-chart-orange text-chart-orange" />)}</div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-5">"{t(t_key.textKey)}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg text-sm font-bold text-primary-foreground">{t_key.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t(t_key.nameKey)}</p>
                    <p className="text-xs text-muted-foreground">{t(t_key.roleKey)}</p>
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
          <h2 className="font-display text-4xl font-extrabold md:text-5xl mb-4">{t('header.title')}<br /><span className="gradient-text">{t('header.titleGradient')}</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">{t('social.trustedBy')}</p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/onboarding"><Sparkles className="h-5 w-5" /> {t('header.startFreeTrial')}</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
