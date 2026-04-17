// src/components/pricing/PricingPreview.tsx
// Compact pricing preview for homepage - shows 3 plans without full page

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BillingToggle from './BillingToggle';
import PricingCards from './PricingCards';
import { BillingPeriod } from '@/types/pricing';
import { Button } from '@/components/ui/button';

export default function PricingPreview() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    navigate('/pricing', { state: { selectedPlan: planId } });
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <span className="text-sm font-semibold text-primary">Affordable Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Plans for every <span className="gradient-bg bg-clip-text text-transparent">stage</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a plan that fits your needs. Scale up whenever you're ready.
          </p>
        </div>

        {/* Billing Toggle */}
        <BillingToggle billingPeriod={billingPeriod} onToggle={setBillingPeriod} />

        {/* Pricing Cards */}
        <PricingCards billingPeriod={billingPeriod} onPlanSelect={handlePlanSelect} />

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Have custom requirements?</p>
          <Button size="lg" variant="outline">
            View Full Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
