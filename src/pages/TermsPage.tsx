import React from 'react';
import { useRouter } from '../context/RouterContext.js';
import { FileText, ChevronLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Effective Date: January 2026 · Startup Tech Solutions
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 text-sm text-slate-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing the website https://startuptechsolutions.in/ or engaging Startup Tech Solutions for professional software engineering, business formation, ERP development, or consulting, you agree to be bound by these Terms and Conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">2. Scope of Services</h2>
            <p>
              Startup Tech Solutions provides custom software engineering, mobile development, ERP architecture, cloud infrastructure, artificial intelligence integration, US LLC incorporation consulting, and digital marketing services. Specific project terms, milestones, and deliverables are governed by individual Statement of Work (SOW) agreements executed between the client and Startup Tech Solutions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">3. Intellectual Property Ownership</h2>
            <p>
              Upon receipt of final milestone payments under an active contract, all bespoke source code, database architectures, graphics, and custom documentation authored specifically for the client transfer in full to the client. Startup Tech Solutions retains rights to its pre-existing open-source libraries, general utility modules, and reusable frameworks.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">4. Warranties & Post-Launch Support</h2>
            <p>
              Every production deployment delivered by Startup Tech Solutions includes a standard 30-day post-launch warranty period covering bug rectification and critical security patches at no additional cost. Ongoing service level agreements (SLAs) and feature expansion retainers are available upon request.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-heading font-bold text-white mb-2">5. Governing Law & Jurisdiction</h2>
            <p>
              These Terms and any project engagements are governed by and construed in accordance with the laws of India, subject to the jurisdiction of the courts of Kadapa District, Andhra Pradesh.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
