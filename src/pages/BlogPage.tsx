import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { api } from '../services/api.js';
import { BlogPost } from '../types.js';
import {
  Sparkles,
  Search,
  Clock,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { navigate } = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Enterprise Tech', 'Business Formation', 'Artificial Intelligence'];

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const data = await api.getBlogPosts({
          category: category !== 'All' ? category : undefined,
          search: searchTerm || undefined
        });
        setPosts(data);
      } catch (err) {
        console.error('Failed to load blog posts', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [category, searchTerm]);

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-16 sm:py-20 border-b border-white/5 relative overflow-hidden text-center">
        <div className="ambient-glow w-[500px] h-[500px] -top-24 left-1/3 bg-amber-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Engineering & Strategy Dispatch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight mb-6">
            Startup Tech <span className="text-gold-gradient">Insights & Architecture</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Practical breakdowns on software architecture, company formation, ERP cost reduction,
            and artificial intelligence implementation.
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="py-8 border-b border-white/5 bg-[#07090E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    category === c
                      ? 'bg-gold-gradient text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-panel h-80 rounded-2xl animate-pulse bg-white/5" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center glass-panel rounded-2xl border border-white/10 max-w-md mx-auto p-8">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Articles Found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search criteria or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                onClick={() => navigate('blog-detail', post.slug)}
                className="glass-panel group rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-[#0D121F] overflow-hidden border-b border-white/10">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#070A11]/80 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-amber-400/20">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
                      <span>{post.author_name}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.reading_time}</span>
                      </span>
                    </div>

                    <h2 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-amber-300 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-400 pt-4 border-t border-white/5">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
