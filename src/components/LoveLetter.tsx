import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Quote } from 'lucide-react';
import { AppConfig } from '../types';
import { SingleLilySVG } from './LilyFlowerSVG';
import { PinkRoseSVG } from './FlowerSVGs';

interface Props {
  config: AppConfig;
  onContinue: () => void;
}

export const LoveLetter: React.FC<Props> = ({ config, onContinue }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-[#FFF9FB]/95 rounded-[40px] p-6 md:p-10 shadow-xl border-2 border-[#FCE4EC] relative overflow-hidden"
      >
        {/* Notebook Spiral Left Border effect */}
        <div className="absolute top-0 bottom-0 left-4 w-6 flex flex-col justify-around py-6 pointer-events-none opacity-40">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full bg-[#FCE4EC] shadow-inner border border-[#F06292]/30" />
          ))}
        </div>

        {/* Washi Tapes */}
        <div className="washi-tape -top-3 left-16" />
        <div className="washi-tape-blue -top-3 right-16" />

        {/* Decorative corner flowers */}
        <div className="absolute top-4 right-4 flex items-center gap-1 opacity-90">
          <PinkRoseSVG size={38} />
          <SingleLilySVG color="pink" size={38} />
        </div>

        {/* Content Container (padded from left spiral) */}
        <div className="pl-8 md:pl-10 pr-2">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="px-3 py-1 bg-[#FDF0F3] text-[#AD1457] text-xs font-semibold rounded-full uppercase tracking-widest border border-[#FCE4EC]">
              From The Bottom Of My Heart
            </span>
            <h2 className="text-2xl md:text-3xl font-serif italic font-bold text-[#D81B60] mt-2">
              {config.letterTitle}
            </h2>
            <p className="text-xs md:text-sm text-[#744F4F] font-medium mt-1">
              {config.letterSubtitle}
            </p>
          </div>

          {/* Paper Lined Body */}
          <div className="bg-white/90 rounded-2xl p-6 md:p-8 border border-[#FCE4EC] shadow-sm leading-relaxed text-[#744F4F] font-serif whitespace-pre-line text-sm md:text-base relative bg-grid-notebook">
            <Quote className="w-8 h-8 text-[#FCE4EC] absolute top-3 left-3 -z-10" />
            {config.letterBody}

            {/* Closing */}
            <div className="mt-8 text-right font-serif italic font-bold text-[#D81B60] text-base md:text-lg flex flex-col items-end">
              <span>{config.letterClosing}</span>
              <span className="text-xs text-[#F06292] font-sans mt-1">
                - {config.boyfriendName}
              </span>
            </div>
          </div>

          {/* Cute Sticker Row */}
          <div className="mt-6 flex items-center justify-between px-2 text-[#F06292]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D81B60]">
              <Heart className="w-4 h-4 fill-current animate-pulse text-[#F06292]" />
              <span>Dedicated to {config.girlfriendName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#64B5F6]" />
              <SingleLilySVG color="blue" size={24} />
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className="px-8 py-3.5 rounded-full bg-[#F06292] hover:bg-[#D81B60] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Plan Our First Date Together 🗓️💖</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
