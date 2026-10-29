import React from 'react';
import { useRouter } from '../context/RouterContext.js';
import { ShieldCheck, ChevronLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="pt-28 pb-20">
      <section className="py-12 border-b border-white/5 bg-[#07090F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-4 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-400 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: January 2026 · Startup Tech Solutions
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 text-sm text-slate-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">1. Overview</h2>
            <p>
              Startup Tech Solutions ("STS", "we", "us", or "our"), headquartered in Proddatur, Kadapa District, Andhra Pradesh, India, is dedicated to protecting the privacy of our website visitors, clients, and prospective partners. This Privacy Policy details how we collect, handle, store, and safeguard your personal and enterprise information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">2. Information We Collect</h2>
            <p className="mb-2">We collect information provided directly by you when interacting with our digital touchpoints:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Contact and Inquiry Data:</strong> Full name, corporate email address, telephone/WhatsApp number, requested service category, and project scope summaries.</li>
              <li><strong>Job Application Records:</strong> Candidate names, contact details, resume notes, LinkedIn profile links, and portfolio repository URLs.</li>
              <li><strong>Newsletter Subscriptions:</strong> Verified email addresses provided willingly for technology dispatches.</li>
              <li><strong>Technical Metadata:</strong> Standard non-identifying server telemetry including browser user-agent, operating system, and request timestamps to prevent malicious DDoS attacks.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">3. How We Utilize Your Data</h2>
            <p>
              We utilize collected data solely to deliver professional software consulting services, prepare technical blueprints and milestone estimates, review employment applications, and communicate project updates. We never sell, rent, or lease your private personal data or confidential project disclosures to third-party data brokers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">4. Client Confidentiality & Non-Disclosure</h2>
            <p>
              We understand that startup founders and enterprises share sensitive proprietary algorithms, database schemes, and commercial plans. Startup Tech Solutions provides standard mutual Non-Disclosure Agreements (NDAs) prior to formal discovery sessions to guarantee absolute intellectual property confidentiality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">5. Data Security Protocols</h2>
            <p>
              All customer transmissions are protected by 256-bit Transport Layer Security (TLS) encryption. Our internal database stores all passwords with bcrypt salted hashes and strictly enforces role-based access controls (RBAC) to ensure unauthorized personnel cannot inspect client submissions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">6. Contact Our Data Controller</h2>
            <p>
              For inquiries regarding data rectification, deletion, or privacy standards, please contact our legal team at:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
              <p className="font-semibold text-white">Startup Tech Solutions</p>
              <p>Email: startuptechsolutions.in@gmail.com</p>
              <p>Phone: +91 8688450435</p>
              <p>Location: Proddatur, Kadapa Dist, Andhra Pradesh, India — 516360</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
