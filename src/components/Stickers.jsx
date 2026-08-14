import React from 'react';
import { motion } from 'framer-motion';

// Silk Pink Bow Sticker 🎀
export const BowSticker = ({ className = "w-10 h-10", style = {} }) => (
  <motion.div 
    whileHover={{ scale: 1.15, rotate: 5 }} 
    className={`inline-block filter drop-shadow-md select-none ${className}`}
    style={style}
  >
    <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
      <path d="M30,40 C10,15 0,55 40,40 C10,25 0,65 30,40 Z" fill="#FF85A1" stroke="#FF4D79" strokeWidth="3" />
      <path d="M70,40 C90,15 100,55 60,40 C90,25 100,65 70,40 Z" fill="#FF85A1" stroke="#FF4D79" strokeWidth="3" />
      <circle cx="50" cy="40" r="10" fill="#E63963" stroke="#FFF" strokeWidth="2" />
      <path d="M42,48 L28,75 C24,80 32,82 36,75 L46,50" fill="#FF758F" stroke="#E63963" strokeWidth="2" />
      <path d="M58,48 L72,75 C76,80 68,82 64,75 L54,50" fill="#FF758F" stroke="#E63963" strokeWidth="2" />
    </svg>
  </motion.div>
);

// Cherry Pair Sticker 🍒
export const CherrySticker = ({ className = "w-10 h-10", style = {} }) => (
  <motion.div 
    whileHover={{ scale: 1.15, rotate: -8 }} 
    className={`inline-block filter drop-shadow-md select-none ${className}`}
    style={style}
  >
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      {/* Stems */}
      <path d="M50,15 Q30,35 32,65" stroke="#4A7C59" strokeWidth="4" strokeLinecap="round" />
      <path d="M50,15 Q70,35 68,65" stroke="#4A7C59" strokeWidth="4" strokeLinecap="round" />
      {/* Leaf */}
      <path d="M50,15 Q35,5 25,18 Q40,22 50,15 Z" fill="#588B69" stroke="#375D43" strokeWidth="1.5" />
      {/* Cherries */}
      <circle cx="30" cy="70" r="18" fill="#C9184A" stroke="#800F2F" strokeWidth="3" />
      <circle cx="24" cy="64" r="5" fill="#FF85A1" opacity="0.8" />
      <circle cx="70" cy="70" r="18" fill="#C9184A" stroke="#800F2F" strokeWidth="3" />
      <circle cx="64" cy="64" r="5" fill="#FF85A1" opacity="0.8" />
    </svg>
  </motion.div>
);

// Red Lipstick Kiss Mark Sticker 💋
export const KissSticker = ({ className = "w-10 h-8", style = {} }) => (
  <motion.div 
    whileHover={{ scale: 1.2, rotate: 6 }} 
    className={`inline-block filter drop-shadow-sm select-none ${className}`}
    style={style}
  >
    <svg viewBox="0 0 100 70" fill="none" className="w-full h-full">
      <path d="M20,25 C30,10 70,10 80,25 C65,30 35,30 20,25 Z" fill="#D90429" opacity="0.9" />
      <path d="M15,35 C30,55 70,55 85,35 C65,42 35,42 15,35 Z" fill="#C9184A" opacity="0.9" />
      <path d="M35,28 Q50,33 65,28" stroke="#FFF" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    </svg>
  </motion.div>
);

// Evil Eye Protection Sticker 🧿
export const EvilEyeSticker = ({ className = "w-9 h-9", style = {} }) => (
  <motion.div 
    whileHover={{ scale: 1.15, rotate: 12 }} 
    className={`inline-block filter drop-shadow-md select-none ${className}`}
    style={style}
  >
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <circle cx="50" cy="50" r="46" fill="#FFF" stroke="#E5E5E5" strokeWidth="4" />
      <circle cx="50" cy="50" r="38" fill="#1D4ED8" />
      <circle cx="50" cy="50" r="26" fill="#60A5FA" />
      <circle cx="50" cy="50" r="16" fill="#FFF" />
      <circle cx="50" cy="50" r="8" fill="#0F172A" />
    </svg>
  </motion.div>
);

// Cute Ghost Besties Sticker 👻👻
export const GhostBestiesSticker = ({ className = "w-14 h-12", style = {} }) => (
  <motion.div 
    whileHover={{ scale: 1.1, y: -3 }} 
    className={`inline-block filter drop-shadow-md select-none ${className}`}
    style={style}
  >
    <div className="bg-white px-2.5 py-1.5 rounded-full border-2 border-[#FF4D79] shadow-sm flex items-center gap-1.5">
      <span className="text-base">👻</span>
      <span className="text-base">👻</span>
      <span className="font-handwriting text-xs text-[#FF4D79] font-bold">Besties</span>
    </div>
  </motion.div>
);

// Bubu & Dudu Cute Bear Badge 🧸🐼
export const BearBadgeSticker = ({ className = "w-16 h-14", style = {} }) => (
  <motion.div 
    whileHover={{ scale: 1.1, rotate: -4 }} 
    className={`inline-block filter drop-shadow-md select-none ${className}`}
    style={style}
  >
    <div className="bg-[#FFF0F3] border-2 border-[#FF758F] px-3 py-1.5 rounded-2xl shadow-xs text-center">
      <div className="text-sm">🐼 ❤️ 🧸</div>
      <p className="font-cursive text-[10px] text-[#C9184A] font-bold tracking-tight">DU&BU</p>
    </div>
  </motion.div>
);

// General Die-Cut Text Quote Sticker
export const QuoteSticker = ({ text, color = "bg-white", textColor = "text-[#3D342F]", className = "", style = {} }) => (
  <motion.div 
    whileHover={{ scale: 1.08, rotate: 1 }} 
    className={`inline-block px-3.5 py-1.5 rounded-full border-2 border-white shadow-md font-handwriting text-sm font-bold ${color} ${textColor} select-none ${className}`}
    style={style}
  >
    {text}
  </motion.div>
);

// Red Gingham Ribbon Accent Line 🎀
export const GinghamRibbonTrim = () => (
  <div className="w-full h-3 bg-repeat-x bg-[length:20px_20px] rounded-xs" style={{
    backgroundImage: `linear-gradient(90deg, rgba(201,24,74,0.4) 50%, transparent 50%), linear-gradient(rgba(201,24,74,0.4) 50%, transparent 50%)`,
    backgroundColor: '#FFF0F3'
  }} />
);
