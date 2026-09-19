import React from 'react';

interface FooterProps {
  onSelectProduct?: (productName: string) => void;
  onContactClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectProduct,
  onContactClick,
  onPrivacyClick,
  onTermsClick,
}) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-black border-t border-white/10 py-16 text-white/70 text-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-white/10">
          {/* Left: Brand Copyright */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 border-2 border-foreground/60 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 border border-foreground/60 rounded-full" />
              </div>
              <span className="font-bold text-white tracking-tight uppercase">
                OxyCarbon Industries
              </span>
            </div>
            <p className="text-xs text-white/50">
              © 2026 OxyCarbon Industries. All rights reserved.
            </p>
          </div>

          {/* Middle: Navigation Links */}
          <div className="md:col-span-4 flex flex-wrap items-center justify-start md:justify-center gap-6 text-xs sm:text-sm">
            <button
              onClick={() => scrollTo('#solutions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Oxygen
            </button>
            <button
              onClick={() => scrollTo('#solutions')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Carbon Dioxide
            </button>
            <button
              onClick={() => scrollTo('#industries')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Industries
            </button>
            <button
              onClick={() => scrollTo('#safety')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Safety
            </button>
          </div>

          {/* Right: Legal & Contact Links */}
          <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-6 text-xs sm:text-sm">
            <button
              onClick={onPrivacyClick}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={onTermsClick}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={onContactClick}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 font-mono">
          <div>
            Pure gases. Precise solutions.
          </div>
          <div className="mt-2 sm:mt-0 tracking-wider">
            HIGH-PURITY O₂ & CO₂ CRYOGENIC LOGISTICS
          </div>
        </div>
      </div>
    </footer>
  );
};
