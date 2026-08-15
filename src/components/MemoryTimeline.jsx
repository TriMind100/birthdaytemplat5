import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Bookmark } from 'lucide-react';
import { BearBadgeSticker, EvilEyeSticker, QuoteSticker, BowSticker, CherrySticker } from './Stickers';

export const MemoryTimeline = ({ memories }) => {
  const [activeMemoryId, setActiveMemoryId] = useState(memories[0]?.id || "beginning");

  const activeMemory = memories.find((m) => m.id === activeMemoryId) || memories[0];

  return (
    <div className="w-full max-w-5xl mx-auto py-3 xs:py-6 sm:py-12 px-1.5 xs:px-3 sm:px-6 relative">
      
      {/* Corner Stickers */}
      <div className="absolute top-4 right-4 z-20 hidden sm:block">
        <BearBadgeSticker />
      </div>

      {/* Header */}
      <div className="text-center mb-3 sm:mb-8 px-1 sm:px-2">
        <h2 className="font-handwriting text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold text-[#FF4D79] mt-1 flex items-center justify-center gap-1.5 sm:gap-2">
          Little Moments, Big Memories 🌸💖
        </h2>
      </div>

      {/* Timeline Tabs Nav */}
      <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center sm:justify-center gap-1.5 sm:gap-3 mb-4 sm:mb-8 px-1 py-1 touch-manipulation">
        {memories.map((m, idx) => {
          const isActive = m.id === activeMemoryId;
          return (
            <motion.button
              key={m.id}
              onClick={() => setActiveMemoryId(m.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`px-2.5 py-1 xs:px-3.5 xs:py-1.5 sm:px-5 sm:py-2.5 rounded-full font-handwriting text-sm xs:text-base sm:text-xl transition-all duration-300 flex items-center gap-1 xs:gap-1.5 sm:gap-2 cursor-pointer border-2 shrink-0 ${
                isActive
                  ? 'bg-[#FF4D79] text-white border-[#FF4D79] shadow-md'
                  : 'bg-[#FAF6EF] text-[#52463F] border-[#E8DCCB] hover:bg-[#F3ECE1]'
              }`}
            >
              <span>{m.title}</span>
              {isActive && <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-white" />}
            </motion.button>
          );
        })}
      </div>

      {/* Main Active Memory Display Card */}
      <div className="relative min-h-[340px] xs:min-h-[380px] sm:min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMemory.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-center py-2 relative"
          >
            {/* Washi Tape Header */}
            <div className="washi-tape-pink absolute -top-3 left-3 sm:left-8 w-14 sm:w-24 h-3.5 sm:h-5 rotate-[-2deg]" />
            <div className="washi-tape absolute -top-3 right-3 sm:right-8 w-14 sm:w-24 h-3.5 sm:h-5 rotate-[3deg]" />

            {/* Left Column: Story Note */}
            <div className="md:col-span-7 space-y-2 xs:space-y-3 sm:space-y-4 pt-2 sm:pt-0">
              <div className="flex items-center gap-2 text-[#8C7A6B] font-marker text-xs sm:text-sm">
                <span>✨ {activeMemory.date}</span>
              </div>

              <h3 className="font-handwriting text-2xl xs:text-3xl sm:text-4xl text-[#3D342F] font-bold leading-tight">
                {activeMemory.title} 💌
              </h3>

              {/* Quote Block */}
              <div className="torn-paper-note p-2.5 xs:p-3.5 sm:p-4 rounded-xl my-1.5 sm:my-2 border-l-4 border-l-[#FF4D79] bg-white/70">
                <p className="font-handwriting text-lg xs:text-xl sm:text-2xl text-[#52463F] italic leading-relaxed">
                  "{activeMemory.quote}"
                </p>
              </div>

              <p className="font-marker text-xs xs:text-sm sm:text-base md:text-lg text-[#6B5A50] leading-relaxed pt-1 sm:pt-2">
                {activeMemory.detail}
              </p>
            </div>

            {/* Right Column: Polaroid Photo */}
            <div className="md:col-span-5 flex justify-center pt-2 md:pt-0">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="polaroid-frame max-w-[200px] xs:max-w-[240px] sm:max-w-xs w-full shadow-lg"
              >
                <img 
                  src={activeMemory.photo} 
                  alt={activeMemory.title}
                  className="w-full aspect-[4/3] object-cover rounded-xs"
                />
                <p className="font-handwriting text-center text-xs sm:text-sm text-[#52463F] mt-1.5 sm:mt-3 font-semibold">
                  {activeMemory.title} ♡
                </p>
              </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
