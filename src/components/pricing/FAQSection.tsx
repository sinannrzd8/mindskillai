// src/components/pricing/FAQSection.tsx
// Frequently Asked Questions section

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/data/pricing';
import { cn } from '@/lib/utils';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-lg">Have questions? We have answers.</p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item) => (
          <div
            key={item.id}
            className="border border-border/40 rounded-lg backdrop-blur-sm bg-card/30 overflow-hidden hover:border-primary/30 transition-colors"
          >
            <button
              onClick={() => toggleFaq(item.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-primary/5 transition-colors"
            >
              <span className="text-left font-semibold text-foreground">{item.question}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-primary transition-transform duration-300',
                  openId === item.id && 'rotate-180',
                )}
              />
            </button>

            {openId === item.id && (
              <div className="px-6 pb-6 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
