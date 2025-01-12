'use client';

import React from 'react';

interface DiceProps {
  value?: number;
  isRolling?: boolean;
}

export default function Dice({ value, isRolling }: DiceProps) {
  const dots = {
    1: [<div key="center" className="col-start-2 col-end-3 row-start-2 row-end-3" />],
    2: [
      <div key="top-right" className="col-start-3 col-end-4 row-start-1 row-end-2" />,
      <div key="bottom-left" className="col-start-1 col-end-2 row-start-3 row-end-4" />
    ],
    3: [
      <div key="top-right" className="col-start-3 col-end-4 row-start-1 row-end-2" />,
      <div key="center" className="col-start-2 col-end-3 row-start-2 row-end-3" />,
      <div key="bottom-left" className="col-start-1 col-end-2 row-start-3 row-end-4" />
    ],
    4: [
      <div key="top-left" className="col-start-1 col-end-2 row-start-1 row-end-2" />,
      <div key="top-right" className="col-start-3 col-end-4 row-start-1 row-end-2" />,
      <div key="bottom-left" className="col-start-1 col-end-2 row-start-3 row-end-4" />,
      <div key="bottom-right" className="col-start-3 col-end-4 row-start-3 row-end-4" />
    ],
    5: [
      <div key="top-left" className="col-start-1 col-end-2 row-start-1 row-end-2" />,
      <div key="top-right" className="col-start-3 col-end-4 row-start-1 row-end-2" />,
      <div key="center" className="col-start-2 col-end-3 row-start-2 row-end-3" />,
      <div key="bottom-left" className="col-start-1 col-end-2 row-start-3 row-end-4" />,
      <div key="bottom-right" className="col-start-3 col-end-4 row-start-3 row-end-4" />
    ],
    6: [
      <div key="top-left" className="col-start-1 col-end-2 row-start-1 row-end-2" />,
      <div key="top-right" className="col-start-3 col-end-4 row-start-1 row-end-2" />,
      <div key="middle-left" className="col-start-1 col-end-2 row-start-2 row-end-3" />,
      <div key="middle-right" className="col-start-3 col-end-4 row-start-2 row-end-3" />,
      <div key="bottom-left" className="col-start-1 col-end-2 row-start-3 row-end-4" />,
      <div key="bottom-right" className="col-start-3 col-end-4 row-start-3 row-end-4" />
    ]
  };

  return (
    <div className="relative w-full aspect-square">
      {/* Playing Field Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-[2px]">
        <div className="absolute inset-[1px] bg-gradient-to-br from-gray-700/50 to-transparent rounded-2xl" />
        
        {/* Grid Lines */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px opacity-10">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="bg-white/20" />
            ))}
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#FFD700]/30 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#FFD700]/30 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#FFD700]/30 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#FFD700]/30 rounded-br-lg" />

        {/* Dice Container */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className={`
            w-full h-full bg-white rounded-xl shadow-inner 
            flex items-center justify-center
            ${isRolling ? 'animate-spin' : 'transform transition-transform hover:scale-105'}
          `}>
            {value ? (
              <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full p-4">
                {dots[value as keyof typeof dots]?.map(dot => (
                  React.cloneElement(dot, {
                    className: `${dot.props.className} w-4 h-4 bg-black rounded-full`
                  })
                ))}
              </div>
            ) : (
              <div className="text-4xl text-gray-300">?</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 