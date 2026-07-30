import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LilyProps {
  color?: 'pink' | 'blue' | 'gold' | 'mixed';
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
}

export const SingleLilySVG: React.FC<LilyProps> = ({
  color = 'pink',
  size = 64,
  className = '',
  style,
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isPink = color === 'pink';
  const isGold = color === 'gold';

  // Gradient IDs based on color
  const primaryGradId = `lilyGrad-${color}-${Math.random().toString(36).substring(2, 6)}`;
  const centerGradId = `centerGrad-${color}-${Math.random().toString(36).substring(2, 6)}`;

  // Normal vs Bloomed Hover colors
  let stop1 = isPink ? '#FFF0F5' : isGold ? '#FEF9C3' : '#E0F2FE';
  let stop2 = isPink ? '#F06292' : isGold ? '#FACC15' : '#38BDF8';
  let stop3 = isPink ? '#D81B60' : isGold ? '#EAB308' : '#1D4ED8';

  if (isHovered) {
    // Shimmer/bloom color boost on hover
    stop1 = '#FFFBEB';
    stop2 = isPink ? '#FF1744' : isGold ? '#F59E0B' : '#00E5FF';
    stop3 = isPink ? '#C2185B' : isGold ? '#B45309' : '#312E81';
  }

  return (
    <motion.div
      className={`inline-block relative ${interactive ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size, ...style }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      animate={
        isHovered
          ? { scale: 1.25, rotate: [0, -3, 3, 0] }
          : { scale: 1, rotate: 0 }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-all duration-300"
      >
        <defs>
          <radialGradient id={primaryGradId} cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
            <stop offset="0%" stopColor={stop1} />
            <stop offset="65%" stopColor={stop2} />
            <stop offset="100%" stopColor={stop3} />
          </radialGradient>
          <radialGradient id={centerGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </radialGradient>
        </defs>

        {/* Outer Glow Halo on Hover */}
        {isHovered && (
          <circle
            cx="50"
            cy="50"
            r="44"
            fill={isPink ? '#F06292' : '#38BDF8'}
            opacity="0.25"
            className="animate-pulse"
          />
        )}

        {/* Stem & Leaves */}
        <path d="M50 62 Q 48 84 52 98" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 76 Q 28 72 22 84 Q 38 88 50 80" fill="#22C55E" opacity="0.9" />
        <path d="M50 78 Q 72 74 78 86 Q 62 90 50 82" fill="#16A34A" opacity="0.9" />

        {/* --- 6 DISTINCT RECURVED LILY PETALS --- */}
        {/* Outer 3 Petals */}
        <path
          d="M50 50 C 20 15, 8 40, 22 62 C 34 68, 44 58, 50 50 Z"
          fill={`url(#${primaryGradId})`}
          opacity="0.95"
        />
        <path
          d="M50 50 C 80 15, 92 40, 78 62 C 66 68, 56 58, 50 50 Z"
          fill={`url(#${primaryGradId})`}
          opacity="0.95"
        />
        <path
          d="M50 50 C 32 85, 68 85, 50 50 Z"
          fill={`url(#${primaryGradId})`}
          opacity="0.92"
        />

        {/* Inner 3 Petals (Overlapping) */}
        <path
          d="M50 50 C 35 12, 65 12, 50 50 Z"
          fill={`url(#${primaryGradId})`}
        />
        <path
          d="M50 50 C 15 35, 15 65, 50 50 Z"
          fill={`url(#${primaryGradId})`}
        />
        <path
          d="M50 50 C 85 35, 85 65, 50 50 Z"
          fill={`url(#${primaryGradId})`}
        />

        {/* Central Vein Rib Lines on Petals */}
        <path d="M50 50 Q 35 25 50 14" stroke="#FFF" strokeWidth="1" opacity="0.6" fill="none" />
        <path d="M50 50 Q 25 35 18 50" stroke="#FFF" strokeWidth="1" opacity="0.6" fill="none" />
        <path d="M50 50 Q 75 35 82 50" stroke="#FFF" strokeWidth="1" opacity="0.6" fill="none" />
        <path d="M50 50 Q 35 70 50 82" stroke="#FFF" strokeWidth="1" opacity="0.6" fill="none" />

        {/* Stargazer Lily Speckles / Freckles */}
        <circle cx="44" cy="42" r="1.2" fill="#881337" opacity="0.8" />
        <circle cx="56" cy="42" r="1.2" fill="#881337" opacity="0.8" />
        <circle cx="50" cy="36" r="1.3" fill="#881337" opacity="0.8" />
        <circle cx="42" cy="52" r="1.1" fill="#881337" opacity="0.8" />
        <circle cx="58" cy="52" r="1.1" fill="#881337" opacity="0.8" />
        <circle cx="50" cy="58" r="1.2" fill="#881337" opacity="0.8" />

        {/* Throat Golden Star Glow */}
        <circle cx="50" cy="50" r="7" fill={`url(#${centerGradId})`} />

        {/* --- 6 PROMINENT STAMENS & ANTHERS --- */}
        {/* Filament 1 */}
        <path d="M50 50 Q 42 38 38 28" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="34" y="24" width="8" height="4" rx="2" fill="#B45309" transform="rotate(-20 38 26)" />

        {/* Filament 2 */}
        <path d="M50 50 Q 58 38 62 28" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="58" y="24" width="8" height="4" rx="2" fill="#B45309" transform="rotate(20 62 26)" />

        {/* Filament 3 */}
        <path d="M50 50 Q 50 36 50 22" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <rect x="46" y="18" width="8" height="4" rx="2" fill="#D97706" />

        {/* Filament 4 */}
        <path d="M50 50 Q 38 52 26 56" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="22" y="54" width="8" height="4" rx="2" fill="#B45309" transform="rotate(-60 26 56)" />

        {/* Filament 5 */}
        <path d="M50 50 Q 62 52 74 56" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="70" y="54" width="8" height="4" rx="2" fill="#B45309" transform="rotate(60 74 56)" />

        {/* Filament 6 (Center Pistil & Stigma) */}
        <path d="M50 50 Q 50 44 50 32" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="50" cy="30" r="3" fill="#15803D" />

        {/* Sparkle effects on Hover */}
        {isHovered && (
          <g className="animate-spin-slow">
            <path d="M20 20 L22 25 L27 27 L22 29 L20 34 L18 29 L13 27 L18 25 Z" fill="#FACC15" />
            <path d="M80 20 L82 25 L87 27 L82 29 L80 34 L78 29 L73 27 L78 25 Z" fill="#F06292" />
            <path d="M50 8 L51 12 L55 13 L51 14 L50 18 L49 14 L45 13 L49 12 Z" fill="#38BDF8" />
          </g>
        )}
      </svg>

      {/* Floating Bloom Label when hovered */}
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, y: 5, scale: 0.8 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#D81B60] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg pointer-events-none z-30"
        >
          Lily Bloomed! 🌸
        </motion.span>
      )}
    </motion.div>
  );
};

export const LilyBouquetSVG: React.FC<{ size?: number; className?: string }> = ({
  size = 300,
  className = '',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 1.1 }}
    >
      {/* Background SVG Wrapper with Stems, Leaves, Paper & Ribbon */}
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 320 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="wrapperPinkOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="50%" stopColor="#FCE4EC" />
            <stop offset="100%" stopColor="#F8BBD0" />
          </linearGradient>
          <linearGradient id="wrapperBlueInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="ribbonPink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F06292" />
            <stop offset="50%" stopColor="#D81B60" />
            <stop offset="100%" stopColor="#AD1457" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- LAYER 1: WRAPPING PAPER BACK & BASE --- */}
        {/* Outer Sky-Blue Accent Paper */}
        <path
          d="M40 180 L160 335 L280 180 Q 230 140 160 160 Q 90 140 40 180 Z"
          fill="url(#wrapperBlueInner)"
          opacity="0.95"
        />
        {/* Inner Blush Pink Creped Kraft Paper */}
        <path
          d="M55 190 L160 330 L265 190 Q 215 150 160 170 Q 105 150 55 190 Z"
          fill="url(#wrapperPinkOuter)"
        />

        {/* Paper Fold Shadows & Pleats */}
        <path d="M55 190 L160 330 L110 210 Z" fill="#F8BBD0" opacity="0.6" />
        <path d="M265 190 L160 330 L210 210 Z" fill="#F8BBD0" opacity="0.6" />

        {/* --- LAYER 2: LILY STEM BUNDLE BELOW WRAPPER --- */}
        <path d="M145 270 L140 345" stroke="#15803D" strokeWidth="7" strokeLinecap="round" />
        <path d="M160 270 L160 350" stroke="#16A34A" strokeWidth="7" strokeLinecap="round" />
        <path d="M175 270 L180 345" stroke="#14532D" strokeWidth="7" strokeLinecap="round" />

        {/* --- LAYER 3: ELEGANT LANCEOLATE LILY LEAVES --- */}
        <path d="M110 170 Q 60 130 35 150 Q 75 190 120 180" fill="#16A34A" />
        <path d="M110 170 Q 60 130 35 150" stroke="#4ADE80" strokeWidth="1.5" fill="none" />

        <path d="M210 170 Q 260 130 285 150 Q 245 190 200 180" fill="#22C55E" />
        <path d="M210 170 Q 260 130 285 150" stroke="#86EFAC" strokeWidth="1.5" fill="none" />

        <path d="M160 150 Q 130 90 100 105 Q 135 140 160 150" fill="#15803D" />
        <path d="M160 150 Q 190 90 220 105 Q 185 140 160 150" fill="#16A34A" />

        {/* --- LAYER 4: UNOPENED LILY BUDS (Ready to bloom!) --- */}
        {/* Left Bud */}
        <g transform="translate(65, 100) rotate(-25)">
          <path d="M0 40 Q -10 15 0 0 Q 10 15 0 40 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
          <path d="M0 40 Q -5 20 0 0" fill="#F06292" opacity="0.6" />
        </g>
        {/* Right Bud */}
        <g transform="translate(255, 100) rotate(25)">
          <path d="M0 40 Q -10 15 0 0 Q 10 15 0 40 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
          <path d="M0 40 Q 5 20 0 0" fill="#38BDF8" opacity="0.6" />
        </g>

        {/* --- LAYER 5: SATIN RIBBON & BOW --- */}
        <path d="M128 275 Q 90 260 105 290 Q 130 295 142 282 Z" fill="url(#ribbonPink)" />
        <path d="M192 275 Q 230 260 215 290 Q 190 295 178 282 Z" fill="url(#ribbonPink)" />
        <circle cx="160" cy="278" r="10" fill="#C2185B" />
        {/* Hanging Ribbon Tails */}
        <path d="M152 286 L135 335 Q 148 330 158 290" fill="#D81B60" />
        <path d="M168 286 L185 335 Q 172 330 162 290" fill="#D81B60" />

        {/* Floating Magic Sparkles around Bouquet */}
        <path d="M30 80 L33 87 L40 90 L33 93 L30 100 L27 93 L20 90 L27 87 Z" fill="#FACC15" />
        <path d="M280 70 L282 75 L287 77 L282 79 L280 84 L278 79 L273 77 L278 75 Z" fill="#F06292" />
        <path d="M160 15 L162 22 L169 24 L162 26 L160 33 L158 26 L151 24 L158 22 Z" fill="#38BDF8" />
      </svg>

      {/* --- OVERLAY LILIES IN BOUQUET (5 Rich Full Blooming Lilies) --- */}
      {/* 1. TOP CENTER STARGAZER LILY */}
      <div
        className="absolute top-[8%] left-[50%] -translate-x-1/2 z-20"
        onMouseEnter={() => setHoveredIndex(1)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <SingleLilySVG
          color="pink"
          size={120}
          interactive={false}
          className={`transition-all duration-300 ${
            hoveredIndex === 1 ? 'scale-125 z-30 filter drop-shadow-xl' : 'hover:scale-110'
          }`}
        />
      </div>

      {/* 2. UPPER LEFT SOFT PINK LILY */}
      <div
        className="absolute top-[22%] left-[26%] -translate-x-1/2 -translate-y-1/2 z-10"
        onMouseEnter={() => setHoveredIndex(2)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <SingleLilySVG
          color="pink"
          size={110}
          interactive={false}
          className={`transition-all duration-300 ${
            hoveredIndex === 2 ? 'scale-125 z-30 filter drop-shadow-xl' : 'hover:scale-110'
          }`}
        />
      </div>

      {/* 3. UPPER RIGHT HEAVENLY BLUE LILY */}
      <div
        className="absolute top-[22%] right-[26%] translate-x-1/2 -translate-y-1/2 z-10"
        onMouseEnter={() => setHoveredIndex(3)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <SingleLilySVG
          color="blue"
          size={110}
          interactive={false}
          className={`transition-all duration-300 ${
            hoveredIndex === 3 ? 'scale-125 z-30 filter drop-shadow-xl' : 'hover:scale-110'
          }`}
        />
      </div>

      {/* 4. CENTER LOWER GOLDEN/ROSE LILY */}
      <div
        className="absolute top-[38%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30"
        onMouseEnter={() => setHoveredIndex(4)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <SingleLilySVG
          color="gold"
          size={125}
          interactive={false}
          className={`transition-all duration-300 ${
            hoveredIndex === 4 ? 'scale-125 z-40 filter drop-shadow-2xl' : 'hover:scale-110'
          }`}
        />
      </div>

      {/* 5. LOWER LEFT BLUE LILY */}
      <div
        className="absolute top-[44%] left-[28%] -translate-x-1/2 z-20"
        onMouseEnter={() => setHoveredIndex(5)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <SingleLilySVG
          color="blue"
          size={95}
          interactive={false}
          className={`transition-all duration-300 ${
            hoveredIndex === 5 ? 'scale-125 z-30 filter drop-shadow-xl' : 'hover:scale-110'
          }`}
        />
      </div>

      {/* 6. LOWER RIGHT PINK LILY */}
      <div
        className="absolute top-[44%] right-[28%] translate-x-1/2 z-20"
        onMouseEnter={() => setHoveredIndex(6)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <SingleLilySVG
          color="pink"
          size={95}
          interactive={false}
          className={`transition-all duration-300 ${
            hoveredIndex === 6 ? 'scale-125 z-30 filter drop-shadow-xl' : 'hover:scale-110'
          }`}
        />
      </div>
    </div>
  );
};
