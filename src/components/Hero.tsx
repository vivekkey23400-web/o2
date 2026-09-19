import React from 'react';
import { motion } from 'framer-motion';
import { IndustrialVideo } from './IndustrialVideo';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { fadeUp } from '../utils/animations';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20"
    >
      {/* Subtle depth vignette & soft bottom gradient fade to let the 3D facility show through */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10" />

      {/* Hero Content (Centered directly in front of the 3D facility) */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Facility Telemetry Status Badge */}
        <motion.div
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-8 shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="text-[11px] md:text-xs font-mono font-medium tracking-[0.28em] text-white/85 uppercase">
            CRYOGENIC FACILITY // ACTIVE O₂ & CO₂ PRODUCTION
          </span>
        </motion.div>

        {/* Text Container with subtle translucent backing for pristine readability while keeping 3D depth visible */}
        <div className="relative p-6 sm:p-10 md:p-14 rounded-3xl bg-black/25 backdrop-blur-[2px] border border-white/10 shadow-2xl max-w-4xl flex flex-col items-center">
          {/* Main heading: PURE GASES. PRECISE SOLUTIONS. */}
          <motion.h1
            {...fadeUp(0.25)}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.04] mb-6 select-none"
          >
            <span className="font-serif-accent font-normal italic pr-2 text-white">
              Pure
            </span>
            GASES.
            <br />
            <span className="text-white tracking-tight uppercase">
              PRECISE SOLUTIONS.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.4)}
            className="max-w-2xl text-base sm:text-lg md:text-xl text-white/80 font-normal leading-relaxed mb-10 text-balance"
          >
            Reliable oxygen and carbon dioxide solutions engineered for healthcare, industry, food processing, and critical applications.
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fadeUp(0.55)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6"
          >
            {/* Primary Button */}
            <button
              id="hero-btn-explore"
              onClick={onExploreClick}
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wider uppercase hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-2xl cursor-pointer"
            >
              <span>Explore Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Button */}
            <button
              id="hero-btn-contact"
              onClick={onContactClick}
              className="w-full sm:w-auto px-9 py-4 rounded-full liquid-glass border border-white/25 text-white font-medium text-sm tracking-wider uppercase hover:bg-white/15 hover:border-white/50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg"
            >
              <span>Contact Our Team</span>
            </button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            {...fadeUp(0.7)}
            className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/60 tracking-wider font-mono text-center flex-wrap pt-4 border-t border-white/10 w-full"
          >
            <span>Quality controlled</span>
            <span className="text-white/40">•</span>
            <span>Reliable supply</span>
            <span className="text-white/40">•</span>
            <span>Built for critical applications</span>
          </motion.div>
        </div>
      </div>

      {/* Floating 3D Facility Telemetry Indicators at bottom corners */}
      <div className="absolute bottom-6 left-8 z-20 hidden lg:flex items-center gap-4 text-[10px] font-mono text-white/40 tracking-widest uppercase pointer-events-none">
        <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-md border border-white/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
          <span>O₂ HEADER: 42.8 BAR</span>
        </div>
        <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-md border border-white/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
          <span>CO₂ BULK TANK: -78.5°C</span>
        </div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 z-20 hidden md:flex flex-col items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-white/40 pointer-events-none"
      >
        <span>SCROLL TO ENTER FACILITY</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
};
