import React, { useState } from 'react';
import { api } from '../services/api.js';
import { X, CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, defaultService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || 'Full-Stack Web Development',
    budget: '$1,000 - $3,000 (INR 80K - 2.5L)',
    timeline: 'Within 1-2 months',
    message: '',
    honeypot: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await api.submitEnquiry({
        type: 'project',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        honeypot: formData.honeypot
      });
      setStatus({ success: true, message: res.message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Full-Stack Web Development',
        budget: '$1,000 - $3,000 (INR 80K - 2.5L)',
        timeline: 'Within 1-2 months',
        message: '',
        honeypot: ''
      });
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-amber-400/25 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Launch Your Project With Us
            </h3>
            <p className="text-xs text-slate-400">
              Direct consultation with our engineering and architecture team. We respond within 24 hours.
            </p>
          </div>
        </div>

        {status?.success ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Enquiry Received!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {status.message}
            </p>
            <button
              onClick={() => {
                setStatus(null);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot anti-spam field */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {status && !status.success && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{status.message}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Service Needed *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#111624] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                >
                  <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="ERP & Custom Enterprise Systems">ERP & Custom Enterprise Systems</option>
                  <option value="AI Solutions & Machine Learning">AI Solutions & Machine Learning</option>
                  <option value="E-Commerce Platforms">E-Commerce Platforms</option>
                  <option value="LLC Creation & Business Compliance">LLC Creation & Business Compliance</option>
                  <option value="Digital Marketing & Performance Ads">Digital Marketing & Performance Ads</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-[#111624] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                >
                  <option value="Under $1,000 (Under INR 80K)">Under $1,000 (Under INR 80K)</option>
                  <option value="$1,000 - $3,000 (INR 80K - 2.5L)">$1,000 - $3,000 (INR 80K - 2.5L)</option>
                  <option value="$3,000 - $8,000 (INR 2.5L - 6.5L)">$3,000 - $8,000 (INR 2.5L - 6.5L)</option>
                  <option value="$8,000+ (INR 6.5L+ Enterprise)">$8,000+ (INR 6.5L+ Enterprise)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Expected Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full bg-[#111624] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                >
                  <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
                  <option value="Within 1-2 months">Within 1-2 months</option>
                  <option value="2-4 months">2-4 months</option>
                  <option value="Flexible / Long-term">Flexible / Long-term</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Brief Project Description *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tell us about your project objectives, target audience, or current tech stack..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting...' : 'Send Enquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
