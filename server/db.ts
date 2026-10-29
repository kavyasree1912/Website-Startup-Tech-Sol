import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'startuptech.sqlite');
export const db = new Database(dbPath);

// Enable WAL mode for high concurrency
db.pragma('journal_mode = WAL');

export function initDatabase() {
  // 1. Admin users
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Services
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      tagline TEXT,
      description TEXT NOT NULL,
      detailed_content TEXT NOT NULL,
      icon_name TEXT NOT NULL,
      image_url TEXT,
      features_json TEXT,
      deliverables_json TEXT,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Projects
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      client_name TEXT,
      year TEXT,
      summary TEXT NOT NULL,
      challenge TEXT NOT NULL,
      solution TEXT NOT NULL,
      results TEXT NOT NULL,
      tech_stack_json TEXT NOT NULL,
      image_url TEXT NOT NULL,
      live_url TEXT,
      is_featured INTEGER DEFAULT 0,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Blog Posts
  db.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author_name TEXT NOT NULL,
      author_role TEXT NOT NULL,
      category TEXT NOT NULL,
      reading_time TEXT NOT NULL,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_published INTEGER DEFAULT 1,
      tags_json TEXT,
      image_url TEXT
    );
  `);

  // 5. Jobs & Careers
  db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      location TEXT NOT NULL,
      job_type TEXT NOT NULL,
      experience_level TEXT NOT NULL,
      salary_range TEXT,
      description TEXT NOT NULL,
      requirements_json TEXT NOT NULL,
      responsibilities_json TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Job Applications
  db.exec(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER,
      job_title TEXT NOT NULL,
      applicant_name TEXT NOT NULL,
      applicant_email TEXT NOT NULL,
      applicant_phone TEXT NOT NULL,
      linkedin_url TEXT,
      portfolio_url TEXT,
      resume_note TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 7. Enquiries (Contact, Service & Project)
  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL DEFAULT 'contact', -- 'contact', 'service', 'project'
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service_requested TEXT,
      budget_range TEXT,
      timeline TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'resolved'
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 8. Newsletter subscribers
  db.exec(`
    CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedDefaultData();
}

