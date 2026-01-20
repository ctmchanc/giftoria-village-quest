import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { FloatingHearts } from '@/components/game/FloatingHearts';

export default function IntroPage() {
  const navigate = useNavigate();
  const { markIntroSeen } = useGame();
  const [step, setStep] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        setShowButton(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [step]);

  const handleStart = () => {
    markIntroSeen();
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-love-light via-background to-dream-light flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts count={12} />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-energy">
        <Star className="w-8 h-8 sparkle" fill="currentColor" />
      </div>
      <div className="absolute top-20 right-16 text-primary">
        <Sparkles className="w-6 h-6 sparkle" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute bottom-32 left-20 text-magic">
        <Star className="w-6 h-6 sparkle" fill="currentColor" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-20 right-10 text-love">
        <Heart className="w-10 h-10 float-animation" fill="currentColor" />
      </div>

      <div className="text-center z-10 max-w-lg">
        {/* Main Title */}
        <div className={`transition-all duration-700 ${step >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-7xl mb-4">🏘️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-shadow-soft">
            Our Village
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Love Story
          </h2>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-700 delay-300 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl text-muted-foreground mb-4">
            ✨ A Birthday Adventure ✨
          </p>
        </div>

        {/* Message */}
        <div className={`transition-all duration-700 delay-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border mb-8">
            <p className="text-lg text-foreground leading-relaxed">
              Welcome to our magical village where all our characters live! 
              Complete each level to unlock special gifts and discover the love story of 
              <span className="font-bold text-primary"> Mr Bubbles </span> 
              and 
              <span className="font-bold text-love"> Lil Guava</span>! 💕
            </p>
          </div>
        </div>

        {/* Characters Preview */}
        <div className={`transition-all duration-700 delay-700 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {['🦖', '🐉', '🤖', '🎨', '💙', '💕', '🧙', '🥺', '😴', '⚡'].map((emoji, i) => (
              <span
                key={i}
                className="text-3xl bounce-soft"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Start Button */}
        {showButton && (
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-xl font-bold shadow-lg animate-scale-in hover:scale-105 transition-transform"
          >
            <Heart className="w-6 h-6 mr-2" fill="currentColor" />
            Start Adventure
          </Button>
        )}
      </div>

      {/* Birthday decorations */}
      <div className="absolute bottom-4 text-center text-muted-foreground text-sm">
        🎂 Happy Birthday! 🎂
      </div>
    </div>
  );
}
