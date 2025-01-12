'use client';

import PlayerCard from './PlayerCard';
import Scoreboard from './Scoreboard';
import { useState, useEffect } from 'react';

export default function GameLayout() {
  const [gameState, setGameState] = useState({
    phase: 'betting', // 'betting' | 'rolling' | 'results'
    timeLeft: 30,
    bets: { player1: 0, player2: 0 },
    rolls: { player1: null, player2: null },
    totalPot: 0,
    history: []
  });

  // Add timer effect, betting logic, and roll handling
  useEffect(() => {
    if (gameState.phase === 'betting' && gameState.timeLeft > 0) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState.phase, gameState.timeLeft]);

  // Handle bet placement
  const handlePlaceBet = (player: 1 | 2, amount: number) => {
    setGameState(prev => ({
      ...prev,
      bets: {
        ...prev.bets,
        [`player${player}`]: amount
      },
      totalPot: prev.bets[`player${player === 1 ? 2 : 1}`] + amount
    }));
  };

  return (
    <div className="container mx-auto px-6 h-[calc(100vh-64px)] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[1400px] mx-auto">
        <div className="h-[640px]">
          <PlayerCard 
            playerNumber={1}
            score={0}
            plays={14}
            streak={0}
            cards={25}
            walletAddress="8xzt...3kj9"
            balance={5.24}
            betAmount={gameState.bets.player1}
            winRate={57}
            totalWinnings={12.5}
            diceValue={gameState.rolls.player1}
            isActive={gameState.phase === 'betting'}
            hasRolled={gameState.phase === 'results'}
            onBetChange={(amount) => handlePlaceBet(1, amount)}
          />
        </div>
        
        <div className="h-[640px]">
          <Scoreboard 
            player1Score={0}
            player2Score={0}
            currentRound={1}
            totalRounds={5}
            betHistory={gameState.history}
            totalPot={gameState.totalPot}
            highestRoll={0}
            totalRolls={0}
            bettingPhase={gameState.phase === 'betting'}
            timeLeft={gameState.timeLeft}
            currentBets={gameState.bets}
          />
        </div>
        
        <div className="h-[640px]">
          <PlayerCard 
            playerNumber={2}
            score={0}
            plays={14}
            streak={1}
            cards={27}
            walletAddress="2yfm...9p4r"
            balance={3.18}
            betAmount={gameState.bets.player2}
            winRate={43}
            totalWinnings={8.2}
            diceValue={gameState.rolls.player2}
            isActive={gameState.phase === 'betting'}
            hasRolled={gameState.phase === 'results'}
            onBetChange={(amount) => handlePlaceBet(2, amount)}
          />
        </div>
      </div>
    </div>
  );
} 