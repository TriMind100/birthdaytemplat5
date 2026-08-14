import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ParticleHeartTrail = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handlePointerMove = (e) => {
      // Throttle particle creation
      if (Math.random() > 0.3) return;

      const x = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY);

      if (!x || !y) return;

      const newParticle = {
        id: Date.now() + Math.random(),
        x,
        y,
        size: Math.floor(Math.random() * 12) + 10,
        color: ['#FF4D79', '#FF85A1', '#FFB3C1', '#FFC72C', '#FF758F'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 360,
      };

      setParticles((prev) => [...prev.slice(-25), newParticle]);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
            animate={{
              opacity: 0,
              scale: 1.4,
              y: p.y - 45 - Math.random() * 30,
              x: p.x + (Math.random() * 40 - 20),
              rotate: p.rotation + 90,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ position: 'absolute', color: p.color }}
          >
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
