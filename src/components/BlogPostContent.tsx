'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BlogPost } from '@/data/blogData';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <div className="text-white">
                <span className="inline-block bg-[#1e5563] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-200 max-w-3xl">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title }
          ]} />

          {/* Back Button */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[#1e5563] hover:text-[#16394a] font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.reading_time} min de lectura</span>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#1e5563] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    <Tag className="w-4 h-4" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Instituto Info */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#1e5563] rounded-full flex items-center justify-center text-white font-bold text-xl">
                O
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Osbord Instituto</h3>
                <p className="text-gray-600">
                  Instituto especializado en {post.category} con amplia experiencia en el sector educativo.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 p-8 bg-gradient-to-r from-[#1e5563] to-[#2d7a8a] rounded-xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">¿Te gustó este artículo?</h3>
            <p className="text-blue-100 mb-6">
              Descubre nuestros cursos relacionados y lleva tu aprendizaje al siguiente nivel
            </p>
            <Link
              href="/cursos"
              className="inline-block bg-white text-[#1e5563] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Ver Cursos
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPostContent;
