// src/components/pricing/PricingCardModern.tsx
// Modern premium pricing card design with new visual placement

import React from 'react';
import { ArrowRight, Check, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PricingTier, BillingPeriod } from '@/types/pricing';
import { cn } from '@/lib/utils';

interface PricingCardModernProps {
  tier: PricingTier;
  billingPeriod: BillingPeriod;
  onCtaClick?: (tierId: string) => void;
  index: number;
}

export default function PricingCardModern({
  tier,
  billingPeriod,
  onCtaClick,
  index,
}: PricingCardModernProps) {
  const price = billingPeriod === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
  const displayPrice = price === 0 ? 'Custom' : `$${price.toFixed(2)}`;

  const handleCtaClick = () => {
    onCtaClick?.(tier.id);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-3xl backdrop-blur-xl transition-all duration-500',
        'hover:shadow-2xl hover:-translate-y-2',
        tier.popular
          ? 'col-span-1 md:col-span-1 border-2 border-primary bg-gradient-to-br from-primary/15 to-accent/10 shadow-2xl scale-100 md:scale-105 origin-center'
          : 'border border-border/50 bg-card/40 hover:bg-card/60 hover:border-primary/40',
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Animated Gradient Background */}
      <div
        className={cn(
          'absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10',
          tier.popular ? 'bg-gradient-to-br from-primary/40 to-accent/40' : 'bg-gradient-to-br from-primary/20 to-accent/20',
        )}
      />

      {/* Top Accent Line */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1 rounded-t-3xl',
          tier.popular ? 'bg-gradient-to-r from-primary to-accent' : 'bg-gradient-to-r from-border/20 to-border/5',
        )}
      />

      <div className="p-8 pb-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </div>
            {tier.badge && (
              <Badge className="whitespace-nowrap ml-2 bg-gradient-to-r from-primary/80 to-accent/80 border-0 text-white shadow-lg">
                <Zap className="h-3 w-3 mr-1" />
                {tier.badge}
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-8 p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/30">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-5xl font-bold tracking-tight">{displayPrice}</span>
            {displayPrice !== 'Custom' && (
              <span className="text-sm text-muted-foreground ml-1">
                /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
              </span>
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
          className={cn(
            'w-full mb-8 group/btn h-11 rounded-xl font-semibold transition-all duration-300',
            tier.popular
              ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl'
              : 'border border-primary/40 bg-primary/5 hover:bg-primary/10 text-foreground hover:border-primary/60',
          )}
        >
          {tier.cta.label}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>

        {/* Divider */}
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Features List */}
        <div className="space-y-3">
          {tier.features.map((feature) => (
            <div key={feature.id} className="flex items-center gap-3 group/feature">
              <div
                className={cn(
                  'flex-shrink-0 rounded-full p-1 transition-all',
                  feature.included
                    ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                    : 'bg-muted text-muted-foreground/30',
                )}
              >
                {feature.included ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </div>
              <span
                className={cn(
                  'text-sm leading-relaxed transition-colors',
                  feature.included
                    ? 'text-foreground group-hover/feature:text-primary'
                    : 'text-muted-foreground/60',
                )}
                title={feature.tooltip}
              >
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
