'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseGrid from '@/components/CourseGrid';
import CursosHero from '@/components/CursosHero';
import SearchBar from '@/components/SearchBar';
import CourseFilters from '@/components/CourseFilters';
import Breadcrumbs from '@/components/Breadcrumbs';
import CoursesSchema from '@/components/CoursesSchema';
import { getCourses, addCourseUpdateListener } from '@/data/coursesData';
import type { Course } from '@/data/coursesData';

const CursosContent = () => {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'Todos';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);
  
  // Update courses when component mounts and set up event listener
  useEffect(() => {
    const updateCourses = async () => {
      setLoading(true);
      const latestCourses = await getCourses();
      setAllCourses(latestCourses);
      setLoading(false);
      console.log('Cursos page - courses updated:', latestCourses.length, 'courses loaded');
    };
    
    // Initial load
    updateCourses();
    
    // Set up event listener for course updates
    const unsubscribe = addCourseUpdateListener(updateCourses);
    
    return unsubscribe;
  }, []);
  
  // Filter courses by category and search term
  const filteredCourses = allCourses.filter((course: Course) => {
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <CursosHero />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e5563]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <CoursesSchema />
      <Header />
      <div className="pt-20">
        {/* Hero Section (match blog spacing/style) */}
        <div className="bg-gradient-to-r from-[#1e5563] to-[#2d7a8a] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Cursos</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Formación online con certificación oficial y metodología moderna
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumbs and Search (exact same container spacing as blog) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Cursos' }]} />
          <div className="mt-8 flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-md w-full">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Buscar cursos por título, descripción o categoría..."
              />
            </div>
          </div>
        </div>
      </div>
      <CourseFilters 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <CourseGrid courses={filteredCourses} />
      <Footer />
    </main>
  );
};

export default CursosContent;
