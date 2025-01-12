import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Header from './components/Header';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en">
      <head />
      <body className={`${poppins.className} antialiased min-h-screen bg-gradient-to-b from-[#141414] to-[#1f1f1f]`}>
        <Header />
        {children}
      </body>
    </html>
  );
} 