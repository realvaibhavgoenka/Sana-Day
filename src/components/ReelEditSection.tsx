import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  MessageCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Music,
  Edit3,
  Video,
  Check,
  Film,
  Instagram,
  X,
} from 'lucide-react';
import { AppConfig } from '../types';
import { SingleLilySVG } from './LilyFlowerSVG';

interface Props {
  config: AppConfig;
  onContinue: () => void;
}

export const ReelEditSection: React.FC<Props> = ({ config, onContinue }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(999999);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showHeartBurst, setShowHeartBurst] = useState<boolean>(false);

  // Active slide index for slideshow reel fallback
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Inline editor for reel link
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [inputReelUrl, setInputReelUrl] = useState<string>(config.reelUrl || '');
  const [inputVideoUrl, setInputVideoUrl] = useState<string>(config.reelVideoUrl || '');
  const [inputCaption, setInputCaption] = useState<string>(
    config.reelCaption || 'A special reel edit made with so much love for my Sana! 💖✨'
  );

  const [activeReelUrl, setActiveReelUrl] = useState<string>(config.reelUrl || '');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>(config.reelVideoUrl || '');
  const [activeCaption, setActiveCaption] = useState<string>(
    config.reelCaption || 'A special reel edit made with so much love for my Sana! 💖✨'
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const memories = config.memories || [];

  // Auto slide timer for memory slideshow if playing
  useEffect(() => {
    if (!activeVideoUrl && isPlaying && memories.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % memories.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, activeVideoUrl, memories.length]);

  const handleLikeToggle = () => {
    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      triggerHeartConfetti();
    } else {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  const handleDoubleTapReel = () => {
    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
    setShowHeartBurst(true);
    triggerHeartConfetti();
    setTimeout(() => setShowHeartBurst(false), 1200);
  };

  const triggerHeartConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F06292', '#D81B60', '#FF1744', '#FCE4EC'],
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }
  };

  const handleSaveReelSettings = () => {
    setActiveReelUrl(inputReelUrl);
    setActiveVideoUrl(inputVideoUrl);
    setActiveCaption(inputCaption);
    setShowLinkModal(false);
  };

  // Helper to construct Instagram Embed URL if a reel link is provided
  const getInstagramEmbedUrl = (url: string) => {
    if (!url) return null;
    try {
      let cleanUrl = url.trim().split('?')[0];
      if (!cleanUrl.endsWith('/')) cleanUrl += '/';
      if (cleanUrl.includes('instagram.com/reel/') || cleanUrl.includes('instagram.com/p/')) {
        return `${cleanUrl}embed`;
      }
    } catch (e) {
      console.error('Invalid IG URL', e);
    }
    return null;
  };

  const embedUrl = getInstagramEmbedUrl(activeReelUrl);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-[#FFF9FB]/95 backdrop-blur-md rounded-[40px] p-6 md:p-8 shadow-xl border-2 border-[#FCE4EC] text-center relative"
      >
        {/* Washi tape accents */}
        <div className="washi-tape -top-3 left-10" />
        <div className="washi-tape-blue -top-3 right-10" />

        {/* Decorative lilies */}
        <div className="absolute top-4 left-4 opacity-70">
          <SingleLilySVG color="pink" size={36} />
        </div>
        <div className="absolute top-4 right-4 opacity-70">
          <SingleLilySVG color="blue" size={36} />
        </div>

        {/* Header */}
        <div className="mb-6">
          <span className="px-3.5 py-1.5 bg-[#FDF0F3] text-[#AD1457] text-xs font-bold rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 border border-[#FCE4EC]">
            <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
            Special Video Edit For Sana
            <Sparkles className="w-3.5 h-3.5 text-[#F06292]" />
          </span>
          <h2 className="text-2xl md:text-4xl font-serif italic font-bold text-[#D81B60] mt-3">
            Our Instagram Reel Edit 🎬✨
          </h2>
          <p className="text-xs md:text-sm text-[#744F4F] font-medium mt-1">
            I made this special video edit just for you! Double-tap anywhere to send love 💕
          </p>
        </div>

        {/* REEL PLAYER PHONE CONTAINER */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] bg-black rounded-[36px] shadow-2xl overflow-hidden border-4 border-slate-900 group">
            
            {/* Top Phone Notch / Camera Bar */}
            <div className="absolute top-2 inset-x-0 z-30 flex justify-center pointer-events-none">
              <div className="w-24 h-4 bg-black/90 rounded-full flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              </div>
            </div>

            {/* Story/Reel Segment Progress Bars */}
            <div className="absolute top-8 inset-x-3 z-30 flex gap-1 pointer-events-none">
              {memories.map((_, idx) => (
                <div
                  key={idx}
                  className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-xs"
                >
                  <div
                    className={`h-full bg-white transition-all duration-300 ${
                      idx === currentSlideIndex
                        ? 'w-full'
                        : idx < currentSlideIndex
                        ? 'w-full'
                        : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* VIDEO CONTENT AREA */}
            <div
              className="relative w-full h-full flex items-center justify-center bg-slate-950 cursor-pointer overflow-hidden"
              onDoubleClick={handleDoubleTapReel}
            >
              {/* Option A: Direct MP4 Video Player */}
              {activeVideoUrl ? (
                <video
                  ref={videoRef}
                  src={activeVideoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : embedUrl ? (
                /* Option B: Embedded Instagram Reel Frame */
                <div className="w-full h-full flex flex-col items-center justify-center bg-black relative">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full border-0"
                    title="Instagram Reel Edit"
                    allow="encrypted-media"
                  />
                </div>
              ) : (
                /* Option C: Romantic Photo Reel Slideshow Edit */
                <AnimatePresence mode="wait">
                  {memories[currentSlideIndex] ? (
                    <motion.div
                      key={memories[currentSlideIndex].id}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8 }}
                      className="relative w-full h-full"
                    >
                      <img
                        src={memories[currentSlideIndex].url}
                        alt={memories[currentSlideIndex].title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* Dark Vignette Overlay for Instagram Look */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

                      {/* Photo Overlay Tag */}
                      <div className="absolute top-12 left-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-medium border border-white/20 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#F06292]" />
                        <span>{memories[currentSlideIndex].title}</span>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              )}

              {/* Double-Tap Floating Heart Animation */}
              <AnimatePresence>
                {showHeartBurst && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className="absolute z-40 pointer-events-none"
                  >
                    <Heart className="w-24 h-24 fill-[#FF1744] text-[#FF1744] drop-shadow-[0_0_15px_rgba(255,23,68,0.8)] animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mute/Unmute & Play/Pause Floating Control Overlay */}
              <div className="absolute top-12 right-3 z-30 flex flex-col gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              {/* RIGHT SIDEBAR REEL ACTIONS (Like, Comment, Share, Bookmark, Profile) */}
              <div
                className="absolute right-3 bottom-16 z-30 flex flex-col items-center gap-5 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Like Button */}
                <button
                  onClick={handleLikeToggle}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div
                    className={`p-2.5 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                      isLiked ? 'bg-[#FF1744]/20 border-[#FF1744]' : 'bg-black/40 hover:bg-black/60'
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 transition-all ${
                        isLiked
                          ? 'fill-[#FF1744] text-[#FF1744] scale-125'
                          : 'text-white group-hover:scale-110'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-bold tracking-tight">
                    {likeCount.toLocaleString()}
                  </span>
                </button>

                {/* Comment Button */}
                <button
                  onClick={triggerHeartConfetti}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 transition-all">
                    <MessageCircle className="w-6 h-6 text-white group-hover:scale-110" />
                  </div>
                  <span className="text-[10px] font-bold">Infinite</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={triggerHeartConfetti}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 transition-all">
                    <Share2 className="w-6 h-6 text-white group-hover:scale-110" />
                  </div>
                  <span className="text-[10px] font-bold">Share</span>
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={triggerHeartConfetti}
                  className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                >
                  <Bookmark className="w-6 h-6 text-white" />
                </button>

                {/* Rotating Music Disc Icon */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D81B60] to-[#F06292] p-0.5 animate-spin-slow border-2 border-white/60 shadow-lg mt-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <Music className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* BOTTOM REEL INFO OVERLAY (Profile, Caption, Music Ticker) */}
              <div
                className="absolute bottom-3 inset-x-3 z-30 text-left text-white pr-16"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Profile Header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F06292] to-[#D81B60] p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#D81B60] font-bold text-xs">
                      {config.boyfriendName ? config.boyfriendName[0] : 'V'}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-xs tracking-wide flex items-center gap-1">
                      @{config.boyfriendName.toLowerCase().replace(/\s+/g, '')}_for_{config.girlfriendName.toLowerCase().replace(/\s+/g, '')}
                      <span className="w-3 h-3 rounded-full bg-[#38BDF8] text-white text-[8px] flex items-center justify-center font-bold">
                        ✓
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={triggerHeartConfetti}
                    className="ml-1 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-[10px] font-bold border border-white/30 cursor-pointer"
                  >
                    Follow
                  </button>
                </div>

                {/* Reel Caption */}
                <p className="text-xs font-normal line-clamp-2 leading-snug drop-shadow-sm mb-2 text-white/95">
                  {activeCaption}
                </p>

                {/* Audio Track Ticker */}
                <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-mono bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit max-w-full truncate border border-white/10">
                  <Music className="w-3 h-3 text-[#F06292] animate-bounce shrink-0" />
                  <span className="truncate">
                    {config.reelAudioTrack || `Original Audio — ${config.boyfriendName} x ${config.girlfriendName} 💕`}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Actions & Instagram Links below phone */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {activeReelUrl && (
              <a
                href={activeReelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Watch Directly On Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => setShowLinkModal(true)}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FDF0F3] text-[#D81B60] border-2 border-[#FCE4EC] text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-[#F06292]" />
              <span>Paste Your Reel Link / Edit Caption</span>
            </button>
          </div>
        </div>

        {/* Continue Button to next step */}
        <div className="mt-8 flex justify-center pt-4 border-t border-[#FCE4EC]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F06292] to-[#D81B60] text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Read My Love Letter To You 💌</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* PASTE / EDIT REEL LINK MODAL */}
      <AnimatePresence>
        {showLinkModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLinkModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 md:p-8 rounded-[36px] max-w-md w-full shadow-2xl border-2 border-[#FCE4EC] relative text-left text-[#744F4F]"
            >
              <button
                onClick={() => setShowLinkModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FDF0F3] hover:bg-[#FCE4EC] text-[#AD1457] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="p-2.5 rounded-2xl bg-[#FDF0F3] text-[#D81B60]">
                  <Film className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-serif italic font-bold text-[#D81B60] text-lg">
                    Add Your Instagram Reel
                  </h3>
                  <p className="text-xs text-[#744F4F]/80">
                    Paste the reel link you made for Sana!
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#AD1457] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
                    Instagram Reel URL
                  </label>
                  <input
                    type="url"
                    value={inputReelUrl}
                    onChange={(e) => setInputReelUrl(e.target.value)}
                    placeholder="e.g. https://www.instagram.com/reel/C..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FCE4EC] focus:outline-none focus:ring-2 focus:ring-[#F06292] text-xs bg-[#FFF9FB]"
                  />
                  <p className="text-[11px] text-[#744F4F]/70 mt-1">
                    Paste the Instagram link to display your reel directly on screen!
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#AD1457] uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#64B5F6]" />
                    Or Direct Video File URL (MP4)
                  </label>
                  <input
                    type="url"
                    value={inputVideoUrl}
                    onChange={(e) => setInputVideoUrl(e.target.value)}
                    placeholder="https://example.com/my-reel.mp4"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FCE4EC] focus:outline-none focus:ring-2 focus:ring-[#F06292] text-xs bg-[#FFF9FB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#AD1457] uppercase tracking-wide mb-1.5">
                    Reel Caption
                  </label>
                  <textarea
                    value={inputCaption}
                    onChange={(e) => setInputCaption(e.target.value)}
                    rows={2}
                    className="w-full p-3 rounded-xl border border-[#FCE4EC] focus:outline-none focus:ring-2 focus:ring-[#F06292] text-xs bg-[#FFF9FB]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLinkModal(false)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-[#744F4F] hover:bg-[#FDF0F3] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveReelSettings}
                    className="px-6 py-2 rounded-full bg-[#D81B60] hover:bg-[#AD1457] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Reel</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
