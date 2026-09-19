import React, { useState } from 'react';
import { X, CheckCircle, Send, PhoneCall, Mail, MapPin } from 'lucide-react';
import { PLACEHOLDERS } from '../data/mockData';
import { GasProduct } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: GasProduct | null;
  mode?: 'quote' | 'contact' | 'phone' | 'privacy' | 'terms';
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
  mode = 'quote',
}) => {
  const [gasType, setGasType] = useState<string>(
    preselectedProduct?.name || 'Medical Oxygen'
  );
  const [supplyMode, setSupplyMode] = useState<string>('High-Pressure Cylinders');
  const [industry, setIndustry] = useState<string>('Healthcare');
  const [fullName, setFullName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl liquid-glass-card border border-white/20 bg-neutral-950 p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-6 right-6 w-9 h-9 rounded-full liquid-glass border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              Supply Requisition Received
            </h3>
            <p className="text-sm text-white/70 max-w-md mb-6 leading-relaxed">
              Your inquiry for <span className="text-white font-semibold">{gasType}</span> ({supplyMode}) has been registered with our cryogenic engineering desk.
            </p>
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white/50 mb-8 max-w-sm w-full text-left space-y-1.5">
              <div>DISPATCH REF: OXY-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div>TELEMETRY QUEUE: PRIORITY VALIDATION</div>
              <div>SUPPORT CONTACT: {PLACEHOLDERS.phone}</div>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Done
            </button>
          </div>
        ) : mode === 'phone' ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full liquid-glass border border-white/20 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Direct Gas Supply Desk
                </h3>
                <p className="text-xs font-mono text-white/50 uppercase tracking-wider">
                  24/7 Priority Logistics Dispatch
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl liquid-glass border border-white/15">
                <div className="text-xs font-mono text-white/40 uppercase mb-1">
                  Direct Telephone Dispatch
                </div>
                <div className="text-lg font-mono font-semibold text-white">
                  {PLACEHOLDERS.phone}
                </div>
                <div className="text-xs text-white/50 mt-1">
                  Continuous support for hospital manifolds and critical industrial lines.
                </div>
              </div>

              <div className="p-4 rounded-xl liquid-glass border border-white/15">
                <div className="text-xs font-mono text-white/40 uppercase mb-1">
                  Electronic Inquiries
                </div>
                <div className="text-sm font-mono font-medium text-white">
                  {PLACEHOLDERS.email}
                </div>
              </div>

              <div className="p-4 rounded-xl liquid-glass border border-white/15">
                <div className="text-xs font-mono text-white/40 uppercase mb-1">
                  Main Facility & Terminal
                </div>
                <div className="text-sm text-white/70">
                  {PLACEHOLDERS.facilityAddress}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : mode === 'privacy' ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-1">
                LEGAL COMPLIANCE // PRIVACY DIRECTIVE
              </span>
              <h3 className="text-2xl font-bold text-white">
                Industrial Privacy Policy
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Effective date: January 1, 2026 • OxyCarbon Industries Regulatory Affairs
              </p>
            </div>

            <div className="space-y-4 text-xs text-white/70 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
              <p>
                OxyCarbon Industries adheres strictly to non-disclosure protocols and technical data isolation for all industrial, medical, and specialized gas inquiries. Technical telemetry, consumption volumes, facility addresses, and gas specifications transmitted through our systems are encrypted.
              </p>
              <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-white/60">
                PROTOCOL ID: PRIV-OXY-2026 // ZERO UNENCRYPTED TELEMETRY
              </div>
              <p>
                We do not sell, license, or share partner consumption patterns or gas mixture recipes with third-party advertising networks.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        ) : mode === 'terms' ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-1">
                SUPPLY CONTRACT SPECIFICATION // TERMS
              </span>
              <h3 className="text-2xl font-bold text-white">
                Terms of Supply & Cylinder Safety
              </h3>
              <p className="text-xs text-white/60 mt-1">
                OxyCarbon Industries Standard Operating Specifications
              </p>
            </div>

            <div className="space-y-4 text-xs text-white/70 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
              <p>
                1. <strong>Cylinder Demurrage & Safety:</strong> All compressed gas cylinders remain the technical property of OxyCarbon Industries unless explicitly purchased under designated capital equipment agreements. Cylinders must be stored upright, chained, and protected from heat sources.
              </p>
              <p>
                2. <strong>Purity Guarantee:</strong> Purity tolerances are certified at the filling manifold valve according to analytical gas chromatography certificates provided per batch.
              </p>
              <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-white/60">
                SAFETY COVENANT: {PLACEHOLDERS.certification} ENFORCED
              </div>
              <p>
                3. <strong>Emergency Telemetry:</strong> Bulk cryogenic vessels equipped with cellular telemetry notify dispatch upon reaching safety buffer thresholds.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-1">
                OXYCARBON LOGISTICS // SPECIFICATION REQUISITION
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {mode === 'quote' ? 'Request a Gas Supply Quote' : 'Contact Our Technical Team'}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Provide your requirements for customized purity grades, volume telemetry, and delivery schedules.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Gas Product */}
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-1.5">
                    Gas Product
                  </label>
                  <select
                    value={gasType}
                    onChange={(e) => setGasType(e.target.value)}
                    className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white/50"
                  >
                    <option value="Medical Oxygen">Medical Oxygen (O₂ - 99.5%+)</option>
                    <option value="Industrial Oxygen">Industrial Oxygen (O₂ - 99.9%)</option>
                    <option value="Carbon Dioxide">Carbon Dioxide (CO₂ - 99.99%)</option>
                    <option value="Bulk Liquid Gas">Bulk Liquid Gas Supply</option>
                    <option value="Specialty Mixture">Custom Analytical Mixture</option>
                  </select>
                </div>

                {/* Supply Mode */}
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-1.5">
                    Supply Mode
                  </label>
                  <select
                    value={supplyMode}
                    onChange={(e) => setSupplyMode(e.target.value)}
                    className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white/50"
                  >
                    <option value="High-Pressure Cylinders">High-Pressure Cylinders (50L / 200 bar)</option>
                    <option value="Cylinder Bundles">Cylinder Bundles (12/16 Pack 300 bar)</option>
                    <option value="MicroBulk Vessel">MicroBulk Cryogenic Tank</option>
                    <option value="Bulk Tanker Supply">Bulk Tanker Road Logistics</option>
                    <option value="On-Site Manifold System">Turnkey Manifold & Pipeline</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Industry */}
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-1.5">
                    Industry Sector
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white/50"
                  >
                    <option value="Healthcare">Healthcare & Hospitals</option>
                    <option value="Food & Beverage">Food & Beverage Processing</option>
                    <option value="Metal Fabrication">Manufacturing & Metal Fabrication</option>
                    <option value="Laboratory">Laboratory & Scientific Research</option>
                    <option value="Other">Other Industrial Application</option>
                  </select>
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-1.5">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Company or Facility"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Contact Name */}
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-1.5">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-1.5">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-black/80 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50"
                  />
                </div>
              </div>

              {/* Requirement Notes */}
              <div>
                <label className="block text-xs font-mono text-white/60 uppercase mb-1.5">
                  Supply Volume or Technical Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="Estimated monthly volume (Nm³), delivery frequency, or required purity parameters..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-black/80 border border-white/20 rounded-xl p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 resize-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Technical Request</span>
                </button>
              </div>

              <p className="text-[10px] font-mono text-white/30 text-center pt-1">
                Data treated with industrial confidentiality. Direct response within 4 hours.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
