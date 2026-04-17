// src/components/pricing/TestimonialsSection.tsx
// Customer testimonials section with reviews

import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/pricing';

export default function TestimonialsSection() {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by 10,000+ Teams</h2>
        <p className="text-muted-foreground text-lg">Join thousands of companies growing with us</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all duration-300 hover:shadow-lg"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-foreground mb-6 leading-relaxed italic">&quot;{testimonial.quote}&quot;</p>

            {/* Author */}
            <div className="border-t border-border/30 pt-4">
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              <p className="text-xs text-primary font-medium">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
