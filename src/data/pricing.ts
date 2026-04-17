// src/data/pricing.ts
// Pricing data - realistic and investor-ready

import { PricingTier, FAQItem, Testimonial } from '@/types/pricing';

export const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Starter',
    description: 'Perfect for beginners and small projects',
    monthlyPrice: 1.99,
    yearlyPrice: 19.90,
    features: [
      { id: 'users-1', name: 'Up to 3 team members', included: true },
      { id: 'api-1', name: '1,000 API calls/month', included: true },
      { id: 'storage-1', name: '10 GB storage', included: true },
      { id: 'support-1', name: 'Email support', included: true },
      { id: 'analytics-1', name: 'Basic analytics', included: true },
      { id: 'custom-1', name: 'Custom domain', included: false },
      { id: 'sso-1', name: 'Single Sign-On (SSO)', included: false },
      { id: 'api-priority-1', name: 'Priority API support', included: false },
    ],
    cta: {
      label: 'Get Started',
      action: 'subscribe',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams and scalable applications',
    monthlyPrice: 4.99,
    yearlyPrice: 49.90,
    popular: true,
    badge: 'Most Popular',
    features: [
      { id: 'users-2', name: 'Up to 20 team members', included: true },
      { id: 'api-2', name: 'Unlimited API calls', included: true },
      { id: 'storage-2', name: '500 GB storage', included: true },
      { id: 'support-2', name: 'Priority email & chat support', included: true },
      { id: 'analytics-2', name: 'Advanced analytics & reports', included: true },
      { id: 'custom-2', name: 'Custom domain & branding', included: true },
      { id: 'sso-2', name: 'Single Sign-On (SSO)', included: true },
      { id: 'api-priority-2', name: 'Priority API support (24/7)', included: false },
    ],
    cta: {
      label: 'Start Pro Trial',
      action: 'subscribe',
    },
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Can I switch plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle. If you upgrade, we\'ll pro-rate your new plan.',
  },
  {
    id: 'faq-2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), and PayPal for secure and convenient payments.',
  },
  {
    id: 'faq-3',
    question: 'Do you offer annual discounts?',
    answer: 'Yes! Annual billing saves you 20% compared to monthly billing. You can switch to annual at any time and receive a prorated credit for your current plan.',
  },
  {
    id: 'faq-4',
    question: 'Is there a free trial?',
    answer: 'Absolutely! All plans include a 14-day free trial. No credit card required. All features are fully accessible during the trial period.',
  },
  {
    id: 'faq-5',
    question: 'What happens after the free trial?',
    answer: 'You\'ll receive email reminders before your trial expires. If you don\'t add a payment method, your account will be downgraded to our free tier (if available).',
  },
  {
    id: 'faq-6',
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact our support team for a full refund.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechVenture Inc',
    quote: 'Switching to the Pro plan was a game-changer. Our team productivity increased by 40% and the support team is incredibly responsive.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Marcus Thompson',
    role: 'CTO',
    company: 'CloudScale Systems',
    quote: 'The Pro plan gave us everything we needed. The priority support team is incredibly responsive and helped us scale quickly.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Elena Rodriguez',
    role: 'Founder',
    company: 'StartupHub',
    quote: 'As a startup, we appreciated the flexibility. Started with Starter, moved to Pro, and the transition was seamless.',
    rating: 5,
  },
];

export const trustBadges = [
  { id: 'sec-1', label: '🔒 SOC 2 Certified', tooltip: 'Security and availability certified' },
  { id: 'sec-2', label: '🛡️ GDPR Compliant', tooltip: 'Your data privacy is protected' },
  { id: 'sec-3', label: '⭐ 99.9% Uptime SLA', tooltip: 'Enterprise-grade reliability' },
  { id: 'sec-4', label: '🚀 24/7 Support', tooltip: 'Always here when you need us' },
];
