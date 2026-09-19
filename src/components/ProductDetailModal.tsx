import React from 'react';
import { X, ArrowRight, CheckCircle2, ShieldCheck, Gauge } from 'lucide-react';
import { GasProduct } from '../types';

interface ProductDetailModalProps {
  product: GasProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (product: GasProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onRequestQuote,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl liquid-glass-card border border-white/20 bg-neutral-950 p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-6 right-6 w-9 h-9 rounded-full liquid-glass border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl liquid-glass border border-white/20 flex items-center justify-center font-mono text-sm font-semibold text-white">
            {product.formula}
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
              TECHNICAL SPECIFICATION SHEET
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {product.name}
            </h3>
          </div>
        </div>

        <p className="text-sm text-white/70 leading-relaxed my-4">
          {product.description}
        </p>

        {/* Purity & Quality Grade Badge */}
        <div className="p-4 rounded-xl liquid-glass border border-white/15 my-6 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase">
              Purity Grade Capability
            </div>
            <div className="text-base sm:text-lg font-mono font-bold text-white">
              {product.purityGrade}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>ANALYZED</span>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="mb-6">
          <div className="text-xs font-mono tracking-wider text-white/50 uppercase mb-3 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            <span>Physical & Supply Specifications</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.specs.map((s) => (
              <div
                key={s.label}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/10"
              >
                <div className="text-[10px] font-mono text-white/40 uppercase">
                  {s.label}
                </div>
                <div className="text-xs font-mono font-medium text-white/90 mt-0.5">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Applications */}
        <div className="mb-8">
          <div className="text-xs font-mono tracking-wider text-white/50 uppercase mb-3">
            Key Application Domains
          </div>
          <div className="grid grid-cols-2 gap-2">
            {product.applications.map((app) => (
              <div key={app} className="flex items-center gap-2 text-xs text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                <span>{app}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onClose();
              onRequestQuote(product);
            }}
            className="flex-1 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
          >
            <span>Request Supply Requisition</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3.5 rounded-xl liquid-glass border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
