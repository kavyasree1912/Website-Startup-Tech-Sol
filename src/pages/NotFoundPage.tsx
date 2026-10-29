import React from 'react';
import { useRouter } from '../context/RouterContext.js';
import { Compass, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="pt-36 pb-32 min-h-[75vh] flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>
        <div className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mb-2">
          Error 404
        </div>
        <h1 className="text-4xl font-heading font-extrabold text-white tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          The requested URL does not exist or has been relocated to another section of the platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate('home')}
            className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
          <button
            onClick={() => navigate('services')}
            className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
