import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { Shop } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AIChatProps {
  shop: Shop;
  onClose: () => void;
  onBook: () => void;
}

export function AIChat({ shop, onClose, onBook }: AIChatProps) {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; content: string }[]>([
    { role: 'ai', content: `您好，我是 ${shop.name} 的 AI 店長。有什麼我可以幫您的嗎？` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const shopContext = `
    店家名稱: ${shop.name}
    店家簡介: ${shop.description}
    服務項目: ${shop.services.map(s => `${s.name}($${s.price}, ${s.duration}min, 適合${s.targetAudience})`).join(', ')}
    價格區間: $${Math.min(...shop.services.map(s => s.price))} - $${Math.max(...shop.services.map(s => s.price))}
    預約流程: 點擊預約按鈕 -> 選擇服務與時間 -> 填寫資料 -> 完成
    營業時間: ${shop.openingHours.map(o => `${o.day}: ${o.hours}`).join(', ')}
    地址: ${shop.address}
    交通: ${shop.transportation}
    注意事項: ${shop.notices.join(', ')}
    FAQ: ${shop.faqs.map(f => `Q: ${f.question} A: ${f.answer}`).join('; ')}
  `;

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: ` 你是 ${shop.name} 的 AI 店長。
            你的目標是根據以下店家資料回答客戶問題：
            ${shopContext}

            規則：
            1. 回答要極度簡短且直接。
            2. 不要講廢話，不要說「很高興為您服務」或長篇歡迎詞。
            3. 要像專業店員，語氣高級、沉穩。
            4. 只能根據提供的資料回答。如果資料中沒有答案，請禮貌地回答「目前店家沒有提供這項資訊」。
            5. 如果客戶問到預約，引導他們點擊畫面底部的立即預約。
            6. 優先回答價格、時間、地點等核心資訊。
          `
        }
      });

      const aiResponse = response.text || '店家暫時無法回應，請稍後再試。';
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'ai', content: '對不起，帝國通訊網路暫時不穩定，請稍後再試。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    '多少錢？',
    '適合我嗎？',
    '怎麼預約？',
    '地址在哪？',
    '今天有位嗎？'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-0 z-[100] flex flex-col bg-zinc-950 p-0 sm:p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-zinc-900 border-b border-gold-500/20 rounded-t-[30px]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-black border border-gold-100/30">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-gold-500 font-serif font-bold leading-tight">AI 店長 - Lyna</h2>
            <div className="flex items-center text-[#888888] text-[10px] font-medium animate-pulse">
              <span className="w-1 h-1 rounded-full bg-gold-500 mr-1.5" />
              專業服務中
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-[#888888] hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Messages list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'ai'
                  ? 'bg-[#1a1a1a] text-gold-100 border border-gold-500/10'
                  : 'bg-gold-600 text-white font-medium shadow-lg'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 px-5 py-3 rounded-2xl flex space-x-1">
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Area */}
      <div className="p-4 bg-zinc-900 border-t border-gold-500/20 space-y-4 rounded-b-[30px]">
        {/* Quick Actions */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1">
          {quickActions.map(action => (
            <button
              key={action}
              onClick={() => handleSend(action)}
              className="whitespace-nowrap bg-black hover:bg-zinc-800 border border-gold-500/30 text-gold-100 text-[10px] px-4 py-2 rounded-full transition-colors"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center space-x-3 bg-black rounded-2xl p-2 border border-[#333]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="輸入您的問題..."
            className="flex-1 bg-transparent border-none outline-none text-[#E5E5E5] text-sm px-3 placeholder:text-[#888888]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-gold-500 text-black flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          >
            <Send size={18} />
          </button>
        </div>

        {/* Booking CTA */}
        <button
          onClick={onBook}
          className="w-full bg-white/5 hover:bg-white/10 h-10 rounded-xl flex items-center justify-center space-x-2 text-gold-400 text-xs font-bold transition-all group"
        >
          <Calendar size={14} />
          <span>立即前往預約界面</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
