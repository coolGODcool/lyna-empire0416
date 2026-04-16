import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { MOCK_SHOPS } from '../data/mockData';
import { Shop } from '../types';
import { Heart, MessageSquare, Share2, Bookmark, Calendar, ChevronRight, Star, MapPin, Users } from 'lucide-react';
import { AIChat } from './AIChat';
import { BookingForm } from './BookingForm';
import { ShopDetails } from './ShopDetails';

export function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
    >
      {MOCK_SHOPS.map((shop, index) => (
        <div key={shop.id} className="h-full w-full snap-start relative">
          <ShopCard shop={shop} isActive={currentIndex === index} />
        </div>
      ))}
    </div>
  );
}

interface ShopCardProps {
  shop: Shop;
  isActive: boolean;
}

function ShopCard({ shop, isActive }: ShopCardProps) {
  const [view, setView] = useState<'video' | 'details'>('video');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Swipe logic for horizontal
  const x = useSpring(0, { bounce: 0 });
  const [dragStart, setDragStart] = useState(0);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100 && view === 'video') {
      setView('details');
    } else if (info.offset.x > 100 && view === 'details') {
      setView('video');
    }
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-zinc-900">
      <motion.div
        className="flex h-full w-[200%] absolute top-0 left-0"
        animate={{ x: view === 'video' ? '0%' : '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
      >
        {/* Page 1: Video Interface - Slightly narrowed to show detail gap */}
        <div className={`h-full relative overflow-hidden transition-all duration-500 ${view === 'video' ? 'w-[48%] mr-[2%]' : 'w-1/2'}`}>
          {/* Video Background */}
          <video
            src={shop.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

          {/* Side Preview Gaps Indicator (Visual hint) */}
          {view === 'video' && (
            <div className="absolute top-1/2 right-1 transform -translate-y-1/2 w-1.5 h-32 rounded-full bg-gold-400/30 blur-sm pointer-events-none" />
          )}

          {/* UI Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 pb-12">
            <div className="flex justify-between items-end">
              {/* Left Info */}
              <div className="flex-1 pr-12">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-zinc-800 text-gold-100 text-[10px] px-2 py-0.5 rounded border border-gold-600/30 backdrop-blur-sm uppercase font-bold tracking-widest">
                    {shop.tags[0]}
                  </span>
                  <div className="flex items-center text-gold-500 text-xs font-medium">
                    <Star size={12} fill="currentColor" className="mr-0.5" />
                    {shop.rating}
                  </div>
                </div>
                <h2 className="text-3xl font-serif font-bold text-gold-500 mb-1 tracking-tight drop-shadow-lg">
                  {shop.name}
                </h2>
                <p className="text-[#E5E5E5] text-sm mb-4 line-clamp-2 drop-shadow-md leading-relaxed opacity-90">
                  {shop.tagline}
                </p>

                <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-6">
                  {shop.tags.map(tag => (
                    <span key={tag} className="text-[#888888] text-[10px] whitespace-nowrap bg-white/5 px-2 py-1 rounded border border-white/10 backdrop-blur-md">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* CTA Area */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setView('details')}
                    className="flex-1 bg-zinc-900/60 backdrop-blur-lg border border-gold-500/20 text-[#E5E5E5] py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 active:scale-95 transition-transform"
                  >
                    <span>查看菜單</span>
                    <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-black py-3 rounded-xl text-sm font-bold active:scale-95 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.2)] uppercase tracking-wider"
                  >
                    立即預約
                  </button>
                </div>
              </div>

              {/* Right Side Buttons */}
              <div className="flex flex-col space-y-6 items-center">
                <InteractionButton icon={<Heart size={26} />} label="喜歡" />
                <InteractionButton icon={<Bookmark size={26} />} label="收藏" />
                <InteractionButton icon={<Share2 size={26} />} label="分享" />
                <InteractionButton
                  icon={<div className="font-bold text-lg">AI</div>}
                  label="店長"
                  isAI
                  onClick={() => setIsAIChatOpen(true)}
                />
                <div className="mt-4 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-gold-500 p-0.5 overflow-hidden active:rotate-12 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                    <img src={shop.thumbnailUrl} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2: Experience Detail Card */}
        <div className="w-1/2 h-full bg-zinc-950 overflow-y-auto no-scrollbar">
          <ShopDetails
            shop={shop}
            onBack={() => setView('video')}
            onBook={() => setIsBookingOpen(true)}
            onChat={() => setIsAIChatOpen(true)}
          />
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {isAIChatOpen && (
          <AIChat shop={shop} onClose={() => setIsAIChatOpen(false)} onBook={() => { setIsAIChatOpen(false); setIsBookingOpen(true); }} />
        )}
        {isBookingOpen && (
          <BookingForm shop={shop} onClose={() => setIsBookingOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function InteractionButton({ icon, label, isAI, onClick }: { icon: React.ReactNode, label: string, isAI?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center group active:scale-90 transition-transform">
      <div className={`p-2 transition-all rounded-full mb-1 h-12 w-12 flex items-center justify-center border backdrop-blur-sm ${
        isAI 
          ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.6)]' 
          : 'bg-black/50 text-gold-500 border-gold-500/40 group-hover:bg-black/80'
      }`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-gold-100 drop-shadow-md">{label}</span>
    </button>
  );
}
