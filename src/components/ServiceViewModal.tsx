import React from 'react';
import { X, CheckCircle2, ArrowRight, Clock, Shield, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';

export interface ServiceDetailItem {
  id: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  deliverables: string[];
  timeline: string;
  benefits: string[];
  serviceName: string;
}

interface ServiceViewModalProps {
  service: ServiceDetailItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (serviceName: string) => void;
}

export const ServiceViewModal: React.FC<ServiceViewModalProps> = ({
  service,
  isOpen,
  onClose,
  onEnquire
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0B0E17] border border-[#E5B54F]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(229,181,79,0.18)] z-10 my-8 overflow-hidden text-left">
        {/* Glow corner */}
        <div className="ambient-glow w-64 h-64 -top-12 -right-12 bg-amber-500/15 pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E5B54F]/15 text-[#E5B54F] border border-[#E5B54F]/30">
                {service.category}
              </span>
              {service.badge && (
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-black">
                  {service.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
              {service.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Timeline & Assurance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
            <Clock className="w-5 h-5 text-[#E5B54F] shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Turnaround / Processing
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white">
                {service.timeline}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
            <Shield className="w-5 h-5 text-[#E5B54F] shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Execution Guarantee
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white">
                Verified Deliverables & Support
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables / What's Included */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#E5B54F] mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What's Included & Deliverables</span>
          </div>
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/[0.02] p-2.5 rounded-lg border border-white/5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E5B54F] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <div className="mb-8">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Advantages
            </div>
            <div className="flex flex-wrap gap-2">
              {service.benefits.map((b, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-amber-200/90"
                >
                  • {b}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onClose();
              onEnquire(service.serviceName);
            }}
            className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#E5B54F] hover:bg-[#d8a63e] text-black font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <span>Request Details & Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/918688450435"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
