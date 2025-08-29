
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Course } from '@/data/coursesData';

interface CourseFormActionsProps {
  editingCourse: Course | null;
  onSave: () => void;
  onCancel: () => void;
}

const CourseFormActions = ({ editingCourse, onSave, onCancel }: CourseFormActionsProps) => {
  const handleSave = () => {
    console.log('Form save action triggered');
    onSave();
  };

  return (
    <div className="flex justify-end space-x-4 pt-4">
      <Button variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button onClick={handleSave} className="bg-[#1e5563] hover:bg-[#1e5563]/90">
        <Save className="h-4 w-4 mr-2" />
        {editingCourse ? 'Actualizar' : 'Crear'} Curso
      </Button>
    </div>
  );
};

export default CourseFormActions;
