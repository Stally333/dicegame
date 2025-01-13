'use client';

interface BetControlsProps {
  currentBet: number;
  minBet: number;
  maxBet: number;
  balance: number;
  potSize?: number;
  onBetChange: (amount: number) => void;
  disabled?: boolean;
}

export default function BetControls({ 
  currentBet, 
  minBet = 0.1, 
  maxBet = 5.0,
  balance,
  potSize = 0,
  onBetChange,
  disabled
}: BetControlsProps) {
  // Calculate quick bet amounts
  const quickBets = [
    { label: 'Min', value: minBet },
    { label: '0.5x', value: Math.min(potSize * 0.5, balance) },
    { label: '1x', value: Math.min(potSize, balance) },
    { label: '2x', value: Math.min(potSize * 2, balance) },
    { label: 'Max', value: Math.min(maxBet, balance) }
  ];

  // Format bet amount for display
  const formatBet = (amount: number) => amount.toFixed(2);

  // Calculate potential win (simplified for now)
  const potentialWin = currentBet * 2;

  return (
    <div className="space-y-3">
      {/* Current Bet Display */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">Bet Amount:</span>
        <span className="text-[#FFD700] font-bold">{formatBet(currentBet)} SOL</span>
      </div>
      
      {/* Quick Bet Buttons */}
      <div className="grid grid-cols-5 gap-1">
        {quickBets.map((bet) => (
          <button
            key={bet.label}
            onClick={() => onBetChange(bet.value)}
            disabled={disabled}
            className="px-2 py-1.5 text-xs bg-black/20 rounded 
              hover:bg-black/40 text-gray-400 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
              border border-transparent hover:border-[#FFD700]/20"
          >
            {bet.label}
          </button>
        ))}
      </div>

      {/* Bet Slider */}
      <div className="space-y-1">
        <input
          type="range"
          min={minBet}
          max={maxBet}
          step={0.1}
          value={currentBet}
          onChange={(e) => onBetChange(parseFloat(e.target.value))}
          disabled={disabled}
          className="w-full accent-[#FFD700]"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatBet(minBet)}</span>
          <span>{formatBet(maxBet)}</span>
        </div>
      </div>

      {/* Potential Win Display */}
      <div className="flex items-center justify-between text-sm bg-black/20 rounded-lg p-2">
        <span className="text-gray-400">Potential Win:</span>
        <span className="text-[#FFD700] font-bold">{formatBet(potentialWin)} SOL</span>
      </div>
    </div>
  );
} 