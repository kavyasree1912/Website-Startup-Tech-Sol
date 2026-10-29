import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext.js';
import {
  Building2,
  Sparkles,
  Globe,
  Code2,
  Check,
  ArrowRight,
  TrendingUp,
  Cpu,
  Clock,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { ServiceViewModal, ServiceDetailItem } from '../components/ServiceViewModal.js';

interface PricingPageProps {
  onOpenEnquiry: (defaultService?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenEnquiry }) => {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'business' | 'creative' | 'digital' | 'tech'>('all');
  const [selectedModalService, setSelectedModalService] = useState<ServiceDetailItem | null>(null);

  const llcService: ServiceDetailItem = {
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

  const businessServices: ServiceDetailItem[] = [
    {
      id: 'product-research',
      title: 'Product Research',
      category: 'Strategic Research',
      description: 'In-depth market viability, competitor intelligence, and unit economics validation before capital deployment.',
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
      description: 'Modern luxury responsive websites with custom brand aesthetics and SEO optimization.',
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
      description: 'Intuitive iOS & Android mobile application UI/UX prototypes and design systems.',
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
      description: 'Google My Business verification, local map optimization, and review funnel setup.',
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
      description: 'Comprehensive business financial compliance, quarterly auditing, and GST return filing.',
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

  const creativeServices: ServiceDetailItem[] = [
    {
      id: 'video-editing',
      title: 'Video Editing',
      category: 'Creative Media',
      description: 'Reels, YouTube shorts, long-form podcast & commercial editing engineered for engagement and retention.',
      deliverables: [
        'High-retention dynamic pacing & cut transitions',
        'Animated subtitle captions, b-roll & sound effects',
        'Multi-platform aspect ratios (9:16 vertical, 16:9 widescreen)',
        'Professional studio color grading & audio mastering'
      ],
      timeline: '2 - 4 Business Days',
      benefits: ['Higher viewer retention', 'Algorithm-optimized formats', 'Ready to publish'],
      serviceName: 'Creative Services'
    },
    {
      id: 'ugc-creation',
      title: 'UGC Creation with AI',
      category: 'Creative Media',
      description: 'High-converting user-generated content powered by synthetic voices, lifelike AI avatars, and targeted ad scripting.',
      deliverables: [
        'Persona-matched AI avatar & voice selection',
        'Direct-response hook & script drafting',
        'Multi-angle product showcase cutdowns',
        'TikTok, Instagram Reels & YouTube Shorts optimization'
      ],
      timeline: '2 - 3 Business Days',
      benefits: ['Scalable ad variants', 'Lower production cost', 'Rapid testing'],
      serviceName: 'Creative Services'
    },
    {
      id: 'brand-identity',
      title: 'Logo & Brand Identity',
      category: 'Design Systems',
      description: 'Vector brand logos, typography palettes, iconography systems, and comprehensive style usage guidelines.',
      deliverables: [
        '3 primary logo concept variations & revisions',
        'Complete typography & hex color token guides',
        'Scalable SVG, PNG, EPS vector file delivery',
        'Social media profile & cover asset suite'
      ],
      timeline: '5 - 7 Business Days',
      benefits: ['Distinct market authority', 'Pixel-perfect across all media', 'Full copyright ownership'],
      serviceName: 'Creative Services'
    },
    {
      id: 'business-card-stationery',
      title: 'Business Card & Stationery',
      category: 'Design Systems',
      description: 'Print-ready luxury foil, matte, embossed, and spot-UV business cards with cohesive executive corporate stationery.',
      deliverables: [
        'Double-sided bespoke business card layouts',
        'CMYK 300+ DPI print-ready production files',
        'Letterhead, envelope & presentation deck templates',
        'Special finish foil/emboss mask layers'
      ],
      timeline: '2 - 4 Business Days',
      benefits: ['Premium tactile impression', 'Printer-ready specifications', 'Corporate consistency'],
      serviceName: 'Creative Services'
    },
    {
      id: 'brochure-design',
      title: 'Brochure Design',
      category: 'Print & Digital',
      description: 'Editorial multi-page product catalogs, bifold/trifold brochures, and luxury company investment profiles.',
      deliverables: [
        'Custom page grid & typographic layout',
        'Interactive digital flipbook PDF & print CMYK files',
        'High-resolution imagery treatment & infographic callouts',
        'Product matrix & pricing table layout'
      ],
      timeline: '4 - 7 Business Days',
      benefits: ['Investor & enterprise ready', 'Compelling visual storytelling', 'Digital & print compatible'],
      serviceName: 'Creative Services'
    },
    {
      id: 'social-media-design',
      title: 'Social Media Post Design',
      category: 'Digital Branding',
      description: 'Engaging Instagram carousel, LinkedIn, and Facebook graphic creatives tailored to boost organic interaction.',
      deliverables: [
        'Multi-slide educational carousel layouts',
        'Brand-consistent typography, badges & accents',
        'Canva / Figma editable source templates',
        'Story & feed formatted export files'
      ],
      timeline: '1 - 3 Business Days',
      benefits: ['Brand consistency across feeds', 'Optimized for save & share metrics', 'Quick deployment'],
      serviceName: 'Creative Services'
    },
    {
      id: 'flyer-poster-design',
      title: 'Flyer & Event Poster Design',
      category: 'Marketing Visuals',
      description: 'High-resolution digital and large-format print marketing graphics for events, exhibitions, and product promotions.',
      deliverables: [
        'Striking hero typography & visual hierarchy',
        'Custom QR code & call-to-action integration',
        'Standard A4/A3/A5 & custom billboard dimensions',
        'Bleed & margin certified print files'
      ],
      timeline: '2 - 3 Business Days',
      benefits: ['Immediate visual impact', 'High readability from distance', 'Omnichannel utility'],
      serviceName: 'Creative Services'
    }
  ];

  const digitalServices: ServiceDetailItem[] = [
    {
      id: 'social-media-management',
      title: 'Social Media Management',
      category: 'Growth Marketing',
      description: 'Monthly content calendar scheduling, community engagement, brand voice curation, and targeted profile growth.',
      deliverables: [
        'Monthly editorial content calendar & publishing schedule',
        'Hashtag strategy & audience research',
        'Community response & inbound comment handling',
        'End-of-month analytics & performance reporting'
      ],
      timeline: 'Ongoing Monthly Retainer',
      benefits: ['Consistent brand visibility', 'Active community building', 'Hands-off peace of mind'],
      serviceName: 'Digital Services'
    },
    {
      id: 'digital-marketing-ads',
      title: 'Digital Marketing (Google & Meta Ads)',
      category: 'Paid Acquisition',
      description: 'PPC search campaigns, retargeting funnels, negative keyword pruning, and aggressive ROAS optimization.',
      deliverables: [
        'Ad account structure & conversion pixel tracking setup',
        'High-intent search keyword bidding & negative lists',
        'Creative copywriting & multi-variant split A/B tests',
        'Weekly bid management & ROAS budget optimization'
      ],
      timeline: 'Ongoing Monthly Retainer',
      benefits: ['Measurable customer acquisition', 'Predictable lead pipeline', 'Lower cost per acquisition'],
      serviceName: 'Digital Services'
    },
    {
      id: 'seo-dominance',
      title: 'Search Engine Optimization (SEO)',
      category: 'Organic Growth',
      description: 'Technical on-page audits, backlink acquisition, Core Web Vitals optimization, and high-intent keyword ranking.',
      deliverables: [
        'Deep-crawl technical SEO audit & error remediation',
        'High-intent commercial keyword mapping',
        'Internal linking architecture & Schema structured data',
        'High-authority backlink outreach & monthly ranking reports'
      ],
      timeline: '3 - 6 Month Growth Plan',
      benefits: ['Sustainable organic traffic', 'Zero per-click cost', 'Long-term digital asset value'],
      serviceName: 'Digital Services'
    }
  ];

  const techServices: ServiceDetailItem[] = [
    {
      id: 'web-development-fullstack',
      title: 'Website Development (Full-Stack)',
      category: 'Engineering',
      description: 'Custom React, Next.js, and Node.js solutions built for sub-second performance, security, and scale.',
      deliverables: [
        'Full-stack architecture with React/Next.js and Node.js',
        'Secure API authentication & database modeling',
        'Lighthouse 95+ performance optimization',
        'Automated CI/CD deployment pipelines'
      ],
      timeline: '2 - 4 Weeks',
      benefits: ['Lightning speed', 'Scalable architecture', 'Zero technical debt'],
      serviceName: 'Full-Stack Web Development'
    },
    {
      id: 'mobile-app-development',
      title: 'Mobile Application Development',
      category: 'Engineering',
      description: 'Cross-platform iOS and Android apps with native-speed performance, biometric auth, and cloud database sync.',
      deliverables: [
        'Flutter or React Native cross-platform codebase',
        'Push notifications & real-time WebSocket events',
        'Offline caching & background data synchronization',
        'App Store and Google Play Store submission support'
      ],
      timeline: '4 - 8 Weeks',
      benefits: ['Single codebase for iOS & Android', 'Smooth native 60fps feel', 'Cloud-connected'],
      serviceName: 'Mobile App Development'
    },
    {
      id: 'enterprise-erp-school',
      title: 'Enterprise ERP & School Management',
      category: 'Enterprise Systems',
      description: 'Custom departmental workflows, student tracking, attendance registers, invoicing, fees, and executive reporting.',
      deliverables: [
        'Role-Based Access Control (Admin, Faculty, Student, Parent)',
        'Automated invoice generation & fee payment gateways',
        'Real-time attendance tracking & SMS notification integration',
        'Interactive analytics dashboards & data export capabilities'
      ],
      timeline: '4 - 10 Weeks',
      benefits: ['Complete administrative automation', 'Zero paperwork errors', 'Secure role separation'],
      serviceName: 'Enterprise ERP & Management Systems'
    },
    {
      id: 'support-whatsapp-automation',
      title: 'Support & WhatsApp Business Automation',
      category: 'Automation',
      description: 'Official WhatsApp Business Cloud API setup, automated response flows, CRM sync, and conversational workflows.',
      deliverables: [
        'Official Meta WhatsApp Business Cloud API onboarding',
        'Automated welcome greeting & interactive button menus',
        'Webhook integration into internal CRM or email inbox',
        'Broadcast template message approvals & agent dashboard'
      ],
      timeline: '3 - 5 Business Days',
      benefits: ['Instant 24/7 lead responses', 'Higher open rates than email', 'Seamless CRM integration'],
      serviceName: 'Full-Stack Web Development'
    }
  ];

  return (
    <div className="pt-28 pb-24 sm:pt-36 sm:pb-32 bg-black min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            Service Packages & Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight mt-3 mb-4">
            Structured Solutions Built For <span className="text-gold-gradient">Growth</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Bespoke engineering, digital marketing, creative production, and global business formation. Explore deliverables or request a tailored scope.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'business', label: 'Business & LLC' },
            { id: 'creative', label: 'Creative & Video' },
            { id: 'digital', label: 'Digital Marketing' },
            { id: 'tech', label: 'Tech & Engineering' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#E5B54F] text-black shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* Featured LLC Creation Card */}
        {/* ======================================================== */}
        {(activeTab === 'all' || activeTab === 'business') && (
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[#E5B54F] shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#E5B54F]">
                  Business Formation & Compliance
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Turnkey US LLC incorporation, tax IDs, and global merchant accounts
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl p-8 sm:p-10 bg-[#0A0D14] border border-[#E5B54F]/50 shadow-[0_0_40px_rgba(229,181,79,0.15)] mb-8 overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E5B54F]">
                  <span>★</span>
                  <span>BUSINESS FORMATION</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5B54F] text-black font-bold text-xs shadow-md">
                  <span>👑</span>
                  <span>Most Popular</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-wide">
                    LLC CREATION
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Complete Wyoming / Delaware US company formation for Indian & international founders
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedModalService(llcService)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E5B54F]/15 hover:bg-[#E5B54F] text-[#E5B54F] hover:text-black border border-[#E5B54F]/30 hover:border-[#E5B54F] text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm self-start md:self-auto"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-[#E5B54F] mb-4">
                  WHAT'S INCLUDED
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {[
                    'Registered Agent Service',
                    'Unique US Business Address',
                    'Articles of Organization & Formation Documents',
                    'IRS EIN (Employer Identification Number)',
                    '2 Global Business Bank Accounts (Wise & Mercury)',
                    'State Reseller Certificate for Wholesale',
                    'Processing Time: 1-2 Months with dedicated concierge'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                      <span className="text-[#E5B54F] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelectedModalService(llcService)}
                  className="flex-1 py-4 rounded-xl bg-[#E5B54F] hover:bg-[#d8a63e] text-black font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-xl shadow-amber-500/25"
                >
                  <span>View Full Formation Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEnquiry('LLC Creation & Business Compliance')}
                  className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Get Started</span>
                </button>
              </div>
            </div>

            {/* Business Horizontal Bars with clean View buttons */}
            <div className="space-y-3">
              {businessServices.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedModalService(item)}
                  className="group p-5 rounded-2xl bg-[#090C12] border border-white/10 hover:border-[#E5B54F]/50 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#0E121C]"
                >
                  <div>
                    <div className="flex items-center gap-2.5 text-base font-semibold text-white group-hover:text-[#E5B54F] transition-colors">
                      <span className="w-2 h-2 rounded-full bg-[#E5B54F]" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 pl-4.5">{item.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModalService(item);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E5B54F]/10 group-hover:bg-[#E5B54F] text-[#E5B54F] group-hover:text-black border border-[#E5B54F]/30 group-hover:border-[#E5B54F] text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer shadow-sm self-start sm:self-center ml-4.5 sm:ml-0"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* Creative Services */}
        {/* ======================================================== */}
        {(activeTab === 'all' || activeTab === 'creative') && (
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[#E5B54F] shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#E5B54F]">
                  Creative & Media Services
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  High-converting design, video production, and social media creative assets
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {creativeServices.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedModalService(item)}
                  className="group p-5 rounded-2xl bg-[#090C12] border border-white/10 hover:border-[#E5B54F]/50 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#0E121C]"
                >
                  <div>
                    <div className="flex items-center gap-2.5 text-base font-semibold text-white group-hover:text-[#E5B54F] transition-colors">
                      <span className="w-2 h-2 rounded-full bg-[#E5B54F]" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 pl-4.5">{item.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModalService(item);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E5B54F]/10 group-hover:bg-[#E5B54F] text-[#E5B54F] group-hover:text-black border border-[#E5B54F]/30 group-hover:border-[#E5B54F] text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer shadow-sm self-start sm:self-center ml-4.5 sm:ml-0"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* Digital Marketing */}
        {/* ======================================================== */}
        {(activeTab === 'all' || activeTab === 'digital') && (
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[#E5B54F] shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#E5B54F]">
                  Digital Marketing & Growth
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Data-backed customer acquisition, organic search dominance, and multi-channel ads
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {digitalServices.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedModalService(item)}
                  className="group p-5 rounded-2xl bg-[#090C12] border border-white/10 hover:border-[#E5B54F]/50 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#0E121C]"
                >
                  <div>
                    <div className="flex items-center gap-2.5 text-base font-semibold text-white group-hover:text-[#E5B54F] transition-colors">
                      <span className="w-2 h-2 rounded-full bg-[#E5B54F]" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 pl-4.5">{item.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModalService(item);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E5B54F]/10 group-hover:bg-[#E5B54F] text-[#E5B54F] group-hover:text-black border border-[#E5B54F]/30 group-hover:border-[#E5B54F] text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer shadow-sm self-start sm:self-center ml-4.5 sm:ml-0"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* Tech & Engineering */}
        {/* ======================================================== */}
        {(activeTab === 'all' || activeTab === 'tech') && (
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[#E5B54F] shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#E5B54F]">
                  Software Engineering & Automation
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Bespoke codebases, ERP management architectures, and AI-driven automation
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {techServices.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedModalService(item)}
                  className="group p-5 rounded-2xl bg-[#090C12] border border-white/10 hover:border-[#E5B54F]/50 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#0E121C]"
                >
                  <div>
                    <div className="flex items-center gap-2.5 text-base font-semibold text-white group-hover:text-[#E5B54F] transition-colors">
                      <span className="w-2 h-2 rounded-full bg-[#E5B54F]" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 pl-4.5">{item.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModalService(item);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E5B54F]/10 group-hover:bg-[#E5B54F] text-[#E5B54F] group-hover:text-black border border-[#E5B54F]/30 group-hover:border-[#E5B54F] text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer shadow-sm self-start sm:self-center ml-4.5 sm:ml-0"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Box */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#0B0F19] to-amber-500/5 border border-[#E5B54F]/30 text-center">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
            Need a Custom Architecture or Enterprise Retainer?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            We provide custom milestone scoping, dedicated full-time engineering teams, and flexible payment arrangements tailored to your startup stage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-8 py-3.5 rounded-xl bg-[#E5B54F] hover:bg-[#d8a63e] text-black font-bold text-sm sm:text-base transition-all hover:scale-105 cursor-pointer shadow-xl shadow-amber-500/20"
            >
              Get Custom Proposal
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
