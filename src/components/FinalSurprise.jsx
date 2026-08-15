import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Flame, Gift, RotateCcw } from 'lucide-react';
import { BearBadgeSticker, QuoteSticker } from './Stickers';

// 2-Tier Vector Birthday Cake with 5 Glowing Candles (matching reference image)
const TwoTierBirthdayCake = ({ isCandleBlown, onBlowCandle }) => {
  const candles = [
    { id: 1, x: 42, y: 56 },   // leftmost rim
    { id: 2, x: 70, y: 28 },   // inner left
    { id: 3, x: 100, y: 14 },  // center main candle (taller)
    { id: 4, x: 130, y: 28 },  // inner right
    { id: 5, x: 158, y: 56 },  // rightmost rim
  ];

  return (
    <div
      onClick={onBlowCandle}
      className="relative inline-flex flex-col items-center cursor-pointer group p-2 touch-manipulation select-none"
    >
      <svg
        className="w-56 h-64 xs:w-64 xs:h-72 sm:w-76 sm:h-84 overflow-visible filter drop-shadow-xl"
        viewBox="0 0 200 220"
        fill="none"
      >
        {/* ── PLATE ── */}
        <ellipse cx="100" cy="204" rx="92" ry="16" fill="#F0E6D8" stroke="#2B1A1D" strokeWidth="3.5" />
        <ellipse cx="100" cy="201" rx="88" ry="13" fill="#FFFDF9" stroke="#2B1A1D" strokeWidth="2.5" />

        {/* ── BOTTOM TIER ── */}
        {/* Bottom Tier Cream Body */}
        <path d="M 20 120 L 20 186 C 20 202, 180 202, 180 186 L 180 120 C 180 135, 20 135, 20 120 Z" fill="#FFFDF0" stroke="#2B1A1D" strokeWidth="3.5" strokeLinejoin="round" />

        {/* Bottom Pink Base Ribbon */}
        <path d="M 21 174 C 21 174, 100 188, 179 174 L 179 186 C 179 202, 21 202, 21 186 Z" fill="#E91E63" stroke="#2B1A1D" strokeWidth="3" />

        {/* Bottom Tier Dripping Pink Glaze */}
        <path
          d="M 20 120 C 20 135, 180 135, 180 120 
             C 180 142, 168 148, 160 138
             C 152 152, 140 155, 132 136
             C 124 150, 112 156, 104 138
             C 96 154, 84 158, 76 138
             C 68 152, 54 152, 46 136
             C 38 146, 26 142, 20 120 Z"
          fill="#FF527B"
          stroke="#2B1A1D"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Candy Sprinkles on Bottom Glaze */}
        <circle cx="36" cy="128" r="3" fill="#FFD54F" stroke="#2B1A1D" strokeWidth="1.2" />
        <circle cx="58" cy="138" r="3.2" fill="#4DD0E1" stroke="#2B1A1D" strokeWidth="1.2" />
        <circle cx="78" cy="144" r="3" fill="#FF4081" stroke="#2B1A1D" strokeWidth="1.2" />
        <circle cx="122" cy="144" r="3" fill="#4DD0E1" stroke="#2B1A1D" strokeWidth="1.2" />
        <circle cx="142" cy="138" r="3.2" fill="#FFD54F" stroke="#2B1A1D" strokeWidth="1.2" />
        <circle cx="168" cy="130" r="3" fill="#FFA726" stroke="#2B1A1D" strokeWidth="1.2" />

        {/* ── TOP TIER ── */}
        {/* Top Tier Cream Body */}
        <path d="M 40 68 L 40 118 C 40 132, 160 132, 160 118 L 160 68 C 160 80, 40 80, 40 68 Z" fill="#FFFDF0" stroke="#2B1A1D" strokeWidth="3.5" strokeLinejoin="round" />

        {/* Top Tier Pink Base Ribbon */}
        <path d="M 41 108 C 41 108, 100 120, 159 108 L 159 118 C 159 132, 41 132, 41 118 Z" fill="#E91E63" stroke="#2B1A1D" strokeWidth="3" />

        {/* Top Tier Top Oval Surface */}
        <ellipse cx="100" cy="68" rx="60" ry="14" fill="#FFFDF0" stroke="#2B1A1D" strokeWidth="3.5" />

        {/* Top Tier Dripping Pink Glaze */}
        <path
          d="M 40 68 C 40 80, 160 80, 160 68 
             C 160 88, 148 94, 140 84
             C 132 98, 122 100, 114 86
             C 106 100, 94 102, 86 86
             C 78 98, 66 98, 58 84
             C 50 92, 44 88, 40 68 Z"
          fill="#FF527B"
          stroke="#2B1A1D"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Sprinkles on Top Tier Surface */}
        <circle cx="56" cy="66" r="2.8" fill="#FFA726" stroke="#2B1A1D" strokeWidth="1.2" />
        <circle cx="76" cy="72" r="3" fill="#FFD54F" stroke="#2B1A1D" strokeWidth="1.2" />
        <circle cx="92" cy="64" r="2.8" fill="#FF4081" stroke="#2B1A1D" strokeWidth="1.2" />
        <circle cx="118" cy="74" r="3" fill="#4DD0E1" stroke="#2B1A1D" strokeWidth="1.2" />
        <circle cx="138" cy="66" r="2.8" fill="#FFD54F" stroke="#2B1A1D" strokeWidth="1.2" />

        {/* Sprinkles on Top Glaze Drips */}
        <circle cx="68" cy="88" r="2.8" fill="#FFD54F" stroke="#2B1A1D" strokeWidth="1" />
        <circle cx="100" cy="92" r="3" fill="#4DD0E1" stroke="#2B1A1D" strokeWidth="1" />
        <circle cx="130" cy="88" r="2.8" fill="#FFA726" stroke="#2B1A1D" strokeWidth="1" />

        {/* ── BIG PINK FRONT RIBBON BOW ── */}
        <g transform="translate(100, 170)">
          {/* Left Wing */}
          <path d="M 0 -3 C -18 -22, -45 -18, -48 0 C -45 18, -18 14, 0 3 Z" fill="#FF4D79" stroke="#2B1A1D" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M -12 -2 C -24 -10, -38 -8, -40 0 C -38 8, -24 6, -12 2 Z" fill="#FF85A1" opacity="0.6" />

          {/* Right Wing */}
          <path d="M 0 -3 C 18 -22, 45 -18, 48 0 C 45 18, 18 14, 0 3 Z" fill="#FF4D79" stroke="#2B1A1D" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M 12 -2 C 24 -10, 38 -8, 40 0 C 38 8, 24 6, 12 2 Z" fill="#FF85A1" opacity="0.6" />

          {/* Left Ribbon Tail */}
          <path d="M -8 4 Q -22 25 -32 30 Q -18 24 -1 10 Z" fill="#E91E63" stroke="#2B1A1D" strokeWidth="3.5" strokeLinejoin="round" />

          {/* Right Ribbon Tail */}
          <path d="M 8 4 Q 22 25 32 30 Q 18 24 1 10 Z" fill="#E91E63" stroke="#2B1A1D" strokeWidth="3.5" strokeLinejoin="round" />

          {/* Center Knot */}
          <circle cx="0" cy="0" r="10" fill="#FF4D79" stroke="#2B1A1D" strokeWidth="3.5" />
          <ellipse cx="-2" cy="-3" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.85" />
        </g>

        {/* ── 5 BLUE & WHITE STRIPED CANDLES ── */}
        {candles.map((c) => (
          <g key={c.id} transform={`translate(${c.x}, ${c.y})`}>
            {/* Candle Tube */}
            <rect x="-4.5" y="-30" width="9" height="30" rx="2" fill="#4DD0E1" stroke="#2B1A1D" strokeWidth="2.5" />
            {/* White Diagonal Stripes */}
            <path d="M -4.5 -24 L 4.5 -28 L 4.5 -22 L -4.5 -18 Z" fill="#FFFFFF" />
            <path d="M -4.5 -14 L 4.5 -18 L 4.5 -12 L -4.5 -8 Z" fill="#FFFFFF" />
            <path d="M -4.5 -4 L 4.5 -8 L 4.5 -2 L -4.5 2 Z" fill="#FFFFFF" />
            {/* Black Wick */}
            <line x1="0" y1="-30" x2="0" y2="-36" stroke="#2B1A1D" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ))}
      </svg>

      {/* Glowing Flames / Smoke Overlay rendered via Framer Motion for authentic light glow */}
      <div className="absolute inset-0 pointer-events-none">
        {candles.map((c) => (
          <div
            key={c.id}
            className="absolute transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(c.x / 200) * 100}%`,
              top: `${((c.y - 36) / 220) * 100}%`,
            }}
          >
            <AnimatePresence>
              {!isCandleBlown ? (
                <motion.div
                  key={`flame-${c.id}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.15, 1],
                    y: [-1, 1, -1],
                  }}
                  exit={{ opacity: 0, scale: 0, y: -15 }}
                  transition={{
                    duration: 1.4 + c.id * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative flex flex-col items-center"
                >
                  {/* Glowing Yellowish Radial Light Aura behind Flame */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 0.95, 0.6],
                    }}
                    transition={{
                      duration: 1.2 + c.id * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -inset-3.5 rounded-full bg-gradient-to-r from-[#FFF59D] via-[#FFD54F] to-[#FF9800] blur-md pointer-events-none"
                  />

                  {/* Flame Tear-drop Body */}
                  <div className="w-5 h-8 sm:w-6 sm:h-9 relative z-10 filter drop-shadow-[0_0_10px_rgba(255,215,0,0.95)]">
                    <svg viewBox="0 0 24 36" fill="none" className="w-full h-full">
                      {/* Outer Flame (Orange Red) */}
                      <path d="M 12 0 C 18 12 24 20 24 27 C 24 32 18 36 12 36 C 6 36 0 32 0 27 C 0 20 6 12 12 0 Z" fill="#FF4500" stroke="#2B1A1D" strokeWidth="1.5" />
                      {/* Middle Flame (Bright Yellow) */}
                      <path d="M 12 6 C 16 15 20 21 20 26 C 20 30 16 33 12 33 C 8 33 4 30 4 26 C 4 21 8 15 12 6 Z" fill="#FFD700" />
                      {/* Inner Core (White Spark) */}
                      <path d="M 12 14 C 14 19 16 23 16 26 C 16 28 14 30 12 30 C 10 30 8 28 8 26 C 8 23 10 19 12 14 Z" fill="#FFFFFF" />
                    </svg>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`smoke-${c.id}`}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    y: -35,
                    x: [(c.id % 2 === 0 ? 5 : -5), (c.id % 2 === 0 ? -8 : 8)],
                    scale: [0.5, 1.2, 1.8],
                  }}
                  transition={{ duration: 1.8, delay: (c.id - 1) * 0.1 }}
                  className="w-4 h-4 rounded-full bg-stone-400/50 blur-xs"
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
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
    if (isCandleBlown) return;
    if (externalCandleBlown) {
      externalCandleBlown();
    } else {
      setInternalCandleBlown(true);
    }

    // Fire floral petal & warm gold/pink confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E8A5A5', '#F3C5C5', '#D98888', '#FFD1DC', '#FDF5E6']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E8A5A5', '#F3C5C5', '#D98888', '#FFD1DC', '#FDF5E6']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-16 px-3 sm:px-6 text-center">

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
            className="relative py-4 sm:py-6 flex flex-col items-center text-center"
          >
            {/* Screen Dimming Effect when candle blown */}
            <AnimatePresence>
              {isCandleBlown && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="fixed inset-0 bg-[#3D342F] pointer-events-none z-30"
                />
              )}
            </AnimatePresence>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-block relative z-40 max-w-md w-full px-2"
            >
              <h4 className="font-handwriting text-2xl xs:text-3xl sm:text-4xl text-[#FF4D79] font-bold mb-1.5 sm:mb-2">
                {isCandleBlown ? "✨ Wish Granted ✨" : finalData.wishPrompt}
              </h4>
              <p className="font-marker text-xs xs:text-sm sm:text-base text-[#8C7A6B] mb-3 sm:mb-6">
                {isCandleBlown ? "May all your dreams come true!" : "Click or tap the candle flame to blow it out 🎂"}
              </p>

              {/* 2-Tier Birthday Cake with 5 Glowing Candles */}
              <div className="flex justify-center my-2 sm:my-4">
                <TwoTierBirthdayCake isCandleBlown={isCandleBlown} onBlowCandle={handleBlowCandle} />
              </div>

              {/* Wish Granted Text Reveal */}
              <AnimatePresence>
                {isCandleBlown && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-3 sm:mt-6"
                  >
                    <div className="p-3 sm:p-4 rounded-xl bg-[#FFF0F3] border border-[#FFCCD5]">
                      <p className="font-handwriting text-xl xs:text-2xl sm:text-3xl text-[#FF4D79] font-bold">
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
              Happy Birthday! 💖
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
