import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { DialogueBubble } from '@/components/game/DialogueBubble';
import { CharacterSprite } from '@/components/game/CharacterSprite';
import { GiftReveal } from '@/components/game/GiftReveal';
import { cn } from '@/lib/utils';
import level3Bg from '@/assets/backgrounds/level3-bg.png';

const GIFT_MESSAGE = "[Your heartfelt love letter goes here - tell him how much he means to you! 💕]";
const GIFT_PHOTO = ""; // Add your photo URL here!

export default function Level3() {
  const navigate = useNavigate();
  const { completeLevel, gameState } = useGame();
  const [stage, setStage] = useState<'intro' | 'puzzle' | 'complete'>('intro');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [connectedHearts, setConnectedHearts] = useState<number[]>([]);
  const [lastClicked, setLastClicked] = useState<number | null>(null);
  const isCompleted = gameState.completedLevels.includes(3);

  const dialogues = [
    { character: 'Her Love', text: "Mwah mwah mwah! Finally you're here! 💕 I just want to hug and smooch all day!", color: 'bg-love' },
    { character: 'His Love', text: "Hey cutie! 💙 I was waiting for you! Come here~", color: 'bg-secondary' },
    { character: 'Her Love', text: "Let's connect our hearts! Help us find our way to each other! 🥰", color: 'bg-love' },
  ];

  const hearts = [
    { id: 1, emoji: '💕', position: { top: '15%', left: '20%' }, pair: 4 },
    { id: 2, emoji: '💙', position: { top: '25%', left: '70%' }, pair: 5 },
    { id: 3, emoji: '💗', position: { top: '45%', left: '40%' }, pair: 6 },
    { id: 4, emoji: '💕', position: { top: '55%', left: '75%' }, pair: 1 },
    { id: 5, emoji: '💙', position: { top: '65%', left: '15%' }, pair: 2 },
    { id: 6, emoji: '💗', position: { top: '80%', left: '55%' }, pair: 3 },
  ];

  const handleDialogueClick = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setStage('puzzle');
    }
  };

  const handleHeartClick = (id: number) => {
    if (connectedHearts.includes(id)) return;

    if (lastClicked === null) {
      setLastClicked(id);
    } else {
      const firstHeart = hearts.find(h => h.id === lastClicked);
      const secondHeart = hearts.find(h => h.id === id);
      
      if (firstHeart && secondHeart && firstHeart.pair === id) {
        setConnectedHearts([...connectedHearts, lastClicked, id]);
      }
      setLastClicked(null);
    }
  };

  const allConnected = connectedHearts.length === hearts.length;

  const handleComplete = () => {
    completeLevel(3);
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
        backgroundImage: `url(${level3Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/20" />

      {/* Floating hearts decoration */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Heart
          key={i}
          className="absolute text-love opacity-40 float-animation"
          style={{
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.3}s`,
            width: 14 + i * 2,
            height: 14 + i * 2,
          }}
          fill="currentColor"
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
          <h1 className="text-xl font-bold text-foreground">💕 Smooch Garden</h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="container max-w-lg mx-auto px-4 pb-8 relative z-10">
        {/* Characters */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <CharacterSprite character="hisLove" size="lg" />
            <p className="text-sm font-bold text-secondary mt-2 drop-shadow-md">His Love</p>
          </div>
          <div className="text-center">
            <CharacterSprite character="herLove" size="lg" />
            <p className="text-sm font-bold text-love mt-2 drop-shadow-md">Her Love</p>
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
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-love-light mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">
                  Connect the Hearts! 💕
                </h2>
                <span className="text-sm font-bold text-love bg-love-light px-3 py-1 rounded-full">
                  {connectedHearts.length / 2}/3 pairs
                </span>
              </div>
              
              {/* Heart garden */}
              <div className="relative rounded-xl h-80 overflow-hidden border-2 border-love-light">
                <img 
                  src={level3Bg} 
                  alt="Garden scene" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Hearts */}
                {hearts.map((heart) => {
                  const isConnected = connectedHearts.includes(heart.id);
                  const isSelected = lastClicked === heart.id;
                  
                  return (
                    <button
                      key={heart.id}
                      onClick={() => handleHeartClick(heart.id)}
                      disabled={isConnected}
                      className={cn(
                        "absolute text-4xl transition-all duration-300",
                        isConnected 
                          ? "opacity-100 scale-125 animate-heart-beat" 
                          : isSelected
                            ? "scale-150 animate-pulse"
                            : "hover:scale-125 opacity-80 hover:opacity-100"
                      )}
                      style={{
                        top: heart.position.top,
                        left: heart.position.left,
                      }}
                    >
                      {heart.emoji}
                    </button>
                  );
                })}
              </div>
              
              <p className="text-sm text-muted-foreground text-center mt-3">
                Tap matching hearts to connect them!
              </p>
            </div>

            {allConnected && !isCompleted && (
              <div className="text-center animate-scale-in">
                <p className="text-lg text-foreground mb-4 drop-shadow-md font-medium">
                  🥰 All hearts connected! Love is in the air!
                </p>
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-love hover:bg-love/90 text-white rounded-full px-8 animate-heart-beat"
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
          level={3}
          message={GIFT_MESSAGE}
          photoUrl={GIFT_PHOTO || undefined}
          onClose={handleGiftClose}
        />
      )}
    </div>
  );
}
