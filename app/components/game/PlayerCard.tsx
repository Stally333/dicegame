'use client';
import { useState, useEffect } from 'react';
import Dice from './Dice';
import BetControls from './BetControls';
import PlayerStatus from './PlayerStatus';
import StatBox from './StatBox';
import { FiSettings, FiMinus, FiPlus } from 'react-icons/fi';
import BetSettingsModal from './BetSettingsModal';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import DiceModel from './DiceModel';
import { Socket } from 'socket.io-client';

// Dynamic import with SSR disabled
const Dice3D = dynamic(() => import('./3d/Dice3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-white">Loading 3D Dice...</span>
    </div>
  )
});

interface PlayerCardProps {
  playerNumber: number;
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
  diceCount?: number;
  onDiceCountChange?: (count: number) => void;
  use3D?: boolean;
  diceValues?: number[];
  socket: Socket | null;
}

export default function PlayerCard({ 
  playerNumber, 
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
  onBetChange,
  diceCount = 1,
  onDiceCountChange,
  use3D = false,
  diceValues = [3],
  socket
}: PlayerCardProps) {
  const [currentBet, setCurrentBet] = useState(0.1);
  const [isRolling, setIsRolling] = useState(false);
  const [showBetSettings, setShowBetSettings] = useState(false);
  const [localDiceValues, setLocalDiceValues] = useState<number[]>([3]);

  // Update local dice values when count changes
  useEffect(() => {
    // Initialize dice values array based on count
    const newValues = Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    setLocalDiceValues(newValues);
  }, [diceCount]);

  const handleBetChange = (amount: number) => {
    setCurrentBet(amount);
    onBetChange?.(amount);
  };

  const handleRoll = async () => {
    if (!isActive || hasRolled || currentBet > balance) return;
    
    setIsRolling(true);
    
    // Generate random values for animation
    const newValues = Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    setLocalDiceValues(newValues);
    
    // Simulate roll animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRolling(false);
    
    // Call the actual roll function
    onRoll?.();
  };

  // Listen for roll events from server
  useEffect(() => {
    if (!socket) return;

    // Handle roll results from server
    const handleRollResult = (data: any) => {
      console.log('Received roll result:', data);
      if (data.playerNumber === playerNumber) {
        setLocalDiceValues(data.diceValues);
      }
    };

    socket.on('roll_result', handleRollResult);
    
    return () => {
      socket.off('roll_result', handleRollResult);
    };
  }, [socket, playerNumber]);

  const playRollSound = () => {
    try {
      const audio = new Audio('/sounds/dice-roll.mp3');
      audio.volume = 0.5; // Lower volume
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio playback failed:", error);
          // Continue with dice count change even if sound fails
        });
      }
    } catch (error) {
      console.log("Audio creation failed:", error);
      // Continue with dice count change even if sound fails
    }
  };

  // Update DiceCountSelector to work without requiring sound
  const handleDiceCountChange = (newCount: number) => {
    onDiceCountChange?.(newCount);
    playRollSound(); // Try to play sound but don't block if it fails
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#1E2024] to-[#17181C] rounded-lg p-4">
      {/* Player Info */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-[#FF4500] flex items-center justify-center text-white font-bold text-sm">
            P{playerNumber}
          </div>
          <div>
            <div className="text-white font-bold text-sm">PLAYER {playerNumber}</div>
            <div className="text-gray-400 text-[10px]">{walletAddress}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[#FFD700] font-bold text-sm">{balance} SOL</div>
          <div className="text-gray-400 text-[10px]">Balance</div>
        </div>
      </div>

      {/* Status */}
      <div className="mb-2 shrink-0 relative">
        <PlayerStatus 
          isActive={isActive}
          hasRolled={hasRolled}
          lastRoll={diceValue}
          timeLeft={timeLeft}
        />
      </div>

      {/* Dice Section */}
      <div className="relative flex-1 min-h-0 mb-2 overflow-visible">
        {/* Main background - lowest layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E2024] to-[#141619] rounded-2xl" />
        
        {/* Red corner lines - middle layer */}
        <div className="absolute inset-[-2px] z-10">
          {/* Top-left corner */}
          <div className="absolute top-0 left-0">
            <div className="absolute top-0 left-0 w-[128px] h-[2px] bg-[#FF0000]/40" />
            <div className="absolute top-0 left-0 w-[2px] h-[128px] bg-[#FF0000]/40" />
          </div>
          
          {/* Top-right corner */}
          <div className="absolute top-0 right-0">
            <div className="absolute top-0 right-0 w-[128px] h-[2px] bg-[#FF0000]/40" />
            <div className="absolute top-0 right-0 w-[2px] h-[128px] bg-[#FF0000]/40" />
          </div>
          
          {/* Bottom-left corner */}
          <div className="absolute bottom-0 left-0">
            <div className="absolute bottom-0 left-0 w-[128px] h-[2px] bg-[#FF0000]/40" />
            <div className="absolute bottom-0 left-0 w-[2px] h-[128px] bg-[#FF0000]/40" />
          </div>
          
          {/* Bottom-right corner */}
          <div className="absolute bottom-0 right-0">
            <div className="absolute bottom-0 right-0 w-[128px] h-[2px] bg-[#FF0000]/40" />
            <div className="absolute bottom-0 right-0 w-[2px] h-[128px] bg-[#FF0000]/40" />
          </div>
        </div>

        {/* Dice Container - top layer with extended bounds */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-full h-full flex items-center justify-center pointer-events-none">
            {use3D ? (
              <div className="transform scale-[1.2] relative z-30 w-full h-full max-w-[200px] max-h-[200px]">
                <Dice3D
                  count={diceCount}
                  values={localDiceValues}
                  isRolling={isRolling}
                  onRollComplete={() => setIsRolling(false)}
                />
              </div>
            ) : (
              <div className="relative z-30">
                <Dice values={localDiceValues} isRolling={isRolling} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="space-y-2 shrink-0 relative z-30">
        {/* Bet Amount Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Bet Amount:</span>
            <span className="text-[#FFD700] text-lg font-bold">
              {Number(currentBet).toFixed(2)} SOL
            </span>
          </div>
          <button
            onClick={() => setShowBetSettings(true)}
            className="p-1.5 text-gray-400 hover:text-[#FFD700] transition-colors"
          >
            <FiSettings className="w-4 h-4" />
          </button>
        </div>
        
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
          disabled={!isActive || hasRolled || currentBet > balance || isRolling}
          className={`w-full py-3 text-lg font-bold rounded-lg transition-all duration-300 relative z-30 ${
            !isActive || hasRolled || currentBet > balance || isRolling
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'text-white bg-gradient-to-r from-[#fe8c00] to-[#f83600] hover:opacity-90'
          }`}
        >
          {isRolling ? 'Rolling...' : hasRolled ? 'Rolled' : 'Roll Dice'}
        </button>

        {/* Number of Dice Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-gray-400 text-sm">Number of Dice:</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => diceCount > 1 && onDiceCountChange?.(diceCount - 1)}
              className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              disabled={diceCount <= 1}
            >
              <FiMinus size={16} />
            </button>
            <span className="text-white w-4 text-center">{diceCount}</span>
            <button
              onClick={() => diceCount < 3 && onDiceCountChange?.(diceCount + 1)}
              className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              disabled={diceCount >= 3}
            >
              <FiPlus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* BetSettings Modal */}
      {showBetSettings && (
        <BetSettingsModal
          isOpen={showBetSettings}
          onClose={() => setShowBetSettings(false)}
          currentBet={currentBet}
          onBetChange={handleBetChange}
          balance={balance}
        />
      )}

      {/* Add an "Insert Coin" prompt when balance is low */}
      {balance < 0.1 && (
        <div className="text-center my-2">
          <span className="insert-coin text-sm">INSERT COIN</span>
        </div>
      )}

      {/* Add win/lose animations */}
      {hasRolled && (
        <div className={`absolute inset-0 ${
          diceValue > 3 ? 'bg-green-500' : 'bg-red-500'
        }/10 animate-pulse rounded-xl`} />
      )}
    </div>
  );
} 

function DiceCountSelector({ count, onChange }: { count: number, onChange: (count: number) => void }) {
  return (
    <div className="flex items-center justify-between bg-black/20 rounded-lg p-2 mb-3">
      <span className="text-gray-400 text-sm">Number of Dice:</span>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onChange(Math.max(1, count - 1))}
          className="p-1 text-gray-400 hover:text-[#FFD700] disabled:opacity-50"
          disabled={count <= 1}
        >
          <FiMinus className="w-4 h-4" />
        </button>
        <span className="text-[#FFD700] w-4 text-center">{count}</span>
        <button 
          onClick={() => onChange(Math.min(3, count + 1))}
          className="p-1 text-gray-400 hover:text-[#FFD700] disabled:opacity-50"
          disabled={count >= 3}
        >
          <FiPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
} 