import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, BookOpen, Award, ArrowRight, Monitor, Smartphone, FileText } from 'lucide-react';
import CourseEnrollmentDialog from './CourseEnrollmentDialog';
import CourseSchema from './CourseSchema';
import CourseModuleDropdown from './CourseModuleDropdown';
import { Course } from '@/data/coursesData';

interface CourseDetailDialogProps {
  course: Course;
  children: React.ReactNode;
}

const CourseDetailDialog: React.FC<CourseDetailDialogProps> = ({ course, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Use actual course data instead of hardcoded data
  const courseDetails = {
    ...course,
    detailedDescription: course.detailed_description || course.description,
    modules: Array.isArray(course.modules) ? course.modules : [],
    prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : []
  };

  return (
    <>
      <CourseSchema course={course} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1e5563] mb-4 break-words">
            {courseDetails.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image and basic info */}
          <div>
            <div className="relative mb-4">
              <Image
                src={course.image}
                alt={`Imagen del curso ${course.title} - ${course.description}`}
                width={600}
                height={256}
                className="w-full h-64 object-cover rounded-lg mb-6"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-[#1e5563] text-white hover:bg-[#1e5563]">{courseDetails.category}</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {courseDetails.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {courseDetails.students.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium">{courseDetails.rating}</span>
              </div>
            </div>

            {/* Disponibilidad y características */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-3 text-[#1e5563]">Disponibilidad del curso:</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Monitor className="h-4 w-4 text-[#1e5563] mr-2" />
                  <span className="text-sm">Disponible en PC</span>
                </div>
                <div className="flex items-center">
                  <Smartphone className="h-4 w-4 text-[#1e5563] mr-2" />
                  <span className="text-sm">Disponible en dispositivos móviles</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-[#1e5563] mr-2" />
                  <span className="text-sm">Incluye exámenes</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-[#1e5563] mr-2" />
                  <span className="text-sm">Duración: {courseDetails.duration}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-[#1e5563] mr-2" />
                  <span className="text-sm">Certificado de finalización</span>
                </div>
              </div>
            </div>
            
            <div className="text-3xl font-bold text-[#1e5563] mb-4">
              {courseDetails.price}
            </div>
          </div>
          
          {/* Detailed info */}
          <div className="min-w-0 overflow-hidden">
            <h3 className="text-lg font-semibold mb-3">Descripción del curso</h3>
            <p className="text-gray-600 mb-6 break-words whitespace-pre-wrap">
              {courseDetails.detailedDescription}
            </p>
            
            {courseDetails.modules && courseDetails.modules.length > 0 && (
              <CourseModuleDropdown modules={courseDetails.modules} />
            )}
            
            {courseDetails.prerequisites && courseDetails.prerequisites.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-3">Requisitos previos</h3>
                <ul className="space-y-2 mb-6">
                  {courseDetails.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start">
                      <BookOpen className="h-4 w-4 text-[#1e5563] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm break-words">{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <CourseEnrollmentDialog courseName={courseDetails.title}>
            <Button className="w-full bg-[#1e5563] hover:bg-[#1e5563]/90" size="lg">
              Inscribirse al curso
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CourseEnrollmentDialog>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default CourseDetailDialog;
