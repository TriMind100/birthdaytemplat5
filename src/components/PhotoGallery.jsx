import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Calendar } from 'lucide-react';

export const PhotoGallery = ({ galleryItems }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-3 sm:px-6 overflow-x-hidden">
      
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12 relative px-2">
        <span className="font-cursive text-xl sm:text-2xl text-[#D98888]">treasured moments ♡</span>
        <h2 className="font-handwriting text-3xl sm:text-5xl font-bold text-[#3D342F] mt-1">
          Scrapbook Memories
        </h2>
        <p className="font-marker text-base sm:text-lg text-[#8C7A6B] mt-1 sm:mt-2">
          Click any polaroid to open full memory note ✦
        </p>
      </div>

      {/* Organic Scattered Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 relative px-2">
        {galleryItems.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="polaroid-frame cursor-pointer relative group selection:bg-transparent transform transition-transform duration-300 hover:scale-103 sm:hover:scale-105 hover:rotate-0 hover:z-30"
          >
            {/* Washi Tape Strip */}
            <div className={`${photo.tapeColor} absolute ${photo.tapePosition} w-20 sm:w-24 h-4 sm:h-5 z-20`} />

            {/* Polaroid Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-[#F7ECE1]">
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
              
              {/* Subtle hover overlay icon */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-[#FFFDF9]/90 text-[#3D342F] px-3 py-1 rounded-full font-handwriting text-xs sm:text-sm shadow-md flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-[#D98888] text-[#D98888]" /> View
                </span>
              </div>
            </div>

            {/* Handwritten Caption & Date */}
            <div className="mt-3 sm:mt-4 text-center">
              <p className="font-handwriting text-lg sm:text-xl text-[#3D342F] font-semibold leading-snug">
                {photo.caption}
              </p>
              <div className="flex items-center justify-center gap-1 text-[#8C7A6B] font-marker text-xs mt-1">
                <Calendar className="w-3 h-3" />
                <span>{photo.date}</span>
              </div>
            </div>

            {/* Small corner doodle on hover */}
            <div className="absolute bottom-2 right-2 text-[#D98888] opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-[#3D342F]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#FAF6EF] p-4 xs:p-6 sm:p-8 rounded-2xl shadow-2xl border-2 sm:border-4 border-white my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 text-[#8C7A6B] hover:text-[#3D342F] p-1.5 rounded-full hover:bg-[#EFE6D5] transition-colors cursor-pointer z-30"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Lightbox Polaroid Content */}
              <div className="polaroid-frame mt-2 sm:mt-4 bg-white">
                <div className="washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-4 sm:h-5" />
                
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.caption} 
                  className="w-full max-h-[48vh] sm:max-h-[60vh] object-cover rounded-xs"
                />

                <div className="mt-4 sm:mt-6 text-center space-y-1.5 sm:space-y-2">
                  <h3 className="font-handwriting text-2xl sm:text-3xl text-[#3D342F] font-bold">
                    {selectedPhoto.caption}
                  </h3>
                  <p className="font-marker text-xs sm:text-base text-[#8C7A6B]">
                    ✦ {selectedPhoto.date} ✦
                  </p>
                  <p className="font-handwriting text-base sm:text-lg text-[#52463F] pt-1 sm:pt-2 italic leading-snug">
                    "Every picture with you tells a story worth remembering forever."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
