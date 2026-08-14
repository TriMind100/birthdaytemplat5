import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const AnimatedFlowers = () => {
  const [bloomed, setBloomed] = useState(true);

  // Floating yellow fireflies particles matching reference
  const fireflies = [
    { id: 1, x: 195, y: 70, size: 3, delay: 0, dur: 3.5 },
    { id: 2, x: 215, y: 55, size: 2.5, delay: 0.8, dur: 4.2 },
    { id: 3, x: 180, y: 90, size: 3.5, delay: 1.5, dur: 3.8 },
    { id: 4, x: 235, y: 80, size: 2, delay: 0.4, dur: 4.8 },
    { id: 5, x: 160, y: 110, size: 3, delay: 2.1, dur: 3.2 },
    { id: 6, x: 250, y: 105, size: 2.5, delay: 1.2, dur: 4.0 },
    { id: 7, x: 200, y: 40, size: 4, delay: 2.7, dur: 3.6 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-14 px-3 sm:px-6 text-center select-none">
      
      {/* Outer Card Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-[#050B14] rounded-3xl p-4 xs:p-6 sm:p-10 border-4 border-[#1E293B] shadow-2xl overflow-hidden ring-4 ring-[#38BDF8]/20 text-white"
      >
        {/* Ambient Radial Night Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(14,116,144,0.25)_0%,_rgba(5,11,20,1)_75%)] pointer-events-none" />

        {/* Section Title */}
        <div className="relative z-10 mb-4 sm:mb-6">
          <span className="font-cursive text-2xl sm:text-3xl text-[#38BDF8] flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#38BDF8]" /> bioluminescent blooms ♡
          </span>
          <h2 className="font-handwriting text-3xl sm:text-5xl font-bold text-white mt-1">
            Animated Night Flowers 🌸✨
          </h2>
          <p className="font-marker text-sm sm:text-base text-[#94A3B8] mt-1">
            Tap the flowers to trigger a glowing bloom pulse! ✦
          </p>
        </div>

        {/* Pure SVG Artwork Canvas (Matching Reference Screenshot Exactly) */}
        <div 
          onClick={() => setBloomed(!bloomed)} 
          className="relative z-10 w-full max-w-lg mx-auto h-[320px] sm:h-[400px] cursor-pointer overflow-hidden rounded-2xl border border-[#1E293B] bg-[#020617] shadow-2xl flex items-center justify-center"
        >
          <svg className="w-full h-full" viewBox="0 0 400 420" fill="none">
            <defs>
              {/* Teal Stem Gradient */}
              <linearGradient id="tealStem" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#083344" />
                <stop offset="40%" stopColor="#0E7490" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              {/* Teal Leaf Gradient */}
              <linearGradient id="tealLeaf" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7DD3FC" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>

              {/* Green Grass Gradient */}
              <linearGradient id="greenGrass" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#052E16" />
                <stop offset="50%" stopColor="#15803D" />
                <stop offset="100%" stopColor="#4ADE80" />
              </linearGradient>

              {/* Flower Glow Aura */}
              <filter id="flowerGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing Center Light Behind Flower Heads */}
            <circle cx="200" cy="140" r="85" fill="#38BDF8" opacity={bloomed ? "0.22" : "0.1"} filter="url(#flowerGlow)" />

            {/* --- 1. GREEN GRASS BLADES (LEFT & RIGHT) --- */}
            <g opacity="0.9">
              {/* Left Tall Green Grass */}
              <path d="M 85 420 Q 65 240 90 120 M 85 420 Q 100 260 110 180" stroke="url(#greenGrass)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 60 420 Q 40 280 65 190" stroke="url(#greenGrass)" strokeWidth="2.5" strokeLinecap="round" />

              {/* Right Tall Green Grass */}
              <path d="M 315 420 Q 335 240 310 120 M 315 420 Q 300 260 290 180" stroke="url(#greenGrass)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 340 420 Q 360 280 335 190" stroke="url(#greenGrass)" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* --- 2. BASE TEAL FERN CLUSTERS (ROUNDED OVAL LEAVES) --- */}
            <g fill="url(#tealLeaf)" stroke="#0284C7" strokeWidth="1" opacity="0.85">
              {/* Left Base Leaves */}
              <ellipse cx="140" cy="360" rx="18" ry="10" transform="rotate(-30 140 360)" />
              <ellipse cx="125" cy="340" rx="20" ry="11" transform="rotate(-40 125 340)" />
              <ellipse cx="115" cy="315" rx="22" ry="12" transform="rotate(-50 115 315)" />
              <ellipse cx="110" cy="290" rx="20" ry="11" transform="rotate(-60 110 290)" />

              {/* Right Base Leaves */}
              <ellipse cx="260" cy="360" rx="18" ry="10" transform="rotate(30 260 360)" />
              <ellipse cx="275" cy="340" rx="20" ry="11" transform="rotate(40 275 340)" />
              <ellipse cx="285" cy="315" rx="22" ry="12" transform="rotate(50 285 315)" />
              <ellipse cx="290" cy="290" rx="20" ry="11" transform="rotate(60 290 290)" />
            </g>

            {/* --- 3. MAIN FLOWER STEMS & PAIRED STEM LEAVES --- */}
            <g stroke="url(#tealStem)" strokeWidth="4.5" strokeLinecap="round">
              
              {/* CENTER STEM (TALLES) */}
              <path d="M 200 400 L 200 110" />

              {/* LEFT STEM (ANGLED LEFT) */}
              <path d="M 200 400 L 140 160" />

              {/* RIGHT STEM (ANGLED RIGHT) */}
              <path d="M 200 400 L 260 160" />
            </g>

            {/* STEM LEAF PAIRS */}
            <g fill="url(#tealLeaf)" opacity="0.95">
              {/* Center Stem Leaf Pairs */}
              <ellipse cx="180" cy="280" rx="16" ry="9" transform="rotate(-25 180 280)" />
              <ellipse cx="220" cy="280" rx="16" ry="9" transform="rotate(25 220 280)" />
              <ellipse cx="180" cy="220" rx="15" ry="8" transform="rotate(-25 180 220)" />
              <ellipse cx="220" cy="220" rx="15" ry="8" transform="rotate(25 220 220)" />
              <ellipse cx="182" cy="160" rx="14" ry="7" transform="rotate(-25 182 160)" />
              <ellipse cx="218" cy="160" rx="14" ry="7" transform="rotate(25 218 160)" />

              {/* Left Stem Leaf Pairs */}
              <ellipse cx="160" cy="310" rx="15" ry="8" transform="rotate(-45 160 310)" />
              <ellipse cx="140" cy="260" rx="14" ry="7" transform="rotate(-45 140 260)" />
              <ellipse cx="125" cy="210" rx="13" ry="6.5" transform="rotate(-45 125 210)" />

              {/* Right Stem Leaf Pairs */}
              <ellipse cx="240" cy="310" rx="15" ry="8" transform="rotate(45 240 310)" />
              <ellipse cx="260" cy="260" rx="14" ry="7" transform="rotate(45 260 260)" />
              <ellipse cx="275" cy="210" rx="13" ry="6.5" transform="rotate(45 275 210)" />
            </g>


            {/* --- 4. FLOWER BLOSSOMS (3 CUPPED CYAN FLOWERS) --- */}

            {/* A. LEFT FLOWER (x: 140, y: 160) */}
            <g transform="translate(140, 155) rotate(-18)" filter="url(#flowerGlow)">
              {/* Petals */}
              <path d="M 0 0 C -35 -20, -30 -50, 0 -35 C 30 -50, 35 -20, 0 0 Z" fill="#38BDF8" opacity="0.9" />
              <path d="M -25 -25 C -45 -10, -30 10, -10 5 Z" fill="#7DD3FC" />
              <path d="M 25 -25 C 45 -10, 30 10, 10 5 Z" fill="#7DD3FC" />
              <path d="M -25 -25 C -15 -45, 15 -45, 25 -25 C 0 -15, 0 -15, -25 -25 Z" fill="#BAE6FD" />
              
              {/* Glowing Stamen Cup */}
              <ellipse cx="0" cy="-22" rx="15" ry="7" fill="#FDE047" />
              <ellipse cx="0" cy="-22" rx="10" ry="4.5" fill="#FFF" />
            </g>

            {/* B. CENTER FLOWER (TALLEST - x: 200, y: 100) */}
            <g transform="translate(200, 95)" filter="url(#flowerGlow)">
              {/* Back Petals */}
              <path d="M 0 0 C -42 -25, -35 -60, 0 -42 C 35 -60, 42 -25, 0 0 Z" fill="#38BDF8" />
              <path d="M -30 -30 C -52 -12, -35 12, -12 6 Z" fill="#7DD3FC" />
              <path d="M 30 -30 C 52 -12, 35 12, 12 6 Z" fill="#7DD3FC" />
              <path d="M -30 -30 C -18 -55, 18 -55, 30 -30 C 0 -18, 0 -18, -30 -30 Z" fill="#E0F2FE" />
              
              {/* Glowing Stamen Cup */}
              <ellipse cx="0" cy="-26" rx="18" ry="8" fill="#FDE047" />
              <ellipse cx="0" cy="-26" rx="12" ry="5" fill="#FFF" />
            </g>

            {/* C. RIGHT FLOWER (x: 260, y: 160) */}
            <g transform="translate(260, 155) rotate(18)" filter="url(#flowerGlow)">
              {/* Petals */}
              <path d="M 0 0 C -35 -20, -30 -50, 0 -35 C 30 -50, 35 -20, 0 0 Z" fill="#38BDF8" opacity="0.9" />
              <path d="M -25 -25 C -45 -10, -30 10, -10 5 Z" fill="#7DD3FC" />
              <path d="M 25 -25 C 45 -10, 30 10, 10 5 Z" fill="#7DD3FC" />
              <path d="M -25 -25 C -15 -45, 15 -45, 25 -25 C 0 -15, 0 -15, -25 -25 Z" fill="#BAE6FD" />
              
              {/* Glowing Stamen Cup */}
              <ellipse cx="0" cy="-22" rx="15" ry="7" fill="#FDE047" />
              <ellipse cx="0" cy="-22" rx="10" ry="4.5" fill="#FFF" />
            </g>

            {/* --- 5. FLOATING GOLDEN FIREFLIES SPARKLES --- */}
            {fireflies.map((f) => (
              <motion.circle
                key={f.id}
                cx={f.x}
                cy={f.y}
                r={f.size}
                fill="#FEF08A"
                filter="url(#flowerGlow)"
                animate={{
                  cy: [f.y, f.y - 30, f.y - 60],
                  cx: [f.x, f.x + (f.id % 2 === 0 ? 12 : -12), f.x],
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: f.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: f.delay,
                }}
              />
            ))}

          </svg>
        </div>

        {/* Footer Quote */}
        <div className="relative z-10 mt-4 sm:mt-6 bg-slate-900/90 backdrop-blur-md py-3 px-6 rounded-2xl border border-slate-800 max-w-md mx-auto">
          <p className="font-handwriting text-lg sm:text-2xl text-[#38BDF8]">
            "May your year be as bright and magical as a garden in full bloom ✨"
          </p>
        </div>

      </motion.div>

    </div>
  );
};
