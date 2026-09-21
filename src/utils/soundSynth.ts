/**
 * Ambient & Multi-Track Audio Engine
 * Instant, Zero-Latency, Single-Stream Audio
 * Uses DOM-preloaded audio element for instant playback on first user touch.
 */

type AudioStateListener = (isPlaying: boolean, chapterIndex: number) => void;

class AmbientSoundEngine {
  private audioElement: HTMLAudioElement | null = null;
  private currentTrackPath: string = '/audio/00_intro.mp3';
  private currentChapterIndex: number = 0;
  private isEnabled: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();
  private hasInstalledGestureListener: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Install immediate gesture listeners on window so the very first touch starts audio instantly
      this.installGestureListener();
    }
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isEnabled, this.currentChapterIndex);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isEnabled, this.currentChapterIndex));
  }

  // Get or initialize the persistent preloaded audio element
  private getAudio(): HTMLAudioElement {
    if (!this.audioElement && typeof document !== 'undefined') {
      const existing = document.getElementById('global-bg-audio') as HTMLAudioElement;
      if (existing) {
        this.audioElement = existing;
      } else {
        const created = new Audio();
        created.id = 'global-bg-audio';
        created.src = this.currentTrackPath;
        created.preload = 'auto';
        created.loop = true;
        created.volume = 0.55;
        (created as any).playsInline = true;
        document.body.appendChild(created);
        this.audioElement = created;
      }

      this.audioElement.volume = 0.55;
      this.audioElement.muted = false;
      this.audioElement.loop = true;

      this.audioElement.onplay = () => {
        this.isEnabled = true;
        this.notify();
      };

      this.audioElement.onpause = () => {
        this.isEnabled = false;
        this.notify();
      };
    }
    return this.audioElement!;
  }

  // Global touch / click listener that guarantees instant unblock on mobile Safari & Android Chrome
  public installGestureListener() {
    if (this.hasInstalledGestureListener || typeof window === 'undefined') return;
    this.hasInstalledGestureListener = true;

    const triggerPlay = () => {
      const audio = this.getAudio();
      if (audio && audio.paused) {
        audio.play().then(() => {
          this.isEnabled = true;
          this.notify();
          // Remove listener once successfully playing
          ['touchstart', 'touchend', 'pointerdown', 'click', 'keydown'].forEach((ev) => {
            window.removeEventListener(ev, triggerPlay);
            document.removeEventListener(ev, triggerPlay);
          });
        }).catch(() => {
          // Keep listening until user gesture is recognized
        });
      }
    };

    ['touchstart', 'touchend', 'pointerdown', 'click', 'keydown'].forEach((ev) => {
      window.addEventListener(ev, triggerPlay, { passive: true });
      document.addEventListener(ev, triggerPlay, { passive: true });
    });
  }

  // Synchronous, zero-latency play method
  public play(trackPath: string = '/audio/00_intro.mp3', chapterIndex: number = 0) {
    this.currentChapterIndex = chapterIndex;
    const audio = this.getAudio();
    if (!audio) return;

    // If already playing this track, don't restart or delay!
    if (!audio.paused && this.currentTrackPath === trackPath) {
      this.isEnabled = true;
      this.notify();
      return;
    }

    // Switch track if different
    if (this.currentTrackPath !== trackPath) {
      this.currentTrackPath = trackPath;
      audio.src = trackPath;
    }

    audio.muted = false;
    audio.volume = this.baseVolume;

    // Synchronous native play call inside the execution stack
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isEnabled = true;
          this.notify();
        })
        .catch((err) => {
          console.warn('Audio waiting for first user touch gesture...', err);
        });
    }
  }

  // Auto-play attempt on page load
  public startAutoPlay(trackPath: string = '/audio/00_intro.mp3', chapterIndex: number = 0) {
    this.currentChapterIndex = chapterIndex;
    this.currentTrackPath = trackPath;
    this.getAudio(); // ensure audio element is ready and buffered
    this.play(trackPath, chapterIndex);
  }

  private baseVolume: number = 0.55;
  private fadeInterval: any = null;

  // Smoothly ramp volume between levels (e.g. -10 to -15 dB)
  public setVolume(targetVol: number, durationMs: number = 500) {
    const audio = this.getAudio();
    if (!audio) return;

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    const startVol = audio.volume;
    const steps = 20;
    const stepTime = durationMs / steps;
    const stepDiff = (targetVol - startVol) / steps;
    let currentStep = 0;

    this.fadeInterval = setInterval(() => {
      currentStep++;
      const nextVol = Math.max(0, Math.min(1, startVol + stepDiff * currentStep));
      audio.volume = nextVol;

      if (currentStep >= steps) {
        audio.volume = targetVol;
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, stepTime);
  }

  // Duck background music to -10 to -15 dB (volume ~0.13)
  public duck(isDucked: boolean, extraDuck: boolean = false) {
    if (isDucked) {
      // -10 to -15 dB ducking
      this.setVolume(extraDuck ? 0.07 : 0.13, 550);
    } else {
      // Restore standard volume
      this.setVolume(this.baseVolume, 700);
    }
  }

  // Smooth switch when page changes
  public switchPageTrack(trackPath?: string, chapterIndex: number = 0) {
    this.currentChapterIndex = chapterIndex;
    this.notify();

    if (!trackPath || !this.isEnabled) {
      return;
    }

    const audio = this.getAudio();
    if (!audio) return;

    // If same track is already playing (e.g. Earrings across chapters), keep playing seamlessly!
    if (!audio.paused && this.currentTrackPath === trackPath) {
      return;
    }

    // Check if new track exists before switching
    const testAudio = new Audio();
    testAudio.src = trackPath;
    testAudio.oncanplay = () => {
      testAudio.oncanplay = null;
      testAudio.onerror = null;
      this.play(trackPath, chapterIndex);
    };
    testAudio.onerror = () => {
      testAudio.oncanplay = null;
      testAudio.onerror = null;
      // Keep current song playing if new chapter track doesn't exist
    };
  }

  public pause() {
    this.isEnabled = false;
    this.notify();
    const audio = this.getAudio();
    if (audio) {
      audio.pause();
    }
  }

  public toggle(trackPath?: string, chapterIndex: number = 0) {
    const audio = this.getAudio();
    if (!audio) return;

    if (!audio.paused) {
      this.pause();
    } else {
      this.play(trackPath || this.currentTrackPath, chapterIndex);
    }
  }

  public getIsPlaying(): boolean {
    const audio = this.getAudio();
    return audio ? !audio.paused : false;
  }

  public getCurrentChapterIndex(): number {
    return this.currentChapterIndex;
  }
}

export const ambientSound = new AmbientSoundEngine();
