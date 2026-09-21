import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Headphones } from 'lucide-react';
import { storyData } from '../../data/storyData';
import { ambientSound } from '../../utils/soundSynth';

interface ScreenProps {
  onStart?: () => void;
}

export const Screen01Intro: React.FC<ScreenProps> = ({ onStart }) => {
  const content = storyData.chapters.screen01;
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Start Malcolm Todd - Earrings for this intro & journey unless explicitly muted
    const saved = localStorage.getItem('tanashri_bday_music_pref');
    if (saved !== 'disabled') {
      ambientSound.play(storyData.chapterAudios[0]?.filePath, 0);
      localStorage.setItem('tanashri_bday_music_pref', 'enabled');
    }

    // Smooth single-stage transition directly into Chapter 1
    setTimeout(() => {
      if (onStart) onStart();
    }, 450);
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-between px-6 py-16 bg-[#080808] text-center select-none snap-start overflow-hidden">
      {/* Dynamic Ambient Background Glow that blooms on unseal */}
      <motion.div
        animate={
          isOpening
            ? { scale: [1, 1.8], opacity: [0.25, 0.65, 0] }
            : { scale: [1, 1.08, 1], opacity: [0.2, 0.3, 0.2] }
        }
        transition={
          isOpening
            ? { duration: 0.8, ease: 'easeOut' }
            : { repeat: Infinity, duration: 7, ease: 'easeInOut' }
        }
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full pointer-events-none blur-[120px] bg-[#581825]"
        aria-hidden="true"
      />

      {/* Top Dedication Header */}
      <motion.div
        animate={isOpening ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-6 z-20"
      >
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#A7A39B]/60 font-sans">
          A personal chaptered memory
        </span>
      </motion.div>

      {/* Center Cinematic Title */}
      <motion.div
        animate={isOpening ? { opacity: 0, scale: 0.98, filter: 'blur(6px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        className="flex flex-col items-center justify-center max-w-md mx-auto z-20 my-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-[0.25em] text-[#F5F2EC] font-light uppercase">
            {content.title}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          className="mt-6 text-sm sm:text-base font-serif italic text-[#A7A39B] tracking-wide font-normal max-w-xs"
        >
          {content.subtitle}
        </motion.p>

        {/* Warm & Noticeable Headphones Awareness Cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#380b14]/90 via-[#581825]/80 to-[#380b14]/90 border border-[#e5b3b9]/35 text-xs text-[#f5e6e8] backdrop-blur-md shadow-[0_4px_25px_rgba(88,24,37,0.45)] select-none"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="flex items-center justify-center"
          >
            <Headphones className="w-4 h-4 text-[#f3d1d7]" />
          </motion.div>
          <span className="font-sans text-[11.5px] sm:text-xs tracking-wider text-[#fce7ea] font-medium">
            Wear headphones for the best experience 🎧
          </span>
        </motion.div>
      </motion.div>

      {/* Creative Interactive Wax Seal Stamp & Silk Ribbon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="z-20 pb-8 flex flex-col items-center space-y-4"
      >
        {/* The Wax Seal Button */}
        <div
          onClick={handleSealClick}
          className="relative cursor-pointer group select-none transition-transform duration-500 hover:scale-105 active:scale-95"
          title="Break the seal & open the story"
        >
          {/* Silk Ribbon Tails */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex space-x-1 -z-10 pointer-events-none">
            <motion.div
              animate={isOpening ? { rotate: -18, opacity: 0, y: -4 } : { rotate: -5 }}
              transition={{ duration: 0.4 }}
              className="w-3.5 h-12 bg-gradient-to-b from-[#380b14] via-[#581825] to-[#722232] shadow-md rounded-b-[2px]"
            />
            <motion.div
              animate={isOpening ? { rotate: 18, opacity: 0, y: -4 } : { rotate: 5 }}
              transition={{ duration: 0.4 }}
              className="w-3.5 h-12 bg-gradient-to-b from-[#380b14] via-[#581825] to-[#722232] shadow-md rounded-b-[2px]"
            />
          </div>

          {/* Ambient Breathing Wine Glow */}
          <motion.div
            animate={isOpening ? { scale: 1.8, opacity: 1 } : { scale: 1, opacity: 0.6 }}
            transition={{ duration: 0.45 }}
            className="absolute -inset-4 rounded-full bg-[#7a2234]/50 blur-xl pointer-events-none"
          />

          {/* Wax Seal Outer Body */}
          <motion.div
            animate={
              isOpening
                ? { scale: 1.12, boxShadow: '0 0 45px rgba(229,179,185,0.8)' }
                : { scale: 1 }
            }
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#7a2234] via-[#581825] to-[#2e0b13] border-2 border-[#9a3248]/70 shadow-[0_12px_35px_rgba(88,24,37,0.8),inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden"
          >
            {/* Inner Stamped Ring */}
            <div className="w-15 h-15 sm:w-16 sm:h-16 rounded-full border border-dashed border-[#e5b3b9]/45 flex items-center justify-center bg-gradient-to-tl from-[#4a121e] to-[#631c2b] shadow-inner">
              {/* Monogram "T" */}
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#f5e6e8] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-widest pl-0.5">
                T
              </span>
            </div>

            {/* Sparkle burst on breaking */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.6, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center text-amber-200 pointer-events-none bg-[#7a2234]/40 backdrop-blur-xs"
                >
                  <Sparkles className="w-9 h-9 text-[#fce7ea] animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Handwritten Invitation */}
        <motion.div
          animate={isOpening ? { opacity: 0, y: 6 } : { y: [0, -3, 0], opacity: 1 }}
          transition={
            isOpening
              ? { duration: 0.3 }
              : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
          }
          onClick={handleSealClick}
          className="cursor-pointer group flex flex-col items-center"
        >
          <span className="font-handwriting text-lg sm:text-xl text-[#f3d1d7] group-hover:text-white transition-colors tracking-wide">
            tap to break the seal & open the story
          </span>
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#f3d1d7]/40 to-transparent mt-1" />
        </motion.div>
      </motion.div>
    </section>
  );
};
