import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KissSticker, CherrySticker, BowSticker } from './Stickers';

// Floating Illustrated Hearts matching reference image with safe responsive margins
const FloatingDoodleHearts = () => {
  const hearts = [
    { top: '-10%', left: '4%', size: 'w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9', rot: -14, delay: 0, dur: 3.2 },
    { top: '-14%', right: '6%', size: 'w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8', rot: 12, delay: 0.4, dur: 3.6 },
    { top: '25%', left: '-3%', size: 'w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7', rot: -18, delay: 0.8, dur: 4.0 },
    { top: '20%', right: '-3%', size: 'w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9', rot: 16, delay: 0.2, dur: 3.4 },
    { bottom: '10%', left: '-2%', size: 'w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6', rot: -10, delay: 0.6, dur: 3.8 },
    { bottom: '12%', right: '-2%', size: 'w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7', rot: 12, delay: 1.0, dur: 3.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-visible">
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className={`absolute ${h.size}`}
          style={{ top: h.top, bottom: h.bottom, left: h.left, right: h.right }}
          animate={{
            y: [-4, 4, -4],
            rotate: [h.rot, h.rot + 5, h.rot],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: h.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: h.delay,
          }}
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-xs">
            <path
              d="M 20 34 C 10 26 4 19 4 11 C 4 5.5 8.5 2 14 2 C 17.5 2 19.5 4 20 5 C 20.5 4 22.5 2 26 2 C 31.5 2 36 5.5 36 11 C 36 19 30 26 20 34 Z"
              fill="#FFA8B8"
              stroke="#3B131E"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M 10 9 C 9 12 11 15 13 16"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Shimmering Floating Crystal Background Effect (positioned safely away from text)
const CrystalEffectBackground = () => {
  const crystals = [
    { top: '3%', left: '3%', size: 'w-5 h-5 sm:w-7 sm:h-7', color: '#FFB3C1', delay: 0, dur: 4 },
    { top: '4%', right: '4%', size: 'w-5 h-5 sm:w-7 sm:h-7', color: '#FF85A1', delay: 0.5, dur: 3.5 },
    { top: '45%', left: '2%', size: 'w-5 h-5 sm:w-8 sm:h-8', color: '#E8A5A5', delay: 1, dur: 4.5 },
    { top: '55%', right: '2%', size: 'w-5 h-5 sm:w-8 sm:h-8', color: '#FF758F', delay: 0.3, dur: 3.8 },
    { top: '82%', left: '3%', size: 'w-5 h-5 sm:w-7 sm:h-7', color: '#FFD1DC', delay: 0.8, dur: 4.2 },
    { top: '85%', right: '3%', size: 'w-5 h-5 sm:w-7 sm:h-7', color: '#FF4D79', delay: 1.2, dur: 3.6 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-35 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,182,193,0.35) 0%, rgba(255,228,230,0.2) 50%, rgba(255,255,255,0) 80%)',
        }}
      />
      {crystals.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.size}`}
          style={{ top: c.top, left: c.left, right: c.right }}
          animate={{
            y: [-6, 6, -6],
            rotate: [0, 8, -8, 0],
            scale: [0.92, 1.06, 0.92],
            opacity: [0.5, 0.85, 0.5],
          }}
          transition={{
            duration: c.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: c.delay,
          }}
        >
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-xs">
            <polygon points="20,2 34,14 20,38 6,14" fill={c.color} opacity="0.85" />
            <polygon points="20,2 34,14 20,16 6,14" fill="#FFFFFF" opacity="0.6" />
            <polygon points="20,16 34,14 20,38" fill={c.color} opacity="0.95" />
            <polygon points="20,16 6,14 20,38" fill="#FFF0F5" opacity="0.75" />
            <polygon points="20,2 34,14 20,38 6,14" stroke="#3B131E" strokeWidth="1.4" strokeLinejoin="round" />
            <line x1="6" y1="14" x2="34" y2="14" stroke="#3B131E" strokeWidth="1" />
            <line x1="20" y1="16" x2="20" y2="38" stroke="#3B131E" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Distinct aesthetic cards data generator
const createCardPages = (letter) => {
  const p = letter?.body || [];
  return [
    {
      id: 'item-1',
      number: 1,
      color: '#FFF8EA', // Warm Cream
      accentColor: '#EAB308',
      tapeColor: 'rgba(255, 182, 193, 0.9)',
      tapePattern: 'linear-gradient(45deg, rgba(244,63,94,0.3) 25%, transparent 25%, transparent 50%, rgba(244,63,94,0.3) 50%, rgba(244,63,94,0.3) 75%, transparent 75%)',
      greeting: p[0] || "Dearest Sophia,",
      content: p[1] ? `${p[1]}\n\n${p[2] || ""}` : "Happy Birthday to my favorite human on this planet! 🌸\n\nI was thinking about our friendship while putting this together, and I honestly couldn't stop smiling.",
      stickerType: 'bow',
    },
    {
      id: 'item-2',
      number: 2,
      color: '#FFEBF0', // Soft Pastel Pink
      accentColor: '#F43F5E',
      tapeColor: 'rgba(167, 243, 208, 0.9)',
      tapePattern: 'radial-gradient(circle, rgba(16,185,129,0.35) 20%, transparent 20%)',
      content: p[2] || "Finding a true friend like you — someone who listens without judgment, laughs at the same dumb jokes, supports every silly idea, and shows up through thick and thin — is something I will never take for granted.",
      stickerType: 'cherries',
    },
    {
      id: 'item-3',
      number: 3,
      color: '#F2F9F2', // Matcha Mint Pale
      accentColor: '#10B981',
      tapeColor: 'rgba(254, 215, 170, 0.9)',
      tapePattern: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(249,115,22,0.3) 6px, rgba(249,115,22,0.3) 8px)',
      content: p[3] || "Thank you for all the random phone calls, the unhinged late-night chats, the comfortable silences, and all the memories we've built so far. You bring so much light, comfort, and joy into my life.",
      stickerType: 'quote',
    },
    {
      id: 'item-4',
      number: 4,
      color: '#F7F2FF', // Lavender Pale
      accentColor: '#8B5CF6',
      tapeColor: 'rgba(253, 186, 116, 0.9)',
      tapePattern: 'linear-gradient(135deg, rgba(139,92,246,0.3) 25%, transparent 25%, transparent 50%, rgba(139,92,246,0.3) 50%)',
      content: p[4] || "I hope this year brings you everything your sweet heart desires: endless happiness, soft quiet moments, spontaneous adventures, and all the success you deserve.",
      stickerType: 'sparkle',
    },
    {
      id: 'item-5',
      number: 5,
      color: '#FFF2E8', // Apricot Peach Pale
      accentColor: '#EA580C',
      tapeColor: 'rgba(254, 205, 211, 0.9)',
      tapePattern: 'radial-gradient(circle, rgba(225,29,72,0.3) 15%, transparent 15%)',
      content: `${p[5] || "Thank you for being my rock, my partner in chaos, and my truest best friend."}\n\n${p[6] || "With all my love ♡"}`,
      stickerType: 'kiss',
    }
  ];
};

export const InteractiveLetter = ({ letter }) => {
  const containerRef = useRef(null);
  const cardsData = createCardPages(letter);

  // Key counter to force clean Framer Motion drag coordinate reset
  const [resetKey, setResetKey] = useState(0);

  // Highest z-index tracking for active card elevations
  const [topZ, setTopZ] = useState(50);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Initial neatly stacked state inside the envelope (stacked in order: 1 at front, 5 at back)
  const [cardsState, setCardsState] = useState(() =>
    cardsData.map((card, i) => ({
      id: card.id,
      isPicked: false,
      zIndex: cardsData.length - i,
      x: 0,
      y: 0,
      rotation: 0,
    }))
  );

  // Pick a single card out of the letter box
  const pickCard = (cardId) => {
    setTopZ((prevZ) => {
      const nextZ = prevZ + 1;
      setCardsState((curr) => {
        return curr.map((c, i) => {
          if (c.id === cardId) {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            const targetX = (i - 2) * (isMobile ? 24 : 50);
            const targetY = isMobile ? -140 - (i % 2 === 0 ? 15 : 0) : -190 - (i % 2 === 0 ? 20 : 0);
            return {
              ...c,
              isPicked: true,
              zIndex: nextZ,
              x: c.isPicked ? c.x : targetX,
              y: c.isPicked ? c.y : targetY,
              rotation: (i - 2) * 2.5,
            };
          }
          return c;
        });
      });
      return nextZ;
    });
  };

  // Bring clicked/dragged card directly to the top layer
  const bringToTop = (cardId) => {
    setTopZ((prevZ) => {
      const nextZ = prevZ + 1;
      setCardsState((curr) =>
        curr.map((c) => (c.id === cardId ? { ...c, isPicked: true, zIndex: nextZ } : c))
      );
      return nextZ;
    });
  };

  // Open Letter Box & Draw all cards out at once with confetti
  const handleOpenLetter = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF85A1', '#FFD166', '#06D6A0', '#118AB2', '#FF4D79']
    });

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    setTopZ((prevZ) => {
      const nextZ = prevZ + 10;
      setCardsState((curr) =>
        curr.map((c, i) => ({
          ...c,
          isPicked: true,
          zIndex: nextZ + (cardsData.length - i),
          x: (i - 2) * (isMobile ? 26 : 55),
          y: isMobile ? -145 - (i % 2 === 0 ? 20 : 0) : -195 - (i % 2 === 0 ? 25 : 0),
          rotation: (i - 2) * 3,
        }))
      );
      return nextZ + 10;
    });
  };

  // Return all cards back into the neatly organized envelope stack
  const handleResetToBox = () => {
    // Increment resetKey to force Framer Motion to unbind dragged transforms
    setResetKey((prev) => prev + 1);
    setTopZ(50);
    setCardsState(
      cardsData.map((card, i) => ({
        id: card.id,
        isPicked: false,
        zIndex: cardsData.length - i,
        x: 0,
        y: 0,
        rotation: 0,
      }))
    );
  };

  const hasAnyPicked = cardsState.some((c) => c.isPicked);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-4xl mx-auto py-1 xs:py-2 sm:py-6 px-1 xs:px-2 sm:px-6 my-auto flex flex-col items-center justify-center relative select-none"
    >
      {/* Outer Gingham Framed Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full relative rounded-[1.8rem] xs:rounded-[2.2rem] sm:rounded-[2.5rem] p-2 xs:p-4 sm:p-8 pt-4 xs:pt-6 sm:pt-8 border-3 sm:border-4 border-[#3B131E] shadow-2xl overflow-visible"
        style={{
          backgroundColor: '#FFEBF0',
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 182, 193, 0.4) 50%, transparent 50%),
            linear-gradient(rgba(255, 182, 193, 0.4) 50%, transparent 50%)
          `,
          backgroundSize: '36px 36px',
        }}
      >
        {/* Crystal Sparkles Background */}
        <CrystalEffectBackground />

        {/* Header Title with Clean Proportions */}
        <div className="text-center mb-1 xs:mb-2 sm:mb-4 relative z-10 px-3 pt-1">
          <h2 className="font-handwriting text-2xl xs:text-3xl sm:text-5xl font-bold text-[#3B131E] drop-shadow-xs flex items-center justify-center gap-1.5 leading-tight">
            <span>{letter.title}</span>
          </h2>
          <p className="font-handwriting text-xs xs:text-sm sm:text-base text-[#8C7A6B] mt-0.5">
            ✨ Tap envelope or drag each card to read! ♡
          </p>
        </div>

        {/* ================= UNIFIED PHYSICAL PINK ENVELOPE DESK ================= */}
        <div className="relative w-full min-h-[460px] xs:min-h-[500px] sm:min-h-[580px] flex flex-col items-center justify-end pb-2 sm:pb-4 pt-6 sm:pt-10 overflow-visible">

          {/* Main Pink Envelope Container */}
          <div className="relative w-full max-w-[290px] xs:max-w-[340px] sm:max-w-[430px] flex flex-col items-center z-10">

            {/* Floating Doodle Hearts around the Envelope */}
            <FloatingDoodleHearts />

            {/* 1. BACK OPEN TRIANGULAR FLAP (Z-INDEX 0) */}
            <div className="w-full relative z-0 flex justify-center -mb-2 overflow-visible pointer-events-none">
              <svg 
                viewBox="0 0 460 210" 
                className="w-full h-auto drop-shadow-xs overflow-visible" 
                fill="none"
              >
                <path
                  d="M 20 200 L 210 20 C 220 8 240 8 250 20 L 440 200 Z"
                  fill="#FFAEC0"
                  stroke="#3B131E"
                  strokeWidth="3.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M 40 200 L 215 35 C 222 26 238 26 245 35 L 420 200 Z"
                  fill="#FF9EAF"
                  opacity="0.4"
                />
              </svg>
            </div>

            {/* 2. INNER ENVELOPE CAVITY (Z-INDEX 0) */}
            <div className="absolute inset-x-0 bottom-0 top-12 xs:top-14 sm:top-16 bg-[#FFA2B6] rounded-[1.6rem] xs:rounded-[2rem] border-3 sm:border-4 border-[#3B131E] shadow-inner pointer-events-none z-0" />

            {/* 3. NEATLY ORGANIZED INTERACTIVE CARDS */}
            {cardsData.map((card, idx) => {
              const state = cardsState.find((c) => c.id === card.id) || {
                isPicked: false,
                zIndex: cardsData.length - idx,
                x: 0,
                y: 0,
                rotation: 0,
              };

              const restingY = (cardsData.length - 1 - idx) * 8;
              const isHovered = hoveredCardId === card.id && !state.isPicked;

              return (
                <motion.div
                  key={`${card.id}-${resetKey}`}
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.15}
                  dragMomentum={true}
                  onDragStart={() => bringToTop(card.id)}
                  onPointerDown={() => bringToTop(card.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!state.isPicked) {
                      pickCard(card.id);
                    } else {
                      bringToTop(card.id);
                    }
                  }}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  animate={
                    state.isPicked
                      ? {
                          x: state.x,
                          y: state.y,
                          rotate: state.rotation,
                          scale: 1,
                          zIndex: state.zIndex,
                          boxShadow: '0 16px 30px -6px rgba(59,19,30,0.22)',
                        }
                      : {
                          x: 0,
                          y: isHovered ? -restingY - 22 : -restingY,
                          rotate: 0,
                          scale: isHovered ? 1.02 : 1,
                          zIndex: state.zIndex,
                          boxShadow: '0 4px 10px -2px rgba(59,19,30,0.12)',
                        }
                  }
                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 200,
                  }}
                  whileHover={{
                    cursor: state.isPicked ? 'grab' : 'pointer',
                    scale: state.isPicked ? 1.02 : 1.04,
                  }}
                  whileDrag={{
                    scale: 1.05,
                    rotate: 0,
                    zIndex: 999,
                    cursor: 'grabbing',
                    boxShadow: '0 24px 40px -10px rgba(59,19,30,0.32)',
                  }}
                  className={`absolute bottom-6 xs:bottom-8 sm:bottom-10 w-[82vw] max-w-[240px] xs:max-w-[280px] sm:max-w-[340px] rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 pt-5 xs:pt-6 sm:pt-7 border-2 sm:border-3 border-[#3B131E] select-none touch-none origin-bottom cursor-pointer ${
                    !state.isPicked ? 'h-[140px] xs:h-[160px] sm:h-[180px] overflow-hidden' : 'h-auto'
                  }`}
                  style={{
                    backgroundColor: card.color,
                    zIndex: state.zIndex,
                  }}
                >
                  {/* Washi Tape Effect at Top Center */}
                  <div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-18 xs:w-22 sm:w-28 h-5 xs:h-6 sm:h-7 rounded-xs shadow-xs border-x border-black/15 pointer-events-none z-30"
                    style={{
                      backgroundColor: card.tapeColor,
                      backgroundImage: card.tapePattern,
                      backgroundSize: '12px 12px',
                    }}
                  />

                  {/* Single pull hint on the front card only */}
                  {!state.isPicked && idx === 0 && (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-6 right-2 bg-white/95 px-2 py-0.5 rounded-full border border-[#3B131E] text-[9px] xs:text-[10px] font-handwriting font-bold text-[#FF4D79] shadow-xs pointer-events-none"
                    >
                      👆 pull me
                    </motion.div>
                  )}

                  {/* Optional Greeting on Card 1 */}
                  {card.greeting && (
                    <div className="font-handwriting font-bold text-sm xs:text-base sm:text-xl text-[#FF4D79] mb-1 relative z-20">
                      {card.greeting}
                    </div>
                  )}

                  {/* Card Body Text */}
                  <div className="relative z-20 py-0.5 font-handwriting text-xs xs:text-sm sm:text-base text-[#3B131E] leading-relaxed xs:leading-snug sm:leading-[1.7rem] whitespace-pre-line">
                    {card.content}
                  </div>

                  {/* Bottom Footer with Cute Stickers */}
                  <div className="mt-2 xs:mt-3 pt-1.5 border-t border-[#3B131E]/10 flex items-center justify-between relative z-20">
                    <div className="flex items-center gap-1.5">
                      {card.stickerType === 'bow' && <BowSticker className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />}
                      {card.stickerType === 'cherries' && <CherrySticker className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />}
                      {card.stickerType === 'kiss' && <KissSticker className="w-5 h-4 xs:w-6 xs:h-5 sm:w-7 sm:h-5" />}
                      {card.stickerType === 'sparkle' && (
                        <div className="flex items-center gap-1 text-amber-500 font-handwriting text-xs sm:text-sm">
                          <span>✨🎂✨</span>
                        </div>
                      )}
                      {card.stickerType === 'quote' && (
                        <span className="text-emerald-600 font-handwriting text-[10px] xs:text-xs font-bold bg-white/70 px-1.5 py-0.5 rounded-full border border-emerald-300">
                          ☕ Cozy vibes
                        </span>
                      )}
                    </div>

                    <div className="font-cursive text-xs text-[#8C7A6B]">
                      ♡
                    </div>
                  </div>

                  {/* Dog-eared Folded Paper Corner (Bottom Right) */}
                  <div 
                    className="absolute bottom-0 right-0 w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 pointer-events-none rounded-br-xl sm:rounded-br-2xl overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.08) 100%)`,
                    }}
                  />
                  <div 
                    className="absolute bottom-0 right-0 w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.7) 50%)`,
                      borderTopLeftRadius: '2px',
                    }}
                  />
                </motion.div>
              );
            })}

            {/* 4. ENVELOPE FRONT POCKET (CLICKABLE TO OPEN) */}
            <div 
              onClick={handleOpenLetter}
              className="relative w-full z-25 cursor-pointer group select-none"
              title="Click to open envelope ✨"
            >
              <svg
                viewBox="0 0 460 270"
                className="w-full h-auto drop-shadow-xl overflow-visible pointer-events-none"
                fill="none"
              >
                {/* Main Envelope Front Body */}
                <path
                  d="M 15 10 C 15 10 10 240 25 255 C 38 268 420 268 435 255 C 450 240 445 10 445 10 Z"
                  fill="#FFB6C1"
                  stroke="#3B131E"
                  strokeWidth="3.8"
                  strokeLinejoin="round"
                />

                {/* Left Triangular Fold Line */}
                <path
                  d="M 15 10 L 230 160 L 25 255"
                  fill="#FFAEC0"
                  stroke="#3B131E"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                />

                {/* Right Triangular Fold Line */}
                <path
                  d="M 445 10 L 230 160 L 435 255"
                  fill="#FFA4B8"
                  stroke="#3B131E"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                />

                {/* Bottom Triangular Fold Layer */}
                <path
                  d="M 25 255 L 230 135 L 435 255 Z"
                  fill="#FFBAC6"
                  stroke="#3B131E"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Center Cartoon Heart Seal */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenLetter();
                }}
                whileHover={{ scale: 1.2, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
                title="Tap to open letter ✨"
                className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer group touch-manipulation drop-shadow-md"
              >
                <svg viewBox="0 0 50 50" fill="none" className="w-full h-full">
                  <path
                    d="M 25 44 C 12 34 5 25 5 15 C 5 7.5 11 3 18 3 C 22.5 3 24.5 5.5 25 7 C 25.5 5.5 27.5 3 32 3 C 39 3 45 7.5 45 15 C 45 25 38 34 25 44 Z"
                    fill="#FF6584"
                    stroke="#3B131E"
                    strokeWidth="3.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 12 13 C 11 17 14 21 16 22"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  />
                </svg>
              </motion.button>

              {/* Hint underneath envelope */}
              <div className="text-center pt-2 pb-0.5">
                <span className="font-handwriting text-xs xs:text-sm sm:text-base text-[#8C7A6B] font-bold group-hover:text-[#FF4D79] transition-colors">
                  {hasAnyPicked ? "Drag cards around freely ♡" : "✉️ Tap anywhere on envelope to open ♡"}
                </span>
              </div>
            </div>

          </div>

          {/* Return all cards to envelope button (appears when cards are picked) */}
          <AnimatePresence>
            {hasAnyPicked && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="mt-3 z-40"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResetToBox();
                  }}
                  className="inline-flex items-center gap-1.5 font-marker text-xs sm:text-sm text-[#3B131E] hover:text-[#FF4D79] bg-white/95 px-3.5 py-1.5 rounded-full border-2 border-[#3B131E] shadow-md cursor-pointer hover:scale-105 transition-transform"
                >
                  <RefreshCw className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                  <span>Return all cards into envelope ✉️</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </motion.div>

    </div>
  );
};
