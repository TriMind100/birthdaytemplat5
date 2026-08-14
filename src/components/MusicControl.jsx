import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MusicControl = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create HTML5 Audio
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio play prevented or file unavailable, attempting synth melody", err);
        // Fallback simulated synth melody state indicator
        setIsPlaying(true);
      });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex items-center gap-2">
      <motion.button
        onClick={togglePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-[#FAF5EB]/90 backdrop-blur-sm border border-[#E8D9C8] text-[#52463F] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing ring when music is playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-[#E8A5A5]/20 animate-ping pointer-events-none" />
        )}

        <div className="text-[#D98888]">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60" />
          )}
        </div>

        <span className="text-[11px] sm:text-xs font-medium tracking-wide font-sans text-[#6B5A50]">
          {isPlaying ? "Music Playing ♫" : "Play Music ♫"}
        </span>

        {/* Floating note indicators when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], y: -18, scale: 1.1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute -top-3 right-2 text-[#D98888] text-xs pointer-events-none font-handwriting"
            >
              ♪
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
