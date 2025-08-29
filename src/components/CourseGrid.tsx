import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import CourseEnrollmentDialog from './CourseEnrollmentDialog';
import CourseDetailDialog from './CourseDetailDialog';
import { Course } from '@/data/coursesData';

interface CourseGridProps {
  courses: Course[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course) => (
            <div key={course.id} className="group w-full">
              <CourseDetailDialog course={course}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer w-full">
                  <div className="relative">
                    <Image
                      src={course.image}
                      alt={`Curso ${course.title} - ${course.category} en Instituto Osbord`}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#1e5563] text-white hover:bg-[#1e5563]">{course.category}</Badge>
                    </div>
                    <div className="absolute inset-0 bg-[#1e5563]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 px-4 py-2 rounded-full text-[#1e5563] font-semibold">
                        Ver detalles
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <h3 style={{fontSize: '14px', lineHeight: '1.3'}} className="font-semibold text-gray-900 mb-2 group-hover:text-[#1e5563] transition-colors line-clamp-1 truncate overflow-hidden">
                      {course.title}
                    </h3>
                    <p style={{fontSize: '12px', lineHeight: '1.4'}} className="text-gray-600 mb-4 line-clamp-2 overflow-hidden">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 md:h-4 md:w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{course.students}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current mr-1 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="text-lg md:text-2xl font-bold text-[#1e5563] truncate">
                        {course.price}
                      </div>
                      <CourseEnrollmentDialog courseName={course.title}>
                        <Button 
                          size="sm"
                          className="bg-[#1e5563] hover:bg-[#1e5563]/90 transition-all duration-300 hover:scale-105 flex-shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="hidden sm:inline">Inscribirse</span>
                          <span className="sm:hidden">Inscribir</span>
                          <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                        </Button>
                      </CourseEnrollmentDialog>
                    </div>
                  </div>
                </div>
              </CourseDetailDialog>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron cursos en esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseGrid;
