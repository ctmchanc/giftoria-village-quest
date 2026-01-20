import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { DialogueBubble } from '@/components/game/DialogueBubble';
import { CharacterSprite } from '@/components/game/CharacterSprite';
import { GiftReveal } from '@/components/game/GiftReveal';
import { cn } from '@/lib/utils';
import level4Bg from '@/assets/backgrounds/level4-bg.png';

const GIFT_MESSAGE = "[Your sweet message about togetherness goes here - about how you love being near him! ✨🥺]";

export default function Level4() {
  const navigate = useNavigate();
  const { completeLevel, gameState } = useGame();
  const [stage, setStage] = useState<'intro' | 'puzzle' | 'complete'>('intro');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [wizzyPosition, setWizzyPosition] = useState({ x: 50, y: 30 });
  const [needyPosition, setNeedyPosition] = useState({ x: 20, y: 70 });
  const [stayCloseTicks, setStayCloseTicks] = useState(0);
  const isCompleted = gameState.completedLevels.includes(4);

  const dialogues = [
    { character: 'Wizzy', text: "Ah, I'm working on important magic spells! The village needs me! 🧙✨", color: 'bg-magic' },
    { character: 'Needy', text: "But I want to be with youuu~ Don't leave me! 🥺", color: 'bg-love' },
    { character: 'Wizzy', text: "...Okay fine, you can follow me. Just help us stay close while I work! (I secretly love it)", color: 'bg-magic' },
  ];

  const distance = Math.sqrt(
    Math.pow(wizzyPosition.x - needyPosition.x, 2) + 
    Math.pow(wizzyPosition.y - needyPosition.y, 2)
  );
  const isClose = distance < 25;
  const goalTicks = 30;

  useEffect(() => {
    if (stage !== 'puzzle' || isCompleted) return;

    const moveWizzy = () => {
      setWizzyPosition(prev => ({
        x: Math.max(10, Math.min(90, prev.x + (Math.random() - 0.5) * 20)),
        y: Math.max(10, Math.min(90, prev.y + (Math.random() - 0.5) * 15)),
      }));
    };

    const interval = setInterval(moveWizzy, 1500);
    return () => clearInterval(interval);
  }, [stage, isCompleted]);

  useEffect(() => {
    if (stage !== 'puzzle' || isCompleted) return;

    const checkDistance = () => {
      if (isClose) {
        setStayCloseTicks(prev => prev + 1);
      } else {
        setStayCloseTicks(prev => Math.max(0, prev - 1));
      }
    };

    const interval = setInterval(checkDistance, 100);
    return () => clearInterval(interval);
  }, [stage, isClose, isCompleted]);

  const handleDialogueClick = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setStage('puzzle');
    }
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    const container = e.currentTarget.closest('.puzzle-container') as HTMLElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    setNeedyPosition({
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    });
  };

  const puzzleComplete = stayCloseTicks >= goalTicks;

  const handleComplete = () => {
    completeLevel(4);
    setStage('complete');
    setShowGift(true);
  };

  const handleGiftClose = () => {
    setShowGift(false);
    navigate('/map');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${level4Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/30" />

      {/* Floating sparkles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-energy opacity-50 sparkle"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.2}s`,
            width: 16 + i * 2,
            height: 16 + i * 2,
          }}
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between p-4 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/map')}
          className="text-foreground bg-card/50 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="bg-card/80 backdrop-blur-sm rounded-full px-4 py-2">
          <h1 className="text-xl font-bold text-foreground">✨ Magic Tower</h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="container max-w-lg mx-auto px-4 pb-8 relative z-10">
        {/* Characters Display */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <CharacterSprite character="wizzy" size="lg" />
            <p className="text-sm font-bold text-magic mt-2 drop-shadow-md">Wizzy</p>
          </div>
          <div className="text-center">
            <CharacterSprite character="needy" size="lg" />
            <p className="text-sm font-bold text-love mt-2 drop-shadow-md">Needy</p>
          </div>
        </div>

        {/* Dialogue */}
        {stage === 'intro' && (
          <div onClick={handleDialogueClick} className="cursor-pointer">
            <DialogueBubble
              text={dialogues[dialogueIndex].text}
              characterName={dialogues[dialogueIndex].character}
              characterColor={dialogues[dialogueIndex].color}
            />
          </div>
        )}

        {/* Puzzle */}
        {stage === 'puzzle' && (
          <div className="animate-fade-in">
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-magic-light mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">
                  Stay Close to Wizzy! 🥺
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-200",
                        isClose ? "bg-nature" : "bg-love"
                      )}
                      style={{ width: `${(stayCloseTicks / goalTicks) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Magic tower scene */}
              <div 
                className="puzzle-container relative rounded-xl h-72 overflow-hidden cursor-pointer touch-none border-2 border-magic-light"
                onMouseMove={handleDrag}
                onTouchMove={handleDrag}
              >
                <img 
                  src={level4Bg} 
                  alt="Magic tower" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Wizzy (moves on its own) */}
                <div
                  className="absolute transition-all duration-500 ease-out w-16 h-16"
                  style={{
                    left: `${wizzyPosition.x}%`,
                    top: `${wizzyPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <CharacterSprite character="wizzy" size="sm" animate={false} />
                </div>
                
                {/* Needy (controlled by player) */}
                <div
                  className={cn(
                    "absolute transition-all duration-100 w-16 h-16",
                    isClose && "animate-heart-beat"
                  )}
                  style={{
                    left: `${needyPosition.x}%`,
                    top: `${needyPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <CharacterSprite character="needy" size="sm" animate={false} />
                </div>
                
                {/* Connection line when close */}
                {isClose && (
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full">
                      <line
                        x1={`${needyPosition.x}%`}
                        y1={`${needyPosition.y}%`}
                        x2={`${wizzyPosition.x}%`}
                        y2={`${wizzyPosition.y}%`}
                        stroke="hsl(var(--love))"
                        strokeWidth="3"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground text-center mt-3">
                {isClose ? "💕 So close! Keep following!" : "Move Needy to follow Wizzy!"}
              </p>
            </div>

            {puzzleComplete && !isCompleted && (
              <div className="text-center animate-scale-in">
                <p className="text-lg text-foreground mb-4 drop-shadow-md font-medium">
                  ✨ You stayed together! He secretly loves her company!
                </p>
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-magic hover:bg-magic/90 text-white rounded-full px-8 animate-heart-beat"
                >
                  Claim Your Gift! 🎁
                </Button>
              </div>
            )}

            {isCompleted && (
              <div className="text-center">
                <p className="text-nature font-bold mb-4 drop-shadow-md">✅ Level Complete!</p>
                <Button
                  onClick={() => navigate('/map')}
                  variant="outline"
                  className="rounded-full bg-card/80"
                >
                  Return to Map
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {showGift && (
        <GiftReveal
          level={4}
          message={GIFT_MESSAGE}
          onClose={handleGiftClose}
        />
      )}
    </div>
  );
}
