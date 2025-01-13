'use client';
import { useState } from 'react';

interface BetSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBet: number;
  onBetChange: (amount: number) => void;
  balance: number;
}

export default function BetSettingsModal({
  isOpen,
  onClose,
  currentBet,
  onBetChange,
  balance
}: BetSettingsModalProps) {
  const [customAmount, setCustomAmount] = useState('');
  
  const presetBets = [
    { label: '1 SOL', value: 1 },
    { label: '5 SOL', value: 5 },
    { label: '10 SOL', value: 10 },
    { label: '25 SOL', value: 25 },
    { label: '50 SOL', value: 50 },
    { label: '100 SOL', value: 100 },
  ];

  const betMultipliers = [
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
    { label: '5x', value: 5 },
    { label: '10x', value: 10 }
  ];

  const handleCustomAmount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount >= 0.1) {
      onBetChange(amount);
      setCustomAmount('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1A1B1E] rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-800/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Betting Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Custom Amount Input */}
        <div className="mb-4">
          <form onSubmit={handleCustomAmount} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Custom amount"
                step="0.1"
                min="0.1"
                className="w-full bg-black/20 rounded-lg px-3 py-2 text-white placeholder-gray-500
                  border border-gray-800 focus:border-[#FFD700] outline-none
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                <button
                  type="button"
                  onClick={() => {
                    const newAmount = parseFloat(customAmount || '0') + 0.1;
                    setCustomAmount(newAmount.toFixed(1));
                  }}
                  className="text-gray-400 hover:text-[#FFD700] transition-colors text-xs leading-none"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newAmount = Math.max(0.1, parseFloat(customAmount || '0') - 0.1);
                    setCustomAmount(newAmount.toFixed(1));
                  }}
                  className="text-gray-400 hover:text-[#FFD700] transition-colors text-xs leading-none"
                >
                  ▼
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFD700]/10 text-[#FFD700] rounded-lg 
                hover:bg-[#FFD700]/20 transition-colors"
            >
              Set
            </button>
          </form>
          {parseFloat(customAmount) > balance && (
            <div className="text-[#FF4500] text-xs mt-1">
              Warning: Amount exceeds current balance ({balance} SOL)
            </div>
          )}
        </div>

        {/* Quick Amounts Grid */}
        <div className="mb-4">
          <h4 className="text-gray-400 text-sm mb-2">Quick Amounts</h4>
          <div className="grid grid-cols-3 gap-2">
            {presetBets.map((bet) => (
              <button
                key={bet.label}
                onClick={() => onBetChange(bet.value)}
                disabled={bet.value > balance}
                className={`px-3 py-2 text-sm rounded-lg transition-colors
                  ${bet.value > balance 
                    ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                    : 'bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20'
                  }`}
              >
                {bet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Multipliers */}
        <div className="mb-4">
          <h4 className="text-gray-400 text-sm mb-2">Multiply Current Bet</h4>
          <div className="flex gap-2">
            {betMultipliers.map((mult) => (
              <button
                key={mult.label}
                onClick={() => onBetChange(currentBet * mult.value)}
                disabled={currentBet * mult.value > balance}
                className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors
                  ${currentBet * mult.value > balance 
                    ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                    : 'bg-black/20 text-[#FFD700] hover:bg-black/30'
                  }`}
              >
                {mult.label}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Bet Strategies */}
        <div>
          <h4 className="text-gray-400 text-sm mb-2">Auto Bet Strategies</h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors text-left">
              <div className="text-sm text-[#FFD700]">2x on Loss</div>
              <div className="text-xs text-gray-400">Double after loss</div>
            </button>
            <button className="px-3 py-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors text-left">
              <div className="text-sm text-[#FFD700]">Reset on Win</div>
              <div className="text-xs text-gray-400">Back to initial</div>
            </button>
            <button className="px-3 py-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors text-left">
              <div className="text-sm text-[#FFD700]">+50% on Win</div>
              <div className="text-xs text-gray-400">Increase by 50%</div>
            </button>
            <button className="px-3 py-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors text-left">
              <div className="text-sm text-[#FFD700]">Martingale</div>
              <div className="text-xs text-gray-400">Progressive</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 