// src/components/pricing/PricingCardsModern.tsx
// Modern grid layout with enhanced visual placement

import React from 'react';
import PricingCardModern from './PricingCardModern';
import { pricingTiers } from '@/data/pricing';
import { BillingPeriod } from '@/types/pricing';

interface PricingCardsModernProps {
  billingPeriod: BillingPeriod;
  onPlanSelect: (planId: string) => void;
}

export default function PricingCardsModern({ billingPeriod, onPlanSelect }: PricingCardsModernProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto items-center">
      {pricingTiers.map((tier, index) => (
        <PricingCardModern
          key={tier.id}
          tier={tier}
          billingPeriod={billingPeriod}
          onCtaClick={() => onPlanSelect(tier.id)}
          index={index}
        />
      ))}
    </div>
  );
}
