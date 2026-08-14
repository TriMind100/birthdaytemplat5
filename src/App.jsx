import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cardData } from './data/cardData';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { MusicControl } from './components/MusicControl';
import { Envelope } from './components/Envelope';
import { BirthdayCard } from './components/BirthdayCard';
import { PhotoGallery } from './components/PhotoGallery';
import { MemoryTimeline } from './components/MemoryTimeline';
import { MemoryEnvelopes } from './components/MemoryEnvelopes';
import { InteractiveLetter } from './components/InteractiveLetter';
import { FinalSurprise } from './components/FinalSurprise';
import { ParticleHeartTrail } from './components/ParticleHeartTrail';
import { InteractiveHeartTree } from './components/InteractiveHeartTree';
import { AnimatedFlowers } from './components/AnimatedFlowers';

export function App() {
  const [stage, setStage] = useState('envelope'); // 'envelope' | 'card' | 'scrapbook'
  const scrapbookRef = useRef(null);

  const handleEnvelopeOpened = () => {
    setStage('card');
  };

  const handleExploreSurprise = () => {
    setStage('scrapbook');
    setTimeout(() => {
      if (scrapbookRef.current) {
        scrapbookRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen relative font-sans text-[#3D342F] selection:bg-[#F3C5C5]/50 overflow-x-hidden">
      
      {/* Interactive Cursor & Touch Particle Heart Trail */}
      <ParticleHeartTrail />

      {/* Background Petals & Paper Grain Overlay */}
      <BackgroundDecoration />

      {/* Floating Ambient Music Control (♫) */}
      <MusicControl audioUrl={cardData.music.audioUrl} />

      {/* Main Content View Switcher */}
      <main className="relative z-10">
        
        {/* Stage 1: Envelope Opening Experience */}
        {stage === 'envelope' && (
          <Envelope onOpen={handleEnvelopeOpened} />
        )}

        {/* Stage 2: Main Birthday Card Cover */}
        {stage === 'card' && (
          <BirthdayCard 
            recipient={cardData.recipient} 
            onExplore={handleExploreSurprise} 
          />
        )}

        {/* Stage 3: Full Scrapbook & Interactive Sections */}
        {stage === 'scrapbook' && (
          <motion.div
            ref={scrapbookRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-10 sm:space-y-16 pb-16 sm:pb-24 px-2 sm:px-4"
          >
            {/* Header Banner */}
            <header className="pt-8 sm:pt-12 text-center px-4">
              <span className="font-cursive text-2xl sm:text-3xl text-[#D98888]">welcome to your scrapbook ♡</span>
              <h1 className="font-handwriting text-4xl xs:text-5xl sm:text-6xl font-bold text-[#3D342F] mt-1 break-words">
                {cardData.recipient.name}'s Birthday Corner
              </h1>
              <div className="washi-tape-pink w-28 sm:w-32 h-4 sm:h-5 mx-auto mt-3 rotate-[-1deg]" />
            </header>

            {/* Photo Scrapbook & Gallery */}
            <section>
              <PhotoGallery galleryItems={cardData.gallery} />
            </section>

            {/* Interactive Heart Tree Animation Section */}
            <section className="bg-[#FFFDF9]/80 py-6 sm:py-10 border-y border-[#E8DCCB]">
              <InteractiveHeartTree />
            </section>

            {/* Memory Timeline */}
            <section className="bg-[#FAF5EB]/50 py-8 sm:py-12 border-b border-[#E8DCCB]">
              <MemoryTimeline memories={cardData.memories} />
            </section>

            {/* Reasons You're Special Mini-Envelopes */}
            <section>
              <MemoryEnvelopes specialEnvelopes={cardData.specialEnvelopes} />
            </section>

            {/* Bioluminescent Animated Flowers Section */}
            <section className="py-6 sm:py-10">
              <AnimatedFlowers />
            </section>

            {/* Interactive Letter */}
            <section className="bg-[#FAF5EB]/50 py-8 sm:py-12 border-y border-[#E8DCCB]">
              <InteractiveLetter letter={cardData.letter} />
            </section>

            {/* Final Envelope & Candle Wish */}
            <section>
              <FinalSurprise 
                finalData={cardData.finalEnvelope} 
                recipient={cardData.recipient} 
              />
            </section>

            {/* Footer */}
            <footer className="text-center py-6 sm:py-8 text-xs font-marker text-[#8C7A6B] px-4">
              Made with infinite love & care for my favorite human ♡
            </footer>

          </motion.div>
        )}

      </main>
    </div>
  );
}

export default App;
