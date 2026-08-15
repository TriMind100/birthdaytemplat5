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

import { InteractiveHeartTreeCard } from './components/InteractiveHeartTreeCard';
import { ScrapbookBook } from './components/ScrapbookBook';

export function App() {
  const [stage, setStage] = useState('envelope'); // 'envelope' | 'card' | 'scrapbook'
  const scrapbookRef = useRef(null);

  const handleEnvelopeOpened = () => {
    setStage('card');
  };

  const handleExploreSurprise = () => {
    setStage('scrapbook');
  };

  return (
    <div className="min-h-screen relative font-sans text-[#3D342F] selection:bg-[#F3C5C5]/50 overflow-x-hidden flex flex-col justify-center items-center">
      
      {/* Interactive Cursor & Touch Particle Heart Trail */}
      <ParticleHeartTrail />

      {/* Background Petals & Paper Grain Overlay */}
      <BackgroundDecoration />

      {/* Floating Ambient Music Control (♫) */}
      <MusicControl audioUrl={cardData.music.audioUrl} />

      {/* Main Content View Switcher Centered Vertically & Horizontally */}
      <main className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center py-4 sm:py-8 px-2 sm:px-4">
        <AnimatePresence mode="wait">
          {/* Stage 1: Envelope Opening Experience */}
          {stage === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center items-center my-auto"
            >
              <Envelope onOpen={handleEnvelopeOpened} />
            </motion.div>
          )}

          {/* Stage 2: Interactive Blooming Heart Tree Birthday Card */}
          {stage === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-full flex justify-center items-center my-auto"
            >
              <InteractiveHeartTreeCard 
                recipient={cardData.recipient} 
                onExplore={handleExploreSurprise} 
              />
            </motion.div>
          )}

          {/* Stage 3: Multi-Page Book Scrapbook View */}
          {stage === 'scrapbook' && (
            <motion.div
              key="scrapbook"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center items-center my-auto"
            >
              <ScrapbookBook 
                cardData={cardData} 
                onBackToCard={() => setStage('card')} 
                onRestart={() => setStage('envelope')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
