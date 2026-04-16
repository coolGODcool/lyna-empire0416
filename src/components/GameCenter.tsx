import React from 'react';
import { motion } from 'motion/react';
import { Swords, Bot, Users, Shuffle, Lock, Play, Gamepad2, Coins, Sparkles, ArrowUpRight, Brain, Zap } from 'lucide-react';

export function GameCenter() {
  const games = [
    { id: '1', title: 'E-CARD 對決', description: '運用心理戰與策略贏取對手點數', icon: <Swords size={32} />, cost: 50, status: 'available' },
    { id: '2', title: '對 AI 挑戰賽', description: '挑戰帝國最強 AI 獲得高額倍率', icon: <Bot size={32} />, cost: 100, status: 'available' },
    { id: '3', title: '好友競技場', description: '約戰現實生活中的朋友', icon: <Users size={32} />, cost: 30, status: 'available' },
    { id: '4', title: '神祕隨機戰', description: '未知難度與獎金，敢挑戰嗎？', icon: <Shuffle size={32} />, cost: 200, status: 'locked' },
  ];

  return (
    <div className="h-full w-full bg-black overflow-y-auto no-scrollbar px-6 pt-16 pb-24 relative">
       {/* Ambient Light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-gold-900/10 rounded-full blur-[100px] pointer-events-none" />

      <h1 className="text-3xl font-serif font-black text-gold-500 mb-2 italic tracking-tighter uppercase">Imperial Arena</h1>
      <p className="text-[#888888] text-[10px] tracking-widest font-bold mb-8 uppercase">L-COIN 遊戲廳</p>

      {/* Featured Game */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative h-56 rounded-[2.5rem] overflow-hidden mb-10 group cursor-pointer border border-gold-600/30 shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
      >
        <img
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-gold-500 text-black text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">精選對決</span>
            <div className="text-gold-100 text-[10px] font-black italic uppercase tracking-tighter flex items-center bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/5">
              <Play size={10} className="mr-1 text-gold-500" />
              1,248 人在線
            </div>
          </div>
          <div className="flex justify-between items-end">
             <div>
               <h2 className="text-2xl font-serif font-black text-gold-500 italic uppercase tracking-tighter drop-shadow-lg mb-1">帝國卡牌對決</h2>
               <p className="text-[#E5E5E5]/60 text-[10px] tracking-wide leading-relaxed max-w-[200px]">運用心理戰與策略贏取對手點數，在這個帝國中，只有最後的贏家能帶走 L-COIN。</p>
             </div>
             <button className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-600 to-gold-500 flex items-center justify-center text-black shadow-lg shadow-gold-500/40 transform -rotate-12 group-hover:rotate-0 transition-transform">
               <ArrowUpRight size={24} />
             </button>
          </div>
        </div>
      </motion.div>

     {/* Game List */}
      <div className="grid grid-cols-1 gap-5">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`group relative p-5 rounded-[2.5rem] border transition-all ${
               game.status === 'locked' ? 'opacity-40 border-white/5 bg-zinc-900/40' : 'bg-zinc-900 border-gold-600/10 hover:border-gold-500/40 hover:bg-[#1a1a1a] shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${game.status === 'locked' ? 'bg-black text-[#555]' : 'bg-black text-gold-500 border border-gold-500/20 shadow-inner group-hover:bg-gold-500 group-hover:text-black group-hover:shadow-lg'}`}>
                  {game.icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-0.5">
                    <h3 className="text-gold-100 font-bold uppercase tracking-tight group-hover:text-gold-400 transition-colors">{game.title}</h3>
                    {game.status === 'locked' && <Lock size={12} className="text-[#555]" />}
                  </div>
                  <p className="text-[#888888] text-[10px] leading-relaxed max-w-[150px] font-medium">{game.description}</p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="text-gold-500 font-black text-sm pr-2">
                  {game.cost} ◈
                </div>
                <button 
                  disabled={game.status === 'locked'} 
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                    game.status === 'locked' ? 'bg-black text-[#333]' : 'bg-zinc-950 border border-gold-500/20 text-gold-500 hover:bg-gold-500 hover:text-black hover:shadow-lg active:scale-95'
                  }`}
                >
                  {game.status === 'available' ? '進入' : '鎖定'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-12 flex flex-col items-center space-y-4">
        <Gamepad2 className="text-zinc-800" size={32} />
        <p className="text-zinc-700 text-[10px] uppercase tracking-[0.3em] font-black">Coming Soon More Experiences</p>
      </div>
    </div>
  );
}
