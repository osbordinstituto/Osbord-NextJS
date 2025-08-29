import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import CourseEnrollmentDialog from './CourseEnrollmentDialog';
import CourseDetailDialog from './CourseDetailDialog';
import { Course } from '@/data/coursesData';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group">
      <CourseDetailDialog course={course}>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer h-[350px] flex flex-col">
          <div className="relative">
            <Image
              src={course.image}
              alt={`Curso de ${course.title} - ${course.category}`}
              width={400}
              height={192}
              className="w-full h-32 sm:h-48 object-cover group-hover:scale-102 transition-transform duration-500"
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

          <div className="p-4 lg:p-5 flex-1 flex flex-col">
            <h3 style={{fontSize: '14px', lineHeight: '1.3'}} className="font-semibold text-gray-900 mb-2 group-hover:text-[#1e5563] transition-colors line-clamp-1 truncate overflow-hidden">
              {course.title}
            </h3>
            <p style={{fontSize: '12px', lineHeight: '1.4'}} className="text-gray-600 mb-4 line-clamp-2 flex-1 overflow-hidden">
              {course.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 lg:space-x-4 text-xs lg:text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                  {course.students}
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-xs lg:text-sm font-medium">{course.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="text-sm lg:text-base font-bold text-[#1e5563]">
                {course.price}
              </div>
              <CourseEnrollmentDialog courseName={course.title}>
                <Button 
                  size="sm"
                  className="bg-[#1e5563] hover:bg-[#1e5563]/90 transition-all duration-300 hover:scale-105"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  Inscribirse
                  <ArrowRight className="ml-1 lg:ml-2 h-3 w-3 lg:h-4 lg:w-4" />
                </Button>
              </CourseEnrollmentDialog>
            </div>
          </div>
        </div>
      </CourseDetailDialog>
    </div>
  );
};

export default CourseCard;
