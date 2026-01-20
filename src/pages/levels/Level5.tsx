import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cloud, Moon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { DialogueBubble } from '@/components/game/DialogueBubble';
import { CharacterSprite } from '@/components/game/CharacterSprite';
import { GiftReveal } from '@/components/game/GiftReveal';
import { cn } from '@/lib/utils';

const GIFT_MESSAGE = "[Your cozy message about peaceful moments together goes here - falling asleep in each other's arms! ☁️😴]";

export default function Level5() {
  const navigate = useNavigate();
  const { completeLevel, gameState } = useGame();
  const [stage, setStage] = useState<'intro' | 'puzzle' | 'complete'>('intro');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [sleepMeter, setSleepMeter] = useState(0);
  const [isTapping, setIsTapping] = useState(false);
  const [cudding, setCuddling] = useState(false);
  const isCompleted = gameState.completedLevels.includes(5);

  const dialogues = [
    { character: 'No-Sleep', text: "Wake up wake up WAKE UP! ⚡ There's so much to do!", color: 'bg-energy' },
    { character: 'Nappy', text: "Zzzz... five more minutes... 😴💤", color: 'bg-dream' },
    { character: 'No-Sleep', text: "Hmm... actually... *yawn* ...the clouds do look comfy... 😳", color: 'bg-energy' },
    { character: 'Nappy', text: "Come cuddle with me... ☁️", color: 'bg-dream' },
  ];

  const goalSleep = 100;

  useEffect(() => {
    if (stage !== 'puzzle' || isCompleted || cudding) return;

    const interval = setInterval(() => {
      if (isTapping) {
        setSleepMeter(prev => Math.min(goalSleep, prev + 3));
      } else {
        setSleepMeter(prev => Math.max(0, prev - 1));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [stage, isTapping, isCompleted, cudding]);

  useEffect(() => {
    if (sleepMeter >= goalSleep && !cudding) {
      setCuddling(true);
    }
  }, [sleepMeter, cudding]);

  const handleDialogueClick = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setStage('puzzle');
    }
  };

  const handleTapStart = () => setIsTapping(true);
  const handleTapEnd = () => setIsTapping(false);

  const handleComplete = () => {
    completeLevel(5);
    setStage('complete');
    setShowGift(true);
  };

  const handleGiftClose = () => {
    setShowGift(false);
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dream-light via-background to-dream-light relative overflow-hidden">
      {/* Floating clouds */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Cloud
          key={i}
          className="absolute text-secondary opacity-40 float-animation"
          style={{
            left: `${5 + i * 20}%`,
            top: `${10 + (i % 3) * 15}%`,
            animationDelay: `${i * 0.5}s`,
            width: 30 + i * 8,
            height: 30 + i * 8,
          }}
        />
      ))}

      {/* Stars */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Sparkles
          key={`star-${i}`}
          className="absolute text-energy opacity-50 sparkle"
          style={{
            left: `${15 + i * 15}%`,
            top: `${5 + (i % 2) * 10}%`,
            animationDelay: `${i * 0.3}s`,
            width: 12,
            height: 12,
          }}
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between p-4 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/map')}
          className="text-foreground"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">☁️ Dream Cloud</h1>
        <div className="w-10" />
      </div>

      <div className="container max-w-lg mx-auto px-4 pb-8 relative z-10">
        {/* Characters */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <CharacterSprite character="nappy" size="lg" />
            <p className="text-sm font-bold text-dream mt-2">Nappy</p>
          </div>
          <div className="text-center">
            <CharacterSprite character="noSleep" size="lg" />
            <p className="text-sm font-bold text-energy mt-2">No-Sleep</p>
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
            <div className="bg-card rounded-2xl p-4 shadow-lg border-2 border-dream-light mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">
                  {cudding ? "Cuddling... 💤" : "Get Cozy Together!"}
                </h2>
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-dream" />
                  <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-dream transition-all duration-200"
                      style={{ width: `${(sleepMeter / goalSleep) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Cloud scene */}
              <div 
                className={cn(
                  "relative bg-gradient-to-b from-dream-light to-secondary/30 rounded-xl h-72 overflow-hidden",
                  !cudding && "cursor-pointer"
                )}
                onMouseDown={handleTapStart}
                onMouseUp={handleTapEnd}
                onMouseLeave={handleTapEnd}
                onTouchStart={handleTapStart}
                onTouchEnd={handleTapEnd}
              >
                {/* Moon */}
                <div className="absolute top-4 right-6">
                  <Moon className="w-10 h-10 text-energy" fill="currentColor" />
                </div>
                
                {/* Cloud bed */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <Cloud className="w-48 h-24 text-white" fill="white" />
                </div>
                
                {/* Characters */}
                {!cudding ? (
                  <>
                    <div 
                      className="absolute bottom-20 left-1/3 text-5xl"
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      😴
                    </div>
                    <div 
                      className={cn(
                        "absolute bottom-20 left-2/3 text-5xl transition-all duration-300",
                        isTapping ? "translate-x-[-30px] scale-110" : ""
                      )}
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      {isTapping ? "😊" : "⚡"}
                    </div>
                  </>
                ) : (
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center animate-scale-in">
                    <div className="text-5xl mb-2">😴💕😊</div>
                    <div className="text-2xl animate-pulse">💤 Zzz...</div>
                  </div>
                )}

                {/* Zzz bubbles when tapping */}
                {isTapping && !cudding && (
                  <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
                    <span className="text-2xl animate-fade-in">💤</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground text-center mt-3">
                {cudding 
                  ? "They fell asleep together... how sweet! 💕" 
                  : "Hold/tap to help them get cozy!"}
              </p>
            </div>

            {cudding && !isCompleted && (
              <div className="text-center animate-scale-in">
                <p className="text-lg text-foreground mb-4">
                  ☁️ They're cuddling peacefully! So wholesome!
                </p>
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-dream hover:bg-dream/90 text-white rounded-full px-8 animate-heart-beat"
                >
                  Claim Your Gift! 🎁
                </Button>
              </div>
            )}

            {isCompleted && (
              <div className="text-center">
                <p className="text-nature font-bold mb-4">✅ Level Complete!</p>
                <Button
                  onClick={() => navigate('/map')}
                  variant="outline"
                  className="rounded-full"
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
          level={5}
          message={GIFT_MESSAGE}
          onClose={handleGiftClose}
        />
      )}
    </div>
  );
}
