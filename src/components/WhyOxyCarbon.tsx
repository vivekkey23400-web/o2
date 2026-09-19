import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';
import { WHY_COLUMNS } from '../data/mockData';

export const WhyOxyCarbon: React.FC = () => {
  return (
    <section className="relative w-full bg-black/70 backdrop-blur-md py-28 md:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.span
            {...fadeUp(0.1)}
            className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase block mb-3"
          >
            WHY OXYCARBON
          </motion.span>
          <motion.h2
            {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Designed for the demands of the real world.
          </motion.h2>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_COLUMNS.map((col, index) => (
            <motion.div
              key={col.title}
              {...fadeUp(0.15 * (index + 1))}
              className="border-t border-white/15 pt-8 flex flex-col justify-between group hover:border-white/40 transition-colors"
            >
              <div>
                <span className="text-xs font-mono tracking-widest text-white/40 block mb-4">
                  // 0{index + 1}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-4 uppercase font-sans">
                  {col.title}
                </h3>

                <p className="text-sm text-white/80 font-medium mb-3 leading-relaxed">
                  {col.description}
                </p>

                <p className="text-xs text-white/50 leading-relaxed font-normal">
                  {col.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
