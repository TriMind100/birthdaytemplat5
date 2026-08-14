import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundDecoration = () => {
  // Generate random floating petals for tactile background vibe
  const petals = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 12) + 14,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft Paper Grain Texture Background */}
      <div className="absolute inset-0 paper-texture opacity-90" />
      
      {/* Warm Ambient Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#FAF5EB]/40 to-[#F5ECE0]/70" />

      {/* Floating Petals Ambient Animation */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-[#E8A5A5]/40 opacity-75"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -60, 20, 0],
            x: [0, 25, -25, 0],
            rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
            opacity: [0.3, 0.7, 0.4, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 14.5 7 19 9.5C14.5 12 12 17 12 17C12 17 9.5 12 5 9.5C9.5 7 12 2 12 2Z" />
          </svg>
        </motion.div>
      ))}

      {/* Corner Decorative Press-Flower & Ribbon Accents */}
      <div className="absolute top-4 left-4 opacity-25 hidden sm:block">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="#B8A394" strokeWidth="1.5">
          <path d="M10,10 Q30,40 10,70 Q40,30 70,10" />
          <circle cx="10" cy="10" r="3" fill="#D98888" />
          <circle cx="70" cy="10" r="4" fill="#E8A5A5" />
          <circle cx="10" cy="70" r="3" fill="#E8A5A5" />
        </svg>
      </div>

      <div className="absolute bottom-4 right-4 opacity-25 hidden sm:block">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="#B8A394" strokeWidth="1.5">
          <path d="M90,90 Q70,60 90,30 Q60,70 30,90" />
          <circle cx="90" cy="90" r="4" fill="#D98888" />
          <circle cx="30" cy="90" r="3" fill="#E8A5A5" />
          <circle cx="90" cy="30" r="3" fill="#E8A5A5" />
        </svg>
      </div>
    </div>
  );
};
