'use client';

interface BetControlsProps {
  currentBet: number;
  minBet: number;
  maxBet: number;
  balance: number;
  onBetChange: (amount: number) => void;
  disabled?: boolean;
}

export default function BetControls({ 
  currentBet, 
  minBet, 
  maxBet, 
  balance,
  onBetChange,
  disabled = false
}: BetControlsProps) {
  const presetAmounts = [0.1, 0.5, 1.0, 2.0];

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">Balance:</span>
        <span className="text-[#FFD700] font-medium">{balance} SOL</span>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onBetChange(Math.max(minBet, currentBet - 0.1))}
          disabled={disabled || currentBet <= minBet}
          className="bg-black/20 text-white w-7 h-7 rounded-lg flex items-center justify-center hover:bg-black/30 disabled:opacity-50"
        >
          -
        </button>
        <div className="flex-1 bg-black/20 rounded-lg py-1 px-2 text-center">
          <span className="text-[#FFD700] font-bold">{currentBet.toFixed(1)} SOL</span>
        </div>
        <button 
          onClick={() => onBetChange(Math.min(maxBet, currentBet + 0.1))}
          disabled={disabled || currentBet >= maxBet || currentBet >= balance}
          className="bg-black/20 text-white w-7 h-7 rounded-lg flex items-center justify-center hover:bg-black/30 disabled:opacity-50"
        >
          +
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1">
        {presetAmounts.map(amount => (
          <button
            key={amount}
            onClick={() => onBetChange(amount)}
            disabled={disabled || amount > balance || amount > maxBet}
            className="bg-black/20 text-xs text-white py-1 px-1 rounded-lg 
              hover:bg-[#FFD700]/20 hover:text-[#FFD700] 
              transition-all duration-200 
              disabled:opacity-50 disabled:hover:bg-black/20 disabled:hover:text-white"
          >
            {amount} SOL
          </button>
        ))}
      </div>
    </div>
  );
} 