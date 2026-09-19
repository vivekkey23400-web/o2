import React from 'react';
import { motion } from 'framer-motion';
import { IndustrialVideo } from './IndustrialVideo';
import { fadeUp } from '../utils/animations';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface ContactCtaProps {
  onRequestQuote: () => void;
  onContactUs: () => void;
}

export const ContactCta: React.FC<ContactCtaProps> = ({
  onRequestQuote,
  onContactUs,
}) => {
  const ctaVideoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-automated-factory-production-line-43284-large.mp4';
  const ctaPoster = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop';

  return (
    <section
      id="contact"
      className="relative w-full min-h-[680px] flex items-center justify-center bg-black py-28 md:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Background: Dark cinematic industrial gas facility video */}
      <div className="absolute inset-0 w-full h-full">
        <IndustrialVideo
          src={ctaVideoSrc}
          posterUrl={ctaPoster}
          className="w-full h-full"
          overlayOpacity={0.82}
          label="CRYO-DISTRIBUTION // DISPATCH CENTER"
          showStatusBadge={false}
        />
      </div>

      {/* Top & Bottom gradient fades */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Centered concentric-circle logo */}
        <motion.div
          {...fadeUp(0.1)}
          className="mb-8"
        >
          <div className="relative flex items-center justify-center w-14 h-14 border-2 border-white/80 rounded-full mx-auto shadow-2xl bg-black/40 backdrop-blur-md">
            <div className="w-6 h-6 border border-white/80 rounded-full" />
          </div>
        </motion.div>

        {/* Heading: Need a gas solution? with "gas solution" in Instrument Serif italic */}
        <motion.h2
          {...fadeUp(0.2)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-6"
        >
          Need a{' '}
          <span className="font-serif-accent font-normal italic pr-1">
            gas solution?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.35)}
          className="max-w-2xl text-base sm:text-lg text-white/70 font-normal leading-relaxed mb-10 text-balance"
        >
          Tell us what you need and our team can help identify the right supply solution.
        </motion.p>

        {/* Two Buttons */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
        >
          {/* Request a Quote Button */}
          <button
            id="cta-btn-quote"
            onClick={onRequestQuote}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:bg-white/90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xl"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Contact Us Button */}
          <button
            id="cta-btn-contact"
            onClick={onContactUs}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full liquid-glass border border-white/20 text-white font-medium text-sm tracking-wide hover:bg-white/10 hover:border-white/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Us</span>
          </button>
        </motion.div>

        {/* Small text below */}
        <motion.div
          {...fadeUp(0.65)}
          className="text-xs sm:text-sm font-mono tracking-widest text-white/50 uppercase"
        >
          Oxygen • Carbon Dioxide • Bulk Supply • Cylinders
        </motion.div>
      </div>
    </section>
  );
};
