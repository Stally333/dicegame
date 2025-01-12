'use client';

interface PlayerStatusProps {
  isActive: boolean;
  hasRolled: boolean;
  lastRoll?: number;
  timeLeft?: number;
}

export default function PlayerStatus({ 
  isActive, 
  hasRolled, 
  lastRoll,
  timeLeft 
}: PlayerStatusProps) {
  return (
    <div className="bg-black/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">Status</span>
        <div className={`flex items-center gap-2 ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
          <span className="w-2 h-2 rounded-full bg-current"/>
          <span className="text-sm">{isActive ? 'Your Turn' : 'Waiting'}</span>
        </div>
      </div>
      
      {timeLeft && isActive && (
        <div className="w-full h-1 bg-black/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#FFD700] transition-all duration-1000 ease-linear"
            style={{ 
              width: `${(timeLeft / 30) * 100}%`,
              transition: 'width 1s linear'
            }}
          />
        </div>
      )}

      {hasRolled && lastRoll && (
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-400">Last Roll:</span>
          <span className="ml-2 text-[#FFD700] font-bold">{lastRoll}</span>
        </div>
      )}
    </div>
  );
} 