function seedDefaultData() {
  // Check if admin exists
  const adminCount = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };
  if (adminCount.count === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Admin@STS2026!', salt);
    db.prepare(`
      INSERT INTO users (email, password_hash, role, name)
      VALUES (?, ?, ?, ?)
    `).run('admin@startuptechsolutions.in', hash, 'admin', 'Startup Tech Admin');
  }

  // Seed Services
  const servicesCount = db.prepare('SELECT count(*) as count FROM services').get() as { count: number };
  if (servicesCount.count === 0) {
    const insertService = db.prepare(`
      INSERT INTO services (slug, title, tagline, description, detailed_content, icon_name, image_url, features_json, deliverables_json, display_order)
      VALUES (@slug, @title, @tagline, @description, @detailed_content, @icon_name, @image_url, @features_json, @deliverables_json, @display_order)
    `);

    const seedServices = [
      {
        slug: 'web-development',
        title: 'Full-Stack Web Development',
        tagline: 'High-Performance, Scalable & Conversion-Engineered Platforms',
        description: 'Bespoke web applications, high-converting portals, and enterprise websites engineered for sub-second load times, superior SEO, and flawless responsiveness across all devices.',
        detailed_content: 'At Startup Tech Solutions, our web engineering goes far beyond static brochure sites. We architect bespoke web ecosystems tailored for mission-critical operations. Utilizing cutting-edge stacks including React, TypeScript, Next.js, Node.js, and high-performance databases, our systems are optimized for organic search rankings, strict security standards, and high user engagement.',
        icon_name: 'Globe',
        image_url: '/portfolio-enterprise-web.png',
        features_json: JSON.stringify([
          'Architected for sub-second Google Core Web Vitals',
          'Responsive design engineered for all viewport dimensions',
          'Microservice and headless CMS integrations',
          'Automated CI/CD pipelines with zero-downtime deployment',
          'Robust REST & GraphQL API integrations with secure authentication',
          'Enterprise SEO architecture with Schema.org JSON-LD structured data'
        ]),
        deliverables_json: JSON.stringify([
          'Full production deployment on Cloud infrastructure',
          'Fully documented codebase and architecture blueprints',
          'Content management integration (CMS) for real-time updates',
          'Analytics, conversion tracking, and performance telemetry',
          '30-day post-launch warranty and continuous maintenance roadmap'
        ]),
        display_order: 1
      },
      {
        slug: 'mobile-apps',
        title: 'Mobile App Development',
        tagline: 'Native & Cross-Platform Experiences for iOS & Android',
        description: 'End-to-end mobile development using Flutter and React Native. Fluid animations, offline capability, biometrics, and verified App Store / Play Store compliance.',
        detailed_content: 'We craft high-retention mobile applications that deliver smooth 60fps performance and intuitive user experiences. From initial wireframing to App Store and Google Play publication, our mobile engineering team builds responsive, offline-ready apps equipped with push notification engines, secure payment SDKs, and hardware acceleration.',
        icon_name: 'Smartphone',
        image_url: '/portfolio-mobile-app.png',
        features_json: JSON.stringify([
          'Single-codebase cross-platform efficiency with Flutter and React Native',
          'Native hardware integration (Camera, GPS, Biometrics, Bluetooth)',
          'Offline-first architecture with background sync',
          'Push notifications and retention trigger funnels',
          'Complete App Store (iOS) and Play Store (Android) compliance and release management'
        ]),
        deliverables_json: JSON.stringify([
          'Signed iOS IPA and Android APK/AAB release packages',
          'Published listings on Apple App Store & Google Play Console',
          'Interactive Figma UI/UX design prototype & design tokens',
          'Scalable backend API integration and push notification server setup'
        ]),
        display_order: 2
      },
      {
        slug: 'erp-systems',
        title: 'ERP & Custom Enterprise Systems',
        tagline: 'Tailored Automation, Workflow Efficiency & Cost Reduction',
        description: 'Comprehensive ERP platforms tailored to unique business processes. Multi-department workflows, inventory tracking, financial auditing, and proven 40% reduction in operating costs.',
        detailed_content: 'Off-the-shelf software often forces businesses into rigid workflows. Our custom Enterprise Resource Planning (ERP) systems are built around your exact operational processes. We unite customer relationships, billing, supply chain, automated invoicing, payroll, and departmental reporting into a unified, secure dashboard.',
        icon_name: 'Database',
        image_url: '/portfolio-erp-system.png',
        features_json: JSON.stringify([
          'Custom modular architecture (Inventory, CRM, HR, Accounting, Analytics)',
          'Role-based granular access control (RBAC) with audit logging',
          'Automated multi-currency billing, GST & tax calculations',
          'Real-time inventory sync across multiple warehouse locations',
          'Automated email/SMS notification triggers for critical events'
        ]),
        deliverables_json: JSON.stringify([
          'Custom enterprise software tailored to your company workflow',
          'Data migration assistance from legacy spreadsheets or old systems',
          'Staff training sessions and comprehensive administrator documentation',
          'Dedicated SLA support and incremental feature expansion roadmap'
        ]),
        display_order: 3
      },
      {
        slug: 'ai-solutions',
        title: 'AI Solutions & Machine Learning',
        tagline: 'Intelligent Automations, Custom LLMs & Predictive Analytics',
        description: 'Transform operations with customized generative AI, contextual chatbots, document intelligence, and predictive models that drive engagement and automate repetitive tasks.',
        detailed_content: 'We empower modern enterprises with real, measurable artificial intelligence. Whether building custom customer support agents trained on proprietary enterprise knowledge bases, computer vision pipelines, or automated document extraction engines, we deliver safe, reliable, and ROI-positive AI capabilities.',
        icon_name: 'Cpu',
        image_url: '/portfolio-ai-solutions.png',
        features_json: JSON.stringify([
          'Custom RAG (Retrieval-Augmented Generation) trained on company data',
          'Intelligent conversational customer support agents (24/7 autonomous resolution)',
          'Document parsing, OCR, and automated structured data extraction',
          'Predictive sales forecasting and user behavior pattern detection',
          'Strict data privacy protocols with enterprise API controls'
        ]),
        deliverables_json: JSON.stringify([
          'Production-ready AI microservice with secure API gateway',
          'Fine-tuned model / vector database configuration and embeddings index',
          'Intuitive administration portal for monitoring bot interactions and accuracy',
          'Integration with WhatsApp, Web Chat, Slack, or internal CRM systems'
        ]),
        display_order: 4
      },
      {
        slug: 'e-commerce',
        title: 'E-Commerce Solutions',
        tagline: 'High-Converting Digital Stores & Omnichannel Commerce',
        description: 'Scalable e-commerce platforms engineered for conversion. Instant search, localized payment gateway integrations, real-time inventory management, and cart abandonment recovery.',
        detailed_content: 'Turn casual visitors into loyal repeat customers. Our e-commerce platforms combine lightning-fast load speeds, intuitive mobile checkouts, multi-currency support, and seamless payment gateway integrations (Razorpay, Stripe, UPI, PayPal) with robust backend stock management.',
        icon_name: 'ShoppingBag',
        image_url: '/portfolio-ecommerce.png',
        features_json: JSON.stringify([
          'Ultra-fast product catalog search and faceted filtering',
          'One-click checkout and UPI/Credit Card/Netbanking payment gateways',
          'Automated cart recovery funnels and coupon/promotion rules',
          'Real-time inventory alerts, order status tracking, and courier API sync',
          'Customer loyalty accounts, wishlist, and verified review system'
        ]),
        deliverables_json: JSON.stringify([
          'Fully configured e-commerce storefront and admin back-office',
          'Payment gateway approvals and webhook configuration',
          'Product catalog upload & category structuring',
          'Shipping provider integration and automated invoice generation'
        ]),
        display_order: 5
      },
      {
        slug: 'llc-creation',
        title: 'LLC Creation & Business Compliance',
        tagline: 'Global Incorporation, EIN, GST & Operations Scaling',
        description: 'Seamless corporate formation for founders expanding internationally. US LLC registration, Registered Agent service, EIN acquisition, bank account assistance, and GST compliance.',
        detailed_content: 'Expanding internationally or formalizing your venture shouldn\'t be hindered by administrative roadblocks. Startup Tech Solutions provides end-to-end company formation services. We manage Delaware/Wyoming US LLC incorporation, Registered Agent setup, IRS EIN procurement, US business banking guidance, and domestic Indian GST/MSME compliance.',
        icon_name: 'Building2',
        image_url: '/sts-logo-original.png',
        features_json: JSON.stringify([
          'US LLC filing in Wyoming, Delaware, or tailored states',
          'IRS EIN (Employer Identification Number) acquisition for non-residents',
          'One full year of certified Registered Agent service',
          'Guidance on setting up international business bank accounts (Mercury, Wise)',
          'Indian company registration, GST filing, and trademark filing advisory'
        ]),
        deliverables_json: JSON.stringify([
          'Official Articles of Organization & Certificate of Formation',
          'Operating Agreement tailored to your ownership structure',
          'Official IRS EIN confirmation letter (CP 575 / 147C)',
          'Complete compliance calendar with annual report reminders'
        ]),
        display_order: 6
      }
    ];

    seedServices.forEach(s => insertService.run(s));
  }

  // Seed Projects
  const projectsCount = db.prepare('SELECT count(*) as count FROM projects').get() as { count: number };
  if (projectsCount.count === 0) {
    const insertProject = db.prepare(`
      INSERT INTO projects (slug, title, category, client_name, year, summary, challenge, solution, results, tech_stack_json, image_url, live_url, is_featured, display_order)
      VALUES (@slug, @title, @category, @client_name, @year, @summary, @challenge, @solution, @results, @tech_stack_json, @image_url, @live_url, @is_featured, @display_order)
    `);

    const seedProjects = [
      {
        slug: 'school-management-platform',
        title: 'Comprehensive School Management Platform',
        category: 'EdTech Platform',
        client_name: 'Elevate Learning Academy',
        year: '2025',
        summary: 'All-in-one digital education suite managing 5,000+ active students, 200+ faculty members, automated report card generation, and live parent communication portals.',
        challenge: 'The institution was burdened by disconnected legacy spreadsheets, delayed fee collection notices, and high administrative overhead during admissions and exam evaluations.',
        solution: 'Built a responsive multi-role cloud platform with dedicated portals for Administrators, Teachers, Students, and Parents. Included automated SMS/WhatsApp fee reminders, instant grade calculations, and online examination modules.',
        results: 'Eliminated 95% of manual paper forms, reduced fee collection delays by 60%, and processed 5,000+ student records with zero server downtime.',
        tech_stack_json: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Razorpay', 'Twilio SMS']),
        image_url: '/portfolio-school-mgmt.png',
        live_url: 'https://startuptechsolutions.in',
        is_featured: 1,
        display_order: 1
      },
      {
        slug: 'enterprise-cloud-erp',
        title: 'Enterprise Multi-Branch ERP System',
        category: 'Enterprise Software',
        client_name: 'TechVista Industries',
        year: '2025',
        summary: 'Integrated operational ERP consolidating procurement, inventory distribution across 8 regional warehouses, GST compliance, and real-time executive analytics.',
        challenge: 'Discrepancies in warehouse inventory were creating order delays and inflated storage expenses, while manual accounting led to frequent month-end audit bottlenecks.',
        solution: 'Engineered a real-time inventory ledger with barcode tracking, automated purchase reorders, and a role-based financial ledger integrated directly with GST and banking gateways.',
        results: 'Reduced operational costs by 40%, cut order fulfillment cycle time from 72 hours to 18 hours, and automated 100% of GST e-invoices.',
        tech_stack_json: JSON.stringify(['React', 'TypeScript', 'Express', 'Redis', 'Docker', 'SQLite/Postgres']),
        image_url: '/portfolio-erp-system.png',
        live_url: 'https://startuptechsolutions.in',
        is_featured: 1,
        display_order: 2
      },
      {
        slug: 'ai-customer-engagement-suite',
        title: 'Intelligent AI Customer Concierge',
        category: 'Artificial Intelligence',
        client_name: 'Nexus Global Logistics',
        year: '2025',
        summary: 'Generative AI platform delivering 24/7 multi-channel customer support, automated package tracking inquiries, and personalized service recommendations.',
        challenge: 'Support ticket volumes during peak hours overwhelmed human agents, resulting in 4-hour wait times and frustrated enterprise shippers.',
        solution: 'Deployed a custom RAG-powered AI model connected to the enterprise shipment tracking database, resolving 82% of customer inquiries instantaneously.',
        results: 'Increased customer engagement by 65%, reduced average response time to under 3 seconds, and saved $120,000 annually in support team overhead.',
        tech_stack_json: JSON.stringify(['Python', 'Google Gemini API', 'Vector Embeddings', 'Node.js', 'WebSockets']),
        image_url: '/portfolio-ai-solutions.png',
        live_url: 'https://startuptechsolutions.in',
        is_featured: 1,
        display_order: 3
      },
      {
        slug: 'luxury-ecommerce-marketplace',
        title: 'High-Converting Omnichannel E-Commerce',
        category: 'Digital Commerce',
        client_name: 'Urban Foods & Lifestyle',
        year: '2025',
        summary: 'Modern, ultra-fast online shopping portal engineered for 100,000+ SKUs with lightning-fast search, localized payment gateways, and automated logistics sync.',
        challenge: 'Slow product pages and high checkout friction caused a 74% cart abandonment rate on their prior platform.',
        solution: 'Re-architected the store as a headless commerce application with sub-second page transitions, dynamic inventory badges, and single-click UPI checkout.',
        results: '200% surge in quarterly sales post-launch, mobile conversion rate jumped by 3.2x, and page bounce rate decreased by 58%.',
        tech_stack_json: JSON.stringify(['Next.js', 'Tailwind CSS', 'Stripe', 'Razorpay', 'Elasticsearch', 'Node.js']),
        image_url: '/portfolio-ecommerce.png',
        live_url: 'https://startuptechsolutions.in',
        is_featured: 1,
        display_order: 4
      },
      {
        slug: 'fintech-mobile-application',
        title: 'Next-Gen Mobile Financial Suite',
        category: 'Mobile Development',
        client_name: 'PaySprint Technologies',
        year: '2024',
        summary: 'Cross-platform mobile banking and digital wallet app featuring biometric authentication, instant micro-transfers, and interactive spending insights.',
        challenge: 'Needed bank-grade encryption, zero latency on transaction processing, and a modern UI that appeals to digital-native millennials.',
        solution: 'Built a sleek Flutter application with native biometric cryptographic storage, end-to-end encrypted API tunnels, and interactive financial charts.',
        results: 'Maintained a 4.8-star rating on both Google Play and Apple App Store, with over 150,000 active monthly transactions verified.',
        tech_stack_json: JSON.stringify(['Flutter', 'Dart', 'Go', 'Firebase', 'Secure Enclave Biometrics']),
        image_url: '/portfolio-mobile-app.png',
        live_url: 'https://startuptechsolutions.in',
        is_featured: 0,
        display_order: 5
      },
      {
        slug: 'enterprise-corporate-portal',
        title: 'Global Corporate Brand & Portal Ecosystem',
        category: 'Web Development',
        client_name: 'CloudScale International',
        year: '2024',
        summary: 'High-authority digital presence and investor portal with interactive revenue calculators, international localization, and ISO-grade security compliance.',
        challenge: 'The client possessed an outdated web presence that did not convey enterprise credibility to Fortune 500 decision-makers and global investors.',
        solution: 'Designed and engineered an elite editorial web portal featuring custom micro-animations, fast load times, and an encrypted client resource room.',
        results: 'Enterprise inquiry rate rose by 140% within 90 days of rollout, securing 4 major multinational pilot partnerships.',
        tech_stack_json: JSON.stringify(['React', 'TypeScript', 'Motion', 'Tailwind CSS', 'Express']),
        image_url: '/portfolio-enterprise-web.png',
        live_url: 'https://startuptechsolutions.in',
        is_featured: 0,
        display_order: 6
      }
    ];

    seedProjects.forEach(p => insertProject.run(p));
  }

  // Seed Blog Posts
  const blogCount = db.prepare('SELECT count(*) as count FROM blog_posts').get() as { count: number };
  if (blogCount.count === 0) {
    const insertBlog = db.prepare(`
      INSERT INTO blog_posts (slug, title, excerpt, content, author_name, author_role, category, reading_time, is_published, tags_json, image_url)
      VALUES (@slug, @title, @excerpt, @content, @author_name, @author_role, @category, @reading_time, @is_published, @tags_json, @image_url)
    `);

    const seedBlogs = [
      {
        slug: 'how-custom-erp-cuts-costs',
        title: 'How Custom ERP Systems Can Reduce Operational Expenses by 40%',
        excerpt: 'Discover why standard off-the-shelf software leads to hidden inefficiencies, and how tailor-made ERP architectures consolidate workflows to unlock substantial margins.',
        content: `When scaling past the initial startup stage, spreadsheets and fragmented SaaS subscriptions become the biggest barrier to profitability. Different departments maintain conflicting datasets, invoices fall through the cracks, and inventory audits consume days of manual effort.

### The True Cost of Software Fragmentation
Companies often start with separate tools for invoicing, CRM, project management, and warehouse logs. As transaction volumes multiply, staff spend 20% to 30% of their working hours manually copying data between systems.

### What Makes a Custom ERP Different?
A bespoke ERP developed specifically for your operational model brings several critical advantages:
1. **Single Source of Truth**: Every sales order instantly reserves inventory, alerts logistics, and logs a ledger entry.
2. **Automated Compliance**: Tax rates, GST filing codes, and export compliance checks are computed without human intervention.
3. **Role-Tailored Portals**: Warehouse crews see clear barcode picking lists, while the CFO sees live cash flow forecasts.

### Proven ROI
In our implementation for TechVista Industries, replacing three disconnected legacy portals with our unified ERP reduced operating expenses by 40% while quadrupling order throughput.`,
        author_name: 'Syed Abdul Azeez',
        author_role: 'Founder & CEO',
        category: 'Enterprise Tech',
        reading_time: '5 min read',
        is_published: 1,
        tags_json: JSON.stringify(['ERP', 'Automation', 'Business Operations', 'Cost Optimization']),
        image_url: '/portfolio-erp-system.png'
      },
      {
        slug: 'incorporating-us-llc-from-india-guide',
        title: 'Incorporating a US LLC from India: The 2026 Founder\'s Guide',
        excerpt: 'A comprehensive step-by-step roadmap for Indian founders seeking US incorporation, EIN registration, Stripe access, and international banking.',
        content: `For founders targeting global customers, incorporating a United States Limited Liability Company (LLC) is one of the most effective strategies to accept global payments, establish international trust, and access global capital.

### Why Indian Entrepreneurs Choose a US LLC
- **Global Payment Gateways**: Direct access to Stripe, PayPal, and international merchant accounts without prohibitive currency exchange hurdles.
- **US Venture Ecosystem**: Many international accelerators and angel investors require a US legal entity.
- **Tax Flexibility**: Pass-through taxation and single-member LLC structures offer predictable, transparent reporting when managed correctly.

### Selecting the Right State: Delaware vs. Wyoming
- **Delaware**: Best if you plan to seek venture capital funding soon and convert to a C-Corp down the road.
- **Wyoming**: Best for bootstrapped startups, digital agencies, and e-commerce founders seeking low annual franchise taxes and privacy protection.

### Essential Steps We Handle at Startup Tech Solutions
1. Filing Articles of Organization with the Secretary of State.
2. Appointing a verified registered agent with a US physical address.
3. Securing an IRS EIN (Employer Identification Number) for non-residents.
4. Assisting with digital business bank accounts like Mercury or Wise.`,
        author_name: 'Chappali Shaik Shahnawaz Hussain',
        author_role: 'LLC & Digital Strategy Expert',
        category: 'Business Formation',
        reading_time: '6 min read',
        is_published: 1,
        tags_json: JSON.stringify(['US LLC', 'EIN', 'Startup Legal', 'Global Expansion']),
        image_url: '/sts-logo-original.png'
      },
      {
        slug: 'practical-ai-integrations-roi',
        title: 'Beyond the Hype: Practical AI Integrations That Deliver Immediate ROI',
        excerpt: 'Cut through marketing buzzwords and learn how pragmatic AI implementations solve real customer service, document parsing, and search problems today.',
        content: `Artificial intelligence has moved rapidly from experimental research to an essential operational component. However, many enterprises waste budgets on speculative experiments that lack clear business utility.

### Three High-Impact AI Implementations
1. **RAG-Powered Customer Support**:
Rather than generic chatbots that hallucinate answers, modern Retrieval-Augmented Generation binds language models strictly to your internal verified knowledge base. Customers receive accurate, immediate answers 24/7.

2. **Automated Document Intelligence**:
Extracting invoice details, contracts, or identification documents manually takes minutes per file. Modern computer vision and language models can extract structured JSON in milliseconds with 99%+ accuracy.

3. **Smart Search & Recommendation**:
Replacing keyword-only search with semantic vector search lets customers find exactly what they need even with typos or descriptive queries.

Startup Tech Solutions designs custom AI pipelines that integrate with existing APIs, respecting your data privacy and yielding measurable results within the first 30 days.`,
        author_name: 'Zaheer Abbas',
        author_role: 'Head of Engineering',
        category: 'Artificial Intelligence',
        reading_time: '4 min read',
        is_published: 1,
        tags_json: JSON.stringify(['AI Solutions', 'LLMs', 'Customer Support', 'Machine Learning']),
        image_url: '/portfolio-ai-solutions.png'
      }
    ];

    seedBlogs.forEach(b => insertBlog.run(b));
  }

  // Seed Jobs
  const jobsCount = db.prepare('SELECT count(*) as count FROM jobs').get() as { count: number };
  if (jobsCount.count === 0) {
    const insertJob = db.prepare(`
      INSERT INTO jobs (slug, title, department, location, job_type, experience_level, salary_range, description, requirements_json, responsibilities_json, is_active)
      VALUES (@slug, @title, @department, @location, @job_type, @experience_level, @salary_range, @description, @requirements_json, @responsibilities_json, @is_active)
    `);

    const seedJobs = [
      {
        slug: 'senior-fullstack-engineer',
        title: 'Senior Full-Stack Engineer (React & Node.js)',
        department: 'Engineering',
        location: 'Hybrid / Proddatur / Remote (India)',
        job_type: 'Full-time',
        experience_level: '3 - 6 Years',
        salary_range: 'Competitive (INR 8 - 14 LPA + Incentives)',
        description: 'Lead the architecture and delivery of modern enterprise web applications, high-performance dashboards, and robust API backends for global clients.',
        requirements_json: JSON.stringify([
          'Strong proficiency in TypeScript, React, Next.js, and Node.js / Express',
          'Demonstrated expertise in relational SQL databases (PostgreSQL / SQLite) and query optimization',
          'Experience building and documenting clean RESTful and GraphQL APIs',
          'Familiarity with cloud hosting (Docker, AWS/GCP, Cloudflare, CI/CD)'
        ]),
        responsibilities_json: JSON.stringify([
          'Architect scalable, maintainable web and mobile backends for startup and enterprise clients',
          'Collaborate directly with founders, product designers, and client stakeholders',
          'Conduct code reviews, mentor junior engineers, and enforce software quality standards',
          'Participate in architecture planning and sprint estimation'
        ]),
        is_active: 1
      },
      {
        slug: 'ai-ml-solutions-engineer',
        title: 'AI / ML Solutions Engineer',
        department: 'AI & Data Intelligence',
        location: 'Remote / Proddatur',
        job_type: 'Full-time',
        experience_level: '2 - 5 Years',
        salary_range: 'Competitive (INR 9 - 16 LPA)',
        description: 'Develop custom generative AI pipelines, RAG systems, and intelligent automation workflows integrated with our client platforms.',
        requirements_json: JSON.stringify([
          'Hands-on experience with LLM APIs (Gemini, OpenAI, Anthropic) and vector databases (Pinecone, Chroma, pgvector)',
          'Strong Python and TypeScript programming capabilities',
          'Understanding of prompt engineering, fine-tuning, embeddings, and agentic workflows',
          'Passion for turning cutting-edge AI breakthroughs into real business products'
        ]),
        responsibilities_json: JSON.stringify([
          'Build and deploy contextual conversational agents for client web and mobile apps',
          'Design document ingestion and vector retrieval pipelines',
          'Evaluate model accuracy, latency, and token consumption',
          'Collaborate with the web team to integrate AI endpoints smoothly'
        ]),
        is_active: 1
      },
      {
        slug: 'digital-marketing-growth-specialist',
        title: 'Digital Marketing & Growth Specialist',
        department: 'Marketing & Operations',
        location: 'Proddatur / Hybrid',
        job_type: 'Full-time',
        experience_level: '2 - 4 Years',
        salary_range: 'Competitive (INR 5 - 8 LPA)',
        description: 'Drive high-conversion performance marketing campaigns, SEO strategy, Google My Business (GMB) rank scaling, and Meta Ads for our clients.',
        requirements_json: JSON.stringify([
          'Proven track record in managing Google Ads, Meta Ads Manager, and local SEO campaigns',
          'Deep understanding of Google My Business optimization and local ranking factors',
          'Proficiency with Google Analytics 4, Tag Manager, and Search Console',
          'Creative copywriting and campaign funnel design skills'
        ]),
        responsibilities_json: JSON.stringify([
          'Plan and execute ROI-driven paid advertising campaigns for enterprise clients',
          'Optimize client Google My Business profiles to dominate local search rankings',
          'Monitor conversion rates and perform A/B testing on landing pages',
          'Produce monthly performance intelligence reports with actionable insights'
        ]),
        is_active: 1
      }
    ];

    seedJobs.forEach(j => insertJob.run(j));
  }
}
