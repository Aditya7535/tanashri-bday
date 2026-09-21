import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../../data/storyData';

export const Screen11Know: React.FC = () => {
  const content = storyData.chapters.screen11;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-24 bg-[#080808] snap-start">
      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mb-10"
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

          <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F2EC] tracking-wide font-light">
            {content.heading}
          </h2>
        </motion.div>

        {/* Sincere Letter Paragraphs */}
        <div className="space-y-4 max-w-sm mb-10">
          {content.letter.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + idx * 0.22 }}
              className="font-serif text-base sm:text-lg text-[#A7A39B] leading-relaxed font-light"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Emphasis Climax: Genuine & Zero Pressure */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-sm w-full"
        >
          <p className="font-serif text-xl sm:text-2xl text-[#F5F2EC] font-normal italic tracking-wide leading-relaxed whitespace-pre-line">
            {content.emphasis}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
