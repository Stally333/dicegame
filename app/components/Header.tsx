'use client';

export default function Header() {
  return (
    <header className="w-full bg-[#1A1B1E]/80 backdrop-blur-xl border-b border-[#FFD700]/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <div className="text-3xl font-bold text-white tracking-tight">
          <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">SOL</span>
          <span className="text-white/90">dice</span>
        </div>
        <nav className="flex items-center gap-10">
          <a href="/play" className="text-gray-400 hover:text-[#FFD700] transition-all duration-300 text-sm font-medium">
            Play
          </a>
          <a href="/leaderboard" className="text-gray-400 hover:text-[#FFD700] transition-all duration-300 text-sm font-medium">
            Leaderboard
          </a>
          <a href="/about" className="text-gray-400 hover:text-[#FFD700] transition-all duration-300 text-sm font-medium">
            About
          </a>
          <button className="px-6 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all duration-300">
            Connect Wallet
          </button>
        </nav>
      </div>
    </header>
  );
} 