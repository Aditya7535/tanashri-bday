import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Sparkles } from 'lucide-react';
import { ambientSound } from '../utils/soundSynth';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleEnter = () => {
    if (hasTriggered) return;
    setHasTriggered(true);

    // Guaranteed unmuted audio start on direct user tap
    ambientSound.play('/audio/00_intro.mp3', 0);

    setTimeout(() => {
      onComplete();
    }, 350);
  };

  // Graceful auto-advance after 3.8s if user hasn't tapped yet
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        onComplete();
      }
    }, 3800);

    return () => clearTimeout(timer);
  }, [hasTriggered, onComplete]);

  return (
    <motion.div
      onClick={handleEnter}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-14 px-6 bg-[#080808] text-center select-none cursor-pointer"
    >
      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-4"
      >
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#A7A39B]/60 font-sans">
          A personal dedication
        </span>
      </motion.div>

      {/* Center Cinematic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center max-w-sm space-y-4 my-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-serif tracking-[0.22em] text-[#F5F2EC] font-light">
          For Tanashri.
        </h1>

        <p className="text-sm font-serif italic text-[#A7A39B] tracking-wide">
          A story meant to be experienced with music.
        </p>

        {/* Headphones Awareness Cue */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#fce7ea]"
        >
          <Headphones className="w-3.5 h-3.5 text-[#e5b3b9]" />
          <span className="text-[11px] tracking-wider text-[#F5F2EC]/85 font-sans">
            Wear headphones 🎧
          </span>
        </motion.div>
      </motion.div>

      {/* Tap to Enter with Sound Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="pb-6 flex flex-col items-center space-y-2.5"
      >
        <div className="relative group px-6 py-3 rounded-full bg-gradient-to-r from-[#380b14] via-[#581825] to-[#380b14] border border-[#e5b3b9]/40 text-[#f5e6e8] shadow-[0_4px_25px_rgba(88,24,37,0.7)] flex items-center space-x-2.5 active:scale-95 transition-transform">
          <Sparkles className="w-4 h-4 text-[#fce7ea] animate-spin" />
          <span className="font-serif text-sm tracking-widest uppercase font-medium">
            Tap to Open Story
          </span>
        </div>
        <span className="text-[11.5px] font-handwriting text-[#f3d1d7]/70 tracking-wide">
          (tap anywhere to begin with sound)
        </span>
      </motion.div>
    </motion.div>
  );
};
