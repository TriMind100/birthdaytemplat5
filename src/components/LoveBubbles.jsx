import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoveBubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [poppedBurst, setPoppedBurst] = useState([]);

  useEffect(() => {
    // Color palettes for vivid, bright, colorful glass bubbles
    const gradients = [
      {
        bg: 'radial-gradient(circle at 32% 32%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 105, 180, 0.65) 45%, rgba(255, 20, 147, 0.4) 80%, rgba(255, 182, 193, 0.2) 100%)',
        glow: 'rgba(255, 105, 180, 0.55)',
      },
      {
        bg: 'radial-gradient(circle at 32% 32%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 215, 0, 0.65) 45%, rgba(255, 165, 0, 0.4) 80%, rgba(255, 235, 150, 0.2) 100%)',
        glow: 'rgba(255, 215, 0, 0.55)',
      },
      {
        bg: 'radial-gradient(circle at 32% 32%, rgba(255, 255, 255, 0.95) 0%, rgba(199, 125, 255, 0.65) 45%, rgba(147, 51, 234, 0.4) 80%, rgba(230, 200, 255, 0.2) 100%)',
        glow: 'rgba(199, 125, 255, 0.55)',
      },
      {
        bg: 'radial-gradient(circle at 32% 32%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 77, 121, 0.65) 45%, rgba(224, 30, 90, 0.4) 80%, rgba(255, 192, 203, 0.2) 100%)',
        glow: 'rgba(255, 77, 121, 0.55)',
      },
      {
        bg: 'radial-gradient(circle at 32% 32%, rgba(255, 255, 255, 0.95) 0%, rgba(129, 230, 217, 0.65) 45%, rgba(56, 178, 172, 0.4) 80%, rgba(178, 245, 234, 0.2) 100%)',
        glow: 'rgba(129, 230, 217, 0.55)',
      },
    ];

    // Mix of sizes: Small (22-30px), Medium (38-52px), Large (64-84px)
    const generateSize = (index) => {
      if (index % 3 === 0) return Math.floor(Math.random() * 10) + 22; // Small
      if (index % 3 === 1) return Math.floor(Math.random() * 15) + 38; // Medium
      return Math.floor(Math.random() * 20) + 64; // Large
    };

    // Generate initial set of 28 colorful mixed-size floating bubbles
    const initialBubbles = Array.from({ length: 28 }).map((_, i) => {
      const size = generateSize(i);
      const gradientObj = gradients[i % gradients.length];
      return {
        id: i,
        x: Math.random() * 94 + 3,
        size,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 7,
        icon: size < 30 ? null : ['💖', '💕', '♡', '🌸', '🍒', '🎀', '✨'][Math.floor(Math.random() * 7)],
        wobbleX: Math.random() * 45 + 15,
        gradient: gradientObj.bg,
        glowColor: gradientObj.glow,
      };
    });

    setBubbles(initialBubbles);
  }, []);

  const handlePop = (bubble, e) => {
    e.stopPropagation();

    const burstId = Date.now() + Math.random();
    const clickX = e.clientX;
    const clickY = e.clientY;

    const miniHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: `${burstId}-${i}`,
      x: clickX,
      y: clickY,
      dx: (Math.random() - 0.5) * 110,
      dy: (Math.random() - 0.5) * 110,
      icon: ['💕', '✨', '💖', '♡', '🌸', '🌟'][Math.floor(Math.random() * 6)],
    }));

    setPoppedBurst((prev) => [...prev, ...miniHearts]);

    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id
          ? {
              ...b,
              x: Math.random() * 94 + 3,
              delay: 0,
              duration: Math.random() * 8 + 12,
            }
          : b
      )
    );

    setTimeout(() => {
      setPoppedBurst((prev) => prev.filter((item) => !item.id.startsWith(`${burstId}`)));
    }, 850);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* Colorful Bright Multi-Size Floating Love Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute cursor-pointer pointer-events-auto group flex items-center justify-center"
          style={{
            left: `${b.x}%`,
            bottom: `-90px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
          }}
          initial={{ y: 0, opacity: 0, scale: 0.8 }}
          animate={{
            y: [-20, -1250],
            x: [0, b.wobbleX, -b.wobbleX, 0],
            scale: [0.85, 1.06, 0.94, 1],
            rotate: [0, 12, -12, 0],
            opacity: [0, 0.95, 0.95, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: b.delay,
          }}
          onClick={(e) => handlePop(b, e)}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.65 }}
        >
          {/* Vivid Iridescent Glass Sphere Container */}
          <div 
            className="w-full h-full rounded-full relative flex items-center justify-center border-2 border-white shadow-[inset_0_0_14px_rgba(255,255,255,0.95)] backdrop-blur-[1.5px] transition-all duration-300 group-hover:scale-108"
            style={{
              background: b.gradient,
              boxShadow: `0 6px 25px ${b.glowColor}, inset 0 0 14px rgba(255, 255, 255, 0.95)`,
            }}
          >
            {/* Primary Curved Glass Reflection Light Highlight */}
            <div className="absolute top-1.5 left-2 w-3.5 h-3 bg-white/95 rounded-full rotate-[-35deg] blur-[0.2px]" />
            {/* Secondary Dot Specular Reflection */}
            <div className="absolute top-3.5 left-1.5 w-1.5 h-1.5 bg-white/90 rounded-full" />
            {/* Bottom Rim Ambient Reflection */}
            <div className="absolute bottom-1 right-2 w-3 h-1.5 bg-white/50 rounded-full rotate-[30deg] blur-[0.4px]" />

            {/* Inner Floating Heart / Icon (for Medium and Large Bubbles) */}
            {b.icon && (
              <span className={`font-handwriting select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] transform group-hover:scale-115 transition-transform ${
                b.size > 60 ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'
              }`}>
                {b.icon}
              </span>
            )}
          </div>
        </motion.div>
      ))}

      {/* Pop Burst Particle Effect */}
      <AnimatePresence>
        {poppedBurst.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 1.5,
              x: p.x + p.dx,
              y: p.y + p.dy,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed text-base sm:text-lg pointer-events-none z-50 filter drop-shadow-md"
          >
            {p.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
