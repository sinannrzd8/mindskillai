import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Sparkles, ArrowRight, ArrowLeft, Code, Database, Palette, BarChart3, Briefcase, Shield, Megaphone, CheckCircle2, Loader2, Smile, Meh, Frown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const careerPaths = [
  { icon: Code, label: "Frontend Developer", color: "bg-primary/10 text-primary" },
  { icon: Database, label: "Backend Developer", color: "bg-chart-blue/10 text-chart-blue" },
  { icon: Palette, label: "UI/UX Designer", color: "bg-chart-pink/10 text-chart-pink" },
  { icon: BarChart3, label: "Data Scientist", color: "bg-accent/10 text-accent" },
  { icon: Briefcase, label: "Product Manager", color: "bg-chart-orange/10 text-chart-orange" },
  { icon: Shield, label: "Cybersecurity Analyst", color: "bg-chart-green/10 text-chart-green" },
  { icon: Megaphone, label: "Marketing Specialist", color: "bg-chart-pink/10 text-chart-pink" },
];

const quizQuestions = [
  { q: "How comfortable are you with JavaScript?", options: ["Beginner", "Intermediate", "Advanced", "Expert"] },
  { q: "How familiar are you with React or similar frameworks?", options: ["Never used", "Basic knowledge", "Built projects", "Production experience"] },
  { q: "How would you rate your CSS/design skills?", options: ["Minimal", "Can build layouts", "Responsive designs", "Advanced animations"] },
];

const emotionalQuestions = [
  { label: "Motivation", emoji: "🔥" },
  { label: "Confidence", emoji: "💪" },
  { label: "Stress Level", emoji: "😰" },
  { label: "Energy", emoji: "⚡" },
  { label: "Focus", emoji: "🎯" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [emotionalScores, setEmotionalScores] = useState<number[]>(emotionalQuestions.map(() => 3));
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 4) {
      setProcessing(true);
      setTimeout(() => { setProcessing(false); setStep(5); }, 3000);
    } else if (step === 5) {
      navigate("/dashboard");
    } else {
      setStep(step + 1);
    }
  };

  const progress = ((step + 1) / 6) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div className="h-full gradient-bg transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 pt-8">
        <div className="w-full max-w-2xl">

          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center animate-fade-in-up">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl gradient-bg shadow-lg">
                <Brain className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl font-extrabold mb-4">Welcome to <span className="gradient-text">MindSkill AI</span></h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">We're about to create a personalized learning experience that adapts to both your skills and how you feel.</p>
              <div className="space-y-3 max-w-sm mx-auto text-left mb-8">
                {["AI-powered skill analysis", "Emotional wellness tracking", "Personalized career roadmap"].map((t) => (
                  <div key={t} className="flex items-center gap-3 glass-card rounded-xl p-3">
                    <CheckCircle2 className="h-5 w-5 text-chart-green shrink-0" />
                    <span className="text-sm font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Career Path */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-3xl font-extrabold text-center mb-2">Choose Your Career Path</h2>
              <p className="text-center text-muted-foreground mb-8">What role are you working towards?</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {careerPaths.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setSelectedCareer(c.label)}
                    className={`glass-card hover-lift flex items-center gap-4 rounded-xl p-4 text-left transition-all ${selectedCareer === c.label ? "ring-2 ring-primary shadow-lg" : ""}`}
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.color}`}><c.icon className="h-5 w-5" /></div>
                    <span className="font-semibold text-sm">{c.label}</span>
                    {selectedCareer === c.label && <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Quiz */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-3xl font-extrabold text-center mb-2">Technical Assessment</h2>
              <p className="text-center text-muted-foreground mb-8">Let's understand your current skill level.</p>
              <div className="space-y-6">
                {quizQuestions.map((q, qi) => (
                  <div key={qi} className="glass-card rounded-xl p-6">
                    <p className="font-semibold mb-4">{q.q}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => { const a = [...quizAnswers]; a[qi] = oi; setQuizAnswers(a); }}
                          className={`rounded-lg border p-3 text-sm font-medium transition-all ${quizAnswers[qi] === oi ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Emotional Baseline */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-3xl font-extrabold text-center mb-2">Emotional Baseline</h2>
              <p className="text-center text-muted-foreground mb-8">How are you feeling right now? This helps us personalize your experience.</p>
              <div className="space-y-5">
                {emotionalQuestions.map((eq, i) => (
                  <div key={i} className="glass-card rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-sm">{eq.emoji} {eq.label}</span>
                      <span className="text-sm text-muted-foreground">{emotionalScores[i]}/5</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          onClick={() => { const s = [...emotionalScores]; s[i] = v; setEmotionalScores(s); }}
                          className={`h-10 flex-1 rounded-lg text-sm font-semibold transition-all ${emotionalScores[i] >= v ? "gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: AI Processing */}
          {step === 4 && !processing && (
            <div className="text-center animate-fade-in-up">
              <h2 className="font-display text-3xl font-extrabold mb-4">Ready to Analyze</h2>
              <p className="text-muted-foreground mb-8">Our AI will now process your responses and build your personalized roadmap.</p>
            </div>
          )}
          {processing && (
            <div className="text-center animate-fade-in-up">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full gradient-bg animate-pulse-soft">
                <Brain className="h-12 w-12 text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl font-extrabold mb-2">Analyzing Your Profile</h2>
              <p className="text-muted-foreground mb-6">Building your personalized learning roadmap...</p>
              <div className="mx-auto max-w-xs space-y-3">
                {["Mapping skill gaps...", "Analyzing emotional baseline...", "Generating roadmap..."].map((t, i) => (
                  <div key={t} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.8}s` }}>
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Results */}
          {step === 5 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-chart-green/10">
                  <Sparkles className="h-8 w-8 text-chart-green" />
                </div>
                <h2 className="font-display text-3xl font-extrabold mb-2">Your Roadmap is Ready!</h2>
                <p className="text-muted-foreground">Here's your personalized learning plan for <strong>{selectedCareer || "Frontend Developer"}</strong></p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                <div className="glass-card rounded-xl p-5 text-center">
                  <p className="text-3xl font-extrabold font-display gradient-text">62%</p>
                  <p className="text-sm text-muted-foreground mt-1">Current Readiness</p>
                </div>
                <div className="glass-card rounded-xl p-5 text-center">
                  <p className="text-3xl font-extrabold font-display gradient-text">12 wks</p>
                  <p className="text-sm text-muted-foreground mt-1">Est. Time to Job Ready</p>
                </div>
              </div>
              <div className="glass-card rounded-xl p-5 mb-6">
                <p className="font-semibold mb-3">Priority Focus Areas</p>
                {[{ skill: "React & Component Architecture", pct: 45 }, { skill: "TypeScript Proficiency", pct: 55 }, { skill: "System Design Basics", pct: 30 }].map((s) => (
                  <div key={s.skill} className="mb-3">
                    <div className="flex justify-between text-sm mb-1"><span>{s.skill}</span><span className="text-muted-foreground">{s.pct}%</span></div>
                    <div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full gradient-bg" style={{ width: `${s.pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {!processing && (
            <div className="mt-8 flex justify-between">
              {step > 0 && step < 5 ? (
                <Button variant="ghost" onClick={() => setStep(step - 1)}><ArrowLeft className="h-4 w-4" /> Back</Button>
              ) : <div />}
              <Button variant="hero" size="lg" onClick={handleNext} disabled={step === 1 && !selectedCareer}>
                {step === 0 ? "Let's Begin" : step === 5 ? "Go to Dashboard" : step === 4 ? "Analyze Now" : "Continue"} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
