
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Course, CourseModule } from '@/data/coursesData';
import CourseFormHeader from './CourseFormHeader';
import CourseBasicFields from './CourseBasicFields';
import CourseDetailsFields from './CourseDetailsFields';
import CourseContentFields from './CourseContentFields';
import CourseFormActions from './CourseFormActions';
import ModuleLessonEditor from './ModuleLessonEditor';

interface CourseFormProps {
  formData: Partial<Course>;
  editingCourse: Course | null;
  onInputChange: (field: keyof Course, value: unknown) => void;
  onArrayChange: (field: 'modules' | 'prerequisites', value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CourseForm = ({ 
  formData, 
  editingCourse, 
  onInputChange, 
  onArrayChange, 
  onSave, 
  onCancel 
}: CourseFormProps) => {
  const handleSave = () => {
    console.log('Form data before save:', formData);
    onSave();
  };

  return (
    <Card>
      <CourseFormHeader 
        editingCourse={editingCourse} 
        onCancel={onCancel} 
      />
      <CardContent className="space-y-4">
        <CourseBasicFields 
          formData={formData} 
          onInputChange={onInputChange} 
        />
        
        <CourseDetailsFields 
          formData={formData} 
          onInputChange={onInputChange} 
        />
        
        <CourseContentFields 
          formData={formData} 
          onArrayChange={onArrayChange} 
        />

        <ModuleLessonEditor
          modules={formData.modules || []}
          onChange={(modules) => onInputChange('modules', modules)}
        />
        
        <CourseFormActions 
          editingCourse={editingCourse} 
          onSave={handleSave} 
          onCancel={onCancel} 
        />
      </CardContent>
    </Card>
  );
};

export default CourseForm;
