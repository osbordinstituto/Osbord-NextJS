
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Course } from '@/data/coursesData';

interface CourseContentFieldsProps {
  formData: Partial<Course>;
  onArrayChange: (field: 'modules' | 'prerequisites', value: string) => void;
}

const CourseContentFields = ({ formData, onArrayChange }: CourseContentFieldsProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, field: 'modules' | 'prerequisites') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue = value.substring(0, start) + '\n' + value.substring(end);
      
      onArrayChange(field, newValue);
      
      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <>
      <div>
        <Label htmlFor="prerequisites">Requisitos Previos</Label>
        <p className="text-sm text-gray-600 mb-2">Escribe cada requisito en una línea separada</p>
        <Textarea
          id="prerequisites"
          value={formData.prerequisites?.join('\n') || ''}
          onChange={(e) => onArrayChange('prerequisites', e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, 'prerequisites')}
          placeholder="Conocimientos básicos
Acceso a computadora
Motivación para aprender"
          rows={6}
          className="min-h-[120px]"
        />
      </div>
    </>
  );
};

export default CourseContentFields;
