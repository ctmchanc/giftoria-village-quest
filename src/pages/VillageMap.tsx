import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check, Star } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { FloatingHearts } from '@/components/game/FloatingHearts';
import { cn } from '@/lib/utils';
import villageMapBg from '@/assets/backgrounds/village-map-bg.png';

interface LevelLocation {
  id: number;
  name: string;
  hisCharacter: string;
  herCharacter: string;
  emoji: string;
  color: string;
  bgColor: string;
  position: { top: string; left: string };
}

const locations: LevelLocation[] = [
  {
    id: 1,
    name: 'Passion Peak',
    hisCharacter: 'Dino',
    herCharacter: 'Dragon',
    emoji: '🔥',
    color: 'text-passion',
    bgColor: 'bg-passion-light',
    position: { top: '15%', left: '20%' },
  },
  {
    id: 2,
    name: 'Design Arena',
    hisCharacter: 'Voltron',
    herCharacter: 'Designer',
    emoji: '🏠',
    color: 'text-energy',
    bgColor: 'bg-energy-light',
    position: { top: '30%', left: '65%' },
  },
  {
    id: 3,
    name: 'Smooch Garden',
    hisCharacter: 'Love Cell',
    herCharacter: 'Love Cell',
    emoji: '💕',
    color: 'text-love',
    bgColor: 'bg-love-light',
    position: { top: '50%', left: '25%' },
  },
  {
    id: 4,
    name: 'Magic Tower',
    hisCharacter: 'Wizzy',
    herCharacter: 'Needy',
    emoji: '✨',
    color: 'text-magic',
    bgColor: 'bg-magic-light',
    position: { top: '55%', left: '70%' },
  },
  {
    id: 5,
    name: 'Dream Cloud',
    hisCharacter: 'Nappy',
    herCharacter: 'No-Sleep',
    emoji: '☁️',
    color: 'text-dream',
    bgColor: 'bg-dream-light',
    position: { top: '78%', left: '45%' },
  },
];

export default function VillageMap() {
  const navigate = useNavigate();
  const { gameState, isLevelUnlocked } = useGame();

  const handleLocationClick = (level: number) => {
    if (isLevelUnlocked(level)) {
      navigate(`/level/${level}`);
    }
  };

  const handleFinaleClick = () => {
    if (gameState.hasCompletedGame) {
      navigate('/finale');
    }
  };

  const completedCount = gameState.completedLevels.length;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${villageMapBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/20" />
      
      <FloatingHearts count={6} colors={['text-love', 'text-magic', 'text-dream']} />

      {/* Header */}
      <div className="text-center pt-6 pb-4 px-4 relative z-10">
        <div className="bg-card/90 backdrop-blur-sm rounded-2xl py-3 px-6 inline-block shadow-lg">
          <h1 className="text-3xl font-bold text-foreground mb-2">🏘️ Our Village</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Star className="w-4 h-4 text-energy" fill="currentColor" />
            <span>{completedCount}/5 Levels Complete</span>
            <Star className="w-4 h-4 text-energy" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[calc(100vh-140px)] max-w-2xl mx-auto px-4">
        {/* Level Locations */}
        {locations.map((location) => {
          const isUnlocked = isLevelUnlocked(location.id);
          const isCompleted = gameState.completedLevels.includes(location.id);

          return (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location.id)}
              disabled={!isUnlocked}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10",
                isUnlocked ? "cursor-pointer hover:scale-110" : "cursor-not-allowed opacity-60"
              )}
              style={{
                top: location.position.top,
                left: location.position.left,
              }}
            >
              <div className={cn(
                "rounded-2xl p-3 shadow-lg border-2 border-border backdrop-blur-sm",
                location.bgColor,
                isUnlocked && "animate-scale-in",
                isCompleted && "ring-2 ring-nature ring-offset-2"
              )}>
                <div className="text-4xl mb-1">{location.emoji}</div>
                <div className="text-xs font-bold text-foreground whitespace-nowrap">
                  {location.name}
                </div>
                {isCompleted ? (
                  <div className="absolute -top-2 -right-2 bg-nature text-nature-foreground rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : !isUnlocked && (
                  <div className="absolute -top-2 -right-2 bg-muted text-muted-foreground rounded-full p-1">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="mt-1 text-xs text-foreground font-medium drop-shadow-md">
                {location.hisCharacter} & {location.herCharacter}
              </div>
            </button>
          );
        })}

        {/* Finale Location */}
        <button
          onClick={handleFinaleClick}
          disabled={!gameState.hasCompletedGame}
          className={cn(
            "absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-10",
            gameState.hasCompletedGame 
              ? "cursor-pointer hover:scale-110 animate-heart-beat" 
              : "cursor-not-allowed opacity-40"
          )}
        >
          <div className={cn(
            "rounded-2xl p-4 shadow-xl border-4 backdrop-blur-sm",
            gameState.hasCompletedGame 
              ? "bg-gradient-to-br from-love-light to-energy-light border-love" 
              : "bg-muted border-border"
          )}>
            <div className="text-5xl mb-1">🎉</div>
            <div className="text-sm font-bold text-foreground">Grand Finale</div>
            <div className="text-xs text-muted-foreground">
              {gameState.hasCompletedGame ? 'Ready to celebrate!' : `Complete all levels first`}
            </div>
          </div>
        </button>
      </div>

      {/* Bottom hint */}
      <div className="fixed bottom-4 left-0 right-0 text-center text-foreground text-sm px-4 font-medium drop-shadow-md">
        Tap a location to begin! 💫
      </div>
    </div>
  );
}
