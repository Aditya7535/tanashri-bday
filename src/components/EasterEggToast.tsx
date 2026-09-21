import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface EasterEggToastProps {
  message: string | null;
  onClose: () => void;
}

export const EasterEggToast: React.FC<EasterEggToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          className="fixed bottom-8 inset-x-4 max-w-sm mx-auto z-50 cursor-pointer"
        >
          <div className="bg-[#181818]/95 backdrop-blur-xl border border-white/15 px-4 py-3 rounded-xl shadow-2xl shadow-black/80 flex items-start space-x-3 text-left">
            <span className="p-1 rounded-full bg-[#581825]/40 text-[#F5F2EC] mt-0.5 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#e5b3b9]" />
            </span>
            <div className="flex-1">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A7A39B]/80 font-sans mb-0.5">
                A quiet thought
              </span>
              <p className="text-sm font-handwriting text-[#F5F2EC] leading-snug">
                "{message}"
              </p>
            </div>
            <span className="text-[10px] text-[#A7A39B]/50 hover:text-white transition-colors pt-0.5 font-sans">
              ✕
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
