import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../../data/storyData';
import { PhoneCall } from 'lucide-react';

export const Screen10TheCall: React.FC = () => {
  const content = storyData.chapters.screen10;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-20 bg-gradient-to-b from-[#080808] via-[#120a0d] to-[#0c0809] snap-start overflow-hidden transition-colors duration-1000">
      {/* Warm amber/wine ambient backdrop transitioning into life */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.35 }}
        viewport={{ once: true }}
        transition={{ duration: 2.0 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[380px] h-[380px] rounded-full pointer-events-none blur-[100px] bg-[#581825]"
        aria-hidden="true"
      />

      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center relative z-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#581825] uppercase font-semibold">
              {content.chapterNumber}
            </span>
            <span className="text-white/20 text-xs">—</span>
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#A7A39B] uppercase">
              {content.chapterTitle}
            </span>
          </div>
        </motion.div>

        {/* Cinematic Countdown Timer Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="my-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 w-full max-w-sm flex flex-col items-center space-y-2 shadow-2xl backdrop-blur-md"
        >
          <span className="text-3xl sm:text-4xl font-serif text-[#F5F2EC] tracking-[0.18em] font-light">
            {content.timer.months}
          </span>
          <div className="flex items-center space-x-3 text-lg sm:text-xl font-serif text-[#A7A39B] tracking-[0.2em] font-light">
            <span>{content.timer.days}</span>
            <span className="text-white/20">•</span>
            <span>{content.timer.hours}</span>
          </div>
          <span className="text-[10px] font-sans tracking-[0.25em] text-white/40 uppercase pt-2">
            Time elapsed
          </span>
        </motion.div>

        {/* Story Narrative Lines */}
        <div className="space-y-3.5 max-w-xs my-6">
          {content.storyLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8 + idx * 0.3 }}
              className={`font-serif leading-relaxed ${
                line.includes('called') || line.includes('talked')
                  ? 'text-lg sm:text-xl text-[#F5F2EC] font-normal italic'
                  : 'text-sm sm:text-base text-[#A7A39B]'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Gentle Phone Call Icon Accent */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 2.2, type: 'spring' }}
          className="my-3 p-3 rounded-full bg-[#581825]/40 border border-[#581825] text-[#F5F2EC]"
        >
          <PhoneCall className="w-4 h-4 text-[#e5b3b9]" />
        </motion.div>

        {/* Resolution Warmth */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 2.6 }}
          className="space-y-1.5 mt-4 max-w-sm"
        >
          {content.resolution.map((line, idx) => (
            <p
              key={idx}
              className={`font-serif leading-relaxed ${
                idx === 1
                  ? 'text-lg sm:text-xl text-[#F5F2EC] font-normal italic pt-1'
                  : 'text-sm text-[#A7A39B]'
              }`}
            >
              {line}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
