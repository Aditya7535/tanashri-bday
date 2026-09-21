import React from 'react';
import { motion, Variants } from 'framer-motion';
import { storyData } from '../../data/storyData';
import { PhotoFrame } from '../PhotoFrame';

interface ScreenProps {
  onTriggerEasterEgg: (message: string) => void;
}

export const Screen02FirstTime: React.FC<ScreenProps> = ({ onTriggerEasterEgg }) => {
  const content = storyData.chapters.screen02;

  const sentenceVariants: Variants = {
    hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay: 0.2 + i * 0.22, ease: 'easeOut' },
    }),
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-24 bg-[#080808] snap-start overflow-hidden">
      {/* Warm cinematic ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full pointer-events-none opacity-25 blur-[100px] bg-[#581825]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/3 w-[260px] h-[260px] rounded-full pointer-events-none opacity-20 blur-[90px] bg-blue-900"
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
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#e5b3b9] uppercase font-semibold">
              {content.chapterNumber}
            </span>
            <span className="text-white/20 text-xs">—</span>
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#A7A39B] uppercase">
              {content.chapterTitle}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-[#F5F2EC] tracking-wide font-light">
            {content.heading}
          </h2>

          <div className="mt-3 flex items-center justify-center space-x-2.5">
            <span className="w-6 h-[1px] bg-white/20" />
            <p className="text-xs font-serif italic tracking-[0.25em] text-[#A7A39B] uppercase">
              {content.eventLabel}
            </p>
            <span className="w-6 h-[1px] bg-white/20" />
          </div>
        </motion.div>

        {/* Cinematic Scrapbook Photo Frame */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full mb-10 flex justify-center cursor-pointer"
          onClick={() => onTriggerEasterEgg(content.easterEgg)}
          title="Tap photo to reveal secret thought"
        >
          <PhotoFrame
            photo={content.photo}
            accentHint={true}
            tiltAngle={-1.5}
          />
        </motion.div>

        {/* Story Sentences inside an Editorial Memory Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full max-w-sm p-6 sm:p-7 rounded-2xl bg-[#121212]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 space-y-3.5 text-center relative overflow-hidden"
        >
          {/* Subtle top corner decoration */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {content.storyLines.map((line, idx) => {
            const isBlue = line.includes('blue');
            return (
              <motion.p
                key={idx}
                custom={idx}
                variants={sentenceVariants}
                onClick={
                  isBlue ? () => onTriggerEasterEgg(content.easterEgg) : undefined
                }
                className={`font-serif leading-relaxed ${
                  isBlue
                    ? 'text-lg sm:text-xl text-[#F5F2EC] font-normal cursor-pointer hover:text-blue-300 transition-colors inline-block'
                    : idx === 1
                    ? 'text-base sm:text-lg text-[#E5E2DC] font-light italic'
                    : idx === 4
                    ? 'text-lg sm:text-xl text-[#F5F2EC] font-normal pt-1'
                    : 'text-sm sm:text-base text-[#A7A39B]'
                }`}
              >
                {isBlue ? (
                  <span>
                    You were wearing{' '}
                    <span className="text-blue-300 font-medium underline underline-offset-4 decoration-blue-500/50">
                      blue
                    </span>
                    .
                  </span>
                ) : (
                  line
                )}
              </motion.p>
            );
          })}

          {/* Subtle handwritten footnote */}
          <div className="pt-3 border-t border-white/5">
            <span className="font-handwriting text-base text-[#A7A39B]/80 italic">
              — the memory that started it all
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
