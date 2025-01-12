interface GameStatsProps {
  totalPot: number;
  highestRoll: number;
  totalRolls: number;
}

export default function GameStats({ totalPot, highestRoll, totalRolls }: GameStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-black/20 rounded-lg p-3 text-center">
        <div className="text-[#FFD700] text-xl font-bold">{totalPot} SOL</div>
        <div className="text-gray-400 text-xs">Total Pot</div>
      </div>
      <div className="bg-black/20 rounded-lg p-3 text-center">
        <div className="text-white text-xl font-bold">{highestRoll}</div>
        <div className="text-gray-400 text-xs">Highest Roll</div>
      </div>
      <div className="bg-black/20 rounded-lg p-3 text-center">
        <div className="text-white text-xl font-bold">{totalRolls}</div>
        <div className="text-gray-400 text-xs">Total Rolls</div>
      </div>
    </div>
  );
} 