import React, { useState, useEffect } from 'react';
import { ambientSound } from '../utils/soundSynth';
import { storyData } from '../data/storyData';
import { VolumeX } from 'lucide-react';

const STORAGE_KEY = 'tanashri_bday_music_pref';

interface MusicControlProps {
  currentPage?: number;
}

export const MusicControl: React.FC<MusicControlProps> = ({ currentPage = 0 }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Subscribe to audio engine's live playing state
  useEffect(() => {
    const unsubscribe = ambientSound.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const currentTrack = storyData.chapterAudios[currentPage] || {
    songTitle: 'Ambient Melody',
    filePath: storyData.audio.filePath,
  };

  const toggleMusic = () => {
    if (isPlaying) {
      ambientSound.pause();
      localStorage.setItem(STORAGE_KEY, 'disabled');
    } else {
      ambientSound.play(currentTrack.filePath, currentPage);
      localStorage.setItem(STORAGE_KEY, 'enabled');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 max-w-[calc(100vw-2rem)]">
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? 'Pause background soundtrack' : 'Play background soundtrack'}
        className="group flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#121212]/85 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-300 text-xs text-[#A7A39B] hover:text-[#F5F2EC] shadow-lg shadow-black/60 active:scale-95"
      >
        {/* Equalizer Icon or Muted Icon */}
        <span className="flex items-center justify-center w-4 h-4 text-[#A7A39B] group-hover:text-[#F5F2EC]">
          {isPlaying ? (
            <span className="flex items-end space-x-[2px] h-3.5">
              <span className="w-[2px] h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="w-[2px] h-2 bg-emerald-400 rounded-full animate-pulse [animation-delay:150ms]" />
              <span className="w-[2px] h-3.5 bg-emerald-400 rounded-full animate-pulse [animation-delay:300ms]" />
            </span>
          ) : (
            <VolumeX className="w-3.5 h-3.5 opacity-60" />
          )}
        </span>

        {/* Active Song / Page Label */}
        <span className="font-sans text-[11px] tracking-wider truncate max-w-[130px] sm:max-w-[180px]">
          {isPlaying ? (
            <span className="text-[#F5F2EC]/90">
              ♪ <span className="text-white font-medium">{currentTrack.songTitle}</span>
            </span>
          ) : (
            <span className="text-[#fce7ea]/80 animate-pulse font-medium">
              ♪ Tap for music 🎧
            </span>
          )}
        </span>

        {/* Status indicator pip */}
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            isPlaying ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-white/20'
          }`}
        />
      </button>
    </div>
  );
};
