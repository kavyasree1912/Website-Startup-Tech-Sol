import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageName =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'pricing'
  | 'projects'
  | 'project-detail'
  | 'careers'
  | 'career-detail'
  | 'blog'
  | 'blog-detail'
  | 'contact'
  | 'privacy-policy'
  | 'terms'
  | 'admin-login'
  | 'admin-dashboard'
  | 'not-found';

interface RouterContextType {
  currentPage: PageName;
  pageParam: string | null;
  navigate: (page: PageName, param?: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function parseHash(hash: string): { page: PageName; param: string | null } {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean || clean === 'home') return { page: 'home', param: null };

  const parts = clean.split('/');
  const main = parts[0];
  const param = parts.slice(1).join('/') || null;

  switch (main) {
    case 'about':
      return { page: 'about', param: null };
    case 'services':
      return { page: 'services', param: null };
    case 'service':
      return { page: 'service-detail', param };
    case 'pricing':
      return { page: 'pricing', param: null };
    case 'projects':
    case 'portfolio':
      return { page: 'projects', param: null };
    case 'project':
      return { page: 'project-detail', param };
    case 'careers':
    case 'jobs':
      return { page: 'careers', param: null };
    case 'career':
      return { page: 'career-detail', param };
    case 'blog':
    case 'insights':
      return { page: 'blog', param: null };
    case 'post':
    case 'blog-post':
      return { page: 'blog-detail', param };
    case 'contact':
      return { page: 'contact', param: null };
    case 'privacy':
    case 'privacy-policy':
      return { page: 'privacy-policy', param: null };
    case 'terms':
    case 'terms-of-service':
      return { page: 'terms', param: null };
    case 'admin':
    case 'login':
      return { page: 'admin-login', param: null };
    case 'dashboard':
    case 'admin-dashboard':
      return { page: 'admin-dashboard', param: null };
    default:
      return { page: 'not-found', param: clean };
  }
}

function getHashForPage(page: PageName, param?: string): string {
  switch (page) {
    case 'home':
      return '#/';
    case 'about':
      return '#/about';
    case 'services':
      return '#/services';
    case 'service-detail':
      return `#/service/${param || ''}`;
    case 'pricing':
      return '#/pricing';
    case 'projects':
      return '#/portfolio';
    case 'project-detail':
      return `#/project/${param || ''}`;
    case 'careers':
      return '#/careers';
    case 'career-detail':
      return `#/career/${param || ''}`;
    case 'blog':
      return '#/blog';
    case 'blog-detail':
      return `#/post/${param || ''}`;
    case 'contact':
      return '#/contact';
    case 'privacy-policy':
      return '#/privacy-policy';
    case 'terms':
      return '#/terms-of-service';
    case 'admin-login':
      return '#/admin';
    case 'admin-dashboard':
      return '#/dashboard';
    default:
      return '#/404';
  }
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: PageName, param?: string) => {
    const newHash = getHashForPage(page, param);
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider
      value={{
        currentPage: route.page,
        pageParam: route.param,
        navigate,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
