import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoveBubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const [poppedBurst, setPoppedBurst] = useState([]);

  useEffect(() => {
    // Generate initial set of 18 floating love bubbles
    const initialBubbles = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 92 + 4, // % across screen width
      size: Math.floor(Math.random() * 24) + 36, // size in px (36px - 60px)
      duration: Math.random() * 10 + 12, // float duration in s
      delay: Math.random() * 8,
      icon: ['💖', '💕', '♡', '🌸', '🍒', '🎀', '✨'][Math.floor(Math.random() * 7)],
      wobbleX: Math.random() * 30 + 15,
    }));
    setBubbles(initialBubbles);
  }, []);

  const handlePop = (bubble, e) => {
    e.stopPropagation();

    // Create pop burst effect at bubble coordinates
    const burstId = Date.now() + Math.random();
    const clickX = e.clientX;
    const clickY = e.clientY;

    const miniHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: `${burstId}-${i}`,
      x: clickX,
      y: clickY,
      dx: (Math.random() - 0.5) * 80,
      dy: (Math.random() - 0.5) * 80,
      icon: ['💕', '✨', '💖', '♡'][Math.floor(Math.random() * 4)],
    }));

    setPoppedBurst((prev) => [...prev, ...miniHearts]);

    // Respawn bubble at bottom after short delay
    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id
          ? {
              ...b,
              x: Math.random() * 92 + 4,
              delay: 0,
              duration: Math.random() * 10 + 12,
            }
          : b
      )
    );

    // Clean up pop burst
    setTimeout(() => {
      setPoppedBurst((prev) => prev.filter((item) => !item.id.startsWith(`${burstId}`)));
    }, 800);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* Floating Glossy Love Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute cursor-pointer pointer-events-auto group filter drop-shadow-md flex items-center justify-center"
          style={{
            left: `${b.x}%`,
            bottom: `-70px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-20, -1150],
            x: [0, b.wobbleX, -b.wobbleX, 0],
            scale: [0.8, 1.05, 0.95, 1],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: b.delay,
          }}
          onClick={(e) => handlePop(b, e)}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.7 }}
        >
          {/* Glossy Translucent Glass Bubble Container */}
          <div className="w-full h-full rounded-full relative flex items-center justify-center border-2 border-white/60 shadow-[0_4px_15px_rgba(255,182,193,0.5)] backdrop-blur-[1px]"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 182, 193, 0.45) 50%, rgba(255, 105, 180, 0.35) 100%)',
            }}
          >
            {/* Top Shine Highlight Spot */}
            <div className="absolute top-1.5 left-2 w-3 h-2.5 bg-white/80 rounded-full rotate-[-30deg] blur-[0.5px]" />
            <div className="absolute top-3 left-1.5 w-1.5 h-1.5 bg-white/60 rounded-full" />

            {/* Inner Floating Heart / Icon */}
            <span className="font-handwriting text-xs sm:text-sm select-none filter drop-shadow-xs transform group-hover:scale-110 transition-transform">
              {b.icon}
            </span>
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
              scale: 1.3,
              x: p.x + p.dx,
              y: p.y + p.dy,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="fixed text-sm pointer-events-none z-50 filter drop-shadow-xs"
          >
            {p.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
