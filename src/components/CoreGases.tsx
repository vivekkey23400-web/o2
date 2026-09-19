import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { CORE_PRODUCTS } from '../data/mockData';
import { GasProduct } from '../types';
import { fadeUp } from '../utils/animations';

interface CoreGasesProps {
  onSelectProduct: (product: GasProduct) => void;
}

export const CoreGases: React.FC<CoreGasesProps> = ({ onSelectProduct }) => {
  return (
    <section id="solutions" className="relative w-full bg-black/65 backdrop-blur-md py-28 md:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.span
            {...fadeUp(0.1)}
            className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase block mb-3"
          >
            CORE GAS PORTFOLIO
          </motion.span>
          <motion.h2
            {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-5"
          >
            The gases behind modern industry.
          </motion.h2>
          <motion.p
            {...fadeUp(0.3)}
            className="text-base sm:text-lg text-white/60 font-normal leading-relaxed"
          >
            Precision-controlled gases for applications where quality and reliability matter.
          </motion.p>
        </div>

        {/* 3 Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CORE_PRODUCTS.map((product, index) => {
            const isOxygen = product.id === 'oxygen';
            const isCO2 = product.id === 'carbon-dioxide';
            const buttonText =
              product.id === 'oxygen'
                ? 'Explore Oxygen →'
                : product.id === 'carbon-dioxide'
                ? 'Explore CO₂ →'
                : 'Explore Supply →';

            return (
              <motion.div
                key={product.id}
                {...fadeUp(0.15 * (index + 1))}
                className="liquid-glass-card rounded-2xl p-8 md:p-10 flex flex-col justify-between group hover:border-white/25 transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle top corner gradient highlight */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.03] rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Top Graphic / Formula Badge */}
                  <div className="h-28 flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                    {isOxygen ? (
                      /* Large minimal oxygen-inspired circular graphic */
                      <div className="relative flex items-center justify-center w-20 h-20">
                        {/* Outer rotating orbit */}
                        <div className="absolute inset-0 border border-white/30 rounded-full animate-[spin_24s_linear_infinite]" />
                        {/* Middle orbital ring */}
                        <div className="absolute inset-2 border border-white/20 rounded-full" />
                        {/* Dual valence electron nodes */}
                        <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                        <div className="absolute bottom-1 right-2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                        {/* Center core */}
                        <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center font-mono text-xs text-white/90">
                          O₂
                        </div>
                      </div>
                    ) : isCO2 ? (
                      /* Linear CO₂ molecular motif: O = C = O */
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center font-mono text-[10px] text-white">
                          O
                        </div>
                        <div className="flex flex-col gap-1 w-4">
                          <div className="h-[1.5px] bg-white/40" />
                          <div className="h-[1.5px] bg-white/40" />
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/60 bg-white/5 flex items-center justify-center font-mono text-xs text-white font-semibold">
                          C
                        </div>
                        <div className="flex flex-col gap-1 w-4">
                          <div className="h-[1.5px] bg-white/40" />
                          <div className="h-[1.5px] bg-white/40" />
                        </div>
                        <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center font-mono text-[10px] text-white">
                          O
                        </div>
                      </div>
                    ) : (
                      /* Bulk / Cylinder schematic graphic */
                      <div className="flex items-end gap-1.5 h-12">
                        <div className="w-3.5 h-12 border border-white/40 rounded-t-sm relative bg-white/[0.02]">
                          <div className="w-1.5 h-1.5 bg-white/60 mx-auto -mt-1 rounded-t-xs" />
                        </div>
                        <div className="w-3.5 h-10 border border-white/30 rounded-t-sm relative bg-white/[0.02]">
                          <div className="w-1.5 h-1.5 bg-white/50 mx-auto -mt-1 rounded-t-xs" />
                        </div>
                        <div className="w-8 h-12 border border-white/50 rounded-lg relative bg-white/[0.02] flex items-center justify-center text-[9px] font-mono text-white/60">
                          BULK
                        </div>
                      </div>
                    )}

                    <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
                      CATALOG {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-8">
                    {product.subtitle}
                  </p>

                  {/* Applications List */}
                  <div className="mb-8">
                    <div className="text-xs font-mono tracking-wider text-white/40 uppercase mb-3">
                      Key Applications:
                    </div>
                    <ul className="space-y-2">
                      {product.applications.map((app) => (
                        <li key={app} className="flex items-center gap-2.5 text-sm text-white/80">
                          <Check className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="pt-6 border-t border-white/10 mt-auto">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full py-3 px-4 rounded-xl liquid-glass border border-white/15 text-white text-sm font-medium flex items-center justify-between hover:bg-white hover:text-black hover:border-white transition-all duration-200 cursor-pointer group/btn"
                  >
                    <span>{buttonText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
