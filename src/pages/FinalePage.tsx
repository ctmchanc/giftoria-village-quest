import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { Confetti } from '@/components/game/Confetti';
import { FloatingHearts } from '@/components/game/FloatingHearts';

export default function FinalePage() {
  const navigate = useNavigate();
  const { gameState } = useGame();
  const [showConfetti, setShowConfetti] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!gameState.hasCompletedGame) {
      navigate('/map');
      return;
    }

    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2500),
      setTimeout(() => setStage(3), 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [gameState.hasCompletedGame, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-nature-light via-love-light to-energy-light relative overflow-hidden">
      <Confetti active={showConfetti} />
      <FloatingHearts count={15} colors={['text-love', 'text-primary', 'text-energy']} />

      {/* Decorative elements */}
      <Star className="absolute top-8 left-8 w-8 h-8 text-energy sparkle" fill="currentColor" />
      <Sparkles className="absolute top-16 right-12 w-6 h-6 text-magic sparkle" />
      <Star className="absolute bottom-32 left-12 w-6 h-6 text-energy sparkle" fill="currentColor" />

      <div className="container max-w-lg mx-auto px-4 py-8 relative z-10">
        {/* Title */}
        <div className={`text-center mb-8 transition-all duration-700 ${stage >= 0 ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl font-bold text-foreground mb-2">🎉 Happy Birthday! 🎉</h1>
          <p className="text-xl text-muted-foreground">You completed the adventure!</p>
        </div>

        {/* Picnic Scene */}
        <div className={`transition-all duration-700 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card rounded-3xl p-6 shadow-xl border-4 border-nature mb-6">
            <h2 className="text-xl font-bold text-center text-foreground mb-4">
              🧺 Garden Picnic 🌸
            </h2>
            
            {/* Main characters picnic */}
            <div className="relative bg-gradient-to-b from-nature-light to-energy-light rounded-2xl p-6 mb-4 min-h-[200px]">
              {/* Garden decorations */}
              <span className="absolute top-2 left-4 text-xl">🌸</span>
              <span className="absolute top-4 right-6 text-lg">🌷</span>
              <span className="absolute bottom-4 left-8 text-lg">🌻</span>
              <span className="absolute bottom-6 right-4 text-xl">🦋</span>
              
              {/* Picnic blanket */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-16 bg-love-light rounded-full opacity-60" />
              
              {/* Mr Bubbles & Lil Guava */}
              <div className="flex justify-center items-end gap-4 pt-8">
                <div className="text-center animate-scale-in">
                  <div className="text-6xl mb-2">🛁</div>
                  <p className="text-sm font-bold text-secondary">Mr Bubbles</p>
                </div>
                <div className="text-4xl animate-heart-beat">💕</div>
                <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <div className="text-6xl mb-2">🍐</div>
                  <p className="text-sm font-bold text-nature">Lil Guava</p>
                </div>
              </div>
              
              {/* Picnic items */}
              <div className="flex justify-center gap-2 mt-4">
                <span className="text-2xl">🧺</span>
                <span className="text-2xl">🍰</span>
                <span className="text-2xl">🍓</span>
              </div>
            </div>

            <p className="text-center text-foreground italic">
              "Happily together, forever in our village..." 💕
            </p>
          </div>
        </div>

        {/* Young versions glimpse */}
        <div className={`transition-all duration-700 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card/80 backdrop-blur rounded-2xl p-4 shadow-lg border-2 border-love-light mb-6">
            <h3 className="text-center text-muted-foreground text-sm mb-3">
              ✨ A glimpse from long ago... ✨
            </h3>
            
            <div className="flex justify-center items-center gap-6">
              {/* Young Turnip */}
              <div className="text-center">
                <div className="text-4xl mb-1">🥒</div>
                <p className="text-xs text-muted-foreground">Young Turnip</p>
              </div>
              
              <Heart className="w-6 h-6 text-love animate-heart-beat" fill="currentColor" />
              
              {/* Young Girl */}
              <div className="text-center">
                <div className="relative">
                  <div className="text-4xl mb-1">👧</div>
                  {/* Chocolate on lips detail */}
                  <span className="absolute -bottom-1 right-0 text-xs">🍫</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="block">Messy hair, big grin</span>
                  <span className="block text-secondary">Blue flower skirt 💙🌸</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final message */}
        <div className={`transition-all duration-700 ${stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="bg-love-light rounded-2xl p-6 text-center mb-6 border-2 border-love">
            <p className="text-lg text-foreground font-medium leading-relaxed">
              "[Your final birthday message goes here - make it special! This is where you can add a clue to his real birthday gift! 🎁💕]"
            </p>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate('/map')}
              variant="outline"
              className="rounded-full mr-4"
            >
              Replay Adventure
            </Button>
            <Button
              onClick={() => setShowConfetti(true)}
              className="bg-primary hover:bg-primary/90 rounded-full"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              More Confetti!
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 text-center text-muted-foreground text-sm">
        Made with 💕 for you
      </div>
    </div>
  );
}
