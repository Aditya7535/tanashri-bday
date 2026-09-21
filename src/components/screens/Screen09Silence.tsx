import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../../data/storyData';

export const Screen09Silence: React.FC = () => {
  const content = storyData.chapters.screen09;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-28 bg-[#040404] snap-start select-none">
      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center">
        {/* Minimal Chapter Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#581825] uppercase font-semibold">
              {content.chapterNumber}
            </span>
            <span className="text-white/10 text-xs">—</span>
            <span className="text-[10px] font-sans tracking-[0.3em] text-[#A7A39B]/60 uppercase">
              {content.chapterTitle}
            </span>
          </div>
        </motion.div>

        {/* Monolithic Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="my-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-[0.25em] text-[#F5F2EC]/90 font-extralight uppercase">
            {content.monolith}
          </h2>
        </motion.div>

        {/* Quiet Aftermath */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-serif italic text-base sm:text-lg text-[#A7A39B] tracking-wider mb-12"
        >
          {content.leadText}
        </motion.p>

        {/* Stark Empty Space & Minimal Lines */}
        <div className="space-y-4 max-w-xs mt-6">
          {content.storyLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 1.4 + idx * 0.4 }}
              className={`font-serif tracking-widest ${
                line.includes('silence')
                  ? 'text-lg sm:text-xl text-[#F5F2EC] font-light pt-3 italic'
                  : 'text-sm sm:text-base text-[#A7A39B]/70'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};
