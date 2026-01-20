import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface GiftContent {
  message: string;
  photoUrl?: string;
}

export interface GameState {
  currentLevel: number;
  completedLevels: number[];
  unlockedGifts: Record<number, GiftContent>;
  hasSeenIntro: boolean;
  hasCompletedGame: boolean;
}

interface GameContextType {
  gameState: GameState;
  completeLevel: (level: number) => void;
  unlockGift: (level: number, content: GiftContent) => void;
  setCurrentLevel: (level: number) => void;
  markIntroSeen: () => void;
  resetGame: () => void;
  isLevelUnlocked: (level: number) => boolean;
}

const defaultGameState: GameState = {
  currentLevel: 0,
  completedLevels: [],
  unlockedGifts: {},
  hasSeenIntro: false,
  hasCompletedGame: false,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'birthday-adventure-game-state';

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load game state:', e);
    }
    return defaultGameState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.error('Failed to save game state:', e);
    }
  }, [gameState]);

  const completeLevel = (level: number) => {
    setGameState(prev => {
      const newCompletedLevels = prev.completedLevels.includes(level)
        ? prev.completedLevels
        : [...prev.completedLevels, level];
      
      const hasCompletedGame = newCompletedLevels.length >= 5;
      
      return {
        ...prev,
        completedLevels: newCompletedLevels,
        hasCompletedGame,
      };
    });
  };

  const unlockGift = (level: number, content: GiftContent) => {
    setGameState(prev => ({
      ...prev,
      unlockedGifts: {
        ...prev.unlockedGifts,
        [level]: content,
      },
    }));
  };

  const setCurrentLevel = (level: number) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: level,
    }));
  };

  const markIntroSeen = () => {
    setGameState(prev => ({
      ...prev,
      hasSeenIntro: true,
    }));
  };

  const resetGame = () => {
    setGameState(defaultGameState);
  };

  const isLevelUnlocked = (level: number) => {
    if (level === 1) return true;
    return gameState.completedLevels.includes(level - 1);
  };

  return (
    <GameContext.Provider value={{
      gameState,
      completeLevel,
      unlockGift,
      setCurrentLevel,
      markIntroSeen,
      resetGame,
      isLevelUnlocked,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
