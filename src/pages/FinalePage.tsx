import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { Confetti } from '@/components/game/Confetti';
import { FloatingHearts } from '@/components/game/FloatingHearts';
import { CharacterSprite } from '@/components/game/CharacterSprite';
import finaleBg from '@/assets/backgrounds/finale-bg.png';

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
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${finaleBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/30" />
      
      <Confetti active={showConfetti} />
      <FloatingHearts count={15} colors={['text-love', 'text-primary', 'text-energy']} />

      {/* Decorative elements */}
      <Star className="absolute top-8 left-8 w-8 h-8 text-energy sparkle z-10" fill="currentColor" />
      <Sparkles className="absolute top-16 right-12 w-6 h-6 text-magic sparkle z-10" />
      <Star className="absolute bottom-32 left-12 w-6 h-6 text-energy sparkle z-10" fill="currentColor" />

      <div className="container max-w-lg mx-auto px-4 py-8 relative z-10">
        {/* Title */}
        <div className={`text-center mb-8 transition-all duration-700 ${stage >= 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl py-4 px-6 inline-block shadow-lg">
            <h1 className="text-4xl font-bold text-foreground mb-2">🎉 Happy Birthday! 🎉</h1>
            <p className="text-xl text-muted-foreground">You completed the adventure!</p>
          </div>
        </div>

        {/* Picnic Scene */}
        <div className={`transition-all duration-700 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-nature mb-6">
            <h2 className="text-xl font-bold text-center text-foreground mb-4">
              🧺 Garden Picnic 🌸
            </h2>
            
            {/* Main characters picnic */}
            <div className="flex justify-center items-end gap-4 py-6">
              <div className="text-center animate-scale-in">
                <CharacterSprite character="mrBubbles" size="xl" />
                <p className="text-sm font-bold text-secondary mt-2">Mr Bubbles</p>
              </div>
              <div className="text-5xl animate-heart-beat mb-8">💕</div>
              <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CharacterSprite character="lilGuava" size="xl" />
                <p className="text-sm font-bold text-nature mt-2">Lil Guava</p>
              </div>
            </div>

            <p className="text-center text-foreground italic">
              "Happily together, forever in our village..." 💕
            </p>
          </div>
        </div>

        {/* Young versions glimpse */}
        <div className={`transition-all duration-700 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-love-light mb-6">
            <h3 className="text-center text-muted-foreground text-sm mb-4">
              ✨ A glimpse from long ago... ✨
            </h3>
            
            <div className="flex justify-center items-center gap-6">
              {/* Young Turnip */}
              <div className="text-center">
                <CharacterSprite character="youngTurnip" size="md" />
                <p className="text-xs text-muted-foreground mt-1">Young Turnip</p>
              </div>
              
              <Heart className="w-8 h-8 text-love animate-heart-beat" fill="currentColor" />
              
              {/* Young Girl */}
              <div className="text-center">
                <CharacterSprite character="youngGirl" size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* Final message */}
        <div className={`transition-all duration-700 ${stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="bg-love-light/90 backdrop-blur-sm rounded-2xl p-6 text-center mb-6 border-2 border-love">
            <p className="text-lg text-foreground font-medium leading-relaxed">
              "[Your final birthday message goes here - make it special! This is where you can add a clue to his real birthday gift! 🎁💕]"
            </p>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate('/map')}
              variant="outline"
              className="rounded-full mr-4 bg-card/80"
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
      <div className="fixed bottom-4 left-0 right-0 text-center text-foreground text-sm font-medium drop-shadow-md">
        Made with 💕 for you
      </div>
    </div>
  );
}
