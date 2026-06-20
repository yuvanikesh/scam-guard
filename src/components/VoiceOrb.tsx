"use client";

import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Check } from "lucide-react";
import { DbService } from "@/services/dbService";

interface VoiceOrbProps {
  onListeningStart?: () => void;
  onListeningEnd?: () => void;
}

export default function VoiceOrb({ onListeningStart, onListeningEnd }: VoiceOrbProps) {
  const { voiceState, setVoiceState, user } = useAppStore();

  // Handle clicking the voice orb
  const handleClick = () => {
    if (voiceState === "idle" || voiceState === "floating" || voiceState === "results") {
      setVoiceState('listening');
      // Log voice started analytics event
      DbService.logAnalytics(user?.id, "voice_started", { timestamp: new Date().toISOString() });
      
      if (onListeningStart) onListeningStart();
    } else if (voiceState === "listening") {
      setVoiceState("thinking");
      if (onListeningEnd) onListeningEnd();
    }
  };

  const isFloating = voiceState === "floating";
  // Responsive sizing adhering strictly to design guidelines
  const sizeClasses = isFloating 
    ? "w-16 h-16 sm:w-16 sm:h-16" // 64px (allowed in 8pt grid)
    : "w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24"; // 96px (allowed in 8pt grid)

  return (
    <div className={`relative flex items-center justify-center ${isFloating ? "fixed bottom-8 right-8 z-50" : ""}`}>
      {/* Background audio-reactive glowing wave effects (only when listening) */}
      <AnimatePresence>
        {voiceState === "listening" && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute w-full h-full rounded-full bg-accent-indigo/30 blur-sm pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.6 }}
              className="absolute w-full h-full rounded-full bg-accent-violet/30 blur-sm pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Thinking Halo Effect */}
      <AnimatePresence>
        {voiceState === "thinking" && (
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 1.8 }}
            className="absolute -inset-2 rounded-full border-2 border-transparent border-t-accent-indigo border-r-accent-violet blur-[1px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main Interactive Orb Body */}
      <motion.button
        onClick={handleClick}
        className={`${sizeClasses} rounded-full bg-gradient-to-br from-accent-indigo to-accent-violet p-[2px] shadow-[0_0_30px_rgba(255,92,56,0.4)] hover:shadow-[0_0_40px_rgba(171,84,247,0.6)] cursor-pointer focus:outline-none transition-all`}
        // Breathing animation in idle, static/spring morph when layout changes
        animate={
          voiceState === "idle"
            ? { scale: [1, 1.03, 1] }
            : { scale: 1 }
        }
        transition={voiceState === "idle" ? { scale: { duration: 4, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const } } : { type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        layoutId="voiceOrbBody"
      >
        <div className="w-full h-full rounded-full bg-bg-primary flex flex-col items-center justify-center text-white relative overflow-hidden group">
          {/* Internal background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/10 to-accent-violet/10 opacity-60 group-hover:opacity-100 transition-opacity duration-250" />

          {/* Dynamic Content depending on state */}
          <AnimatePresence mode="wait">
            {voiceState === "idle" && (
              <motion.div
                key="idle"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center justify-center gap-2 z-10"
              >
                <Mic className="w-6 h-6 text-accent-indigo" />
                {!isFloating && (
                  <span className="text-[10px] text-text-secondary font-medium tracking-wide uppercase">
                    Tap to Speak
                  </span>
                )}
              </motion.div>
            )}

            {voiceState === "listening" && (
              <motion.div
                key="listening"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center justify-center gap-2 z-10"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  <Mic className="w-6 h-6 text-error" />
                </motion.div>
                {!isFloating && (
                  <span className="text-[10px] text-error font-semibold tracking-wide uppercase animate-pulse">
                    Listening
                  </span>
                )}
              </motion.div>
            )}

            {voiceState === "thinking" && (
              <motion.div
                key="thinking"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center justify-center gap-2 z-10"
              >
                <motion.div
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Mic className="w-6 h-6 text-accent-violet" />
                </motion.div>
                {!isFloating && (
                  <span className="text-[10px] text-accent-violet font-semibold tracking-wide uppercase">
                    Thinking
                  </span>
                )}
              </motion.div>
            )}

            {voiceState === "results" && (
              <motion.div
                key="results"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center justify-center gap-2 z-10"
              >
                <Check className="w-6 h-6 text-success" />
                {!isFloating && (
                  <span className="text-[10px] text-success font-semibold tracking-wide uppercase">
                    Ready
                  </span>
                )}
              </motion.div>
            )}

            {voiceState === "floating" && (
              <motion.div
                key="floating"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center justify-center z-10"
              >
                <Mic className="w-6 h-6 text-accent-indigo" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Transcript text tooltip */}
      {voiceState === "listening" && !isFloating && (
        <div className="absolute top-[112px] text-center bg-surface-primary border border-surface-secondary px-4 py-2 rounded-medium text-xs text-text-secondary shadow-modal" style={{ width: '256px' }}>
          Describe what you want to achieve...
        </div>
      )}
    </div>
  );
}
