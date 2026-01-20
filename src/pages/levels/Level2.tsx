import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { DialogueBubble } from '@/components/game/DialogueBubble';
import { CharacterSprite } from '@/components/game/CharacterSprite';
import { GiftReveal } from '@/components/game/GiftReveal';
import { cn } from '@/lib/utils';

interface HiddenItem {
  id: number;
  emoji: string;
  found: boolean;
  position: { top: string; left: string };
}

const GIFT_MESSAGE = "[Your funny message about your differences goes here - the chaos and the calm! 🏠🤖]";

export default function Level2() {
  const navigate = useNavigate();
  const { completeLevel, gameState } = useGame();
  const [stage, setStage] = useState<'intro' | 'puzzle' | 'complete'>('intro');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [foundItems, setFoundItems] = useState<number[]>([]);
  const isCompleted = gameState.completedLevels.includes(2);

  const dialogues = [
    { character: 'Designer', text: "Ugh, look at this mess! I was trying to create a beautiful space... 🎨", color: 'bg-magic' },
    { character: 'Voltron', text: "YEAHHH! But messes are FUN! Look at all this cool stuff! 🤖⚡", color: 'bg-energy' },
    { character: 'Designer', text: "*sighs* ...Fine. Help us find the 5 hidden design items so I can fix this place. Maybe Voltron can stay... he IS kind of cute. 😏", color: 'bg-magic' },
  ];

  const [items] = useState<HiddenItem[]>([
    { id: 1, emoji: '🪴', found: false, position: { top: '20%', left: '15%' } },
    { id: 2, emoji: '🖼️', found: false, position: { top: '35%', left: '75%' } },
    { id: 3, emoji: '🕯️', found: false, position: { top: '55%', left: '25%' } },
    { id: 4, emoji: '📚', found: false, position: { top: '45%', left: '60%' } },
    { id: 5, emoji: '💐', found: false, position: { top: '70%', left: '45%' } },
  ]);

  const handleDialogueClick = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setStage('puzzle');
    }
  };

  const handleItemClick = (id: number) => {
    if (!foundItems.includes(id)) {
      setFoundItems([...foundItems, id]);
    }
  };

  const allFound = foundItems.length === items.length;

  const handleComplete = () => {
    completeLevel(2);
    setStage('complete');
    setShowGift(true);
  };

  const handleGiftClose = () => {
    setShowGift(false);
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-energy-light via-background to-magic-light relative overflow-hidden">
      {/* Floating elements */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Zap
          key={i}
          className="absolute text-energy opacity-30 float-animation"
          style={{
            left: `${15 + i * 20}%`,
            top: `${15 + (i % 2) * 40}%`,
            animationDelay: `${i * 0.3}s`,
            width: 18 + i * 3,
            height: 18 + i * 3,
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
        <h1 className="text-xl font-bold text-foreground">🏠 Design Arena</h1>
        <div className="w-10" />
      </div>

      <div className="container max-w-lg mx-auto px-4 pb-8 relative z-10">
        {/* Characters */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <CharacterSprite character="voltron" size="lg" />
            <p className="text-sm font-bold text-energy mt-2">Voltron</p>
          </div>
          <div className="text-center">
            <CharacterSprite character="designer" size="lg" />
            <p className="text-sm font-bold text-magic mt-2">Designer</p>
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
            <div className="bg-card rounded-2xl p-4 shadow-lg border-2 border-energy-light mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">
                  Find the Hidden Items!
                </h2>
                <span className="text-sm font-bold text-energy">
                  {foundItems.length}/{items.length}
                </span>
              </div>
              
              {/* Messy room scene */}
              <div className="relative bg-gradient-to-br from-energy-light to-magic-light rounded-xl h-72 overflow-hidden">
                {/* Room decorations */}
                <Home className="absolute top-4 right-4 w-12 h-12 text-magic/30" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-foreground/10" />
                
                {/* Mess elements */}
                <span className="absolute top-8 left-8 text-2xl opacity-50">🛋️</span>
                <span className="absolute top-12 right-16 text-xl opacity-50">🎮</span>
                <span className="absolute bottom-20 left-12 text-xl opacity-50">📦</span>
                <span className="absolute bottom-24 right-8 text-xl opacity-50">🧸</span>
                
                {/* Hidden items */}
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "absolute text-3xl transition-all duration-300 hover:scale-125",
                      foundItems.includes(item.id)
                        ? "opacity-100 scale-110 animate-scale-in"
                        : "opacity-60 hover:opacity-100"
                    )}
                    style={{
                      top: item.position.top,
                      left: item.position.left,
                    }}
                  >
                    {item.emoji}
                    {foundItems.includes(item.id) && (
                      <span className="absolute -top-1 -right-1 text-sm">✨</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {allFound && !isCompleted && (
              <div className="text-center animate-scale-in">
                <p className="text-lg text-foreground mb-4">
                  🎉 Room looking better! Maybe opposites DO attract!
                </p>
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-energy hover:bg-energy/90 text-white rounded-full px-8 animate-heart-beat"
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
          level={2}
          message={GIFT_MESSAGE}
          onClose={handleGiftClose}
        />
      )}
    </div>
  );
}
