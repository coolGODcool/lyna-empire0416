/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VideoFeed } from './components/VideoFeed';
import { UserDashboard } from './components/UserDashboard';
import { GameCenter } from './components/GameCenter';
import { MerchantDashboard } from './components/MerchantDashboard';
import { Home, Coins, Gamepad2, Store } from 'lucide-react';
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
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
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
      <nav className="h-20 bg-black/95 backdrop-blur-2xl border-t border-gold-600/20 flex items-center justify-around px-4 pb-safe z-50 rounded-t-[30px] shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <NavButton
          active={activeTab === 'explore'}
          onClick={() => setActiveTab('explore')}
          icon={<Home size={22} />}
          label="探索"
        />
        <NavButton
          active={activeTab === 'points'}
          onClick={() => setActiveTab('points')}
          icon={<Coins size={22} />}
          label="點數"
        />
        <NavButton
          active={activeTab === 'games'}
          onClick={() => setActiveTab('games')}
          icon={<Gamepad2 size={22} />}
          label="遊戲廳"
        />
        <NavButton
          active={activeTab === 'merchant'}
          onClick={() => setActiveTab('merchant')}
          icon={<Store size={22} />}
          label="面板"
        />
      </nav>
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
      className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 relative ${
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
