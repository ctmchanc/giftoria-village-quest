import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';
import { FloatingHearts } from '@/components/game/FloatingHearts';
import introBg from '@/assets/backgrounds/intro-bg.png';

const CORRECT_PASSWORD = 'thirtyfineee';

export default function IntroPage() {
  const navigate = useNavigate();
  const { markIntroSeen } = useGame();
  const [step, setStep] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isUnlocked) return;
    
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        setShowButton(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [step, isUnlocked]);

  const handleStart = () => {
    markIntroSeen();
    navigate('/map');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Wrong password, try again! 💔');
    }
  };

  // Password Gate
  if (!isUnlocked) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
        style={{
          backgroundImage: `url(${introBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
        
        <FloatingHearts count={8} />
        
        <div className="z-10 bg-card/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-primary/30 max-w-sm w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Secret Entrance 🔐</h1>
            <p className="text-muted-foreground text-sm">Enter the magic password to begin your adventure!</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center text-lg py-6 rounded-xl border-2 border-primary/30 focus:border-primary"
              autoFocus
            />
            
            {error && (
              <p className="text-destructive text-sm text-center animate-shake">{error}</p>
            )}
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 text-lg font-bold"
            >
              <Heart className="w-5 h-5 mr-2" fill="currentColor" />
              Enter
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        backgroundImage: `url(${introBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />
      
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-shadow-soft drop-shadow-lg">
            Our Village
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 drop-shadow-lg">
            Love Story
          </h2>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-700 delay-300 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl text-foreground font-medium mb-4 drop-shadow-md">
            ✨ A Birthday Adventure ✨
          </p>
        </div>

        {/* Message */}
        <div className={`transition-all duration-700 delay-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border mb-8">
            <p className="text-lg text-foreground leading-relaxed">
              Welcome to our magical village where all our characters live! 
              Complete each level to unlock special gifts and discover the love story of 
              <span className="font-bold text-primary"> Mr Bubbles </span> 
              and 
              <span className="font-bold text-love"> Lil Guava</span>! 💕
            </p>
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
      <div className="absolute bottom-4 text-center text-foreground text-sm font-medium drop-shadow-md">
        🎂 Happy Birthday! 🎂
      </div>
    </div>
  );
}
