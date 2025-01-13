'use client';
import { useState } from 'react';
import PlayerCard from './PlayerCard';
import Scoreboard from './Scoreboard';

export default function GameLayout() {
  const [player1DiceCount, setPlayer1DiceCount] = useState(1);
  const [player2DiceCount, setPlayer2DiceCount] = useState(1);
  const [player1DiceValues, setPlayer1DiceValues] = useState([3]);
  const [player2DiceValues, setPlayer2DiceValues] = useState([3]);

  // Handle dice count changes for Player 1
  const handlePlayer1DiceCountChange = (count: number) => {
    setPlayer1DiceCount(count);
    // Update dice values array to match new count
    setPlayer1DiceValues(prev => {
      if (prev.length === count) return prev;
      if (prev.length < count) {
        return [...prev, ...Array(count - prev.length).fill(0).map(() => Math.floor(Math.random() * 6) + 1)];
      }
      return prev.slice(0, count);
    });
  };

  // Handle dice count changes for Player 2
  const handlePlayer2DiceCountChange = (count: number) => {
    setPlayer2DiceCount(count);
    // Update dice values array to match new count
    setPlayer2DiceValues(prev => {
      if (prev.length === count) return prev;
      if (prev.length < count) {
        return [...prev, ...Array(count - prev.length).fill(0).map(() => Math.floor(Math.random() * 6) + 1)];
      }
      return prev.slice(0, count);
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col justify-center px-4">
      {/* Main Game Area */}
      <div className="grid grid-cols-[1fr,auto,1fr] gap-4 w-full max-w-7xl mx-auto">
        {/* Player 1 */}
        <div className="h-[calc(100vh-8rem)] flex flex-col">
          <PlayerCard
            playerNumber={1}
            walletAddress="8xzt...3kj9"
            balance={4.24}
            isActive={true}
            hasRolled={false}
            diceValue={0}
            diceCount={player1DiceCount}
            diceValues={player1DiceValues}
            onDiceCountChange={handlePlayer1DiceCountChange}
            use3D={true}
          />
        </div>

        {/* Scoreboard and Game Modes Container */}
        <div className="flex flex-col justify-center gap-4 h-[calc(100vh-8rem)]">
          <div className="flex flex-col gap-4">
            <Scoreboard
              player1="8xzt...3kj9"
              player2="2yfm...9p4r"
              round={1}
              totalRounds={5}
              player1Bet={0}
              player2Bet={0}
              highestRoll={0}
              totalRolls={0}
            />

            {/* Game Mode Buttons */}
            <div className="flex flex-col gap-2">
              <button className="retro-button py-2 text-sm font-bold text-black rounded-lg">
                SOL BATTLE
              </button>
              <button className="retro-button py-2 text-sm font-bold text-black rounded-lg">
                TOKEN ARENA
              </button>
              <button className="retro-button py-2 text-sm font-bold text-black rounded-lg">
                HOUSE RUSH
              </button>
            </div>
          </div>
        </div>

        {/* Player 2 */}
        <div className="h-[calc(100vh-8rem)] flex flex-col">
          <PlayerCard
            playerNumber={2}
            walletAddress="2yfm...9p4r"
            balance={3.18}
            isActive={false}
            hasRolled={false}
            diceValue={0}
            diceCount={player2DiceCount}
            diceValues={player2DiceValues}
            onDiceCountChange={handlePlayer2DiceCountChange}
            use3D={true}
          />
        </div>
      </div>
    </div>
  );
} 