import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { useAuth } from '../context/AuthContext.js';
import {
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const Header: React.FC<{ onOpenEnquiry?: () => void }> = ({ onOpenEnquiry }) => {
  const { currentPage, navigate } = useRouter();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', page: 'home' as const },
    { label: 'About', page: 'about' as const },
    { label: 'Services', page: 'services' as const },
    { label: 'Pricing', page: 'pricing' as const },
    { label: 'Portfolio', page: 'projects' as const },
    { label: 'Careers', page: 'careers' as const },
    { label: 'Blog', page: 'blog' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  const handleNavClick = (page: any) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070B]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent p-1 border border-amber-400/30 flex items-center justify-center overflow-hidden shadow-lg shadow-amber-500/10 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/sts-logo-original.png"
                alt="Startup Tech Solutions Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-heading font-bold text-base sm:text-lg tracking-wider uppercase text-white group-hover:text-amber-300 transition-colors">
                Startup Tech
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.page ||
                (item.page === 'services' && currentPage === 'service-detail') ||
                (item.page === 'projects' && currentPage === 'project-detail') ||
                (item.page === 'careers' && currentPage === 'career-detail') ||
                (item.page === 'blog' && currentPage === 'blog-detail');

              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors relative cursor-pointer ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => (onOpenEnquiry ? onOpenEnquiry() : navigate('contact'))}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gold-gradient text-slate-950 hover:opacity-90 transition-all duration-200 shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Start Project</span>
            </button>

            {/* Admin Access Indicator */}
            <button
              onClick={() => navigate(user ? 'admin-dashboard' : 'admin-login')}
              className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-colors cursor-pointer"
              title={user ? 'Admin Dashboard' : 'Admin Portal'}
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => (onOpenEnquiry ? onOpenEnquiry() : navigate('contact'))}
              className="px-3 py-1.5 text-xs font-semibold rounded-md bg-gold-gradient text-slate-950 shadow-sm"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#070A0F]/98 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl transition-all">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.page ||
                (item.page === 'services' && currentPage === 'service-detail') ||
                (item.page === 'projects' && currentPage === 'project-detail') ||
                (item.page === 'careers' && currentPage === 'career-detail') ||
                (item.page === 'blog' && currentPage === 'blog-detail');

              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              );
            })}
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                  else navigate('contact');
                }}
                className="w-full py-2.5 text-center text-sm font-semibold rounded-lg bg-gold-gradient text-slate-950"
              >
                Start Project
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(user ? 'admin-dashboard' : 'admin-login');
                }}
                className="w-full py-2.5 text-center text-sm font-medium rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              >
                {user ? 'Dashboard' : 'Admin Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
