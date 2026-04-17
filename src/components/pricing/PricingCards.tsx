// src/components/pricing/PricingCards.tsx
// Grid layout component for pricing cards

import React from 'react';
import PricingCard from './PricingCard';
import { pricingTiers } from '@/data/pricing';
import { BillingPeriod } from '@/types/pricing';

interface PricingCardsProps {
  billingPeriod: BillingPeriod;
  onPlanSelect: (planId: string) => void;
}

export default function PricingCards({ billingPeriod, onPlanSelect }: PricingCardsProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3 max-w-7xl mx-auto">
      {pricingTiers.map((tier) => (
        <PricingCard
          key={tier.id}
          tier={tier}
          billingPeriod={billingPeriod}
          onCtaClick={() => onPlanSelect(tier.id)}
        />
      ))}
    </div>
  );
}
