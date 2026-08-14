import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export const PhotoGallery = ({ galleryItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const activePhoto = galleryItems[activeIndex];

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotate: dir > 0 ? 8 : -8,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      rotate: dir > 0 ? -8 : 8,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: [0.5, 0, 0.75, 0],
      },
    }),
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-3 sm:px-6 overflow-x-hidden relative select-none">

      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8 relative px-2">
        <h2 className="font-handwriting text-4xl sm:text-5xl font-bold text-[#FF4D79] mt-1 flex items-center justify-center gap-2">
          Memories 📸✨
        </h2>
      </div>

      {/* Main Swipable Polaroid Album Frame */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Main Swipable Card Area */}
        <div className="relative w-full max-w-lg aspect-[4/4.5] sm:aspect-[4/4.2] flex items-center justify-center">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activePhoto.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={() => setSelectedPhoto(activePhoto)}
              className="absolute inset-0 bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border-4 border-white cursor-grab active:cursor-grabbing flex flex-col justify-between"
            >
              {/* Decorative Washi Tape Strip */}
              <div className={`${activePhoto.tapeColor || 'washi-tape-pink'} absolute -top-3 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-6 z-20`} />

              {/* Photo Image Container */}
              <div className="relative w-full h-[68%] sm:h-[72%] overflow-hidden rounded-xl bg-[#F7ECE1]">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                
                <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-[#FFFDF9]/90 text-[#3D342F] px-3.5 py-1.5 rounded-full font-handwriting text-sm shadow-md flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-[#D98888] text-[#D98888]" /> View Fullscreen
                  </span>
                </div>
              </div>

              {/* Photo Caption & Metadata */}
              <div className="text-center pt-3 sm:pt-4 pb-1">
                <h3 className="font-handwriting text-2xl sm:text-3xl text-[#3D342F] font-bold leading-snug">
                  {activePhoto.caption}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-[#8C7A6B] font-marker text-xs sm:text-sm mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activePhoto.date}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 bg-white/95 backdrop-blur-md text-[#C9184A] rounded-full shadow-lg border-2 border-[#F3C5C5] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 bg-[#FF4D79] text-white rounded-full shadow-lg border-2 border-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-[#3D342F]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#FAF6EF] p-4 xs:p-6 sm:p-8 rounded-2xl shadow-2xl border-2 sm:border-4 border-white my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 text-[#8C7A6B] hover:text-[#3D342F] p-1.5 rounded-full hover:bg-[#EFE6D5] transition-colors cursor-pointer z-30"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Lightbox Polaroid Content */}
              <div className="polaroid-frame mt-2 sm:mt-4 bg-white">
                <div className="washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-4 sm:h-5" />
                
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.caption} 
                  className="w-full max-h-[48vh] sm:max-h-[60vh] object-cover rounded-xs"
                />

                <div className="mt-4 sm:mt-6 text-center space-y-1.5 sm:space-y-2">
                  <h3 className="font-handwriting text-2xl sm:text-3xl text-[#3D342F] font-bold">
                    {selectedPhoto.caption}
                  </h3>
                  <p className="font-marker text-xs sm:text-base text-[#8C7A6B]">
                    ✦ {selectedPhoto.date} ✦
                  </p>
                  <p className="font-handwriting text-base sm:text-lg text-[#52463F] pt-1 sm:pt-2 italic leading-snug">
                    "Every picture with you tells a story worth remembering forever."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
