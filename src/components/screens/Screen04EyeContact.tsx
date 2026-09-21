import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../../data/storyData';

interface ScreenProps {
  onTriggerEasterEgg: (message: string) => void;
}

export const Screen04EyeContact: React.FC<ScreenProps> = ({ onTriggerEasterEgg }) => {
  const content = storyData.chapters.screen04;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-24 bg-[#050505] snap-start select-none">
      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center">
        {/* Minimal Chapter Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#581825] uppercase font-semibold">
              {content.chapterNumber}
            </span>
            <span className="text-white/20 text-xs">—</span>
            <span className="text-[11px] font-sans tracking-[0.25em] text-[#A7A39B] uppercase">
              {content.chapterTitle}
            </span>
          </div>
        </motion.div>

        {/* Playful Minimal Sequential Typography */}
        <div className="space-y-6 w-full py-4">
          {content.sequence.map((item, idx) => {
            const isPause = item.toLowerCase() === 'pause';
            return isPause ? (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 0.4, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 + idx * 0.3 }}
                className="h-4 flex items-center justify-center"
              >
                <span className="text-[11px] font-serif italic text-white/20 tracking-widest">
                  ···
                </span>
              </motion.div>
            ) : (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.3 }}
                className={`font-serif tracking-widest lowercase ${
                  item.includes('pretend')
                    ? 'text-lg sm:text-xl text-[#A7A39B]'
                    : 'text-2xl sm:text-3xl text-[#F5F2EC] font-light'
                }`}
              >
                {item}
              </motion.p>
            );
          })}
        </div>

        {/* Interactive Eye Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 2.8, type: 'spring', stiffness: 220 }}
          onClick={() => onTriggerEasterEgg(content.easterEgg)}
          title="Tap me"
          className="my-10 cursor-pointer p-4 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition-all transform hover:scale-110 active:scale-95"
        >
          <span className="text-3xl filter drop-shadow-md select-none">{content.icon}</span>
        </motion.div>

        {/* Punchline Resolution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 3.2 }}
          className="space-y-1.5"
        >
          {content.resolution.map((line, idx) => (
            <p
              key={idx}
              className={`font-serif tracking-wide ${
                idx === 1
                  ? 'text-xl sm:text-2xl text-[#F5F2EC] font-normal italic'
                  : 'text-lg text-[#A7A39B]'
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
