// src/types/pricing.ts
// Type definitions for pricing system

export type BillingPeriod = 'monthly' | 'yearly';

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: PricingFeature[];
  cta: {
    label: string;
    action: string; // 'subscribe', 'contact', etc
  };
  badge?: string; // e.g., "Most Popular", "Best Value"
}

export interface PricingFeature {
  id: string;
  name: string;
  included: boolean;
  tooltip?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating: number;
}
