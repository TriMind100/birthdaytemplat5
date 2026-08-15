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
            className="w-full min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center items-center bg-[#FFFDF9] rounded-2xl xs:rounded-[2rem] sm:rounded-[2.5rem] p-3 xs:p-5 sm:p-10 border-2 sm:border-4 border-white shadow-[0_15px_40px_rgba(61,52,47,0.1)] relative overflow-visible"
          >
            {/* Center Spine Crease Effect (Visible on Desktop / Tablet Dual View) */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 bg-gradient-to-r from-transparent via-[#3D342F]/5 to-transparent pointer-events-none z-20 hidden md:block" />

            {/* Corner Decorative Washi Tape */}
            <div className="washi-tape-pink absolute -top-2 left-3 sm:left-8 w-14 xs:w-16 sm:w-24 h-3 sm:h-4 rotate-[-3deg]" />
            <div className="washi-tape-pink absolute -top-2 right-3 sm:right-8 w-14 xs:w-16 sm:w-24 h-3 sm:h-4 rotate-[3deg]" />

            {/* Active Page Component Centered */}
            <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center pb-12 sm:pb-16">
              {pages[currentPage].component}
            </div>

            {/* Tactile Navigation Buttons Centered Outside the Bottom Border */}
            <div className="absolute -bottom-5 xs:-bottom-6 sm:-bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3 sm:gap-4 pointer-events-none">
              
              {/* Previous Button */}
              {currentPage > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  onClick={handlePrev}
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  whileTap={{ scale: 0.88 }}
                  title="Previous"
                  className="pointer-events-auto group flex items-center justify-center w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-[#FF4D79] hover:bg-[#E63963] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-3 sm:border-4 border-white cursor-pointer touch-manipulation ring-2 ring-[#FF758F]/30"
                >
                  <ArrowLeft className="w-5 h-5 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
                </motion.button>
              )}

              {/* Next Button */}
              {canGoNext && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  onClick={handleNext}
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.88 }}
                  title="Next"
                  className="pointer-events-auto group flex items-center justify-center w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-[#FF4D79] hover:bg-[#E63963] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-3 sm:border-4 border-white cursor-pointer touch-manipulation ring-2 ring-[#FF758F]/30"
                >
                  <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              )}

            </div>

          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
};
