'use client';
import { useState } from 'react';
import Dice from './Dice';
import DiceModal from './DiceModal';
import BetControls from './BetControls';
import PlayerStatus from './PlayerStatus';
import StatBox from './StatBox';

interface PlayerCardProps {
  playerNumber: number;
  score?: number;
  plays?: number;
  streak?: number;
  cards?: number;
  walletAddress?: string;
  balance?: number;
  betAmount?: number;
  winRate?: number;
  totalWinnings?: number;
  diceValue?: number;
  isActive?: boolean;
  hasRolled?: boolean;
  timeLeft?: number;
  onRoll?: () => void;
  onBetChange?: (amount: number) => void;
}

export default function PlayerCard({ 
  playerNumber, 
  score = 0,
  plays = 0,
  streak = 0,
  cards = 0,
  walletAddress = '',
  balance = 0,
  betAmount = 0,
  winRate = 0,
  totalWinnings = 0,
  diceValue,
  isActive = false,
  hasRolled = false,
  timeLeft,
  onRoll,
  onBetChange
}: PlayerCardProps) {
  const [currentBet, setCurrentBet] = useState(0.1);
  const [showDiceModal, setShowDiceModal] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const handleBetChange = (amount: number) => {
    setCurrentBet(amount);
    onBetChange?.(amount);
  };

  const handleRoll = async () => {
    setShowDiceModal(true);
    setIsRolling(true);
    
    // Simulate roll animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRolling(false);
    
    // Call the actual roll function
    onRoll?.();
  };

  return (
    <div className="bg-[#1A1B1E]/95 backdrop-blur-sm rounded-2xl p-4 border border-gray-800/50 shadow-xl h-full flex flex-col">
      {/* Player Info Section */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#FF4500] flex items-center justify-center text-white font-bold">
            P{playerNumber}
          </div>
          <div>
            <div className="text-white font-bold">Player {playerNumber}</div>
            <div className="text-gray-400 text-sm">{walletAddress}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[#FFD700] font-bold">{score}</div>
          <div className="text-gray-400 text-sm">Score</div>
        </div>
      </div>

      {/* Status Section */}
      <div className="mb-3">
        <PlayerStatus 
          isActive={isActive}
          hasRolled={hasRolled}
          lastRoll={diceValue}
          timeLeft={timeLeft}
        />
      </div>

      {/* Dice Section - Centered with frame */}
      <div className="relative w-full aspect-square max-h-[200px] mx-auto mb-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E2024] to-[#141619] rounded-2xl" />
        
        {/* Corner Accents */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-6 h-6">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FFD700]/40 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#FFD700]/40 to-transparent" />
          </div>
          <div className="absolute top-0 right-0 w-6 h-6">
            <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#FFD700]/40 to-transparent" />
            <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#FFD700]/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 w-6 h-6">
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FFD700]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#FFD700]/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6">
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#FFD700]/40 to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#FFD700]/40 to-transparent" />
          </div>
        </div>

        {/* Dice Container */}
        <div className="relative w-2/5 aspect-square">
          <Dice value={diceValue} isRolling={isRolling} />
        </div>
      </div>

      {/* Controls Section */}
      <div className="mt-auto space-y-3">
        <BetControls
          currentBet={currentBet}
          minBet={0.1}
          maxBet={5.0}
          balance={balance}
          onBetChange={handleBetChange}
          disabled={hasRolled || !isActive}
        />
        
        <button
          onClick={handleRoll}
          disabled={!isActive || hasRolled || currentBet > balance}
          className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 py-2 rounded-lg font-bold 
            hover:shadow-lg hover:shadow-[#FFD700]/20 active:scale-95
            transition-all duration-200 
            disabled:opacity-50 disabled:hover:shadow-none disabled:active:scale-100"
        >
          {hasRolled ? 'Rolled' : 'Roll Dice'}
        </button>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2">
          <StatBox 
            label="PLAYS" 
            value={plays}
            subValue="Today: 5"
            size="sm"
          />
          <StatBox 
            label="STREAK" 
            value={streak}
            trend={streak > 0 ? 'up' : streak < 0 ? 'down' : 'neutral'}
            isHighlight 
            size="sm"
          />
          <StatBox 
            label="WIN RATE" 
            value={`${winRate}%`}
            trend={winRate > 50 ? 'up' : 'down'}
            size="sm"
          />
          <StatBox 
            label="PROFIT" 
            value={totalWinnings}
            subValue="SOL"
            isGold={totalWinnings > 0}
            trend={totalWinnings > 0 ? 'up' : totalWinnings < 0 ? 'down' : 'neutral'}
            size="sm"
          />
        </div>
      </div>

      {/* Dice Roll Modal */}
      <DiceModal 
        isOpen={showDiceModal}
        onClose={() => setShowDiceModal(false)}
        diceValue={diceValue}
        isRolling={isRolling}
        playerNumber={playerNumber}
      />
    </div>
  );
} 