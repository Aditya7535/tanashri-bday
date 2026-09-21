import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../../data/storyData';
import { ArrowUp } from 'lucide-react';

interface ScreenProps {
  onScrollToTop: () => void;
}

export const Screen13Final: React.FC<ScreenProps> = ({ onScrollToTop }) => {
  const content = storyData.chapters.screen13;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between px-6 py-24 bg-[#050505] snap-start text-center select-none">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full z-10">
        {/* Quotes Progression */}
        <div className="space-y-6 mb-12">
          {content.quotes.map((quote, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.3 + idx * 0.45 }}
              className={`font-serif tracking-wide ${
                idx === 0
                  ? 'text-xl sm:text-2xl text-[#E5E2DC] font-light leading-relaxed'
                  : idx === 1
                  ? 'text-sm font-sans tracking-[0.3em] uppercase text-[#A7A39B]/60'
                  : 'text-xl sm:text-2xl text-[#F5F2EC] font-normal leading-relaxed'
              }`}
            >
              {quote}
            </motion.p>
          ))}
        </div>

        {/* Happy Birthday Wish */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-[0.2em] text-[#F5F2EC] font-light uppercase my-8"
        >
          {content.birthdayWish}
        </motion.h2>

        {/* Handwritten Signature */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 2.3 }}
          className="mt-4 px-4 py-2"
        >
          <p className="font-handwriting text-xl sm:text-2xl md:text-3xl text-[#e5b3b9] tracking-wide">
            {content.handwrittenSignoff}
          </p>
        </motion.div>

        {/* Final Heartfelt Whisper: "Missing you so much... and come fast" */}
        {content.finalWhisper && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 px-7 py-4.5 rounded-2xl bg-gradient-to-br from-[#291219]/90 via-[#1a0e13]/90 to-[#10080b]/90 border border-[#e5b3b9]/30 shadow-[0_12px_40px_rgba(88,24,37,0.45)] backdrop-blur-xl inline-flex items-center space-x-2.5"
          >
            <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#fde4e8] tracking-wide font-medium">
              "{content.finalWhisper}"
            </p>
          </motion.div>
        )}
      </div>

      {/* Gentle Replay / Scroll to Top Option */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 4.2 }}
        className="z-10 flex flex-col items-center pt-8 text-[#A7A39B]/50 hover:text-[#F5F2EC] transition-colors cursor-pointer"
        onClick={onScrollToTop}
      >
        <button
          type="button"
          aria-label="Revisit from the beginning"
          className="flex items-center space-x-2 text-[11px] font-sans tracking-[0.2em] uppercase py-2 px-4 rounded-full border border-white/5 hover:border-white/20 transition-all"
        >
          <ArrowUp className="w-3 h-3" />
          <span>From the beginning</span>
        </button>
      </motion.div>

      {/* Smooth Fade to Black at the Very Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};
