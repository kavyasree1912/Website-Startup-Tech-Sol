import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from './db.js';
import { authMiddleware, AuthenticatedRequest, generateToken } from './auth.js';

export const apiRouter = Router();

// ==========================================
// 1. COMPANY INFORMATION & METRICS
// ==========================================
apiRouter.get('/company/info', (_req: Request, res: Response) => {
  res.json({
    name: 'Startup Tech Solutions',
    tagline: 'Transforming Ideas Into Digital Success',
    email: 'startuptechsolutions.in@gmail.com',
    phone: '+91 8688450435',
    whatsapp: '+91 8688450435',
    whatsappLink: 'https://wa.me/+918688450435',
    address: {
      street: 'Main Road',
      city: 'Proddatur',
      district: 'Kadapa District',
      state: 'Andhra Pradesh',
      country: 'India',
      pincode: '516360',
      full: 'Proddatur, Kadapa Dist, AP, India'
    },
    businessHours: [
      { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', time: 'Holiday' }
    ],
    stats: [
      { value: '50+', label: 'Delivered Projects' },
      { value: '4.9/5', label: 'Client Satisfaction' },
      { value: '40%', label: 'Avg Ops Cost Reduction' },
      { value: '24h', label: 'Inquiry Response Time' }
    ]
  });
});

// ==========================================
// 2. SERVICES ENDPOINTS
// ==========================================
apiRouter.get('/services', (_req: Request, res: Response) => {
  try {
    const services = db.prepare('SELECT * FROM services ORDER BY display_order ASC, id ASC').all();
    const parsed = services.map((s: any) => ({
      ...s,
      features: JSON.parse(s.features_json || '[]'),
      deliverables: JSON.parse(s.deliverables_json || '[]')
    }));
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve services', details: err.message });
  }
});

apiRouter.get('/services/:slug', (req: Request, res: Response) => {
  try {
    const service = db.prepare('SELECT * FROM services WHERE slug = ?').get(req.params.slug) as any;
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json({
      ...service,
      features: JSON.parse(service.features_json || '[]'),
      deliverables: JSON.parse(service.deliverables_json || '[]')
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve service', details: err.message });
  }
});

// ==========================================
// 3. PROJECTS / PORTFOLIO ENDPOINTS
// ==========================================
apiRouter.get('/projects', (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (title LIKE ? OR summary LIKE ? OR category LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY display_order ASC, id ASC';
    const projects = db.prepare(query).all(...params);
    const parsed = projects.map((p: any) => ({
      ...p,
      tech_stack: JSON.parse(p.tech_stack_json || '[]')
    }));
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve projects', details: err.message });
  }
});

apiRouter.get('/projects/:slug', (req: Request, res: Response) => {
  try {
    const project = db.prepare('SELECT * FROM projects WHERE slug = ?').get(req.params.slug) as any;
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json({
      ...project,
      tech_stack: JSON.parse(project.tech_stack_json || '[]')
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve project', details: err.message });
  }
});

// ==========================================
// 4. BLOG ENDPOINTS
// ==========================================
apiRouter.get('/blog', (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM blog_posts WHERE is_published = 1';
    const params: any[] = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (title LIKE ? OR excerpt LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY published_at DESC, id DESC';
    const blogs = db.prepare(query).all(...params);
    const parsed = blogs.map((b: any) => ({
      ...b,
      tags: JSON.parse(b.tags_json || '[]')
    }));
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve blog posts', details: err.message });
  }
});

apiRouter.get('/blog/:slug', (req: Request, res: Response) => {
  try {
    const blog = db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(req.params.slug) as any;
    if (!blog) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json({
      ...blog,
      tags: JSON.parse(blog.tags_json || '[]')
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve blog post', details: err.message });
  }
});

// ==========================================
// 5. CAREERS & JOBS ENDPOINTS
// ==========================================
apiRouter.get('/careers', (_req: Request, res: Response) => {
  try {
    const jobs = db.prepare('SELECT * FROM jobs WHERE is_active = 1 ORDER BY id DESC').all();
    const parsed = jobs.map((j: any) => ({
      ...j,
      requirements: JSON.parse(j.requirements_json || '[]'),
      responsibilities: JSON.parse(j.responsibilities_json || '[]')
    }));
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve career openings', details: err.message });
  }
});

apiRouter.get('/careers/:slug', (req: Request, res: Response) => {
  try {
    const job = db.prepare('SELECT * FROM jobs WHERE slug = ?').get(req.params.slug) as any;
    if (!job) {
      res.status(404).json({ error: 'Job opening not found' });
      return;
    }
    res.json({
      ...job,
      requirements: JSON.parse(job.requirements_json || '[]'),
      responsibilities: JSON.parse(job.responsibilities_json || '[]')
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve job opening', details: err.message });
  }
});

apiRouter.post('/careers/:slug/apply', (req: Request, res: Response) => {
  try {
    const { name, email, phone, linkedin, portfolio, resume_note } = req.body;

    if (!name || !email || !phone) {
      res.status(400).json({ error: 'Name, email, and phone number are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    const job = db.prepare('SELECT id, title FROM jobs WHERE slug = ?').get(req.params.slug) as any;
    const jobId = job ? job.id : null;
    const jobTitle = job ? job.title : 'General Application';

    const insert = db.prepare(`
      INSERT INTO job_applications (job_id, job_title, applicant_name, applicant_email, applicant_phone, linkedin_url, portfolio_url, resume_note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(jobId, jobTitle, name.trim(), email.trim(), phone.trim(), linkedin || '', portfolio || '', resume_note || '');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Our recruiting team will review your qualifications and contact you.',
      application_id: insert.lastInsertRowid
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Application submission failed', details: err.message });
  }
});

// ==========================================
// 6. ENQUIRIES (Contact / Project / Service)
// ==========================================
apiRouter.post('/enquiries', (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, budget, timeline, message, type = 'contact', honeypot } = req.body;

    // Honeypot spam check
    if (honeypot) {
      res.status(200).json({ success: true, message: 'Message sent successfully.' });
      return;
    }

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and a message are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    const insert = db.prepare(`
      INSERT INTO enquiries (type, full_name, email, phone, service_requested, budget_range, timeline, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `).run(
      type,
      name.trim(),
      email.trim(),
      phone ? phone.trim() : null,
      service ? service.trim() : null,
      budget ? budget.trim() : null,
      timeline ? timeline.trim() : null,
      message.trim()
    );

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Startup Tech Solutions! Our team will respond within 24 hours.',
      enquiry_id: insert.lastInsertRowid
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to record enquiry', details: err.message });
  }
});

// ==========================================
// 7. NEWSLETTER SUBSCRIPTION
// ==========================================
apiRouter.post('/newsletter', (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email address is required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    const existing = db.prepare('SELECT id FROM newsletter WHERE email = ?').get(email.trim().toLowerCase());
    if (existing) {
      res.status(200).json({ success: true, message: 'You are already subscribed to our technology newsletter.' });
      return;
    }

    db.prepare('INSERT INTO newsletter (email) VALUES (?)').run(email.trim().toLowerCase());
    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! You will receive our monthly tech insights and updates.'
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to subscribe', details: err.message });
  }
});

// ==========================================
// 8. ADMIN AUTHENTICATION
// ==========================================
apiRouter.post('/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.trim().toLowerCase()) as any;
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const isValid = bcrypt.compareSync(password, user.password_hash);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Authentication failed', details: err.message });
  }
});

// ==========================================
// 9. PROTECTED ADMIN DASHBOARD ROUTES
// ==========================================
apiRouter.get('/admin/me', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
});

apiRouter.get('/admin/stats', authMiddleware, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const enquiriesCount = (db.prepare('SELECT count(*) as count FROM enquiries').get() as any).count;
    const newEnquiriesCount = (db.prepare("SELECT count(*) as count FROM enquiries WHERE status = 'new'").get() as any).count;
    const subscribersCount = (db.prepare('SELECT count(*) as count FROM newsletter').get() as any).count;
    const projectsCount = (db.prepare('SELECT count(*) as count FROM projects').get() as any).count;
    const servicesCount = (db.prepare('SELECT count(*) as count FROM services').get() as any).count;
    const blogCount = (db.prepare('SELECT count(*) as count FROM blog_posts').get() as any).count;
    const applicationsCount = (db.prepare('SELECT count(*) as count FROM job_applications').get() as any).count;

    res.json({
      enquiriesCount,
      newEnquiriesCount,
      subscribersCount,
      projectsCount,
      servicesCount,
      blogCount,
      applicationsCount
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve stats', details: err.message });
  }
});

// Admin: Enquiries
apiRouter.get('/admin/enquiries', authMiddleware, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const enquiries = db.prepare('SELECT * FROM enquiries ORDER BY id DESC').all();
    res.json(enquiries);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve enquiries', details: err.message });
  }
});

apiRouter.patch('/admin/enquiries/:id/status', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status, notes } = req.body;
    db.prepare('UPDATE enquiries SET status = ?, notes = COALESCE(?, notes) WHERE id = ?').run(
      status,
      notes,
      req.params.id
    );
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update enquiry', details: err.message });
  }
});

apiRouter.delete('/admin/enquiries/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM enquiries WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete enquiry', details: err.message });
  }
});

// Admin: Services CRUD
apiRouter.post('/admin/services', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug, title, tagline, description, detailed_content, icon_name, image_url, features, deliverables, display_order } = req.body;
    const stmt = db.prepare(`
      INSERT INTO services (slug, title, tagline, description, detailed_content, icon_name, image_url, features_json, deliverables_json, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      slug,
      title,
      tagline || '',
      description,
      detailed_content,
      icon_name || 'Globe',
      image_url || '/sts-logo-original.png',
      JSON.stringify(features || []),
      JSON.stringify(deliverables || []),
      display_order || 0
    );
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create service', details: err.message });
  }
});

apiRouter.put('/admin/services/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug, title, tagline, description, detailed_content, icon_name, image_url, features, deliverables, display_order } = req.body;
    db.prepare(`
      UPDATE services
      SET slug = ?, title = ?, tagline = ?, description = ?, detailed_content = ?, icon_name = ?, image_url = ?, features_json = ?, deliverables_json = ?, display_order = ?
      WHERE id = ?
    `).run(
      slug,
      title,
      tagline || '',
      description,
      detailed_content,
      icon_name || 'Globe',
      image_url || '/sts-logo-original.png',
      JSON.stringify(features || []),
      JSON.stringify(deliverables || []),
      display_order || 0,
      req.params.id
    );
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update service', details: err.message });
  }
});

apiRouter.delete('/admin/services/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete service', details: err.message });
  }
});

// Admin: Projects CRUD
apiRouter.post('/admin/projects', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug, title, category, client_name, year, summary, challenge, solution, results, tech_stack, image_url, live_url, is_featured, display_order } = req.body;
    const stmt = db.prepare(`
      INSERT INTO projects (slug, title, category, client_name, year, summary, challenge, solution, results, tech_stack_json, image_url, live_url, is_featured, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      slug,
      title,
      category,
      client_name || '',
      year || new Date().getFullYear().toString(),
      summary,
      challenge,
      solution,
      results,
      JSON.stringify(tech_stack || []),
      image_url || '/portfolio-enterprise-web.png',
      live_url || '',
      is_featured ? 1 : 0,
      display_order || 0
    );
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create project', details: err.message });
  }
});

apiRouter.put('/admin/projects/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug, title, category, client_name, year, summary, challenge, solution, results, tech_stack, image_url, live_url, is_featured, display_order } = req.body;
    db.prepare(`
      UPDATE projects
      SET slug = ?, title = ?, category = ?, client_name = ?, year = ?, summary = ?, challenge = ?, solution = ?, results = ?, tech_stack_json = ?, image_url = ?, live_url = ?, is_featured = ?, display_order = ?
      WHERE id = ?
    `).run(
      slug,
      title,
      category,
      client_name || '',
      year || new Date().getFullYear().toString(),
      summary,
      challenge,
      solution,
      results,
      JSON.stringify(tech_stack || []),
      image_url || '/portfolio-enterprise-web.png',
      live_url || '',
      is_featured ? 1 : 0,
      display_order || 0,
      req.params.id
    );
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update project', details: err.message });
  }
});

apiRouter.delete('/admin/projects/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete project', details: err.message });
  }
});

// Admin: Blog CRUD
apiRouter.post('/admin/blog', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug, title, excerpt, content, author_name, author_role, category, reading_time, is_published, tags, image_url } = req.body;
    const stmt = db.prepare(`
      INSERT INTO blog_posts (slug, title, excerpt, content, author_name, author_role, category, reading_time, is_published, tags_json, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      slug,
      title,
      excerpt,
      content,
      author_name || 'Startup Tech Team',
      author_role || 'Contributor',
      category || 'Technology',
      reading_time || '5 min read',
      is_published !== undefined ? (is_published ? 1 : 0) : 1,
      JSON.stringify(tags || []),
      image_url || '/portfolio-enterprise-web.png'
    );
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create blog post', details: err.message });
  }
});

apiRouter.put('/admin/blog/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug, title, excerpt, content, author_name, author_role, category, reading_time, is_published, tags, image_url } = req.body;
    db.prepare(`
      UPDATE blog_posts
      SET slug = ?, title = ?, excerpt = ?, content = ?, author_name = ?, author_role = ?, category = ?, reading_time = ?, is_published = ?, tags_json = ?, image_url = ?
      WHERE id = ?
    `).run(
      slug,
      title,
      excerpt,
      content,
      author_name || 'Startup Tech Team',
      author_role || 'Contributor',
      category || 'Technology',
      reading_time || '5 min read',
      is_published ? 1 : 0,
      JSON.stringify(tags || []),
      image_url || '/portfolio-enterprise-web.png',
      req.params.id
    );
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update blog post', details: err.message });
  }
});

apiRouter.delete('/admin/blog/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete blog post', details: err.message });
  }
});

// Admin: Job Applications & Jobs
apiRouter.get('/admin/applications', authMiddleware, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const applications = db.prepare('SELECT * FROM job_applications ORDER BY id DESC').all();
    res.json(applications);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve applications', details: err.message });
  }
});

apiRouter.patch('/admin/applications/:id/status', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status } = req.body;
    db.prepare('UPDATE job_applications SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update application status', details: err.message });
  }
});

// Admin: Newsletter
apiRouter.get('/admin/newsletter', authMiddleware, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const list = db.prepare('SELECT * FROM newsletter ORDER BY id DESC').all();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve subscribers', details: err.message });
  }
});

apiRouter.delete('/admin/newsletter/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    db.prepare('DELETE FROM newsletter WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete subscriber', details: err.message });
  }
});

// Admin: Change password
apiRouter.post('/admin/change-password', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      res.status(400).json({ error: 'New password must be at least 8 characters long.' });
      return;
    }

    const userId = req.user!.id;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
    if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
      res.status(400).json({ error: 'Current password is incorrect.' });
      return;
    }

    const newHash = bcrypt.hashSync(newPassword, 10);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, userId);

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update password', details: err.message });
  }
});
