import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { KissSticker, CherrySticker } from './Stickers';

// Animated Tulips Group matching reference frame bottom corners
const TulipGroup = ({ position = 'left' }) => {
  const isLeft = position === 'left';
  return (
    <div className={`absolute bottom-0 ${isLeft ? 'left-1 xs:left-2 sm:left-4' : 'right-1 xs:right-2 sm:right-4'} z-30 pointer-events-none flex items-end gap-0.5 sm:gap-1`}>
      {[
        { scale: 0.85, delay: 0, rot: isLeft ? -5 : 3 },
        { scale: 1, delay: 0.25, rot: isLeft ? 2 : -4 },
        { scale: 0.9, delay: 0.5, rot: isLeft ? -3 : 4 },
      ].map((t, idx) => (
        <motion.div
          key={idx}
          animate={{ rotate: [t.rot, t.rot + (isLeft ? 4 : -4), t.rot] }}
          transition={{ duration: 3.2 + idx * 0.4, repeat: Infinity, ease: 'easeInOut', delay: t.delay }}
          className="origin-bottom"
          style={{ transform: `scale(${t.scale})` }}
        >
          <svg className="w-7 h-10 xs:w-9 xs:h-12 sm:w-11 sm:h-15 overflow-visible" viewBox="0 0 40 60">
            {/* Green Stem */}
            <path d="M 20 60 Q 18 36 20 20" stroke="#7BAE73" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Leaves */}
            <path d="M 20 48 Q 6 38 3 24 Q 12 34 20 44" fill="#9CD093" stroke="#5E9057" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M 20 44 Q 34 36 37 22 Q 28 32 20 40" fill="#9CD093" stroke="#5E9057" strokeWidth="1.5" strokeLinejoin="round" />

            {/* Tulip Cup Petals */}
            <g transform="translate(0, 0)">
              {/* Back Petals */}
              <path d="M 11 22 C 7 14 12 5 20 12 C 28 5 33 14 29 22 C 25 26 15 26 11 22 Z" fill="#FF85A1" stroke="#2B1A1D" strokeWidth="1.6" strokeLinejoin="round" />
              {/* Left Wing Petal */}
              <path d="M 9 20 C 5 10 13 3 18 14 C 14 22 9 22 9 20 Z" fill="#FF9EAA" stroke="#2B1A1D" strokeWidth="1.4" strokeLinejoin="round" />
              {/* Right Wing Petal */}
              <path d="M 31 20 C 35 10 27 3 22 14 C 26 22 31 22 31 20 Z" fill="#FF6584" stroke="#2B1A1D" strokeWidth="1.4" strokeLinejoin="round" />
              {/* Main Center Petal */}
              <path d="M 13 23 C 11 13 20 4 20 4 C 20 4 29 13 27 23 C 23 27 17 27 13 23 Z" fill="#FF4D79" stroke="#2B1A1D" strokeWidth="1.6" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Animated Paper Airplane & Looping Dashed Flight Path
const PaperAirplane = () => {
  return (
    <div className="absolute top-2 right-2 xs:top-4 xs:right-5 sm:top-6 sm:right-8 z-20 pointer-events-none">
      <div className="relative">
        {/* Floating Paper Airplane Animation */}
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <svg className="w-11 h-9 xs:w-14 xs:h-11 sm:w-18 sm:h-14 drop-shadow-xs overflow-visible" viewBox="0 0 80 60" fill="none">
            {/* Paper Airplane Main Wing */}
            <path d="M 72 8 L 8 32 L 40 48 L 72 8 Z" fill="#FFB3C1" stroke="#2B1A1D" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Under fold shadow */}
            <path d="M 40 48 L 72 8 L 30 30 Z" fill="#FF758F" stroke="#2B1A1D" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Center Fold Line */}
            <path d="M 8 32 L 72 8" stroke="#2B1A1D" strokeWidth="1.8" />
            {/* Bottom Flap */}
            <path d="M 40 48 L 50 56 L 54 38 Z" fill="#FF4D79" stroke="#2B1A1D" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Dashed Flight Trail & Heart */}
        <svg className="absolute -top-4 -right-5 w-20 h-14 sm:w-28 sm:h-18 pointer-events-none overflow-visible -z-10" viewBox="0 0 120 70" fill="none">
          <motion.path
            d="M 55 42 C 85 42 108 24 95 10 C 80 -2 62 16 78 26 C 94 36 114 18 108 6"
            stroke="#2B1A1D"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
          {/* Heart Outline at Trail End */}
          <path
            d="M 110 6 C 108 2 104 3 105 6 C 106 9 110 12 110 12 C 110 12 114 9 115 6 C 116 3 112 2 110 6 Z"
            fill="none"
            stroke="#2B1A1D"
            strokeWidth="1.6"
          />
        </svg>
      </div>
    </div>
  );
};

// Animated Handwriting Text Paragraph (Slowed down for relaxed reading)
const HandwritingParagraph = ({ text, delay = 0, isHeader = false, isFooter = false }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.11, // 110ms per word for deliberate handwriting speed
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 8,
      filter: 'blur(4px)',
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`font-handwriting leading-relaxed sm:leading-[2.4rem] tracking-wide ${isHeader
          ? 'text-[#FF4D79] font-bold text-xl xs:text-2xl sm:text-3xl pb-1'
          : isFooter
            ? 'text-[#FF4D79] font-semibold pt-2 text-xl xs:text-2xl sm:text-3xl'
            : 'text-[#3D342F] text-base xs:text-xl sm:text-2xl'
        }`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block mr-[0.25em] whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

// Floating Shimmering Crystal Sparkles & Prisms Background Effect
const CrystalEffectBackground = () => {
  const crystals = [
    { top: '6%', left: '6%', size: 'w-7 h-7 sm:w-10 sm:h-10', color: '#FFB3C1', delay: 0, dur: 4 },
    { top: '12%', right: '8%', size: 'w-6 h-6 sm:w-9 sm:h-9', color: '#FF85A1', delay: 0.5, dur: 3.5 },
    { top: '38%', left: '3%', size: 'w-8 h-8 sm:w-11 sm:h-11', color: '#E8A5A5', delay: 1, dur: 4.5 },
    { top: '48%', right: '4%', size: 'w-7 h-7 sm:w-10 sm:h-10', color: '#FF758F', delay: 0.3, dur: 3.8 },
    { top: '72%', left: '10%', size: 'w-6 h-6 sm:w-8 sm:h-8', color: '#FFD1DC', delay: 0.8, dur: 4.2 },
    { top: '78%', right: '10%', size: 'w-8 h-8 sm:w-10 sm:h-10', color: '#FF4D79', delay: 1.2, dur: 3.6 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Iridescent Crystal Radial Light Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-60 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,182,193,0.45) 0%, rgba(255,228,230,0.3) 45%, rgba(255,255,255,0) 75%)',
        }}
      />

      {/* Floating Crystal Diamond Gems & Starbursts */}
      {crystals.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.size}`}
          style={{ top: c.top, left: c.left, right: c.right }}
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 12, -12, 0],
            scale: [0.9, 1.12, 0.9],
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            duration: c.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: c.delay,
          }}
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-md">
            {/* 3D Crystal Diamond Facets */}
            <polygon points="20,2 34,14 20,38 6,14" fill={c.color} opacity="0.85" />
            <polygon points="20,2 34,14 20,16 6,14" fill="#FFFFFF" opacity="0.6" />
            <polygon points="20,16 34,14 20,38" fill={c.color} opacity="0.95" />
            <polygon points="20,16 6,14 20,38" fill="#FFF0F5" opacity="0.75" />
            {/* Outline & Creases */}
            <polygon points="20,2 34,14 20,38 6,14" stroke="#2B1A1D" strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="6" y1="14" x2="34" y2="14" stroke="#2B1A1D" strokeWidth="1.2" />
            <line x1="20" y1="16" x2="20" y2="38" stroke="#2B1A1D" strokeWidth="1.2" />
          </svg>
        </motion.div>
      ))}

      {/* Sparkling Twinkle Lights */}
      {[
        { top: '22%', left: '16%', size: 'w-4 h-4 sm:w-6 sm:h-6', delay: 0 },
        { top: '28%', right: '18%', size: 'w-5 h-5 sm:w-7 sm:h-7', delay: 0.7 },
        { top: '64%', left: '20%', size: 'w-4 h-4 sm:w-6 sm:h-6', delay: 0.4 },
        { top: '72%', right: '16%', size: 'w-5 h-5 sm:w-7 sm:h-7', delay: 1.1 },
      ].map((s, idx) => (
        <motion.div
          key={`sparkle-${idx}`}
          className={`absolute ${s.size} text-[#FF6584]`}
          style={{ top: s.top, left: s.left, right: s.right }}
          animate={{
            scale: [0, 1.3, 0],
            rotate: [0, 90, 180],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: s.delay,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export const InteractiveLetter = ({ letter }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate cumulative delay so each paragraph writes out sequentially in relaxed handwriting speed
  let runningDelay = 0.5;
  const paragraphDelays = letter.body.map((p) => {
    const delay = runningDelay;
    const wordCount = p.split(' ').length;
    runningDelay += wordCount * 0.11 + 0.5; // time for words to write + relaxed pause between paragraphs
    return delay;
  });

  return (
    <div className="w-full max-w-3xl mx-auto py-1 xs:py-2 sm:py-4 px-1.5 xs:px-3 sm:px-6 my-auto flex flex-col items-center justify-center">

      {/* Outer Gingham Framed Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-[2rem] sm:rounded-[2.5rem] p-3 xs:p-5 sm:p-8 border-3 sm:border-4 border-[#2B1A1D] shadow-xl overflow-hidden"
        style={{
          backgroundColor: '#FFEBF0',
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 182, 193, 0.4) 50%, transparent 50%),
            linear-gradient(rgba(255, 182, 193, 0.4) 50%, transparent 50%)
          `,
          backgroundSize: '36px 36px',
        }}
      >
        {/* Animated Shimmering Crystal Sparkles & Prisms Effect Layer */}
        <CrystalEffectBackground />

        {/* Floating Sparkles Background Accents */}
        <div className="absolute top-4 left-6 text-[#FFC72C] text-sm animate-pulse z-10">✦</div>
        <div className="absolute top-10 right-12 text-[#FF85A1] text-xs font-handwriting z-10">✨</div>
        <div className="absolute bottom-16 left-8 text-[#FF4D79] text-xs z-10">✧</div>

        {/* Header Title */}
        <div className="text-center mb-3 sm:mb-6 relative z-10">
          <h2 className="font-handwriting text-2xl xs:text-3xl sm:text-5xl font-bold text-[#2B1A1D] drop-shadow-xs flex items-center justify-center gap-2">
            <span>{letter.title}</span>
          </h2>
        </div>

        {/* Interactive Envelope & Letter Card Assembly */}
        <div className="relative max-w-xl mx-auto flex flex-col items-center">

          {/* Main Pink Stitched Letter Card Frame */}
          <motion.div
            layout
            animate={{
              y: isOpen ? 0 : 30,
              scale: isOpen ? 1 : 0.96,
            }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            className="w-full bg-[#FFF2F5] rounded-[1.8rem] xs:rounded-[2.2rem] sm:rounded-[2.5rem] p-4 xs:p-6 sm:p-10 border-3 sm:border-4 border-[#2B1A1D] shadow-lg relative z-20 overflow-hidden"
          >
            {/* Inner Dashed Stitch Frame (matching reference image) */}
            <div className="absolute inset-2 xs:inset-3 sm:inset-4 border-2 border-dashed border-[#FFB3C1] rounded-[1.3rem] xs:rounded-[1.7rem] sm:rounded-[2rem] pointer-events-none z-10" />

            {/* Top Right Animated Paper Airplane */}
            <PaperAirplane />

            {/* Teaser View (When Closed) */}
            {!isOpen && (
              <div className="py-6 xs:py-8 sm:py-12 text-center space-y-4 xs:space-y-6 relative z-20">
                <p className="font-handwriting text-xl xs:text-2xl sm:text-3xl text-[#52463F] italic leading-relaxed px-3 max-w-md mx-auto">
                  "{letter.teaser}"
                </p>

                <motion.button
                  onClick={() => setIsOpen(true)}
                  whileHover={{ scale: 1.06, rotate: 1 }}
                  whileTap={{ scale: 0.94 }}
                  className="px-6 py-3 xs:px-8 xs:py-3.5 bg-[#FF4D79] hover:bg-[#E63963] text-white rounded-full font-handwriting text-xl xs:text-2xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 mx-auto cursor-pointer border-2 border-white touch-manipulation ring-2 ring-[#FF758F]/40"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Open Letter</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
            )}

            {/* Unfolded Letter Content with Sequential Handwriting Animation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-3 sm:space-y-5 relative z-20 pt-2 pb-2"
                >
                  {letter.body.map((paragraph, idx) => (
                    <HandwritingParagraph
                      key={idx}
                      text={paragraph}
                      delay={paragraphDelays[idx]}
                      isHeader={idx === 0}
                      isFooter={idx === letter.body.length - 1}
                    />
                  ))}


                  {/* Fold Back Up Action Button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: runningDelay + 0.3 }}
                    className="text-center pt-2 sm:pt-4"
                  >
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 font-marker text-xs xs:text-sm text-[#8C7A6B] hover:text-[#FF4D79] cursor-pointer p-1.5 touch-manipulation bg-white/70 rounded-full px-4 border border-[#FFCCD5]"
                    >
                      <ChevronUp className="w-4 h-4" />
                      <span>(Fold letter back into envelope ♡)</span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

          {/* Yellow Cream Envelope Front Pocket (Matching reference frame) */}
          <div className="relative w-[96%] xs:w-[98%] -mt-10 sm:-mt-14 z-30 pointer-events-auto">
            <div className="bg-[#FFF4CB] rounded-b-[1.8rem] xs:rounded-b-[2.2rem] sm:rounded-b-[2.5rem] border-3 sm:border-4 border-[#2B1A1D] shadow-xl pt-8 xs:pt-10 sm:pt-14 pb-4 xs:pb-5 sm:pb-6 relative overflow-visible">

              {/* Envelope Triangular Top Fold Cutout */}
              <svg className="absolute -top-6 xs:-top-8 sm:-top-12 inset-x-0 w-full h-8 xs:h-10 sm:h-14 overflow-visible pointer-events-none" viewBox="0 0 400 60" preserveAspectRatio="none">
                {/* Envelope V Flap */}
                <path d="M 0 0 L 200 50 L 400 0" fill="#FFF4CB" stroke="#2B1A1D" strokeWidth="4" strokeLinejoin="round" />
              </svg>

              {/* Pulsing Pink Heart Seal in Center V-Fold */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.18, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                title={isOpen ? "Close envelope" : "Open envelope"}
                className="absolute -top-4 xs:-top-5 sm:-top-7 left-1/2 -translate-x-1/2 z-40 w-11 h-11 xs:w-13 xs:h-13 sm:w-16 sm:h-16 bg-[#FF6584] hover:bg-[#FF4D79] text-white rounded-full shadow-lg border-3 sm:border-4 border-[#2B1A1D] flex items-center justify-center cursor-pointer group touch-manipulation"
              >
                <Heart className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 fill-current text-white drop-shadow-xs group-hover:scale-110 transition-transform" />
              </motion.button>

              {/* Animated Tulips on Bottom Left & Right Corners */}
              <TulipGroup position="left" />
              <TulipGroup position="right" />

              {/* Sparkle Doodles on Envelope */}
              <div className="flex items-center justify-center gap-6 text-[#2B1A1D]/40 text-xs sm:text-sm font-marker pt-2">
                <span>✦</span>
                <span className="font-handwriting text-sm xs:text-base sm:text-lg text-[#8C7A6B]">
                  {isOpen ? "Tap heart to fold back" : "Tap heart seal to read ♡"}
                </span>
                <span>✦</span>
              </div>

            </div>
          </div>

        </div>

      </motion.div>

    </div>
  );
};

