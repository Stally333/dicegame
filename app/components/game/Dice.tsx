'use client';

import React from 'react';

interface DiceProps {
  value?: number;
  isRolling?: boolean;
}

// Define dot patterns for each dice value
const dotPatterns = {
  1: [{ row: 1, col: 1 }],
  2: [{ row: 0, col: 0 }, { row: 2, col: 2 }],
  3: [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }],
  4: [
    { row: 0, col: 0 }, { row: 0, col: 2 },
    { row: 2, col: 0 }, { row: 2, col: 2 }
  ],
  5: [
    { row: 0, col: 0 }, { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 }, { row: 2, col: 2 }
  ],
  6: [
    { row: 0, col: 0 }, { row: 0, col: 2 },
    { row: 1, col: 0 }, { row: 1, col: 2 },
    { row: 2, col: 0 }, { row: 2, col: 2 }
  ]
};

export default function Dice({ value = 1, isRolling = false }: DiceProps) {
  const dots = dotPatterns[value as keyof typeof dotPatterns] || dotPatterns[1];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`w-full aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center p-4 
        ${isRolling ? 'animate-spin' : ''}`}
      >
        <div className="relative w-full h-full grid grid-cols-3 grid-rows-3 gap-2">
          {Array.from({ length: 9 }).map((_, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const hasDot = dots.some(dot => dot.row === row && dot.col === col);
            
            return (
              <div 
                key={index} 
                className="w-full h-full flex items-center justify-center"
              >
                {hasDot && (
                  <div className="w-3/4 h-3/4 rounded-full bg-black" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 