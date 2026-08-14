import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { HeartFormationAnimation } from './HeartFormationAnimation';

export const Envelope = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Launch heart formation animation immediately as envelope starts opening
    setTimeout(() => {
      setShowHeartAnimation(true);
    }, 200);
  };

  const handleHeartAnimationComplete = () => {
    onOpen();
  };

  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center p-3 sm:p-4 z-10 overflow-hidden select-none">
      
      {/* Heart Formation Animation Overlay triggered upon opening */}
      <AnimatePresence>
        {showHeartAnimation && (
          <HeartFormationAnimation onComplete={handleHeartAnimationComplete} />
        )}
      </AnimatePresence>

      {/* Main Hyper-Realistic 3D Wine Red Envelope Container */}
      <motion.div 
        onClick={handleOpen}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isOpen ? 0 : mousePos.y * -10,
          rotateY: isOpen ? 0 : mousePos.x * 12,
        }}
        transition={{
          rotateX: { duration: 0.15, ease: "easeOut" },
          rotateY: { duration: 0.15, ease: "easeOut" },
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-[92vw] max-w-[340px] sm:max-w-[440px] aspect-[4/3] cursor-pointer group perspective-1200"
      >
        {/* Realistic Deep Contact Shadow & Wine Red Ambient Glow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-[#4A0515]/50 blur-2xl rounded-full transition-all duration-300 group-hover:bg-[#6E0D25]/60 group-hover:w-[96%]" />

        {/* Envelope Base Body (Rich Velvet Wine Red Linen Texture) */}
        <div className="absolute inset-0 bg-[#4A0515] rounded-2xl border border-[#8B1232]/80 shadow-[0_20px_50px_rgba(40,3,10,0.6)] overflow-hidden">
          
          {/* Inner Satin Burgundy Pocket Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2E030D] via-[#4A0515] to-[#3B0512]" />

          {/* Flowers emerging from inside envelope */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-0 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 scale-85 sm:scale-100 origin-top">
            <svg width="220" height="130" viewBox="0 0 220 130" fill="none">
              <g stroke="#7C9082" strokeWidth="2" strokeLinecap="round">
                <path d="M70,120 Q65,70 55,40" />
                <path d="M110,120 Q110,60 110,30" />
                <path d="M150,120 Q155,70 165,40" />
              </g>
              <path d="M40,40 C35,20 50,10 55,10 C60,10 75,20 70,40 C65,48 45,48 40,40 Z" fill="#E8A5A5" stroke="#D98888" strokeWidth="1.5" />
              <path d="M95,30 C90,10 105,0 110,0 C115,0 130,10 125,30 C120,38 100,38 95,30 Z" fill="#F3C5C5" stroke="#D98888" strokeWidth="1.5" />
              <path d="M150,40 C145,20 160,10 165,10 C170,10 185,20 180,40 C175,48 155,48 150,40 Z" fill="#E8A5A5" stroke="#D98888" strokeWidth="1.5" />
              <path d="M85,80 Q60,60 50,75" stroke="#7C9082" strokeWidth="2" fill="#A4B4A5" />
              <path d="M135,80 Q160,60 170,75" stroke="#7C9082" strokeWidth="2" fill="#A4B4A5" />
            </svg>
          </div>

          {/* 3D Folded Envelope Pocket Layers */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
            {/* Left Side Triangle Fold */}
            <div 
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#5E0B20] to-[#450717] border-r border-[#8B1232]/50 shadow-[4px_0_15px_rgba(0,0,0,0.3)]" 
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} 
            />
            {/* Right Side Triangle Fold */}
            <div 
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#590A1E] to-[#400615] border-l border-[#8B1232]/50 shadow-[-4px_0_15px_rgba(0,0,0,0.3)]" 
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} 
            />
            {/* Bottom Pocket Fold with Beveled Edge & Shadow */}
            <div 
              className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#6E0D25] via-[#5E0B20] to-[#4D0819] border-t border-[#A81B3B]/60 shadow-[0_-6px_20px_rgba(0,0,0,0.4)]" 
              style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} 
            />
            {/* Subtle Gold Thread Seam Line on Bottom Fold */}
            <svg className="absolute inset-x-0 bottom-0 w-full h-[62%] pointer-events-none" viewBox="0 0 440 220">
              <path d="M0,220 L220,0 L440,220" fill="none" stroke="rgba(255,215,0,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Top Envelope Flap (3D Flip Animation) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute inset-x-0 top-0 h-[55%] z-30 rounded-t-2xl"
          >
            {/* Front Side of Flap */}
            <div 
              className="w-full h-full bg-gradient-to-b from-[#8B1232] via-[#6E0D25] to-[#590A1E] border-b border-[#A81B3B] shadow-[0_8px_20px_rgba(0,0,0,0.35)] relative overflow-hidden" 
              style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)', backfaceVisibility: 'hidden' }}
            >
              {/* Subtle Gold Thread Seam Line along Top Flap Edge */}
              <svg className="w-full h-full" viewBox="0 0 440 200">
                <path d="M0,0 L220,195 L440,0" fill="none" stroke="rgba(255,215,0,0.25)" strokeWidth="1.2" strokeDasharray="4 3" />
              </svg>
            </div>
          </motion.div>

          {/* Hyper-Realistic 3D Melted Gold Wax Seal */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              >
                <div className="relative group/seal">
                  {/* Real Cast Shadow under Wax Seal */}
                  <div className="absolute top-1 left-1 inset-0 rounded-full bg-black/50 blur-md pointer-events-none" />

                  {/* Organic Dripping 3D Wax Seal Body */}
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#997A00] via-[#FFD700] to-[#FFE58F] p-[3px] shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-[#FFF0F3] flex items-center justify-center text-[#4A0515] transform transition-transform duration-300 group-hover:scale-110">
                    
                    {/* Embossed Inner Indent */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E6B800] via-[#FFD700] to-[#B8860B] shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)] flex items-center justify-center border border-[#997A00]/40">
                      <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-[#4A0515] filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]" />
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>

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
