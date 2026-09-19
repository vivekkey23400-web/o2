import React, { useState, useEffect } from 'react';
import { Linkedin, Instagram, Phone, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContactModal?: () => void;
  onOpenPhoneModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal, onOpenPhoneModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Industries', href: '#industries' },
    { label: 'Safety', href: '#safety' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-28 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Left Side: Concentric Circle Logo + Brand Name */}
        <a
          href="#home"
          id="navbar-brand-logo"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          {/* Concentric-circle logo icon */}
          <div className="relative flex items-center justify-center w-7 h-7 border-2 border-foreground/60 rounded-full group-hover:border-foreground transition-colors duration-300">
            <div className="w-3 h-3 border border-foreground/60 rounded-full group-hover:border-foreground transition-colors duration-300" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase font-sans">
            OxyCarbon
          </span>
        </a>

        {/* Center: Desktop Navigation with subtle dots */}
        <nav className="hidden lg:flex items-center space-x-3 text-sm font-medium tracking-wide">
          {navLinks.map((item, idx) => (
            <React.Fragment key={item.label}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-white/70 hover:text-white transition-colors duration-200 py-1 px-1.5 focus:outline-none focus:text-white"
              >
                {item.label}
              </a>
              {idx < navLinks.length - 1 && (
                <span className="text-white/30 text-xs select-none pointer-events-none">
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Right side: Three liquid-glass circular buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn - OxyCarbon Industries"
            id="nav-btn-linkedin"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center border border-white/10 hover:border-white/30 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-200"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram - OxyCarbon Industries"
            id="nav-btn-instagram"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center border border-white/10 hover:border-white/30 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-200"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Phone */}
          <button
            onClick={onOpenPhoneModal}
            title="Call OxyCarbon Supply Desk"
            id="nav-btn-phone"
            aria-label="Phone"
            className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center border border-white/10 hover:border-white/30 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenPhoneModal}
            aria-label="Call Supply Desk"
            className="sm:hidden w-9 h-9 rounded-full liquid-glass flex items-center justify-center border border-white/10 text-white/80"
          >
            <Phone className="w-3.5 h-3.5" />
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 pb-6 px-6 rounded-2xl bg-black/95 border border-white/15 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-lg font-medium text-white/80 hover:text-white transition-colors py-1 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/40 tracking-wider uppercase font-mono">
              OxyCarbon Industrial
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center border border-white/10 text-white/80"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center border border-white/10 text-white/80"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenPhoneModal) onOpenPhoneModal();
                }}
                aria-label="Phone"
                className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center border border-white/10 text-white/80"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
