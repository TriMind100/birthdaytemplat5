import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

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
    <div className="w-full max-w-5xl mx-auto py-16 px-4 sm:px-6">
      
      {/* Section Title */}
      <div className="text-center mb-12">
        <span className="font-cursive text-2xl text-[#D98888]">reasons you are loved ♡</span>
        <h2 className="font-handwriting text-4xl sm:text-5xl font-bold text-[#3D342F] mt-1">
          Reasons You're Special
        </h2>
        <p className="font-marker text-lg text-[#8C7A6B] mt-2">
          Tap each note to open your little messages ✉️
        </p>
      </div>

      {/* Scattered Envelopes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
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
                className={`w-full max-w-sm cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden shadow-lg ${
                  isOpen ? 'bg-[#FFFDF9] border-[#D98888]' : 'bg-[#FAF6EF] border-[#E8DCCB] hover:border-[#D98888]/60'
                }`}
              >
                {/* Washi Tape Header */}
                <div className="washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-4" />

                {/* Stamp Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFF0F0] border border-[#F3C5C5] flex items-center justify-center text-lg shadow-xs">
                  {env.stamp}
                </div>

                {/* Label Prompt */}
                <div className="flex items-center gap-2 mb-4">
                  <Mail className={`w-5 h-5 ${isOpen ? 'text-[#D98888]' : 'text-[#8C7A6B]'}`} />
                  <span className="font-cursive text-2xl text-[#D98888]">
                    {env.label}
                  </span>
                </div>

                {/* Sliding Note Content */}
                <motion.div
                  initial={false}
                  animate={isOpen ? { height: 'auto', opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="torn-paper-note p-4 rounded-lg bg-[#FFF5F5]/60 border border-[#F3C5C5]">
                    <span className="font-marker text-xs text-[#8C7A6B] block mb-1">
                      {env.title}
                    </span>
                    <p className="font-handwriting text-2xl text-[#3D342F] leading-relaxed">
                      "{env.message}"
                    </p>
                    <div className="mt-2 flex justify-end">
                      <Heart className="w-4 h-4 fill-[#D98888] text-[#D98888]" />
                    </div>
                  </div>
                </motion.div>

                {/* Tap Prompt Footer when closed */}
                {!isOpen && (
                  <p className="font-marker text-sm text-[#8C7A6B] mt-2 text-center">
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
                    <Heart className="w-6 h-6 fill-current" />
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
