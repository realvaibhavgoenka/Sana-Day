import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SingleLilySVG } from './LilyFlowerSVG';

interface FloatingItem {
  id: number;
  type: 'flower' | 'petal';
  x: number; // horizontal percentage position (0 - 95%)
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  color: 'pink' | 'blue' | 'gold';
  opacity: number;
}

export const FloatingLilies: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [bloomedCount, setBloomedCount] = useState<number>(0);
  const [bloomedMessage, setBloomedMessage] = useState<string | null>(null);

  useEffect(() => {
    // Generate a mix of full floating Lily flowers and falling lily petals across screen
    const generated: FloatingItem[] = Array.from({ length: 24 }, (_, i) => {
      const isFlower = i % 3 !== 0; // 2/3 are full flowers, 1/3 are petals
      const colorType: 'pink' | 'blue' | 'gold' = i % 5 === 0 ? 'gold' : i % 2 === 0 ? 'pink' : 'blue';
      return {
        id: i,
        type: isFlower ? 'flower' : 'petal',
        x: Math.random() * 92 + 3, // keep within screen bounds
        size: isFlower ? Math.random() * 22 + 32 : Math.random() * 16 + 18,
        duration: Math.random() * 14 + 12,
        delay: Math.random() * 10,
        rotate: Math.random() * 360,
        color: colorType,
        opacity: Math.random() * 0.35 + 0.6,
      };
    });
    setItems(generated);
  }, []);

  const handleHoverItem = (id: number) => {
    if (hoveredId !== id) {
      setHoveredId(id);
      setBloomedCount((prev) => prev + 1);

      // Cute toast messages when blooming flowers
      const messages = [
        "Lily bloomed for Sana! 🌸",
        "Magic Pink Lily! ✨",
        "Hover & Bloom! 🌷",
        "Sana's Garden Blooming! 💖",
        "Pretty Flower Bloomed! 🌼",
      ];
      setBloomedMessage(messages[Math.floor(Math.random() * messages.length)]);

      setTimeout(() => {
        setBloomedMessage(null);
      }, 2200);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Floating Bloom Toast Notification when hovering background flowers */}
      <AnimatePresence>
        {bloomedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-20 right-6 z-50 bg-[#FFF9FB]/95 backdrop-blur-md border-2 border-[#FCE4EC] text-[#D81B60] text-xs font-serif italic font-bold px-4 py-2 rounded-full shadow-lg pointer-events-none flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#F06292] animate-ping" />
            <span>{bloomedMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Interactive Background Lilies */}
      {items.map((item) => {
        const isHovered = hoveredId === item.id;

        return (
          <div
            key={item.id}
            className="absolute animate-lily-fall pointer-events-auto"
            style={{
              left: `${item.x}%`,
              top: `-60px`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              animationIterationCount: 'infinite',
              opacity: isHovered ? 1 : item.opacity,
            }}
            onMouseEnter={() => handleHoverItem(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {item.type === 'flower' ? (
              <motion.div
                animate={
                  isHovered
                    ? { scale: 1.5, rotate: item.rotate + 25 }
                    : { scale: 1, rotate: item.rotate }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="cursor-pointer relative group"
              >
                <SingleLilySVG
                  color={item.color}
                  size={item.size}
                  interactive={false}
                  className={`transition-all duration-300 ${
                    isHovered ? 'filter drop-shadow-[0_0_12px_rgba(240,98,146,0.8)]' : ''
                  }`}
                />

                {/* Sparkle burst halo when hovered */}
                {isHovered && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.3, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-xs">✨🌸</span>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* Single Petal with Bloom Glow on Hover */
              <motion.div
                animate={
                  isHovered
                    ? { scale: 1.6, rotate: item.rotate + 45 }
                    : { scale: 1, rotate: item.rotate }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="cursor-pointer relative"
              >
                <svg
                  width={item.size}
                  height={item.size * 1.4}
                  viewBox="0 0 30 42"
                  fill="none"
                  className={`transition-all duration-300 ${
                    isHovered ? 'filter drop-shadow-[0_0_10px_rgba(240,98,146,0.9)]' : ''
                  }`}
                >
                  <path
                    d="M15 0 C 28 12, 30 28, 15 42 C 0 28, 2 12, 15 0 Z"
                    fill={
                      isHovered
                        ? '#FF1744'
                        : item.color === 'pink'
                        ? 'url(#pinkPetalGrad)'
                        : 'url(#bluePetalGrad)'
                    }
                  />
                </svg>
              </motion.div>
            )}
          </div>
        );
      })}

      {/* SVG Color Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="pinkPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="60%" stopColor="#F06292" />
            <stop offset="100%" stopColor="#D81B60" />
          </linearGradient>
          <linearGradient id="bluePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
