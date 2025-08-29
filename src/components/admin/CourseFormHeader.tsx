
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Course } from '@/data/coursesData';

interface CourseFormHeaderProps {
  editingCourse: Course | null;
  onCancel: () => void;
}

const CourseFormHeader = ({ editingCourse, onCancel }: CourseFormHeaderProps) => {
  return (
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        {editingCourse ? 'Editar Curso' : 'Crear Nuevo Curso'}
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardTitle>
    </CardHeader>
  );
};

export default CourseFormHeader;
