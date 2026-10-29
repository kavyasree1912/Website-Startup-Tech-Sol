import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { api } from '../services/api.js';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await api.subscribeNewsletter(email);
      setMessage({ text: res.message, isError: false });
      setEmail('');
    } catch (err: any) {
      setMessage({ text: err.message || 'Subscription failed', isError: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[#030407] text-slate-400 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="ambient-glow w-[500px] h-[500px] -bottom-40 left-1/4 bg-amber-500/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand & Genuine Identity */}
          <div className="lg:col-span-4 space-y-5">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent p-1 border border-amber-400/30 flex items-center justify-center overflow-hidden">
                <img
                  src="/sts-logo-original.png"
                  alt="Startup Tech Solutions Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-white tracking-tight">
                  Startup Tech Solutions
                </span>
                <p className="text-[11px] text-amber-400/90 font-medium">
                  Transforming Ideas Into Digital Success
                </p>
              </div>
            </button>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Premium technology solutions for startups, enterprises, and businesses that demand
              excellence. We build luxury websites, mobile apps, ERP systems, AI solutions, and
              digital platforms that help businesses scale faster.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs uppercase font-semibold tracking-wider text-slate-300 mb-2">
                Subscribe to Tech Insights
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-gold-gradient text-slate-950 hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-1 cursor-pointer"
                  >
                    <span>{submitting ? '...' : 'Join'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {message && (
                  <p
                    className={`text-xs flex items-center gap-1.5 ${
                      message.isError ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {message.isError ? (
                      <AlertCircle className="w-3.5 h-3.5" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    <span>{message.text}</span>
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('service-detail', 'web-development')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Full-Stack Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('service-detail', 'mobile-apps')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Mobile App Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('service-detail', 'erp-systems')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Custom ERP & Software
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('service-detail', 'ai-solutions')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  AI Solutions & Chatbots
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('service-detail', 'e-commerce')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  E-Commerce Platforms
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('service-detail', 'llc-creation')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  US LLC & Business Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('projects')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Portfolio Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('careers')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span>Careers</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-400 font-semibold">
                    We're Hiring
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('blog')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Tech Blog & Insights
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('admin-login')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 pt-1"
                >
                  <Shield className="w-3 h-3" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Genuine Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Headquarters & Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:startuptechsolutions.in@gmail.com"
                className="flex items-start gap-2.5 hover:text-amber-400 transition-colors group"
              >
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="break-all group-hover:underline">startuptechsolutions.in@gmail.com</span>
              </a>

              <a
                href="tel:+918688450435"
                className="flex items-start gap-2.5 hover:text-amber-400 transition-colors group"
              >
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>+91 8688450435</span>
              </a>

              <a
                href="https://wa.me/+918688450435"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp: +91 8688450435</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-start gap-2.5 pt-1 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Proddatur, Kadapa Dist, Andhra Pradesh, India — 516360</span>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Startup Tech Solutions. All rights reserved. Registered in Andhra Pradesh, India.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('privacy-policy')}
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('terms')}
              className="hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
