import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { BowSticker, CherrySticker, KissSticker, EvilEyeSticker, BearBadgeSticker } from './Stickers';

export const BirthdayCard = ({ onExplore, recipient }) => {
  return (
    <div className="min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center p-3 sm:p-6 z-10 select-none">
      
      {/* Outer Die-Cut White Sticker Birthday Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative w-full max-w-lg bg-[#FFFDF9] rounded-[2.5rem] p-4 sm:p-8 shadow-2xl border-[6px] sm:border-[10px] border-white ring-4 ring-[#FAD4D4]/50 overflow-hidden text-center"
      >
        {/* Corner Stickers */}
        <div className="absolute top-2 left-2 z-30">
          <CherrySticker className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute top-2 right-2 z-30">
          <BowSticker className="w-10 h-9 sm:w-12 sm:h-10" />
        </div>
        <div className="absolute bottom-14 left-2 z-30 hidden xs:block">
          <EvilEyeSticker className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>
        <div className="absolute bottom-16 right-3 z-30">
          <KissSticker className="w-10 h-8 sm:w-12 sm:h-9" />
        </div>
        {/* Floating background starbursts & hearts */}
        <div className="absolute top-4 left-6 text-[#FFC72C] text-xl animate-pulse">★</div>
        <div className="absolute top-12 left-10 text-[#FF85A1] text-sm font-handwriting">♡</div>
        <div className="absolute top-6 right-6 text-[#FF85A1] text-lg">✦</div>
        <div className="absolute top-16 right-10 text-[#FFC72C] text-xs">★</div>

        {/* 1. Header Bubbly Title */}
        <div className="relative z-10 pt-2 mb-2 sm:mb-3">
          {/* Sparkle doodles */}
          <div className="flex items-center justify-center gap-1 mb-1 text-[#FF85A1]">
            <Sparkles className="w-4 h-4 text-[#FF85A1]" />
            <span className="font-handwriting text-xs sm:text-sm text-[#FF85A1] font-bold">✨ Birthday Wishes ✨</span>
            <Sparkles className="w-4 h-4 text-[#FF85A1]" />
          </div>

          <h1 className="font-handwriting text-5xl xs:text-6xl sm:text-7xl font-extrabold tracking-tight text-[#FF4D79] drop-shadow-[0_3px_0_rgba(255,255,255,1)] filter drop-shadow(0px 3px 6px rgba(255,77,121,0.25))">
            Happy Birthday
          </h1>
          <p className="font-cursive text-3xl sm:text-5xl font-bold text-[#4B2840] -mt-1 sm:-mt-2 tracking-wide">
            {recipient.nickname || "Best Friend"} ♡
          </p>
        </div>

        {/* 2. Main Illustration Container with Floating Side Heart Balloons */}
        <div className="relative my-2 sm:my-4 flex items-center justify-center">
          
          {/* Left Heart Balloon Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: [-6, -4, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 sm:-left-4 top-2 sm:top-6 z-20 w-24 xs:w-28 sm:w-32 bg-[#FF758F] text-white p-2.5 sm:p-3 rounded-[1.5rem] shadow-lg border-2 border-white text-center transform -rotate-6"
          >
            <div className="absolute -bottom-2 right-4 w-3 h-3 bg-[#FF758F] rotate-45 border-r-2 border-b-2 border-white" />
            <p className="font-marker text-[11px] sm:text-xs leading-tight font-medium drop-shadow-xs">
              So lucky to have you in my life! 💕
            </p>
          </motion.div>

          {/* Right Heart Balloon Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: [6, 4, 6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 sm:-right-4 top-2 sm:top-6 z-20 w-24 xs:w-28 sm:w-32 bg-[#FF758F] text-white p-2.5 sm:p-3 rounded-[1.5rem] shadow-lg border-2 border-white text-center transform rotate-6"
          >
            <div className="absolute -bottom-2 left-4 w-3 h-3 bg-[#FF758F] rotate-45 border-l-2 border-b-2 border-white" />
            <p className="font-marker text-[11px] sm:text-xs leading-tight font-medium drop-shadow-xs">
              You're truly amazing! ✨
            </p>
          </motion.div>

          {/* Generated High-Quality Best Friends Cute Illustration */}
          <div className="relative z-10 w-[82%] xs:w-[85%] sm:w-[90%] rounded-2xl overflow-hidden border-4 border-white shadow-md bg-[#FFF0F3]">
            <img 
              src="/best_friends_birthday_card.png" 
              alt="Two Best Friends Birthday Celebration"
              className="w-full h-auto object-cover max-h-[260px] sm:max-h-[320px] rounded-xl transform hover:scale-103 transition-transform duration-500"
            />
          </div>

        </div>

        {/* 3. Bottom Banner Ribbons */}
        <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4 relative z-10">
          
          {/* Curved Ribbon 1: Pink Sisterhood Banner */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: [0.98, 1.01, 0.98] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-[#FFB3C1] border-2 border-[#FF758F] px-4 py-1.5 sm:py-2 rounded-full shadow-sm mx-auto max-w-sm"
          >
            <p className="font-handwriting text-lg sm:text-2xl font-bold text-[#590D22]">
              Thank you for being my unbiological sister! 💖
            </p>
          </motion.div>

          {/* Speech Parchment Box 2 */}
          <div className="bg-[#FFF5F7] border-2 border-[#FFCCD5] p-3 sm:p-4 rounded-2xl shadow-inner max-w-md mx-auto">
            <p className="font-handwriting text-base sm:text-xl text-[#4A1525] font-semibold leading-relaxed">
              "Here's to more laughter, crazy adventures and unforgettable memories together!"
            </p>
          </div>

          {/* Bottom Purple Ribbon 3 */}
          <div className="bg-[#7209B7] text-white px-5 py-1.5 sm:py-2 rounded-full font-marker text-sm sm:text-base tracking-wider font-bold shadow-md inline-block border-2 border-white">
            ★ Enjoy your special day! ★
          </div>

        </div>

        {/* 4. Tactile CTA Button to Open Scrapbook */}
        <div className="pt-4 sm:pt-6 pb-1">
          <motion.button
            onClick={onExplore}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-7 py-3.5 sm:px-9 sm:py-4 bg-[#FF4D79] hover:bg-[#E63963] text-white rounded-full font-handwriting text-2xl sm:text-3xl font-bold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto cursor-pointer border-4 border-white"
          >
            <span>open your scrapbook</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            
            {/* Heart Badge */}
            <span className="absolute -top-2.5 -right-2 bg-[#FFF0F3] text-[#FF4D79] rounded-full p-1.5 border-2 border-[#FF758F] shadow-md">
              <Heart className="w-4 h-4 fill-current" />
            </span>
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
};

export default BirthdayCard;
