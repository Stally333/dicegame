'use client';

import Image from 'next/image';

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

      {/* Dealer Tiger Section - Made smaller and added frame */}
      <div className="relative px-4 py-6">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
        <div className="relative w-64 h-64 mx-auto"> {/* Reduced size from default */}
          {/* Dealer Frame */}
          <div className="absolute inset-0 border-2 border-[#FFD700]/20 rounded-xl">
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#FFD700]"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#FFD700]"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#FFD700]"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#FFD700]"></div>
          </div>

          {/* Tiger Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/10 to-transparent rounded-full blur-xl"></div>
            <Image 
              src="/tiger.png" 
              alt="Dealer Tiger" 
              width={230}
              height={230}
              className="object-contain animate-bounce-gentle drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
              priority
            />
          </div>

          {/* Message Box */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[280px]">
            <div className="relative">
              {/* Message Box Background */}
              <div className="bg-black/80 border border-[#FFD700]/30 rounded-lg p-3 shadow-lg">
                <p className="text-[#FFD700] text-sm text-center font-medium">
                  {round.phase === 'ROLLING' ? "Place your bets!" : "Good luck, players!"}
                </p>
              </div>
              {/* Speech Triangle */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4">
                <div className="w-4 h-4 bg-black/80 border-l border-t border-[#FFD700]/30 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Display */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
          {/* Player 1 Score */}
          <div className="text-center relative">
            <div className="digital-number segment-display text-[86px] font-bold text-[#FF0000] leading-none tracking-tighter bg-black/40 p-4 rounded-lg border border-red-900/20">
              {String(player1.score).padStart(2, '0')}
            </div>
            <div className="text-[#FF0000]/80 font-mono text-sm mt-1 animate-pulse">
              {player1.currentBet.toFixed(2)} SOL
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center">
            <span className="text-gray-600 text-xl font-bold digital-number animate-pulse">VS</span>
          </div>

          {/* Player 2 Score */}
          <div className="text-center relative">
            <div className="digital-number segment-display text-[86px] font-bold text-[#FF0000] leading-none tracking-tighter bg-black/40 p-4 rounded-lg border border-red-900/20">
              {String(player2.score).padStart(2, '0')}
            </div>
            <div className="text-[#FF0000]/80 font-mono text-sm mt-1 animate-pulse">
              {player2.currentBet.toFixed(2)} SOL
            </div>
          </div>
        </div>
      </div>

      {/* Player Status */}
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