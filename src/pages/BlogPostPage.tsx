import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext.js';
import { api } from '../services/api.js';
import { BlogPost } from '../types.js';
import {
  ChevronLeft,
  Clock,
  Sparkles,
  Share2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface BlogPostPageProps {
  onOpenEnquiry: (defaultService?: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onOpenEnquiry }) => {
  const { pageParam: slug, navigate } = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getBlogPostBySlug(slug);
        setPost(data);
      } catch (err: any) {
        setError(err.message || 'Article not found');
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 pb-32 text-center max-w-7xl mx-auto px-4">
        <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-400">Loading insight article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-40 pb-32 text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Article Not Found</h2>
        <p className="text-sm text-slate-400 mb-6">
          The requested article could not be located.
        </p>
        <button
          onClick={() => navigate('blog')}
          className="px-6 py-2.5 rounded-lg bg-gold-gradient text-slate-950 font-semibold text-xs uppercase tracking-wider"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-12 border-b border-white/5 bg-[#07090F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('blog')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-6 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{post.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center font-bold text-amber-400 text-xs">
                  {post.author_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-white">{post.author_name}</div>
                  <div className="text-slate-400 text-[11px]">{post.author_role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{post.reading_time}</span>
                </span>
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3 h-3" />
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Article */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden border border-white/10 mb-12 aspect-[16/9] bg-[#0E1524]">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="p-6 rounded-2xl bg-amber-400/5 border border-amber-400/20 mb-10 text-base sm:text-lg text-amber-100/90 leading-relaxed font-medium">
          {post.excerpt}
        </div>

        {/* Body Text */}
        <div className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-heading font-bold text-white pt-6 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              return (
                <div key={idx} className="pl-4 border-l-2 border-amber-400/40 space-y-2 py-1">
                  {paragraph.split('\n').map((line, lIdx) => (
                    <p key={lIdx} className="text-slate-300">
                      {line}
                    </p>
                  ))}
                </div>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 mr-2">Tags:</span>
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action card */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#0B0F19] to-slate-900 border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-heading font-bold text-white mb-1">
              Need Assistance Implementing This in Your Company?
            </h4>
            <p className="text-xs text-slate-300">
              Startup Tech Solutions engineers tailored architectures with verified business ROI.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry(post.category)}
            className="px-6 py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <span>Consult With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
