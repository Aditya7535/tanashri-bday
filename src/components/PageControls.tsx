import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Scissors,
  Send,
  PhoneCall,
  Sparkles,
  Heart,
  Moon,
  Gift,
  Mic,
} from 'lucide-react';

interface PageControlsProps {
  currentPage: number;
  totalPages: number;
  chapterTitle: string;
  onNext: () => void;
  onPrev: () => void;
  onRestart: () => void;
}

interface ChapterButtonTheme {
  label: string;
  icon?: React.ReactNode;
  bgClass: string;
  textClass: string;
  borderClass: string;
  glowClass: string;
}

export const PageControls: React.FC<PageControlsProps> = ({
  currentPage,
  totalPages,
  chapterTitle,
  onNext,
  onPrev,
  onRestart,
}) => {
  const isFinal = currentPage === totalPages - 1;

  // Bespoke story-themed button for every individual page
  const getButtonTheme = (page: number): ChapterButtonTheme => {
    switch (page) {
      case 1: // The First Time
        return {
          label: 'The Blue Kurti',
          icon: <ChevronRight className="w-3.5 h-3.5 text-blue-300" />,
          bgClass: 'bg-gradient-to-r from-blue-950 to-[#1e3a8a]',
          textClass: 'text-blue-100',
          borderClass: 'border-blue-400/40',
          glowClass: 'shadow-[0_0_20px_rgba(59,130,246,0.35)]',
        };
      case 2: // Atrangi
        return {
          label: 'Snip Next',
          icon: <Scissors className="w-3.5 h-3.5 text-[#f3d1d7]" />,
          bgClass: 'bg-[#26151c]',
          textClass: 'text-[#f3d1d7]',
          borderClass: 'border-[#8a2a3e]/50',
          glowClass: 'shadow-[0_0_20px_rgba(88,24,37,0.4)]',
        };
      case 3: // Eye Contact
        return {
          label: 'Catch Glance 👀',
          bgClass: 'bg-[#181818]',
          textClass: 'text-white',
          borderClass: 'border-white/30',
          glowClass: 'shadow-[0_0_15px_rgba(255,255,255,0.15)]',
        };
      case 4: // Lohri
        return {
          label: 'Send “Hi”',
          icon: <Send className="w-3 h-3 text-white" />,
          bgClass: 'bg-gradient-to-r from-[#e6683c] to-[#bc1888]',
          textClass: 'text-white',
          borderClass: 'border-white/30',
          glowClass: 'shadow-[0_0_25px_rgba(230,104,60,0.45)]',
        };
      case 5: // Dhoom Chitar
        return {
          label: 'Falling for You',
          icon: <Sparkles className="w-3.5 h-3.5 text-[#f5e6e8]" />,
          bgClass: 'bg-gradient-to-r from-[#581825] to-[#7a2234]',
          textClass: 'text-[#f5e6e8]',
          borderClass: 'border-[#9a3248]/60',
          glowClass: 'shadow-[0_0_25px_rgba(88,24,37,0.6)]',
        };
      case 6: // The Flowers
        return {
          label: 'Her Smile',
          icon: <Heart className="w-3 h-3 text-rose-300 fill-rose-400/40" />,
          bgClass: 'bg-gradient-to-r from-[#421722] to-[#5e1f30]',
          textClass: 'text-rose-100',
          borderClass: 'border-rose-400/40',
          glowClass: 'shadow-[0_0_20px_rgba(244,63,94,0.3)]',
        };
      case 7: // The Canteen
        return {
          label: 'Into the Quiet',
          icon: <Moon className="w-3.5 h-3.5 text-[#A7A39B]" />,
          bgClass: 'bg-[#161616]',
          textClass: 'text-[#A7A39B]',
          borderClass: 'border-white/10',
          glowClass: 'shadow-[0_0_15px_rgba(0,0,0,0.8)]',
        };
      case 8: // The Silence
        return {
          label: 'Break Silence',
          icon: <ChevronRight className="w-3.5 h-3.5 text-amber-200" />,
          bgClass: 'bg-[#221815]',
          textClass: 'text-amber-100',
          borderClass: 'border-amber-400/30',
          glowClass: 'shadow-[0_0_20px_rgba(217,119,6,0.25)]',
        };
      case 9: // The Call
        return {
          label: 'Pick up Call',
          icon: <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />,
          bgClass: 'bg-gradient-to-r from-[#18261e] to-[#1d3827]',
          textClass: 'text-emerald-100',
          borderClass: 'border-emerald-400/40',
          glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        };
      case 10: // Something I Want You To Know
        return {
          label: 'Celebrate Shree',
          icon: <Gift className="w-3.5 h-3.5 text-amber-200" />,
          bgClass: 'bg-gradient-to-r from-[#581825] to-[#802236]',
          textClass: 'text-amber-100',
          borderClass: 'border-amber-400/40',
          glowClass: 'shadow-[0_0_25px_rgba(251,191,36,0.3)]',
        };
      case 11: // Birthday -> Leads to Voice Note
        return {
          label: 'A Voice For You',
          icon: <Mic className="w-3.5 h-3.5 text-[#f3d1d7]" />,
          bgClass: 'bg-gradient-to-r from-[#581825] to-[#7a2234]',
          textClass: 'text-[#f5e6e8]',
          borderClass: 'border-[#e5b3b9]/40',
          glowClass: 'shadow-[0_0_25px_rgba(88,24,37,0.6)]',
        };
      case 12: // Voice Note -> Leads to Final Note
        return {
          label: 'Final Note',
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-100" />,
          bgClass: 'bg-gradient-to-r from-[#381119] to-[#200a0e]',
          textClass: 'text-[#F5F2EC]',
          borderClass: 'border-white/20',
          glowClass: 'shadow-[0_0_25px_rgba(88,24,37,0.4)]',
        };
      default:
        return {
          label: 'Next',
          icon: <ChevronRight className="w-4 h-4" />,
          bgClass: 'bg-[#581825]',
          textClass: 'text-white',
          borderClass: 'border-[#7a2234]',
          glowClass: 'shadow-md shadow-[#581825]/40',
        };
    }
  };

  const theme = getButtonTheme(currentPage);

  return (
    <motion.nav
      aria-label="Story chapter navigation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-5 inset-x-4 max-w-sm mx-auto z-40 flex items-center justify-between p-1.5 rounded-full bg-[#121212]/95 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous chapter"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/10 active:scale-90 text-[#A7A39B] hover:text-[#F5F2EC] transition-all shrink-0"
      >
        <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
      </button>

      {/* Center Chapter Info & Dots */}
      <div className="flex flex-col items-center justify-center px-2 select-none overflow-hidden">
        <span className="text-[11px] font-serif text-[#F5F2EC] tracking-wider font-light truncate max-w-[130px]">
          {chapterTitle}
        </span>
        <div className="flex items-center space-x-1 mt-0.5">
          <span className="text-[10px] font-sans tracking-widest text-[#e5b3b9] font-semibold">
            {currentPage.toString().padStart(2, '0')}
          </span>
          <span className="text-[9px] text-white/20">/</span>
          <span className="text-[10px] font-sans tracking-widest text-[#A7A39B]/70">
            {(totalPages - 1).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Dynamic Themed Next / Replay Button */}
      <AnimatePresence mode="wait">
        {isFinal ? (
          <motion.button
            key="replay-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            type="button"
            onClick={onRestart}
            aria-label="Replay from the beginning"
            className="flex items-center space-x-1.5 px-3.5 h-10 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 active:scale-95 text-[#F5F2EC] transition-all text-xs font-sans tracking-wider shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </motion.button>
        ) : (
          <motion.button
            key={`next-btn-${currentPage}`}
            initial={{ opacity: 0, x: 8, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.94 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            type="button"
            onClick={onNext}
            aria-label={`Next: ${theme.label}`}
            className={`group flex items-center space-x-1.5 px-3.5 h-10 rounded-full border transition-all active:scale-95 shrink-0 text-xs font-sans tracking-wider font-medium ${theme.bgClass} ${theme.textClass} ${theme.borderClass} ${theme.glowClass}`}
          >
            <span>{theme.label}</span>
            {theme.icon && (
              <span className="group-hover:translate-x-0.5 transition-transform">
                {theme.icon}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
