'use client';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Play', href: '/play' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'About', href: '/about' }
  ];

  return (
    <nav className="flex items-center space-x-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-white hover:text-[#FFD700] transition-colors duration-200 text-lg"
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-blue-500 md:hidden">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white hover:text-[#FFD700] transition-colors duration-200 py-2"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 