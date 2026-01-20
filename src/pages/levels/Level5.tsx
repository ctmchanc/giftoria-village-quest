import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { ChatBubble } from '@/components/game/ChatBubble';
import { CharacterSprite } from '@/components/game/CharacterSprite';
import { GiftReveal } from '@/components/game/GiftReveal';
import { cn } from '@/lib/utils';
import level5Bg from '@/assets/backgrounds/level5-bg.png';

const GIFT_MESSAGE = "Baby nap cell deserves an award for sleeping so much and holding down the fort. This year I hope you get to sleeeeeeep and rest and relax ample, and hang out with my no sleep cell 💤";
const GIFT_PHOTO = "";

export default function Level5() {
  const navigate = useNavigate();
  const { completeLevel, gameState } = useGame();
  const [stage, setStage] = useState<'intro' | 'puzzle' | 'complete'>('intro');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [sleepMeter, setSleepMeter] = useState(0);
  const [isTapping, setIsTapping] = useState(false);
  const [cuddling, setCuddling] = useState(false);
  const isCompleted = gameState.completedLevels.includes(5);

  const dialogues = [
    { character: 'No-Sleep', text: "Wake up wake up WAKE UP! ⚡ There's so much to do!", color: 'bg-energy' },
    { character: 'Nappy', text: "Zzzz... five more minutes... 😴💤", color: 'bg-dream' },
    { character: 'No-Sleep', text: "Hmm... actually... *yawn* ...the clouds do look comfy... 😳", color: 'bg-energy' },
    { character: 'Nappy', text: "Come cuddle with me... ☁️", color: 'bg-dream' },
  ];

  const goalSleep = 100;

  useEffect(() => {
    if (stage !== 'puzzle' || isCompleted || cuddling) return;

    const interval = setInterval(() => {
      if (isTapping) {
        setSleepMeter(prev => Math.min(goalSleep, prev + 3));
      } else {
        setSleepMeter(prev => Math.max(0, prev - 1));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [stage, isTapping, isCompleted, cuddling]);

  useEffect(() => {
    if (sleepMeter >= goalSleep && !cuddling) {
      setCuddling(true);
    }
  }, [sleepMeter, cuddling]);

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
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${level5Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/20" />

      {/* Stars */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Sparkles
          key={`star-${i}`}
          className="absolute text-energy opacity-60 sparkle"
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
          className="text-foreground bg-card/50 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="bg-card/80 backdrop-blur-sm rounded-full px-4 py-2">
          <h1 className="text-xl font-bold text-foreground">☁️ Dream Cloud</h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="container max-w-lg mx-auto px-4 pb-8 relative z-10">
        {/* Characters */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <CharacterSprite character="nappy" size="lg" />
            <p className="text-sm font-bold text-dream mt-2 drop-shadow-md">Nappy</p>
          </div>
          <div className="text-center">
            <CharacterSprite character="noSleep" size="lg" />
            <p className="text-sm font-bold text-energy mt-2 drop-shadow-md">No-Sleep</p>
          </div>
        </div>

        {/* iMessage-style Chat */}
        {stage === 'intro' && (
          <div onClick={handleDialogueClick} className="cursor-pointer">
            <ChatBubble
              messages={dialogues}
              currentIndex={dialogueIndex}
              typingSpeed={50}
            />
          </div>
        )}

        {/* Puzzle */}
        {stage === 'puzzle' && (
          <div className="animate-fade-in">
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-dream-light mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">
                  {cuddling ? "Cuddling... 💤" : "Get Cozy Together!"}
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
                  "relative rounded-xl h-72 overflow-hidden border-2 border-dream-light",
                  !cuddling && "cursor-pointer"
                )}
                onMouseDown={handleTapStart}
                onMouseUp={handleTapEnd}
                onMouseLeave={handleTapEnd}
                onTouchStart={handleTapStart}
                onTouchEnd={handleTapEnd}
              >
                <img 
                  src={level5Bg} 
                  alt="Dream clouds" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Characters */}
                {!cuddling ? (
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-end gap-8">
                    <div className="transform translate-y-4">
                      <CharacterSprite character="nappy" size="lg" />
                    </div>
                    <div className={cn(
                      "transition-all duration-300",
                      isTapping ? "translate-x-[-30px] scale-110" : ""
                    )}>
                      <CharacterSprite character="noSleep" size="lg" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-scale-in">
                    <div className="flex items-end justify-center gap-0">
                      <div className="relative">
                        <CharacterSprite character="nappy" size="md" />
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl animate-pulse">💤</span>
                      </div>
                      <div className="text-2xl animate-heart-beat mb-6">💕</div>
                      <div className="relative">
                        <CharacterSprite character="noSleep" size="md" />
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>💤</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Zzz bubbles when tapping */}
                {isTapping && !cuddling && (
                  <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
                    <span className="text-3xl animate-fade-in">💤</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground text-center mt-3">
                {cuddling 
                  ? "They fell asleep together... how sweet! 💕" 
                  : "Hold/tap to help them get cozy!"}
              </p>
            </div>

            {cuddling && !isCompleted && (
              <div className="text-center animate-scale-in">
                <p className="text-lg text-foreground mb-4 drop-shadow-md font-medium">
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
          level={5}
          message={GIFT_MESSAGE}
          photoUrl={GIFT_PHOTO || undefined}
          onClose={handleGiftClose}
        />
      )}
    </div>
  );
}
