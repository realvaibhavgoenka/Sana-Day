import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number; // percentage horizontal position (2% to 96%)
  size: number; // 16px to 40px
  duration: number; // 7s to 15s
  delay: number; // 0s to 10s
  sway: number; // horizontal sway distance in px
  rotate: number; // initial tilt angle
  color: string; // heart color fill
  opacity: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [poppedHeartId, setPoppedHeartId] = useState<number | null>(null);

  useEffect(() => {
    const colors = [
      '#FF1744', // Vivid Pink Red
      '#F06292', // Soft Pink
      '#D81B60', // Deep Rose
      '#FF80AB', // Bright Blush
      '#E91E63', // Hot Magenta
      '#FCE4EC', // Creamy Pink
      '#FFD54F', // Warm Gold Sparkle
    ];

    const generated: FloatingHeart[] = Array.from({ length: 22 }, (_, i) => {
      return {
        id: i,
        x: Math.random() * 92 + 4,
        size: Math.random() * 22 + 18, // 18px to 40px
        duration: Math.random() * 8 + 8, // 8s to 16s
        delay: Math.random() * 8, // staggered start
        sway: Math.random() * 40 + 20, // 20px to 60px sway
        rotate: (Math.random() - 0.5) * 40,
        color: colors[i % colors.length],
        opacity: Math.random() * 0.35 + 0.55,
      };
    });

    setHearts(generated);
  }, []);

  const handlePopHeart = (id: number) => {
    setPoppedHeartId(id);
    setTimeout(() => {
      setPoppedHeartId(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {hearts.map((h) => {
        const isPopped = poppedHeartId === h.id;

        return (
          <div
            key={h.id}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${h.x}%`,
              bottom: `-50px`,
            }}
          >
            <motion.div
              initial={{ y: '105vh', opacity: 0, scale: 0.8 }}
              animate={{
                y: '-10vh',
                x: [0, -h.sway, h.sway, -h.sway / 2, 0],
                rotate: [h.rotate, h.rotate - 15, h.rotate + 15, h.rotate],
                opacity: [0, h.opacity, h.opacity, 0],
                scale: [0.8, 1, 1.1, 0.9],
              }}
              transition={{
                duration: h.duration,
                delay: h.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.4, rotate: 0 }}
              onClick={() => handlePopHeart(h.id)}
              className="relative group"
            >
              <Heart
                style={{ width: h.size, height: h.size }}
                className="drop-shadow-[0_2px_8px_rgba(216,27,96,0.3)] transition-transform"
                fill={h.color}
                color={h.color === '#FCE4EC' ? '#F06292' : h.color}
              />

              {/* Sparkle burst when heart is tapped/popped */}
              <AnimatePresence>
                {isPopped && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <Sparkles className="w-8 h-8 text-[#FFD54F] animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
