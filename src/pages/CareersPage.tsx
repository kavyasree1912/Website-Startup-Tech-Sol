import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { Job } from '../types.js';
import {
  Sparkles,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Send,
  X,
  AlertCircle,
  TrendingUp,
  Heart,
  Zap,
  Coffee
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Application Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    resume_note: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [applyStatus, setApplyStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await api.getCareers();
        setJobs(data);
        if (data.length > 0) setSelectedJob(data[0]);
      } catch (err) {
        console.error('Failed to load careers', err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const handleOpenApply = (job: Job) => {
    setApplyJob(job);
    setApplyStatus(null);
    setModalOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyJob) return;
    setSubmitting(true);
    setApplyStatus(null);

    try {
      const res = await api.applyForJob(applyJob.slug, formData);
      setApplyStatus({ success: true, message: res.message });
      setFormData({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        portfolio: '',
        resume_note: ''
      });
    } catch (err: any) {
      setApplyStatus({ success: false, message: err.message || 'Application failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const perks = [
    {
      icon: TrendingUp,
      title: 'High-Impact Work',
      desc: 'Build systems used by real enterprises handling thousands of transactions daily.'
    },
    {
      icon: Zap,
      title: 'Fast Growth & Mentorship',
      desc: 'Work directly alongside our founders with rapid technical skill advancement.'
    },
    {
      icon: Coffee,
      title: 'Flexible Hybrid & Remote',
      desc: 'Modern work structure combining Proddatur office hub and remote autonomy.'
    },
    {
      icon: Heart,
      title: 'Competitive Compensation',
      desc: 'Above-market pay bands, performance incentives, and milestone bonuses.'
    }
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-16 sm:py-20 border-b border-white/5 relative overflow-hidden text-center">
        <div className="ambient-glow w-[500px] h-[500px] -top-24 left-1/2 -translate-x-1/2 bg-amber-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Join Startup Tech Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-6">
            Build the Future of Enterprise <br />
            <span className="text-gold-gradient">Software & Artificial Intelligence</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We are looking for ambitious engineers, product researchers, and growth specialists
            who love crafting high-speed, reliable digital systems.
          </p>
        </div>
      </section>

      {/* Culture & Perks */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
            Current Openings
          </div>
          <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
            Explore Open Roles ({jobs.length})
          </h2>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-panel h-36 rounded-2xl animate-pulse bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Jobs List (Left) */}
            <div className="lg:col-span-5 space-y-4">
              {jobs.map((job) => {
                const isSelected = selectedJob?.id === job.id;
                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400/40 shadow-xl'
                        : 'glass-panel border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-2">
                      <span>{job.department}</span>
                      <span className="text-slate-400">{job.job_type}</span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-white mb-2">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.experience_level}</span>
                      </div>
                    </div>

                    {job.salary_range && (
                      <div className="text-xs font-medium text-slate-300">
                        {job.salary_range}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Job Detailed Preview (Right) */}
            <div className="lg:col-span-7">
              {selectedJob ? (
                <div className="glass-panel p-8 rounded-3xl border border-white/10 sticky top-28 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                        {selectedJob.department}
                      </span>
                      <h3 className="text-2xl font-heading font-bold text-white mt-1">
                        {selectedJob.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                        <span>{selectedJob.location}</span>
                        <span>·</span>
                        <span>{selectedJob.job_type}</span>
                        <span>·</span>
                        <span>{selectedJob.experience_level}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenApply(selectedJob)}
                      className="px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity self-start cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      Apply Now
                    </button>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                      About the Role
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                      Key Responsibilities
                    </h4>
                    <div className="space-y-2">
                      {selectedJob.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
                      Required Qualifications & Skills
                    </h4>
                    <div className="space-y-2">
                      {selectedJob.requirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Compensation: <strong className="text-white">{selectedJob.salary_range}</strong>
                    </span>
                    <button
                      onClick={() => handleOpenApply(selectedJob)}
                      className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Submit Application</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </section>

      {/* Application Modal */}
      {modalOpen && applyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#0B0F19] border border-amber-400/25 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-bold text-xl text-white mb-1">
              Apply for {applyJob.title}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Department: {applyJob.department} · {applyJob.location}
            </p>

            {applyStatus?.success ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Application Received!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  {applyStatus.message}
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-semibold text-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                {applyStatus && !applyStatus.success && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{applyStatus.message}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your legal name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      GitHub / Portfolio URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cover Note & Resume Highlights
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Summarize your key technical achievements, tech stack expertise, and why you wish to join Startup Tech Solutions..."
                    value={formData.resume_note}
                    onChange={(e) => setFormData({ ...formData, resume_note: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Submitting...' : 'Submit Candidate Application'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
