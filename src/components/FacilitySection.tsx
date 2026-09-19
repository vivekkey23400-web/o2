import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IndustrialVideo } from './IndustrialVideo';
import { fadeUp } from '../utils/animations';
import { Cpu, Database, Truck } from 'lucide-react';

export const FacilitySection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const card1Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const facilityVideoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-metal-cutting-in-a-lathe-machine-42407-large.mp4';
  const facilityPoster = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop';

  const cards = [
    {
      id: 'prod',
      title: 'Production',
      desc: 'Controlled gas generation and processing.',
      details: 'Cryogenic air separation units (ASU) and gas purification loops.',
      icon: Cpu,
      yMotion: card1Y,
    },
    {
      id: 'stor',
      title: 'Storage',
      desc: 'Engineered storage and handling systems.',
      details: 'Vacuum-insulated cryogenic tanks and multi-cylinder high-pressure banks.',
      icon: Database,
      yMotion: card2Y,
    },
    {
      id: 'dist',
      title: 'Distribution',
      desc: 'Reliable supply across customer locations.',
      details: 'Dedicated hazardous-materials transport fleet with 24/7 telemetry routing.',
      icon: Truck,
      yMotion: card3Y,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[900px] flex flex-col justify-between bg-black py-28 md:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Background: Large Industrial Facility Video with monochrome filter */}
      <div className="absolute inset-0 w-full h-full">
        <IndustrialVideo
          src={facilityVideoSrc}
          posterUrl={facilityPoster}
          className="w-full h-full"
          overlayOpacity={0.8}
          label="FACILITY MAIN // AUTOMATION MATRIX"
          showStatusBadge={true}
        />
      </div>

      {/* Top & Bottom gradient fades for seamless transitions */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto">
        {/* Section Heading & Subtitle */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.span
            {...fadeUp(0.1)}
            className="text-xs font-mono tracking-[0.25em] text-white/50 uppercase block mb-3"
          >
            ENGINEERING & INFRASTRUCTURE
          </motion.span>
          <motion.h2
            {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
          >
            Where chemistry meets engineering.
          </motion.h2>
          <motion.p
            {...fadeUp(0.35)}
            className="text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl"
          >
            Modern gas infrastructure combines controlled production, precision filling, storage, quality testing, and dependable distribution.
          </motion.p>
        </div>

        {/* Three Floating Liquid-Glass Cards with Parallax Movement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                style={{ y: card.yMotion }}
                {...fadeUp(0.2 + idx * 0.15)}
                className="liquid-glass-card rounded-2xl p-8 md:p-10 border border-white/15 backdrop-blur-xl flex flex-col justify-between group hover:border-white/35 transition-all duration-300 shadow-2xl relative overflow-hidden"
              >
                {/* Subtle top light highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div>
                  <div className="w-12 h-12 rounded-xl liquid-glass border border-white/20 flex items-center justify-center mb-6 group-hover:border-white/50 transition-colors">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-sm text-white/80 font-medium mb-3 leading-relaxed">
                    {card.desc}
                  </p>

                  <p className="text-xs text-white/50 leading-relaxed font-normal">
                    {card.details}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>INFRA // 0{idx + 1}</span>
                  <span className="text-white/20 group-hover:text-white/60 transition-colors">SPEC ACTIVE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
