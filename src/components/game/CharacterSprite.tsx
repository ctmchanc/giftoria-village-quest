import React from 'react';
import { cn } from '@/lib/utils';

// Character imports
import dinoImg from '@/assets/characters/dino.png';
import dragonImg from '@/assets/characters/dragon.png';
import voltronImg from '@/assets/characters/voltron.png';
import designerImg from '@/assets/characters/designer.png';
import hisLoveImg from '@/assets/characters/his-love.png';
import herLoveImg from '@/assets/characters/her-love.png';
import wizzyImg from '@/assets/characters/wizzy.png';
import needyImg from '@/assets/characters/needy.png';
import nappyImg from '@/assets/characters/nappy.png';
import noSleepImg from '@/assets/characters/no-sleep.png';
import mrBubblesImg from '@/assets/characters/mr-bubbles.png';
import lilGuavaImg from '@/assets/characters/lil-guava.png';
import youngTurnipImg from '@/assets/characters/young-turnip.png';
import youngGirlImg from '@/assets/characters/young-girl.png';

interface CharacterSpriteProps {
  character: 'dino' | 'dragon' | 'voltron' | 'designer' | 'hisLove' | 'herLove' | 'wizzy' | 'needy' | 'nappy' | 'noSleep' | 'mrBubbles' | 'lilGuava' | 'youngTurnip' | 'youngGirl';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  className?: string;
}

const characterImages: Record<CharacterSpriteProps['character'], string> = {
  dino: dinoImg,
  dragon: dragonImg,
  voltron: voltronImg,
  designer: designerImg,
  hisLove: hisLoveImg,
  herLove: herLoveImg,
  wizzy: wizzyImg,
  needy: needyImg,
  nappy: nappyImg,
  noSleep: noSleepImg,
  mrBubbles: mrBubblesImg,
  lilGuava: lilGuavaImg,
  youngTurnip: youngTurnipImg,
  youngGirl: youngGirlImg,
};

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
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
        "flex items-center justify-center",
        sizeClasses[size],
        animate && "float-animation",
        className
      )}
    >
      <img 
        src={characterImages[character]} 
        alt={character}
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  );
}
