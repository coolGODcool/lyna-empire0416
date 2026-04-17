import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_SHOPS } from '../data/mockData';
import { Shop } from '../types';
import { Heart, MessageSquare, Share2, Star, MapPin, Volume2, VolumeX, ArrowUpRight, Crown, Menu, Search, Pause, Play } from 'lucide-react';
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
  type FadeSection = 'top' | 'middle' | 'bottom';
  const [view, setView] = useState<'video' | 'details'>('video');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeSections, setFadeSections] = useState<Record<FadeSection, boolean>>({
    top: false,
    middle: false,
    bottom: false,
  });
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const fadeOutTimer = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleInactivity = () => {
      if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
      setShowControls(true);
      
      fadeOutTimer.current = setTimeout(() => {
        if (view === 'video') setShowControls(false);
      }, 3000);
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
    }, 3000);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen]);

  const sectionOpacity = (section: FadeSection) => {
    if (!fadeSections[section]) return 1;
    return showControls ? 1 : 0.12;
  };

  const topSeller = shop.services[0];
  const currentVideoItem = shop.services[1] ?? shop.services[0];

  return (
    <div className="h-full w-full relative overflow-hidden bg-zinc-950 md:rounded-[28px]" onClick={handleInteraction}>
      <motion.div
        className="flex h-full w-[200%] absolute top-0 left-0"
        animate={{ x: view === 'video' ? '0%' : '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
      >
        <div className={`h-full relative overflow-hidden transition-all duration-500 ${view === 'video' ? 'w-[50%]' : 'w-1/2'}`}>
          <motion.div
            animate={{ opacity: sectionOpacity('middle') }}
            transition={{ duration: 0.6 }}
            className="w-full h-full bg-black"
            onClick={(e) => {
              e.stopPropagation();
              handleInteraction();
            }}
          />

          <motion.div
            animate={{ opacity: sectionOpacity('top') }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-0 w-full px-4 py-3 sm:px-5 sm:py-4 z-40 flex items-center justify-between"
          >
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    ref={menuButtonRef}
                    onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); handleInteraction(); }}
                    className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-gold-500 border border-gold-500/20 active:scale-95 transition-transform"
                  >
                    <Menu size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleInteraction(); }}
                    className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-gold-500 border border-gold-500/20 active:scale-95 transition-transform"
                  >
                    <Search size={20} />
                  </button>
                  <div className="h-8 w-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
                    <Crown size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black tracking-wide text-gold-400">凱文</p>
                    <p className="text-[9px] text-white/70 truncate">LV.18 領主學徒</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsPaused(!isPaused); handleInteraction(); }}
                    className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-gold-500 border border-gold-500/20"
                  >
                    {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onToggleMute(); handleInteraction(); }} className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-gold-500 border border-gold-500/20">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
          </motion.div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-16 left-4 z-50 w-[250px] rounded-2xl border border-gold-500/30 bg-black/85 backdrop-blur-xl p-4 text-white shadow-2xl"
              >
                <h4 className="text-xs font-black text-gold-400 uppercase tracking-wider mb-3">首頁控制</h4>
                <p className="text-[11px] text-white/75 mb-2">3 秒後淡出區塊</p>
                <div className="space-y-2">
                  {(['top', 'middle', 'bottom'] as FadeSection[]).map((option) => (
                    <label
                      key={option}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-sm transition cursor-pointer ${
                        fadeSections[option]
                          ? 'bg-gold-500/20 border-gold-400/60 text-gold-300'
                          : 'bg-white/5 border-white/10 text-white/80'
                      }`}
                    >
                      {option === 'top' ? '上方' : option === 'middle' ? '中間' : '下方'}
                      <input
                        type="checkbox"
                        checked={fadeSections[option]}
                        onChange={(e) =>
                          setFadeSections((prev) => ({
                            ...prev,
                            [option]: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 accent-amber-400"
                      />
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 pb-24 z-10 pointer-events-none">
            <motion.div
              animate={{ opacity: sectionOpacity('middle') }}
              transition={{ duration: 0.6 }}
              className="flex justify-between items-end pointer-events-auto"
            >
              <div className="flex-1 pr-4 sm:pr-8">
                <motion.div
                  animate={{ opacity: sectionOpacity('bottom') }}
                  transition={{ duration: 0.6 }}
                  className="pointer-events-auto max-w-[320px] rounded-2xl border border-white/15 bg-black/55 backdrop-blur-md p-3"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsInfoExpanded(!isInfoExpanded); }}
                    className="w-full"
                  >
                    <div className="flex items-center gap-3">
                      <img src={shop.thumbnailUrl} className="w-12 h-12 rounded-xl object-cover border border-white/20" referrerPolicy="no-referrer" />
                      <div className="flex flex-wrap gap-1.5 text-left">
                        <InfoChip icon={<Star size={10} className="text-gold-500" />} text={`評價 ${shop.rating}`} compact />
                        <InfoChip icon={<MapPin size={10} className="text-gold-500" />} text={`距離 ${shop.distance}`} compact />
                        <InfoChip icon={<ArrowUpRight size={10} className="text-gold-500" />} text="食衣住行育樂" compact />
                      </div>
                    </div>
                  </button>
                  {isInfoExpanded && (
                    <div className="mt-3 border-t border-white/10 pt-3 text-left space-y-2">
                      <p className="text-[11px] text-white/75 leading-relaxed">{shop.description}</p>
                      <p className="text-[11px] text-gold-300">暢銷商品：{topSeller?.name ?? '待補資料'}</p>
                      <p className="text-[11px] text-gold-300">本支影片商品：{currentVideoItem?.name ?? '待補資料'}</p>
                    </div>
                  )}
                </motion.div>
              </div>

              <div className="flex flex-col space-y-4 items-center">
                <InteractionButton icon={<Heart size={24} />} label="995" />
                <InteractionButton icon={<MessageSquare size={24} />} label="留言" onClick={(e) => { e.stopPropagation(); setIsCommentOpen(true); }} />
                <InteractionButton icon={<Share2 size={24} />} label="分享" />
                <InteractionButton 
                  icon={<div className="font-black text-xl italic tracking-tighter">AI</div>} 
                  label="顧問" 
                  isAI 
                  onClick={(e) => { e.stopPropagation(); setIsAIChatOpen(true); }} 
                />
                
                <div onClick={() => setView('details')} className="mt-1 w-11 h-11 rounded-2xl border border-gold-500/50 p-0.5 bg-black/20 shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer">
                   <img src={shop.thumbnailUrl} className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>

          </div>
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

function InfoChip({ icon, text, compact }: { icon: React.ReactNode; text: string; compact?: boolean }) {
  return (
    <div className={`flex items-center bg-black/60 backdrop-blur-md rounded-full border border-gold-500/30 space-x-1.5 ${compact ? 'px-2 py-1' : 'px-3 py-1'}`}>
      {icon}
      <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} font-black text-gold-100 tracking-tighter`}>{text}</span>
    </div>
  );
}

function InteractionButton({ icon, label, isAI, onClick }: { icon: React.ReactNode, label: string, isAI?: boolean, onClick?: (e: React.MouseEvent) => void }) {
  return (
    <button 
      onClick={onClick} 
      className="flex flex-col items-center group active:scale-90 transition-transform"
    >
      <div className={`p-2 transition-all rounded-full mb-1 h-12 w-12 sm:h-[52px] sm:w-[52px] flex items-center justify-center backdrop-blur-md border ${
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
