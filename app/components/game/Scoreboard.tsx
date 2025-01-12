import BetHistory from './BetHistory';
import GameStats from './GameStats';
import StatBox from './StatBox';

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
  player2AvgBet = 0
}: ScoreboardProps) {
  return (
    <div className="bg-[#1A1B1E]/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-8 text-white">Scoreboard</h2>
      
      <div className="flex flex-col space-y-6">
        {/* Score Display */}
        <div className="text-5xl font-bold flex items-center justify-center gap-6">
          <span className="text-[#FFD700]">{player1Score}</span>
          <span className="text-gray-400 text-3xl">vs</span>
          <span className="text-[#FFD700]">{player2Score}</span>
        </div>
        
        {/* Game Stats */}
        <GameStats 
          totalPot={totalPot}
          highestRoll={highestRoll}
          totalRolls={totalRolls}
        />
        
        {/* Round Progress */}
        <div className="bg-black/20 rounded-xl p-4">
          <div className="text-center mb-2">
            <div className="text-gray-400 text-sm">Round</div>
            <div className="text-[#FFD700] text-2xl font-bold">
              {currentRound}/{totalRounds}
            </div>
          </div>
          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#FFD700]"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            />
          </div>
        </div>

        {/* Bet History */}
        <BetHistory history={betHistory} />

        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatBox 
            label="TOTAL POT" 
            value={totalPot}
            subValue="SOL"
            isGold
            size="lg"
          />
          <StatBox 
            label="HIGHEST ROLL" 
            value={highestRoll}
            subValue="This Game"
            size="lg"
          />
          <StatBox 
            label="AVG ROLL" 
            value={(totalRolls > 0 ? totalRolls : 0).toFixed(1)}
            subValue={`${totalRolls} Rolls`}
            size="lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="space-y-2">
            <h3 className="text-gray-400 text-sm">Player 1</h3>
            <div className="grid grid-cols-2 gap-2">
              <StatBox 
                label="WIN RATE" 
                value={`${player1WinRate}%`}
                trend={player1WinRate > 50 ? 'up' : 'down'}
                size="sm"
              />
              <StatBox 
                label="AVG BET" 
                value={player1AvgBet}
                subValue="SOL"
                size="sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-gray-400 text-sm">Player 2</h3>
            <div className="grid grid-cols-2 gap-2">
              <StatBox 
                label="WIN RATE" 
                value={`${player2WinRate}%`}
                trend={player2WinRate > 50 ? 'up' : 'down'}
                size="sm"
              />
              <StatBox 
                label="AVG BET" 
                value={player2AvgBet}
                subValue="SOL"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 