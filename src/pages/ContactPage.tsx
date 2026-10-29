import React, { useState } from 'react';
import { api } from '../services/api.js';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Shield,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Full-Stack Web Development',
    budget: '$1,000 - $3,000 (INR 80K - 2.5L)',
    timeline: 'Within 1-2 months',
    message: '',
    honeypot: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await api.submitEnquiry({
        type: 'contact',
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
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-16 sm:py-20 border-b border-white/5 relative overflow-hidden text-center">
        <div className="ambient-glow w-[500px] h-[500px] -top-24 left-1/2 -translate-x-1/2 bg-amber-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Communication · Guaranteed 24-Hour Response</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-6">
            Let's Discuss Your Next <br />
            <span className="text-gold-gradient">Digital Milestone</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Reach out to our leadership and engineering team directly for custom quotes,
            technical feasibility consultations, or enterprise support.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Genuine Company Contact Information & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-xl font-heading font-bold text-white">
                Contact Information
              </h2>

              <div className="space-y-4 text-sm">
                <a
                  href="mailto:startuptechsolutions.in@gmail.com"
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/40 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Email Address</div>
                    <div className="text-white font-semibold group-hover:text-amber-300 transition-colors">
                      startuptechsolutions.in@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+918688450435"
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/40 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Direct Telephone</div>
                    <div className="text-white font-semibold group-hover:text-amber-300 transition-colors">
                      +91 8688450435
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/+918688450435?text=Hello%20Startup%20Tech%20Solutions,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/50 transition-colors group"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-emerald-300 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Instant WhatsApp Chat</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <div className="text-white font-semibold group-hover:text-emerald-300 transition-colors">
                      +91 8688450435
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Registered Headquarters</div>
                    <div className="text-white font-semibold">
                      Main Road, Proddatur
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Kadapa District, Andhra Pradesh, India — 516360
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Operating Hours</div>
                    <div className="text-xs text-slate-300 mt-1 space-y-0.5">
                      <p>Monday – Friday: 9:00 AM – 6:00 PM IST</p>
                      <p>Saturday: 10:00 AM – 4:00 PM IST</p>
                      <p className="text-slate-500">Sunday: Closed (Emergency Support Active)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location card visual */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Serving Clients Locally & Worldwide</span>
              </div>
              <p className="leading-relaxed">
                Whether you're visiting our Proddatur office in Andhra Pradesh or collaborating remotely
                from North America, Europe, or the UAE, we coordinate seamlessly across your preferred communication channels.
              </p>
            </div>
          </div>

          {/* Right Column: Full-Stack Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-amber-400/30 shadow-2xl">
              <h2 className="text-2xl font-heading font-bold text-white mb-2">
                Send Us a Direct Message
              </h2>
              <p className="text-xs text-slate-400 mb-8">
                Fill out the form below. All inquiries are saved to our secure database and reviewed by our core architecture team.
              </p>

              {status?.success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white">
                    Message Successfully Sent!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {status.message}
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-semibold text-xs uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field */}
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
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
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
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Area of Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#111624] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="ERP & Custom Enterprise Systems">ERP & Custom Enterprise Systems</option>
                        <option value="AI Solutions & Machine Learning">AI Solutions & Machine Learning</option>
                        <option value="E-Commerce Platforms">E-Commerce Platforms</option>
                        <option value="LLC Creation & Business Compliance">LLC Creation & Business Compliance</option>
                        <option value="Digital Marketing & Performance Ads">Digital Marketing & Performance Ads</option>
                        <option value="General Technical Partnership">General Technical Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#111624] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Under $1,000 (Under INR 80K)">Under $1,000 (Under INR 80K)</option>
                        <option value="$1,000 - $3,000 (INR 80K - 2.5L)">$1,000 - $3,000 (INR 80K - 2.5L)</option>
                        <option value="$3,000 - $8,000 (INR 2.5L - 6.5L)">$3,000 - $8,000 (INR 2.5L - 6.5L)</option>
                        <option value="$8,000+ (INR 6.5L+ Enterprise)">$8,000+ (INR 6.5L+ Enterprise)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Estimated Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-[#111624] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
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
                      Your Message / Technical Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share details regarding your current bottlenecks, desired timeline, or scope of work..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Encrypted data transmission</span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{loading ? 'Submitting...' : 'Send Direct Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
