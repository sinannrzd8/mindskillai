// src/components/pricing/PricingCard.tsx
// Individual pricing card component with features and CTA

import React from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PricingTier, BillingPeriod } from '@/types/pricing';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  tier: PricingTier;
  billingPeriod: BillingPeriod;
  onCtaClick?: (tierId: string) => void;
}

export default function PricingCard({ tier, billingPeriod, onCtaClick }: PricingCardProps) {
  const price = billingPeriod === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
  const displayPrice = price === 0 ? 'Custom' : `$${price}`;

  const handleCtaClick = () => {
    onCtaClick?.(tier.id);
  };

  return (
    <div
      className={cn(
        'relative group flex flex-col rounded-2xl backdrop-blur-sm transition-all duration-500',
        'border hover:shadow-2xl hover:scale-105',
        tier.popular
          ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-accent/5 shadow-lg scale-105'
          : 'border-border/40 bg-card/50 hover:border-primary/30',
      )}
    >
      {/* Gradient Glow Effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10',
          tier.popular ? 'bg-gradient-to-r from-primary/30 to-accent/30' : 'bg-gradient-to-r from-primary/10 to-accent/10',
        )}
      />

      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          {tier.badge && (
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              ⭐ {tier.badge}
            </Badge>
          )}
          <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
          <p className="text-sm text-muted-foreground">{tier.description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-bold">
              {displayPrice === 'Custom' ? displayPrice : displayPrice}
            </span>
            {displayPrice !== 'Custom' && (
              <span className="text-muted-foreground">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
            )}
          </div>
          {billingPeriod === 'yearly' && tier.id !== 'enterprise' && (
            <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
              ${(price / 12).toFixed(2)}/month billed annually
            </p>
          )}
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleCtaClick}
          variant={tier.popular ? 'default' : 'outline'}
          className={cn(
            'w-full mb-8 group/btn transition-all duration-300',
            tier.popular
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl'
              : 'hover:border-primary/50 hover:bg-primary/5',
          )}
        >
          {tier.cta.label}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>

        {/* Features List */}
        <div className="space-y-4">
          {tier.features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-3">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
              )}
              <span
                className={cn(
                  'text-sm leading-relaxed',
                  feature.included ? 'text-foreground' : 'text-muted-foreground/60 line-through',
                )}
                title={feature.tooltip}
              >
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="px-8 pb-8 border-t border-border/30" />
    </div>
  );
}
