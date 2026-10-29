export interface CompanyInfo {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappLink: string;
  address: {
    street: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    full: string;
  };
  businessHours: Array<{ day: string; time: string }>;
  stats: Array<{ value: string; label: string }>;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  detailed_content: string;
  icon_name: string;
  image_url: string;
  features: string[];
  deliverables: string[];
  display_order: number;
  created_at?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  client_name?: string;
  year?: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  tech_stack: string[];
  image_url: string;
  live_url?: string;
  is_featured: number | boolean;
  display_order: number;
  created_at?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author_name: string;
  author_role: string;
  category: string;
  reading_time: string;
  published_at?: string;
  is_published: number | boolean;
  tags: string[];
  image_url: string;
}

export interface Job {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience_level: string;
  salary_range?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  is_active: number | boolean;
  created_at?: string;
}

export interface JobApplication {
  id: number;
  job_id: number;
  job_title: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_note?: string;
  status: string;
  created_at: string;
}

export interface Enquiry {
  id: number;
  type: 'contact' | 'service' | 'project';
  full_name: string;
  email: string;
  phone?: string;
  service_requested?: string;
  budget_range?: string;
  timeline?: string;
  message: string;
  status: 'new' | 'contacted' | 'in_progress' | 'resolved';
  notes?: string;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  name: string;
}

export interface DashboardStats {
  enquiriesCount: number;
  newEnquiriesCount: number;
  subscribersCount: number;
  projectsCount: number;
  servicesCount: number;
  blogCount: number;
  applicationsCount: number;
}
