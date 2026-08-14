import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Flame, Gift } from 'lucide-react';

export const FinalSurprise = ({ finalData, recipient }) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isCandleBlown, setIsCandleBlown] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  const handleBlowCandle = () => {
    if (isCandleBlown) return;
    setIsCandleBlown(true);

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
    <div className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6 text-center">
      
      {/* Final Envelope Teaser */}
      {!isEnvelopeOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onClick={handleOpenEnvelope}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#FAF6EF] rounded-2xl p-10 border-2 border-[#E8DCCB] shadow-xl cursor-pointer inline-block max-w-md w-full relative overflow-hidden"
        >
          <div className="washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5" />
          
          <div className="w-16 h-16 bg-[#FFF0F0] text-[#D98888] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#F3C5C5] shadow-xs">
            <Gift className="w-8 h-8" />
          </div>

          <h3 className="font-handwriting text-4xl text-[#3D342F] font-bold">
            {finalData.title}
          </h3>
          <p className="font-marker text-lg text-[#8C7A6B] mt-2">
            Tap to open the final surprise 💌
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Main Final Message Banner */}
          <div className="bg-[#FAF6EF] p-8 sm:p-12 rounded-2xl border-2 border-[#E8DCCB] shadow-xl relative max-w-2xl mx-auto space-y-6">
            <div className="washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-5" />

            <span className="font-cursive text-3xl text-[#D98888]">happy birthday ♡</span>
            
            <h2 className="font-handwriting text-5xl sm:text-6xl font-bold text-[#3D342F]">
              Happy Birthday, {recipient.name} ♡
            </h2>

            <p className="font-handwriting text-2xl sm:text-3xl text-[#52463F] leading-relaxed italic max-w-lg mx-auto">
              "{finalData.message}"
            </p>

            {/* Bouquet SVG Illustration */}
            <div className="pt-4 flex justify-center">
              <svg width="140" height="140" viewBox="0 0 120 120" fill="none">
                <path d="M60,110 L45,70 M60,110 L60,65 M60,110 L75,70" stroke="#7C9082" strokeWidth="3" strokeLinecap="round" />
                {/* Flowers */}
                <circle cx="35" cy="50" r="18" fill="#E8A5A5" />
                <circle cx="60" cy="35" r="22" fill="#F3C5C5" />
                <circle cx="85" cy="50" r="18" fill="#E8A5A5" />
                {/* Flower Centers */}
                <circle cx="35" cy="50" r="6" fill="#FFF0F0" />
                <circle cx="60" cy="35" r="7" fill="#FFF0F0" />
                <circle cx="85" cy="50" r="6" fill="#FFF0F0" />
                {/* Ribbon Bow */}
                <path d="M50,85 C35,75 40,95 60,85 C80,95 85,75 70,85 Z" fill="#D98888" />
              </svg>
            </div>
          </div>

          {/* Section 11: Birthday Candle Interaction */}
          <div className="relative py-8">
            
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
              className="inline-block relative z-40 bg-[#FAF6EF] p-8 sm:p-10 rounded-2xl border border-[#E8DCCB] shadow-lg max-w-md w-full"
            >
              <h4 className="font-handwriting text-3xl text-[#3D342F] font-bold mb-2">
                {isCandleBlown ? "✨ Wish Granted ✨" : finalData.wishPrompt}
              </h4>
              <p className="font-marker text-base text-[#8C7A6B] mb-6">
                {isCandleBlown ? "May all your dreams come true!" : "Click or tap the candle flame to blow it out 🎂"}
              </p>

              {/* Cake & Candle Visual */}
              <div 
                onClick={handleBlowCandle}
                className="relative inline-flex flex-col items-center cursor-pointer group py-4"
              >
                {/* Flame Container */}
                <div className="h-10 flex items-center justify-center relative">
                  <AnimatePresence>
                    {!isCandleBlown ? (
                      <motion.div
                        key="flame"
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center"
                      >
                        <Flame className="w-8 h-8 text-[#FF9E00] fill-[#FFD000] animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD000]/60 animate-ping absolute -top-1" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 0.7, 0], y: -25, x: [-5, 5, 0] }}
                        transition={{ duration: 1.5 }}
                        className="text-xs text-[#8C7A6B] font-marker"
                      >
                        ~ puff ~
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Stick */}
                <div className="w-4 h-12 bg-gradient-to-b from-[#F3C5C5] to-[#E8A5A5] rounded-t-xs border border-[#D98888]/40 shadow-xs" />

                {/* Cake Layers */}
                <div className="w-36 h-10 bg-[#FFF5F5] rounded-t-lg border-2 border-[#E8DCCB] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-0 inset-x-0 h-3 bg-[#F3C5C5]/60 rounded-b-md" />
                  <span className="font-handwriting text-xs text-[#D98888] pt-2">happy birthday ♡</span>
                </div>
                <div className="w-44 h-12 bg-[#F7ECE1] rounded-b-lg border-2 border-t-0 border-[#E8DCCB] shadow-md flex items-center justify-center">
                  <span className="font-marker text-xs text-[#8C7A6B]">🎂</span>
                </div>
              </div>

              {/* Wish Granted Text Reveal */}
              <AnimatePresence>
                {isCandleBlown && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-6 p-4 rounded-xl bg-[#FFF0F0] border border-[#F3C5C5]"
                  >
                    <p className="font-handwriting text-3xl text-[#D98888] font-bold">
                      "{finalData.wishGranted}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

          </div>

        </motion.div>
      )}

    </div>
  );
};
