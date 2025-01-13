'use client';

interface LiveScoreboardProps {
  player1: {
    name: string;
    address: string;
    score: number;
    currentBet: number;
    status: 'betting' | 'rolling' | 'waiting';
    lastRolls: number[];
    winStreak: number;
    totalWon: number;
  };
  player2: {
    name: string;
    address: string;
    score: number;
    currentBet: number;
    status: 'betting' | 'rolling' | 'waiting';
    lastRolls: number[];
    winStreak: number;
    totalWon: number;
  };
  round: {
    current: number;
    total: number;
    phase: 'betting' | 'rolling' | 'revealing';
    timeLeft: number;
  };
  matchHistory: Array<{
    round: number;
    player1Roll: number;
    player2Roll: number;
    betAmount: number;
    winner: 1 | 2 | 'tie';
    timestamp: number;
  }>;
}

export default function LiveScoreboard({
  player1,
  player2,
  round,
  matchHistory = []
}: LiveScoreboardProps) {
  return (
    <div className="flex-1 bg-black/40 rounded-lg overflow-hidden">
      {/* Round Info Bar */}
      <div className="bg-black/60 px-4 py-1 flex items-center justify-between">
        <div className="text-gray-400 font-mono text-sm">ROUND {round.current}/{round.total}</div>
        <div className="text-[#FFD700] font-mono text-xl">{String(round.timeLeft).padStart(2, '0')}</div>
        <div className="text-gray-400 uppercase text-xs">{round.phase}</div>
      </div>

      {/* Score Display - Enhanced Digital LED style */}
      <div className="px-4 pt-8 pb-2">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
          {/* Player 1 Score */}
          <div className="text-center relative">
            <div className="digital-number segment-display text-[96px] font-bold text-[#FF0000] leading-none tracking-tighter bg-black/40 p-4 rounded-lg border border-red-900/20">
              {String(player1.score).padStart(2, '0')}
            </div>
            <div className="text-[#FF0000]/80 font-mono text-sm mt-1 animate-pulse">
              {player1.currentBet.toFixed(2)} SOL
            </div>
            {/* Add retro corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF0000]/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF0000]/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF0000]/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF0000]/30"></div>
          </div>

          {/* VS */}
          <div className="flex items-center">
            <span className="text-gray-600 text-2xl font-bold digital-number animate-pulse">VS</span>
          </div>

          {/* Player 2 Score */}
          <div className="text-center relative">
            <div className="digital-number segment-display text-[96px] font-bold text-[#FF0000] leading-none tracking-tighter bg-black/40 p-4 rounded-lg border border-red-900/20">
              {String(player2.score).padStart(2, '0')}
            </div>
            <div className="text-[#FF0000]/80 font-mono text-sm mt-1 animate-pulse">
              {player2.currentBet.toFixed(2)} SOL
            </div>
            {/* Add retro corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF0000]/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF0000]/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF0000]/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF0000]/30"></div>
          </div>
        </div>
      </div>

      {/* Player Status - Reduced padding */}
      <div className="px-4 py-1 space-y-1">
        {[player1, player2].map((player, index) => (
          <div key={index} 
            className="flex items-center justify-between bg-black/40 rounded px-3 py-1.5">
            <div className="flex items-center gap-2">
              <div className="font-mono text-[#FFD700] text-sm">{player.name}</div>
              <div className="text-gray-500 text-xs font-mono">{player.address}</div>
            </div>
            <div className={`px-2 py-0.5 rounded text-xs font-bold uppercase
              ${player.status === 'betting' ? 'bg-green-500/20 text-green-400' : 
                'bg-gray-500/20 text-gray-400'}`}>
              {player.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 