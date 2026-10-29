import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { api } from '../services/api.js';
import { Service } from '../types.js';
import {
  ChevronLeft,
  CheckCircle2,
  Send,
  Sparkles,
  Layers,
  ArrowRight,
  Shield,
  Clock,
  PhoneCall,
  AlertCircle
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { pageParam: slug, navigate } = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Embedded enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '$1,000 - $3,000 (INR 80K - 2.5L)',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    async function loadService() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getServiceBySlug(slug);
        setService(data);
      } catch (err: any) {
        setError(err.message || 'Service not found');
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [slug]);

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    setSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await api.submitEnquiry({
        type: 'service',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: service.title,
        budget: formData.budget,
        message: formData.message
      });
      setSubmitResult({ success: true, message: res.message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        budget: '$1,000 - $3,000 (INR 80K - 2.5L)',
        message: ''
      });
    } catch (err: any) {
      setSubmitResult({ success: false, message: err.message || 'Failed to submit enquiry' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 pb-32 text-center max-w-7xl mx-auto px-4">
        <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-400">Loading service specifications...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="pt-40 pb-32 text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Service Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">
          The requested service could not be located or may have been updated.
        </p>
        <button
          onClick={() => navigate('services')}
          className="px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-semibold text-xs uppercase tracking-wider"
        >
          Return to All Services
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      {/* Breadcrumbs & Header */}
      <section className="py-12 border-b border-white/5 bg-[#07090F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('services')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-6 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </button>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Startup Tech Solutions · Technical Specifications</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
              {service.title}
            </h1>
            {service.tagline && (
              <p className="text-base sm:text-lg text-amber-300 font-medium">
                {service.tagline}
              </p>
            )}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-7 space-y-10">
            {/* Architectural Overview */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Architecture & Engineering Approach</span>
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {service.detailed_content}
              </div>
            </div>

            {/* Feature Matrix */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-lg font-heading font-bold text-white">
                Technical Capabilities & Core Modules
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-lg font-heading font-bold text-white">
                Guaranteed Handover Deliverables
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {service.deliverables.map((deliv, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Quick Inquiry Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-amber-400/30 sticky top-28 shadow-2xl">
              <h3 className="text-xl font-heading font-bold text-white mb-1">
                Consult for {service.title}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Receive a customized technical roadmap, milestone estimates, and pricing within 24 hours.
              </p>

              {submitResult?.success ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-base">Enquiry Logged</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {submitResult.message}
                  </p>
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="text-xs text-amber-400 font-semibold hover:underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                  {submitResult && !submitResult.success && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                      {submitResult.message}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 8688450435"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Budget Target
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#111624] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Under $1,000 (Under INR 80K)">Under $1,000 (Under INR 80K)</option>
                      <option value="$1,000 - $3,000 (INR 80K - 2.5L)">$1,000 - $3,000 (INR 80K - 2.5L)</option>
                      <option value="$3,000 - $8,000 (INR 2.5L - 6.5L)">$3,000 - $8,000 (INR 2.5L - 6.5L)</option>
                      <option value="$8,000+ (INR 6.5L+ Enterprise)">$8,000+ (INR 6.5L+ Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Project Notes *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Outline your immediate goals or challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Submitting...' : 'Request Project Blueprint'}</span>
                  </button>
                </form>
              )}

              <div className="pt-6 mt-6 border-t border-white/10 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Strict NDA protection upon request</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Guaranteed response within 24 hours</span>
                </div>
                <a
                  href="tel:+918688450435"
                  className="flex items-center gap-2 text-amber-400 hover:underline pt-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Direct phone line: +91 8688450435</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
