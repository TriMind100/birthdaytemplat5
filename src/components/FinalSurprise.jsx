import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Flame, Gift, RotateCcw, Wind } from 'lucide-react';
import { BearBadgeSticker, QuoteSticker } from './Stickers';

// â”€â”€ FLOATING POP-UP ANIMATED BALLOONS â”€â”€
const PopUpBalloons = () => {
  const [popped, setPopped] = useState({});

  const balloons = [
    { id: 1, type: 'heart', color: '#FF4D79', lightColor: '#FF85A1', left: '6%', delay: 0.1, duration: 7, size: 54 },
    { id: 2, type: 'round', color: '#4DD0E1', lightColor: '#80DEEA', left: '16%', delay: 0.4, duration: 8.5, size: 48 },
    { id: 3, type: 'heart', color: '#FFD54F', lightColor: '#FFE082', left: '26%', delay: 0.2, duration: 6.8, size: 58 },
    { id: 4, type: 'round', color: '#C77DFF', lightColor: '#E0B0FF', left: '36%', delay: 0.6, duration: 7.5, size: 50 },
    { id: 5, type: 'heart', color: '#FF7043', lightColor: '#FFAB91', left: '48%', delay: 0.15, duration: 8, size: 56 },
    { id: 6, type: 'round', color: '#FF4D79', lightColor: '#FF85A1', left: '60%', delay: 0.5, duration: 7.2, size: 52 },
    { id: 7, type: 'heart', color: '#26A69A', lightColor: '#80CBC4', left: '70%', delay: 0.3, duration: 8.8, size: 60 },
    { id: 8, type: 'round', color: '#FFD54F', lightColor: '#FFE082', left: '82%', delay: 0.7, duration: 7.6, size: 46 },
    { id: 9, type: 'heart', color: '#EC407A', lightColor: '#F48FB1', left: '90%', delay: 0.25, duration: 8.2, size: 52 },
  ];

  const handlePop = (id, e) => {
    e.stopPropagation();
    if (popped[id]) return;

    setPopped((prev) => ({ ...prev, [id]: true }));

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 16,
      spread: 60,
      origin: { x, y },
      colors: ['#FF4D79', '#FFD54F', '#4DD0E1', '#C77DFF'],
      scalar: 0.75,
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {balloons.map((b) => {
        if (popped[b.id]) return null;

        return (
          <motion.div
            key={b.id}
            initial={{ y: '105vh', x: 0, opacity: 0, scale: 0.3 }}
            animate={{
              y: '-25vh',
              x: [0, 18, -18, 10, -10, 0],
              opacity: [0, 1, 1, 1, 0.8, 0],
              scale: [0.5, 1, 1, 0.95],
              rotate: [-6, 6, -4, 4, -2, 2],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
            style={{ left: b.left }}
            onClick={(e) => handlePop(b.id, e)}
            className="absolute cursor-pointer pointer-events-auto group touch-manipulation filter drop-shadow-md hover:scale-110 transition-transform"
          >
            <svg
              width={b.size}
              height={b.size * 1.6}
              viewBox="0 0 60 90"
              fill="none"
              className="overflow-visible"
            >
              {/* Balloon Body */}
              {b.type === 'heart' ? (
                <path
                  d="M 30 45 C 30 45 4 28 4 16 C 4 7 12 2 20 2 C 26 2 29 6 30 8 C 31 6 34 2 40 2 C 48 2 56 7 56 16 C 56 28 30 45 30 45 Z"
                  fill={b.color}
                  stroke="#2B1A1D"
                  strokeWidth="2.5"
                />
              ) : (
                <ellipse
                  cx="30"
                  cy="26"
                  rx="24"
                  ry="24"
                  fill={b.color}
                  stroke="#2B1A1D"
                  strokeWidth="2.5"
                />
              )}

              {/* Highlight */}
              {b.type === 'heart' ? (
                <path
                  d="M 14 10 C 10 14 10 20 12 24"
                  stroke={b.lightColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              ) : (
                <ellipse
                  cx="20"
                  cy="16"
                  rx="7"
                  ry="4"
                  fill={b.lightColor}
                  opacity="0.75"
                  transform="rotate(-25 20 16)"
                />
              )}

              {/* Bottom Knot */}
              <polygon points="26,45 34,45 30,50" fill={b.color} stroke="#2B1A1D" strokeWidth="2" />

              {/* String */}
              <path
                d="M 30 50 C 35 62, 25 72, 32 88"
                stroke="#2B1A1D"
                strokeWidth="1.8"
                strokeDasharray="2 1"
                fill="none"
                opacity="0.7"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

// ── KAWAII RAINBOW BIRTHDAY CAKE (EXACT MATCH TO ARTWORK) ──
const TwoTierBirthdayCake = ({ isCandleBlown, isBlowing, onBlowCandle }) => {
  // 5 pastel rainbow candles on top surface matching reference image
  const candles = [
    { id: 1, x: 54, y: 76, color: '#FF94B8' },   // pink
    { id: 2, x: 96, y: 68, color: '#FFF275' },   // yellow
    { id: 3, x: 138, y: 64, color: '#A8E6CF' },  // mint
    { id: 4, x: 180, y: 68, color: '#D1C4E9' },  // lavender
    { id: 5, x: 222, y: 76, color: '#89CFF0' },  // sky blue
  ];

  return (
    <div
      onClick={onBlowCandle}
      className="relative inline-flex flex-col items-center cursor-pointer group p-1 touch-manipulation select-none"
    >
      {/* Floating sparkle accents */}
      <div className="absolute -top-3 left-4 text-[#FFD54F] text-sm animate-pulse">★</div>
      <div className="absolute top-4 -right-2 text-[#FF85A1] text-base animate-bounce">✨</div>
      <div className="absolute bottom-12 -left-3 text-[#A8E6CF] text-xs">✦</div>
      <div className="absolute top-12 left-0 text-[#FF94B8] text-xs">♡</div>

      <svg
        className="w-76 h-84 xs:w-84 xs:h-92 sm:w-[23rem] sm:h-[27rem] overflow-visible filter drop-shadow-2xl"
        viewBox="0 -30 280 340"
        fill="none"
      >
        <defs>
          {/* Clip path for the cylindrical cake body */}
          <clipPath id="cakeCylinderClip">
            <path d="M 35 75 L 35 250 C 35 272, 245 272, 245 250 L 245 75 C 245 97, 35 97, 35 75 Z" />
          </clipPath>

          {/* Strawberry gradient */}
          <linearGradient id="berryGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF4060" />
            <stop offset="100%" stopColor="#D81B43" />
          </linearGradient>

          {/* Flame aura glow */}
          <radialGradient id="candleFlameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF59D" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FFD54F" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF9800" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── PLATE & BASE SHADOW ── */}
        <ellipse cx="140" cy="282" rx="130" ry="14" fill="rgba(43,29,34,0.12)" />
        {/* Plate Outer Rim (Soft Lavender / Periwinkle Grey) */}
        <ellipse cx="140" cy="276" rx="126" ry="19" fill="#BAC3D8" stroke="#2B1D22" strokeWidth="3.5" />
        {/* Plate Inner Surface */}
        <ellipse cx="140" cy="273" rx="120" ry="15" fill="#E8EDF8" stroke="#2B1D22" strokeWidth="2.5" />

        {/* ── PLATE DECORATIONS: 3 Strawberries & 2 Pink Flowers ── */}
        {/* Far Left Strawberry */}
        <g transform="translate(32, 268) rotate(-12) scale(0.95)">
          <path d="M 0 -8 C 6 -8, 9 -2, 7 6 C 5 11, 0 14, 0 14 C 0 14, -5 11, -7 6 C -9 -2, -6 -8, 0 -8 Z" fill="url(#berryGrad)" stroke="#2B1D22" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="-2" cy="-1" r="0.8" fill="#FFF275" />
          <circle cx="2" cy="0" r="0.8" fill="#FFF275" />
          <circle cx="0" cy="5" r="0.8" fill="#FFF275" />
          <circle cx="-2" cy="9" r="0.7" fill="#FFF275" />
          {/* Calyx Leaves */}
          <path d="M 0 -8 L -4 -11 L -1 -8 L -5 -9 L -2 -7 L 0 -11 L 2 -7 L 5 -9 L 1 -8 L 4 -11 Z" fill="#43A047" stroke="#2B1D22" strokeWidth="1.2" />
        </g>

        {/* Left Pink Flower */}
        <g transform="translate(76, 274)">
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <circle key={i} cx={Math.cos(deg * Math.PI / 180) * 5.5} cy={Math.sin(deg * Math.PI / 180) * 5.5} r="4.8" fill="#FFB4C6" stroke="#2B1D22" strokeWidth="1.5" />
          ))}
          <circle cx="0" cy="0" r="3.2" fill="#FFE082" stroke="#2B1D22" strokeWidth="1.5" />
        </g>

        {/* Center Strawberry */}
        <g transform="translate(140, 278) scale(0.95)">
          <path d="M 0 -8 C 6 -8, 9 -2, 7 6 C 5 11, 0 14, 0 14 C 0 14, -5 11, -7 6 C -9 -2, -6 -8, 0 -8 Z" fill="url(#berryGrad)" stroke="#2B1D22" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="-2" cy="-1" r="0.8" fill="#FFF275" />
          <circle cx="2" cy="0" r="0.8" fill="#FFF275" />
          <circle cx="0" cy="5" r="0.8" fill="#FFF275" />
          {/* Calyx Leaves */}
          <path d="M 0 -8 L -4 -11 L -1 -8 L -5 -9 L -2 -7 L 0 -11 L 2 -7 L 5 -9 L 1 -8 L 4 -11 Z" fill="#43A047" stroke="#2B1D22" strokeWidth="1.2" />
        </g>

        {/* Right Pink Flower */}
        <g transform="translate(196, 274)">
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <circle key={i} cx={Math.cos(deg * Math.PI / 180) * 5.5} cy={Math.sin(deg * Math.PI / 180) * 5.5} r="4.8" fill="#FFB4C6" stroke="#2B1D22" strokeWidth="1.5" />
          ))}
          <circle cx="0" cy="0" r="3.2" fill="#FFE082" stroke="#2B1D22" strokeWidth="1.5" />
        </g>

        {/* Far Right Strawberry */}
        <g transform="translate(244, 268) rotate(12) scale(0.95)">
          <path d="M 0 -8 C 6 -8, 9 -2, 7 6 C 5 11, 0 14, 0 14 C 0 14, -5 11, -7 6 C -9 -2, -6 -8, 0 -8 Z" fill="url(#berryGrad)" stroke="#2B1D22" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="-2" cy="-1" r="0.8" fill="#FFF275" />
          <circle cx="2" cy="0" r="0.8" fill="#FFF275" />
          <circle cx="0" cy="5" r="0.8" fill="#FFF275" />
          <circle cx="2" cy="9" r="0.7" fill="#FFF275" />
          {/* Calyx Leaves */}
          <path d="M 0 -8 L -4 -11 L -1 -8 L -5 -9 L -2 -7 L 0 -11 L 2 -7 L 5 -9 L 1 -8 L 4 -11 Z" fill="#43A047" stroke="#2B1D22" strokeWidth="1.2" />
        </g>

        {/* ── CAKE CYLINDER: 5 RAINBOW COLOR BANDS ── */}
        <g clipPath="url(#cakeCylinderClip)">
          {/* Layer 5 (Bottom Face Tier): Warm Cream White */}
          <rect x="30" y="206" width="220" height="70" fill="#FFF4E6" />
          {/* Layer 4: Sky Blue */}
          <rect x="30" y="174" width="220" height="34" fill="#89CFF0" />
          {/* Layer 3: Pastel Mint Green */}
          <rect x="30" y="142" width="220" height="34" fill="#A8E6CF" />
          {/* Layer 2: Creamy Pastel Yellow */}
          <rect x="30" y="110" width="220" height="34" fill="#FFF275" />
          {/* Layer 1 (Top): Soft Peach / Pink Coral */}
          <rect x="30" y="70" width="220" height="42" fill="#FFAF9B" />
        </g>

        {/* Subtle Horizontal Curved Layer Dividers */}
        <path d="M 35 110 C 35 132, 245 132, 245 110" stroke="#2B1D22" strokeWidth="1" opacity="0.3" fill="none" />
        <path d="M 35 142 C 35 164, 245 164, 245 142" stroke="#2B1D22" strokeWidth="1" opacity="0.3" fill="none" />
        <path d="M 35 174 C 35 196, 245 196, 245 174" stroke="#2B1D22" strokeWidth="1" opacity="0.3" fill="none" />
        <path d="M 35 206 C 35 228, 245 228, 245 206" stroke="#2B1D22" strokeWidth="1" opacity="0.3" fill="none" />

        {/* Cake Body Outer Dark Outline */}
        <path d="M 35 75 L 35 250 C 35 272, 245 272, 245 250 L 245 75" stroke="#2B1D22" strokeWidth="3.5" strokeLinejoin="round" fill="none" />

        {/* ── KAWAII FACE ON BOTTOM TIER ── */}
        {/* Left Eye */}
        <ellipse cx="98" cy="232" rx="12" ry="14" fill="#2B1D22" />
        <ellipse cx="94" cy="226" rx="5.5" ry="6.5" fill="#FFFFFF" />
        <circle cx="103" cy="237" r="3" fill="#FFFFFF" />
        <circle cx="94" cy="240" r="1.4" fill="#FFFFFF" />
        {/* Left Eyelashes (3 cute arches) */}
        <path d="M 87 218 C 90 213, 94 212, 97 215" stroke="#2B1D22" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 96 215 C 99 210, 104 210, 107 213" stroke="#2B1D22" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 105 215 C 107 211, 112 211, 114 215" stroke="#2B1D22" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Right Eye */}
        <ellipse cx="178" cy="232" rx="12" ry="14" fill="#2B1D22" />
        <ellipse cx="174" cy="226" rx="5.5" ry="6.5" fill="#FFFFFF" />
        <circle cx="183" cy="237" r="3" fill="#FFFFFF" />
        <circle cx="174" cy="240" r="1.4" fill="#FFFFFF" />
        {/* Right Eyelashes (3 cute arches) */}
        <path d="M 164 215 C 166 211, 171 211, 173 215" stroke="#2B1D22" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 172 213 C 175 210, 180 210, 183 215" stroke="#2B1D22" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 181 215 C 184 212, 188 213, 191 218" stroke="#2B1D22" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Cheeks (Blush) */}
        <circle cx="74" cy="242" r="9.5" fill="#FFB4C6" opacity="0.65" />
        <circle cx="202" cy="242" r="9.5" fill="#FFB4C6" opacity="0.65" />

        {/* Cute Cat Mouth with Tongue */}
        <path
          d="M 127 248 C 131 254, 136 254, 138 250 C 140 254, 145 254, 149 248"
          stroke="#2B1D22"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 133 252 C 133 259, 143 259, 143 252 Z"
          fill="#FF6B97"
          stroke="#2B1D22"
          strokeWidth="1.8"
        />

        {/* ── THICK PINK DRIPPING FROSTING ── */}
        <path
          d="M 35 75 
             C 35 97, 245 97, 245 75 
             L 245 106
             C 240 106, 236 122, 230 142
             C 226 120, 222 104, 216 104
             C 210 104, 206 138, 200 156
             C 194 135, 190 103, 184 103
             C 178 103, 172 126, 166 138
             C 160 124, 156 102, 150 102
             C 144 102, 140 148, 138 168
             C 134 145, 130 102, 124 102
             C 118 102, 114 128, 108 140
             C 102 125, 98 104, 92 104
             C 86 104, 82 142, 76 160
             C 70 138, 66 106, 58 106
             C 52 106, 48 122, 44 132
             C 40 120, 37 106, 35 106
             Z"
          fill="#FF5D8F"
          stroke="#2B1D22"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* ── TOP SURFACE (FLAT PINK OVAL) ── */}
        <ellipse cx="140" cy="75" rx="105" ry="22" fill="#FF85A8" stroke="#2B1D22" strokeWidth="3.5" />

        {/* ── TOP DECORATIONS ── */}

        {/* 1. Rainbow Swirl Ice Cream Scoop with Cherry (Back Left) */}
        <g transform="translate(70, 36)">
          <circle cx="0" cy="0" r="22" fill="#A8E6CF" stroke="#2B1D22" strokeWidth="2.8" />
          {/* Swirl Stripes */}
          <path d="M -18 6 C -10 -10, 4 -18, 18 -10" stroke="#FF94B8" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M -14 14 C -4 0, 8 -8, 20 0" stroke="#FFF275" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M -8 19 C 0 8, 12 2, 21 8" stroke="#89CFF0" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Cherry on Top */}
          <circle cx="0" cy="-24" r="7.5" fill="#E62E5C" stroke="#2B1D22" strokeWidth="2.2" />
          <circle cx="-2.5" cy="-26.5" r="2" fill="#FFFFFF" opacity="0.75" />
          <path d="M 1 -31 C 3 -37, 8 -34, 7 -32" stroke="#4E342E" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </g>

        {/* 2. Chocolate Chip Cookie (Far Left) */}
        <g transform="translate(42, 60)">
          <circle cx="0" cy="0" r="10" fill="#D7A86E" stroke="#2B1D22" strokeWidth="2.2" />
          <circle cx="-3" cy="-2" r="1.8" fill="#4E342E" />
          <circle cx="3.5" cy="1" r="1.8" fill="#4E342E" />
          <circle cx="-0.5" cy="4.5" r="1.5" fill="#4E342E" />
        </g>

        {/* 3. Top Strawberry (Left) */}
        <g transform="translate(56, 52) scale(0.85)">
          <path d="M 0 -8 C 6 -8, 9 -2, 7 6 C 5 11, 0 14, 0 14 C 0 14, -5 11, -7 6 C -9 -2, -6 -8, 0 -8 Z" fill="url(#berryGrad)" stroke="#2B1D22" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="-2" cy="-1" r="0.8" fill="#FFF275" />
          <circle cx="2" cy="0" r="0.8" fill="#FFF275" />
          <circle cx="0" cy="5" r="0.8" fill="#FFF275" />
          <path d="M 0 -8 L -4 -11 L -1 -8 L -5 -9 L -2 -7 L 0 -11 L 2 -7 L 5 -9 L 1 -8 L 4 -11 Z" fill="#43A047" stroke="#2B1D22" strokeWidth="1.2" />
        </g>

        {/* 4. White Scalloped Cloud with Cute Face (Center Back) */}
        <g transform="translate(138, 44)">
          {/* Cloud Bubble Shape */}
          <ellipse cx="0" cy="3" rx="18" ry="11" fill="#FFFFFF" stroke="#2B1D22" strokeWidth="2.2" />
          <circle cx="-10" cy="-2" r="9" fill="#FFFFFF" stroke="#2B1D22" strokeWidth="2.2" />
          <circle cx="10" cy="-2" r="9" fill="#FFFFFF" stroke="#2B1D22" strokeWidth="2.2" />
          <circle cx="0" cy="-8" r="10" fill="#FFFFFF" stroke="#2B1D22" strokeWidth="2.2" />
          {/* Inner Mask to hide internal overlapping strokes */}
          <ellipse cx="0" cy="0" rx="18" ry="11" fill="#FFFFFF" />
          <circle cx="-8" cy="-2" r="8" fill="#FFFFFF" />
          <circle cx="8" cy="-2" r="8" fill="#FFFFFF" />
          <circle cx="0" cy="-6" r="9" fill="#FFFFFF" />
          {/* Tiny Face */}
          <circle cx="-5" cy="-1" r="1.5" fill="#2B1D22" />
          <circle cx="5" cy="-1" r="1.5" fill="#2B1D22" />
          <path d="M -2.5 3 C 0 5, 2.5 5, 5 3" stroke="#2B1D22" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </g>

        {/* 5. Rainbow Swirl Lollipop on Stick (Right) */}
        <g transform="translate(202, 34)">
          {/* Wooden Stick */}
          <line x1="0" y1="12" x2="3" y2="40" stroke="#8D6E63" strokeWidth="3.2" strokeLinecap="round" />
          {/* Lollipop Disc */}
          <circle cx="0" cy="0" r="17" fill="#FFF275" stroke="#2B1D22" strokeWidth="2.8" />
          {/* Swirl Stripes */}
          <path d="M -13 4 C -6 -8, 4 -14, 14 -8" stroke="#FF85A1" strokeWidth="3.8" strokeLinecap="round" fill="none" />
          <path d="M -8 11 C 0 1, 8 -6, 16 -1" stroke="#89CFF0" strokeWidth="3.8" strokeLinecap="round" fill="none" />
          <path d="M -2 15 C 6 8, 12 3, 16 7" stroke="#FF85A1" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Glossy Reflection */}
          <ellipse cx="-5" cy="-6" rx="4" ry="2" fill="#FFFFFF" opacity="0.65" />
        </g>

        {/* 6. Whipped Cream Rosette / Meringue Drop (Far Right) */}
        <g transform="translate(232, 64)">
          <ellipse cx="0" cy="0" rx="7.5" ry="5.5" fill="#FFFFFF" stroke="#2B1D22" strokeWidth="2" />
          <path d="M -4 -2 C -2 -7, 2 -7, 4 -2" stroke="#2B1D22" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>

        {/* 7. Flowers Between Candles */}
        {/* Flower between candle 1 & 2 (Pink) */}
        <g transform="translate(112, 70)">
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <circle key={i} cx={Math.cos(deg * Math.PI / 180) * 5} cy={Math.sin(deg * Math.PI / 180) * 5} r="4.2" fill="#FFB4C6" stroke="#2B1D22" strokeWidth="1.4" />
          ))}
          <circle cx="0" cy="0" r="2.8" fill="#FFE082" stroke="#2B1D22" strokeWidth="1.4" />
        </g>

        {/* Flower between candle 3 & 4 (Blue) */}
        <g transform="translate(162, 68)">
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <circle key={i} cx={Math.cos(deg * Math.PI / 180) * 5} cy={Math.sin(deg * Math.PI / 180) * 5} r="4.2" fill="#90CAF9" stroke="#2B1D22" strokeWidth="1.4" />
          ))}
          <circle cx="0" cy="0" r="2.8" fill="#FFE082" stroke="#2B1D22" strokeWidth="1.4" />
        </g>

        {/* ── 5 PASTEL RAINBOW CANDLES & ANIMATED FLAMES ── */}
        {candles.map((c) => (
          <g key={c.id} transform={`translate(${c.x}, ${c.y})`}>
            {/* Candle Whipped Cream Rosette Base */}
            <ellipse cx="0" cy="0" rx="9" ry="4" fill="#FFFFFF" stroke="#2B1D22" strokeWidth="1.8" />
            <path d="M -6 -1 C -4 -3.5, -1 -4, 0 -2.5 C 1 -4, 4 -3.5, 6 -1" stroke="#2B1D22" strokeWidth="1.2" fill="none" />

            {/* Candle Cylinder Body */}
            <rect x="-4.5" y="-28" width="9" height="28" rx="2" fill={c.color} stroke="#2B1D22" strokeWidth="2.2" />

            {/* White Diagonal Stripes */}
            <path d="M -4.5 -21 L 4.5 -25 L 4.5 -19 L -4.5 -15 Z" fill="#FFFFFF" />
            <path d="M -4.5 -10 L 4.5 -14 L 4.5 -8 L -4.5 -4 Z" fill="#FFFFFF" />

            {/* Black Candle Wick */}
            <line x1="0" y1="-28" x2="0" y2="-34" stroke="#2B1D22" strokeWidth="2.4" strokeLinecap="round" />

            {/* FLAME ANIMATIONS */}
            <AnimatePresence>
              {!isCandleBlown && (
                <motion.g
                  key={`flame-g-${c.id}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isBlowing
                      ? {
                          rotate: -55,
                          scale: [1, 1.35, 0.5, 0],
                          opacity: [1, 0.9, 0.4, 0],
                          x: -14,
                          y: -6,
                        }
                      : {
                          opacity: 1,
                          scale: [1, 1.12, 0.96, 1.05, 1],
                          rotate: [-2, 2, -1, 3, 0],
                          y: [0, -1, 0],
                        }
                  }
                  exit={{ opacity: 0, scale: 0 }}
                  transition={
                    isBlowing
                      ? { duration: 0.45, delay: (5 - c.id) * 0.06, ease: 'easeOut' }
                      : {
                          duration: 1.2 + c.id * 0.15,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                  }
                  style={{ transformOrigin: '0px -34px' }}
                >
                  {/* Glowing Light Aura */}
                  <circle cx="0" cy="-45" r="16" fill="url(#candleFlameGlow)" />

                  {/* Outer Flame (Orange Red) */}
                  <path
                    d="M 0 -56 C 6 -46 9 -40 9 -35 C 9 -30 5 -27 0 -27 C -5 -27 -9 -30 -9 -35 C -9 -40 -6 -46 0 -56 Z"
                    fill="#FF4500"
                    stroke="#2B1D22"
                    strokeWidth="1.2"
                  />
                  {/* Middle Flame (Bright Yellow) */}
                  <path
                    d="M 0 -51 C 4 -43 7 -38 7 -34 C 7 -30 4 -28 0 -28 C -4 -28 -7 -30 -7 -34 C -7 -38 -4 -43 0 -51 Z"
                    fill="#FFD700"
                  />
                  {/* Inner Core (White Spark) */}
                  <path
                    d="M 0 -44 C 2 -39 4 -36 4 -33 C 4 -31 2 -30 0 -30 C -2 -30 -4 -31 -4 -33 C -4 -36 -2 -39 0 -44 Z"
                    fill="#FFFFFF"
                  />
                </motion.g>
              )}

              {/* SMOKE TRAIL AFTER BLOWING OUT */}
              {isCandleBlown && (
                <motion.g
                  key={`smoke-g-${c.id}`}
                  initial={{ opacity: 0, scale: 0.3, y: -34 }}
                  animate={{
                    opacity: [0, 0.85, 0.5, 0],
                    y: [-34, -70, -110],
                    x: [0, (c.id % 2 === 0 ? 10 : -10), (c.id % 2 === 0 ? -18 : 18)],
                    scale: [0.4, 1.6, 2.5],
                  }}
                  transition={{ duration: 2.6, delay: (5 - c.id) * 0.08 }}
                >
                  <circle cx="0" cy="0" r="5.5" fill="#90A4AE" opacity="0.6" />
                  <circle cx="3" cy="-7" r="7.5" fill="#B0BEC5" opacity="0.5" />
                  <circle cx="-2" cy="-14" r="9" fill="#CFD8DC" opacity="0.35" />
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        ))}

        {/* ── DRAMATIC WIND GUST STREAM WHEN BLOWING ── */}
        <AnimatePresence>
          {isBlowing && (
            <g>
              {/* Primary Air Stream */}
              <motion.path
                d="M 270 20 C 200 -5, 110 35, 10 15"
                stroke="#E0F7FA"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.95, 0], x: -40 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              {/* Secondary Air Stream */}
              <motion.path
                d="M 280 42 C 210 15, 120 55, 20 35"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.9, 0], x: -50 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.04, ease: 'easeOut' }}
              />
              {/* Lower Swirl Stream */}
              <motion.path
                d="M 260 65 C 190 40, 100 75, 15 55"
                stroke="#80DEEA"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.8, 0], x: -45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.52, delay: 0.08, ease: 'easeOut' }}
              />
            </g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};


export const FinalSurprise = ({ 
  finalData, 
  recipient, 
  onRestart,
  step: externalStep,
  onOpenTeaser: externalOpenTeaser,
  isCandleBlown: externalIsCandleBlown,
  onCandleBlown: externalCandleBlown,
}) => {
  const [internalStep, setInternalStep] = useState('teaser');
  const [internalCandleBlown, setInternalCandleBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const step = externalStep !== undefined ? externalStep : internalStep;
  const isCandleBlown = externalIsCandleBlown !== undefined ? externalIsCandleBlown : internalCandleBlown;

  const handleOpenTeaser = () => {
    if (externalOpenTeaser) {
      externalOpenTeaser();
    } else {
      setInternalStep('candle');
    }
  };

  const handleBlowCandle = () => {
    if (isCandleBlown || isBlowing) return;
    
    setIsBlowing(true);

    setTimeout(() => {
      setIsBlowing(false);
      if (externalCandleBlown) {
        externalCandleBlown();
      } else {
        setInternalCandleBlown(true);
      }

      // Fire celebratory floral & gold confetti stream
      const duration = 3.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.7 },
          colors: ['#FF4D79', '#FFD54F', '#4DD0E1', '#C77DFF', '#FFF', '#A8E6CF']
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.7 },
          colors: ['#FF4D79', '#FFD54F', '#4DD0E1', '#C77DFF', '#FFF', '#A8E6CF']
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 650);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-12 px-3 sm:px-6 text-center">

      {/* POP-UP ANIMATED BALLOONS ON CANDLE BLOWN */}
      <AnimatePresence>
        {isCandleBlown && <PopUpBalloons />}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* STEP 0: Final Envelope Teaser */}
        {step === 'teaser' && (
          <motion.div
            key="teaser"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            onClick={handleOpenTeaser}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer inline-block max-w-md w-full relative py-6 text-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FFF0F3] text-[#FF4D79] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-[#FFCCD5] shadow-xs">
              <Gift className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h3 className="font-handwriting text-3xl sm:text-4xl text-[#3D342F] font-bold">
              {finalData.title}
            </h3>
            <p className="font-marker text-base sm:text-lg text-[#8C7A6B] mt-1 sm:mt-2">
              Tap to open the final surprise 💌
            </p>
          </motion.div>
        )}

        {/* STEP 1: Candle Blowing / Make a Wish Page */}
        {step === 'candle' && (
          <motion.div
            key="candle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative py-2 sm:py-4 flex flex-col items-center text-center"
          >
            {/* Screen Dimming Effect when candle blown */}
            <AnimatePresence>
              {isCandleBlown && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="fixed inset-0 bg-[#3D342F] pointer-events-none z-20"
                />
              )}
            </AnimatePresence>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-block relative z-30 max-w-md w-full px-2"
            >
              <h4 className="font-handwriting text-3xl xs:text-4xl sm:text-5xl text-[#FF4D79] font-extrabold mb-2 sm:mb-3 drop-shadow-xs">
                {isCandleBlown ? "✨ Wish Granted ✨" : finalData.wishPrompt}
              </h4>
              <p className="font-marker text-sm xs:text-base sm:text-lg text-[#8C7A6B] mb-2 sm:mb-4">
                {isCandleBlown ? "May all your dreams come true!" : "Click the cake or button to blow them out 🎂"}
              </p>

              {/* 2-Tier Birthday Cake with 5 Aligned Candles */}
              <div className="flex justify-center my-1 sm:my-3">
                <TwoTierBirthdayCake 
                  isCandleBlown={isCandleBlown} 
                  isBlowing={isBlowing}
                  onBlowCandle={handleBlowCandle} 
                />
              </div>

              {/* Dedicated Animated Blow Button */}
              {!isCandleBlown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex justify-center"
                >
                  <motion.button
                    onClick={handleBlowCandle}
                    disabled={isBlowing}
                    whileHover={{ scale: 1.06, boxShadow: "0 10px 25px -5px rgba(255, 77, 121, 0.4)" }}
                    whileTap={{ scale: 0.94 }}
                    animate={isBlowing ? { scale: [1, 1.15, 1] } : { y: [0, -3, 0] }}
                    transition={isBlowing ? { duration: 0.3 } : { y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF6B93] to-[#FF4D79] text-white font-bold text-base xs:text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-white"
                  >
                    <Wind className={`w-5 h-5 ${isBlowing ? 'animate-spin' : 'animate-pulse'}`} />
                    <span>{isBlowing ? "Blowing..." : "💨 Blow Out Candles!"}</span>
                  </motion.button>
                </motion.div>
              )}

              {/* Wish Granted Text Reveal */}
              <AnimatePresence>
                {isCandleBlown && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-4 sm:mt-6 relative z-40"
                  >
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF0F3] border-2 border-[#FFCCD5] shadow-lg">
                      <p className="font-handwriting text-2xl xs:text-3xl sm:text-4xl text-[#FF4D79] font-bold">
                        "{finalData.wishGranted}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>
        )}

        {/* STEP 2: The Last Happy Birthday Page */}
        {step === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 sm:space-y-6 text-center py-2 sm:py-6 max-w-2xl mx-auto px-1"
          >
            {/* Animated Heart Balloons */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.6 },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <img
                src="/heart-balloons.png"
                alt="Heart balloons"
                className="w-28 h-28 xs:w-36 xs:h-36 sm:w-52 sm:h-52 object-contain"
              />
            </motion.div>

            <h2 className="font-calligraphy text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-bold text-[#2B1A1D] break-words px-1">
              Happy Birthday! ðŸ’–
            </h2>

            <p className="font-handwriting text-base xs:text-lg sm:text-2xl md:text-3xl text-[#52463F] leading-relaxed italic max-w-lg mx-auto pt-1 sm:pt-2 px-2">
              "{finalData.message}"
            </p>

            {/* Restart Icon Button */}
            {onRestart && (
              <div className="pt-3 sm:pt-4">
                <motion.button
                  onClick={onRestart}
                  whileHover={{ scale: 1.15, rotate: -360 }}
                  whileTap={{ scale: 0.88 }}
                  title="Start from beginning"
                  className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 bg-[#FF4D79] hover:bg-[#E63963] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto border-2 border-white cursor-pointer touch-manipulation"
                >
                  <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
