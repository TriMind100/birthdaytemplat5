import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { KissSticker, CherrySticker, BowSticker, QuoteSticker } from './Stickers';

export const InteractiveLetter = ({ letter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-16 px-3 sm:px-6">
      
      {/* Outer Card / Envelope Structure */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden py-2"
      >
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-handwriting text-3xl sm:text-5xl font-bold text-[#3D342F]">
            {letter.title}
          </h2>
        </div>

        {/* Initial Teaser view */}
        {!isOpen && (
          <div className="text-center py-4 sm:py-8 space-y-4 sm:space-y-6">
            <p className="font-handwriting text-xl sm:text-3xl text-[#52463F] italic max-w-md mx-auto leading-relaxed px-2">
              "{letter.teaser}"
            </p>

            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 sm:px-8 sm:py-3.5 bg-[#D98888] hover:bg-[#C87777] text-white rounded-full font-handwriting text-xl sm:text-2xl shadow-md transition-all flex items-center gap-2 sm:gap-3 mx-auto cursor-pointer border border-[#FFFDF9]"
            >
              <span>read the letter</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        )}

        {/* Full Unfolded Letter View */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Paper Parchment background for letter */}
              <div className="torn-paper-note p-3.5 xs:p-5 sm:p-14 md:p-16 rounded-xl sm:rounded-2xl bg-[#FFFDF9] border-2 border-[#E8DCCB] shadow-inner space-y-3 sm:space-y-8 relative">
                
                {/* Vintage Rose Stamp in corner of letter */}
                <div className="absolute top-4 right-4 opacity-30 pointer-events-none hidden md:block">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#D98888">
                    <circle cx="50" cy="50" r="40" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M50,20 Q65,40 50,60 Q35,40 50,20 Z" fill="#F3C5C5" />
                    <circle cx="50" cy="50" r="8" fill="#D98888" />
                  </svg>
                </div>

                {letter.body.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className={`font-handwriting text-lg xs:text-2xl sm:text-3xl md:text-[2rem] leading-relaxed sm:leading-[2.6rem] tracking-wide ${
                      idx === 0 
                        ? 'text-[#D98888] font-bold text-xl xs:text-3xl sm:text-4xl pb-1 sm:pb-2' 
                        : idx === letter.body.length - 1
                        ? 'text-[#D98888] font-semibold pt-3 sm:pt-6 text-xl xs:text-3xl sm:text-[2.2rem]'
                        : 'text-[#3D342F]'
                    }`}
                  >
                    {paragraph}
                  </motion.p>
                ))}

                <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-between border-t border-dashed border-[#E8DCCB] mt-6 sm:mt-8 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-cursive text-xl sm:text-2xl text-[#8C7A6B]">written with lots of love ♡</span>
                    <KissSticker className="w-8 h-6 sm:w-10 sm:h-8" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D98888]">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </div>
                </div>

              </div>

              {/* Close / Fold Button */}
              <div className="text-center pt-2 sm:pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-marker text-xs sm:text-sm text-[#8C7A6B] hover:text-[#3D342F] underline cursor-pointer"
                >
                  (Fold letter back up ♡)
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

    </div>
  );
};
