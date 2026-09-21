import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ambientSound } from '../utils/soundSynth';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Step 0: "For Tanashri."
    const timer1 = setTimeout(() => {
      setStep(1); // "Loading a few memories..."
    }, 1100);

    // Step 2: Complete and fade out
    const timer2 = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <motion.div
      onClick={() => ambientSound.play('/audio/00_intro.mp3', 0)}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] px-6 text-center select-none"
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#A7A39B]/60 font-sans mb-3">
                A personal dedication
              </span>
              <h1 className="text-3xl md:text-4xl font-serif tracking-[0.2em] text-[#F5F2EC] font-light">
                For Tanashri.
              </h1>
            </motion.div>
          ) : (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col items-center space-y-4"
            >
              <p className="text-sm font-sans tracking-[0.18em] text-[#A7A39B] italic">
                Loading a few memories...
              </p>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#F5F2EC]/30 to-transparent animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
