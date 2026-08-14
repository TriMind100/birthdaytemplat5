import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Heart, Sparkles } from 'lucide-react';

export const InteractiveLetter = ({ letter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6">
      
      {/* Outer Card / Envelope Structure */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-[#FAF6EF] rounded-2xl p-6 sm:p-12 border-2 border-[#E8DCCB] shadow-xl overflow-hidden"
      >
        {/* Washi Tape Strip */}
        <div className="washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 rotate-[-1deg]" />

        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="font-cursive text-2xl text-[#D98888]">from the heart ♡</span>
          <h2 className="font-handwriting text-4xl sm:text-5xl font-bold text-[#3D342F] mt-1">
            {letter.title}
          </h2>
        </div>

        {/* Initial Teaser view */}
        {!isOpen && (
          <div className="text-center py-8 space-y-6">
            <p className="font-handwriting text-2xl sm:text-3xl text-[#52463F] italic max-w-md mx-auto leading-relaxed">
              "{letter.teaser}"
            </p>

            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-[#D98888] hover:bg-[#C87777] text-white rounded-full font-handwriting text-2xl shadow-md transition-all flex items-center gap-3 mx-auto cursor-pointer border border-[#FFFDF9]"
            >
              <span>read the letter</span>
              <ArrowRight className="w-5 h-5" />
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
              className="space-y-6"
            >
              {/* Paper Parchment background for letter */}
              <div className="torn-paper-note p-6 sm:p-10 rounded-xl bg-[#FFFDF9] border border-[#E8DCCB] shadow-inner space-y-4">
                
                {letter.body.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className={`font-handwriting text-2xl sm:text-3xl leading-relaxed ${
                      idx === 0 
                        ? 'text-[#D98888] font-bold text-3xl' 
                        : idx === letter.body.length - 1
                        ? 'text-[#D98888] font-semibold pt-4 text-[2.2rem]'
                        : 'text-[#3D342F]'
                    }`}
                  >
                    {paragraph}
                  </motion.p>
                ))}

                <div className="pt-6 flex items-center justify-between border-t border-dashed border-[#E8DCCB]">
                  <span className="font-cursive text-xl text-[#8C7A6B]">written with lots of love ♡</span>
                  <div className="flex items-center gap-1 text-[#D98888]">
                    <Sparkles className="w-5 h-5" />
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                </div>

              </div>

              {/* Close / Fold Button */}
              <div className="text-center pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-marker text-sm text-[#8C7A6B] hover:text-[#3D342F] underline cursor-pointer"
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
