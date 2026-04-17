/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VideoFeed } from './components/VideoFeed';
import { UserDashboard } from './components/UserDashboard';
import { GameCenter } from './components/GameCenter';
import { MerchantDashboard } from './components/MerchantDashboard';
import { Coins, Gamepad2, Store, Home, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'explore' | 'points' | 'games' | 'merchant';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('explore');

  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return <VideoFeed />;
      case 'points':
        return <UserDashboard />;
      case 'games':
        return <GameCenter />;
      case 'merchant':
        return <MerchantDashboard />;
      default:
        return <VideoFeed />;
    }
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <div className="relative h-full w-full max-w-[560px] mx-auto md:py-3">
      {/* Main Content Area */}
      <main className="h-full relative overflow-hidden md:rounded-[28px] md:border md:border-white/10 md:shadow-[0_0_60px_rgba(0,0,0,0.6)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 h-[86px] bg-black/90 backdrop-blur-2xl border-t border-gold-600/20 flex items-center justify-between px-5 sm:px-6 pb-safe z-50 rounded-t-[24px] md:rounded-[20px] md:bottom-3 md:left-3 md:right-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <NavButton
          active={activeTab === 'explore'}
          onClick={() => setActiveTab('explore')}
          icon={<Home size={22} />}
          label="首頁"
        />
        <NavButton
          active={activeTab === 'points'}
          onClick={() => setActiveTab('points')}
          icon={<Coins size={22} />}
          label="點數"
        />
        <CenterActionButton
          active={activeTab === 'explore'}
          onClick={() => setActiveTab('explore')}
        />
        <NavButton
          active={activeTab === 'games'}
          onClick={() => setActiveTab('games')}
          icon={<Gamepad2 size={22} />}
          label="遊戲"
        />
        <NavButton
          active={activeTab === 'merchant'}
          onClick={() => setActiveTab('merchant')}
          icon={<Store size={22} />}
          label="領主"
        />
      </nav>
      </div>
    </div>
  );
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 relative min-w-12 ${
        active ? 'text-gold-500' : 'text-[#888888]'
      }`}
    >
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-black tracking-tighter uppercase">{label}</span>
      {active && (
        <motion.div
          layoutId="nav-glow"
          className="absolute -top-2 w-8 h-1 bg-gold-500 rounded-full blur-[2px] shadow-[0_0_10px_#D4AF37]"
        />
      )}
    </button>
  );
}

function CenterActionButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative -mt-9 active:scale-95 transition-transform">
      <div className="w-14 h-14 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 border border-gold-300/60 flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.65)]">
        <Plus size={22} className="text-black" />
      </div>
      {active && <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gold-500/90 blur-[1px]" />}
    </button>
  );
}
