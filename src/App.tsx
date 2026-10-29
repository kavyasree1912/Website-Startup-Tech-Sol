import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext.js';
import { RouterProvider, useRouter } from './context/RouterContext.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { WhatsAppFloating } from './components/WhatsAppFloating.js';
import { EnquiryModal } from './components/EnquiryModal.js';

// Pages
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ServicesPage } from './pages/ServicesPage.js';
import { ServiceDetailPage } from './pages/ServiceDetailPage.js';
import { ProjectsPage } from './pages/ProjectsPage.js';
import { ProjectDetailPage } from './pages/ProjectDetailPage.js';
import { CareersPage } from './pages/CareersPage.js';
import { BlogPage } from './pages/BlogPage.js';
import { BlogPostPage } from './pages/BlogPostPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.js';
import { TermsPage } from './pages/TermsPage.js';
import { PricingPage } from './pages/PricingPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';
import { AdminLoginPage } from './pages/AdminLoginPage.js';
import { AdminDashboardPage } from './pages/AdminDashboardPage.js';

function MainApp() {
  const { currentPage } = useRouter();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [defaultEnquiryService, setDefaultEnquiryService] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (serviceName?: string) => {
    setDefaultEnquiryService(serviceName);
    setEnquiryModalOpen(true);
  };

  const isAdminDashboard = currentPage === 'admin-dashboard';

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-300">
      {/* Universal Header */}
      <Header onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Main Page Render */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onOpenEnquiry={handleOpenEnquiry} />}
        {currentPage === 'about' && <AboutPage onOpenEnquiry={() => handleOpenEnquiry()} />}
        {currentPage === 'services' && <ServicesPage onOpenEnquiry={handleOpenEnquiry} />}
        {currentPage === 'service-detail' && <ServiceDetailPage />}
        {currentPage === 'pricing' && <PricingPage onOpenEnquiry={handleOpenEnquiry} />}
        {currentPage === 'projects' && <ProjectsPage onOpenEnquiry={() => handleOpenEnquiry()} />}
        {currentPage === 'project-detail' && <ProjectDetailPage onOpenEnquiry={handleOpenEnquiry} />}
        {currentPage === 'careers' && <CareersPage />}
        {currentPage === 'career-detail' && <CareersPage />}
        {currentPage === 'blog' && <BlogPage />}
        {currentPage === 'blog-detail' && <BlogPostPage onOpenEnquiry={handleOpenEnquiry} />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'privacy-policy' && <PrivacyPolicyPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'admin-login' && <AdminLoginPage />}
        {currentPage === 'admin-dashboard' && <AdminDashboardPage />}
        {currentPage === 'not-found' && <NotFoundPage />}
      </main>

      {/* Footer (subtle or hidden on Admin Dashboard) */}
      {!isAdminDashboard && <Footer />}

      {/* Floating Instant WhatsApp Access */}
      {!isAdminDashboard && <WhatsAppFloating />}

      {/* Quick Project Consultation Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultService={defaultEnquiryService}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <MainApp />
      </RouterProvider>
    </AuthProvider>
  );
}
