import React from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeartsProps {
  count?: number;
  colors?: string[];
}

export function FloatingHearts({ count = 8, colors = ['text-love', 'text-primary', 'text-passion'] }: FloatingHeartsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: count }).map((_, i) => {
        const delay = Math.random() * 5;
        const duration = 4 + Math.random() * 3;
        const left = Math.random() * 100;
        const size = 12 + Math.random() * 16;
        const colorClass = colors[i % colors.length];
        
        return (
          <Heart
            key={i}
            className={`absolute ${colorClass} opacity-30 float-animation`}
            style={{
              left: `${left}%`,
              top: `${10 + Math.random() * 80}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
            fill="currentColor"
          />
        );
      })}
    </div>
  );
}
