import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_SHOPS } from '../data/mockData';
import { Shop } from '../types';
import { Heart, MessageSquare, Share2, Bookmark, Menu, Search, Star, MapPin, ChevronRight, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { AIChat } from './AIChat';
import { BookingForm } from './BookingForm';
import { ShopDetails } from './ShopDetails';
import { CommentPanel } from './CommentPanel';

export function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const index = Math.round(target.scrollTop / target.clientHeight);
    if (index !== currentIndex && index < MOCK_SHOPS.length) {
      setCurrentIndex(index);
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
          <ShopCard 
            shop={shop} 
            isActive={currentIndex === index} 
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
          />
        </div>
      ))}
    </div>
  );
}

interface ShopCardProps {
  shop: Shop;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

function ShopCard({ shop, isActive, isMuted, onToggleMute }: ShopCardProps) {
  const [view, setView] = useState<'video' | 'details'>('video');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const fadeOutTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleInactivity = () => {
      if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
      setShowControls(true);
      
      fadeOutTimer.current = setTimeout(() => {
        if (view === 'video') setShowControls(false);
      }, 4000);
    };

    if (view === 'video' && isActive) {
      handleInactivity();
    } else {
      setShowControls(true);
    }

    return () => {
      if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
    };
  }, [view, isActive]);

  const handleInteraction = () => {
    setShowControls(true);
    if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
    fadeOutTimer.current = setTimeout(() => {
      if (view === 'video') setShowControls(false);
    }, 4000);
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-zinc-950" onClick={handleInteraction}>
      <motion.div
        className="flex h-full w-[200%] absolute top-0 left-0"
        animate={{ x: view === 'video' ? '0%' : '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
      >
        <div className={`h-full relative overflow-hidden transition-all duration-500 scale-x-105 -mx-[2.5%] ${view === 'video' ? 'w-[50%]' : 'w-1/2'}`}>
          <video
            src={shop.videoUrl}
            autoPlay={isActive}
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
            onClick={(e) => {
              e.stopPropagation();
              handleInteraction();
            }}
          />

          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 w-full p-6 pt-12 z-40 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-gold-500 border border-gold-500/20 active:scale-95 transition-transform">
                    <Menu size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-gold-500 border border-gold-500/20 active:scale-95 transition-transform">
                    <Search size={20} />
                  </button>
                </div>

                <div className="flex-1 px-8 text-center max-w-[220px]">
                   <div className="overflow-hidden whitespace-nowrap mask-linear-fade">
                     <div className="animate-marquee inline-block text-[10px] text-gold-500 font-black uppercase tracking-[0.2em] italic">
                       Imperial News: New Exclusive Merchant Added to the Arena! • L-COIN Point Multiplier Event Live!
                     </div>
                   </div>
                   <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mt-1" />
                </div>

                <div className="flex items-center space-x-3">
                  <button onClick={(e) => { e.stopPropagation(); onToggleMute(); handleInteraction(); }} className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-gold-500 border border-gold-500/20">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <div className="h-10 bg-black/40 backdrop-blur-md border border-gold-500/30 rounded-full px-4 flex items-center space-x-2">
                     <span className="text-[10px] font-black text-gold-500 italic uppercase">L.COIN</span>
                     <span className="text-sm font-black text-white">$24,500</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div 
             onClick={() => setView('details')}
             className="absolute top-1/2 right-0 w-8 h-48 bg-transparent flex items-center justify-center z-20 cursor-pointer"
          >
             <div className="w-1.5 h-32 rounded-full bg-gold-400/40 blur-[1px] opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>

          <motion.div
            animate={{ opacity: showControls ? 1 : 0.2 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col justify-end p-6 pb-24 z-10 pointer-events-none"
          >
            <div className="flex justify-between items-end pointer-events-auto">
              <div className="flex-1 pr-8">
                 <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/30 space-x-2">
                       <MapPin size={10} className="text-gold-500" />
                       <span className="text-[10px] font-black text-gold-100 uppercase tracking-tighter">距離 {shop.distance}</span>
                    </div>
                    <div className="flex items-center bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/30 space-x-2">
                       <ArrowUpRight size={10} className="text-gold-500" />
                       <span className="text-[10px] font-black text-gold-100 uppercase tracking-tighter">好評 {shop.reviewCount}</span>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-2 mb-4">
                    {shop.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black text-gold-500/80 uppercase tracking-widest bg-black/80 px-2 py-0.5 border border-gold-500/20 rounded italic">
                        #{tag}
                      </span>
                    ))}
                 </div>

                 <div className="flex items-center space-x-3 mb-2">
                    {shop.isOfficial && (
                      <div className="w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center text-black shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                        <Star size={12} fill="currentColor" />
                      </div>
                    )}
                    <h2 className="text-3xl font-serif font-black text-white italic tracking-tighter drop-shadow-lg">
                      {shop.name}
                    </h2>
                 </div>
                 <p className="text-[#E5E5E5]/90 text-xs font-medium mb-1 drop-shadow-md max-w-[280px] leading-relaxed">
                    {shop.tagline}
                 </p>
                 <p className="text-[#888888] text-[10px] font-bold drop-shadow-md uppercase italic">
                    帝國首席認證商家 • 感受黑金般的絲滑質感
                 </p>
              </div>

              <div className="flex flex-col space-y-6 items-center">
                <InteractionButton icon={<Heart size={28} />} label="995" />
                <InteractionButton icon={<Bookmark size={28} />} label="贊助" />
                <InteractionButton icon={<MessageSquare size={28} />} label="留言" onClick={(e) => { e.stopPropagation(); setIsCommentOpen(true); }} />
                <InteractionButton icon={<Share2 size={28} />} label="分享" />
                <InteractionButton 
                  icon={<div className="font-black text-xl italic tracking-tighter">AI</div>} 
                  label="顧問" 
                  isAI 
                  onClick={(e) => { e.stopPropagation(); setIsAIChatOpen(true); }} 
                />
                
                <div onClick={() => setView('details')} className="mt-4 w-12 h-12 rounded-2xl border border-gold-500/50 p-0.5 bg-black/20 shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer">
                   <img src={shop.thumbnailUrl} className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex space-x-3 pointer-events-auto">
               <button 
                 onClick={(e) => { e.stopPropagation(); setView('details'); }}
                 className="flex-1 bg-black/60 backdrop-blur-xl border border-white/10 text-white h-12 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl"
               >
                 查看菜單
               </button>
               <button 
                 onClick={(e) => { e.stopPropagation(); setIsBookingOpen(true); }}
                 className="flex-1 bg-gradient-to-r from-gold-600 to-gold-400 text-black h-12 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
               >
                 立即預約
               </button>
            </div>
          </motion.div>
        </div>

        <div className="w-1/2 h-full bg-zinc-950 overflow-y-auto no-scrollbar">
          <ShopDetails
            shop={shop}
            onBack={() => setView('video')}
            onBook={() => setIsBookingOpen(true)}
            onChat={() => setIsAIChatOpen(true)}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {isCommentOpen && (
          <CommentPanel 
             comments={shop.comments} 
             onClose={() => setIsCommentOpen(false)} 
             isOpen={isCommentOpen} 
          />
        )}
        {isAIChatOpen && (
          <AIChat 
            shop={shop} 
            onClose={() => setIsAIChatOpen(false)} 
            onBook={() => { setIsAIChatOpen(false); setIsBookingOpen(true); }} 
          />
        )}
        {isBookingOpen && (
          <BookingForm shop={shop} onClose={() => setIsBookingOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function InteractionButton({ icon, label, isAI, onClick }: { icon: React.ReactNode, label: string, isAI?: boolean, onClick?: (e: React.MouseEvent) => void }) {
  return (
    <button 
      onClick={onClick} 
      className="flex flex-col items-center group active:scale-90 transition-transform"
    >
      <div className={`p-2 transition-all rounded-full mb-1 h-12 w-12 flex items-center justify-center backdrop-blur-md border ${
        isAI 
          ? 'bg-gold-500 text-black border-gold-500 shadow-[0_4px_15px_rgba(212,175,55,0.7)]' 
          : 'bg-black/30 text-white/90 border-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
      }`}>
        {icon}
      </div>
      <span className="text-[9px] font-black text-white/90 drop-shadow-lg uppercase tracking-widest">{label}</span>
    </button>
  );
}
