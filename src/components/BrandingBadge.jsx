import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink } from 'lucide-react';

export const BrandingBadge = () => {
  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50">
      <motion.a
        href="https://kolkode.in"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-[#F0DED0] text-[#52463F] shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-[#E8D9C8]/40 hover:ring-[#FF8FAB]/60 select-none text-decoration-none no-underline"
      >
        {/* Subtle sparkle icon with rotation on hover */}
        <span className="text-[#FF4D79] text-xs transition-transform duration-300 group-hover:rotate-45">
          ✨
        </span>

        {/* Text */}
        <div className="flex items-center gap-1 font-sans">
          <span className="text-[10px] sm:text-[11px] text-[#8C7A6B] font-medium tracking-wide">
            by
          </span>
          <span className="text-[11px] sm:text-xs font-bold bg-gradient-to-r from-[#FF4D79] to-[#AD1457] bg-clip-text text-transparent group-hover:underline">
            kolkode.in
          </span>
        </div>

        {/* External Link Icon */}
        <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#A8988B] group-hover:text-[#FF4D79] transition-colors opacity-70 group-hover:opacity-100 ml-0.5" />
      </motion.a>
    </div>
  );
};
