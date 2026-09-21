import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../../data/storyData';
import { AmbientParticles } from '../AmbientParticles';

export const Screen12Birthday: React.FC = () => {
  const content = storyData.chapters.screen12;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-24 bg-gradient-to-b from-[#080808] via-[#150a0e] to-[#0d0709] snap-start overflow-hidden text-center select-none">
      {/* Subtle Floating Ambient Firefly Particles */}
      <AmbientParticles />

      {/* Warm Rose & Wine Luminous Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 blur-[110px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(140, 38, 56, 0.4) 0%, rgba(88, 24, 37, 0.15) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-md mx-auto w-full flex flex-col items-center relative z-20">
        {/* Subtle Label */}
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[11px] font-sans tracking-[0.35em] text-[#e5b3b9] uppercase font-semibold mb-6 block"
        >
          Special Day
        </motion.span>

        {/* Happy Birthday Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.25em] text-[#F5F2EC] font-light uppercase mb-10"
        >
          {content.heading}
        </motion.h2>

        {/* The Names Staggered Reveal */}
        <div className="space-y-3 mb-10">
          {content.names.map((name, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + idx * 0.35 }}
              className={`font-serif tracking-widest ${
                idx === 0
                  ? 'text-2xl sm:text-3xl text-[#F5F2EC] font-normal'
                  : idx === 1
                  ? 'text-xl sm:text-2xl text-[#e5b3b9] font-light italic'
                  : 'text-lg sm:text-xl text-[#A7A39B] font-light'
              }`}
            >
              {name}
            </motion.p>
          ))}
        </div>

        {/* Conclusion Warmth */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 1.7 }}
          className="max-w-xs mt-4"
        >
          <p className="font-serif text-base sm:text-lg text-[#E5E2DC] leading-relaxed italic whitespace-pre-line">
            {content.conclusion}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
