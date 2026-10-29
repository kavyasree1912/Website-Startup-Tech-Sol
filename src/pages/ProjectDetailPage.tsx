import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { api } from '../services/api.js';
import { Project } from '../types.js';
import {
  ChevronLeft,
  Sparkles,
  ExternalLink,
  TrendingUp,
  AlertCircle,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProjectDetailPageProps {
  onOpenEnquiry: (defaultService?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onOpenEnquiry }) => {
  const { pageParam: slug, navigate } = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getProjectBySlug(slug);
        setProject(data);
      } catch (err: any) {
        setError(err.message || 'Project not found');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-32 text-center max-w-7xl mx-auto px-4">
        <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-400">Loading case study architecture...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-40 pb-32 text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Project Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">
          The requested portfolio project could not be found or has been updated.
        </p>
        <button
          onClick={() => navigate('projects')}
          className="px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-semibold text-xs uppercase tracking-wider"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      {/* Breadcrumb Header */}
      <section className="py-12 border-b border-white/5 bg-[#07090F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('projects')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-6 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Case Studies</span>
          </button>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.category} · Case Study</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-1">
              {project.client_name && (
                <div>
                  <span className="text-slate-500">Client: </span>
                  <span className="text-slate-200 font-medium">{project.client_name}</span>
                </div>
              )}
              {project.year && (
                <div>
                  <span className="text-slate-500">Year: </span>
                  <span className="text-slate-200 font-medium">{project.year}</span>
                </div>
              )}
              <div>
                <span className="text-slate-500">Architected By: </span>
                <span className="text-amber-400 font-medium">Startup Tech Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Case Study Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Visual & Project Narrative */}
          <div className="lg:col-span-8 space-y-10">
            {/* Hero Image */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0E1524] shadow-2xl aspect-[16/9] relative">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Executive Summary */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-3">
              <h2 className="text-xl font-heading font-bold text-white">
                Project Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* The Challenge */}
            <div className="glass-panel p-8 rounded-3xl border border-rose-500/20 space-y-3 bg-gradient-to-br from-rose-950/10 to-transparent">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
                The Operational Bottleneck
              </div>
              <h3 className="text-lg font-heading font-bold text-white">
                What Problem Were We Hired to Solve?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* The Engineering Solution */}
            <div className="glass-panel p-8 rounded-3xl border border-amber-400/20 space-y-3 bg-gradient-to-br from-amber-950/10 to-transparent">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                The Architectural Solution
              </div>
              <h3 className="text-lg font-heading font-bold text-white">
                How Did We Engineer the Solution?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Measurable Results */}
            <div className="glass-panel p-8 rounded-3xl border border-emerald-500/20 space-y-3 bg-gradient-to-br from-emerald-950/10 to-transparent">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <span>Measurable Enterprise Impact</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-white">
                Business ROI & Performance Milestones
              </h3>
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed">
                {project.results}
              </p>
            </div>
          </div>

          {/* Right Column: Tech Specs & CTA Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-7 rounded-3xl border border-white/10 space-y-6 sticky top-28">
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Deliverable Highlights
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Role-Based Access & Encrypted Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Sub-second API response time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Automated continuous backup & CI/CD</span>
                  </div>
                </div>
              </div>

              {project.live_url && (
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Visit Live System</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => onOpenEnquiry(project.category)}
                  className="w-full py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <span>Build a Similar System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
