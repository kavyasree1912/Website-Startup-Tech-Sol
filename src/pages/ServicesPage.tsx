import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { api } from '../services/api.js';
import { Service } from '../types.js';
import {
  Code2,
  Smartphone,
  Database,
  Cpu,
  ShoppingBag,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface ServicesPageProps {
  onOpenEnquiry: (defaultService?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenEnquiry }) => {
  const { navigate } = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Code2 className="w-7 h-7 text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-7 h-7 text-amber-400" />;
      case 'Database': return <Database className="w-7 h-7 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-7 h-7 text-amber-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-7 h-7 text-amber-400" />;
      case 'Building2': return <Building2 className="w-7 h-7 text-amber-400" />;
      default: return <Layers className="w-7 h-7 text-amber-400" />;
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-16 sm:py-20 border-b border-white/5 relative overflow-hidden">
        <div className="ambient-glow w-[500px] h-[500px] -top-24 left-1/3 bg-amber-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Enterprise Engineering & Scalability</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-6">
            Technology Solutions Designed for <br />
            <span className="text-gold-gradient">Sustainable Business Growth</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Every solution we engineer is constructed on modern architecture, rigorous security principles,
            and optimized for long-term scalability.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel h-80 rounded-2xl animate-pulse bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {services.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.slug}
                  className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all duration-300"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content Column */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                          {getServiceIcon(service.icon_name)}
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                            Service 0{index + 1}
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      {service.tagline && (
                        <p className="text-sm font-semibold text-slate-200">
                          {service.tagline}
                        </p>
                      )}

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="pt-2">
                        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                          Key Capabilities & Deliverables
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => navigate('service-detail', service.slug)}
                          className="px-5 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                        >
                          <span>Full Specifications</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenEnquiry(service.title)}
                          className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Enquire for This Service
                        </button>
                      </div>
                    </div>

                    {/* Preview Image / Visual Column */}
                    <div className="lg:col-span-5">
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0E18] aspect-[4/3] group cursor-pointer"
                           onClick={() => navigate('service-detail', service.slug)}>
                        <img
                          src={service.image_url || '/portfolio-enterprise-web.png'}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                          <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                            <span>Inspect Architecture Roadmap</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
