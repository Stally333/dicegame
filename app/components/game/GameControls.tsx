interface GameControlsProps {
  betAmount: number;
  onIncreaseBet: () => void;
  onDecreaseBet: () => void;
  onDraw: () => void;
  onNewGame: () => void;
}

export default function GameControls({
  betAmount,
  onIncreaseBet,
  onDecreaseBet,
  onDraw,
  onNewGame
}: GameControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Bet Controls */}
      <div className="bg-[#1A1B1E] rounded-xl p-4 flex items-center gap-3">
        <button onClick={onDecreaseBet} className="text-white hover:text-[#FF4500]">-</button>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-lg">
          <span className="text-[#FF4500] font-bold">{betAmount}</span>
          <span className="text-white">SOL</span>
        </div>
        <button onClick={onIncreaseBet} className="text-white hover:text-[#FF4500]">+</button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={onDraw}
          className="bg-[#FF4500] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#FF4500]/90 transition-colors"
        >
          DRAW
        </button>
        <button 
          onClick={onNewGame}
          className="bg-[#1A1B1E] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1A1B1E]/90 transition-colors"
        >
          New Game
        </button>
      </div>

      {/* Deck Selection */}
      <div className="flex gap-2">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className={`px-4 py-2 rounded-lg text-sm font-medium
              ${num === 1 ? 'bg-[#FF4500] text-white' : 'bg-[#1A1B1E] text-gray-400'}`}
          >
            {num} Deck{num > 1 ? 's' : ''}
          </button>
        ))}
      </div>
    </div>
  );
} 