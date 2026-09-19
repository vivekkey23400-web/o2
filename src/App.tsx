/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IndustryIntro } from './components/IndustryIntro';
import { CoreGases } from './components/CoreGases';
import { Industries } from './components/Industries';
import { QualityControl } from './components/QualityControl';
import { CapabilitiesStats } from './components/CapabilitiesStats';
import { FacilitySection } from './components/FacilitySection';
import { SafetySection } from './components/SafetySection';
import { WhyOxyCarbon } from './components/WhyOxyCarbon';
import { ContactCta } from './components/ContactCta';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CinematicFacility3D } from './components/CinematicFacility3D';
import { GasProduct } from './types';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteMode, setQuoteMode] = useState<'quote' | 'contact' | 'phone' | 'privacy' | 'terms'>('quote');
  const [selectedProduct, setSelectedProduct] = useState<GasProduct | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenQuote = (product?: GasProduct) => {
    if (product) setSelectedProduct(product);
    setQuoteMode('quote');
    setIsQuoteOpen(true);
  };

  const handleOpenContact = () => {
    setQuoteMode('contact');
    setIsQuoteOpen(true);
  };

  const handleOpenPhone = () => {
    setQuoteMode('phone');
    setIsQuoteOpen(true);
  };

  const handleOpenPrivacy = () => {
    setQuoteMode('privacy');
    setIsQuoteOpen(true);
  };

  const handleOpenTerms = () => {
    setQuoteMode('terms');
    setIsQuoteOpen(true);
  };

  const handleSelectProduct = (product: GasProduct) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const scrollToSolutions = () => {
    const el = document.querySelector('#solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      {/* Cinematic 3D Industrial Background: Massive Cryogenic Facility with volumetric lighting & gas flow */}
      <CinematicFacility3D />

      {/* 1. Transparent Fixed Navbar */}
      <Navbar
        onOpenContactModal={handleOpenContact}
        onOpenPhoneModal={handleOpenPhone}
      />

      <main className="relative">
        {/* 2. Full-Screen Cinematic Hero Section */}
        <Hero
          onExploreClick={scrollToSolutions}
          onContactClick={handleOpenContact}
        />

        {/* 3. Industry Introduction (Editorial 2-Column) */}
        <IndustryIntro />

        {/* 4. Our Core Gases (3-Column Product Section with Liquid-Glass Cards) */}
        <CoreGases onSelectProduct={handleSelectProduct} />

        {/* 5. Applications / Industries (4-Column Grid) */}
        <Industries />

        {/* 6. Purity & Quality Section (Visual Lab + Sequential Stages) */}
        <QualityControl />

        {/* 7. Numbers / Capabilities (Minimal Black Section with Animated Counters) */}
        <CapabilitiesStats />

        {/* 8. Technology / Facility Section (Cinematic Full-Width Video + 3 Floating Parallax Cards) */}
        <FacilitySection />

        {/* 9. Safety Section (4 Cards: Handling, Storage, Transportation, Compliance) */}
        <SafetySection />

        {/* 10. Why OxyCarbon (4 Columns: Consistency, Precision, Reliability, Partnership) */}
        <WhyOxyCarbon />

        {/* 11. Contact / Request a Quote (Dark Facility CTA + Centered Logo) */}
        <ContactCta
          onRequestQuote={() => handleOpenQuote()}
          onContactUs={handleOpenContact}
        />
      </main>

      {/* 12. Minimalist Footer */}
      <Footer
        onSelectProduct={(name) => scrollToSolutions()}
        onContactClick={handleOpenContact}
        onPrivacyClick={handleOpenPrivacy}
        onTermsClick={handleOpenTerms}
      />

      {/* Interactive Requisition / Contact Dialog */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedProduct={selectedProduct}
        mode={quoteMode}
      />

      {/* Detailed Technical Specification Sheet Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onRequestQuote={(product) => handleOpenQuote(product)}
      />
    </div>
  );
}
