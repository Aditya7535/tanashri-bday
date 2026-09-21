import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import { FilmGrain } from './components/FilmGrain';
import { LoadingScreen } from './components/LoadingScreen';
import { MusicControl } from './components/MusicControl';
import { ProgressIndicator } from './components/ProgressIndicator';
import { PageControls } from './components/PageControls';
import { EasterEggToast } from './components/EasterEggToast';
import { ambientSound } from './utils/soundSynth';
import { storyData } from './data/storyData';

// Screens
import { Screen01Intro } from './components/screens/Screen01Intro';
import { Screen02FirstTime } from './components/screens/Screen02FirstTime';
import { Screen03Atrangi } from './components/screens/Screen03Atrangi';
import { Screen04EyeContact } from './components/screens/Screen04EyeContact';
import { Screen05Lohri } from './components/screens/Screen05Lohri';
import { Screen06ChitraDhoom } from './components/screens/Screen06ChitraDhoom';
import { Screen07Flowers } from './components/screens/Screen07Flowers';
import { Screen08Canteen } from './components/screens/Screen08Canteen';
import { Screen09Silence } from './components/screens/Screen09Silence';
import { Screen10TheCall } from './components/screens/Screen10TheCall';
import { Screen11Know } from './components/screens/Screen11Know';
import { Screen12Birthday } from './components/screens/Screen12Birthday';
import { ScreenVoiceNote } from './components/screens/ScreenVoiceNote';
import { Screen13Final } from './components/screens/Screen13Final';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);

  const totalPages = 14;

  const chapterTitles = [
    'Introduction',
    'The First Time',
    'Atrangi',
    'Eye Contact',
    'Lohri',
    'Dhoom Chitar',
    'The Flowers',
    'The Canteen',
    'The Silence',
    'The Call',
    'To Know',
    'Birthday',
    'From Me To You',
    'End',
  ];

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    setCurrentPage(0);
  };

  // Automatically start playback immediately when website opens without asking for permission
  useEffect(() => {
    ambientSound.startAutoPlay(storyData.chapterAudios[0]?.filePath, 0);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        setEasterEggMessage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading]);

  // Handle Easter egg notifications
  const handleTriggerEasterEgg = (message: string) => {
    setEasterEggMessage(message);
    setTimeout(() => {
      setEasterEggMessage((prev) => (prev === message ? null : prev));
    }, 5000);
  };

  // Render the currently selected screen
  const renderCurrentScreen = () => {
    switch (currentPage) {
      case 0:
        return <Screen01Intro onStart={handleNextPage} />;
      case 1:
        return <Screen02FirstTime onTriggerEasterEgg={handleTriggerEasterEgg} />;
      case 2:
        return <Screen03Atrangi />;
      case 3:
        return <Screen04EyeContact onTriggerEasterEgg={handleTriggerEasterEgg} />;
      case 4:
        return <Screen05Lohri onTriggerEasterEgg={handleTriggerEasterEgg} />;
      case 5:
        return <Screen06ChitraDhoom />;
      case 6:
        return <Screen07Flowers onTriggerEasterEgg={handleTriggerEasterEgg} />;
      case 7:
        return <Screen08Canteen />;
      case 8:
        return <Screen09Silence />;
      case 9:
        return <Screen10TheCall />;
      case 10:
        return <Screen11Know />;
      case 11:
        return <Screen12Birthday />;
      case 12:
        return <ScreenVoiceNote onTriggerEasterEgg={handleTriggerEasterEgg} />;
      case 13:
        return <Screen13Final onScrollToTop={handleRestart} />;
      default:
        return <Screen01Intro onStart={handleNextPage} />;
    }
  };

  // Synchronize audio track with active page
  useEffect(() => {
    if (isLoading) return;
    const track = storyData.chapterAudios[currentPage];
    ambientSound.switchPageTrack(track?.filePath, currentPage);
  }, [currentPage, isLoading]);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F5F2EC] selection:bg-[#581825] selection:text-white">
      {/* Film Grain & Vignette Overlay */}
      <FilmGrain />

      {/* Initial Cinematic Loader */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Floating Header Controls */}
      {!isLoading && (
        <>
          <ProgressIndicator
            currentChapter={currentPage}
            totalChapters={totalPages - 1}
            chapterTitle={chapterTitles[currentPage]}
          />
          <MusicControl currentPage={currentPage} />
          <EasterEggToast
            message={easterEggMessage}
            onClose={() => setEasterEggMessage(null)}
          />

          {/* Bottom Page Shifting Navigation Bar - only active from Chapter 1 onwards */}
          {currentPage > 0 && (
            <PageControls
              currentPage={currentPage}
              totalPages={totalPages}
              chapterTitle={chapterTitles[currentPage]}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              onRestart={handleRestart}
            />
          )}
        </>
      )}

      {/* Main Page Viewport */}
      <main className={`relative mx-auto w-full max-w-[480px] lg:max-w-[540px] xl:max-w-[580px] min-h-screen bg-[#080808] sm:border-x sm:border-white/[0.05] sm:shadow-[0_0_100px_rgba(0,0,0,0.9)] ${currentPage > 0 ? 'pb-24' : ''}`}>
        {!isLoading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {renderCurrentScreen()}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default App;
