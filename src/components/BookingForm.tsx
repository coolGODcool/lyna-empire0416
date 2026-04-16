import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, ChevronRight, ArrowLeft, Info } from 'lucide-react';
import { Shop, Service } from '../types';

interface BookingFormProps {
  shop: Shop;
  onClose: () => void;
}

type Step = 'service' | 'datetime' | 'info' | 'success';

export function BookingForm({ shop, onClose }: BookingFormProps) {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', note: '' });

  const dates = ['2026-04-18', '2026-04-19', '2026-04-20', '2026-04-21', '2026-04-22'];
  const times = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '19:00', '20:00'];

  const handleSubmit = () => {
    // Logic for saving booking normally goes here
    setStep('success');
  };

  const renderStep = () => {
    switch (step) {
      case 'service':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-white mb-6">選擇尊榮服務</h3>
            <div className="space-y-3">
              {shop.services.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s); setStep('datetime'); }}
                  className={`w-full p-4 rounded-2xl border transition-all text-left flex justify-between items-center group ${
                    selectedService?.id === s.id
                      ? 'bg-gold-500/10 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.15)] animate-pulse-subtle'
                      : 'bg-zinc-900 border-white/5 active:border-gold-500/50'
                  }`}
                >
                  <div className="flex-1">
                    <h4 className={`font-bold transition-colors ${selectedService?.id === s.id ? 'text-gold-400' : 'text-white group-hover:text-gold-400'}`}>
                      {s.name}
                    </h4>
                    <p className="text-zinc-500 text-xs mt-1 font-medium">{s.duration} MIN / ${s.price.toLocaleString()}</p>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        );
      case 'datetime':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <button onClick={() => setStep('service')} className="p-2 -ml-2 text-zinc-500 hover:text-white transition-colors">
                <ArrowLeft size={18} />
              </button>
              <h3 className="text-xl font-serif font-bold text-white">選擇預約時段</h3>
            </div>

            <section>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4 font-bold flex items-center">
                <Calendar size={12} className="mr-2 text-gold-500" />
                預約日期
              </p>
              <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                {dates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 w-16 h-20 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                      selectedDate === date
                        ? 'bg-gold-500 border-gold-500 text-black shadow-lg shadow-gold-500/20'
                        : 'bg-zinc-900 border-white/5 text-zinc-400'
                    }`}
                  >
                    <span className="text-[10px] uppercase opacity-60 font-medium">{date.split('-')[1]}/{date.split('-')[2]}</span>
                    <span className="text-lg font-black mt-1">SAT</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4 font-bold flex items-center">
                <Clock size={12} className="mr-2 text-gold-500" />
                可選時段
              </p>
              <div className="grid grid-cols-4 gap-2">
                {times.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                      selectedTime === time
                        ? 'bg-gold-500 border-gold-500 text-black shadow-lg shadow-gold-500/20'
                        : 'bg-zinc-900 border-white/5 text-zinc-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </section>

            <button
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep('info')}
              className="w-full bg-gold-500 text-black h-14 rounded-2xl font-black uppercase tracking-widest disabled:opacity-30 disabled:grayscale transition-all shadow-xl shadow-gold-500/20 active:scale-95"
            >
              下一步：填寫資料
            </button>
          </div>
        );
      case 'info':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
             <div className="flex items-center space-x-3 mb-6">
              <button onClick={() => setStep('datetime')} className="p-2 -ml-2 text-zinc-500 hover:text-white transition-colors">
                <ArrowLeft size={18} />
              </button>
              <h3 className="text-xl font-serif font-bold text-white">確認預約人資料</h3>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold px-1">您的姓名</label>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-gold-500 transition-colors" />
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    placeholder="請輸入姓名"
                    className="w-full bg-zinc-900 border border-white/10 h-14 pl-12 pr-4 rounded-2xl outline-none focus:border-gold-500/50 transition-all text-white placeholder:text-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold px-1">聯繫電話</label>
                <div className="relative group">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-gold-500 transition-colors" />
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    placeholder="請輸入手機號碼"
                    className="w-full bg-zinc-900 border border-white/10 h-14 pl-12 pr-4 rounded-2xl outline-none focus:border-gold-500/50 transition-all text-white placeholder:text-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold px-1">備註 (選填)</label>
                <textarea
                  value={userInfo.note}
                  onChange={(e) => setUserInfo({ ...userInfo, note: e.target.value })}
                  placeholder="有什麼想告訴店家的嗎？"
                  className="w-full bg-zinc-900 border border-white/10 h-24 p-4 rounded-2xl outline-none focus:border-gold-500/50 transition-all text-white placeholder:text-zinc-700 resize-none"
                />
              </div>
            </div>

            <div className="bg-gold-500/5 border border-gold-500/20 rounded-2xl p-4 flex items-start space-x-3">
              <Info size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-gold-400 leading-tight">提醒：預約完成後，請於時段內抵達店家進行核銷。核銷成功後，系統將自動派發 10 點 L-COIN 至您的帳戶。</p>
            </div>

            <button
              disabled={!userInfo.name || !userInfo.phone}
              onClick={handleSubmit}
              className="w-full bg-gold-500 text-black h-16 rounded-2xl font-black uppercase tracking-widest disabled:opacity-30 disabled:grayscale transition-all shadow-xl shadow-gold-500/20 active:scale-95"
            >
              確認並送出預約
            </button>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500 py-12">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse" />
              <CheckCircle2 size={120} className="text-emerald-500 relative z-10" strokeWidth={1.5} />
            </div>

            <div className="text-center space-y-3">
              <h2 className="text-3xl font-serif font-black text-white tracking-tight">預約成功！</h2>
              <p className="text-zinc-400 text-sm">您的奢華體驗已經排定</p>
            </div>

            <div className="w-full bg-zinc-900/50 border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zinc-500 text-xs">預約編號</span>
                <span className="text-white text-sm font-mono font-bold uppercase tracking-widest">LX-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zinc-500 text-xs">預約項目</span>
                <span className="text-gold-400 text-sm font-bold">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-zinc-500 text-xs">時段</span>
                <span className="text-white text-sm font-bold">{selectedDate} {selectedTime}</span>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 w-full flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black text-xs">L</div>
                 <span className="text-emerald-400 text-xs font-bold">核銷後可獲得獎勵</span>
               </div>
               <span className="text-emerald-400 font-black">+10 L-COIN</span>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-white text-black h-14 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
            >
              返回首頁探索
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black"
    >
      {/* Background Frame Component */}
      <div className="absolute inset-0 bg-radial-gradient(circle_at_50%_0%,_#1a1608_0%,_#050505_100%) pointer-events-none" />

      {/* Close button - Top Right */}
      {step !== 'success' && (
        <button
          onClick={onClose}
          className="absolute top-12 right-6 z-10 w-10 h-10 rounded-full bg-black/60 border border-gold-500/30 text-gold-500 hover:text-white flex items-center justify-center transition-all active:scale-90 shadow-lg"
        >
          <X size={24} />
        </button>
      )}

      {/* Content Scroll Container */}
      <div className="h-full w-full overflow-y-auto px-6 pt-24 pb-12 no-scrollbar relative z-0">
        <div className="max-w-md mx-auto h-full flex flex-col">
          {renderStep()}
        </div>
      </div>
    </motion.div>
  );
}
