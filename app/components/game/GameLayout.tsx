import PlayerCard from './PlayerCard';
import Scoreboard from './Scoreboard';

export default function GameLayout() {
  return (
    <div className="container mx-auto h-[calc(100vh-64px)] px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <PlayerCard 
          playerNumber={1}
          score={0}
          plays={14}
          streak={0}
          cards={25}
          walletAddress="8xzt...3kj9"
          balance={5.24}
          betAmount={1.5}
          winRate={57}
          totalWinnings={12.5}
          diceValue={6}
        />
        
        <Scoreboard 
          player1Score={0}
          player2Score={0}
          currentRound={1}
          totalRounds={5}
          betHistory={[]}
          totalPot={0}
          highestRoll={0}
          totalRolls={0}
          player1WinRate={57}
          player2WinRate={43}
          player1AvgBet={1.2}
          player2AvgBet={1.5}
        />
        
        <PlayerCard 
          playerNumber={2}
          score={0}
          plays={14}
          streak={1}
          cards={27}
          walletAddress="2yfm...9p4r"
          balance={3.18}
          betAmount={1.5}
          winRate={43}
          totalWinnings={8.2}
          diceValue={4}
        />
      </div>
    </div>
  );
} 