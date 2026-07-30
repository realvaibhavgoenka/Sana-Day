import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Battery, BatteryLow, BatteryMedium, BatteryFull, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { AppConfig, ScratchCardItem } from '../types';
import { SingleLilySVG } from './LilyFlowerSVG';

interface Props {
  config: AppConfig;
  onContinue: () => void;
}

export const BatteryScratchCards: React.FC<Props> = ({ config, onContinue }) => {
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const toggleReveal = (id: string) => {
    if (!revealedIds.includes(id)) {
      setRevealedIds([...revealedIds, id]);
    }
  };

  const allRevealed = revealedIds.length === config.scratchCards.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-[#FFF9FB]/95 backdrop-blur-md rounded-[40px] p-6 md:p-8 shadow-xl border-2 border-[#FCE4EC] text-center relative"
      >
        {/* Washi tapes */}
        <div className="washi-tape -top-3 left-8" />
        <div className="washi-tape-blue -top-3 right-8" />

        {/* Decorative corner lilies */}
        <div className="absolute top-3 left-3 opacity-60">
          <SingleLilySVG color="pink" size={32} />
        </div>
        <div className="absolute top-3 right-3 opacity-60">
          <SingleLilySVG color="blue" size={32} />
        </div>

        {/* Title Header */}
        <div className="mb-6">
          <span className="px-3 py-1 bg-[#FDF0F3] text-[#AD1457] text-xs font-semibold rounded-full uppercase tracking-widest border border-[#FCE4EC]">
            Interactive Love Meter
          </span>
          <h2 className="text-2xl md:text-3xl font-serif italic font-bold text-[#D81B60] mt-2">
            You Charge My Heart ⚡💖
          </h2>
          <p className="text-xs md:text-sm text-[#744F4F] font-medium mt-1">
            Tap each card below to reveal how much energy you give me!
          </p>
        </div>

        {/* Cards list */}
        <div className="space-y-4">
          {config.scratchCards.map((card: ScratchCardItem, idx: number) => {
            const isRevealed = revealedIds.includes(card.id);

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                onClick={() => toggleReveal(card.id)}
                className={`cursor-pointer relative overflow-hidden rounded-2xl p-4 border-2 transition-all duration-300 ${
                  isRevealed
                    ? 'bg-[#FDF0F3] border-[#FCE4EC] shadow-md scale-[1.01]'
                    : 'bg-white/80 hover:bg-[#FDF0F3]/80 border-dashed border-[#FCE4EC] hover:border-[#F06292] shadow-sm'
                }`}
              >
                {!isRevealed ? (
                  <div className="py-4 flex items-center justify-center gap-2 text-[#D81B60] font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 animate-pulse text-[#F06292]" />
                    <span>Tap To Reveal Message #{idx + 1}</span>
                    <Sparkles className="w-4 h-4 animate-pulse text-[#F06292]" />
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                    {/* Left title & percentage */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#FCE4EC] flex items-center justify-center shadow-sm">
                        {card.percentage === 0 && <BatteryLow className="w-6 h-6 text-[#D81B60]" />}
                        {card.percentage === 50 && <BatteryMedium className="w-6 h-6 text-[#F06292]" />}
                        {card.percentage === 100 && <BatteryFull className="w-6 h-6 text-[#64B5F6]" />}
                      </div>
                      <div>
                        <h4 className="font-serif italic font-bold text-[#D81B60] text-sm">{card.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {/* Battery meter bar */}
                          <div className="w-24 h-2.5 bg-[#FCE4EC] rounded-full overflow-hidden border border-[#F06292]/20">
                            <div
                              className={`h-full transition-all duration-700 ${
                                card.percentage === 0
                                  ? 'bg-[#D81B60] w-[10%]'
                                  : card.percentage === 50
                                  ? 'bg-[#F06292] w-[50%]'
                                  : 'bg-[#64B5F6] w-[100%]'
                              }`}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-[#744F4F]">
                            {card.batteryText}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right revealed text */}
                    <p className="text-xs md:text-sm font-serif italic text-[#744F4F] bg-white/90 p-3 rounded-2xl border border-[#FCE4EC] flex-1">
                      "{card.message}"
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress feedback */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-xs text-[#AD1457] font-semibold mb-3">
            {allRevealed
              ? '✨ You fully charged my heart! Let\'s look at our memories next...'
              : `Revealed ${revealedIds.length} of ${config.scratchCards.length} cards`}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="px-6 py-3 rounded-full bg-[#F06292] hover:bg-[#D81B60] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Open Our Memory Jar 🏺</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
