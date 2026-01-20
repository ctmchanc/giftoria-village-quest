import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { DialogueBubble } from '@/components/game/DialogueBubble';
import { CharacterSprite } from '@/components/game/CharacterSprite';
import { GiftReveal } from '@/components/game/GiftReveal';
import { cn } from '@/lib/utils';
import level1Bg from '@/assets/backgrounds/level1-bg.png';

interface MatchItem {
  id: number;
  emoji: string;
  matched: boolean;
  selected: boolean;
}

const GIFT_MESSAGE = "[Your passionate love note goes here - tell him about the fire between you two! 🔥]";
const GIFT_PHOTO = ""; // Add your photo URL here!

export default function Level1() {
  const navigate = useNavigate();
  const { completeLevel, gameState } = useGame();
  const [stage, setStage] = useState<'intro' | 'puzzle' | 'complete'>('intro');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const isCompleted = gameState.completedLevels.includes(1);

  const dialogues = [
    { character: 'Dino', text: "ROARRR! Welcome to Passion Peak! 🦖🔥", color: 'bg-passion' },
    { character: 'Dragon', text: "Finally, another passionate creature! I've been waiting for you~ 🐉", color: 'bg-love' },
    { character: 'Dino', text: "The sparks are flying already! Help us match the passion symbols to unlock your gift!", color: 'bg-passion' },
  ];

  const items: MatchItem[] = [
    { id: 1, emoji: '🔥', matched: matchedPairs.includes(1), selected: selectedItems.includes(1) },
    { id: 2, emoji: '💋', matched: matchedPairs.includes(2), selected: selectedItems.includes(2) },
    { id: 3, emoji: '❤️‍🔥', matched: matchedPairs.includes(3), selected: selectedItems.includes(3) },
    { id: 4, emoji: '🔥', matched: matchedPairs.includes(4), selected: selectedItems.includes(4) },
    { id: 5, emoji: '💋', matched: matchedPairs.includes(5), selected: selectedItems.includes(5) },
    { id: 6, emoji: '❤️‍🔥', matched: matchedPairs.includes(6), selected: selectedItems.includes(6) },
  ];

  const handleDialogueComplete = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  const handleDialogueClick = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setStage('puzzle');
    }
  };

  const handleItemClick = (id: number) => {
    if (matchedPairs.includes(id)) return;

    const newSelected = [...selectedItems, id];
    setSelectedItems(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const firstItem = items.find(i => i.id === first);
      const secondItem = items.find(i => i.id === second);

      if (firstItem && secondItem && firstItem.emoji === secondItem.emoji && first !== second) {
        setMatchedPairs([...matchedPairs, first, second]);
      }
      
      setTimeout(() => setSelectedItems([]), 500);
    }
  };

  const allMatched = matchedPairs.length === items.length;

  const handleComplete = () => {
    completeLevel(1);
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
        backgroundImage: `url(${level1Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/30" />

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
          <h1 className="text-xl font-bold text-foreground">🔥 Passion Peak</h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="container max-w-lg mx-auto px-4 pb-8 relative z-10">
        {/* Characters */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <CharacterSprite character="dino" size="lg" />
            <p className="text-sm font-bold text-passion mt-2 drop-shadow-md">Dino</p>
          </div>
          <div className="text-center">
            <CharacterSprite character="dragon" size="lg" />
            <p className="text-sm font-bold text-love mt-2 drop-shadow-md">Dragon</p>
          </div>
        </div>

        {/* Dialogue */}
        {stage === 'intro' && (
          <div onClick={handleDialogueClick} className="cursor-pointer">
            <DialogueBubble
              text={dialogues[dialogueIndex].text}
              characterName={dialogues[dialogueIndex].character}
              characterColor={dialogues[dialogueIndex].color}
              onComplete={handleDialogueComplete}
            />
          </div>
        )}

        {/* Puzzle */}
        {stage === 'puzzle' && (
          <div className="animate-fade-in">
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-passion-light mb-6">
              <h2 className="text-lg font-bold text-center text-foreground mb-4">
                Match the Passion Pairs! 🔥
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    disabled={item.matched}
                    className={cn(
                      "aspect-square rounded-xl text-4xl flex items-center justify-center transition-all duration-300",
                      item.matched 
                        ? "bg-nature-light scale-95 opacity-70" 
                        : item.selected 
                          ? "bg-passion scale-105 shadow-lg" 
                          : "bg-passion-light hover:bg-passion/30 hover:scale-105"
                    )}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </div>

            {allMatched && !isCompleted && (
              <div className="text-center animate-scale-in">
                <p className="text-lg text-foreground mb-4 drop-shadow-md font-medium">
                  🎉 Perfect match! The passion is real!
                </p>
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-passion hover:bg-passion/90 text-white rounded-full px-8 animate-heart-beat"
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
          level={1}
          message={GIFT_MESSAGE}
          photoUrl={GIFT_PHOTO || undefined}
          onClose={handleGiftClose}
        />
      )}
    </div>
  );
}
