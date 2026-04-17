// src/components/pricing/PricingSection.tsx
// Main pricing section component - complete and production-ready

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BillingToggle from './BillingToggle';
import PricingCards from './PricingCards';
import FAQSection from './FAQSection';
import TestimonialsSection from './TestimonialsSection';
import TrustBadges from './TrustBadges';
import { Button } from '@/components/ui/button';
import { BillingPeriod } from '@/types/pricing';

interface PricingSectionProps {
  showTitle?: boolean;
  showHero?: boolean;
}

export default function PricingSection({ showTitle = true, showHero = true }: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    if (planId === 'basic') {
      // Redirect to free plan selection or dashboard
      navigate('/plans');
    } else if (planId === 'pro') {
      // Redirect to payment page
      navigate('/payment');
    } else if (planId === 'enterprise') {
      // Show contact form or redirect to sales page
      alert('Contact our sales team at sales@mindskill.ai');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      {showHero && (
        <div className="py-20 px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <span className="text-sm font-semibold text-primary">Simple, Transparent Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Pricing that scales with your <span className="gradient-bg bg-clip-text text-transparent">growth</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Choose the perfect plan for your needs. Always flexible to upgrade or downgrade as you grow.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-12">
        {/* Billing Toggle */}
        <BillingToggle billingPeriod={billingPeriod} onToggle={setBillingPeriod} />

        {/* Pricing Cards */}
        <PricingCards billingPeriod={billingPeriod} onPlanSelect={handlePlanSelect} />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection />

        {/* CTA Section */}
        <div className="mt-20 py-16 px-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
          <h2 className="text-3xl font-bold mb-4">Still not sure which plan?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're here to help! Book a demo call with our team to find the perfect plan for your specific needs.
          </p>
          <Button size="lg" className="group">
            Schedule Demo Call
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
