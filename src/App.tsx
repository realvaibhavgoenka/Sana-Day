import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingLilies } from './components/FloatingLilies';
import { NavigationHeader } from './components/NavigationHeader';
import { EnvelopeSurprise } from './components/EnvelopeSurprise';
import { BatteryScratchCards } from './components/BatteryScratchCards';
import { ReelEditSection } from './components/ReelEditSection';
import { LoveLetter } from './components/LoveLetter';
import { DateScheduler } from './components/DateScheduler';
import { CustomizeModal } from './components/CustomizeModal';
import { AppConfig } from './types';
import { getAppConfig } from './utils/storage';
import { SingleLilySVG } from './components/LilyFlowerSVG';

export default function App() {
  const [config, setConfig] = useState<AppConfig>(getAppConfig());
  const [activeStep, setActiveStep] = useState<number>(1);

  // Reload config when updated from CustomizeModal
  const handleUpdateConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
  };

  const nextStep = () => {
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9FB] bg-grid-notebook text-[#744F4F] font-sans selection:bg-[#FCE4EC] selection:text-[#D81B60] relative overflow-x-hidden">
      {/* Floating Pink and Blue Lily Petals Background */}
      <FloatingLilies />

      {/* Top Floating Navigation Bar */}
      <NavigationHeader
        activeStep={activeStep}
        onSelectStep={(s) => {
          setActiveStep(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        girlfriendName={config.girlfriendName}
      />

      {/* Main Interactive Pages Canvas */}
      <main className="pt-16 pb-20 relative z-10">
        <AnimatePresence mode="wait">
          {activeStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <EnvelopeSurprise config={config} onContinue={nextStep} />
            </motion.div>
          )}

          {activeStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <BatteryScratchCards config={config} onContinue={nextStep} />
            </motion.div>
          )}

          {activeStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ReelEditSection config={config} onContinue={nextStep} />
            </motion.div>
          )}

          {activeStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <LoveLetter config={config} onContinue={nextStep} />
            </motion.div>
          )}

          {activeStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <DateScheduler config={config} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding & Watermark */}
      <footer className="py-6 text-center text-xs text-[#C2185B]/70 font-serif tracking-widest uppercase relative z-10 flex items-center justify-center gap-2">
        <SingleLilySVG color="pink" size={20} />
        <span>Lily Blooms For My {config.girlfriendName} • Happy Girlfriend Day</span>
        <SingleLilySVG color="blue" size={20} />
      </footer>

      {/* Content Customizer Modal (Photos, Letter, Names) */}
      <CustomizeModal config={config} onUpdateConfig={handleUpdateConfig} />
    </div>
  );
}
