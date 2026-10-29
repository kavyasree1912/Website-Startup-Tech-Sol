import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { api } from '../services/api.js';
import { Service, Project } from '../types.js';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Layers,
  Code2,
  Smartphone,
  Database,
  Cpu,
  Building2,
  ShoppingBag,
  Star,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Clock,
  PhoneCall,
  Globe
} from 'lucide-react';

import { ServiceViewModal, ServiceDetailItem } from '../components/ServiceViewModal.js';

interface HomePageProps {
  onOpenEnquiry: (defaultService?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  const { navigate } = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedModalService, setSelectedModalService] = useState<ServiceDetailItem | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [servData, projData] = await Promise.all([
          api.getServices(),
          api.getProjects()
        ]);
        setServices(servData);
        setFeaturedProjects(projData.filter(p => p.is_featured || p.display_order <= 3));
      } catch (err) {
        console.error('Error loading homepage data', err);
      }
    }
    loadData();
  }, []);

  const offerServices = [
    {
      title: 'Business Services',
      description: 'Complete business formation and compliance solutions.',
      items: ['LLC Creation', 'GMB Setup', 'Auditing & GST Filing'],
      icon: Building2,
      slug: 'llc-creation-business-compliance'
    },
    {
      title: 'Website Development',
      description: 'Professional websites and full-stack web solutions.',
      items: ['E-Commerce Websites', 'Web Design', 'Full Stack Development'],
      icon: Code2,
      slug: 'full-stack-web-development'
    },
    {
      title: 'Digital Services',
      description: 'Digital presence and advertising that drives results.',
      items: ['Social Media Management', 'Google & Meta Ads', 'SEO'],
      icon: Globe,
      slug: 'ecommerce-solutions'
    },
    {
      title: 'Creative Services',
      description: 'Stunning visuals that captivate and convert audiences.',
      items: ['Video Editing', 'UGC Creation with AI', 'Graphics Design'],
      icon: Sparkles,
      slug: 'mobile-app-development'
    }
  ];

  const stats = [
    { value: '100+', label: 'Projects Completed', sub: 'Delivered across 15+ industries' },
    { value: '50+', label: 'Happy Clients', sub: 'From startups to Fortune 500' },
    { value: '99%', label: 'Client Satisfaction', sub: 'Based on post-project surveys' },
    { value: '24/7', label: 'Support', sub: 'Always available for you' },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & System Blueprint',
      description: 'We analyze your business operations, outline clear technical specifications, database architectures, and eliminate scope ambiguity before coding begins.'
    },
    {
      step: '02',
      title: 'Sprint-Based Agile Engineering',
      description: 'Transparent 2-week development sprints with live staging demo previews, interactive feedback loops, and daily git commits.'
    },
    {
      step: '03',
      title: 'Stress Testing & Security Audits',
      description: 'End-to-end unit tests, cross-device responsiveness verification, database vulnerability scans, and sub-second performance benchmarking.'
    },
    {
      step: '04',
      title: 'Production Launch & Growth Warranty',
      description: 'Seamless cloud deployment, DNS and SSL configuration, staff training documentation, and 30 days of proactive post-launch maintenance.'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO, TechVista Inc.',
      content: 'Startup Tech Solutions transformed our entire digital infrastructure. Their ERP system reduced our operational costs by 40% and the team\'s dedication was truly exceptional.',
      rating: 5
    },
    {
      name: 'Sarah Mitchell',
      role: 'Founder, Elevate Learning',
      content: 'The school management platform they built for us is phenomenal. It handles 5,000+ students seamlessly and the parent portal has received incredible feedback.',
      rating: 5
    },
    {
      name: 'David Chen',
      role: 'CTO, Nexus Global',
      content: 'Their AI integration expertise is world-class. The chatbot and recommendation system they developed increased our customer engagement by 65%.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Director, Bright Horizons NGO',
      content: 'Working with Startup Tech Solutions was a game-changer for our organization. They delivered a stunning website and donor management system within our budget.',
      rating: 5
    },
    {
      name: 'Michael Torres',
      role: 'VP Engineering, CloudScale',
      content: 'The mobile app they developed for us has a 4.8-star rating on both app stores. Their attention to UX detail and performance optimization is unmatched.',
      rating: 5
    },
    {
      name: 'Anita Desai',
      role: 'COO, Urban Foods',
      content: 'From concept to launch, the team delivered our e-commerce platform in record time. Sales increased 200% in the first quarter after deployment.',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'What is Startup Tech Solutions?',
      a: 'Startup Tech Solutions is a premium technology company based in Proddatur, Kadapa District, Andhra Pradesh, India. We specialize in bespoke web applications, mobile apps, ERP systems, AI integrations, e-commerce, and US LLC business formation.'
    },
    {
      q: 'Where are you located and do you work with international clients?',
      a: 'Our registered headquarters is in Proddatur, Kadapa Dist, Andhra Pradesh, India. However, we serve startups, enterprises, and founders globally across the US, UK, Middle East, and Southeast Asia with flexible timezone coordination.'
    },
    {
      q: 'How do you handle project pricing and milestones?',
      a: 'We offer fixed-scope milestone contracts for defined projects and dedicated monthly engineering retainers. Every milestone includes verified deliverables, staging previews, and client acceptance before final signoff.'
    },
    {
      q: 'What technologies and frameworks do you use?',
      a: 'We select modern, scalable, and battle-tested stacks: React, TypeScript, Next.js, Node.js/Express, Python, Flutter, PostgreSQL, SQLite, Docker, and Google Gemini AI API.'
    },
    {
      q: 'Can you help us incorporate a US LLC from India?',
      a: 'Yes! We guide founders through the entire process: state filing in Wyoming or Delaware, registered agent setup, IRS EIN acquisition, and digital business banking guidance (Mercury / Wise).'
    },
    {
      q: 'How fast can we get started on a project?',
      a: 'After you reach out via our enquiry form or WhatsApp (+91 8688450435), we schedule an architectural discovery call within 24 hours and deliver an actionable technical roadmap within 2 business days.'
    }
  ];

  const llcCreationService: ServiceDetailItem = {
    id: 'llc-creation',
    title: 'LLC Creation & Global Business Formation',
    category: 'Business Formation',
    badge: 'Most Popular',
    description: 'Complete US LLC company registration in Wyoming or Delaware tailored for Indian and international founders to access global merchant payment processors, establish US corporate presence, and operate legally worldwide.',
    deliverables: [
      'Registered Agent service included for 1 full year',
      'Unique US business address for correspondence & compliance',
      'Articles of Organization and company state formation documents',
      'IRS Employer Identification Number (EIN / Tax ID)',
      '2 Global Business Bank Accounts (Wise Business & Mercury)',
      'State Reseller Certificate for wholesale trading',
      'Operating Agreement & digital corporate kit',
      'Processing Time: 1-2 Months with dedicated concierge'
    ],
    timeline: '1 - 2 Months',
    benefits: ['100% remote process', 'Global USD banking', 'Accept Stripe & PayPal', 'Zero personal liability'],
    serviceName: 'LLC Creation & Business Compliance'
  };

  const businessServicesList: ServiceDetailItem[] = [
    {
      id: 'product-research',
      title: 'Product Research',
      category: 'Strategic Research',
      description: 'Comprehensive market viability analysis, competitive landscape benchmarking, consumer demand forecasting, and unit economics validation before capital deployment.',
      deliverables: [
        'TAM, SAM & SOM total addressable market analysis',
        'Top 10 competitor feature teardown & pricing matrix',
        'High-converting customer persona identification',
        'Unit economics, margins & payback period modeling',
        'Risk assessment & regulatory barriers check',
        'Executive strategy deck and recommendations'
      ],
      timeline: '7 - 10 Business Days',
      benefits: ['De-risk your investment', 'Find your unfair market advantage', 'Investor-ready feasibility'],
      serviceName: 'Product Research'
    },
    {
      id: 'website-design',
      title: 'Website Design',
      category: 'Digital Experience',
      description: 'Bespoke modern high-performance website design with luxury aesthetics, micro-interactions, responsive typography, and built-in search engine optimization.',
      deliverables: [
        'Mobile-first responsive design across all screen sizes',
        'Custom brand color palette, fonts & component styling',
        'High-converting landing page layouts',
        'Fast React/TypeScript or Next.js front-end implementation',
        'Comprehensive SEO meta tags, OpenGraph cards & Schema markup',
        'Direct WhatsApp & interactive contact enquiry integration'
      ],
      timeline: '5 - 14 Business Days',
      benefits: ['Ultra-fast page speed', 'Higher conversion rates', 'Brand prestige & credibility'],
      serviceName: 'Full-Stack Web Development'
    },
    {
      id: 'app-design',
      title: 'App Design',
      category: 'Mobile UI/UX',
      description: 'Intuitive, human-centered mobile application design systems crafted according to Apple iOS Human Interface and Google Material Design guidelines.',
      deliverables: [
        'Complete end-to-end user journey mapping and wireframes',
        'High-fidelity interactive clickable Figma prototype',
        'Complete design system with components, typography, and tokens',
        'Dark mode and Light mode visual variations',
        'Developer handoff documentation & export-ready assets'
      ],
      timeline: '10 - 20 Business Days',
      benefits: ['App Store & Play Store compliant', 'Smooth user onboarding', 'Effortless developer handoff'],
      serviceName: 'Mobile App Development'
    },
    {
      id: 'gmb-setup',
      title: 'GMB Setup',
      category: 'Local Visibility',
      description: 'Complete Google Business Profile optimization and Google Maps verification to dominate local searches and drive footfall and inbound calls.',
      deliverables: [
        'Official Google Business Profile claim and verification assistance',
        'Optimized categories, descriptions, opening hours, and attributes',
        'Geo-tagged high-resolution business photos and showcase',
        'Local high-intent search keywords & service catalog',
        'Automated review collection links and customer response guidelines'
      ],
      timeline: '2 - 5 Business Days',
      benefits: ['Top placement on Google Maps', 'Attract local customers', 'Elevate customer trust'],
      serviceName: 'Google My Business (GMB) Setup'
    },
    {
      id: 'auditing-gst',
      title: 'Auditing GST Filing',
      category: 'Financial Compliance',
      description: 'Professional financial auditing, bookkeeping reconciliation, and monthly/quarterly GST return filings tailored to your turnover and legal structure.',
      deliverables: [
        'Monthly/Quarterly GSTR-1, GSTR-3B and annual GSTR-9 returns',
        'Input Tax Credit (ITC) reconciliation with GSTR-2B',
        'Financial statement auditing and balance sheet verification',
        'TDS/TCS compliances and tax ledger verification',
        'Advisory for department tax notices and queries'
      ],
      timeline: 'Ongoing Monthly / Quarterly Retainer',
      benefits: ['100% legal compliance', 'Zero penalty risk', 'Peace of mind for founders'],
      serviceName: 'Auditing & GST Filing'
    }
  ];

  return (
    <div className="relative">
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Exact Match with Reference Design) */}
      {/* ======================================================== */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-black flex flex-col items-center justify-center text-center">
        {/* Constellation Star Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E5B54F" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E5B54F" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="centerHeroGlow" cx="50%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#E5B54F" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Faint center ambient glow */}
            <rect width="100%" height="100%" fill="url(#centerHeroGlow)" />

            {/* Constellation connector lines */}
            <line x1="12%" y1="22%" x2="22%" y2="34%" stroke="#E5B54F" strokeWidth="0.75" strokeOpacity="0.2" />
            <line x1="22%" y1="34%" x2="32%" y2="25%" stroke="#E5B54F" strokeWidth="0.75" strokeOpacity="0.2" />
            <line x1="68%" y1="24%" x2="78%" y2="38%" stroke="#E5B54F" strokeWidth="0.75" strokeOpacity="0.2" />
            <line x1="78%" y1="38%" x2="88%" y2="28%" stroke="#E5B54F" strokeWidth="0.75" strokeOpacity="0.2" />
            <line x1="18%" y1="68%" x2="28%" y2="78%" stroke="#E5B54F" strokeWidth="0.75" strokeOpacity="0.2" />
            <line x1="72%" y1="72%" x2="84%" y2="82%" stroke="#E5B54F" strokeWidth="0.75" strokeOpacity="0.2" />
            <line x1="8%" y1="52%" x2="18%" y2="68%" stroke="#E5B54F" strokeWidth="0.75" strokeOpacity="0.15" />
            <line x1="84%" y1="82%" x2="94%" y2="68%" stroke="#E5B54F" strokeWidth="0.75" strokeOpacity="0.15" />

            {/* Glowing star nodes */}
            {[
              [12, 22], [22, 34], [32, 25], [68, 24], [78, 38], [88, 28],
              [18, 68], [28, 78], [72, 72], [84, 82], [8, 52], [94, 68],
              [48, 12], [52, 92], [42, 86], [62, 14], [15, 88], [85, 15]
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={`${cx}%`} cy={`${cy}%`} r="8" fill="url(#starGlow)" />
                <circle cx={`${cx}%`} cy={`${cy}%`} r="1.75" fill="#FDE68A" />
              </g>
            ))}
          </svg>
        </div>

        {/* Ambient atmospheric backdrop glow */}
        <div className="ambient-glow w-[600px] h-[600px] -top-24 left-1/2 -translate-x-1/2 bg-amber-500/10" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. STARTUP TECH SOLUTIONS Glowing Brand Title */}
          <div className="mb-6 sm:mb-8">
            <div className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.22em] text-[#E5B54F] uppercase drop-shadow-[0_0_30px_rgba(229,181,79,0.6)] select-none">
              STARTUP TECH
            </div>
            <div className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.22em] text-[#E5B54F] uppercase drop-shadow-[0_0_30px_rgba(229,181,79,0.6)] select-none mt-1 sm:mt-2">
              SOLUTIONS
            </div>
          </div>

          {/* 2. Capsule Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/80 border border-amber-500/40 text-xs sm:text-sm font-medium text-amber-300 shadow-md shadow-amber-500/5 mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-[#E5B54F]" />
            <span>Premium IT & Digital Solutions</span>
          </div>

          {/* 3. Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-heading font-black tracking-tight text-white leading-[1.12] mb-6 sm:mb-8">
            Transforming Businesses <br />
            <span className="text-[#E5B54F]">Into Powerful</span> <br />
            Digital Experiences
          </h1>

          {/* 4. Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12">
            Premium websites, mobile apps, ERP systems, AI solutions, and digital platforms built to help businesses scale faster.
          </p>

          {/* 5. The Two CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#E5B54F] hover:bg-[#d8a63e] text-black font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('services')}
              className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-black/80 hover:bg-black border border-amber-500/40 hover:border-amber-400 text-[#E5B54F] font-semibold text-sm sm:text-base flex items-center gap-2.5 transition-all hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer"
            >
              <span className="text-[#E5B54F] text-xs">▶</span>
              <span>View Our Services</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. WHAT WE OFFER (Premium Services - Exact Reference) */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 relative border-t border-white/5 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-white">
              Premium <span className="text-gold-gradient">Services</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              End-to-end business solutions crafted with precision and designed for businesses that demand excellence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerServices.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div
                  key={idx}
                  onClick={() => navigate('services')}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-[#0F131C] border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all">
                      <IconComp className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center text-xs font-semibold text-amber-400 group-hover:text-amber-300 pt-3 border-t border-white/5">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('services')}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-amber-500/30 text-amber-400 hover:text-amber-300 font-semibold rounded-xl hover:bg-amber-500/10 hover:border-amber-400 transition-all cursor-pointer text-sm"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. BUSINESS SERVICES (No money counts - simple View button) */}
      {/* ======================================================== */}
      <section id="pricing" className="py-20 sm:py-28 relative bg-[#05070B] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[#E5B54F] shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#E5B54F] tracking-tight">
                Business Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Complete business formation, research & compliance solutions
              </p>
            </div>
          </div>

          {/* Featured LLC Creation Card */}
          <div className="relative rounded-2xl p-7 sm:p-9 bg-[#0A0D14] border border-[#E5B54F]/50 shadow-[0_0_35px_rgba(229,181,79,0.12)] mb-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E5B54F]">
                <span>★</span>
                <span>BUSINESS FORMATION</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5B54F] text-black font-bold text-[11px]">
                <span>👑</span>
                <span>Most Popular</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide mb-1">
              LLC CREATION
            </h3>

            {/* Simple badge and View button replacing money count */}
            <div className="flex flex-wrap items-center justify-between gap-3 my-4">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                All-Inclusive Global Formation Package
              </span>
              <button
                type="button"
                onClick={() => setSelectedModalService(llcCreationService)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E5B54F]/15 hover:bg-[#E5B54F] text-[#E5B54F] hover:text-black border border-[#E5B54F]/30 hover:border-[#E5B54F] text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#E5B54F] mb-3">
                WHAT'S INCLUDED
              </div>
              <div className="space-y-2.5">
                {[
                  'Registered Agent',
                  'Unique Business Address',
                  'Company Documents & Formation',
                  'EIN (Employee Identification Number)',
                  '2 Bank Accounts (Wise & Mercury)',
                  'Reseller Certificate',
                  'Processing Time: 1-2 Months'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="text-[#E5B54F] font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => setSelectedModalService(llcCreationService)}
                className="flex-1 py-3.5 rounded-xl bg-[#E5B54F] hover:bg-[#d8a63e] text-black font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenEnquiry('LLC Creation & Business Compliance')}
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Get Started</span>
              </button>
            </div>
          </div>

          {/* Horizontal Service Bars with clean View button */}
          <div className="space-y-3">
            {businessServicesList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedModalService(item)}
                className="group p-4 sm:p-5 rounded-xl bg-[#090C12] border border-white/10 hover:border-[#E5B54F]/50 transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#0E121C]"
              >
                <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-white group-hover:text-[#E5B54F] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#E5B54F] shrink-0" />
                  <span>{item.title}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedModalService(item);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E5B54F]/10 group-hover:bg-[#E5B54F] text-[#E5B54F] group-hover:text-black border border-[#E5B54F]/30 group-hover:border-[#E5B54F] text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer shadow-sm"
                >
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. IMPACT: NUMBERS THAT SPEAK (Exact Reference Replica) */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 relative bg-[#07090F] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Impact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-white">
              Numbers That <span className="text-gold-gradient">Speak</span>
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Measurable outcomes delivered for startups, businesses, and global enterprises.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#0B0E17] border border-white/10 text-center hover:border-amber-400/40 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-gold-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. GENUINE TESTIMONIALS (What Our Clients Say) */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 relative border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Client Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-white">
              What Our <span className="text-gold-gradient">Clients Say</span>
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Genuine feedback from organizations scaling on our technology and business solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-amber-400/30 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{t.content}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-amber-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. FAQ SECTION */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 relative bg-[#07090F] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
              Got Questions?
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel rounded-xl border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. PROJECT ENQUIRY CALL TO ACTION BANNER */}
      {/* ======================================================== */}
      <section className="py-20 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-amber-500/10 via-[#0B0F19] to-slate-900 border border-amber-400/30 shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-2 block">
                Ready to Upgrade Your Digital Infrastructure?
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-4">
                Let's Build Something Exceptional Together
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                Speak directly with our senior software architects. We analyze your requirements,
                outline a clear development roadmap, and deliver tailored quotes with no hidden fees.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="px-7 py-3.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-sm sm:text-base hover:opacity-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Request Project Consultation
                </button>
                <a
                  href="tel:+918688450435"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/10 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Call +91 8688450435</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service View Modal */}
      <ServiceViewModal
        service={selectedModalService}
        isOpen={!!selectedModalService}
        onClose={() => setSelectedModalService(null)}
        onEnquire={onOpenEnquiry}
      />
    </div>
  );
};
