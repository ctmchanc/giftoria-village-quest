import React from 'react';
import { cn } from '@/lib/utils';

interface CharacterSpriteProps {
  character: 'dino' | 'dragon' | 'voltron' | 'designer' | 'hisLove' | 'herLove' | 'wizzy' | 'needy' | 'nappy' | 'noSleep' | 'mrBubbles' | 'lilGuava' | 'youngTurnip' | 'youngGirl';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  className?: string;
}

const characterEmojis: Record<CharacterSpriteProps['character'], string> = {
  dino: '🦖',
  dragon: '🐉',
  voltron: '🤖',
  designer: '🎨',
  hisLove: '💙',
  herLove: '💕',
  wizzy: '🧙',
  needy: '🥺',
  nappy: '😴',
  noSleep: '⚡',
  mrBubbles: '🛁',
  lilGuava: '🍐',
  youngTurnip: '🥒',
  youngGirl: '👧',
};

const sizeClasses = {
  sm: 'text-4xl w-16 h-16',
  md: 'text-6xl w-24 h-24',
  lg: 'text-7xl w-32 h-32',
  xl: 'text-8xl w-40 h-40',
};

export function CharacterSprite({
  character,
  size = 'md',
  animate = true,
  className,
}: CharacterSpriteProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full",
        sizeClasses[size],
        animate && "float-animation",
        className
      )}
    >
      <span className="select-none">{characterEmojis[character]}</span>
    </div>
  );
}
