import { Poppins } from "next/font/google";
import localFont from 'next/font/local';
import type { Metadata } from "next";
import "./globals.css";
import Header from './components/Header';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dsDigital = localFont({ 
  src: '../public/fonts/DS-Digital.ttf',
  variable: '--font-ds-digital'
});

export const metadata: Metadata = {
  title: "SOLdice",
  description: "A decentralized dice game on Solana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.className} ${dsDigital.variable}`}>
      <head />
      <body className="antialiased min-h-screen bg-[#0A0B0D] relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1B1E] via-black to-[#1A1B1E] opacity-90" />
        <div className="relative">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
} 