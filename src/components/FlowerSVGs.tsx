import React, { useState } from 'react';
import { motion } from 'motion/react';

interface FlowerProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
}

export const PinkTulipSVG: React.FC<FlowerProps> = ({
  size = 56,
  className = '',
  style,
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const gradId = `tulipGrad-${Math.random().toString(36).substring(2, 6)}`;

  return (
    <motion.div
      className={`inline-block relative ${interactive ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size, ...style }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      animate={
        isHovered
          ? { scale: 1.25, rotate: -5 }
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
          <linearGradient id={gradId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#C2185B" />
            <stop offset="50%" stopColor="#F06292" />
            <stop offset="100%" stopColor="#FFF0F5" />
          </linearGradient>
        </defs>

        {/* Stem & Leaf */}
        <path d="M50 55 Q 48 78 50 96" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 72 Q 22 68 18 85 Q 36 86 50 78" fill="#4CAF50" opacity="0.9" />

        {/* Tulip Cup Petals */}
        {/* Back Petals */}
        <path d="M50 52 C 28 42, 30 18, 50 28 C 70 18, 72 42, 50 52 Z" fill="#E91E63" opacity="0.85" />
        
        {/* Left Petal */}
        <path d="M50 54 C 22 46, 20 18, 38 12 C 48 24, 48 40, 50 54 Z" fill={`url(#${gradId})`} />

        {/* Right Petal */}
        <path d="M50 54 C 78 46, 80 18, 62 12 C 52 24, 52 40, 50 54 Z" fill={`url(#${gradId})`} />

        {/* Center Cup Petal */}
        <path d="M50 56 C 30 50, 32 20, 50 14 C 68 20, 70 50, 50 56 Z" fill="url(#pinkPetalGrad)" />

        {/* Inner Highlight Lines */}
        <path d="M50 52 Q 42 32 40 20" stroke="#FFF" strokeWidth="1.2" opacity="0.7" fill="none" />
        <path d="M50 52 Q 58 32 60 20" stroke="#FFF" strokeWidth="1.2" opacity="0.7" fill="none" />

        {isHovered && (
          <circle cx="50" cy="32" r="28" fill="#F06292" opacity="0.25" className="animate-pulse" />
        )}
      </svg>

      {isHovered && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -8 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#E91E63] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg pointer-events-none z-30"
        >
          Pink Tulip! 🌷
        </motion.span>
      )}
    </motion.div>
  );
};

export const PinkRoseSVG: React.FC<FlowerProps> = ({
  size = 56,
  className = '',
  style,
  interactive = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const uid = Math.random().toString(36).substring(2, 6);
  const roseGradId = `roseOuterGrad-${uid}`;
  const roseCoreGradId = `roseCoreGrad-${uid}`;
  const leafGradId = `leafGrad-${uid}`;
  const stemGradId = `stemGrad-${uid}`;

  return (
    <motion.div
      className={`inline-block relative ${interactive ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size, ...style }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      animate={
        isHovered
          ? { scale: 1.28, rotate: 6 }
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
        className="w-full h-full drop-shadow-lg transition-all duration-300"
      >
        <defs>
          {/* Main Petal Radial Gradient */}
          <radialGradient id={roseGradId} cx="45%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#FF80AB" />
            <stop offset="45%" stopColor="#F06292" />
            <stop offset="80%" stopColor="#D81B60" />
            <stop offset="100%" stopColor="#880E4F" />
          </radialGradient>

          {/* Inner Core Glowing Velvet Gradient */}
          <radialGradient id={roseCoreGradId} cx="50%" cy="40%" r="45%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="35%" stopColor="#FF4081" />
            <stop offset="85%" stopColor="#C2185B" />
            <stop offset="100%" stopColor="#880E4F" />
          </radialGradient>

          {/* Leaf Gradient */}
          <linearGradient id={leafGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81C784" />
            <stop offset="60%" stopColor="#388E3C" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>

          {/* Stem Gradient */}
          <linearGradient id={stemGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>
        </defs>

        {/* Stem with Gentle Curve & Thorn */}
        <path
          d="M50 56 Q 51 75 49 96"
          stroke={`url(#${stemGradId})`}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Rose Thorn */}
        <path d="M48 78 C 42 76 40 73 44 71 C 48 71 49 75 48 78 Z" fill="#2E7D32" />

        {/* Left Rose Leaf */}
        <g>
          <path
            d="M49 70 Q 24 62 16 76 C 32 82 44 78 49 72 Z"
            fill={`url(#${leafGradId})`}
          />
          {/* Leaf Veins */}
          <path d="M49 71 Q 32 70 18 75" stroke="#A5D6A7" strokeWidth="1" fill="none" opacity="0.8" />
          <path d="M40 70 Q 30 67 26 65" stroke="#A5D6A7" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M35 73 Q 28 75 22 76" stroke="#A5D6A7" strokeWidth="0.8" fill="none" opacity="0.7" />
        </g>

        {/* Right Rose Leaf */}
        <g>
          <path
            d="M50 66 Q 76 58 84 72 C 68 78 56 74 50 68 Z"
            fill={`url(#${leafGradId})`}
          />
          {/* Leaf Veins */}
          <path d="M50 67 Q 66 66 82 71" stroke="#A5D6A7" strokeWidth="1" fill="none" opacity="0.8" />
          <path d="M60 66 Q 70 63 74 61" stroke="#A5D6A7" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M64 69 Q 72 71 78 72" stroke="#A5D6A7" strokeWidth="0.8" fill="none" opacity="0.7" />
        </g>

        {/* Green Sepal Base Leaves Cradling Flower */}
        <path d="M38 52 C 36 58 42 62 50 60 C 58 62 64 58 62 52 Z" fill="#2E7D32" />
        <path d="M40 54 Q 30 52 26 44 Q 36 48 44 54 Z" fill="#388E3C" />
        <path d="M60 54 Q 70 52 74 44 Q 64 48 56 54 Z" fill="#388E3C" />

        {/* Layer 1: Outermost Flared Petals */}
        <path
          d="M50 56 C 18 56 12 30 32 20 C 42 15 58 15 68 20 C 88 30 82 56 50 56 Z"
          fill={`url(#${roseGradId})`}
        />
        <path
          d="M20 38 C 12 24 30 12 48 16 C 36 28 26 40 20 38 Z"
          fill="#E91E63"
          opacity="0.9"
        />
        <path
          d="M80 38 C 88 24 70 12 52 16 C 64 28 74 40 80 38 Z"
          fill="#D81B60"
          opacity="0.9"
        />

        {/* Layer 2: Mid Blooming Petals */}
        <path
          d="M25 36 C 20 22 42 12 55 14 C 74 16 80 32 72 46 C 62 58 38 56 25 36 Z"
          fill="#FF4081"
          opacity="0.95"
        />
        <path
          d="M28 42 C 24 28 42 18 58 20 C 74 22 76 38 66 48 C 52 56 34 52 28 42 Z"
          fill="#E91E63"
        />

        {/* Layer 3: Inner Curled Petals */}
        <path
          d="M32 40 C 30 28 46 20 58 22 C 68 24 68 38 60 46 C 48 52 36 48 32 40 Z"
          fill={`url(#${roseCoreGradId})`}
        />

        {/* Layer 4: Spiral Rose Bud Core */}
        <path
          d="M38 38 C 36 30 48 24 56 26 C 62 28 62 38 56 42 C 48 46 40 44 38 38 Z"
          fill="#C2185B"
        />
        <path
          d="M41 36 C 40 30 50 26 55 28 C 59 30 58 38 52 40 C 46 42 42 40 41 36 Z"
          fill="#880E4F"
        />

        {/* Swirling Velvet Highlights & Petal Rims */}
        <path
          d="M43 33 Q 50 28 55 33 Q 53 40 46 38"
          stroke="#FFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M36 30 C 44 24 58 24 64 30"
          stroke="#FF80AB"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M30 38 C 36 46 54 50 68 42"
          stroke="#FFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Morning Dew Drops on Outer Petal */}
        <circle cx="30" cy="30" r="2.2" fill="#FFFFFF" opacity="0.95" />
        <circle cx="30" cy="30" r="1.2" fill="#E91E63" opacity="0.3" />
        <circle cx="68" cy="28" r="1.8" fill="#FFFFFF" opacity="0.9" />

        {/* Soft Glow when Hovered */}
        {isHovered && (
          <circle
            cx="50"
            cy="38"
            r="36"
            fill="#FF4081"
            opacity="0.22"
            className="animate-pulse"
          />
        )}
      </svg>

      {isHovered && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -8 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-[#D81B60] to-[#880E4F] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg pointer-events-none z-30 flex items-center gap-1"
        >
          <span>Velvet Pink Rose!</span> 🌹✨
        </motion.span>
      )}
    </motion.div>
  );
};
