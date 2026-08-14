import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Flame, Gift, RotateCcw } from 'lucide-react';
import { BearBadgeSticker, QuoteSticker } from './Stickers';

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
              className="inline-block relative z-40 max-w-md w-full"
            >
              <h4 className="font-handwriting text-3xl sm:text-4xl text-[#FF4D79] font-bold mb-1.5 sm:mb-2">
                {isCandleBlown ? "✨ Wish Granted ✨" : finalData.wishPrompt}
              </h4>
              <p className="font-marker text-sm sm:text-base text-[#8C7A6B] mb-4 sm:mb-6">
                {isCandleBlown ? "May all your dreams come true!" : "Click or tap the candle flame to blow it out 🎂"}
              </p>

              {/* Cake & Candle Visual */}
              <div 
                onClick={handleBlowCandle}
                className="relative inline-flex flex-col items-center cursor-pointer group py-2 sm:py-4"
              >
                {/* Flame Container */}
                <div className="h-9 sm:h-10 flex items-center justify-center relative">
                  <AnimatePresence>
                    {!isCandleBlown ? (
                      <motion.div
                        key="flame"
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center"
                      >
                        <Flame className="w-8 h-8 sm:w-9 sm:h-9 text-[#FF9E00] fill-[#FFD000] animate-pulse" />
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
                <div className="w-3.5 sm:w-4 h-10 sm:h-12 bg-gradient-to-b from-[#F3C5C5] to-[#E8A5A5] rounded-t-xs border border-[#D98888]/40 shadow-xs" />

                {/* Cake Layers */}
                <div className="w-32 sm:w-36 h-9 sm:h-10 bg-[#FFF5F5] rounded-t-lg border-2 border-[#E8DCCB] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-0 inset-x-0 h-2.5 sm:h-3 bg-[#F3C5C5]/60 rounded-b-md" />
                  <span className="font-handwriting text-xs text-[#FF4D79] pt-1.5 sm:pt-2">happy birthday ♡</span>
                </div>
                <div className="w-40 sm:w-44 h-10 sm:h-12 bg-[#F7ECE1] rounded-b-lg border-2 border-t-0 border-[#E8DCCB] shadow-md flex items-center justify-center">
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
                    className="mt-4 sm:mt-6"
                  >
                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFF0F3] border border-[#FFCCD5]">
                      <p className="font-handwriting text-2xl sm:text-3xl text-[#FF4D79] font-bold">
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
            className="space-y-4 sm:space-y-6 text-center py-2 sm:py-6 max-w-2xl mx-auto"
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
                className="w-32 h-32 xs:w-40 xs:h-40 sm:w-52 sm:h-52 object-contain"
              />
            </motion.div>

            <h2 className="font-calligraphy text-4xl xs:text-5xl sm:text-7xl font-bold text-[#2B1A1D] break-words px-1">
              Happy Birthday! 💖
            </h2>

            <p className="font-handwriting text-lg xs:text-xl sm:text-3xl text-[#52463F] leading-relaxed italic max-w-lg mx-auto pt-1 sm:pt-2 px-2">
              "{finalData.message}"
            </p>

            {/* Restart Icon Button */}
            {onRestart && (
              <div className="pt-4">
                <motion.button
                  onClick={onRestart}
                  whileHover={{ scale: 1.15, rotate: -360 }}
                  whileTap={{ scale: 0.88 }}
                  title="Start from beginning"
                  className="w-11 h-11 sm:w-12 sm:h-12 bg-[#FF4D79] hover:bg-[#E63963] text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto border-2 border-white cursor-pointer"
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
