import React from 'react';
import { motion } from 'motion/react';
import { Coins, ArrowUpRight, ArrowDownRight, History, CreditCard, Gift, ChevronRight, TrendingUp } from 'lucide-react';

export function UserDashboard() {
  const points = 1500;
  const history = [
    { id: '1', date: '2026-04-15', amount: 10, description: 'Aurelia Spa 核銷成功' },
    { id: '2', date: '2026-04-14', amount: 10, description: 'Obsidion Barber 核銷成功' },
    { id: '3', date: '2026-04-12', amount: 50, description: '初次體驗獎勵' },
    { id: '4', date: '2026-04-10', amount: -100, description: '兌換遊戲場門票' },
  ];

  return (
    <div className="h-full w-full bg-black overflow-y-auto no-scrollbar px-6 pt-16 pb-24 relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gold-950/20 to-transparent pointer-events-none" />

      <h1 className="text-3xl font-serif font-black text-gold-500 mb-2 italic uppercase tracking-tighter">Imperial Wallet</h1>
      <p className="text-[#888888] text-[10px] tracking-widest font-bold mb-8 uppercase">我的 L-COIN 數位資產</p>

      {/* Point Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-gradient-to-br from-gold-600 via-gold-500 to-gold-700 rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_20px_40px_rgba(212,175,55,0.4)] mb-10 border border-gold-100/30"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2 opacity-80">
              <Coins size={14} className="text-black" />
              <span className="text-[10px] font-black uppercase tracking-tighter text-black">Total L-COIN Balance</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 border border-white/10">
              <span className="text-gold-100 text-[8px] font-black uppercase tracking-widest">Premium Member</span>
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-serif font-black text-black tracking-tighter drop-shadow-sm">{points.toLocaleString()}</span>
            <span className="text-black font-black text-xs">◈</span>
          </div>
          <div className="mt-8 flex space-x-2">
            <button className="flex-1 bg-black text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform flex items-center justify-center space-x-2 shadow-lg">
              <span>遊戲兌換</span>
              <ArrowUpRight size={14} />
            </button>
            <button className="flex-1 bg-black/20 backdrop-blur-md text-black border border-black/10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
              商城預留
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats / Quick Links */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
             <TrendingUp size={20} />
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">近日累計</p>
          <p className="text-xl font-black text-white">+20</p>
        </div>
        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
             <Gift size={20} />
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">核銷加成</p>
          <p className="text-xl font-black text-white">100%</p>
        </div>
      </div>

      {/* History */}
      <section className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <History size={18} className="text-gold-500" />
            <h3 className="text-gold-500 font-serif font-bold text-lg">近期紀錄</h3>
          </div>
          <button className="text-[10px] text-[#888888] font-bold uppercase hover:text-gold-400">查看全部</button>
        </div>

        <div className="space-y-4">
          {history.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-zinc-900 border border-gold-500/10 p-4 rounded-2xl transition-all hover:bg-[#1a1a1a]">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.amount > 0 ? 'bg-gold-500/10 text-gold-500' : 'bg-black text-[#888888]'}`}>
                  {item.amount > 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gold-100 mb-0.5 uppercase tracking-tight">{item.description}</p>
                  <p className="text-[10px] text-[#888888] font-medium">{item.date}</p>
                </div>
              </div>
              <div className={`text-sm font-black pr-2 ${item.amount > 0 ? 'text-gold-500' : 'text-[#888888]'}`}>
                {item.amount > 0 ? `+${item.amount}` : item.amount}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotion banner */}
      <div className="mt-10 bg-gold-950/20 border border-gold-500/10 rounded-3xl p-6 flex items-center justify-between">
         <div className="space-y-1">
           <h4 className="text-gold-400 font-bold">限時活動：核銷翻倍</h4>
           <p className="text-[10px] text-gold-400/60 leading-tight">即日起至月底，所有預約核銷加贈 5 點</p>
         </div>
         <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
           <Gift size={24} />
         </div>
      </div>
    </div>
  );
}
