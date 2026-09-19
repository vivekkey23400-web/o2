import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp } from '../utils/animations';

interface StatDisplayProps {
  target: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  isSpecial?: string; // for "24/7"
}

const AnimatedCounter: React.FC<StatDisplayProps> = ({
  target,
  decimals = 0,
  suffix = '',
  prefix = '',
  isSpecial,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;
    if (isSpecial) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easedProgress * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, isSpecial]);

  if (isSpecial) {
    return <span ref={ref}>{isSpecial}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const CapabilitiesStats: React.FC = () => {
  return (
    <section className="relative w-full bg-black/60 backdrop-blur-md py-28 md:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            {...fadeUp(0.1)}
            className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase block mb-3"
          >
            OPERATIONAL PERFORMANCE
          </motion.span>
          <motion.h2
            {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4"
          >
            Built around reliability.
          </motion.h2>
          <motion.p
            {...fadeUp(0.3)}
            className="text-xs font-mono text-white/40 tracking-wider uppercase"
          >
            [DEMONSTRATION FIGURES FOR DESIGN — CONFIGURABLE]
          </motion.p>
        </div>

        {/* 4 Large Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stat 1: 99.9%+ */}
          <motion.div
            {...fadeUp(0.2)}
            className="liquid-glass-card rounded-2xl p-8 border border-white/10 flex flex-col justify-between text-center group hover:border-white/25 transition-colors"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-mono mb-4">
              <AnimatedCounter target={99.9} decimals={1} suffix="%+" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                Purity-focused production
              </h3>
              <p className="text-xs text-white/50 font-normal">
                Strict multi-stage continuous gas analysis.
              </p>
            </div>
          </motion.div>

          {/* Stat 2: 24/7 */}
          <motion.div
            {...fadeUp(0.3)}
            className="liquid-glass-card rounded-2xl p-8 border border-white/10 flex flex-col justify-between text-center group hover:border-white/25 transition-colors"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-mono mb-4">
              <AnimatedCounter target={24} isSpecial="24/7" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                Critical supply capability
              </h3>
              <p className="text-xs text-white/50 font-normal">
                Uninterrupted hospital & industrial delivery.
              </p>
            </div>
          </motion.div>

          {/* Stat 3: 100% */}
          <motion.div
            {...fadeUp(0.4)}
            className="liquid-glass-card rounded-2xl p-8 border border-white/10 flex flex-col justify-between text-center group hover:border-white/25 transition-colors"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-mono mb-4">
              <AnimatedCounter target={100} decimals={0} suffix="%" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                Safety-first approach
              </h3>
              <p className="text-xs text-white/50 font-normal">
                Zero-tolerance pressure & handling standards.
              </p>
            </div>
          </motion.div>

          {/* Stat 4: 4+ */}
          <motion.div
            {...fadeUp(0.5)}
            className="liquid-glass-card rounded-2xl p-8 border border-white/10 flex flex-col justify-between text-center group hover:border-white/25 transition-colors"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-mono mb-4">
              <AnimatedCounter target={4} decimals={0} suffix="+" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                Core application sectors
              </h3>
              <p className="text-xs text-white/50 font-normal">
                Healthcare, food, manufacturing & research.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
