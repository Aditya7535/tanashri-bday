import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../../data/storyData';

export const Screen08Canteen: React.FC = () => {
  const content = storyData.chapters.screen08;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-20 bg-[#080808] snap-start">
      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center">
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

          <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F2EC] tracking-wide font-light">
            {content.heading}
          </h2>
        </motion.div>

        {/* Lead Narrative */}
        <div className="space-y-2 mb-8 max-w-xs">
          {content.leadText.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.2 }}
              className="font-serif text-sm sm:text-base text-[#A7A39B]"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* The Awkward Confession */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="my-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-sm w-full space-y-3"
        >
          {content.awkwardness.map((line, idx) => (
            <p
              key={idx}
              className={`font-serif leading-relaxed ${
                idx === 0
                  ? 'text-base sm:text-lg text-[#F5F2EC] italic font-normal'
                  : 'text-sm text-[#A7A39B]'
              }`}
            >
              {line}
            </p>
          ))}
        </motion.div>

        {/* Visual Transition: Words slowly growing distant */}
        <div className="mt-12 space-y-6 w-full max-w-xs py-4">
          {content.fadeWords.map((word, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{
                opacity: 1 - idx * 0.28,
                letterSpacing: `${0.25 + idx * 0.2}em`,
              }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 1.4 + idx * 0.4 }}
              className="font-serif uppercase text-sm sm:text-base text-[#A7A39B] transition-all"
            >
              {word}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};
