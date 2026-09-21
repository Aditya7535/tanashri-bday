import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../../data/storyData';
import { PhotoFrame } from '../PhotoFrame';

interface ScreenProps {
  onTriggerEasterEgg: (message: string) => void;
}

export const Screen05Lohri: React.FC<ScreenProps> = ({ onTriggerEasterEgg }) => {
  const content = storyData.chapters.screen05;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-20 bg-[#080808] snap-start overflow-hidden">
      {/* Warm subtle amber festival ember glow in background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(220,110,40,0.35) 0%, rgba(88,24,37,0.2) 60%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-md mx-auto w-full flex flex-col items-center text-center relative z-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mb-6"
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
        </motion.div>

        {/* Lohri Night Photo Frame */}
        {content.photo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full my-4 flex justify-center cursor-pointer"
            onClick={() => onTriggerEasterEgg(content.easterEgg)}
            title="Tap to reveal thought"
          >
            <PhotoFrame
              photo={content.photo}
              tiltAngle={1.2}
            />
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="my-3 text-sm sm:text-base font-serif italic text-[#A7A39B]"
        >
          {content.subHeading}
        </motion.p>

        {/* Stylized Instagram Notification Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onTriggerEasterEgg(content.easterEgg)}
          title="Tap notification"
          className="w-full max-w-sm my-6 p-4 rounded-2xl bg-[#181818]/90 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80 flex items-center space-x-3.5 text-left cursor-pointer transition-all hover:border-white/30 active:scale-[0.98]"
        >
          {/* Instagram Icon gradient container */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center shrink-0 shadow-md">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-semibold text-[#F5F2EC] tracking-wide">
                {content.notification.app}
              </span>
              <span className="text-[10px] text-[#A7A39B]/70">
                {content.notification.time}
              </span>
            </div>
            <p className="text-xs text-[#E5E2DC] truncate">
              <span className="font-semibold text-white">
                {content.notification.user}
              </span>{' '}
              {content.notification.action}
            </p>
          </div>
        </motion.div>

        {/* Humorous & Genuine Aftermath Sentences */}
        <div className="space-y-3 max-w-xs mt-2">
          {content.aftermath.map((line, idx) => {
            const isHi = line.includes('“Hi”');
            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.9 + idx * 0.25 }}
                className={`font-serif leading-relaxed ${
                  isHi
                    ? 'text-3xl sm:text-4xl text-[#F5F2EC] font-normal tracking-wider py-1 font-serif'
                    : idx === 3
                    ? 'text-base sm:text-lg text-[#F5F2EC] italic'
                    : 'text-base text-[#A7A39B]'
                }`}
              >
                {line}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  );
};
