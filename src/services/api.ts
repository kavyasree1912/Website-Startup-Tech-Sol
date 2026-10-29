import {
  CompanyInfo,
  Service,
  Project,
  BlogPost,
  Job,
  JobApplication,
  Enquiry,
  User,
  DashboardStats
} from '../types.js';

const getAuthHeaders = () => {
  const token = localStorage.getItem('sts_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Public
  async getCompanyInfo(): Promise<CompanyInfo> {
    const res = await fetch('/api/company/info');
    if (!res.ok) throw new Error('Failed to fetch company details');
    return res.json();
  },

  async getServices(): Promise<Service[]> {
    const res = await fetch('/api/services');
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  async getServiceBySlug(slug: string): Promise<Service> {
    const res = await fetch(`/api/services/${slug}`);
    if (!res.ok) throw new Error('Service not found');
    return res.json();
  },

  async getProjects(params?: { category?: string; search?: string }): Promise<Project[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    const res = await fetch(`/api/projects?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async getProjectBySlug(slug: string): Promise<Project> {
    const res = await fetch(`/api/projects/${slug}`);
    if (!res.ok) throw new Error('Project not found');
    return res.json();
  },

  async getBlogPosts(params?: { category?: string; search?: string }): Promise<BlogPost[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    const res = await fetch(`/api/blog?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return res.json();
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const res = await fetch(`/api/blog/${slug}`);
    if (!res.ok) throw new Error('Blog post not found');
    return res.json();
  },

  async getCareers(): Promise<Job[]> {
    const res = await fetch('/api/careers');
    if (!res.ok) throw new Error('Failed to fetch job openings');
    return res.json();
  },

  async getCareerBySlug(slug: string): Promise<Job> {
    const res = await fetch(`/api/careers/${slug}`);
    if (!res.ok) throw new Error('Job opening not found');
    return res.json();
  },

  async applyForJob(slug: string, application: {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
    portfolio?: string;
    resume_note?: string;
  }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`/api/careers/${slug}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit application');
    return data;
  },

  async submitEnquiry(enquiry: {
    type?: 'contact' | 'service' | 'project';
    name: string;
    email: string;
    phone?: string;
    service?: string;
    budget?: string;
    timeline?: string;
    message: string;
    honeypot?: string;
  }): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');
    return data;
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to subscribe');
    return data;
  },

  // Auth
  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: User }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async getMe(): Promise<{ user: User }> {
    const res = await fetch('/api/admin/me', {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },

  // Protected Admin
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch('/api/admin/stats', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  async getAdminEnquiries(): Promise<Enquiry[]> {
    const res = await fetch('/api/admin/enquiries', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch enquiries');
    return res.json();
  },

  async updateEnquiryStatus(id: number, status: string, notes?: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/admin/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error('Failed to update enquiry');
    return res.json();
  },

  async deleteEnquiry(id: number): Promise<{ success: boolean }> {
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete enquiry');
    return res.json();
  },

  async saveService(serviceData: Partial<Service>, id?: number): Promise<{ success: boolean; id?: number }> {
    const url = id ? `/api/admin/services/${id}` : '/api/admin/services';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(serviceData)
    });
    if (!res.ok) throw new Error('Failed to save service');
    return res.json();
  },

  async deleteService(id: number): Promise<{ success: boolean }> {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return res.json();
  },

  async saveProject(projectData: Partial<Project>, id?: number): Promise<{ success: boolean; id?: number }> {
    const url = id ? `/api/admin/projects/${id}` : '/api/admin/projects';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    if (!res.ok) throw new Error('Failed to save project');
    return res.json();
  },

  async deleteProject(id: number): Promise<{ success: boolean }> {
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  },

  async saveBlogPost(blogData: Partial<BlogPost>, id?: number): Promise<{ success: boolean; id?: number }> {
    const url = id ? `/api/admin/blog/${id}` : '/api/admin/blog';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData)
    });
    if (!res.ok) throw new Error('Failed to save blog post');
    return res.json();
  },

  async deleteBlogPost(id: number): Promise<{ success: boolean }> {
    const res = await fetch(`/api/admin/blog/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete blog post');
    return res.json();
  },

  async getAdminApplications(): Promise<JobApplication[]> {
    const res = await fetch('/api/admin/applications', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch job applications');
    return res.json();
  },

  async updateApplicationStatus(id: number, status: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/admin/applications/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  async getAdminNewsletter(): Promise<Array<{ id: number; email: string; subscribed_at: string }>> {
    const res = await fetch('/api/admin/newsletter', { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch subscribers');
    return res.json();
  },

  async deleteNewsletterSubscriber(id: number): Promise<{ success: boolean }> {
    const res = await fetch(`/api/admin/newsletter/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete subscriber');
    return res.json();
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to change password');
    return data;
  }
};
