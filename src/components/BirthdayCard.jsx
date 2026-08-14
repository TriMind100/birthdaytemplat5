import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export const BirthdayCard = ({ onExplore, recipient }) => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4 sm:p-6 z-10">
      
      {/* Main Physical Handmade Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-[#FAF6EF] rounded-2xl p-8 sm:p-12 shadow-2xl border-4 border-[#FFFDF9] outline outline-1 outline-[#E8DCCB] relative overflow-hidden"
      >
        {/* Pink Gingham Bow in Top Left Corner */}
        <div className="absolute top-4 left-4 z-20">
          <div className="relative w-12 h-10 flex items-center justify-center">
            {/* Bow graphic SVG */}
            <svg width="48" height="40" viewBox="0 0 60 50" fill="none">
              <path d="M15,25 C-5,10 0,35 25,25 C0,15 -5,40 15,25 Z" fill="#F3C5C5" stroke="#D98888" strokeWidth="2" />
              <path d="M45,25 C65,10 60,35 35,25 C60,15 65,40 45,25 Z" fill="#F3C5C5" stroke="#D98888" strokeWidth="2" />
              <circle cx="30" cy="25" r="6" fill="#D98888" />
              <path d="M26,30 L18,48 M34,30 L42,48" stroke="#D98888" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Top Right Tape & Doodles */}
        <div className="washi-tape-pink absolute top-4 right-6 w-20 h-5 rotate-[4deg]" />
        
        {/* Decorative Pressed Baby's Breath / Flower Stem Illustration */}
        <div className="absolute top-12 right-4 opacity-40 pointer-events-none">
          <svg width="60" height="90" viewBox="0 0 60 90" fill="none" stroke="#7C9082" strokeWidth="1.2">
            <path d="M30,90 Q25,50 35,10" />
            <circle cx="35" cy="10" r="2.5" fill="#FAF6EF" stroke="#D98888" />
            <circle cx="20" cy="30" r="2.5" fill="#FAF6EF" stroke="#D98888" />
            <circle cx="45" cy="40" r="2.5" fill="#FAF6EF" stroke="#D98888" />
            <circle cx="15" cy="60" r="2.5" fill="#FAF6EF" stroke="#D98888" />
          </svg>
        </div>

        {/* Card Main Header Content Layer */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-6 pt-4">
          
          {/* Torn Paper Header 1 */}
          <motion.div
            initial={{ rotate: -2 }}
            animate={{ rotate: [-2, -1, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="torn-paper-note px-6 py-2 rounded-md shadow-sm border border-[#E8DCCB] inline-block"
          >
            <span className="font-cursive text-3xl sm:text-4xl text-[#D98888]">
              happy ♡
            </span>
          </motion.div>

          {/* Main Headline (Torn Paper Banner 2) */}
          <div className="relative inline-block my-2">
            <h1 className="font-handwriting text-5xl sm:text-7xl font-bold text-[#3D342F] tracking-wide leading-tight drop-shadow-sm">
              Birthday
            </h1>
            {/* Doodled Underline */}
            <svg className="w-full h-4 text-[#D98888]/60 mt-1" viewBox="0 0 200 20" fill="none">
              <path d="M5,12 Q50,2 100,12 T195,10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* Subheader Badge (Torn Paper Banner 3) */}
          <motion.div
            initial={{ rotate: 2 }}
            animate={{ rotate: [2, 3, 2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-[#FFF0F0] px-6 py-2 rounded-md shadow-sm border border-[#F3C5C5] inline-block"
          >
            <p className="font-handwriting text-2xl sm:text-3xl text-[#52463F]">
              to my {recipient.title || "favorite human"}
            </p>
          </motion.div>

          {/* Polaroid Snippet Thumbnail */}
          <div className="polaroid-frame my-4 rotate-[-3deg] transform hover:rotate-0 transition-transform duration-300 w-44 sm:w-52">
            <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4" />
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400" 
              alt="Best Friends Thumbnail" 
              className="w-full aspect-[4/3] object-cover rounded-xs"
            />
            <p className="font-handwriting text-center text-xs text-[#6B5A50] mt-2">
              so grateful for you ♡
            </p>
          </div>

          {/* Handwritten Subtitle */}
          <p className="font-marker text-lg sm:text-xl text-[#8C7A6B] max-w-xs leading-relaxed">
            "{recipient.subtext || "A little corner of the internet made just for you."}"
          </p>

          {/* Tactile Handmade Button CTA */}
          <motion.button
            onClick={onExplore}
            whileHover={{ scale: 1.04, rotate: 1 }}
            whileTap={{ scale: 0.96 }}
            className="relative group mt-4 px-8 py-3.5 bg-[#D98888] hover:bg-[#C87777] text-white rounded-full font-handwriting text-2xl tracking-wide shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3 cursor-pointer border-2 border-[#FFFDF9]"
          >
            <span>open your little surprise</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            
            {/* Tiny Heart Badge */}
            <span className="absolute -top-2 -right-2 bg-[#FFF0F0] text-[#D98888] rounded-full p-1 border border-[#F3C5C5] shadow-xs">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </span>
          </motion.button>

        </div>

        {/* Hand drawn hearts & doodles in background corners */}
        <div className="absolute bottom-4 left-4 font-handwriting text-[#D98888] text-xl opacity-60">
          ✨ ♡ ✨
        </div>
        <div className="absolute bottom-4 right-4 font-handwriting text-[#D98888] text-xl opacity-60">
          ❀ ♡ ❀
        </div>
      </motion.div>
    </div>
  );
};
