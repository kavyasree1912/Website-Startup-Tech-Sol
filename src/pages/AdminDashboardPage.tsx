import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/api.js';
import {
  DashboardStats,
  Enquiry,
  Service,
  Project,
  BlogPost,
  JobApplication
} from '../types.js';
import {
  ShieldCheck,
  LogOut,
  Mail,
  Layers,
  Briefcase,
  BookOpen,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Eye,
  X,
  Save,
  KeyRound,
  FileText
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'enquiries' | 'services' | 'projects' | 'blog' | 'applications' | 'subscribers' | 'settings'
  >('overview');

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [subscribers, setSubscribers] = useState<Array<{ id: number; email: string; subscribed_at: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  // Modal editor states
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('admin-login');
      return;
    }
    loadAllDashboardData();
  }, [user]);

  const loadAllDashboardData = async () => {
    setLoading(true);
    try {
      const [
        statsData,
        enqData,
        servData,
        projData,
        blogData,
        appData,
        subData
      ] = await Promise.all([
        api.getDashboardStats(),
        api.getAdminEnquiries(),
        api.getServices(),
        api.getProjects(),
        api.getBlogPosts(),
        api.getAdminApplications(),
        api.getAdminNewsletter()
      ]);

      setStats(statsData);
      setEnquiries(enqData);
      setServices(servData);
      setProjects(projData);
      setBlogPosts(blogData);
      setApplications(appData);
      setSubscribers(subData);
    } catch (err: any) {
      setFeedback({ text: err.message || 'Failed to load dashboard data', isError: true });
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (text: string, isError = false) => {
    setFeedback({ text, isError });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Enquiries handlers
  const handleUpdateEnquiryStatus = async (id: number, status: string) => {
    try {
      await api.updateEnquiryStatus(id, status);
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: status as any } : e));
      showNotification('Enquiry status updated successfully.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteEnquiry = async (id: number) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await api.deleteEnquiry(id);
      setEnquiries(enquiries.filter(e => e.id !== id));
      showNotification('Enquiry deleted.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // Service Save / Delete
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      await api.saveService(editingService, editingService.id);
      setEditingService(null);
      await loadAllDashboardData();
      showNotification('Service saved successfully.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.deleteService(id);
      setServices(services.filter(s => s.id !== id));
      showNotification('Service deleted.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // Project Save / Delete
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      await api.saveProject(editingProject, editingProject.id);
      setEditingProject(null);
      await loadAllDashboardData();
      showNotification('Project saved successfully.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      showNotification('Project deleted.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // Blog Save / Delete
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    try {
      await api.saveBlogPost(editingBlog, editingBlog.id);
      setEditingBlog(null);
      await loadAllDashboardData();
      showNotification('Blog post saved successfully.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await api.deleteBlogPost(id);
      setBlogPosts(blogPosts.filter(b => b.id !== id));
      showNotification('Blog post deleted.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // Job Application status
  const handleUpdateAppStatus = async (id: number, status: string) => {
    try {
      await api.updateApplicationStatus(id, status);
      setApplications(applications.map(a => a.id === id ? { ...a, status } : a));
      showNotification('Application status updated.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // Subscriber Delete
  const handleDeleteSubscriber = async (id: number) => {
    if (!confirm('Delete subscriber email?')) return;
    try {
      await api.deleteNewsletterSubscriber(id);
      setSubscribers(subscribers.filter(s => s.id !== id));
      showNotification('Subscriber removed.');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  // Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.changePassword(currentPassword, newPassword);
      showNotification(res.message);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  if (!user) return null;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#05070B] text-slate-100">
      {/* Dashboard Topbar */}
      <div className="border-b border-white/10 bg-[#070A10]/90 backdrop-blur-md sticky top-16 z-30 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-heading font-bold text-white flex items-center gap-2">
                <span>Console</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                  AUTHENTICATED
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('home')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
            >
              View Public Site
            </button>
            <button
              onClick={() => {
                logout();
                navigate('home');
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global feedback banner */}
      {feedback && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
              feedback.isError
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.isError ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button onClick={() => setFeedback(null)}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/5 overflow-x-auto mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-gold-gradient text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-gold-gradient text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Enquiries</span>
            {stats && stats.newEnquiriesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {stats.newEnquiriesCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'services'
                ? 'bg-gold-gradient text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Services ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-gold-gradient text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Portfolio ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'blog'
                ? 'bg-gold-gradient text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Articles ({blogPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-gold-gradient text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Job Applicants ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'subscribers'
                ? 'bg-gold-gradient text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Subscribers ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-gold-gradient text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Admin Security
          </button>
        </div>

        {/* ========================================== */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Total Enquiries</span>
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-heading font-extrabold text-white">
                  {stats?.enquiriesCount ?? enquiries.length}
                </div>
                <div className="text-xs text-amber-400 mt-1">
                  {stats?.newEnquiriesCount ?? 0} require attention
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Newsletter Audience</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-heading font-extrabold text-white">
                  {stats?.subscribersCount ?? subscribers.length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Direct opt-ins</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Portfolio Projects</span>
                  <Briefcase className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-heading font-extrabold text-white">
                  {stats?.projectsCount ?? projects.length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Case studies live</div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Job Candidates</span>
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-heading font-extrabold text-white">
                  {stats?.applicationsCount ?? applications.length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Submitted resumes</div>
              </div>
            </div>

            {/* Recent Enquiries preview */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white">
                    Recent Customer Enquiries
                  </h3>
                  <p className="text-xs text-slate-400">
                    Latest submissions received from web and service landing pages
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-semibold text-amber-400 hover:underline"
                >
                  View All Enquiries →
                </button>
              </div>

              {enquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No enquiries yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="pb-3 font-semibold">Client Name</th>
                        <th className="pb-3 font-semibold">Contact Details</th>
                        <th className="pb-3 font-semibold">Service</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {enquiries.slice(0, 5).map((enq) => (
                        <tr key={enq.id} className="hover:bg-white/5">
                          <td className="py-3 font-medium text-white">{enq.full_name}</td>
                          <td className="py-3 text-slate-300">
                            <div>{enq.email}</div>
                            {enq.phone && <div className="text-slate-500">{enq.phone}</div>}
                          </td>
                          <td className="py-3 text-slate-300">{enq.service_requested || 'General'}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                enq.status === 'new'
                                  ? 'bg-amber-400/20 text-amber-300'
                                  : enq.status === 'contacted'
                                  ? 'bg-blue-400/20 text-blue-300'
                                  : 'bg-emerald-400/20 text-emerald-300'
                              }`}
                            >
                              {enq.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-400">
                            {new Date(enq.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: ENQUIRIES MANAGER */}
        {/* ========================================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Customer & Project Enquiries ({enquiries.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Manage contact leads, budget requests, and update communication status
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400">
                    <tr>
                      <th className="p-4 font-semibold">ID / Type</th>
                      <th className="p-4 font-semibold">Client Name</th>
                      <th className="p-4 font-semibold">Contact Info</th>
                      <th className="p-4 font-semibold">Service & Budget</th>
                      <th className="p-4 font-semibold">Message</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {enquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-white/5">
                        <td className="p-4 font-mono text-slate-400">
                          #{enq.id}
                          <div className="text-[10px] text-amber-400 uppercase font-semibold">
                            {enq.type}
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-white whitespace-nowrap">
                          {enq.full_name}
                        </td>
                        <td className="p-4 text-slate-300">
                          <a
                            href={`mailto:${enq.email}`}
                            className="text-amber-400 hover:underline block"
                          >
                            {enq.email}
                          </a>
                          {enq.phone && (
                            <a
                              href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-emerald-400 block mt-0.5"
                            >
                              {enq.phone}
                            </a>
                          )}
                        </td>
                        <td className="p-4 text-slate-300">
                          <div className="font-medium text-white">{enq.service_requested || 'General'}</div>
                          {enq.budget_range && (
                            <div className="text-slate-400 text-[11px]">{enq.budget_range}</div>
                          )}
                        </td>
                        <td className="p-4 text-slate-300 max-w-xs">
                          <p className="line-clamp-3 leading-relaxed">{enq.message}</p>
                        </td>
                        <td className="p-4">
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                            className="bg-[#111624] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: SERVICES MANAGER */}
        {/* ========================================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Services Management
                </h3>
                <p className="text-xs text-slate-400">
                  Add, edit specifications, features, or remove public services
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingService({
                    slug: '',
                    title: '',
                    tagline: '',
                    description: '',
                    detailed_content: '',
                    icon_name: 'Globe',
                    image_url: '/portfolio-enterprise-web.png',
                    features: [],
                    deliverables: [],
                    display_order: services.length + 1
                  })
                }
                className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        Slug: {service.slug}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingService(service)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/5"
                          title="Edit Service"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-lg font-heading font-bold text-white mb-1">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Order: {service.display_order}</span>
                    <button
                      onClick={() => navigate('service-detail', service.slug)}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: PROJECTS MANAGER */}
        {/* ========================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Portfolio Case Studies
                </h3>
                <p className="text-xs text-slate-400">
                  Manage live project architectures, tech stacks, and results
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingProject({
                    slug: '',
                    title: '',
                    category: 'Enterprise Software',
                    client_name: '',
                    year: '2026',
                    summary: '',
                    challenge: '',
                    solution: '',
                    results: '',
                    tech_stack: ['React', 'TypeScript', 'Node.js'],
                    image_url: '/portfolio-enterprise-web.png',
                    live_url: '',
                    is_featured: 1,
                    display_order: projects.length + 1
                  })
                }
                className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Case Study</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-36 bg-[#0E1524] relative overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-semibold text-amber-300">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400">{project.client_name}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-1 rounded text-slate-400 hover:text-amber-400"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-base font-heading font-bold text-white mb-2 line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500">
                      {project.is_featured ? '⭐ Featured' : 'Standard'}
                    </span>
                    <button
                      onClick={() => navigate('project-detail', project.slug)}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 5: BLOG MANAGER */}
        {/* ========================================== */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Articles & Technical Guides
                </h3>
                <p className="text-xs text-slate-400">
                  Publish insights, architectural blueprints, and company news
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingBlog({
                    slug: '',
                    title: '',
                    excerpt: '',
                    content: '',
                    author_name: 'Syed Abdul Azeez',
                    author_role: 'Founder & CEO',
                    category: 'Enterprise Tech',
                    reading_time: '5 min read',
                    is_published: 1,
                    tags: ['Software', 'Architecture'],
                    image_url: '/portfolio-enterprise-web.png'
                  })
                }
                className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Write Article</span>
              </button>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span className="text-slate-400">{post.reading_time}</span>
                    </div>
                    <h4 className="text-lg font-heading font-bold text-white">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-400 max-w-2xl line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => navigate('blog-detail', post.slug)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => setEditingBlog(post)}
                      className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/5"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(post.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 6: JOB APPLICATIONS */}
        {/* ========================================== */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Job Applications Received ({applications.length})
              </h3>
              <p className="text-xs text-slate-400">
                Candidate submissions saved directly from the careers portal
              </p>
            </div>

            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400">
                    <tr>
                      <th className="p-4 font-semibold">Candidate</th>
                      <th className="p-4 font-semibold">Target Position</th>
                      <th className="p-4 font-semibold">Contact</th>
                      <th className="p-4 font-semibold">Profiles</th>
                      <th className="p-4 font-semibold">Notes / Highlights</th>
                      <th className="p-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-white/5">
                        <td className="p-4 font-semibold text-white whitespace-nowrap">
                          {app.applicant_name}
                        </td>
                        <td className="p-4 text-amber-300 font-medium">
                          {app.job_title}
                        </td>
                        <td className="p-4 text-slate-300">
                          <div>{app.applicant_email}</div>
                          <div className="text-slate-500">{app.applicant_phone}</div>
                        </td>
                        <td className="p-4 text-slate-300 space-y-1">
                          {app.linkedin_url && (
                            <a
                              href={app.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-400 hover:underline block"
                            >
                              LinkedIn
                            </a>
                          )}
                          {app.portfolio_url && (
                            <a
                              href={app.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline block"
                            >
                              Portfolio
                            </a>
                          )}
                        </td>
                        <td className="p-4 text-slate-300 max-w-xs">
                          <p className="line-clamp-2">{app.resume_note || 'No notes provided'}</p>
                        </td>
                        <td className="p-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                            className="bg-[#111624] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="interviewed">Interviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 7: SUBSCRIBERS */}
        {/* ========================================== */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Newsletter Subscribers ({subscribers.length})
              </h3>
              <p className="text-xs text-slate-400">
                Verified email subscriptions captured via website footer
              </p>
            </div>

            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden max-w-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400">
                    <tr>
                      <th className="p-4 font-semibold">Subscriber Email</th>
                      <th className="p-4 font-semibold">Subscribed Date</th>
                      <th className="p-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-white/5">
                        <td className="p-4 font-medium text-white">{sub.email}</td>
                        <td className="p-4 text-slate-400">
                          {new Date(sub.subscribed_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 8: ADMIN SECURITY & SETTINGS */}
        {/* ========================================== */}
        {activeTab === 'settings' && (
          <div className="max-w-xl space-y-6">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Admin Security & Credentials
              </h3>
              <p className="text-xs text-slate-400">
                Update master console password with salted bcrypt encryption
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Current Master Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    New Master Password (min. 8 characters)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new strong password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Save New Password
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* SERVICE EDIT MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-amber-400/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100">
            <button
              onClick={() => setEditingService(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-bold text-xl text-white mb-6">
              {editingService.id ? 'Edit Service' : 'Create New Service'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ''}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingService.slug || ''}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingService.tagline || ''}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Detailed Architecture Content *</label>
                <textarea
                  rows={4}
                  required
                  value={editingService.detailed_content || ''}
                  onChange={(e) => setEditingService({ ...editingService, detailed_content: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gold-gradient text-slate-950 font-bold uppercase tracking-wider"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT EDIT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-amber-400/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-bold text-xl text-white mb-6">
              {editingProject.id ? 'Edit Case Study' : 'Create Case Study'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingProject.client_name || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Executive Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.summary || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Challenge *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingProject.challenge || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Solution *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingProject.solution || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Key Business Results *</label>
                <input
                  type="text"
                  required
                  value={editingProject.results || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gold-gradient text-slate-950 font-bold uppercase tracking-wider"
                >
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG EDIT MODAL */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-amber-400/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100">
            <button
              onClick={() => setEditingBlog(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-bold text-xl text-white mb-6">
              {editingBlog.id ? 'Edit Article' : 'Publish New Guide'}
            </h3>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.slug || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={editingBlog.excerpt || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Full Article Body *</label>
                <textarea
                  rows={6}
                  required
                  value={editingBlog.content || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gold-gradient text-slate-950 font-bold uppercase tracking-wider"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
