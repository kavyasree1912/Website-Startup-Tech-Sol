import React from 'react';
import { useRouter } from '../context/RouterContext.js';
import {
  Sparkles,
  Shield,
  Target,
  Users,
  Compass,
  Award,
  ArrowRight,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

interface AboutPageProps {
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  const { navigate } = useRouter();

  const leadershipTeam = [
    {
      name: 'Shaik Mohammad Faheem Jalal',
      role: 'Managing Director — Expert in GMB Setup & Operations',
      image: '/team-faheem.png',
      bio: 'Leads operational strategy and local enterprise discovery, specializing in Google My Business authority rankings, enterprise client relations, and operational scaling.'
    }
  ];

  const values = [
    {
      icon: Award,
      title: 'Engineering Excellence',
      description: 'We adhere to strict architectural standards, rigorous code reviews, and sub-second performance benchmarks.'
    },
    {
      icon: Shield,
      title: 'Radical Integrity & Transparency',
      description: 'Zero hidden clauses, clear milestone deliverables, and complete ownership of your codebase and intellectual property.'
    },
    {
      icon: Target,
      title: 'Measurable Business ROI',
      description: 'We build technology that moves real metrics: reducing operating expenses, multiplying conversions, and automating bottlenecks.'
    },
    {
      icon: Users,
      title: 'Long-Term Partnership',
      description: 'Beyond initial launch, we support our clients as their dedicated technical wing with proactive upgrades and SLA support.'
    }
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-24 border-b border-white/5 overflow-hidden">
        <div className="ambient-glow w-[500px] h-[500px] -top-20 left-1/2 -translate-x-1/2 bg-amber-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 mb-6">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Our Heritage & Vision</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-6">
            Empowering Modern Ventures <br />
            <span className="text-gold-gradient">Through World-Class Technology</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Headquartered in Proddatur, Kadapa District, Andhra Pradesh, India, Startup Tech Solutions
            was established to bridge the gap between ambitious visionary concepts and enterprise-grade software execution.
          </p>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-400/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Founder Image */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 shadow-2xl shadow-amber-500/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-black border-4 border-[#070A10]">
                  <img
                    src="/founder-real.png"
                    alt="Syed Abdul Azeez - Founder & CEO"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-xl font-heading font-bold text-white">Syed Abdul Azeez</h3>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-0.5">
                  Founder & Chief Executive Officer
                </p>
              </div>
            </div>

            {/* Founder Vision Message */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Founder's Perspective
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                "We don't merely write code — we build the engines that propel businesses to scale."
              </h2>
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>
                  "When we started Startup Tech Solutions, we observed countless founders struggling
                  with fragmented agencies that delivered fragile code and disappeared right after deployment.
                  We set out to build something fundamentally different: an elite engineering collective
                  grounded in discipline, speed, and genuine business accountability."
                </p>
                <p>
                  "Whether assisting a local enterprise in automating operations through a custom ERP
                  or helping an Indian startup incorporate in Delaware to access global venture capital,
                  our commitment remains unwavering: world-class execution, absolute honesty, and
                  measurable return on investment."
                </p>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={onOpenEnquiry}
                  className="px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Schedule A Founder Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Engineering Team */}
      <section className="py-16 bg-[#07090F] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
              Our Leadership Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Experienced Minds Behind Your Technology
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Meet our managing leadership guiding operational strategy, digital governance, and technical delivery.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {leadershipTeam.map((member, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-400/20 hover:border-amber-400/40 transition-colors flex flex-col sm:flex-row items-center sm:items-start gap-6"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0 flex items-center justify-center shadow-lg shadow-amber-500/10">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <span className="font-heading font-bold text-2xl text-amber-400">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  )}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-white text-lg sm:text-xl">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-400 font-semibold mt-0.5">
                        {member.role}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium self-center sm:self-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Executive Leadership
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                    {member.bio}
                  </p>
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span>Headquarters: Proddatur, AP, India</span>
                    <span className="text-amber-400/80 font-medium">Startup Tech Solutions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
            Guiding Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            How We Build & Collaborate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
