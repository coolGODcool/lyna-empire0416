import React from 'react';
import { Shop } from '../types';
import { ArrowLeft, Star, MapPin, Clock, MessageSquare, Calendar, ChevronRight, Info } from 'lucide-react';
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
      <div className="relative h-64">
        <img src={shop.thumbnailUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/60 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
        <button
          onClick={onBack}
          className="absolute top-12 left-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-gold-500/30 flex items-center justify-center text-gold-500 active:scale-90 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="absolute bottom-6 left-6 text-xl font-serif font-black text-gold-500 italic uppercase tracking-tighter drop-shadow-lg">
          {shop.name} EMPIRE
        </div>
      </div>

      {/* Info Content */}
      <div className="px-6 -mt-10 relative z-10">
        <div className="bg-zinc-900 border border-gold-500/20 rounded-[40px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-serif font-bold text-gold-500">店家詳情</h1>
            <div className="text-gold-100 text-sm font-bold flex items-center">
              <Star size={14} fill="currentColor" className="mr-1 text-gold-500" />
              {shop.rating} (2.1k 評價)
            </div>
          </div>
          <p className="text-[#888888] text-xs mb-6 leading-relaxed">頂級奢華體驗，從您的蒞臨開始。{shop.description}</p>

          <div className="flex space-x-3 mb-6">
            <div className="flex-1 bg-black/40 rounded-2xl p-3 border border-white/5 flex flex-col items-center justify-center space-y-1">
              <MapPin size={16} className="text-gold-500" />
              <span className="text-[10px] text-[#888888] font-bold">{shop.distance}</span>
            </div>
            <div className="flex-1 bg-black/40 rounded-2xl p-3 border border-white/5 flex flex-col items-center justify-center space-y-1">
              <Clock size={16} className="text-gold-500" />
              <span className="text-[10px] text-[#888888] font-bold">24H 經營</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={onChat}
              className="flex-1 bg-zinc-800 text-white h-12 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 active:bg-zinc-700 transition-colors border border-white/5"
            >
              <MessageSquare size={18} />
              <span>問 AI 店長</span>
            </button>
            <button
              onClick={onBook}
              className="flex-1 bg-gold-500 text-black h-12 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 active:bg-gold-600 transition-colors shadow-lg"
            >
              <Calendar size={18} />
              <span>預約服務</span>
            </button>
          </div>
        </div>
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
