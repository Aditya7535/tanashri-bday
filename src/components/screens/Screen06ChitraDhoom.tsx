import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../../data/storyData';
import { Volume2, VolumeX } from 'lucide-react';

export const Screen06ChitraDhoom: React.FC = () => {
  const content = storyData.chapters.screen06;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-20 bg-[#080808] snap-start overflow-hidden">
      {/* Subtle burgundy accent ambient glow representing the turning point */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.45, scale: 1.1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full pointer-events-none blur-[90px] bg-[#581825]"
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

          <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F2EC] tracking-wide font-light">
            {content.heading}
          </h2>
        </motion.div>

        {/* Minimal Editorial Chat Interface */}
        <div className="w-full max-w-sm my-6 space-y-3 p-4 rounded-2xl bg-[#121212]/70 backdrop-blur-md border border-white/10 shadow-xl">
          {content.chatMessages.map((msg, idx) => {
            const isMe = msg.sender === 'me';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.45, ease: 'easeOut' }}
                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-sans tracking-wide leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-[#2A151B] text-[#F5F2EC] border border-[#581825]/60 rounded-br-xs text-right'
                      : 'bg-[#1E1E1E] text-[#E5E2DC] border border-white/10 rounded-bl-xs text-left'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Chitra Dhoom Video Scrapbook Card */}
        {content.video && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative group my-6 w-full max-w-[340px] sm:max-w-[370px] transform rotate-[-1deg] hover:rotate-0 transition-transform duration-700 select-none"
          >
            {/* Scrapbook Tape Accent */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-24 h-5 bg-white/[0.12] backdrop-blur-md border border-white/20 rounded-[1px] transform rotate-[1.5deg] pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 8px)',
              }}
            />

            {/* Frame Container */}
            <div className="relative p-3 pb-5 rounded-[4px] bg-[#141414]/95 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />

              {/* Video Player */}
              <div className="relative overflow-hidden rounded-[2px] bg-black aspect-[16/9] border border-black/80">
                <video
                  ref={videoRef}
                  src={content.video.src}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>

                {/* Subtle vignette shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Sound Toggle Button */}
                <button
                  type="button"
                  onClick={toggleAudio}
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  className="absolute bottom-2.5 right-2.5 z-30 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white/90 border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95 flex items-center space-x-1.5 text-[10px]"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 opacity-70" />
                      <span className="font-sans text-[10px] tracking-wider pr-0.5">Sound</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span className="font-sans text-[10px] text-emerald-300 tracking-wider pr-0.5">Playing</span>
                    </>
                  )}
                </button>
              </div>

              {/* Polaroid-style caption */}
              {content.video.caption && (
                <div className="mt-3 text-center">
                  <p className="font-handwriting text-base sm:text-lg text-[#F5F2EC]/90 leading-tight">
                    {content.video.caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* The Turning Point Emotional Climax */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 space-y-3"
        >
          <p className="font-serif text-sm tracking-widest text-[#A7A39B] uppercase">
            {content.turningPoint.lead}
          </p>

          <p className="font-serif text-2xl sm:text-3xl text-[#F5F2EC] font-normal italic tracking-wide">
            {content.turningPoint.climax}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
