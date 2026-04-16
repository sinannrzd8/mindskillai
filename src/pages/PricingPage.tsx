import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started.",
    features: ["5 learning modules", "Basic skill assessment", "Daily mood check-in", "Community access", "1 certification"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    desc: "For serious learners ready to level up.",
    features: ["Unlimited modules", "Full AI adaptive engine", "Emotional analytics", "Unlimited certifications", "Mentor matching", "Career readiness score", "Priority support"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For teams and organizations.",
    features: ["Everything in Pro", "Team dashboards", "Employer talent access", "Custom integrations", "Dedicated success manager", "SSO & compliance", "Volume discounts"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-primary mb-2">PRICING</p>
          <h1 className="font-display text-4xl font-extrabold md:text-5xl mb-4">Simple, Transparent <span className="gradient-text">Pricing</span></h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">Start free and upgrade when you're ready. No hidden fees.</p>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {plans.map((p) => (
              <div key={p.name} className={`glass-card hover-lift rounded-2xl p-8 text-left relative ${p.popular ? "ring-2 ring-primary shadow-xl" : ""}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-bg px-4 py-1 text-xs font-bold text-primary-foreground">Most Popular</div>
                )}
                <h3 className="font-display text-xl font-bold mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                <div className="mb-6">
                  <span className="font-display text-4xl font-extrabold">{p.price}</span>
                  <span className="text-muted-foreground text-sm">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-chart-green shrink-0" /> {f}</li>
                  ))}
                </ul>
                <Button variant={p.popular ? "hero" : "hero-outline"} size="lg" className="w-full" asChild>
                  <Link to="/onboarding">{p.popular && <Sparkles className="h-4 w-4" />} {p.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
