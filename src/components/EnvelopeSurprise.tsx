import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SingleLilySVG, LilyBouquetSVG } from './LilyFlowerSVG';
import { PinkRoseSVG } from './FlowerSVGs';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { AppConfig } from '../types';

interface Props {
  config: AppConfig;
  onContinue: () => void;
}

export const EnvelopeSurprise: React.FC<Props> = ({ config, onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* CLOSED ENVELOPE CARD */
          <motion.div
            key="closed-envelope"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, rotate: -5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onClick={handleOpen}
            className="cursor-pointer group relative max-w-md w-full bg-[#FFF9FB]/95 backdrop-blur-md rounded-[40px] p-8 shadow-xl border-2 border-[#FCE4EC] text-center flex flex-col items-center overflow-hidden"
          >
            {/* Washi tape graphic top right */}
            <div className="washi-tape -top-3 -right-2 z-20" />
            <div className="washi-tape-blue -bottom-3 -left-2 z-20" />

            {/* Corner Flowers */}
            <div className="absolute top-3 left-3 opacity-90 group-hover:scale-110 transition-transform">
              <PinkRoseSVG size={38} />
            </div>
            <div className="absolute top-3 right-3 opacity-90 group-hover:scale-110 transition-transform">
              <SingleLilySVG color="pink" size={36} />
            </div>

            {/* Envelope Visual */}
            <div className="relative my-6 w-64 h-48 bg-gradient-to-b from-[#FDF0F3] to-[#FCE4EC] rounded-3xl border-2 border-[#F06292]/30 shadow-inner flex flex-col items-center justify-center p-4 transition-transform group-hover:scale-105">
              {/* Flap shape */}
              <div className="absolute top-0 inset-x-0 h-24 bg-[#FCE4EC]/90 rounded-b-full border-b border-[#F06292]/30 transform origin-top group-hover:-rotate-12 transition-transform duration-500 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#F06292] shadow-md flex items-center justify-center text-white text-lg">
                  <Heart className="w-5 h-5 fill-current animate-pulse" />
                </div>
              </div>

              {/* Letter preview card inside */}
              <div className="mt-8 bg-white/95 rounded-2xl p-4 shadow-sm w-full border border-[#FCE4EC] text-center">
                <h3 className="font-serif italic text-lg font-bold text-[#D81B60]">
                  {config.envelopeTitle}
                </h3>
                <p className="text-xs text-[#F06292] font-medium mt-1">
                  {config.envelopeSubtitle}
                </p>
              </div>
            </div>

            {/* Tap instruction */}
            <div className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F06292] hover:bg-[#D81B60] text-white font-bold tracking-wider text-xs uppercase shadow-md transition-colors">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Tap To Open Surprise</span>
              <Heart className="w-4 h-4 fill-current" />
            </div>

            <p className="text-xs text-[#744F4F]/70 mt-3 font-serif italic tracking-wide">
              Created with love for {config.girlfriendName} ♥
            </p>
          </motion.div>
        ) : (
          /* BLOOMING BOUQUET REVEAL */
          <motion.div
            key="bouquet-reveal"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="max-w-2xl w-full bg-[#FFF9FB]/95 backdrop-blur-md rounded-[40px] p-8 md:p-10 shadow-xl border-2 border-[#FCE4EC] text-center flex flex-col items-center relative overflow-hidden"
          >
            {/* Washi tapes */}
            <div className="washi-tape -top-3 left-10" />
            <div className="washi-tape-blue -top-3 right-10" />

            {/* Floating Sparkles & Lily petals */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF0F3] text-[#AD1457] text-xs font-semibold tracking-wider uppercase mb-2 border border-[#FCE4EC]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F06292]" />
              Happy Girlfriends Day
              <Sparkles className="w-3.5 h-3.5 text-[#F06292]" />
            </motion.div>

            {/* Main Animated Lily Bouquet */}
            <motion.div
              initial={{ scale: 0.3, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'backOut', delay: 0.2 }}
              className="my-4 relative"
            >
              <LilyBouquetSVG size={280} />
            </motion.div>

            {/* Heartfelt Message */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-4xl font-serif italic text-[#D81B60] tracking-tight"
            >
              {config.bouquetHeading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-sm md:text-base text-[#744F4F] font-medium mt-2 max-w-lg leading-relaxed"
            >
              {config.bouquetSubheading}
            </motion.p>

            {/* Continue Button to Next Page */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className="mt-8 px-8 py-3.5 rounded-full bg-[#F06292] hover:bg-[#D81B60] text-white font-bold text-xs tracking-widest uppercase shadow-lg shadow-pink-100 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Our Memories & Love Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
