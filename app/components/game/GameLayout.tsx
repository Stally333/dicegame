'use client';
import Scoreboard from './Scoreboard';
import PlayerCard from './PlayerCard';
import GameModeSelect from './GameModeSelect';

export default function GameLayout() {
  const handleSelectMode = (mode: 'sol' | 'token' | 'house') => {
    // Will handle mode selection logic later
    console.log('Selected mode:', mode);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center">
      <div className="w-[95%] grid grid-cols-[1.2fr_1.6fr_1.2fr] gap-6">
        <div className="h-[680px]">
          <PlayerCard 
            playerNumber={1}
            plays={14}
            streak={2}
            cards={32}
            walletAddress="8xzt...3kj9"
            balance={4.24}
            betAmount={0}
            winRate={57}
            totalWinnings={12.4}
            isActive={true}
            diceValue={3}
          />
        </div>
        
        <div className="h-[680px]">
          <Scoreboard 
            player1Score={0}
            player2Score={0}
            currentRound={1}
            totalRounds={5}
            betHistory={[]}
            totalPot={0}
            highestRoll={0}
            totalRolls={0}
            bettingPhase={true}
            timeLeft={30}
            currentBets={{ player1: 0, player2: 0 }}
          />
        </div>
        
        <div className="h-[680px]">
          <PlayerCard 
            playerNumber={2}
            plays={14}
            streak={1}
            cards={27}
            walletAddress="2yfm...9p4r"
            balance={3.18}
            betAmount={0}
            winRate={43}
            totalWinnings={8.2}
            isActive={false}
            diceValue={3}
          />
        </div>
      </div>

      <div className="w-[95%]">
        <GameModeSelect onSelectMode={handleSelectMode} />
      </div>
    </div>
  );
} 