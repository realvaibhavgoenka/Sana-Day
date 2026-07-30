import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { AppConfig } from '../types';

interface Props {
  config: AppConfig;
}

export const BackgroundMusic: React.FC<Props> = ({ config }) => {
  const audioSrc =
    config.musicUrl || 'https://intelligent-jade-izjvhzrk.edgeone.dev';

  const songTitle = config.musicTitle || 'Tum Se Hi 💕';

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const safePlayAudio = async () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.volume = 0.7;
      const promise = audioRef.current.play();
      if (promise !== undefined) {
        await promise;
        setIsPlaying(true);
      }
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
        console.log('Audio autoplay waiting for user gesture:', error);
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
      if (!nextMuted) {
        safePlayAudio();
      }
    }
  };

  useEffect(() => {
    safePlayAudio();

    const handleGesture = () => {
      safePlayAudio();
    };

    window.addEventListener('click', handleGesture);
    window.addEventListener('touchstart', handleGesture);
    window.addEventListener('scroll', handleGesture);
    window.addEventListener('keydown', handleGesture);
    window.addEventListener('mousemove', handleGesture, { once: true });
    window.addEventListener('pointerdown', handleGesture);

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('scroll', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      window.removeEventListener('mousemove', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
    };
  }, []);

  return (
    <div className="fixed top-3 right-3 z-50">
      {/* Background MP3 Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        autoPlay
        playsInline
        preload="auto"
      />

      {/* Floating Song Badge / Mute Indicator */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={toggleMute}
        className="bg-white/95 backdrop-blur-md border-2 border-[#F06292]/30 shadow-xl rounded-full px-3.5 py-1.5 flex items-center gap-2.5 text-[#744F4F] hover:scale-105 transition-transform cursor-pointer"
        title={isMuted ? 'Unmute Background Music' : 'Mute Background Music'}
      >
        <div className="p-1.5 rounded-full bg-gradient-to-r from-[#F06292] to-[#D81B60] text-white shadow-sm flex items-center justify-center">
          <Music className="w-3.5 h-3.5" />
        </div>

        <div className="flex flex-col text-left truncate max-w-[150px] sm:max-w-[200px]">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#D81B60] flex items-center gap-1">
            <span>Playing Background Music</span>
            <Sparkles className="w-2.5 h-2.5 text-[#F06292]" />
          </span>
          <span className="text-xs font-bold truncate text-[#333333]">
            {songTitle}
          </span>
        </div>

        {/* Animated Equalizer Wave when playing / Mute icon */}
        <div className="flex items-center ml-1 shrink-0">
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-400" />
          ) : (
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-[#F06292] rounded-full animate-bounce h-3" />
              <span className="w-0.5 bg-[#D81B60] rounded-full animate-bounce h-2 delay-100" />
              <span className="w-0.5 bg-[#F06292] rounded-full animate-bounce h-3.5 delay-200" />
            </div>
          )}
        </div>
      </motion.button>
    </div>
  );
};
