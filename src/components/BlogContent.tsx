'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchBar from '@/components/SearchBar';
import { getBlogPosts, getBlogCategories } from '@/data/blogData';
import type { BlogPost, BlogCategory } from '@/data/blogData';
import { Calendar, Clock, User, Tag, SlidersHorizontal } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const BlogContent = () => {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'Todas';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);
  
  useEffect(() => {
    const loadBlogData = async () => {
      setLoading(true);
      try {
        const [postsData, categoriesData] = await Promise.all([
          getBlogPosts(),
          getBlogCategories()
        ]);
        setAllPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogData();
  }, []);
  
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-20 mt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e5563]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1e5563] to-[#2d7a8a] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog Educativo
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Descubre artículos, tutoriales y recursos para impulsar tu crecimiento profesional
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumbs and Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Blog' }]} />

          <div className="mt-8 flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Wider search bar */}
            <div className="flex-1 max-w-2xl w-full">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Buscar artículos..."
              />
            </div>

            {/* Modern filter dialog */}
            <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 rounded-full border-gray-300 hover:bg-gray-100"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtrar por categorías
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Filtrar por categorías</DialogTitle>
                  <DialogDescription>
                    Selecciona una categoría para refinar los artículos del blog
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => { setSelectedCategory('Todas'); setFilterOpen(false); }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === 'Todas'
                          ? 'bg-[#1e5563] text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      Todas
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => { setSelectedCategory(category.name); setFilterOpen(false); }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-[#1e5563] text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No se encontraron artículos que coincidan con tu búsqueda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featured_image && post.featured_image.trim() !== '' ? post.featured_image : '/lovable-uploads/7339c3b8-048b-4b3f-b572-26c174eeeefb.png'}
                        alt={post.title || 'Artículo del Blog'}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span>{formatDate(post.created_at)}</span>
                      <span className="mx-2">•</span>
                      <span>{post.reading_time} min de lectura</span>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#1e5563] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Publicado el {formatDate(post.created_at)}</span>
                      </div>
                      
                      <span className="inline-block bg-[#1e5563]/10 text-[#1e5563] px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default BlogContent;
