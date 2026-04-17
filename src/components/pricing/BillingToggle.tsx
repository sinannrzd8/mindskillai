// src/components/pricing/BillingToggle.tsx
// Monthly/Yearly billing toggle with discount badge

import React from 'react';
import { Check } from 'lucide-react';
import { BillingPeriod } from '@/types/pricing';

interface BillingToggleProps {
  billingPeriod: BillingPeriod;
  onToggle: (period: BillingPeriod) => void;
}

export default function BillingToggle({ billingPeriod, onToggle }: BillingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm rounded-full p-1 border border-border/40">
        <button
          onClick={() => onToggle('monthly')}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            billingPeriod === 'monthly'
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Monthly
          {billingPeriod === 'monthly' && <Check className="h-4 w-4" />}
        </button>
        <button
          onClick={() => onToggle('yearly')}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            billingPeriod === 'yearly'
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Yearly
          {billingPeriod === 'yearly' && <Check className="h-4 w-4" />}
        </button>
      </div>

      {billingPeriod === 'yearly' && (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-sm font-semibold text-green-600 dark:text-green-400 animate-pulse">
          <span>💰</span>
          <span>Save 20% with annual billing</span>
        </div>
      )}
    </div>
  );
}
