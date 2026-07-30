import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2 as VolIcon,
  VolumeX as VolMuteIcon,
  Music as MusicIcon,
  Sparkles as SparklesIcon,
  Play as PlayIcon,
} from 'lucide-react';
import { AppConfig } from '../types';

interface Props {
  config: AppConfig;
}

/**
 * Resolves Google Drive audio share links or direct links into candidate streaming audio URLs.
 */
export const getAudioStreamCandidates = (url: string): string[] => {
  if (!url) return [];
  const trimmed = url.trim();

  let fileId: string | null = null;
  const match1 = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1 && match1[1]) fileId = match1[1];

  const match2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (!fileId && match2 && match2[1]) fileId = match2[1];

  const match3 = trimmed.match(/\/uc\?id=([a-zA-Z0-9_-]+)/);
  if (!fileId && match3 && match3[1]) fileId = match3[1];

  if (fileId) {
    return [
      `https://lh3.googleusercontent.com/d/${fileId}`,
      `https://docs.google.com/uc?export=download&id=${fileId}`,
      `https://drive.google.com/uc?id=${fileId}&export=download`,
    ];
  }

  return [trimmed];
};

const FALLBACK_ROMANTIC_MP3 =
  'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3';

export const BackgroundMusic: React.FC<Props> = ({ config }) => {
  // Hardcoded music URL from config or Google Drive link
  const primaryUrl = config.musicUrl || 'https://intelligent-jade-izjvhzrk.edgeone.dev';
  const songTitle = config.musicTitle || 'Tum Se Hi 💕';

  const [audioSources, setAudioSources] = useState<string[]>(() => [
    ...getAudioStreamCandidates(primaryUrl),
    'https://intelligent-jade-izjvhzrk.edgeone.dev',
    FALLBACK_ROMANTIC_MP3,
  ]);
  const [currentSourceIndex, setCurrentSourceIndex] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const [useSynthFallback, setUseSynthFallback] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<any>(null);

  // Soft Web Audio API romantic melody fallback if external network audio is unreachable
  const startSynthMelody = () => {
    try {
      if (!synthCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        synthCtxRef.current = new AudioCtx();
      }

      if (synthCtxRef.current.state === 'suspended') {
        synthCtxRef.current.resume();
      }

      const notes = [261.63, 329.63, 392.0, 523.25, 440.0, 349.23, 293.66, 392.0];
      let noteIdx = 0;

      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);

      synthIntervalRef.current = setInterval(() => {
        if (!synthCtxRef.current || isMuted) return;

        const osc = synthCtxRef.current.createOscillator();
        const gain = synthCtxRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], synthCtxRef.current.currentTime);

        gain.gain.setValueAtTime(0.08, synthCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, synthCtxRef.current.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(synthCtxRef.current.destination);

        osc.start();
        osc.stop(synthCtxRef.current.currentTime + 1.2);

        noteIdx++;
      }, 700);

      setUseSynthFallback(true);
      setIsPlaying(true);
      setUserInteracted(true);
    } catch (e) {
      console.log('Synth error', e);
    }
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    setUseSynthFallback(false);
  };

  const safePlayAudio = async () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.volume = 0.85;
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        await promise;
        setIsPlaying(true);
        setUserInteracted(true);
        stopSynthMelody();
      }
    } catch (err: unknown) {
      // Browser blocked autoplay or audio source loading
      setIsPlaying(false);
    }
  };

  const handleAudioError = () => {
    if (currentSourceIndex < audioSources.length - 1) {
      setCurrentSourceIndex((prev) => prev + 1);
    } else {
      startSynthMelody();
    }
  };

  const handleUserGesture = () => {
    if (!isPlaying) {
      if (useSynthFallback) {
        startSynthMelody();
      } else {
        safePlayAudio();
      }
    }
  };

  const togglePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      stopSynthMelody();
      setIsPlaying(false);
    } else {
      if (useSynthFallback) {
        startSynthMelody();
      } else {
        safePlayAudio();
      }
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  useEffect(() => {
    // Attempt playback immediately on load
    safePlayAudio();

    // Attach listeners so ANY click/tap/scroll anywhere automatically unlocks audio playback
    const handleGesture = () => {
      safePlayAudio();
    };

    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('scroll', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('scroll', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, []);

  const currentAudioSrc = audioSources[currentSourceIndex] || FALLBACK_ROMANTIC_MP3;

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      {!useSynthFallback && (
        <audio
          ref={audioRef}
          src={currentAudioSrc}
          loop
          autoPlay
          playsInline
          preload="auto"
          onError={handleAudioError}
          onPlay={() => {
            setIsPlaying(true);
            setUserInteracted(true);
          }}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Song Indicator Badge in Top Right */}
      <div className="fixed top-3 right-3 z-50">
        <motion.button
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={togglePlayPause}
          className="bg-white/95 backdrop-blur-md border-2 border-[#F06292]/40 shadow-xl rounded-full px-3.5 py-1.5 flex items-center gap-2.5 text-[#744F4F] hover:scale-105 transition-all cursor-pointer"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <div
            className={`p-1.5 rounded-full text-white shadow-sm flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-gradient-to-r from-[#F06292] to-[#D81B60]'
                : 'bg-slate-400 animate-pulse'
            }`}
          >
            {isPlaying ? (
              <MusicIcon className="w-3.5 h-3.5" />
            ) : (
              <PlayIcon className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </div>

          <div className="flex flex-col text-left truncate max-w-[130px] sm:max-w-[180px]">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#D81B60] flex items-center gap-1">
              <span>{isPlaying ? 'Background Music' : 'Tap To Play'}</span>
              <SparklesIcon className="w-2.5 h-2.5 text-[#F06292]" />
            </span>
            <span className="text-xs font-bold truncate text-[#333333]">
              {songTitle}
            </span>
          </div>

          {/* Equalizer animation / mute icon */}
          <div className="flex items-center ml-1 shrink-0">
            {isMuted ? (
              <VolMuteIcon
                className="w-4 h-4 text-gray-400 cursor-pointer"
                onClick={toggleMute}
              />
            ) : isPlaying ? (
              <div
                className="flex items-end gap-0.5 h-3.5 cursor-pointer"
                onClick={toggleMute}
              >
                <span className="w-0.5 bg-[#F06292] rounded-full animate-bounce h-3" />
                <span className="w-0.5 bg-[#D81B60] rounded-full animate-bounce h-2 delay-100" />
                <span className="w-0.5 bg-[#F06292] rounded-full animate-bounce h-3.5 delay-200" />
              </div>
            ) : (
              <span className="text-[10px] font-bold text-[#D81B60] bg-[#FDF0F3] px-2 py-0.5 rounded-full border border-[#FCE4EC]">
                Play
              </span>
            )}
          </div>
        </motion.button>
      </div>

      {/* Autoplay unlock banner if browser blocked audio prior to first tap */}
      <AnimatePresence>
        {!isPlaying && !userInteracted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={handleUserGesture}
            className="fixed top-16 inset-x-4 max-w-sm mx-auto z-50 bg-gradient-to-r from-[#D81B60] to-[#F06292] text-white p-3 rounded-2xl shadow-2xl border-2 border-white/40 flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                <MusicIcon className="w-4 h-4 text-white animate-bounce" />
              </div>
              <div>
                <p className="font-bold text-xs">Tap anywhere to start music 💕</p>
                <p className="text-[10px] text-white/80">{songTitle}</p>
              </div>
            </div>
            <button
              onClick={togglePlayPause}
              className="px-3 py-1.5 rounded-full bg-white text-[#D81B60] text-xs font-bold shadow-md hover:bg-[#FFF9FB] shrink-0"
            >
              Play
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
