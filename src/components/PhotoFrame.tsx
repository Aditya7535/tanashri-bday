import React, { useState } from 'react';
import { PhotoConfig } from '../data/storyData';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

interface PhotoFrameProps {
  photo: PhotoConfig;
  className?: string;
  onClick?: () => void;
  accentHint?: boolean;
  tiltAngle?: number; // e.g. -1.5 or 1
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  photo,
  className = '',
  onClick,
  accentHint = false,
  tiltAngle = -1.2,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Aspect ratio classes based on orientation
  const aspectClass =
    photo.orientation === 'portrait'
      ? 'aspect-[3/4] w-full'
      : photo.orientation === 'landscape'
      ? 'aspect-[4/3] w-full'
      : 'aspect-square w-full';

  return (
    <div
      onClick={onClick}
      style={{ transform: `rotate(${tiltAngle}deg)` }}
      className={`relative group mx-auto w-full max-w-[310px] sm:max-w-[350px] transition-all duration-700 ease-out hover:rotate-0 hover:scale-[1.02] cursor-pointer select-none ${className}`}
    >
      {/* Warm ambient backlight / glow behind the frame */}
      <div
        className={`absolute -inset-4 rounded-3xl opacity-50 blur-2xl transition-opacity duration-700 pointer-events-none group-hover:opacity-80 ${
          accentHint
            ? 'bg-gradient-to-tr from-[#581825]/40 via-blue-900/25 to-[#581825]/30'
            : 'bg-gradient-to-tr from-[#581825]/30 via-white/[0.04] to-[#581825]/20'
        }`}
        aria-hidden="true"
      />

      {/* Scrapbook Tape Accent at top */}
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 w-24 h-6 bg-white/[0.12] backdrop-blur-md border border-white/20 shadow-sm rounded-[1px] transform rotate-[1.5deg] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 8px)',
        }}
      />

      {/* Luxury Editorial Matte Frame (Scrapbook card) */}
      <div className="relative z-10 w-full p-3 sm:p-4 pb-5 sm:pb-7 rounded-[4px] bg-[#141414]/95 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 group-hover:border-white/25">
        
        {/* Subtle photo frame corner brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />

        {/* Inner Photo Container */}
        <div className={`relative overflow-hidden rounded-[2px] bg-[#0c0c0c] border border-black/80 ${aspectClass}`}>
          {photo.src ? (
            <>
              {/* Shimmer skeleton while loading */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
              )}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.03] ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Gentle warm film tone overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Interactive subtle tap icon badge */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-white/80 flex items-center space-x-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-2.5 h-2.5 text-[#e5b3b9]" />
                <span className="font-sans tracking-wider">Secret Note</span>
              </div>
            </>
          ) : (
            /* Photographic Placeholder */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-[#181818] to-[#101010] relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)',
                  backgroundSize: '12px 12px',
                }}
              />

              <div className="relative z-10 flex flex-col items-center space-y-2">
                <span className="p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-[#A7A39B] group-hover:text-white transition-colors">
                  <ImageIcon className="w-5 h-5 stroke-[1.2]" />
                </span>

                {photo.placeholderTitle && (
                  <h4 className="font-serif text-base sm:text-lg text-[#F5F2EC] tracking-wider font-light mt-1">
                    {photo.placeholderTitle}
                  </h4>
                )}

                {photo.placeholderSubtitle && (
                  <p className="font-sans text-[10px] tracking-widest uppercase text-[#A7A39B]/70">
                    {photo.placeholderSubtitle}
                  </p>
                )}

                <span className="text-[10px] tracking-wider text-white/35 italic pt-2 font-serif">
                  [ Tap to reveal secret thought ]
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Handwritten Polaroid-style caption underneath photo */}
        {photo.caption && (
          <div className="mt-3 sm:mt-3.5 px-1 text-center">
            <p className="font-handwriting text-base sm:text-lg text-[#F5F2EC]/90 leading-snug tracking-wide">
              {photo.caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
