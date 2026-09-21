import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../../data/storyData';
import { PhotoFrame } from '../PhotoFrame';
import { Heart, Sparkles } from 'lucide-react';

interface Screen07Props {
  onTriggerEasterEgg?: (message: string) => void;
}

export const Screen07Flowers: React.FC<Screen07Props> = ({ onTriggerEasterEgg }) => {
  const content = storyData.chapters.screen07;
  const [isNoteRevealed, setIsNoteRevealed] = useState(false);

  const handleNoteToggle = () => {
    const nextState = !isNoteRevealed;
    setIsNoteRevealed(nextState);
    if (nextState && onTriggerEasterEgg) {
      onTriggerEasterEgg("Secret Note: I'd cancel a hundred more meetings just to see that smile.");
    }
  };

  const handlePhotoClick = () => {
    if (onTriggerEasterEgg) {
      onTriggerEasterEgg("Secret Note: I ran all the way so the flowers wouldn't wilt.");
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-24 bg-[#080808] snap-start overflow-hidden">
      {/* Warm rose & amber ambient backlight */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full pointer-events-none opacity-25 blur-[110px] bg-[#581825]"
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

        {/* Schedule & Cancellation Text in Frosted Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-sm p-5 rounded-2xl bg-[#121212]/70 backdrop-blur-xl border border-white/10 shadow-xl space-y-2 mb-6"
        >
          {content.storyIntro.map((line, idx) => (
            <p
              key={idx}
              className={`font-serif leading-relaxed ${
                idx >= 4
                  ? 'text-base sm:text-lg text-[#F5F2EC] font-normal italic pt-1'
                  : 'text-xs sm:text-sm text-[#A7A39B]'
              }`}
            >
              {line}
            </p>
          ))}
        </motion.div>

        {/* Scrapbook Duo: Flowers & Chocolate Bowl */}
        <div className="w-full space-y-8 my-4">
          {/* Photo 1: The Flowers */}
          <motion.div
            onClick={handlePhotoClick}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex justify-center cursor-pointer group"
          >
            <PhotoFrame
              photo={content.photos.flowers}
              tiltAngle={-1.5}
              accentHint={true}
            />
          </motion.div>

          {/* Photo 2: The Chocolate Bowl */}
          {content.photos.chocolate.src && (
            <motion.div
              onClick={handlePhotoClick}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex justify-center cursor-pointer group"
            >
              <PhotoFrame
                photo={content.photos.chocolate}
                tiltAngle={1.8}
              />
            </motion.div>
          )}

          {/* Interactive Folded Secret Note Tucked with the Flowers */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full max-w-sm mx-auto"
          >
            <div
              onClick={handleNoteToggle}
              className={`relative cursor-pointer select-none transition-all duration-500 rounded-2xl p-5 border shadow-xl backdrop-blur-xl text-left ${
                isNoteRevealed
                  ? 'bg-gradient-to-br from-[#241317]/95 via-[#1b1013]/95 to-[#120d0f]/95 border-[#9a3248]/50 shadow-[0_15px_40px_rgba(88,24,37,0.4)]'
                  : 'bg-[#151515]/85 hover:bg-[#1a1718]/90 border-white/10 hover:border-[#e5b3b9]/30'
              }`}
            >
              {/* Scrapbook Tape Accent */}
              <div className="absolute -top-2.5 left-8 w-14 h-4 bg-white/[0.12] backdrop-blur-sm border border-white/20 rounded-[1px] transform -rotate-2 pointer-events-none" />

              {/* Note Header / Teaser Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="text-base sm:text-lg">💌</span>
                  <span className="font-serif italic text-xs sm:text-sm text-[#e5b3b9]">
                    {content.secretNote.teaser}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#A7A39B]/80 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-1">
                  <span>{isNoteRevealed ? 'Close' : 'Tap to unfold'}</span>
                </span>
              </div>

              {/* Unfolded Secret Handwritten Note */}
              <AnimatePresence>
                {isNoteRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-[#e5b3b9]/20 pt-3"
                  >
                    <p className="font-handwriting text-xl sm:text-2xl text-[#f7e6e8] leading-relaxed tracking-wide">
                      "{content.secretNote.note}"
                    </p>
                    <div className="mt-3 flex items-center justify-end space-x-1.5 text-xs text-[#e5b3b9]/70 font-handwriting">
                      <Sparkles className="w-3.5 h-3.5 text-[#e5b3b9]" />
                      <span>— someone who still remembers that day</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Ending Warm Sincere Resolution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="space-y-2 mt-8 max-w-sm"
        >
          {content.storyEnding.map((line, idx) => (
            <p
              key={idx}
              className={`font-serif leading-relaxed ${
                idx === 3
                  ? 'text-lg sm:text-xl text-[#F5F2EC] font-normal italic pt-2'
                  : 'text-sm sm:text-base text-[#E5E2DC]'
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
