import React, { useState } from 'react';
import { Gift, Heart, Sparkles, X, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Confetti } from './Confetti';
import { cn } from '@/lib/utils';

interface GiftRevealProps {
  level: number;
  message: string;
  photoUrl?: string;
  onClose: () => void;
}

export function GiftReveal({ level, message, photoUrl, onClose }: GiftRevealProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenGift = () => {
    setIsOpened(true);
    setShowConfetti(true);
  };

  const levelTitles: Record<number, string> = {
    1: '🔥 Passion Unlocked!',
    2: '🏠 Harmony Found!',
    3: '💕 Love Overflows!',
    4: '✨ Magic & Closeness!',
    5: '☁️ Dreamy Cuddles!',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
      <Confetti active={showConfetti} />
      
      <div className={cn(
        "relative bg-card rounded-3xl shadow-2xl max-w-md w-full p-6 animate-scale-in",
        "border-4 border-primary"
      )}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!isOpened ? (
          <div className="text-center py-8">
            <div className="relative inline-block">
              <Gift className="w-24 h-24 text-primary float-animation" />
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-energy sparkle" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mt-6 mb-2">
              Level {level} Complete!
            </h2>
            <p className="text-muted-foreground mb-6">
              You've unlocked a special gift! 🎁
            </p>
            <Button
              onClick={handleOpenGift}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 animate-heart-beat"
            >
              <Heart className="w-5 h-5 mr-2" fill="currentColor" />
              Open Gift
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <h2 className="text-xl font-bold text-primary mb-4">
              {levelTitles[level] || '🎁 Gift Unlocked!'}
            </h2>
            
            {/* Photo section - shows placeholder if no photo provided */}
            <div className="mb-4 rounded-2xl overflow-hidden border-2 border-love-light">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Special memory"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-muted/50 flex flex-col items-center justify-center gap-3">
                  <div className="relative">
                    <ImagePlus className="w-12 h-12 text-muted-foreground/60" />
                    <Heart className="absolute -bottom-1 -right-1 w-5 h-5 text-love" fill="currentColor" />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm font-medium text-muted-foreground">Photo Placeholder</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Add your special memory here! 📸</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-love-light rounded-2xl p-4 mb-6">
              <p className="text-foreground text-lg italic leading-relaxed">
                "{message}"
              </p>
            </div>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-full px-6"
            >
              Continue Adventure
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
