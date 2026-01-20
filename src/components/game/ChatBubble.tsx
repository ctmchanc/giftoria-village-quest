import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  character: string;
  text: string;
  color: string;
}

interface ChatBubbleProps {
  messages: Message[];
  currentIndex: number;
  onAllComplete?: () => void;
  typingSpeed?: number;
  className?: string;
}

function SingleBubble({ 
  message, 
  isLatest, 
  typingSpeed = 50,
  onTypingComplete 
}: { 
  message: Message; 
  isLatest: boolean;
  typingSpeed?: number;
  onTypingComplete?: () => void;
}) {
  const [displayedText, setDisplayedText] = useState(isLatest ? '' : message.text);
  const [isTyping, setIsTyping] = useState(isLatest);

  useEffect(() => {
    if (!isLatest) {
      setDisplayedText(message.text);
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < message.text.length) {
        setDisplayedText(message.text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onTypingComplete?.();
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [message.text, isLatest, typingSpeed, onTypingComplete]);

  // Determine if message is from first or second character for iMessage-like alignment
  const isFirstCharacter = message.character === 'Dino' || 
                           message.character === 'Designer' || 
                           message.character === 'Her Love' || 
                           message.character === 'Wizzy' ||
                           message.character === 'No-Sleep';

  return (
    <div className={cn(
      "flex flex-col mb-3 animate-fade-in",
      isFirstCharacter ? "items-start" : "items-end"
    )}>
      <span className={cn(
        "text-xs font-bold mb-1 px-2",
        message.color.replace('bg-', 'text-')
      )}>
        {message.character}
      </span>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2 shadow-md",
        isFirstCharacter 
          ? cn(message.color, "text-primary-foreground rounded-tl-sm") 
          : "bg-card border-2 border-border rounded-tr-sm"
      )}>
        <p className={cn(
          "text-base leading-relaxed",
          isFirstCharacter ? "text-primary-foreground" : "text-foreground"
        )}>
          {displayedText}
          {isTyping && <span className="animate-pulse ml-0.5">|</span>}
        </p>
      </div>
    </div>
  );
}

export function ChatBubble({
  messages,
  currentIndex,
  onAllComplete,
  typingSpeed = 50,
  className,
}: ChatBubbleProps) {
  const [typingComplete, setTypingComplete] = useState(false);
  const visibleMessages = messages.slice(0, currentIndex + 1);
  const isLastMessage = currentIndex === messages.length - 1;

  const handleTypingComplete = () => {
    setTypingComplete(true);
    if (isLastMessage) {
      onAllComplete?.();
    }
  };

  useEffect(() => {
    setTypingComplete(false);
  }, [currentIndex]);

  return (
    <div className={cn(
      "bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-border max-h-64 overflow-y-auto",
      className
    )}>
      {visibleMessages.map((msg, idx) => (
        <SingleBubble
          key={idx}
          message={msg}
          isLatest={idx === currentIndex}
          typingSpeed={typingSpeed}
          onTypingComplete={idx === currentIndex ? handleTypingComplete : undefined}
        />
      ))}
      {typingComplete && !isLastMessage && (
        <div className="text-muted-foreground text-xs text-center mt-2 animate-pulse">
          Tap to continue...
        </div>
      )}
      {typingComplete && isLastMessage && (
        <div className="text-muted-foreground text-xs text-center mt-2 animate-pulse">
          Tap to start the game!
        </div>
      )}
    </div>
  );
}