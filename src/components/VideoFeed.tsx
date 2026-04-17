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
  const lastSwitchAtRef = useRef(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSwitchAtRef.current < 450) return;

    const target = e.currentTarget;
    const sectionHeight = target.clientHeight;
    const scrollTop = target.scrollTop;
    const deltaFromCurrent = scrollTop - currentIndex * sectionHeight;
    const triggerDistance = sectionHeight * 0.42;
    let index = currentIndex;

    if (deltaFromCurrent > triggerDistance && currentIndex < MOCK_SHOPS.length - 1) {
      index = currentIndex + 1;
    } else if (deltaFromCurrent < -triggerDistance && currentIndex > 0) {
      index = currentIndex - 1;
    }

    if (index !== currentIndex) {
      setCurrentIndex(index);
      lastSwitchAtRef.current = now;
      target.scrollTo({ top: index * sectionHeight, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
    >
      {MOCK_SHOPS.map((shop, index) => (
        <div key={shop.id} className="h-full w-full snap-start snap-always relative">
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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
  const industryLabel = shop.tags[0] ?? '服務業';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (isActive && !isPaused && view === 'video') {
      void video.play().catch(() => {
        // Ignore autoplay blocks; user interaction can start playback.
      });
    } else {
      video.pause();
    }
  }, [isActive, isPaused, isMuted, view]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const endY = e.changedTouches[0]?.clientY ?? touchStartY.current;
    const diffX = endX - touchStartX.current;
    const diffY = endY - touchStartY.current;

    // Horizontal swipe switches between short video and menu page.
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) setView('details');
      if (diffX > 0) setView('video');
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="h-full w-full relative overflow-hidden bg-zinc-950 md:rounded-[28px]"
      onClick={handleInteraction}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="flex h-full w-[200%] absolute top-0 left-0"
        animate={{ x: view === 'video' ? '0%' : '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
      >
        <div className={`h-full relative overflow-hidden transition-all duration-500 ${view === 'video' ? 'w-[50%]' : 'w-1/2'}`}>
          <motion.video
            ref={videoRef}
            src={shop.videoUrl}
            loop
            playsInline
            muted={isMuted}
            poster={shop.thumbnailUrl}
            animate={{ opacity: sectionOpacity('middle') }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover bg-black"
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
                    className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-gold-200 active:scale-95 transition-transform drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]"
                  >
                    <Menu size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleInteraction(); }}
                    className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-gold-200 active:scale-95 transition-transform drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]"
                  >
                    <Search size={20} />
                  </button>
                  <div className="h-8 w-8 rounded-full bg-transparent flex items-center justify-center text-gold-200 drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]">
                    <Crown size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black tracking-wide text-gold-200 drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">凱文</p>
                    <p className="text-[9px] text-white/85 truncate drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]">LV.18 領主學徒</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsPaused(!isPaused); handleInteraction(); }}
                    className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-gold-200 drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]"
                  >
                    {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onToggleMute(); handleInteraction(); }} className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-gold-200 drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]">
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
                className="absolute top-16 left-4 z-50 w-[250px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur-sm p-4 text-white shadow-2xl"
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
                  className="pointer-events-auto max-w-[360px] rounded-2xl bg-transparent p-0"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsInfoExpanded(!isInfoExpanded); }}
                    className="w-full text-left"
                  >
                    <div className="flex items-center gap-3">
                      <img src={shop.thumbnailUrl} className="w-12 h-12 rounded-xl object-cover border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.45)]" referrerPolicy="no-referrer" />
                      <div className="flex flex-wrap gap-1.5 text-left">
                        <InfoChip icon={<Star size={10} className="text-gold-500" />} text={`評價 ${shop.rating}`} compact />
                        <InfoChip icon={<MapPin size={10} className="text-gold-500" />} text={`距離 ${shop.distance}`} compact />
                        <InfoChip icon={<ArrowUpRight size={10} className="text-gold-500" />} text={`${industryLabel} / 服務業`} compact />
                      </div>
                    </div>
                  </button>
                  {isInfoExpanded && (
                    <div className="mt-3 rounded-xl bg-black/20 border border-white/10 backdrop-blur-[2px] p-3 text-left space-y-2">
                      <p className="text-[11px] text-white/80 leading-relaxed">{shop.description}</p>
                      <p className="text-[11px] text-gold-300/95">暢銷商品：{topSeller?.name ?? '待補資料'}</p>
                      <p className="text-[11px] text-gold-300/95">本支影片商品：{currentVideoItem?.name ?? '待補資料'}</p>
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
    <div className={`flex items-center bg-transparent rounded-full border-0 space-x-1.5 drop-shadow-[0_3px_8px_rgba(0,0,0,0.75)] ${compact ? 'px-0 py-0' : 'px-1 py-0.5'}`}>
      {icon}
      <span className={`${compact ? 'text-[10px]' : 'text-[11px]'} font-black text-white tracking-tight`}>{text}</span>
    </div>
  );
}

function InteractionButton({ icon, label, isAI, onClick }: { icon: React.ReactNode, label: string, isAI?: boolean, onClick?: (e: React.MouseEvent) => void }) {
  return (
    <button 
      onClick={onClick} 
      className="flex flex-col items-center group active:scale-90 transition-transform"
    >
      <div className={`p-2 transition-all rounded-full mb-1 h-12 w-12 sm:h-[52px] sm:w-[52px] flex items-center justify-center ${
        isAI 
          ? 'bg-gold-500/70 text-black shadow-[0_4px_15px_rgba(212,175,55,0.45)]' 
          : 'bg-transparent text-white/95 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]'
      }`}>
        {icon}
      </div>
      <span className="text-[9px] font-black text-white/90 drop-shadow-lg uppercase tracking-widest">{label}</span>
    </button>
  );
}
