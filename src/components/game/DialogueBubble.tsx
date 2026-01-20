import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DialogueBubbleProps {
  text: string;
  characterName: string;
  characterColor?: string;
  onComplete?: () => void;
  typingSpeed?: number;
  className?: string;
}

export function DialogueBubble({
  text,
  characterName,
  characterColor = 'bg-primary',
  onComplete,
  typingSpeed = 30,
  className,
}: DialogueBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed, onComplete]);

  const skipTyping = () => {
    if (!isComplete) {
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
    }
  };

  return (
    <div 
      className={cn(
        "relative bg-card rounded-2xl p-4 shadow-lg border-2 border-border cursor-pointer animate-scale-in",
        className
      )}
      onClick={skipTyping}
    >
      <div className={cn(
        "absolute -top-3 left-4 px-3 py-1 rounded-full text-sm font-bold text-primary-foreground",
        characterColor
      )}>
        {characterName}
      </div>
      <p className="text-foreground text-lg leading-relaxed mt-2 min-h-[3rem]">
        {displayedText}
        {!isComplete && <span className="animate-pulse">|</span>}
      </p>
      {isComplete && (
        <div className="text-muted-foreground text-xs mt-2 text-right">
          Tap to continue...
        </div>
      )}
    </div>
  );
}
