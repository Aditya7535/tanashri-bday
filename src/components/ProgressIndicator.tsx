import React from 'react';

interface ProgressIndicatorProps {
  currentChapter: number;
  totalChapters: number;
  chapterTitle?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentChapter,
  totalChapters,
  chapterTitle,
}) => {
  // If at intro (chapter 0), keep indicator very subtle or hidden
  const displayChapter = Math.min(Math.max(currentChapter, 1), totalChapters);
  const formattedCurrent = displayChapter.toString().padStart(2, '0');
  const formattedTotal = totalChapters.toString().padStart(2, '0');
  const progressPercent = (displayChapter / totalChapters) * 100;

  return (
    <div
      className={`fixed top-5 left-5 z-40 flex items-center space-x-3 pointer-events-none transition-opacity duration-700 ${
        currentChapter === 0 ? 'opacity-0' : 'opacity-90'
      }`}
    >
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#121212]/80 backdrop-blur-md border border-white/10 text-xs text-[#A7A39B] shadow-lg shadow-black/40">
        <span className="font-serif text-[13px] text-[#F5F2EC] tracking-widest font-medium">
          {formattedCurrent}
        </span>
        <span className="text-white/20 text-[10px]">/</span>
        <span className="text-[11px] tracking-wider text-[#A7A39B]/70">
          {formattedTotal}
        </span>

        {chapterTitle && (
          <>
            <span className="w-1 h-1 rounded-full bg-white/20 mx-1 hidden sm:inline-block" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#A7A39B] font-sans truncate max-w-[120px] hidden sm:inline-block">
              {chapterTitle}
            </span>
          </>
        )}
      </div>

      {/* Micro progress line */}
      <div className="w-8 h-[2px] bg-white/10 rounded-full overflow-hidden hidden xs:block">
        <div
          className="h-full bg-gradient-to-r from-[#581825] to-[#F5F2EC]/60 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
