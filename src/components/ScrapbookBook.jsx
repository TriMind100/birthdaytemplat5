import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MemoryTimeline } from './MemoryTimeline';
import { InteractiveLetter } from './InteractiveLetter';
import { FinalSurprise } from './FinalSurprise';

export const ScrapbookBook = ({ cardData, onBackToCard, onRestart }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [finalStep, setFinalStep] = useState('teaser'); // 'teaser' | 'candle' | 'final'
  const [isCandleBlown, setIsCandleBlown] = useState(false);

  const pages = [
    {
      id: 'timeline',
      component: <MemoryTimeline memories={cardData.memories} />,
    },
    {
      id: 'letter',
      component: <InteractiveLetter letter={cardData.letter} />,
    },
    {
      id: 'wish',
      component: (
        <FinalSurprise 
          finalData={cardData.finalEnvelope} 
          recipient={cardData.recipient} 
          onRestart={onRestart}
          step={finalStep}
          onOpenTeaser={() => setFinalStep('candle')}
          isCandleBlown={isCandleBlown}
          onCandleBlown={() => setIsCandleBlown(true)}
        />
      ),
    },
  ];

  const canGoNext = 
    currentPage < pages.length - 1 || 
    (currentPage === pages.length - 1 && finalStep === 'candle' && isCandleBlown);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentPage === pages.length - 1 && finalStep === 'candle' && isCandleBlown) {
      setFinalStep('final');
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 3D Page Turn Animation Variants
  const pageVariants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? 30 : -30,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.55,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? -30 : 30,
      transition: {
        duration: 0.45,
        ease: [0.5, 0, 0.75, 0],
      },
    }),
  };

  return (
    <div className="relative min-h-[85dvh] py-3 xs:py-5 sm:py-10 px-1.5 xs:px-3 sm:px-6 max-w-6xl mx-auto select-none overflow-x-hidden">
      
      {/* Main 3D Tactile Storybook Container */}
      <div className="relative perspective-1000 min-h-[70vh]">
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ transformStyle: 'preserve-3d', transformOrigin: direction > 0 ? 'left center' : 'right center' }}
            className="w-full bg-[#FFFDF9] rounded-2xl xs:rounded-[2rem] sm:rounded-[2.5rem] p-3 xs:p-5 sm:p-10 border-2 sm:border-4 border-white shadow-[0_15px_40px_rgba(61,52,47,0.1)] relative overflow-hidden"
          >
            {/* Center Spine Crease Effect (Visible on Desktop / Tablet Dual View) */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 bg-gradient-to-r from-transparent via-[#3D342F]/5 to-transparent pointer-events-none z-20 hidden md:block" />

            {/* Corner Decorative Washi Tape */}
            <div className="washi-tape-pink absolute -top-2 left-3 sm:left-8 w-14 xs:w-16 sm:w-24 h-3 sm:h-4 rotate-[-3deg]" />
            <div className="washi-tape-pink absolute -top-2 right-3 sm:right-8 w-14 xs:w-16 sm:w-24 h-3 sm:h-4 rotate-[3deg]" />

            {/* Active Page Component */}
            <div className="relative z-10 pb-12 sm:pb-16">
              {pages[currentPage].component}
            </div>

            {/* Bottom Corner Arrow Buttons */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-6 sm:left-8 sm:right-8 z-30 flex items-center justify-between pointer-events-none">
              
              {/* Previous Button (Bottom Left Corner) */}
              <div>
                {currentPage > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: -15 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    onClick={handlePrev}
                    whileHover={{ scale: 1.15, rotate: -6 }}
                    whileTap={{ scale: 0.88 }}
                    title="Previous"
                    className="pointer-events-auto group flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 bg-[#FF4D79] hover:bg-[#E63963] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 sm:border-3 border-white cursor-pointer touch-manipulation"
                  >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
                  </motion.button>
                )}
              </div>

              {/* Next Button (Bottom Right Corner) */}
              <div>
                {canGoNext && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: 15 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    onClick={handleNext}
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    whileTap={{ scale: 0.88 }}
                    title="Next"
                    className="pointer-events-auto group flex items-center justify-center w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 bg-[#FF4D79] hover:bg-[#E63963] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 sm:border-3 border-white cursor-pointer touch-manipulation"
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                )}
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
};
