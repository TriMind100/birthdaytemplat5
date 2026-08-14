import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { PhotoGallery } from './PhotoGallery';
import { InteractiveHeartTree } from './InteractiveHeartTree';
import { MemoryTimeline } from './MemoryTimeline';
import { MemoryEnvelopes } from './MemoryEnvelopes';
import { AnimatedFlowers } from './AnimatedFlowers';
import { InteractiveLetter } from './InteractiveLetter';
import { FinalSurprise } from './FinalSurprise';

export const ScrapbookBook = ({ cardData, onBackToCard }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const pages = [
    {
      id: 'memories',
      component: <PhotoGallery galleryItems={cardData.gallery} />,
    },
    {
      id: 'tree',
      component: <InteractiveHeartTree />,
    },
    {
      id: 'timeline',
      component: <MemoryTimeline memories={cardData.memories} />,
    },
    {
      id: 'notes',
      component: <MemoryEnvelopes specialEnvelopes={cardData.specialEnvelopes} />,
    },
    {
      id: 'flowers',
      component: <AnimatedFlowers />,
    },
    {
      id: 'letter',
      component: <InteractiveLetter letter={cardData.letter} />,
    },
    {
      id: 'wish',
      component: <FinalSurprise finalData={cardData.finalEnvelope} recipient={cardData.recipient} />,
    },
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      rotateY: dir > 0 ? 55 : -55,
      opacity: 0,
      scale: 0.94,
      x: dir > 0 ? 60 : -60,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -55 : 55,
      opacity: 0,
      scale: 0.94,
      x: dir > 0 ? -60 : 60,
      transition: {
        duration: 0.5,
        ease: [0.5, 0, 0.75, 0],
      },
    }),
  };

  return (
    <div className="relative min-h-screen py-6 sm:py-10 px-2 sm:px-6 max-w-6xl mx-auto select-none overflow-x-hidden">
      
      {/* Top Floating Back Button */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
        <button
          onClick={onBackToCard}
          className="flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-md text-[#C9184A] rounded-full border border-[#F3C5C5] shadow-sm hover:shadow-md font-handwriting text-base font-bold transition-all hover:scale-105 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cover Card</span>
        </button>
      </div>

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
            className="w-full bg-[#FFFDF9] rounded-[2.5rem] p-4 sm:p-10 border-4 border-white shadow-[0_15px_40px_rgba(61,52,47,0.1)] relative overflow-hidden"
          >
            {/* Center Spine Crease Effect */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-[#3D342F]/5 to-transparent pointer-events-none z-20" />

            {/* Corner Decorative Washi Tape */}
            <div className="washi-tape-pink absolute -top-2 left-8 w-24 h-4 rotate-[-3deg]" />
            <div className="washi-tape-pink absolute -top-2 right-8 w-24 h-4 rotate-[3deg]" />

            {/* Active Page Component */}
            <div className="relative z-10">
              {pages[currentPage].component}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Floating Side Bookmark Navigation Ribbons */}
      <div className="fixed inset-y-0 inset-x-2 sm:inset-x-6 pointer-events-none flex items-center justify-between z-40">
        
        {/* Left Side Bookmark Button (Previous) */}
        <div>
          {currentPage > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="pointer-events-auto flex items-center gap-2 px-4 py-3 bg-[#FFF0F3]/95 backdrop-blur-md text-[#C9184A] rounded-r-full border-2 border-l-0 border-[#F3C5C5] shadow-lg font-cursive text-xl sm:text-2xl font-bold cursor-pointer transition-all"
            >
              <ArrowLeft className="w-5 h-5 animate-pulse" />
              <span className="hidden sm:inline">prev ♡</span>
            </motion.button>
          )}
        </div>

        {/* Right Side Bookmark Button (Next) */}
        <div>
          {currentPage < pages.length - 1 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="pointer-events-auto flex items-center gap-2 px-4 py-3 bg-[#FF4D79] text-white rounded-l-full border-2 border-r-0 border-white shadow-xl font-cursive text-xl sm:text-2xl font-bold cursor-pointer transition-all"
            >
              <span className="hidden sm:inline">next ♡</span>
              <ArrowRight className="w-5 h-5 animate-bounce" style={{ animationDirection: 'alternate' }} />
            </motion.button>
          )}
        </div>

      </div>

    </div>
  );
};
