// src/components/pricing/TrustBadges.tsx
// Trust and security badges section

import React from 'react';
import { trustBadges } from '@/data/pricing';

export default function TrustBadges() {
  return (
    <div className="py-12 border-t border-border/30">
      <div className="flex flex-wrap justify-center gap-6 md:gap-12">
        {trustBadges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all cursor-help group"
            title={badge.tooltip}
          >
            <span className="text-lg">{badge.label}</span>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {badge.tooltip}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
