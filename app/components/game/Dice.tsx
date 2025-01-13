'use client';

interface DiceProps {
  values?: number[];
  isRolling?: boolean;
  className?: string;
}

const DiceDot = () => (
  <div className="
    w-3 h-3
    rounded-full 
    bg-gradient-to-br from-black to-gray-800
    shadow-inner
    transform-gpu
  ">
    <div className="
      w-full h-full 
      rounded-full 
      bg-gradient-to-br from-transparent to-black/20
    "/>
  </div>
);

export default function Dice({ values = [1], isRolling = false, className = '' }: DiceProps) {
  const renderDots = (value: number) => {
    // Define dot positions for each value
    const dotPositions = {
      1: [{ x: 1, y: 1 }],
      2: [{ x: 0, y: 0 }, { x: 2, y: 2 }],
      3: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
      4: [
        { x: 0, y: 0 }, { x: 2, y: 0 },
        { x: 0, y: 2 }, { x: 2, y: 2 }
      ],
      5: [
        { x: 0, y: 0 }, { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 }, { x: 2, y: 2 }
      ],
      6: [
        { x: 0, y: 0 }, { x: 2, y: 0 },
        { x: 0, y: 1 }, { x: 2, y: 1 },
        { x: 0, y: 2 }, { x: 2, y: 2 }
      ]
    };

    const dots = dotPositions[value as keyof typeof dotPositions] || [];
    const grid = Array(9).fill(null);

    return (
      <div className="grid grid-cols-3 grid-rows-3 gap-2 p-3 w-full h-full">
        {grid.map((_, index) => {
          const x = index % 3;
          const y = Math.floor(index / 3);
          const hasDot = dots.some(dot => dot.x === x && dot.y === y);
          
          return (
            <div key={index} className="flex items-center justify-center">
              {hasDot && <DiceDot />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center gap-1 w-full h-full perspective-1000">
      {values.map((value, index) => (
        <div 
          key={index} 
          className={`
            relative 
            w-3/5 aspect-square 
            mx-auto 
            transform-gpu
            ${isRolling ? 'animate-roll-3d' : 'hover:rotate-y-12 hover:rotate-x-12'}
            transition-transform duration-300
          `}
        >
          <div className="
            absolute inset-0
            bg-gradient-to-br from-white to-gray-100
            rounded-xl
            shadow-lg
            border border-gray-200
            transform-gpu preserve-3d
          ">
            <div className="absolute -top-1 left-0 right-0 h-1 bg-white/30 rounded-t-xl" />
            
            <div className="absolute top-0 -right-1 bottom-0 w-1 bg-black/20 rounded-r-xl" />
            
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-black/30 rounded-b-xl" />
            
            <div className="absolute top-0 -left-1 bottom-0 w-1 bg-white/20 rounded-l-xl" />

            <div className={`
              relative
              w-full h-full 
              flex items-center justify-center
              p-3
              ${isRolling ? '' : 'group-hover:scale-105'}
              transition-transform
            `}>
              {renderDots(value)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 