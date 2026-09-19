import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';
import { Gauge, ShieldCheck, Activity } from 'lucide-react';
import { PLACEHOLDERS } from '../data/mockData';

export const IndustryIntro: React.FC = () => {
  return (
    <section id="about" className="relative w-full bg-black/65 backdrop-blur-md py-24 md:py-36 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Small Label */}
            <motion.span
              {...fadeUp(0.1)}
              className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase mb-4"
            >
              THE SCIENCE BEHIND EVERY SUPPLY
            </motion.span>

            {/* Large Heading with "essential" in Instrument Serif italic */}
            <motion.h2
              {...fadeUp(0.2)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-8"
            >
              Gases that keep{' '}
              <span className="font-serif-accent font-normal italic pr-1">
                essential
              </span>{' '}
              systems moving.
            </motion.h2>

            {/* Description */}
            <motion.p
              {...fadeUp(0.35)}
              className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 font-normal"
            >
              From medical oxygen that supports healthcare to carbon dioxide used across food, manufacturing, and industrial processes, our gases are supplied with a focus on purity, consistency, safety, and dependable delivery.
            </motion.p>

            {/* Technical Sub-spec Indicators */}
            <motion.div
              {...fadeUp(0.45)}
              className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10"
            >
              <div>
                <div className="flex items-center gap-2 text-white/90 font-mono text-xs uppercase mb-1">
                  <Gauge className="w-3.5 h-3.5 text-white/50" />
                  <span>Pressure Regulation</span>
                </div>
                <p className="text-xs text-white/50 leading-normal">
                  Cryogenic liquefied storage to 300-bar compressed gas manifolds.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-white/90 font-mono text-xs uppercase mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-white/50" />
                  <span>Traceability</span>
                </div>
                <p className="text-xs text-white/50 leading-normal">
                  Digital cylinder barcode verification & batch gas chromatography.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Cinematic Industrial Media & Telemetry Panel */}
          <motion.div
            {...fadeUp(0.3)}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group">
              {/* Cinematic Industrial Pipeline & Cryogenic Facility Visual */}
              <div className="relative h-[380px] sm:h-[460px] md:h-[500px] w-full overflow-hidden bg-neutral-950">
                <img
                  src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop"
                  alt="Industrial cryogenic gas piping and valve manifolds"
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-80 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Contrast gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Floating Technical HUD / Telemetry Card */}
                <div className="absolute bottom-6 left-6 right-6 liquid-glass p-5 rounded-xl border border-white/15 backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-white/70 animate-pulse" />
                      <span className="text-[11px] font-mono tracking-widest text-white/80 uppercase">
                        FACILITY TELEMETRY // LINE O₂-CO₂
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">ONLINE</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">Purity</div>
                      <div className="text-sm font-semibold text-white">99.99%</div>
                    </div>
                    <div className="border-x border-white/10">
                      <div className="text-[10px] font-mono text-white/40 uppercase">Moisture</div>
                      <div className="text-sm font-semibold text-white">&lt; 3.0 ppm</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">Status</div>
                      <div className="text-sm font-semibold text-white">Nominal</div>
                    </div>
                  </div>
                </div>

                {/* Placeholder Notice Badge */}
                <div className="absolute top-4 right-4 text-[9px] font-mono tracking-wider text-white/40 bg-black/70 border border-white/10 px-2 py-0.5 rounded">
                  {PLACEHOLDERS.productionCapacity}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
