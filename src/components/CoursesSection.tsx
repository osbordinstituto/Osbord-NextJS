
'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SectionHeader from './SectionHeader';
import CoursesCarousel from './CoursesCarousel';
import { getCourses, addCourseUpdateListener, Course } from '@/data/coursesData';

const CoursesSection = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Update courses when component mounts and set up event listener
  useEffect(() => {
    const updateCourses = async () => {
      setLoading(true);
      const latestCourses = await getCourses();
      setCourses(latestCourses);
      setLoading(false);
      console.log('Homepage courses section - courses updated:', latestCourses.length, 'courses loaded');
    };
    
    // Initial load
    updateCourses();
    
    // Set up event listener for course updates
    const unsubscribe = addCourseUpdateListener(updateCourses);
    
    return unsubscribe;
  }, []);

  const handleViewAllCourses = () => {
    router.push('/cursos');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  if (loading) {
    return (
      <section 
        id="cursos" 
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Programas Académicos"
            description="Descubre nuestros programas académicos especializados, diseñados por expertos para formar profesionales integrales con visión global."
          />
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e5563]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="cursos" 
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Programas Académicos"
          description="Descubre nuestros programas académicos especializados, diseñados por expertos para formar profesionales integrales con visión global."
        />

        <div className="mb-12">
          <CoursesCarousel courses={courses} />
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-[#1e5563] text-[#1e5563] hover:bg-[#1e5563] hover:text-white transition-all duration-300 hover:scale-105"
            onClick={handleViewAllCourses}
          >
            Ver Todos los Programas
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
