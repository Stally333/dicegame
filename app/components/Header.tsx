'use client';

export default function Header() {
  return (
    <header className="w-full bg-[#1A1B1E]/80 backdrop-blur-xl border-b border-[#fe8c00]/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-white tracking-tight">
            <span className="bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent">SOL</span>
            <span className="text-white/90">dice</span>
          </div>

          {/* Game Mode Buttons */}
          <div className="flex gap-1.5">
            <button className="px-4 py-1.5 rounded-lg font-black text-xs text-black bg-white hover:bg-gray-100 transition-all duration-300 shadow-sm uppercase tracking-wide">
              STAKING/COMMUNITY POOL
            </button>
            <button className="px-4 py-1.5 rounded-lg font-black text-xs text-black bg-white hover:bg-gray-100 transition-all duration-300 shadow-sm uppercase tracking-wide">
              LEADERBOARD
            </button>
            <button className="px-4 py-1.5 rounded-lg font-black text-xs text-black bg-white hover:bg-gray-100 transition-all duration-300 shadow-sm uppercase tracking-wide">
              TRANSACTION HISTORY
            </button>
          </div>

          {/* Connect Wallet Button */}
          <button className="px-6 py-2 bg-gradient-to-r from-[#fe8c00] to-[#f83600] text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all duration-300 shadow-sm">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
} 