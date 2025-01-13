'use client';

interface GameModeProps {
  onSelectMode: (mode: 'sol' | 'token' | 'house') => void;
}

export default function GameModeSelect({ onSelectMode }: GameModeProps) {
  return (
    <div className="w-full max-w-xl mx-auto py-6">
      <div className="flex justify-center gap-3">
        <button
          onClick={() => onSelectMode('sol')}
          className="retro-button px-6 py-2.5 text-black rounded-lg 
            hover:brightness-110 active:brightness-90
            transition-all duration-200 text-center min-w-[130px]
            font-bold tracking-wide text-sm uppercase"
        >
          SOL Battle
        </button>

        <button
          onClick={() => onSelectMode('token')}
          className="retro-button px-6 py-2.5 text-black rounded-lg 
            hover:brightness-110 active:brightness-90
            transition-all duration-200 text-center min-w-[130px]
            font-bold tracking-wide text-sm uppercase"
        >
          Token Arena
        </button>

        <button
          onClick={() => onSelectMode('house')}
          className="retro-button px-6 py-2.5 text-black rounded-lg 
            hover:brightness-110 active:brightness-90
            transition-all duration-200 text-center min-w-[130px]
            font-bold tracking-wide text-sm uppercase"
        >
          House Rush
        </button>
      </div>
    </div>
  );
} 