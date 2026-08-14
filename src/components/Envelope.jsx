import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Envelope = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // After flap opens and card emerges, trigger callback to switch view / scroll to card
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 z-10 overflow-hidden">
      {/* Background prompt message */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8 max-w-md px-4"
      >
        <p className="font-handwriting text-2xl md:text-3xl text-[#6B5A50] tracking-wide mb-1">
          "You have a little something waiting for you..."
        </p>
        <p className="font-cursive text-xl text-[#D98888]">
          Open it ♡
        </p>
      </motion.div>

      {/* Main Interactive Handmade Envelope Container */}
      <div 
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/3] cursor-pointer select-none group perspective-1000"
      >
        {/* Shadow underneath envelope */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-[#3D342F]/10 blur-xl rounded-full transition-all duration-300 group-hover:bg-[#3D342F]/15 group-hover:w-[95%]" />

        {/* Envelope Body Container */}
        <div className="absolute inset-0 bg-[#F5ECE0] rounded-lg border border-[#E5D5C5] shadow-xl">
          
          {/* Internal Greeting Preview Card sliding up when opened */}
          <motion.div
            initial={{ y: 20, scale: 0.9, opacity: 0 }}
            animate={isOpen ? { y: -170, scale: 1, opacity: 1 } : { y: 20, scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute inset-x-4 top-4 bottom-4 bg-[#FFFDF9] rounded-lg p-6 sm:p-8 border border-[#E8DCCB] shadow-md flex flex-col items-center justify-center text-center z-10"
          >
            <div className="wasi-tape-pink absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#F3C5C5]/60 border-x border-dashed border-[#D98888]/40" />
            <span className="font-cursive text-2xl sm:text-3xl text-[#D98888] mb-1">happy ♡</span>
            <h2 className="font-handwriting text-4xl sm:text-5xl text-[#3D342F] font-bold tracking-wide my-1">Birthday</h2>
            <p className="font-marker text-base text-[#8C7A6B] mt-1">to my favorite human</p>
          </motion.div>

          {/* Flowers emerging from inside envelope */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-0 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2">
            <svg width="220" height="130" viewBox="0 0 220 130" fill="none">
              {/* Pink Tulips SVG Illustration */}
              <g stroke="#7C9082" strokeWidth="2" strokeLinecap="round">
                <path d="M70,120 Q65,70 55,40" />
                <path d="M110,120 Q110,60 110,30" />
                <path d="M150,120 Q155,70 165,40" />
              </g>
              {/* Tulip Heads */}
              <path d="M40,40 C35,20 50,10 55,10 C60,10 75,20 70,40 C65,48 45,48 40,40 Z" fill="#E8A5A5" stroke="#D98888" strokeWidth="1.5" />
              <path d="M95,30 C90,10 105,0 110,0 C115,0 130,10 125,30 C120,38 100,38 95,30 Z" fill="#F3C5C5" stroke="#D98888" strokeWidth="1.5" />
              <path d="M150,40 C145,20 160,10 165,10 C170,10 185,20 180,40 C175,48 155,48 150,40 Z" fill="#E8A5A5" stroke="#D98888" strokeWidth="1.5" />
              {/* Leaves */}
              <path d="M85,80 Q60,60 50,75" stroke="#7C9082" strokeWidth="2" fill="#A4B4A5" />
              <path d="M135,80 Q160,60 170,75" stroke="#7C9082" strokeWidth="2" fill="#A4B4A5" />
            </svg>
          </div>

          {/* Envelope Bottom & Side Pocket Flaps */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-lg overflow-hidden">
            {/* Left side triangle fold */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-[#EFE6D5] border-r border-[#DECFC0]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
            {/* Right side triangle fold */}
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[#EAE0CF] border-l border-[#DECFC0]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
            {/* Bottom triangle fold */}
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-[#E8DCCB] border-t border-[#DECFC0]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
          </div>

          {/* Top Flap (Animated Fold Open) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ transformOrigin: 'top center' }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#F3E7D7] border-b border-[#DFCFC0] shadow-sm z-30 rounded-t-lg overflow-hidden"
          >
            <div className="w-full h-full" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}>
              <div className="w-full h-full bg-gradient-to-b from-[#F7EFE4] to-[#EBE0CE]" />
            </div>
          </motion.div>

          {/* Heart Wax Seal on the Flap */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              >
                <div className="w-13 h-13 rounded-full bg-[#D98888] shadow-md border-2 border-[#E8A5A5] flex items-center justify-center text-white transform transition-transform duration-300 group-hover:scale-110">
                  <Heart className="w-6 h-6 fill-current text-white/90" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Handwritten tag resting cleanly on bottom corner */}
          <div className="absolute bottom-2 right-3 z-40 bg-[#FFFDF9] px-3.5 py-1.5 rounded-md border border-[#E5D5C5] shadow-md rotate-[-2deg]">
            <p className="font-handwriting text-sm text-[#52463F] font-medium">For my favorite person ♡</p>
          </div>

        </div>
      </div>

      {/* Floating flower petals outburst when clicked */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: "50%", 
                  y: "50%", 
                  scale: 0.4, 
                  opacity: 1 
                }}
                animate={{ 
                  x: `${50 + (Math.random() * 120 - 60)}%`, 
                  y: `${50 + (Math.random() * 140 - 70)}%`, 
                  rotate: Math.random() * 360,
                  opacity: [1, 0.8, 0],
                  scale: Math.random() * 0.8 + 0.6
                }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute text-[#E8A5A5]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 14.5 7 19 9.5C14.5 12 12 17 12 17C12 17 9.5 12 5 9.5C9.5 7 12 2 12 2Z" />
                </svg>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
