import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Truck, CheckCircle } from 'lucide-react';
import { fadeUp } from '../utils/animations';
import { SAFETY_ITEMS, PLACEHOLDERS } from '../data/mockData';

export const SafetySection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield':
        return <Shield className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
      case 'CheckCircle2':
        return <CheckCircle className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
      default:
        return <Shield className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
    }
  };

  return (
    <section id="safety" className="relative w-full bg-black/70 backdrop-blur-md py-28 md:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            {...fadeUp(0.1)}
            className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase block mb-3"
          >
            CRITICAL STANDARDS & INTEGRITY
          </motion.span>
          <motion.h2
            {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4"
          >
            Safety is built into every step.
          </motion.h2>
          <motion.p
            {...fadeUp(0.3)}
            className="text-base sm:text-lg text-white/60 font-normal leading-relaxed"
          >
            From production and cylinder handling to storage and transportation, safety remains central to our operations.
          </motion.p>
        </div>

        {/* 4 Safety Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAFETY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              {...fadeUp(0.15 * (index + 1))}
              className="liquid-glass-card rounded-2xl p-7 md:p-8 flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all duration-300 group"
            >
              <div>
                {/* Minimalist Icon: shield, cylinder/layers, truck, check */}
                <div className="w-12 h-12 rounded-xl liquid-glass border border-white/15 flex items-center justify-center mb-6 group-hover:border-white/40 transition-colors">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed font-normal mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-white/40">
                <span>{item.protocolCode}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsible Safety Notice */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-12 text-center"
        >
          <p className="text-xs font-mono text-white/35 max-w-2xl mx-auto tracking-wider">
            All protocols executed in accordance with technical handling specifications and verified telemetry monitoring. Standard references subject to facility validation [{PLACEHOLDERS.certification}].
          </p>
        </motion.div>
      </div>
    </section>
  );
};
