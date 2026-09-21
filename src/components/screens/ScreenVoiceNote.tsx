import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../../data/storyData';
import { ambientSound } from '../../utils/soundSynth';
import { Play, Pause, Volume2, Sparkles, Mic, RotateCcw } from 'lucide-react';

interface ScreenVoiceNoteProps {
  onTriggerEasterEgg?: (message: string) => void;
}

export const ScreenVoiceNote: React.FC<ScreenVoiceNoteProps> = ({ onTriggerEasterEgg }) => {
  const content = storyData.chapters.screenVoiceNote;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(93.17); // 1:33
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Requirement: Duck current running background song to -10 to -15 dB on this page
  useEffect(() => {
    // Fade down background song to ~ -12 dB (volume ~0.13)
    ambientSound.duck(true, false);

    return () => {
      // Pause voice note if still playing on page exit
      if (audioRef.current) {
        audioRef.current.pause();
      }
      // Restore normal background song volume
      ambientSound.duck(false);
    };
  }, []);

  // Update ducking even deeper when voice note actively plays
  useEffect(() => {
    if (isPlaying) {
      // Extra dip to -15 dB so voice is crystal clear
      ambientSound.duck(true, true);
    } else {
      // Normal page ducking -12 dB
      ambientSound.duck(true, false);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Voice note playback error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * (duration || 93);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const togglePlaybackRate = () => {
    if (!audioRef.current) return;
    const nextRate = playbackRate === 1.0 ? 1.5 : playbackRate === 1.5 ? 2.0 : 1.0;
    audioRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTriggerSecret = () => {
    if (onTriggerEasterEgg) {
      onTriggerEasterEgg(content.easterEgg);
    }
  };

  // 36 stylized waveform amplitude heights
  const waveformHeights = [
    25, 45, 60, 30, 75, 90, 40, 65, 80, 50,
    95, 100, 70, 40, 85, 90, 60, 35, 70, 85,
    95, 80, 65, 40, 75, 90, 85, 55, 70, 45,
    80, 95, 60, 35, 50, 30,
  ];

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center px-6 py-20 bg-[#080808] snap-start overflow-hidden text-center select-none">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={content.audioSrc}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        {content.audioOggSrc && <source src={content.audioOggSrc} type="audio/ogg" />}
      </audio>

      {/* Ambient Breathing Wine & Warm Amber Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none opacity-30 blur-[130px] bg-[#581825]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full pointer-events-none opacity-20 blur-[100px] bg-[#d48b97]"
        aria-hidden="true"
      />

      <div className="max-w-md mx-auto w-full flex flex-col items-center relative z-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center space-x-2 mb-2.5">
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
          <p className="mt-2 text-xs sm:text-sm font-serif italic text-[#A7A39B] max-w-xs mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Centerpiece: Luxury Glassmorphic Voice Note Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm rounded-3xl p-6 bg-gradient-to-b from-[#161214]/95 via-[#120e10]/95 to-[#0b0809]/95 border border-[#e5b3b9]/25 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(88,24,37,0.35)] backdrop-blur-2xl relative my-3"
        >
          {/* Top Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/[0.12] backdrop-blur-md border border-white/20 rounded-[1px] transform -rotate-1 pointer-events-none" />

          {/* Player Header: Metadata badge */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#581825]/60 border border-[#9a3248]/40 flex items-center justify-center text-[#e5b3b9]">
                <Mic className="w-3 h-3" />
              </span>
              <span className="font-sans text-[11px] tracking-wider text-[#F5F2EC]/90 font-medium">
                {content.dateLabel}
              </span>
            </div>

            {/* Playback speed toggle */}
            <button
              type="button"
              onClick={togglePlaybackRate}
              className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-sans font-semibold text-[#e5b3b9] tracking-wider transition-all"
              title="Change playback speed"
            >
              {playbackRate}x
            </button>
          </div>

          {/* Waveform Scrubber Visualizer */}
          <div
            onClick={handleSeek}
            className="py-6 cursor-pointer group select-none flex items-center justify-between gap-[3px] h-18"
            title="Tap along waveform to seek"
          >
            {waveformHeights.map((heightPercent, idx) => {
              const barProgress = (idx / waveformHeights.length) * 100;
              const hasPlayed = barProgress <= progressPercent;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col justify-center items-center h-full"
                >
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-full transition-all duration-150 ${
                      hasPlayed
                        ? 'bg-gradient-to-t from-[#9a3248] to-[#f5d6dc] shadow-[0_0_8px_rgba(229,179,185,0.7)]'
                        : 'bg-white/15 group-hover:bg-white/25'
                    } ${isPlaying && hasPlayed ? 'animate-pulse' : ''}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Time Progress Bar & Controls */}
          <div className="space-y-4">
            {/* Scrubber track line */}
            <div
              onClick={handleSeek}
              className="relative w-full h-1.5 bg-white/10 hover:h-2 rounded-full cursor-pointer transition-all overflow-hidden"
            >
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-[#581825] via-[#9a3248] to-[#e5b3b9] rounded-full transition-all duration-100"
              />
            </div>

            {/* Timing row */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#A7A39B]/80 px-1">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[#e5b3b9]/70 font-sans tracking-widest text-[10px] uppercase">
                {isPlaying ? 'Playing for you...' : 'Tap play to listen'}
              </span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Big Circular Luxury Play/Pause Button */}
            <div className="pt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
                className="relative group w-16 h-16 rounded-full bg-gradient-to-br from-[#7a2234] via-[#581825] to-[#2c0b13] border-2 border-[#e5b3b9]/50 shadow-[0_8px_30px_rgba(88,24,37,0.7),inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center text-[#f5e6e8] active:scale-95 transition-all duration-300"
              >
                {/* Outer Breathing Ripple Ring when playing */}
                {isPlaying && (
                  <motion.div
                    animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full border border-[#e5b3b9]/60 pointer-events-none"
                  />
                )}

                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current text-[#f5e6e8]" />
                ) : (
                  <Play className="w-6 h-6 fill-current text-[#f5e6e8] ml-1" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Story Sentences */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-sm p-5 rounded-2xl bg-[#121212]/60 backdrop-blur-xl border border-white/10 shadow-xl space-y-2 mt-4"
        >
          {content.storyLines.map((line, idx) => (
            <p
              key={idx}
              className={`font-serif leading-relaxed ${
                idx === 3
                  ? 'text-base sm:text-lg text-[#F5F2EC] font-normal italic pt-1'
                  : 'text-xs sm:text-sm text-[#A7A39B]'
              }`}
            >
              {line}
            </p>
          ))}
        </motion.div>

        {/* Handwritten Secret Thought */}
        <motion.div
          onClick={handleTriggerSecret}
          initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
          whileInView={{ opacity: 1, rotate: -1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 px-5 py-3 rounded-xl bg-[#161214]/90 border border-white/10 shadow-lg relative transform -rotate-1 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          title="Tap for secret thought"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/10 rounded-[1px]" />
          <p className="font-handwriting text-xl sm:text-2xl text-[#f3d1d7] tracking-wide">
            "{content.handwrittenThought}"
          </p>
          <div className="flex items-center justify-end space-x-1 mt-1 text-[11px] font-handwriting text-[#e5b3b9]/60">
            <Sparkles className="w-3 h-3 text-[#e5b3b9]" />
            <span>tap to whisper</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
