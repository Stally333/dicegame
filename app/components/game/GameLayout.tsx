'use client';
import { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import Scoreboard from './Scoreboard';
import { FaTrophy, FaHistory } from 'react-icons/fa';
import { BiCoin } from 'react-icons/bi';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';

export default function GameLayout() {
  const [player1DiceCount, setPlayer1DiceCount] = useState(1);
  const [player2DiceCount, setPlayer2DiceCount] = useState(1);
  const [player1DiceValues, setPlayer1DiceValues] = useState([3]);
  const [player2DiceValues, setPlayer2DiceValues] = useState([3]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Connect to WebSocket on component mount
  useEffect(() => {
    // For development, connect to local server
    const newSocket = io('http://localhost:3001');
    
    newSocket.on('connect', () => {
      console.log('Connected to game server');
      setSocket(newSocket);
    });

    newSocket.on('game_state', (gameState: any) => {
      console.log('Received game state:', gameState);
      if (gameState.player1?.diceValues) {
        setPlayer1DiceValues(gameState.player1.diceValues);
      }
      if (gameState.player2?.diceValues) {
        setPlayer2DiceValues(gameState.player2.diceValues);
      }
    });

    return () => {
      if (newSocket) newSocket.close();
    };
  }, []);

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
            socket={socket}
          />
        </div>

        {/* Scoreboard and Game Modes Container */}
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {/* Game Mode Buttons - Aligned with top */}
          <div className="flex gap-1.5 justify-center mb-4">
            <button className="w-28 h-7 flex items-center justify-center text-xs font-bold text-white rounded-md bg-gradient-to-r from-[#fe8c00] to-[#f83600] hover:opacity-90 transition-all duration-300 shadow-sm">
              <BiCoin className="text-sm mr-1" />
              STAKING
            </button>
            <button className="w-28 h-7 flex items-center justify-center text-xs font-bold text-white rounded-md bg-gradient-to-r from-[#fe8c00] to-[#f83600] hover:opacity-90 transition-all duration-300 shadow-sm">
              <FaTrophy className="text-sm mr-1" />
              STATS
            </button>
            <button className="w-28 h-7 flex items-center justify-center text-xs font-bold text-white rounded-md bg-gradient-to-r from-[#fe8c00] to-[#f83600] hover:opacity-90 transition-all duration-300 shadow-sm">
              <FaHistory className="text-sm mr-1" />
              HISTORY
            </button>
          </div>

          {/* Scoreboard */}
          <div className="h-[calc(100vh-9.75rem)]">
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
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
} 