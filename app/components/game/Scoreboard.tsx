import BetHistory from './BetHistory';
import GameStats from './GameStats';
import StatBox from './StatBox';
import Image from 'next/image';

interface ScoreboardProps {
  player1Score: number;
  player2Score: number;
  currentRound: number;
  totalRounds: number;
  betHistory: Array<{
    round: number;
    player1Roll: number;
    player2Roll: number;
    betAmount: number;
    winner: 1 | 2 | 'tie';
  }>;
  totalPot: number;
  highestRoll: number;
  totalRolls: number;
  player1WinRate?: number;
  player2WinRate?: number;
  player1AvgBet?: number;
  player2AvgBet?: number;
  bettingPhase?: boolean;
  timeLeft?: number;
  currentBets?: { player1: number; player2: number };
  onPlaceBet?: (player: 1 | 2, amount: number) => void;
}

export default function Scoreboard({ 
  player1Score = 0, 
  player2Score = 0, 
  currentRound = 1, 
  totalRounds = 5,
  betHistory = [],
  totalPot = 0,
  highestRoll = 0,
  totalRolls = 0,
  player1WinRate = 0,
  player2WinRate = 0,
  player1AvgBet = 0,
  player2AvgBet = 0,
  bettingPhase = false,
  timeLeft = 30,
  currentBets = { player1: 0, player2: 0 },
  onPlaceBet,
}: ScoreboardProps) {
  const titleStyles = "flex items-center justify-start pl-64 mb-4 relative";
  const tigerStyles = "absolute -top-32 -left-16 w-[240px] h-[240px] animate-bounce-gentle z-10";
  const headingStyles = `
    absolute top-[-8px] right-1 text-4xl font-bold
    bg-gradient-to-r from-[#FFD700] to-[#FFA500]
    bg-clip-text text-transparent
    tracking-tight
    hover:scale-105 transition-transform duration-200
    drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]
    animate-text-shine
  `;

  return (
    <div className="bg-[#1A1B1E]/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-xl h-full flex flex-col">
      {/* Title with Tiger Avatar */}
      <div className={titleStyles}>
        <Image
          src="/images/croupier-tiger.png"
          alt="Croupier Tiger"
          width={240}
          height={240}
          className={tigerStyles}
        />
        <h2 className={headingStyles}>Scoreboard</h2>
      </div>
      
      {/* Betting Phase Timer - Added top margin */}
      {bettingPhase && (
        <div className="bg-[#FFD700]/10 rounded-lg p-3 mb-4 mt-8">
          <div className="text-center text-sm text-gray-400 mb-1">Betting Phase</div>
          <div className="text-2xl font-bold text-center text-[#FFD700]">
            {timeLeft}s
          </div>
          <div className="h-1 bg-gray-800 rounded-full mt-1">
            <div 
              className="h-full bg-[#FFD700] rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Score Display - Reduced vertical spacing */}
      <div className="text-5xl font-bold flex items-center justify-center gap-6 mb-4">
        <div className="text-center">
          <span className="text-[#FFD700]">{player1Score}</span>
          {bettingPhase && (
            <div className="text-xs text-gray-400 mt-1">
              Bet: {currentBets.player1} SOL
            </div>
          )}
        </div>
        <span className="text-gray-400 text-3xl">vs</span>
        <div className="text-center">
          <span className="text-[#FFD700]">{player2Score}</span>
          {bettingPhase && (
            <div className="text-xs text-gray-400 mt-1">
              Bet: {currentBets.player2} SOL
            </div>
          )}
        </div>
      </div>

      {/* Recent Rolls - Reduced padding and max height */}
      <div className="bg-black/20 rounded-xl p-3 mb-4">
        <h3 className="text-gray-400 mb-2">Recent Rolls</h3>
        <div className="space-y-1 max-h-[120px] overflow-y-auto">
          {betHistory.map((bet, index) => (
            <div 
              key={index}
              className="flex items-center justify-between text-sm p-2 rounded bg-black/20"
            >
              <div className={`${bet.winner === 1 ? 'text-[#FFD700]' : 'text-gray-400'}`}>
                P1: {bet.player1Roll}
              </div>
              <div className="text-gray-600">{bet.betAmount} SOL</div>
              <div className={`${bet.winner === 2 ? 'text-[#FFD700]' : 'text-gray-400'}`}>
                P2: {bet.player2Roll}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Stats - Reduced padding */}
      <div className="grid grid-cols-3 gap-3 mt-auto">
        <div className="bg-black/20 rounded-lg p-2 text-center">
          <div className="text-[#FFD700] text-lg font-bold">{totalPot} SOL</div>
          <div className="text-gray-400 text-xs">Total Pot</div>
        </div>
        <div className="bg-black/20 rounded-lg p-2 text-center">
          <div className="text-white text-lg font-bold">{highestRoll}</div>
          <div className="text-gray-400 text-xs">Highest Roll</div>
        </div>
        <div className="bg-black/20 rounded-lg p-2 text-center">
          <div className="text-white text-lg font-bold">{totalRolls}</div>
          <div className="text-gray-400 text-xs">Total Rolls</div>
        </div>
      </div>
    </div>
  );
} 