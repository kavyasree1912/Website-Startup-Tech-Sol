import React from 'react';
import { MessageSquareText } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  return (
    <aside
      aria-label="Direct messaging contact"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      <div className="hidden sm:block mr-3 px-3 py-1.5 rounded-lg bg-[#0E1524] text-xs text-slate-200 border border-emerald-500/30 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us on WhatsApp
      </div>
      <a
        href="https://wa.me/+918688450435?text=Hello%20Startup%20Tech%20Solutions,%20I%20would%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Startup Tech Solutions on WhatsApp"
        className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white flex items-center justify-center shadow-lg shadow-emerald-900/50 hover:scale-105 active:scale-95 transition-all duration-200 border border-emerald-300/30"
      >
        <MessageSquareText className="w-6 h-6" />
      </a>
    </aside>
  );
};
