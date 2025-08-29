
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, RefreshCw } from 'lucide-react';
import { Course } from '@/data/coursesData';
import CourseCard from './CourseCard';
import SearchBar from '../SearchBar';

interface CourseManagementProps {
  courses: Course[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onRefresh: () => void;
  onStartCreating: () => void;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

const CourseManagement = ({ 
  courses, 
  searchTerm,
  onSearchChange,
  onRefresh, 
  onStartCreating, 
  onEdit, 
  onDelete 
}: CourseManagementProps) => {
  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold dark:text-white">Cursos Existentes</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-300"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Actualizar</span>
          </Button>
          <Badge variant="secondary" className="text-sm dark:bg-gray-800 dark:text-gray-300">
            Total: {filteredCourses.length} cursos
          </Badge>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          <div className="w-full sm:w-80">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              placeholder="Buscar cursos en admin..."
            />
          </div>
          <Button 
            onClick={() => {
              console.log('Nuevo Curso button clicked in CourseManagement');
              onStartCreating();
            }} 
            className="bg-[#1e5563] hover:bg-[#1e5563]/90 whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Curso
          </Button>
        </div>
      </div>
      
      {filteredCourses.length === 0 ? (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              {searchTerm ? 'No se encontraron cursos que coincidan con la búsqueda' : 'No hay cursos disponibles'}
            </p>
            {!searchTerm && (
              <Button onClick={onStartCreating} className="bg-[#1e5563] hover:bg-[#1e5563]/90">
                <Plus className="h-4 w-4 mr-2" />
                Crear Primer Curso
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
