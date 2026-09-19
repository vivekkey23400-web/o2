import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, Flame, FlaskConical } from 'lucide-react';
import { fadeUp } from '../utils/animations';
import { INDUSTRY_APPLICATIONS } from '../data/mockData';

export const Industries: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity':
        return <Activity className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
      default:
        return <Activity className="w-6 h-6 text-white/90" strokeWidth={1.5} />;
    }
  };

  return (
    <section id="industries" className="relative w-full bg-black/70 backdrop-blur-md py-28 md:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            {...fadeUp(0.1)}
            className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase block mb-3"
          >
            SECTORS SERVED
          </motion.span>
          <motion.h2
            {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            One supply. Many industries.
          </motion.h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRY_APPLICATIONS.map((item, index) => (
            <motion.div
              key={item.id}
              {...fadeUp(0.15 * (index + 1))}
              className="liquid-glass-card rounded-2xl p-7 md:p-8 flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all duration-300 group"
            >
              <div>
                {/* Minimalist Line Icon */}
                <div className="w-12 h-12 rounded-xl liquid-glass border border-white/15 flex items-center justify-center mb-6 group-hover:border-white/40 transition-colors">
                  {getIcon(item.iconName)}
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-sm text-white/70 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Sub-label for key gas type */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                <span>{item.keyGas}</span>
                <span className="text-white/20">0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
