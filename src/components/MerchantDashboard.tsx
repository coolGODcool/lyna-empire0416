import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, Settings, ListChecks, CheckCircle2, XCircle, Info, ChevronRight, Search, QrCode, Filter } from 'lucide-react';
import { MOCK_SHOPS } from '../data/mockData';

export function MerchantDashboard() {
  const shop = MOCK_SHOPS[0]; // Logic: Assume we are logged in as Shop 1 (Aurelia Spa)
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  const [orders, setOrders] = useState([
    { id: 'LX-8291A', user: '張先生', service: '皇家黑金熱石按摩', time: '今日 14:00', status: 'booked' },
    { id: 'LX-1123B', user: '李小姐', service: '奧瑞莉亞柔膚療程', time: '今日 16:30', status: 'booked' },
    { id: 'LX-C0291', user: '王先生', service: '皇家黑金熱石按摩', time: '昨日 19:00', status: 'checked_out' },
  ]);

  const handleVerify = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'checked_out' } : o));
  };

  return (
    <div className="h-full w-full bg-black overflow-y-auto no-scrollbar pb-24 relative">
      {/* Merchant Header */}
      <div className="bg-zinc-950 px-6 pt-16 pb-10 border-b border-gold-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-900/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex items-center space-x-4 mb-8 relative z-10">
          <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-gold-600 to-gold-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-zinc-900 rounded-[18px] overflow-hidden">
              <img src={shop.thumbnailUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-serif font-black text-gold-500 italic uppercase tracking-tighter">{shop.name}</h1>
            <p className="text-[#888888] text-[10px] font-black tracking-widest uppercase">帝國管理終端 v1.0.4</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex space-x-2 bg-zinc-900 p-1.5 rounded-[30px] border border-gold-500/10 relative z-10">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'orders' ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20' : 'text-[#888888] hover:text-white'
            }`}
          >
            訂單核銷
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'profile' ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20' : 'text-[#888888] hover:text-white'
            }`}
          >
            店家資料
          </button>
        </div>
      </div>

      <div className="px-6 py-8">
        {activeTab === 'orders' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               <MerchantStat label="今日預約" value="8" sub="還剩 2 單待處理" />
               <MerchantStat label="昨日成交" value="12" sub="+15% 成長" />
            </div>

            {/* Verification Tools */}
            <div className="flex space-x-3 mb-8">
               <div className="flex-1 bg-black h-14 rounded-[20px] border border-[#333] flex items-center px-4 space-x-3 text-[#888888]">
                 <Search size={18} />
                 <input type="text" placeholder="搜尋預約編號..." className="bg-transparent border-none outline-none text-sm w-full font-medium" />
               </div>
               <button className="w-14 h-14 rounded-[20px] bg-gold-500 text-black flex items-center justify-center active:scale-90 transition-transform shadow-lg shadow-gold-500/20">
                 <QrCode size={24} />
               </button>
            </div>

            {/* List */}
            <h3 className="text-gold-500 font-serif font-bold mb-4 flex items-center space-x-2 border-b border-gold-600/20 pb-2">
              <ListChecks size={20} className="text-gold-500" />
              <span>待處理預約</span>
            </h3>

            <div className="space-y-4">
              {orders.filter(o => o.status === 'booked').map(order => (
                <div key={order.id} className="bg-zinc-900 rounded-[30px] p-6 border border-gold-500/10 space-y-4 relative overflow-hidden group hover:bg-[#1a1a1a] transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gold-500 font-mono text-[10px] font-black tracking-[0.2em] mb-1">{order.id}</p>
                      <h4 className="text-gold-100 font-bold uppercase tracking-tight">{order.user}</h4>
                    </div>
                    <div className="text-right">
                      <div className="bg-black text-[#888888] border border-white/5 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter">已預訂</div>
                      <p className="text-[#888888] text-[10px] mt-1 font-medium">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-[#888888] text-[10px] font-bold uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shadow-[0_0_5px_#D4AF37]" />
                    <span>{order.service}</span>
                  </div>
                  <button
                    onClick={() => handleVerify(order.id)}
                    className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black h-12 rounded-[18px] text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <CheckCircle2 size={16} />
                    <span>核銷 並發放 L-COIN</span>
                  </button>
                </div>
              ))}

              {orders.filter(o => o.status === 'checked_out').length > 0 && (
                <>
                  <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mt-12 mb-4">最近已核銷</h3>
                  {orders.filter(o => o.status === 'checked_out').map(order => (
                    <div key={order.id} className="flex items-center justify-between bg-zinc-900/30 p-4 rounded-2xl opacity-60">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <p className="text-zinc-300 text-sm font-bold">{order.user}</p>
                          <p className="text-[10px] text-zinc-600">{order.id} • {order.time}</p>
                        </div>
                      </div>
                      <div className="text-emerald-500 text-xs font-black">+10 L-COIN 已發放</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 text-center py-12">
             <Settings className="mx-auto text-zinc-800 mb-6" size={64} />
             <p className="text-zinc-500 font-bold">目前進階資料管理模組尚未開放</p>
             <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2">請聯繫您的專屬客戶經理</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MerchantStat({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 relative overflow-hidden">
      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1 relative z-10">{label}</p>
      <p className="text-3xl font-serif font-black text-white mb-2 relative z-10">{value}</p>
      <p className="text-[10px] text-gold-500/60 font-medium relative z-10">{sub}</p>
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/5 rounded-full blur-xl" />
    </div>
  );
}
