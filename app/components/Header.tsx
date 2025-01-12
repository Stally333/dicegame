'use client';

export default function Header() {
  return (
    <header className="w-full bg-[#1A1B1E]/95 backdrop-blur-sm border-b border-gray-800/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <span className="text-[#FFD700]">SOL</span>dice
        </div>
        <nav className="flex gap-8">
          <a href="/play" className="text-gray-400 hover:text-[#FFD700] transition-colors">
            Play
          </a>
          <a href="/leaderboard" className="text-gray-400 hover:text-[#FFD700] transition-colors">
            Leaderboard
          </a>
          <a href="/about" className="text-gray-400 hover:text-[#FFD700] transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
} 