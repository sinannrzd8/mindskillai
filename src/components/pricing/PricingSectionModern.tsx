// src/components/pricing/PricingSectionModern.tsx
// Modern pricing section with new design placement

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BillingToggle from './BillingToggle';
import PricingCardsModern from './PricingCardsModern';
import FAQSection from './FAQSection';
import TestimonialsSection from './TestimonialsSection';
import TrustBadges from './TrustBadges';
import { Button } from '@/components/ui/button';
import { BillingPeriod } from '@/types/pricing';
import { Sparkles } from 'lucide-react';

interface PricingSectionModernProps {
  showTitle?: boolean;
  showHero?: boolean;
}

export default function PricingSectionModern({ showTitle = true, showHero = true }: PricingSectionModernProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    if (planId === 'basic') {
      navigate('/plans');
    } else if (planId === 'pro') {
      navigate('/payment');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      {showHero && (
        <div className="relative py-20 px-4 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div>

          <div className="text-center max-w-4xl mx-auto mb-12 relative z-10">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
              <span className="text-sm font-semibold text-primary">💎 Simple Transparent Pricing</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Plans that fit your <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">journey</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Start with Starter. Scale to Pro. No hidden fees, no surprises. Upgrade or downgrade anytime.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-12">
        {/* Billing Toggle */}
        <BillingToggle billingPeriod={billingPeriod} onToggle={setBillingPeriod} />

        {/* Pricing Cards - Modern Layout */}
        <PricingCardsModern billingPeriod={billingPeriod} onPlanSelect={handlePlanSelect} />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />

        {/* CTA Section */}
        <div className="mt-20 py-16 px-8 rounded-3xl relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl border border-primary/20" />
          <div className="absolute inset-0 -z-10 rounded-3xl opacity-30">
            <div className="absolute inset-0 rounded-3xl blur-2xl bg-gradient-to-r from-primary/40 to-accent/40" />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need help choosing?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
              Our team is here to help you find the perfect plan. Chat with us anytime.
            </p>
            <Button size="lg" className="group bg-primary hover:bg-primary/90 shadow-lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Chat with Sales
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
