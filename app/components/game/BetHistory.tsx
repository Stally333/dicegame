interface BetHistoryItem {
  round: number;
  player1Roll: number;
  player2Roll: number;
  betAmount: number;
  winner: 1 | 2 | 'tie';
}

interface BetHistoryProps {
  history: BetHistoryItem[];
}

export default function BetHistory({ history }: BetHistoryProps) {
  return (
    <div className="bg-black/20 rounded-xl p-4">
      <h3 className="text-gray-400 text-sm mb-3">Recent Rolls</h3>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {history.map((bet, index) => (
          <div 
            key={index}
            className="flex items-center justify-between text-sm p-2 rounded bg-black/20"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400">#{bet.round}</span>
              <div className="flex items-center gap-1">
                <span className={bet.winner === 1 ? 'text-[#FFD700]' : 'text-white'}>
                  {bet.player1Roll}
                </span>
                <span className="text-gray-400">vs</span>
                <span className={bet.winner === 2 ? 'text-[#FFD700]' : 'text-white'}>
                  {bet.player2Roll}
                </span>
              </div>
            </div>
            <span className="text-[#FFD700]">{bet.betAmount} SOL</span>
          </div>
        ))}
      </div>
    </div>
  );
} 