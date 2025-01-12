'use client';

import { useEffect } from 'react';
import Dice from './Dice';

interface DiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  diceValue?: number;
  isRolling: boolean;
  playerNumber: number;
}

export default function DiceModal({ 
  isOpen, 
  onClose, 
  diceValue, 
  isRolling,
  playerNumber
}: DiceModalProps) {
  useEffect(() => {
    if (!isRolling && diceValue) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isRolling, diceValue, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Player Indicator */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF4500] mb-2">
            <span className="text-white font-bold text-lg">P{playerNumber}</span>
          </div>
          <div className="text-white font-bold text-xl">
            {isRolling ? 'Rolling...' : `Rolled ${diceValue}`}
          </div>
        </div>

        {/* Dice Container */}
        <div className="bg-[#1A1B1E] p-12 rounded-3xl border border-gray-800/50 shadow-2xl">
          <div className={`transform transition-transform duration-500 ${
            isRolling ? 'scale-110' : 'scale-100'
          }`}>
            <Dice 
              value={isRolling ? undefined : diceValue} 
              isRolling={isRolling}
            />
          </div>
        </div>

        {/* Result Display */}
        {!isRolling && diceValue && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
            <div className="text-[#FFD700] text-4xl font-bold mb-2">
              {diceValue}
            </div>
            <div className="text-gray-400">
              Click anywhere to continue
            </div>
          </div>
        )}
      </div>

      {/* Close button or click anywhere to close */}
      {!isRolling && (
        <button 
          onClick={onClose}
          className="absolute inset-0 w-full h-full cursor-pointer"
          aria-label="Close modal"
        />
      )}
    </div>
  );
} 