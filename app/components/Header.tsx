'use client';

export default function Header() {
  return (
    <header className="w-full bg-[#1A1B1E]/80 backdrop-blur-xl border-b border-[#fe8c00]/10 shadow-2xl">
      <div className="max-w-7xl mx-auto py-3">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold text-white tracking-tight">
            <span className="bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent">SOL</span>
            <span className="text-white/90">dice</span>
          </div>

          <div className="flex items-center gap-4 p-0">
            <div className="flex gap-1.5">
              <button className="px-4 py-1.5 rounded-lg font-black text-xs text-white/90 hover:text-white transition-all duration-300 uppercase tracking-wide">
                SOL BATTLE
              </button>
              <button className="px-4 py-1.5 rounded-lg font-black text-xs text-white/90 hover:text-white transition-all duration-300 uppercase tracking-wide">
                TOKEN ARENA
              </button>
              <button className="px-4 py-1.5 rounded-lg font-black text-xs text-white/90 hover:text-white transition-all duration-300 uppercase tracking-wide">
                HOUSE RUSH
              </button>
            </div>

            <button className="px-6 py-2 border border-white text-white rounded-lg font-bold text-sm hover:bg-white/10 transition-all duration-300">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 