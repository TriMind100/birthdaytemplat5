import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { GhostBestiesSticker, CherrySticker, QuoteSticker, BowSticker, KissSticker } from './Stickers';

export const MemoryEnvelopes = ({ specialEnvelopes }) => {
  const [openIds, setOpenIds] = useState([]);

  const toggleEnvelope = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(i => i !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-16 px-3 sm:px-6 relative">
      
      {/* Section Title */}
      <div className="text-center mb-8 sm:mb-12 px-2">
        <span className="font-cursive text-xl sm:text-2xl text-[#D98888]">reasons you are loved ♡</span>
        <h2 className="font-handwriting text-3xl sm:text-5xl font-bold text-[#3D342F] mt-1 flex items-center justify-center gap-2">
          Reasons You're Special
        </h2>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <QuoteSticker text="Favorite Person 📌" color="bg-[#FFF0F3]" textColor="text-[#C9184A]" className="text-xs" />
          <QuoteSticker text="you make my heart smile 💕" color="bg-[#FFFDF9]" textColor="text-[#3D342F]" className="text-xs" />
        </div>
      </div>

      {/* Scattered Envelopes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 px-2">
        {specialEnvelopes.map((env, idx) => {
          const isOpen = openIds.includes(env.id);

          return (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative flex flex-col items-center select-none"
            >
              {/* Envelope Body */}
              <div 
                onClick={() => toggleEnvelope(env.id)}
                className={`w-full max-w-sm cursor-pointer p-4 xs:p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden shadow-lg ${
                  isOpen ? 'bg-[#FFFDF9] border-[#D98888]' : 'bg-[#FAF6EF] border-[#E8DCCB] hover:border-[#D98888]/60'
                }`}
              >
                {/* Washi Tape Header */}
                <div className="washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3.5 sm:h-4" />

                {/* Stamp Icon */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFF0F0] border border-[#F3C5C5] flex items-center justify-center text-base sm:text-lg shadow-xs">
                  {env.stamp}
                </div>

                {/* Label Prompt */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4 pr-8">
                  <Mail className={`w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? 'text-[#D98888]' : 'text-[#8C7A6B]'}`} />
                  <span className="font-cursive text-xl sm:text-2xl text-[#D98888]">
                    {env.label}
                  </span>
                </div>

                {/* Sliding Note Content */}
                <motion.div
                  initial={false}
                  animate={isOpen ? { height: 'auto', opacity: 1, marginTop: 10 } : { height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="torn-paper-note p-4 sm:p-6 rounded-xl bg-[#FFF5F5]/70 border border-[#F3C5C5] shadow-xs">
                    <span className="font-marker text-xs text-[#8C7A6B] block mb-1 font-medium">
                      {env.title}
                    </span>
                    <p className="font-handwriting text-xl sm:text-[1.7rem] text-[#3D342F] leading-relaxed sm:leading-snug">
                      "{env.message}"
                    </p>
                    <div className="mt-2.5 sm:mt-3 flex justify-end">
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#D98888] text-[#D98888]" />
                    </div>
                  </div>
                </motion.div>

                {/* Tap Prompt Footer when closed */}
                {!isOpen && (
                  <p className="font-marker text-xs sm:text-sm text-[#8C7A6B] mt-2 text-center">
                    (Click to unfold ♡)
                  </p>
                )}

              </div>

              {/* Floating Heart Burst when opened */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 1, scale: 0.5, y: 0 }}
                    animate={{ opacity: 0, scale: 1.2, y: -30 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -top-4 text-[#D98888] pointer-events-none"
                  >
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
