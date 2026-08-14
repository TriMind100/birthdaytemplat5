import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Bookmark } from 'lucide-react';

export const MemoryTimeline = ({ memories }) => {
  const [activeMemoryId, setActiveMemoryId] = useState(memories[0]?.id || "beginning");

  const activeMemory = memories.find((m) => m.id === activeMemoryId) || memories[0];

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center mb-12">
        <span className="font-cursive text-2xl text-[#D98888]">our storybook ♡</span>
        <h2 className="font-handwriting text-4xl sm:text-5xl font-bold text-[#3D342F] mt-1">
          little moments, big memories ♡
        </h2>
        <p className="font-marker text-lg text-[#8C7A6B] mt-2">
          Click through the timeline to relive our favorite chapters ✦
        </p>
      </div>

      {/* Timeline Tabs Nav */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {memories.map((m, idx) => {
          const isActive = m.id === activeMemoryId;
          return (
            <motion.button
              key={m.id}
              onClick={() => setActiveMemoryId(m.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`px-5 py-2.5 rounded-full font-handwriting text-xl transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                isActive
                  ? 'bg-[#D98888] text-white border-[#D98888] shadow-md'
                  : 'bg-[#FAF6EF] text-[#52463F] border-[#E8DCCB] hover:bg-[#F3ECE1]'
              }`}
            >
              <span>{m.title}</span>
              {isActive && <Heart className="w-4 h-4 fill-current text-white" />}
            </motion.button>
          );
        })}
      </div>

      {/* Main Active Memory Display Card */}
      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMemory.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FAF6EF] p-6 sm:p-10 rounded-2xl border border-[#E8DCCB] shadow-xl relative"
          >
            {/* Washi Tape Header */}
            <div className="washi-tape-pink absolute -top-3 left-8 w-24 h-5 rotate-[-2deg]" />
            <div className="washi-tape absolute -top-3 right-8 w-24 h-5 rotate-[3deg]" />

            {/* Left Column: Story Note */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#FFF0F0] text-[#D98888] px-3 py-1 rounded-full font-marker text-xs border border-[#F3C5C5]">
                  Chapter: {activeMemory.tag}
                </span>
                <span className="font-marker text-xs text-[#8C7A6B]">
                  • {activeMemory.date}
                </span>
              </div>

              <h3 className="font-handwriting text-3xl sm:text-4xl text-[#3D342F] font-bold leading-tight">
                {activeMemory.title}
              </h3>

              {/* Quote Block */}
              <div className="torn-paper-note p-4 rounded-lg my-2 border-l-4 border-l-[#D98888]">
                <p className="font-handwriting text-2xl text-[#52463F] italic leading-relaxed">
                  "{activeMemory.quote}"
                </p>
              </div>

              <p className="font-marker text-base sm:text-lg text-[#6B5A50] leading-relaxed pt-2">
                {activeMemory.detail}
              </p>
            </div>

            {/* Right Column: Polaroid Photo */}
            <div className="md:col-span-5 flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 0 }}
                style={{ rotate: activeMemory.rotation }}
                className="polaroid-frame max-w-xs w-full shadow-lg"
              >
                <img 
                  src={activeMemory.photo} 
                  alt={activeMemory.title}
                  className="w-full aspect-[4/3] object-cover rounded-xs"
                />
                <p className="font-handwriting text-center text-sm text-[#52463F] mt-3 font-semibold">
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
