import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { api } from '../services/api.js';
import { Project } from '../types.js';
import {
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';

interface ProjectsPageProps {
  onOpenEnquiry: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenEnquiry }) => {
  const { navigate } = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'EdTech Platform',
    'Enterprise Software',
    'Artificial Intelligence',
    'Digital Commerce',
    'Mobile Development',
    'Web Development'
  ];

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await api.getProjects({
          category: category !== 'All' ? category : undefined,
          search: searchTerm || undefined
        });
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [category, searchTerm]);

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-16 sm:py-20 border-b border-white/5 relative overflow-hidden">
        <div className="ambient-glow w-[500px] h-[500px] -top-24 right-1/4 bg-amber-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Delivered Digital Architectures</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-6">
            Real Work. Real Impact. <br />
            <span className="text-gold-gradient">Production-Grade Case Studies</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of successful software platforms, bespoke ERP implementations,
            and AI integrations driving tangible enterprise scale.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 border-b border-white/5 bg-[#07090E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5 w-full md:w-auto overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    category === cat
                      ? 'bg-gold-gradient text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="glass-panel h-96 rounded-2xl animate-pulse bg-white/5" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center glass-panel rounded-2xl border border-white/10 max-w-lg mx-auto p-8">
            <Layers className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Projects Found</h3>
            <p className="text-xs text-slate-400 mb-4">
              Try adjusting your search terms or category filter.
            </p>
            <button
              onClick={() => {
                setCategory('All');
                setSearchTerm('');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-gold-gradient text-slate-950"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.slug}
                onClick={() => navigate('project-detail', project.slug)}
                className="glass-panel group rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-[#0D121F] overflow-hidden border-b border-white/10">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#070A11]/85 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-amber-400/20">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                      <span>{project.client_name || 'Enterprise Client'}</span>
                      <span>{project.year || '2025'}</span>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {project.summary}
                    </p>

                    <div className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/15 mb-4">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        <TrendingUp className="w-3 h-3" />
                        <span>Business Result</span>
                      </div>
                      <div className="text-xs text-slate-200 mt-1 line-clamp-2">
                        {project.results}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {project.tech_stack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-amber-400 pt-3 border-t border-white/5">
                    <span>View Case Study Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Enquiry Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#0E1524] to-[#0A0D15] border border-amber-400/20 text-center">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
            Have a Complex Project in Mind?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            We architect tailored solutions for enterprises requiring strict SLAs, custom integrations,
            and dedicated engineering teams.
          </p>
          <button
            onClick={onOpenEnquiry}
            className="px-8 py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Discuss Your System Blueprint
          </button>
        </div>
      </section>
    </div>
  );
};
