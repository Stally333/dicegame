'use client';

interface BetControlsProps {
  currentBet: number;
  minBet: number;
  maxBet: number;
  balance: number;
  onBetChange: (amount: number) => void;
  disabled?: boolean;
  showQuickBets?: boolean;
}

export default function BetControls({ 
  currentBet, 
  minBet = 0.1, 
  maxBet = 5.0, 
  balance,
  onBetChange,
  disabled,
  showQuickBets = true
}: BetControlsProps) {
  const quickBets = [
    { label: 'Min', value: minBet },
    { label: '25%', value: balance * 0.25 },
    { label: '50%', value: balance * 0.5 },
    { label: 'Max', value: Math.min(maxBet, balance) }
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">Bet Amount:</span>
        <span className="text-[#FFD700]">{currentBet} SOL</span>
      </div>
      
      {showQuickBets && (
        <div className="grid grid-cols-4 gap-2 mb-2">
          {quickBets.map((bet) => (
            <button
              key={bet.label}
              onClick={() => onBetChange(bet.value)}
              disabled={disabled}
              className="px-2 py-1 text-xs bg-black/20 rounded hover:bg-black/40 
                text-gray-400 transition-colors disabled:opacity-50"
            >
              {bet.label}
            </button>
          ))}
        </div>
      )}

      <input
        type="range"
        min={minBet}
        max={maxBet}
        step={0.1}
        value={currentBet}
        onChange={(e) => onBetChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
} 