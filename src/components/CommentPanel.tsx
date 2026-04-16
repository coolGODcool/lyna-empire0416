import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Star } from 'lucide-react';
import { Comment } from '../types';

interface CommentPanelProps {
  comments: Comment[];
  onClose: () => void;
  isOpen: boolean;
}

export function CommentPanel({ comments, onClose, isOpen }: CommentPanelProps) {
  const [newComment, setNewComment] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[70vh] bg-zinc-950 border-t border-gold-500/20 rounded-t-[40px] z-[60] flex flex-col overflow-hidden shadow-[0_-20px_50px_rgba(212,175,55,0.15)]"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-gold-500/10 flex items-center justify-between">
              <h3 className="text-xl font-serif font-black text-gold-500 italic uppercase tracking-widest">
                帝國評論 <span className="text-xs text-[#888888] ml-2 font-sans not-italic">({comments.length})</span>
              </h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#888888]"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <div className="w-10 h-10 rounded-full border border-gold-500/30 p-0.5 flex-shrink-0">
                    <img src={comment.userAvatar} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gold-100 font-bold text-sm">{comment.userName}</span>
                      <span className="text-[10px] text-[#555] font-black uppercase tracking-widest">{comment.date}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           size={10} 
                           fill={i < comment.rating ? "#D4AF37" : "transparent"} 
                           className={i < comment.rating ? "text-gold-500" : "text-[#333]"}
                         />
                       ))}
                    </div>
                    <p className="text-[#E5E5E5]/80 text-xs leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-black border-t border-gold-500/10 safe-area-bottom">
              <div className="relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="發表您的帝國見解..."
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl h-14 pl-5 pr-14 text-sm text-white focus:border-gold-500/40 outline-none transition-all"
                />
                <button 
                  className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-gold-500 text-black flex items-center justify-center active:scale-90 transition-transform shadow-lg shadow-gold-500/20 disabled:opacity-50"
                  disabled={!newComment.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
