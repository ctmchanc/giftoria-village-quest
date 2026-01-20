import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
}

export function Confetti({ active = true }: { active?: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) return;

    const colors = [
      'hsl(340, 80%, 70%)', // love pink
      'hsl(45, 95%, 60%)',  // energy yellow
      'hsl(200, 70%, 75%)', // secondary blue
      'hsl(270, 60%, 65%)', // magic purple
      'hsl(140, 50%, 55%)', // nature green
      'hsl(15, 85%, 60%)',  // passion orange
    ];

    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      size: 8 + Math.random() * 8,
    }));

    setPieces(newPieces);

    const timer = setTimeout(() => {
      setPieces([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute confetti"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
