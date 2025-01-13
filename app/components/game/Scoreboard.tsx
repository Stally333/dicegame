import BetHistory from './BetHistory';
import GameStats from './GameStats';
import StatBox from './StatBox';
import Image from 'next/image';
import LiveScoreboard from './LiveScoreboard';

function calculateWinStreak(history: Array<{winner: 1 | 2 | 'tie'}>, playerNumber: 1 | 2): number {
  let streak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].winner === playerNumber) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function calculateTotalWon(history: Array<{winner: 1 | 2 | 'tie', betAmount: number}>, playerNumber: 1 | 2): number {
  return history.reduce((total, current) => {
    if (current.winner === playerNumber) {
      return total + current.betAmount * 2;
    }
    return total;
  }, 0);
}

interface ScoreboardProps {
  player1: string;
  player2: string;
  round: number;
  totalRounds: number;
  player1Bet: number;
  player2Bet: number;
  highestRoll: number;
  totalRolls: number;
}

export default function Scoreboard({
  player1,
  player2,
  round,
  totalRounds,
  player1Bet,
  player2Bet,
  highestRoll,
  totalRolls
}: ScoreboardProps) {
  return (
    <div className="bg-[#1A1B1E]/80 backdrop-blur-sm rounded-xl p-4 h-full flex flex-col min-w-[480px] max-h-[calc(100vh-8rem)]">
      {/* Round Info - Made more compact */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-400 text-base font-medium">
          ROUND {round}/{totalRounds}
        </div>
        <div className="text-[#FF0000] text-base font-bold animate-pulse">
          ROLLING
        </div>
      </div>

      {/* Dealer Tiger Section - Adjusted height */}
      <div className="relative flex items-center justify-center py-2 flex-1">
        {/* Dealer Frame - Height constrained */}
        <div className="relative w-full h-full max-w-[600px]">
          {/* Frame Border */}
          <div className="absolute inset-0 border-2 border-[#FFD700]/20 rounded-xl dealer-frame bg-black/40">
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#FFD700]"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#FFD700]"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#FFD700]"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#FFD700]"></div>

            {/* Classic Speech Bubble */}
            <div className="absolute top-4 right-4 z-10">
              <div className="
                relative 
                bg-white 
                px-6 py-3 
                rounded-lg
                min-w-[180px]
                before:content-['']
                before:absolute
                before:bottom-[-10px]
                before:left-[20px]
                before:w-[20px]
                before:h-[20px]
                before:bg-white
                before:skew-y-[-45deg]
              ">
                <p className="text-black text-sm font-pixel text-center">
                  Let's roll the dice!
                </p>
              </div>
            </div>

            {/* VS and Round Info - Positioned relative to frame */}
            <div className="absolute bottom-6 right-6 flex flex-col items-end">
              <div className="digital-number text-[#FF0000] text-8xl mb-2 font-bold tracking-tighter drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]">
                VS
              </div>
              <div className="text-[#FFD700] text-2xl font-bold tracking-wider drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                Round {round} of {totalRounds}
              </div>
            </div>
          </div>

          {/* Content Container - Tiger at 1/3 position */}
          <div className="relative h-full flex flex-col justify-center">
            <div className="relative w-full flex">
              {/* Tiger Container - Without VS text */}
              <div className="relative ml-[calc(25%-155px)]">
                <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/20 to-transparent rounded-full blur-xl"></div>
                <Image 
                  src="/tiger.png" 
                  alt="Dealer Tiger" 
                  width={310}
                  height={310}
                  className="object-contain animate-bounce-gentle drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Display - More compact */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-3">
        <div className="bg-black/50 rounded-lg p-3">
          <div className="digital-number text-[#FF0000] text-4xl text-center">00</div>
          <div className="text-[#FF0000]/60 text-xs text-center">{player1Bet.toFixed(2)} SOL</div>
        </div>
        <div className="text-[#FF0000] text-2xl font-bold self-center">VS</div>
        <div className="bg-black/50 rounded-lg p-3">
          <div className="digital-number text-[#FF0000] text-4xl text-center">00</div>
          <div className="text-[#FF0000]/60 text-xs text-center">{player2Bet.toFixed(2)} SOL</div>
        </div>
      </div>

      {/* Player Status - More compact */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-black/30 rounded-lg px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[#FFD700] text-sm font-medium">• Player 1</span>
            <span className="text-gray-400 uppercase text-xs font-bold">WAITING</span>
          </div>
        </div>
        <div className="bg-black/30 rounded-lg px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[#FFD700] text-sm font-medium">• Player 2</span>
            <span className="text-gray-400 uppercase text-xs font-bold">WAITING</span>
          </div>
        </div>
      </div>

      {/* Game Stats - More compact */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-black/30 rounded-lg p-2 text-center">
          <div className="text-[#FFD700] text-base font-bold">{(player1Bet + player2Bet).toFixed(2)}</div>
          <div className="text-gray-500 text-xs">Total Pot SOL</div>
        </div>
        <div className="bg-black/30 rounded-lg p-2 text-center">
          <div className="text-white text-base font-bold">{highestRoll}</div>
          <div className="text-gray-500 text-xs">Highest Roll</div>
        </div>
        <div className="bg-black/30 rounded-lg p-2 text-center">
          <div className="text-white text-base font-bold">{totalRolls}</div>
          <div className="text-gray-500 text-xs">Total Rolls</div>
        </div>
      </div>
    </div>
  );
} 