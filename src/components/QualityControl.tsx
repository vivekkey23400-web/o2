import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';
import { QUALITY_STEPS, PLACEHOLDERS } from '../data/mockData';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const QualityControl: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const labImages = [
    {
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
      caption: 'Analytical gas chromatography laboratory & spectroscopy verification',
    },
    {
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
      caption: 'Cryogenic air separation plant column & distillation equipment',
    },
    {
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
      caption: 'Automated gravimetric cylinder evacuation and precision filling manifold',
    },
    {
      url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop',
      caption: 'Direct vacuum-insulated tanker transport & telemetry integration',
    },
  ];

  return (
    <section id="quality" className="relative w-full bg-black/70 backdrop-blur-md py-28 md:py-36 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <motion.span
            {...fadeUp(0.1)}
            className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase block mb-3"
          >
            QUALITY CONTROL
          </motion.span>
          <motion.h2
            {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]"
          >
            Purity isn't a specification. It's a{' '}
            <span className="font-serif-accent font-normal italic pr-1">
              responsibility.
            </span>
          </motion.h2>
        </div>

        {/* 2-Column Layout: Visual on Left, Sequential Stages on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Laboratory Visual */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-6 sticky top-28"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl">
              <div className="relative h-[360px] sm:h-[440px] md:h-[500px] w-full overflow-hidden">
                <img
                  src={labImages[activeStep]?.url || labImages[0].url}
                  alt="Laboratory purity testing and gas chromatography"
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-80 transition-all duration-700"
                  loading="lazy"
                />
                
                {/* Monochromatic overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Bottom caption and status */}
                <div className="absolute bottom-6 left-6 right-6 liquid-glass p-4 rounded-xl border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs font-mono text-white/80 mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      STAGE {QUALITY_STEPS[activeStep].step} ANALYSIS
                    </span>
                    <span className="text-white/40">{QUALITY_STEPS[activeStep].title}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-normal line-clamp-2">
                    {labImages[activeStep]?.caption}
                  </p>
                </div>

                {/* Top Corner Certification Spec Badge */}
                <div className="absolute top-4 left-4 text-[10px] font-mono text-white/50 bg-black/70 border border-white/10 px-2.5 py-1 rounded">
                  {PLACEHOLDERS.certification} : VALIDATED
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Vertical List with Sequential Scroll-Triggered Animations */}
          <div className="lg:col-span-6 space-y-6">
            {QUALITY_STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <motion.div
                  key={step.step}
                  {...fadeUp(0.15 * (index + 1))}
                  onClick={() => setActiveStep(index)}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'liquid-glass-card border-white/40 bg-white/[0.04]'
                      : 'liquid-glass border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono tracking-widest text-white/50">
                        {step.step} —
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-sans">
                        {step.title}
                      </h3>
                    </div>
                    {isActive ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    )}
                  </div>

                  <p className="text-base text-white/85 font-medium mb-3">
                    {step.description}
                  </p>

                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {step.methodology}
                  </p>

                  <div className="inline-block text-[11px] font-mono text-white/40 border border-white/10 px-2.5 py-0.5 rounded bg-black/40">
                    {step.standardRef}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
