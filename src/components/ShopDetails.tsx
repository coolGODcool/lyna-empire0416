import React from 'react';
import { Shop } from '../types';
import { ArrowLeft, Star, MapPin, Clock, MessageSquare, Calendar, ChevronRight, Info, Share2, Heart, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface ShopDetailsProps {
  shop: Shop;
  onBack: () => void;
  onBook: () => void;
  onChat: () => void;
}

export function ShopDetails({ shop, onBack, onBook, onChat }: ShopDetailsProps) {
  return (
    <div className="flex flex-col min-h-full pb-20 bg-zinc-950">
      {/* Header Image */}
      <div className="relative h-72">
        <img src={shop.thumbnailUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-black/20 backdrop-brightness-75 pointer-events-none" />
        
        <button
          onClick={onBack}
          className="absolute top-12 left-6 w-11 h-11 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform shadow-2xl"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="absolute top-12 right-6 flex space-x-2">
           <button className="w-11 h-11 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform">
             <Share2 size={20} />
           </button>
           <button className="w-11 h-11 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform">
             <Heart size={20} />
           </button>
        </div>

        <div className="absolute bottom-8 left-6 right-6">
           <div className="flex items-center space-x-2 mb-2">
              <span className="bg-gold-500 text-black text-[9px] font-black px-2 py-0.5 rounded tracking-widest uppercase">精選推薦</span>
              <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center space-x-1">
                 <Star size={10} fill="#D4AF37" className="text-gold-500" />
                 <span className="text-[10px] font-black text-white">{shop.rating}</span>
              </div>
           </div>
           <h1 className="text-3xl font-serif font-black text-white italic uppercase tracking-tighter drop-shadow-2xl">
             {shop.name}
           </h1>
        </div>
      </div>

      {/* Info Bar */}
      <div className="px-6 py-6 border-b border-white/5 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
         <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center">
               <span className="text-[10px] text-[#555] font-black uppercase tracking-widest mb-1">距離</span>
               <span className="text-xs font-black text-gold-500 uppercase">{shop.distance}</span>
            </div>
            <div className="w-[1px] h-6 bg-white/5" />
            <div className="flex flex-col items-center">
               <span className="text-[10px] text-[#555] font-black uppercase tracking-widest mb-1">評分</span>
               <span className="text-xs font-black text-gold-500 uppercase">{shop.rating}★</span>
            </div>
            <div className="w-[1px] h-6 bg-white/5" />
            <div className="flex flex-col items-center">
               <span className="text-[10px] text-[#555] font-black uppercase tracking-widest mb-1">營業</span>
               <span className="text-xs font-black text-emerald-500 uppercase">Open</span>
            </div>
         </div>
         <button onClick={onChat} className="p-3 rounded-2xl bg-gold-500 text-black shadow-lg shadow-gold-500/20 active:scale-90 transition-all">
            <MessageSquare size={20} />
         </button>
      </div>

      {/* Menu Categories (Quick Links) */}
      <div className="px-6 py-4 overflow-x-auto no-scrollbar flex space-x-2 border-b border-white/5 bg-zinc-950 sticky top-[73px] z-20">
         {['熱門推薦', '帝國特選', '極致放鬆', '常見問題'].map((cat, i) => (
           <button key={cat} className={`whitespace-nowrap px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${i === 0 ? 'bg-gold-500 text-black border-gold-500' : 'bg-transparent text-[#888888] border-white/10 hover:border-white/20'}`}>
             {cat}
           </button>
         ))}
      </div>

      {/* Services Menu */}
      <div className="px-6 mt-10">
        <h2 className="font-serif text-gold-500 text-xl mb-4 border-b border-gold-600/30 pb-2">服務項目</h2>

        <div className="divide-y divide-[#222]">
          {shop.services.map((service, index) => (
            <div
              key={service.id}
              className="group py-5 flex items-center justify-between transition-colors"
            >
              <div className="flex-1 pr-4">
                <h4 className="text-gold-100 font-bold text-sm mb-1 group-hover:text-gold-400 transition-colors">
                  {service.name}
                </h4>
                <p className="text-[#888888] text-[10px] font-medium leading-relaxed">
                  {service.duration}分鐘 • {service.description}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="text-gold-500 font-bold text-sm">
                  ${service.price.toLocaleString()}
                </div>
                <button
                  onClick={onBook}
                  className="bg-zinc-900 border border-gold-500/20 px-3 py-1 rounded-lg text-gold-500 text-[10px] font-black uppercase tracking-tighter active:bg-gold-500 active:text-black transition-all"
                >
                  預約
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Info */}
      <div className="px-6 mt-10 space-y-8">
        {/* Basic Info */}
        <section>
          <div className="flex items-center space-x-2 text-white mb-4">
            <Info size={18} className="text-gold-500" />
            <h3 className="font-bold">店家資訊</h3>
          </div>
          <div className="bg-white/5 rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">地址</p>
              <p className="text-sm text-zinc-300">{shop.address}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">交通資訊</p>
              <p className="text-sm text-zinc-300">{shop.transportation}</p>
            </div>
          </div>
        </section>

        {/* Notices */}
        <section>
          <h3 className="text-white font-bold mb-4">注意事項</h3>
          <ul className="space-y-3">
            {shop.notices.map((notice, i) => (
              <li key={i} className="flex items-start space-x-3 text-sm text-zinc-400">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0" />
                <span>{notice}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <h3 className="text-white font-bold mb-4">常見問題 FAQ</h3>
          <div className="space-y-4">
            {shop.faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-gold-400 text-sm font-bold mb-2">Q: {faq.question}</p>
                <p className="text-zinc-400 text-xs leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 flex space-x-2 z-30">
        <button
          onClick={onBack}
          className="w-14 h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center active:bg-white/10"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={onBook}
          className="flex-1 bg-gold-500 h-14 rounded-2xl text-black font-black uppercase tracking-widest shadow-lg shadow-gold-500/20"
        >
          立即奢華預約
        </button>
      </div>
    </div>
  );
}
